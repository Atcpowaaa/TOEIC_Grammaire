(function () {
  'use strict';

  var app = document.getElementById('app');
  var THEMES = window.THEMES, QUESTIONS = window.QUESTIONS, TENSES = window.TENSES;
  var QBYID = {};
  QUESTIONS.forEach(function (q) { QBYID[q.id] = q; });
  var LETTERS = ['A', 'B', 'C', 'D'];

  // ---------------------------------------------------------------- utilitaires
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pct(ok, n) { return n ? Math.round(ok * 100 / n) : 0; }
  function on(sel, ev, fn) {
    app.querySelectorAll(sel).forEach(function (el) { el.addEventListener(ev, fn); });
  }
  var toastAt = 0;
  function toast(msg) {
    // Les toasts s'enchaînent au lieu de se superposer.
    var wait = Math.max(0, toastAt - Date.now());
    toastAt = Date.now() + wait + 1700;
    setTimeout(function () {
      var t = document.createElement('div');
      t.className = 'toast';
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 1600);
    }, wait);
  }
  function confetti() {
    var colors = ['#4b4fd6', '#f29e1f', '#1e9e5a', '#d64545', '#7b4fd6', '#ffd27a'];
    for (var i = 0; i < 70; i++) {
      var c = document.createElement('div');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      c.style.animationDelay = (Math.random() * 0.4) + 's';
      document.body.appendChild(c);
      setTimeout(c.remove.bind(c), 3800);
    }
  }

  // ---------------------------------------------------------------- sauvegarde
  var KEY = 'toeicgram.v1';
  function defaults() {
    return { xp: 0, stats: {}, errors: [], bestCombo: 0, day: null, dayStreak: 0, p6: { ok: 0, n: 0 }, tests: [], tensesSeen: [], cfg: { themes: [], count: 10, timer: 0 },
      badges: [], today: { d: null, n: 0 }, survivalBest: 0, blitzBest: 0, p6done: [], detective: false };
  }
  var store = (function () {
    var d = defaults();
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s) Object.keys(d).forEach(function (k) { if (s[k] !== undefined) d[k] = s[k]; });
    } catch (e) { /* stockage indisponible : on garde les valeurs par défaut */ }
    return d;
  })();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignoré */ }
  }
  function dayStr(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function touchDay() {
    var now = new Date(), t = dayStr(now);
    if (store.day === t) return;
    var y = new Date(now.getTime()); y.setDate(y.getDate() - 1);
    store.dayStreak = store.day === dayStr(y) ? store.dayStreak + 1 : 1;
    store.day = t;
  }
  function addXp(n) { store.xp += n; }
  var GOAL = 20;
  function todayCount() { return store.today.d === dayStr(new Date()) ? store.today.n : 0; }
  function countToday() {
    var t = dayStr(new Date());
    if (store.today.d !== t) store.today = { d: t, n: 0 };
    store.today.n++;
    if (store.today.n === GOAL) toast('🎯 Objectif du jour atteint !');
  }
  function totalOk() {
    var n = 0;
    Object.keys(store.stats).forEach(function (k) { n += store.stats[k].ok; });
    return n;
  }
  function badgeEarned(id) {
    switch (id) {
      case 'first': return totalOk() >= 1;
      case 'hundred': return totalOk() >= 100;
      case 'fivehundred': return totalOk() >= 500;
      case 'combo10': return store.bestCombo >= 10;
      case 'tenses': return store.tensesSeen.length >= Object.keys(TENSES).length;
      case 'streak7': return store.dayStreak >= 7;
      case 'test80': return store.tests.some(function (t) { return t.score >= 80; });
      case 'survivor': return store.survivalBest >= 20;
      case 'blitz': return store.blitzBest >= 15;
      case 'detective': return store.detective;
      case 'reader': return store.p6done.length >= window.PART6.length;
      case 'allround': return Object.keys(THEMES).every(function (k) { return store.stats[k] && store.stats[k].n >= 10; });
      case 'goal': return todayCount() >= GOAL;
    }
    return false;
  }
  function checkBadges() {
    window.BADGES.forEach(function (b) {
      if (store.badges.indexOf(b.id) < 0 && badgeEarned(b.id)) {
        store.badges.push(b.id);
        toast('🏅 Badge débloqué : ' + b.name);
      }
    });
    save();
  }
  function record(q, ok, xp) {
    touchDay();
    countToday();
    var s = store.stats[q.th] || (store.stats[q.th] = { ok: 0, n: 0 });
    s.n++;
    var i = store.errors.indexOf(q.id);
    if (ok) {
      s.ok++;
      addXp(xp);
      if (i >= 0) store.errors.splice(i, 1);
    } else if (i < 0) {
      store.errors.push(q.id);
    }
    checkBadges();
  }
  function level() { return Math.floor(store.xp / 200) + 1; }
  function levelProgress() { return (store.xp % 200) / 2; }
  function levelName(l) {
    return ['Débutant', 'Apprenti', 'Intermédiaire', 'Confirmé', 'Avancé', 'Expert', 'Maître TOEIC'][Math.min(l - 1, 6)];
  }

  // ---------------------------------------------------------------- routeur
  var tick = null;
  function stopTimer() { if (tick) { clearInterval(tick); tick = null; } }
  function go(h) {
    if (location.hash === '#' + h || (h === '' && location.hash === '')) render();
    else location.hash = h;
  }
  function replace(h) {
    if (location.hash.replace(/^#/, '') === h) render();
    else location.replace('#' + h);
  }
  var routes = {};
  function render() {
    stopTimer();
    var parts = location.hash.replace(/^#/, '').split('/');
    var view = routes[parts[0]] || routes[''];
    view(parts[1] !== undefined ? decodeURIComponent(parts[1]) : undefined);
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);

  function topbar(title, parent, extra) {
    return '<div class="topbar"><button class="back" data-go="' + esc(parent) + '" aria-label="Retour">←</button>' +
      '<h1>' + title + '</h1>' + (extra || '') + '</div>';
  }
  function bindNav() {
    on('[data-go]', 'click', function () { go(this.getAttribute('data-go')); });
  }

  // ---------------------------------------------------------------- frises (SVG)
  var tlSeq = 0;
  function timeline(els, o) {
    o = o || {};
    var mini = !!o.mini;
    var W = 340, H = mini ? 66 : 172, Y = mini ? 34 : 86;
    var X = function (x) { return 20 + x * 3; };
    var id = 'tl' + (++tlSeq);
    var layer = { ref: 0, span: 1, dots: 1, arrow: 2, point: 3 };
    var s = '<svg class="tl' + (o.anim ? ' anim' : '') + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' +
      '<defs>' +
      '<marker id="' + id + 'h" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path class="tl-arrow-head" d="M0,0 L10,5 L0,10 z"/></marker>' +
      '<marker id="' + id + 'x" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path class="tl-axis-head" d="M0,0 L10,5 L0,10 z"/></marker>' +
      '</defs>' +
      '<line class="tl-axis" x1="8" y1="' + Y + '" x2="326" y2="' + Y + '" marker-end="url(#' + id + 'x)"/>';
    var nowTop = mini ? Y - 24 : Y - 44, nowBot = mini ? Y + 24 : Y + 36;
    s += '<line class="tl-now" x1="' + X(50) + '" y1="' + nowTop + '" x2="' + X(50) + '" y2="' + nowBot + '"/>';
    if (!mini) {
      s += '<text class="tl-now-lbl" x="' + X(50) + '" y="' + (nowTop - 6) + '" text-anchor="middle">MAINTENANT</text>' +
        '<text class="tl-end" x="8" y="' + (Y - 8) + '">PASSÉ</text>' +
        '<text class="tl-end" x="322" y="' + (Y - 8) + '" text-anchor="end">FUTUR</text>';
    }
    var delay = function (i) { return ' style="--d:' + (o.anim ? (0.3 + i * 0.45).toFixed(2) : 0) + 's"'; };
    var lbl = function (txt, x, y, i, cls) {
      if (mini || !txt) return '';
      var tx = Math.max(44, Math.min(296, x));
      return '<text class="tl-lbl tl-el ' + (cls || '') + '" x="' + tx + '" y="' + y + '" text-anchor="middle"' + delay(i) + '>' + esc(txt) + '</text>';
    };
    var items = els.map(function (e, i) { return { e: e, i: i }; });
    items.sort(function (a, b) { return layer[a.e.t] - layer[b.e.t]; });
    items.forEach(function (it) {
      var e = it.e, i = it.i, x1, x2, k;
      if (e.t === 'ref') {
        var rx = X(e.x);
        s += '<line class="tl-ref tl-el" x1="' + rx + '" y1="' + (mini ? Y - 18 : Y - 34) + '" x2="' + rx + '" y2="' + (mini ? Y + 18 : Y + 36) + '"' + delay(i) + '/>';
        s += lbl(e.label, rx, Y + 52, i, 'ref');
      } else if (e.t === 'span') {
        x1 = X(e.x1); x2 = X(e.x2);
        if (e.wavy) {
          var amp = mini ? 4 : 6, p = 'M' + x1 + ',' + Y, n = 0;
          for (var x = x1; x < x2; x += 10) {
            var xe = Math.min(x + 10, x2);
            p += ' Q' + ((x + xe) / 2) + ',' + (Y + (n % 2 ? amp : -amp) * 2) + ' ' + xe + ',' + Y;
            n++;
          }
          s += '<path class="tl-span tl-draw" pathLength="1" d="' + p + '"' + delay(i) + '/>';
        } else {
          s += '<line class="tl-span flat tl-draw" pathLength="1" x1="' + x1 + '" y1="' + Y + '" x2="' + x2 + '" y2="' + Y + '"' + delay(i) + '/>';
        }
        s += lbl(e.label, (x1 + x2) / 2, Y - 18, i);
      } else if (e.t === 'dots') {
        x1 = X(e.x1); x2 = X(e.x2);
        for (k = 0; k < e.n; k++) {
          var cx = x1 + (x2 - x1) * k / (e.n - 1);
          s += '<circle class="tl-dot tl-pop" cx="' + cx + '" cy="' + Y + '" r="' + (mini ? 3 : 4.5) + '" style="--d:' + (o.anim ? (0.3 + k * 0.12).toFixed(2) : 0) + 's"/>';
        }
        s += lbl(e.label, (x1 + x2) / 2, Y - 18, i);
      } else if (e.t === 'arrow') {
        x1 = X(e.x1); x2 = X(e.x2);
        var y0 = Y - (mini ? 6 : 9), yc = Y - (mini ? 22 : 34);
        s += '<g class="tl-el"' + delay(i) + '><path class="tl-arrow tl-draw" pathLength="1" marker-end="url(#' + id + 'h)" d="M' + x1 + ',' + y0 +
          ' C' + x1 + ',' + yc + ' ' + x2 + ',' + yc + ' ' + x2 + ',' + y0 + '"' + delay(i) + '/></g>';
        s += lbl(e.label, (x1 + x2) / 2, Y - 34, i);
      } else if (e.t === 'point') {
        var px = X(e.x);
        s += '<circle class="tl-point tl-pop' + (e.k === 2 ? ' k2' : '') + '" cx="' + px + '" cy="' + Y + '" r="' + (mini ? 5 : 7.5) + '"' + delay(i) + '/>';
        s += lbl(e.label, px, Y + 26, i, e.big ? 'big' : '');
      }
    });
    return s + '</svg>';
  }

  // ---------------------------------------------------------------- accueil
  routes[''] = function () {
    var tip = window.METHOD[Math.floor(Math.random() * window.METHOD.length)];
    var nErr = store.errors.length, l = level();
    app.innerHTML =
      '<section class="hero">' +
        '<h1>TOEIC Grammaire</h1>' +
        '<p>Parts 5 &amp; 6 · Reading</p>' +
        '<div class="row">' +
          '<span class="pill">⭐ Niveau ' + l + ' · ' + levelName(l) + '</span>' +
          '<span class="pill">🔥 ' + (store.dayStreak || 0) + ' jour' + (store.dayStreak > 1 ? 's' : '') + '</span>' +
          '<span class="pill">' + store.xp + ' XP</span>' +
        '</div>' +
        '<div class="xpbar"><div style="width:' + levelProgress() + '%"></div></div>' +
        '<div class="goal"><span>🎯 Objectif du jour</span><b>' + Math.min(todayCount(), GOAL) + ' / ' + GOAL + '</b></div>' +
        '<div class="xpbar goalbar"><div style="width:' + Math.min(100, todayCount() * 100 / GOAL) + '%"></div></div>' +
      '</section>' +
      '<div class="tip"><b>💡 Astuce :</b> ' + esc(tip) + '</div>' +
      '<div class="grid">' +
        tile('train', '▶️', 'Entraînement Part 5', 'Choisis tes thèmes, avec corrections', 'wide primary') +
        tile('test', '⏱️', 'Test chrono', '30 questions · 10 min') +
        tile('part6', '📰', 'Part 6', 'Textes à trous') +
        tile('tenses', '⏳', 'Frises des temps', 'Visualise chaque temps') +
        tile('machine', '⚙️', 'Machine à conjuguer', 'Construis tes phrases') +
        tile('games', '🎮', 'Jeux', 'Survie, défi éclair, trouve l\'erreur…') +
        tile('flash', '🃏', 'Cartes mémoire', 'Prépositions, connecteurs…') +
        tile('lessons', '📘', 'Fiches', 'Les règles à connaître') +
        tile('errors', '❌', 'Mes erreurs', nErr ? nErr + ' question' + (nErr > 1 ? 's' : '') + ' à revoir' : 'Aucune pour l\'instant') +
        tile('stats', '📈', 'Statistiques', 'Ta progression') +
        tile('badges', '🏅', 'Badges', store.badges.length + ' / ' + window.BADGES.length + ' débloqués') +
        tile('method', '🧭', 'Méthode Part 5', 'Les bons réflexes', 'wide') +
      '</div>';
    bindNav();
  };
  function tile(route, ic, title, sub, cls) {
    return '<button class="tile ' + (cls || '') + '" data-go="' + route + '"><span class="ic">' + ic + '</span><div><b>' + title + '</b><br><span>' + esc(sub) + '</span></div></button>';
  }

  // ---------------------------------------------------------------- entraînement
  routes.train = function () {
    var cfg = store.cfg, sel = cfg.themes;
    var chips = Object.keys(THEMES).map(function (k) {
      return '<button class="chip' + (sel.indexOf(k) >= 0 ? ' on' : '') + '" data-th="' + k + '">' + THEMES[k].icon + ' ' + esc(THEMES[k].name) + '</button>';
    }).join('');
    var pool = poolFor(sel);
    app.innerHTML = topbar('Entraînement', '') +
      '<h2>Thèmes</h2><div class="chips"><button class="chip' + (sel.length ? '' : ' on') + '" data-th="">🌍 Tous</button>' + chips + '</div>' +
      '<p class="muted small">' + pool.length + ' questions disponibles</p>' +
      '<h2>Nombre de questions</h2>' + seg('count', [[10, '10'], [20, '20'], [30, '30']], cfg.count) +
      '<h2>Chrono</h2>' + seg('timer', [[0, 'Sans'], [30, '30 s'], [20, '20 s (TOEIC)']], cfg.timer) +
      '<button class="btn" id="start">C\'est parti !</button>';
    bindNav();
    on('[data-th]', 'click', function () {
      var k = this.getAttribute('data-th');
      if (!k) cfg.themes = [];
      else {
        var i = cfg.themes.indexOf(k);
        if (i >= 0) cfg.themes.splice(i, 1); else cfg.themes.push(k);
      }
      save(); routes.train();
    });
    on('[data-seg]', 'click', function () {
      cfg[this.getAttribute('data-seg')] = +this.getAttribute('data-v');
      save(); routes.train();
    });
    document.getElementById('start').addEventListener('click', function () {
      startSession(shuffle(poolFor(cfg.themes)).slice(0, cfg.count), 'train', { timer: cfg.timer });
    });
  };
  function seg(name, opts, cur) {
    return '<div class="seg">' + opts.map(function (o) {
      return '<button data-seg="' + name + '" data-v="' + o[0] + '" class="' + (o[0] === cur ? 'on' : '') + '">' + o[1] + '</button>';
    }).join('') + '</div>';
  }
  function poolFor(themes) {
    return QUESTIONS.filter(function (q) { return !themes.length || themes.indexOf(q.th) >= 0; });
  }

  routes.test = function () {
    app.innerHTML = topbar('Test chrono', '') +
      '<div class="card"><h3>⏱️ Conditions d\'examen</h3>' +
      '<ul class="clean"><li>30 questions mélangées, comme la Part 5</li><li>10 minutes au total (≈ 20 s par question)</li>' +
      '<li>Pas de correction pendant le test</li><li>Correction détaillée à la fin</li></ul></div>' +
      (store.tests.length ? '<p class="muted small">Dernier score : ' + store.tests[store.tests.length - 1].score + ' %</p>' : '') +
      '<button class="btn" id="start">Commencer le test</button>';
    bindNav();
    document.getElementById('start').addEventListener('click', function () {
      startSession(shuffle(QUESTIONS).slice(0, 30), 'test', { total: 600, title: 'Test chrono' });
    });
  };

  routes.errors = function () {
    var list = store.errors.map(function (id) { return QBYID[id]; }).filter(Boolean);
    if (!list.length) {
      app.innerHTML = topbar('Mes erreurs', '') + '<div class="empty"><div class="ic">🎉</div><p>Aucune erreur à revoir.<br>Les questions ratées apparaîtront ici.</p></div>' +
        '<button class="btn" data-go="train">S\'entraîner</button>';
      return bindNav();
    }
    var by = {};
    list.forEach(function (q) { by[q.th] = (by[q.th] || 0) + 1; });
    app.innerHTML = topbar('Mes erreurs', '') +
      '<div class="card"><p><b>' + list.length + '</b> question' + (list.length > 1 ? 's' : '') + ' à revoir. Une question disparaît de la liste dès que tu y réponds juste.</p>' +
      Object.keys(by).map(function (k) { return '<span class="chip static">' + THEMES[k].icon + ' ' + esc(THEMES[k].name) + ' · ' + by[k] + '</span> '; }).join('') +
      '</div><button class="btn" id="start">Revoir mes erreurs</button>';
    bindNav();
    document.getElementById('start').addEventListener('click', function () {
      startSession(shuffle(list).slice(0, 20), 'errors', { title: 'Mes erreurs' });
    });
  };

  // ---------------------------------------------------------------- quiz
  // Modes : train et errors (correction après chaque question), test (examen 10 min),
  // survival (3 vies, correction affichée), blitz (60 s, sans correction).
  var session = null;
  function prep(q) {
    var order = shuffle([0, 1, 2, 3]);
    var c = order.map(function (i) { return q.c[i]; });
    return Object.assign({}, q, { c: c, a: order.indexOf(q.a) });
  }
  function startSession(list, mode, o) {
    o = o || {};
    session = {
      list: list.map(prep), i: 0, mode: mode, answers: [], combo: 0, bestCombo: 0, xp: 0,
      timer: o.timer || 0, title: o.title || 'Entraînement', answered: false, choice: null, hint: false,
      qStart: Date.now(), deadline: o.total ? Date.now() + o.total * 1000 : 0, lives: o.lives || 0, done: false
    };
    go('quiz');
  }
  function highlight(html, hints) {
    if (!hints) return html;
    hints.split('|').forEach(function (h) {
      var e = esc(h).replace(/[.*+?^${}()[\]\\]/g, '\\$&');
      if (/^\w/.test(h)) e = '\\b' + e;
      if (/\w$/.test(h)) e = e + '\\b';
      html = html.replace(new RegExp(e), '<mark>$&</mark>');
    });
    return html;
  }
  function sentenceHtml(q, answered, showHint) {
    var h = esc(q.q);
    if (showHint || answered) h = highlight(h, q.h);
    var blank = answered
      ? '<span class="blank ok">' + esc(q.c[q.a]) + '</span>'
      : '<span class="blank">&nbsp;?&nbsp;</span>';
    return h.replace('_____', blank);
  }
  function isExam(s) { return s.mode === 'test' || s.mode === 'blitz'; }
  function isArcade(s) { return s.mode === 'survival' || s.mode === 'blitz'; }
  function okCount(s) { return s.answers.filter(function (a) { return a.ok; }).length; }
  function hearts(n) {
    var h = '';
    for (var i = 0; i < 3; i++) h += i < n ? '❤️' : '🤍';
    return h;
  }
  routes.quiz = function () {
    var s = session;
    if (!s) return replace('');
    if (s.done) return replace('result');
    var q = s.list[s.i], n = s.list.length, exam = isExam(s);
    var parent = { test: 'test', errors: 'errors', survival: 'survival', blitz: 'blitz' }[s.mode] || 'train';
    var comboPill = '<span class="pill' + (s.combo >= 2 ? ' accent combo' : '') + '">🔥 ' + s.combo + '</span>';
    var extra = comboPill;
    if (s.mode === 'test') extra = '<span class="pill accent" id="gtime">10:00</span>';
    if (s.mode === 'blitz') extra = '<span class="pill combo">✔ ' + okCount(s) + '</span><span class="pill accent" id="gtime">1:00</span>';
    if (s.mode === 'survival') extra = '<span class="pill">' + hearts(s.lives) + '</span>';
    var html = topbar(esc(s.title), parent, extra);
    if (isArcade(s)) {
      html += '<div class="qmeta"><span class="small muted">Question ' + (s.i + 1) + '</span>' +
        (s.mode === 'survival' ? '<span class="pill accent">' + okCount(s) + ' pts</span>' + comboPill : '') + '</div>';
    } else {
      html += '<div class="qmeta"><div class="progress"><div style="width:' + (s.i * 100 / n) + '%"></div></div><span class="small muted">' + (s.i + 1) + ' / ' + n + '</span></div>';
    }
    if (s.timer && !exam && !s.answered) html += '<div class="timer" id="qtimer"><div style="width:100%"></div></div>';
    html += '<div class="card">';
    if (!exam) html += '<div class="qmeta"><span class="chip static">' + THEMES[q.th].icon + ' ' + esc(THEMES[q.th].name) + '</span>' +
      (!s.answered && q.h ? '<button class="hintbtn" id="hint">💡 Indice</button>' : '') + '</div>';
    html += '<p class="sentence">' + sentenceHtml(q, s.answered, s.hint) + '</p></div>';
    html += '<div class="choices">' + q.c.map(function (c, i) {
      var cls = '';
      if (s.answered) cls = i === q.a ? 'ok' : (i === s.choice ? 'ko' : 'dim');
      return '<button class="choice ' + cls + '" data-c="' + i + '"' + (s.answered ? ' disabled' : '') + '><span class="let">' + LETTERS[i] + '</span><span>' + esc(c) + '</span></button>';
    }).join('') + '</div>';
    if (s.answered) {
      var ok = s.choice === q.a;
      html += '<div class="feedback ' + (ok ? 'ok' : 'ko') + '"><h3>' +
        (ok ? '✅ Bonne réponse !' : (s.choice < 0 ? '⏰ Temps écoulé' : '❌ Raté')) + (ok ? '' : ' La réponse était (' + LETTERS[q.a] + ') ' + esc(q.c[q.a])) + '</h3>' +
        '<p>' + esc(q.e) + '</p>';
      if (q.t && TENSES[q.t]) {
        html += '<div class="tlwrap"><b class="small">' + esc(TENSES[q.t].name) + '</b>' + timeline(TENSES[q.t].tl, { anim: true }) +
          '<button class="linkbtn" data-go="tense/' + q.t + '">Voir la fiche de ce temps →</button></div>';
      }
      var last = s.mode === 'survival' ? s.lives <= 0 || s.i + 1 >= n : s.i + 1 >= n;
      html += '</div><button class="btn" id="next">' + (last ? 'Voir mon score' : 'Question suivante →') + '</button>';
    }
    app.innerHTML = html;
    bindNav();
    on('[data-c]', 'click', function () { answer(+this.getAttribute('data-c')); });
    var hb = document.getElementById('hint');
    if (hb) hb.addEventListener('click', function () { s.hint = true; stopTimer(); routes.quiz(); });
    var nb = document.getElementById('next');
    if (nb) nb.addEventListener('click', next);
    startQuizTimers();
  };
  function startQuizTimers() {
    var s = session;
    stopTimer();
    if (isExam(s)) {
      var g = document.getElementById('gtime');
      var upd = function () {
        var left = Math.max(0, Math.round((s.deadline - Date.now()) / 1000));
        g.textContent = '⏱ ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0');
        if (left <= 0) { stopTimer(); finish(); }
      };
      upd(); tick = setInterval(upd, 500);
    } else if (s.timer && !s.answered) {
      var bar = document.getElementById('qtimer');
      tick = setInterval(function () {
        var left = s.timer - (Date.now() - s.qStart) / 1000;
        bar.firstChild.style.width = Math.max(0, left * 100 / s.timer) + '%';
        bar.classList.toggle('low', left < 5);
        if (left <= 0) { stopTimer(); answer(-1); }
      }, 100);
    }
  }
  function answer(idx) {
    var s = session;
    if (s.answered) return;
    var q = s.list[s.i], ok = idx === q.a;
    s.answers.push({ id: q.id, q: q, choice: idx, ok: ok });
    var gain = 0;
    if (ok) {
      s.combo++;
      s.bestCombo = Math.max(s.bestCombo, s.combo);
      store.bestCombo = Math.max(store.bestCombo, s.combo);
      gain = (s.hint ? 5 : 10) + (s.combo >= 3 ? 2 : 0);
      s.xp += gain;
      if (!isExam(s) && (s.combo === 3 || s.combo === 5 || s.combo === 10)) toast('🔥 Combo x' + s.combo + ' !');
    } else {
      s.combo = 0;
      if (s.mode === 'survival') s.lives--;
    }
    record(q, ok, gain);
    stopTimer();
    if (isExam(s)) return next();
    s.answered = true;
    s.choice = idx;
    routes.quiz();
  }
  function next() {
    var s = session;
    s.i++;
    s.answered = false; s.choice = null; s.hint = false; s.qStart = Date.now();
    if (s.i >= s.list.length || (s.mode === 'survival' && s.lives <= 0)) return finish();
    routes.quiz();
    window.scrollTo(0, 0);
  }
  function finish() {
    var s = session;
    stopTimer();
    // Test chrono : les questions non traitées à la fin du temps comptent comme fausses.
    if (s.mode === 'test') {
      for (var i = s.answers.length; i < s.list.length; i++) {
        s.answers.push({ id: s.list[i].id, q: s.list[i], choice: -1, ok: false });
        record(s.list[i], false, 0);
      }
    }
    s.done = true;
    var okN = okCount(s);
    if (s.mode === 'test') {
      store.tests.push({ d: dayStr(new Date()), score: pct(okN, s.list.length) });
      store.tests = store.tests.slice(-20);
    }
    if (s.mode === 'survival') { s.record = okN > store.survivalBest; store.survivalBest = Math.max(store.survivalBest, okN); }
    if (s.mode === 'blitz') { s.record = okN > store.blitzBest; store.blitzBest = Math.max(store.blitzBest, okN); }
    checkBadges();
    replace('result');
  }

  routes.result = function () {
    var s = session;
    if (!s || !s.done) return replace('');
    var okN = okCount(s), n = s.answers.length, p = pct(okN, n);
    var by = {};
    s.answers.forEach(function (a) {
      var t = by[a.q.th] || (by[a.q.th] = { ok: 0, n: 0 });
      t.n++; if (a.ok) t.ok++;
    });
    var html = topbar('Résultat', isArcade(s) ? 'games' : '');
    if (isArcade(s)) {
      var best = s.mode === 'survival' ? store.survivalBest : store.blitzBest;
      html += '<div class="card center"><div style="font-size:3rem">' + (s.record ? '🏆' : s.mode === 'survival' ? '❤️' : '🚀') + '</div>' +
        '<div class="score-big">' + okN + ' pts</div><p><b>' + (s.record ? 'Nouveau record !' : 'Record : ' + best + ' pts') + '</b></p>' +
        '<p class="muted small">' + n + ' question' + (n > 1 ? 's' : '') + ' · ' + p + ' % de réussite</p>' +
        '<div class="chips" style="justify-content:center"><span class="chip static">+' + s.xp + ' XP</span><span class="chip static">🔥 meilleur combo : ' + s.bestCombo + '</span></div></div>';
    } else {
      var stars = p >= 90 ? 3 : p >= 70 ? 2 : p >= 40 ? 1 : 0;
      var msg = p >= 90 ? 'Excellent, niveau TOEIC au top !' : p >= 70 ? 'Très bien, continue comme ça !' : p >= 40 ? 'Pas mal ! Revois les points faibles.' : 'Courage, relis les fiches et réessaie.';
      html += '<div class="card center"><div class="stars">' + '★★★'.slice(0, stars) + '<span class="muted">' + '★★★'.slice(0, 3 - stars) + '</span></div>' +
        '<div class="score-big">' + okN + ' / ' + n + '</div><p><b>' + p + ' %</b> · ' + msg + '</p>' +
        '<div class="chips" style="justify-content:center"><span class="chip static">+' + s.xp + ' XP</span><span class="chip static">🔥 meilleur combo : ' + s.bestCombo + '</span></div></div>';
    }
    if (n) {
      html += '<h2>Par thème</h2><div class="card">' + Object.keys(by).map(function (k) {
        return barRow(THEMES[k].icon + ' ' + THEMES[k].name, by[k].ok, by[k].n);
      }).join('') + '</div>';
    }
    var wrong = s.answers.filter(function (a) { return !a.ok; });
    if (wrong.length) {
      html += '<h2>Correction des erreurs</h2>' + wrong.map(function (a) {
        var q = a.q;
        return '<details class="review"><summary>' + sentenceHtml(q, true, true) + '</summary>' +
          '<p class="small">Ta réponse : ' + (a.choice < 0 ? '<i>aucune</i>' : '<b style="color:var(--ko)">' + esc(q.c[a.choice]) + '</b>') +
          ' · Bonne réponse : <b style="color:var(--ok)">' + esc(q.c[q.a]) + '</b></p><p class="small">' + esc(q.e) + '</p>' +
          (q.t ? '<button class="linkbtn" data-go="tense/' + q.t + '">⏳ Frise : ' + esc(TENSES[q.t].name) + '</button>' : '') + '</details>';
      }).join('');
    }
    html += '<div class="btn-row"><button class="btn secondary" data-go="">Accueil</button>';
    if (isArcade(s)) html += '<button class="btn" id="again">Rejouer</button>';
    else if (wrong.length) html += '<button class="btn" id="redo">Refaire les erreurs</button>';
    else html += '<button class="btn" data-go="train">Continuer</button>';
    html += '</div>';
    app.innerHTML = html;
    bindNav();
    var r = document.getElementById('redo');
    if (r) r.addEventListener('click', function () {
      startSession(shuffle(wrong.map(function (a) { return QBYID[a.id]; })), 'errors', { title: 'Mes erreurs' });
    });
    var ag = document.getElementById('again');
    if (ag) ag.addEventListener('click', function () { (s.mode === 'survival' ? startSurvival : startBlitz)(); });
    if (isArcade(s) ? s.record && okN >= 5 : p >= 80) confetti();
  };
  function barRow(label, ok, n) {
    var p = pct(ok, n);
    var color = p >= 70 ? 'var(--ok)' : p >= 40 ? 'var(--accent)' : 'var(--ko)';
    return '<div class="bar-row"><span class="lbl">' + esc(label) + '</span><div class="bar"><div style="width:' + p + '%;background:' + color + '"></div></div><span class="val">' + (n ? p + '%' : '–') + '</span></div>';
  }

  // ---------------------------------------------------------------- frises des temps
  routes.tenses = function () {
    var html = topbar('Frises des temps', '') +
      '<p class="muted small">Touche un temps pour voir sa frise animée, sa formation et ses mots repères.</p>' +
      '<div class="list"><button class="item" data-go="compare"><span class="ic">⚖️</span><span class="grow"><b>Comparer deux temps</b><br><span class="small muted">Prétérit vs present perfect, will vs going to…</span></span><span class="chev">›</span></button>' +
      '<button class="item" data-go="machine"><span class="ic">⚙️</span><span class="grow"><b>Machine à conjuguer</b><br><span class="small muted">Construis une phrase à n\'importe quel temps</span></span><span class="chev">›</span></button></div>';
    window.TENSE_GROUPS.forEach(function (g) {
      html += '<h2>' + g.name + '</h2><div class="list">' + g.ids.map(function (id) {
        var t = TENSES[id], seen = store.tensesSeen.indexOf(id) >= 0;
        return '<button class="item tense-card" data-go="tense/' + id + '" style="flex-direction:column;align-items:stretch">' +
          '<div class="head"><b>' + esc(t.name) + (seen ? ' ✓' : '') + '</b><span class="fr">' + esc(t.form) + '</span></div>' +
          timeline(t.tl, { mini: true }) + '</button>';
      }).join('') + '</div>';
    });
    app.innerHTML = html;
    bindNav();
  };

  routes.tense = function (id) {
    var t = TENSES[id];
    if (!t) return replace('tenses');
    if (store.tensesSeen.indexOf(id) < 0) { store.tensesSeen.push(id); checkBadges(); }
    var comps = window.TENSE_COMPARISONS.map(function (c, i) { return { c: c, i: i }; })
      .filter(function (x) { return x.c.a === id || x.c.b === id; });
    app.innerHTML = topbar(esc(t.name), 'tenses') +
      '<div class="card"><p class="muted small" style="margin-top:0">' + esc(t.fr) + '</p><div id="tlbox">' + timeline(t.tl, { anim: true }) + '</div>' +
      '<button class="linkbtn" id="replay">↻ Rejouer l\'animation</button><p>' + esc(t.tip) + '</p></div>' +
      '<div class="formula">' + esc(t.form) + '</div>' +
      '<h2>Quand l\'utiliser ?</h2><div class="card"><ul class="clean">' + t.use.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul></div>' +
      '<h2>Mots repères</h2><div class="chips">' + t.signals.map(function (w) { return '<span class="chip static">' + esc(w) + '</span>'; }).join('') + '</div>' +
      '<h2>Exemples</h2>' + t.examples.map(function (e) { return '<div class="example">' + esc(e) + '</div>'; }).join('') +
      (comps.length ? '<h2>À ne pas confondre</h2><div class="list">' + comps.map(function (x) {
        return '<button class="item" data-go="compare/' + x.i + '"><span class="ic">⚖️</span><span class="grow">' + esc(x.c.title) + '</span><span class="chev">›</span></button>';
      }).join('') + '</div>' : '') +
      '<button class="btn" id="practice">S\'entraîner sur les temps</button>';
    bindNav();
    document.getElementById('replay').addEventListener('click', function () {
      document.getElementById('tlbox').innerHTML = timeline(t.tl, { anim: true });
    });
    document.getElementById('practice').addEventListener('click', function () {
      // Les questions de ce temps d'abord, complétées par d'autres questions de temps.
      var mine = shuffle(QUESTIONS.filter(function (q) { return q.t === id; }));
      var others = shuffle(QUESTIONS.filter(function (q) { return q.th === 'temps' && q.t !== id; }));
      startSession(mine.concat(others).slice(0, 10), 'train', { title: 'Les temps' });
    });
  };

  routes.compare = function (idx) {
    var list = window.TENSE_COMPARISONS;
    if (idx === undefined || !list[idx]) {
      app.innerHTML = topbar('Comparer', 'tenses') + '<div class="list">' + list.map(function (c, i) {
        return '<button class="item" data-go="compare/' + i + '"><span class="ic">⚖️</span><span class="grow"><b>' + esc(c.title) + '</b><br><span class="small muted">' +
          esc(TENSES[c.a].name) + ' / ' + esc(TENSES[c.b].name) + '</span></span><span class="chev">›</span></button>';
      }).join('') + '</div>';
      return bindNav();
    }
    var c = list[idx];
    var block = function (id) {
      var t = TENSES[id];
      return '<div class="card"><h3>' + esc(t.name) + '</h3>' + timeline(t.tl, { anim: true }) +
        '<div class="example">' + esc(t.examples[0]) + '</div><button class="linkbtn" data-go="tense/' + id + '">Fiche complète →</button></div>';
    };
    app.innerHTML = topbar(esc(c.title), 'compare') + block(c.a) + block(c.b) +
      '<div class="tip"><b>🔑 La règle :</b> ' + esc(c.text) + '</div>';
    bindNav();
  };

  // ---------------------------------------------------------------- jeux
  routes.games = function () {
    app.innerHTML = topbar('Jeux', '') + '<div class="list">' +
      gameItem('survival', '❤️', 'Survie', 'Toutes les questions, 3 vies. Record : ' + store.survivalBest + ' pts') +
      gameItem('blitz', '🚀', 'Défi éclair', '60 secondes pour un maximum de bonnes réponses. Record : ' + store.blitzBest + ' pts') +
      gameItem('spot', '🔍', 'Trouve l\'erreur', 'Repère le passage fautif dans la phrase.') +
      gameItem('frise', '🧭', 'Quelle frise ?', 'Lis la phrase et trouve la frise qui correspond.') +
      gameItem('chrono', '⏮️', 'Qu\'est-ce qui s\'est passé en premier ?', 'Remets les actions dans l\'ordre chronologique.') +
      gameItem('machine', '⚙️', 'Machine à conjuguer', 'Choisis verbe, sujet et temps : la phrase et sa frise apparaissent.') +
      gameItem('flash', '🃏', 'Cartes mémoire', 'Retourne les cartes et teste ta mémoire.') +
      '</div>';
    bindNav();
  };
  function gameItem(r, ic, t, sub) {
    return '<button class="item" data-go="' + r + '"><span class="ic">' + ic + '</span><span class="grow"><b>' + t + '</b><br><span class="small muted">' + sub + '</span></span><span class="chev">›</span></button>';
  }

  // Jeu 1 : associer une phrase à sa frise.
  var fg = null;
  function newFriseRound() {
    var ids = Object.keys(TENSES);
    var target = ids[Math.floor(Math.random() * ids.length)];
    var t = TENSES[target];
    var opts = shuffle([target].concat(shuffle(ids.filter(function (x) { return x !== target; })).slice(0, 3)));
    fg.cur = { id: target, sentence: t.examples[Math.floor(Math.random() * t.examples.length)], opts: opts, choice: null };
  }
  routes.frise = function () {
    if (!fg || fg.over) { fg = { round: 1, total: 10, score: 0 }; newFriseRound(); }
    var cur = fg.cur, answered = cur.choice !== null;
    var html = topbar('Quelle frise ?', 'games', '<span class="pill">' + fg.score + ' pts</span>') +
      '<div class="qmeta"><div class="progress"><div style="width:' + ((fg.round - 1) * 100 / fg.total) + '%"></div></div><span class="small muted">' + fg.round + ' / ' + fg.total + '</span></div>' +
      '<div class="card"><p class="muted small" style="margin:0">Quelle frise correspond à cette phrase ?</p><p class="sentence">« ' + esc(cur.sentence) + ' »</p></div>' +
      '<div class="frise-opts">' + cur.opts.map(function (id, i) {
        var cls = answered ? (id === cur.id ? 'ok' : (i === cur.choice ? 'ko' : '')) : '';
        return '<button class="frise-opt ' + cls + '" data-o="' + i + '"' + (answered ? ' disabled' : '') + '>' + timeline(TENSES[id].tl, { mini: true }) +
          '<div class="nm">' + (answered ? esc(TENSES[id].name) : LETTERS[i]) + '</div></button>';
      }).join('') + '</div>';
    if (answered) {
      var ok = cur.opts[cur.choice] === cur.id, t = TENSES[cur.id];
      html += '<div class="feedback ' + (ok ? 'ok' : 'ko') + '"><h3>' + (ok ? '✅ Bravo !' : '❌ C\'était : ' + esc(t.name)) + '</h3><p>' + esc(t.tip) + '</p>' +
        '<div class="tlwrap">' + timeline(t.tl, { anim: true }) + '</div></div>' +
        '<button class="btn" id="next">' + (fg.round < fg.total ? 'Suivant →' : 'Voir mon score') + '</button>';
    }
    app.innerHTML = html;
    bindNav();
    on('[data-o]', 'click', function () {
      cur.choice = +this.getAttribute('data-o');
      touchDay(); countToday();
      if (cur.opts[cur.choice] === cur.id) { fg.score += 10; addXp(5); }
      checkBadges();
      routes.frise();
    });
    var nb = document.getElementById('next');
    if (nb) nb.addEventListener('click', function () {
      if (fg.round >= fg.total) { fg.over = true; return gameOver('Quelle frise ?', fg.score, fg.total * 10, 'frise'); }
      fg.round++; newFriseRound(); routes.frise(); window.scrollTo(0, 0);
    });
  };

  // Jeu 2 : quelle action a eu lieu en premier ?
  var cg = null;
  function chronoTimeline(it, anim) {
    var fut = !!it.f, x1 = fut ? 62 : 20, x2 = fut ? 80 : 38;
    var els = [];
    if (it.span) els.push({ t: 'span', x1: x1 - 6, x2: x2, wavy: true, label: '① en cours' });
    else els.push({ t: 'point', x: x1, label: '①', big: true });
    els.push({ t: 'point', x: x2, label: '②', big: true, k: 2 });
    return timeline(els, { anim: anim });
  }
  routes.chrono = function () {
    if (!cg || cg.over) cg = { items: shuffle(window.CHRONO_ITEMS).slice(0, 10), i: 0, score: 0, choice: null };
    var it = cg.items[cg.i], answered = cg.choice !== null;
    var firstTxt = it.first === 'a' ? it.a : it.b, secondTxt = it.first === 'a' ? it.b : it.a;
    var html = topbar('Chronologie', 'games', '<span class="pill">' + cg.score + ' pts</span>') +
      '<div class="qmeta"><div class="progress"><div style="width:' + (cg.i * 100 / cg.items.length) + '%"></div></div><span class="small muted">' + (cg.i + 1) + ' / ' + cg.items.length + '</span></div>' +
      '<div class="card"><p class="sentence">« ' + esc(it.s) + ' »</p><p class="muted small">Qu\'est-ce qui s\'est passé (ou se passera) EN PREMIER ?</p></div>' +
      '<div class="choices">' + ['a', 'b'].map(function (k, i) {
        var cls = answered ? (k === it.first ? 'ok' : (k === cg.choice ? 'ko' : 'dim')) : '';
        return '<button class="choice ' + cls + '" data-k="' + k + '"' + (answered ? ' disabled' : '') + '><span class="let">' + LETTERS[i] + '</span><span>' + esc(it[k]) + '</span></button>';
      }).join('') + '</div>';
    if (answered) {
      var ok = cg.choice === it.first;
      html += '<div class="feedback ' + (ok ? 'ok' : 'ko') + '"><h3>' + (ok ? '✅ Exact !' : '❌ Non !') + '</h3><p>' + esc(it.e) + '</p>' +
        '<div class="tlwrap">' + chronoTimeline(it, true) +
        '<div class="legend"><span><span class="n" style="background:var(--tl-1)">1</span>' + esc(firstTxt) + '</span>' +
        '<span><span class="n" style="background:var(--tl-2)">2</span>' + esc(secondTxt) + '</span></div></div></div>' +
        '<button class="btn" id="next">' + (cg.i + 1 < cg.items.length ? 'Suivant →' : 'Voir mon score') + '</button>';
    }
    app.innerHTML = html;
    bindNav();
    on('[data-k]', 'click', function () {
      cg.choice = this.getAttribute('data-k');
      touchDay(); countToday();
      if (cg.choice === it.first) { cg.score += 10; addXp(5); }
      checkBadges();
      routes.chrono();
    });
    var nb = document.getElementById('next');
    if (nb) nb.addEventListener('click', function () {
      if (cg.i + 1 >= cg.items.length) { cg.over = true; return gameOver('Chronologie', cg.score, cg.items.length * 10, 'chrono'); }
      cg.i++; cg.choice = null; routes.chrono(); window.scrollTo(0, 0);
    });
  };

  function gameOver(title, score, max, again) {
    var p = pct(score, max);
    app.innerHTML = topbar(esc(title), 'games') +
      '<div class="card center"><div class="ic" style="font-size:3rem">' + (p >= 80 ? '🏆' : p >= 50 ? '👍' : '💪') + '</div>' +
      '<div class="score-big">' + score + ' / ' + max + '</div><p>' + (p >= 80 ? 'Superbe maîtrise des temps !' : p >= 50 ? 'Bien joué, encore un effort !' : 'Revois les frises et retente ta chance.') + '</p></div>' +
      '<div class="btn-row"><button class="btn secondary" data-go="tenses">Revoir les frises</button><button class="btn" id="again">Rejouer</button></div>';
    bindNav();
    document.getElementById('again').addEventListener('click', function () { routes[again](); });
    if (p >= 80) confetti();
    window.scrollTo(0, 0);
  }

  // Jeux d'arcade : Survie (3 vies) et Défi éclair (60 secondes).
  function startSurvival() {
    startSession(shuffle(QUESTIONS), 'survival', { lives: 3, title: 'Survie' });
  }
  function startBlitz() {
    startSession(shuffle(QUESTIONS).slice(0, 80), 'blitz', { total: 60, title: 'Défi éclair' });
  }
  function arcadeIntro(ic, title, rules, best, start) {
    app.innerHTML = topbar(title, 'games') +
      '<div class="card center"><div style="font-size:3.2rem">' + ic + '</div><h3>' + title + '</h3>' +
      '<ul class="clean" style="text-align:left">' + rules.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul>' +
      '<p><span class="chip static">🏆 Record : ' + best + ' pts</span></p></div>' +
      '<button class="btn" id="start">Jouer</button>';
    bindNav();
    document.getElementById('start').addEventListener('click', start);
  }
  routes.survival = function () {
    arcadeIntro('❤️', 'Survie', ['Questions de tous les thèmes, à l\'infini', 'Tu as 3 vies : chaque erreur en coûte une', 'La correction s\'affiche après chaque question'],
      store.survivalBest, startSurvival);
  };
  routes.blitz = function () {
    arcadeIntro('🚀', 'Défi éclair', ['60 secondes chrono', 'Réponds au maximum de questions', 'Pas de correction pendant le défi : tout est corrigé à la fin'],
      store.blitzBest, startBlitz);
  };

  // Jeu : trouve le morceau de phrase qui contient l'erreur.
  var sp = null;
  routes.spot = function () {
    if (!sp || sp.over) sp = { items: shuffle(window.ERROR_ITEMS).slice(0, 10), i: 0, score: 0, choice: null };
    var it = sp.items[sp.i], answered = sp.choice !== null;
    var html = topbar('Trouve l\'erreur', 'games', '<span class="pill">' + sp.score + ' pts</span>') +
      '<div class="qmeta"><div class="progress"><div style="width:' + (sp.i * 100 / sp.items.length) + '%"></div></div><span class="small muted">' + (sp.i + 1) + ' / ' + sp.items.length + '</span></div>' +
      '<div class="card"><p class="muted small" style="margin-top:0">Touche le passage qui contient une faute :</p><p class="spot">' +
      it.p.map(function (part, k) {
        var cls = '';
        if (answered) cls = k === it.w ? 'bad' : (k === sp.choice ? 'miss' : 'done');
        var inner = esc(part) + (answered && k === it.w ? ' <span class="fix">→ ' + esc(it.fix) + '</span>' : '');
        return '<button class="seg-part ' + cls + '" data-k="' + k + '"' + (answered ? ' disabled' : '') + '>' + inner + '<small>' + LETTERS[k] + '</small></button>';
      }).join(' ') + '</p></div>';
    if (answered) {
      var ok = sp.choice === it.w;
      html += '<div class="feedback ' + (ok ? 'ok' : 'ko') + '"><h3>' + (ok ? '✅ Bien vu !' : '❌ L\'erreur était en (' + LETTERS[it.w] + ')') + '</h3>' +
        '<p>' + esc(it.e) + '</p><button class="linkbtn" data-go="lesson/' + it.th + '">' + THEMES[it.th].icon + ' Fiche : ' + esc(THEMES[it.th].name) + ' →</button></div>' +
        '<button class="btn" id="next">' + (sp.i + 1 < sp.items.length ? 'Suivant →' : 'Voir mon score') + '</button>';
    }
    app.innerHTML = html;
    bindNav();
    on('[data-k]', 'click', function () {
      sp.choice = +this.getAttribute('data-k');
      touchDay(); countToday();
      if (sp.choice === it.w) { sp.score += 10; addXp(5); }
      checkBadges();
      routes.spot();
    });
    var nb = document.getElementById('next');
    if (nb) nb.addEventListener('click', function () {
      if (sp.i + 1 >= sp.items.length) {
        sp.over = true;
        if (sp.score === sp.items.length * 10) { store.detective = true; checkBadges(); }
        return gameOver('Trouve l\'erreur', sp.score, sp.items.length * 10, 'spot');
      }
      sp.i++; sp.choice = null; routes.spot(); window.scrollTo(0, 0);
    });
  };

  // Machine à conjuguer : construit la phrase pour un verbe, un sujet, un temps et une forme.
  var mc = { v: 0, s: 2, t: 'presentPerfect', f: 'aff' };
  function conjugate(v, sb, t, f) {
    var have = sb.third ? 'has' : 'have';
    var beNeg = { am: 'am not', is: "isn't", are: "aren't" }[sb.be];
    var T = {
      presentSimple:            [[sb.third ? v.s : v.base], [sb.third ? "doesn't" : "don't", v.base], [sb.third ? 'does' : 'do', v.base]],
      presentContinuous:        [[sb.be, v.ing], [beNeg, v.ing], [sb.be, v.ing]],
      presentPerfect:           [[have, v.pp], [have + "n't", v.pp], [have, v.pp]],
      presentPerfectContinuous: [[have, 'been', v.ing], [have + "n't", 'been', v.ing], [have, 'been', v.ing]],
      pastSimple:               [[v.past], ["didn't", v.base], ['did', v.base]],
      pastContinuous:           [[sb.was, v.ing], [sb.was + "n't", v.ing], [sb.was, v.ing]],
      pastPerfect:              [['had', v.pp], ["hadn't", v.pp], ['had', v.pp]],
      pastPerfectContinuous:    [['had', 'been', v.ing], ["hadn't", 'been', v.ing], ['had', 'been', v.ing]],
      futureWill:               [['will', v.base], ["won't", v.base], ['will', v.base]],
      goingTo:                  [[sb.be, 'going to', v.base], [beNeg, 'going to', v.base], [sb.be, 'going to', v.base]],
      futureContinuous:         [['will', 'be', v.ing], ["won't", 'be', v.ing], ['will', 'be', v.ing]],
      futurePerfect:            [['will', 'have', v.pp], ["won't", 'have', v.pp], ['will', 'have', v.pp]]
    }[t][{ aff: 0, neg: 1, q: 2 }[f]];
    var tail = ' ' + esc(v.obj) + ' ' + esc(window.TENSE_MARKERS[t]);
    var hl = function (words) { return '<b class="vhl">' + esc(words.join(' ')) + '</b>'; };
    var cap = function (w) { return w.charAt(0).toUpperCase() + w.slice(1); };
    if (f === 'q') {
      return '<b class="vhl">' + esc(cap(T[0])) + '</b> ' + esc(sb.w) + ' ' + hl(T.slice(1)) + tail + '?';
    }
    return esc(sb.w === 'I' ? 'I' : cap(sb.w)) + ' ' + hl(T) + tail + '.';
  }
  routes.machine = function () {
    var V = window.VERBS, S = window.SUBJECTS, t = TENSES[mc.t];
    var chips = function (list, key, label) {
      return '<div class="chips">' + list.map(function (x, i) {
        return '<button class="chip' + (mc[key] === i ? ' on' : '') + '" data-mk="' + key + '" data-mv="' + i + '">' + esc(label(x)) + '</button>';
      }).join('') + '</div>';
    };
    var html = topbar('Machine à conjuguer', 'tenses') +
      '<div class="card machine-out"><p class="sentence" id="mcs">' + conjugate(V[mc.v], S[mc.s], mc.t, mc.f) + '</p>' +
      '<div class="formula small">' + esc(t.name) + ' · ' + esc(t.form) + '</div>' +
      '<div id="mctl">' + timeline(t.tl, { anim: true }) + '</div>' +
      '<div class="btn-row"><button class="btn secondary" id="rand">🎲 Au hasard</button><button class="btn ghost" data-go="tense/' + mc.t + '">Fiche du temps</button></div></div>' +
      '<h2>Forme</h2>' + seg('mf', [['aff', 'Affirmative'], ['neg', 'Négative'], ['q', 'Question']], mc.f) +
      '<h2>Temps</h2>';
    window.TENSE_GROUPS.forEach(function (g) {
      html += '<p class="small muted" style="margin:10px 0 6px">' + g.name + '</p><div class="chips">' + g.ids.map(function (id) {
        return '<button class="chip' + (mc.t === id ? ' on' : '') + '" data-mt="' + id + '">' + esc(TENSES[id].name) + '</button>';
      }).join('') + '</div>';
    });
    html += '<h2>Sujet</h2>' + chips(S, 's', function (x) { return x.w; }) +
      '<h2>Verbe</h2>' + chips(V, 'v', function (x) { return x.base; });
    app.innerHTML = html;
    bindNav();
    var y = window.scrollY;
    var redraw = function () { y = window.scrollY; routes.machine(); window.scrollTo(0, y); };
    on('[data-mk]', 'click', function () { mc[this.getAttribute('data-mk')] = +this.getAttribute('data-mv'); redraw(); });
    on('[data-mt]', 'click', function () { mc.t = this.getAttribute('data-mt'); redraw(); });
    on('[data-seg="mf"]', 'click', function () { mc.f = this.getAttribute('data-v'); redraw(); });
    document.getElementById('rand').addEventListener('click', function () {
      var ids = Object.keys(TENSES);
      mc = { v: Math.floor(Math.random() * V.length), s: Math.floor(Math.random() * S.length), t: ids[Math.floor(Math.random() * ids.length)], f: ['aff', 'neg', 'q'][Math.floor(Math.random() * 3)] };
      routes.machine();
    });
  };

  // Badges
  routes.badges = function () {
    var got = store.badges;
    app.innerHTML = topbar('Badges', '') +
      '<p class="muted small">' + got.length + ' / ' + window.BADGES.length + ' badges débloqués</p><div class="grid">' +
      window.BADGES.map(function (b) {
        var on = got.indexOf(b.id) >= 0;
        return '<div class="tile badge' + (on ? '' : ' locked') + '" style="min-height:auto"><span class="ic">' + (on ? b.icon : '🔒') + '</span><b>' + esc(b.name) + '</b><span>' + esc(b.desc) + '</span></div>';
      }).join('') + '</div>';
    bindNav();
  };

  // ---------------------------------------------------------------- cartes mémoire
  var fl = null;
  routes.flash = function (deckId) {
    var decks = window.FLASH_DECKS;
    if (!deckId || !decks[deckId]) {
      app.innerHTML = topbar('Cartes mémoire', '') + '<p class="muted small">Touche la carte pour la retourner, puis dis si tu savais.</p><div class="list">' +
        Object.keys(decks).map(function (k) {
          return '<button class="item" data-go="flash/' + k + '"><span class="ic">' + decks[k].icon + '</span><span class="grow"><b>' + esc(decks[k].name) + '</b><br><span class="small muted">' + decks[k].cards.length + ' cartes</span></span><span class="chev">›</span></button>';
        }).join('') + '</div>';
      return bindNav();
    }
    var deck = decks[deckId];
    if (!fl || fl.deck !== deckId) fl = { deck: deckId, queue: shuffle(deck.cards.map(function (_, i) { return i; })), known: 0, flipped: false };
    if (!fl.queue.length) {
      app.innerHTML = topbar(esc(deck.name), 'flash') + '<div class="card center"><div style="font-size:3rem">🎉</div><h3>Paquet terminé !</h3><p>Tu connais les ' + deck.cards.length + ' cartes.</p></div>' +
        '<div class="btn-row"><button class="btn secondary" data-go="flash">Autres paquets</button><button class="btn" id="again">Recommencer</button></div>';
      bindNav();
      document.getElementById('again').addEventListener('click', function () { fl = null; routes.flash(deckId); });
      return;
    }
    var card = deck.cards[fl.queue[0]];
    app.innerHTML = topbar(esc(deck.name), 'flash', '<span class="pill">' + fl.known + ' / ' + deck.cards.length + '</span>') +
      '<div class="flash' + (fl.flipped ? ' flipped' : '') + '" id="card"><div class="flash-inner">' +
      '<div class="flash-face front">' + esc(card[0]) + '<small>Touche pour retourner</small></div>' +
      '<div class="flash-face back">' + esc(card[1]) + '</div></div></div>' +
      '<div class="btn-row"><button class="btn secondary" id="again">↺ À revoir</button><button class="btn" id="know">✓ Je savais</button></div>' +
      '<p class="muted small center">Encore ' + fl.queue.length + ' carte' + (fl.queue.length > 1 ? 's' : '') + ' dans le paquet</p>';
    bindNav();
    document.getElementById('card').addEventListener('click', function () {
      fl.flipped = !fl.flipped;
      this.classList.toggle('flipped', fl.flipped);
    });
    document.getElementById('know').addEventListener('click', function () {
      fl.queue.shift(); fl.known++; fl.flipped = false; addXp(1); save(); routes.flash(deckId);
    });
    document.getElementById('again').addEventListener('click', function () {
      fl.queue.push(fl.queue.shift()); fl.flipped = false; routes.flash(deckId);
    });
  };

  // ---------------------------------------------------------------- Part 6
  var p6 = null;
  routes.part6 = function (idx) {
    var texts = window.PART6;
    if (idx === undefined || !texts[idx]) {
      app.innerHTML = topbar('Part 6 · Textes à trous', '') +
        '<p class="muted small">Comme au TOEIC : un texte, 4 blancs. Le dernier blanc demande d\'insérer une phrase entière.</p><div class="list">' +
        texts.map(function (t, i) {
          var done = store.p6done.indexOf(i) >= 0;
          return '<button class="item" data-go="part6/' + i + '"><span class="ic">' + t.icon + '</span><span class="grow"><b>' + esc(t.title) + (done ? ' ✓' : '') + '</b><br><span class="small muted">4 questions</span></span><span class="chev">›</span></button>';
        }).join('') + '</div>';
      return bindNav();
    }
    var t = texts[idx];
    if (!p6 || p6.idx !== idx) p6 = { idx: idx, ans: [null, null, null, null] };
    var y = window.scrollY;
    var body = esc(t.text).replace(/\[(\d)\]/g, function (_, d) {
      var k = +d - 1, b = t.blanks[k], a = p6.ans[k];
      if (a === null) return '<span class="p6blank">(' + d + ')</span>';
      var word = k === 3 ? '✓ phrase ' + d : b.c[b.a];
      return '<span class="p6blank ' + (a === b.a ? 'ok' : 'ko') + '">' + esc(word) + '</span>';
    });
    var html = topbar(esc(t.title), 'part6') + '<div class="card p6text">' + body + '</div>';
    t.blanks.forEach(function (b, k) {
      var a = p6.ans[k], done = a !== null;
      html += '<div class="p6q"><h3>Question ' + (k + 1) + (k === 3 ? ' · phrase à insérer' : '') + '</h3><div class="choices">' + b.c.map(function (c, i) {
        var cls = done ? (i === b.a ? 'ok' : (i === a ? 'ko' : 'dim')) : '';
        return '<button class="choice ' + cls + '" data-b="' + k + '" data-i="' + i + '"' + (done ? ' disabled' : '') + '><span class="let">' + LETTERS[i] + '</span><span>' + esc(c) + '</span></button>';
      }).join('') + '</div>' +
        (done ? '<div class="feedback ' + (a === b.a ? 'ok' : 'ko') + '"><p style="margin:0">' + esc(b.e) + '</p></div>' : '') + '</div>';
    });
    var all = p6.ans.every(function (a) { return a !== null; });
    if (all) {
      var okN = p6.ans.filter(function (a, k) { return a === t.blanks[k].a; }).length;
      html += '<div class="card center" style="margin-top:16px"><div class="score-big">' + okN + ' / 4</div></div>' +
        '<div class="btn-row"><button class="btn secondary" data-go="part6">Autres textes</button>' +
        (+idx + 1 < texts.length ? '<button class="btn" data-go="part6/' + (+idx + 1) + '">Texte suivant →</button>' : '<button class="btn" data-go="">Accueil</button>') + '</div>';
    }
    app.innerHTML = html;
    window.scrollTo(0, y);
    bindNav();
    on('[data-b]', 'click', function () {
      var k = +this.getAttribute('data-b'), i = +this.getAttribute('data-i');
      p6.ans[k] = i;
      touchDay();
      countToday();
      store.p6.n++;
      if (i === t.blanks[k].a) { store.p6.ok++; addXp(10); }
      if (p6.ans.every(function (a) { return a !== null; }) && store.p6done.indexOf(+idx) < 0) store.p6done.push(+idx);
      checkBadges();
      routes.part6(idx);
    });
  };

  // ---------------------------------------------------------------- fiches & méthode
  routes.lessons = function () {
    app.innerHTML = topbar('Fiches de grammaire', '') + '<div class="list">' + Object.keys(THEMES).map(function (k) {
      var s = store.stats[k];
      return '<button class="item" data-go="lesson/' + k + '"><span class="ic">' + THEMES[k].icon + '</span><span class="grow"><b>' + esc(THEMES[k].name) + '</b><br><span class="small muted">' +
        (s && s.n ? pct(s.ok, s.n) + ' % de réussite' : 'Pas encore travaillé') + '</span></span><span class="chev">›</span></button>';
    }).join('') + '</div>';
    bindNav();
  };
  routes.lesson = function (k) {
    var L = window.LESSONS[k];
    if (!L) return replace('lessons');
    var html = topbar(THEMES[k].icon + ' ' + esc(THEMES[k].name), 'lessons') + '<div class="tip">' + esc(L.intro) + '</div>';
    L.blocks.forEach(function (b) {
      html += '<h2>' + esc(b.title) + '</h2><div class="card">' +
        (b.rows ? '<table class="rules">' + b.rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table>' : '') +
        (b.text ? '<p style="margin:0">' + esc(b.text) + '</p>' : '') + '</div>';
    });
    if (L.tenses) html += '<button class="btn secondary" data-go="tenses">⏳ Voir les frises des temps</button>';
    html += '<button class="btn" id="practice">S\'entraîner sur ce thème (10 questions)</button>';
    app.innerHTML = html;
    bindNav();
    document.getElementById('practice').addEventListener('click', function () {
      startSession(shuffle(poolFor([k])).slice(0, 10), 'train', { title: THEMES[k].name });
    });
  };
  routes.method = function () {
    app.innerHTML = topbar('Méthode Part 5', '') +
      '<div class="card"><p style="margin-top:0">La Part 5 contient <b>30 phrases à compléter</b>, chacune avec 4 propositions. Voici les réflexes à prendre :</p><ol class="clean">' +
      window.METHOD.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ol></div>' +
      '<h2>Reconnaître le type de question</h2><div class="card"><table class="rules">' +
      '<tr><td>succeed / success / successful / successfully</td><td>🧩 Nature du mot</td></tr>' +
      '<tr><td>works / worked / has worked / is working</td><td>⏳ Temps</td></tr>' +
      '<tr><td>although / despite / however / because</td><td>🔗 Connecteur</td></tr>' +
      '<tr><td>at / on / in / by</td><td>📍 Préposition</td></tr>' +
      '<tr><td>who / which / whose / whom</td><td>👤 Relatif</td></tr>' +
      '<tr><td>to do / doing / do / done</td><td>🎯 Gérondif / infinitif</td></tr>' +
      '</table></div><button class="btn" data-go="train">S\'entraîner maintenant</button>';
    bindNav();
  };

  // ---------------------------------------------------------------- statistiques
  routes.stats = function () {
    var tot = 0, ok = 0;
    Object.keys(store.stats).forEach(function (k) { tot += store.stats[k].n; ok += store.stats[k].ok; });
    var l = level();
    app.innerHTML = topbar('Statistiques', '') +
      '<div class="grid">' +
        statTile('⭐', 'Niveau ' + l, levelName(l)) + statTile('✨', store.xp + ' XP', 'au total') +
        statTile('🔥', (store.dayStreak || 0) + ' jour(s)', 'série en cours') + statTile('⚡', 'x' + store.bestCombo, 'meilleur combo') +
        statTile('✅', pct(ok, tot) + ' %', ok + ' / ' + tot + ' réponses justes') + statTile('⏳', store.tensesSeen.length + ' / 12', 'frises étudiées') +
        statTile('❤️', store.survivalBest + ' pts', 'record Survie') + statTile('🚀', store.blitzBest + ' pts', 'record Défi éclair') +
      '</div>' +
      '<h2>Réussite par thème</h2><div class="card">' + Object.keys(THEMES).map(function (k) {
        var s = store.stats[k] || { ok: 0, n: 0 };
        return barRow(THEMES[k].icon + ' ' + THEMES[k].name, s.ok, s.n);
      }).join('') + barRow('📰 Part 6', store.p6.ok, store.p6.n) + '</div>' +
      (store.tests.length ? '<h2>Tests chrono</h2><div class="card">' + store.tests.slice(-5).reverse().map(function (t) {
        return '<div class="bar-row"><span class="lbl">' + esc(t.d) + '</span><div class="bar"><div style="width:' + t.score + '%"></div></div><span class="val">' + t.score + '%</span></div>';
      }).join('') + '</div>' : '') +
      '<button class="btn secondary" data-go="badges">🏅 Voir mes badges (' + store.badges.length + ' / ' + window.BADGES.length + ')</button>' +
      '<button class="btn ghost" id="reset">Réinitialiser ma progression</button>';
    bindNav();
    document.getElementById('reset').addEventListener('click', function () {
      if (!confirm('Effacer toute ta progression ?')) return;
      var d = defaults();
      Object.keys(d).forEach(function (k) { store[k] = d[k]; });
      save(); routes.stats();
    });
  };
  function statTile(ic, big, sub) {
    return '<div class="tile" style="min-height:auto"><span class="ic">' + ic + '</span><b>' + esc(big) + '</b><span>' + esc(sub) + '</span></div>';
  }

  render();
})();
