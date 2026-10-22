// Frises chronologiques des temps.
// Axe horizontal : x = 0 (passé lointain) … 50 (MAINTENANT) … 100 (futur lointain).
// Éléments : point {x, label, k: 2 = 2e couleur}, span {x1, x2, label, wavy}, dots {x1, x2, n, label},
//            arrow {x1, x2, label}, ref {x, label} (repère de temps en pointillés).
window.TENSE_GROUPS = [
  { name: "Présent", ids: ["presentSimple", "presentContinuous", "presentPerfect", "presentPerfectContinuous"] },
  { name: "Passé",   ids: ["pastSimple", "pastContinuous", "pastPerfect", "pastPerfectContinuous"] },
  { name: "Futur",   ids: ["futureWill", "goingTo", "futureContinuous", "futurePerfect"] }
];

window.TENSES = {
  presentSimple: {
    name: "Present simple", fr: "Présent simple", color: "c1",
    form: "Sujet + base verbale (+ -s avec he / she / it)",
    use: ["Habitudes, actions répétées", "Vérités générales", "Horaires et programmes (trains, cours…)", "Après when / once / as soon as pour parler du futur"],
    signals: ["always", "usually", "often", "every day", "never", "on Mondays"],
    examples: ["She works in Paris.", "The train leaves at 8:15 every morning.", "Mr. Tanaka usually takes the bus."],
    tl: [ { t: "dots", x1: 6, x2: 94, n: 9, label: "action répétée" } ],
    tip: "Pas de moment précis : l'action se répète tout au long de la ligne du temps."
  },
  presentContinuous: {
    name: "Present continuous", fr: "Présent continu (be + -ing)", color: "c2",
    form: "Sujet + am / is / are + V-ing",
    use: ["Action en cours au moment où l'on parle", "Situation temporaire", "Projet futur déjà organisé"],
    signals: ["now", "right now", "at the moment", "currently", "Look!", "Listen!"],
    examples: ["He is calling a client right now.", "Currently, the company is developing a new product.", "Be quiet, the director is making a phone call."],
    tl: [ { t: "span", x1: 40, x2: 60, wavy: true, label: "en cours" } ],
    tip: "L'action a commencé un peu avant maintenant et n'est pas finie."
  },
  presentPerfect: {
    name: "Present perfect", fr: "Present perfect (have + participe passé)", color: "c3",
    form: "Sujet + have / has + participe passé",
    use: ["Action passée SANS date précise, avec un résultat maintenant", "Action commencée dans le passé qui dure encore (since / for)", "Bilan sur une période non terminée (this year, so far)"],
    signals: ["since", "for", "already", "yet", "just", "ever", "never", "so far", "recently", "this year"],
    examples: ["She has worked here since 2015.", "I have lost my keys.", "Sales have increased over the past six months."],
    tl: [ { t: "point", x: 22, label: "début" }, { t: "arrow", x1: 22, x2: 50, label: "lien avec maintenant" } ],
    tip: "Le passé est relié au présent. Jamais avec yesterday, ago, last week, in 2019 !"
  },
  presentPerfectContinuous: {
    name: "Present perfect continuous", fr: "Present perfect continu", color: "c4",
    form: "Sujet + have / has been + V-ing",
    use: ["Action qui a commencé dans le passé et qui est TOUJOURS en cours", "Insiste sur la durée de l'action"],
    signals: ["for two hours", "since this morning", "all day", "how long"],
    examples: ["They have been waiting for two hours.", "The technicians have been working on the network all day.", "How long have you been studying English?"],
    tl: [ { t: "span", x1: 18, x2: 50, wavy: true, label: "dure jusqu'à maintenant" }, { t: "ref", x: 18, label: "since / for" } ],
    tip: "Comme le present perfect, mais on insiste sur la durée et l'activité en cours."
  },
  pastSimple: {
    name: "Past simple (prétérit)", fr: "Prétérit", color: "c5",
    form: "Sujet + V-ed (ou forme irrégulière : went, took, saw…)",
    use: ["Action terminée à un moment précis du passé", "Suite d'actions passées (récit)"],
    signals: ["yesterday", "ago", "last week", "in 2019", "when I was young"],
    examples: ["The shipment arrived yesterday.", "We signed the contract two days ago.", "The conference took place in 2019."],
    tl: [ { t: "point", x: 24, label: "action terminée" }, { t: "ref", x: 24, label: "yesterday / ago" } ],
    tip: "Un point daté dans le passé, coupé du présent."
  },
  pastContinuous: {
    name: "Past continuous", fr: "Passé continu (was / were + -ing)", color: "c6",
    form: "Sujet + was / were + V-ing",
    use: ["Action EN COURS à un moment du passé", "Action longue interrompue par une action courte (prétérit)", "Décor d'un récit"],
    signals: ["while", "when", "at 8 p.m. yesterday", "all morning"],
    examples: ["I was working when he called.", "While Mr. Brown was giving the presentation, the projector stopped.", "The employees were having lunch when the alarm rang."],
    tl: [ { t: "span", x1: 10, x2: 38, wavy: true, label: "action en cours" }, { t: "point", x: 26, label: "interruption (prétérit)", k: 2 } ],
    tip: "La vague = action longue en cours. Le point = événement court qui l'interrompt."
  },
  pastPerfect: {
    name: "Past perfect", fr: "Plus-que-parfait (had + participe passé)", color: "c7",
    form: "Sujet + had + participe passé",
    use: ["Action passée qui s'est produite AVANT une autre action passée", "« Le passé du passé »"],
    signals: ["by the time", "before", "after", "already", "when", "never … before"],
    examples: ["When I arrived, the train had left.", "By the time the manager arrived, the meeting had ended.", "She had lived in Paris before she moved to Tokyo."],
    tl: [ { t: "point", x: 10, label: "① had + pp" }, { t: "arrow", x1: 10, x2: 38, label: "avant" }, { t: "point", x: 38, label: "② prétérit", k: 2 }, { t: "ref", x: 38, label: "by the time…" } ],
    tip: "Deux actions passées : la plus ancienne (①) au past perfect, la plus récente (②) au prétérit."
  },
  pastPerfectContinuous: {
    name: "Past perfect continuous", fr: "Plus-que-parfait continu", color: "c8",
    form: "Sujet + had been + V-ing",
    use: ["Action qui DURAIT déjà depuis un moment avant un autre événement passé"],
    signals: ["for … when", "since … when", "how long"],
    examples: ["She had been working for hours when the boss arrived.", "The candidates had been waiting for an hour when the interviewer came.", "He had been waiting for 20 minutes when the bus came."],
    tl: [ { t: "span", x1: 8, x2: 32, wavy: true, label: "durait déjà" }, { t: "point", x: 32, label: "événement passé", k: 2 }, { t: "ref", x: 32, label: "when…" } ],
    tip: "On se place dans le passé et on regarde la durée de ce qui se passait juste avant."
  },
  futureWill: {
    name: "Future with will", fr: "Futur (will)", color: "c9",
    form: "Sujet + will + base verbale",
    use: ["Prédiction, opinion sur le futur", "Décision prise sur le moment", "Promesse, proposition"],
    signals: ["tomorrow", "next week", "soon", "probably", "I think", "in ten minutes"],
    examples: ["I'll call you back in ten minutes.", "The CEO will visit the new branch next week.", "I think prices will rise."],
    tl: [ { t: "point", x: 76, label: "action future" }, { t: "ref", x: 76, label: "tomorrow / next week" } ],
    tip: "Un point dans le futur. Attention : jamais will après when / if / once / as soon as !"
  },
  goingTo: {
    name: "Be going to", fr: "Futur proche (be going to)", color: "c10",
    form: "Sujet + am / is / are going to + base verbale",
    use: ["Intention, projet déjà décidé", "Prédiction basée sur un indice visible maintenant"],
    signals: ["Look!", "indice présent", "plans", "intention"],
    examples: ["Look at those clouds — it's going to rain.", "We are going to open a new store next year.", "She is going to apply for the job."],
    tl: [ { t: "point", x: 50, label: "indice", k: 2 }, { t: "arrow", x1: 50, x2: 80, label: "conduit à" }, { t: "point", x: 80, label: "action future" } ],
    tip: "Le futur est déjà « en route » depuis le présent : il y a un indice ou une décision."
  },
  futureContinuous: {
    name: "Future continuous", fr: "Futur continu (will be + -ing)", color: "c11",
    form: "Sujet + will be + V-ing",
    use: ["Action qui sera EN COURS à un moment précis du futur"],
    signals: ["this time tomorrow", "at 10 a.m. tomorrow", "all day tomorrow"],
    examples: ["This time tomorrow, we'll be flying over the Atlantic.", "At 9 a.m., I will be meeting the client.", "Don't call at noon; she will be having lunch."],
    tl: [ { t: "span", x1: 64, x2: 88, wavy: true, label: "en cours" }, { t: "ref", x: 76, label: "this time tomorrow" } ],
    tip: "On se projette à un moment futur : l'action est en plein déroulement."
  },
  futurePerfect: {
    name: "Future perfect", fr: "Futur antérieur (will have + pp)", color: "c12",
    form: "Sujet + will have + participe passé",
    use: ["Action qui sera TERMINÉE avant un moment futur"],
    signals: ["by Friday", "by next March", "by the end of the year", "by the time"],
    examples: ["By Friday, we will have finished the report.", "By next March, the firm will have completed its headquarters.", "By 2030, she will have worked here for 20 years."],
    tl: [ { t: "point", x: 66, label: "terminé" }, { t: "arrow", x1: 66, x2: 84, label: "avant" }, { t: "ref", x: 84, label: "by Friday" } ],
    tip: "« By + date future » est LE signal du futur antérieur au TOEIC."
  }
};

window.TENSE_COMPARISONS = [
  { a: "pastSimple", b: "presentPerfect", title: "Prétérit ou present perfect ?",
    text: "Date passée précise (yesterday, ago, in 2019) → prétérit. Pas de date, lien avec maintenant, since / for / yet / already → present perfect." },
  { a: "pastSimple", b: "pastPerfect", title: "Prétérit ou past perfect ?",
    text: "Le past perfect sert à montrer qu'une action passée a eu lieu AVANT une autre. Repère : by the time, before, already." },
  { a: "presentSimple", b: "presentContinuous", title: "Présent simple ou continu ?",
    text: "Habitude / vérité générale (usually, every day) → simple. Action en cours (now, currently, at the moment) → continu." },
  { a: "futureWill", b: "goingTo", title: "Will ou going to ?",
    text: "Décision sur le moment, promesse, opinion → will. Projet déjà décidé ou indice visible → going to." },
  { a: "presentPerfect", b: "presentPerfectContinuous", title: "Present perfect simple ou continu ?",
    text: "Simple → résultat, quantité (I have written 3 reports). Continu → durée de l'activité (I have been writing all day)." },
  { a: "pastSimple", b: "pastContinuous", title: "Prétérit ou past continuous ?",
    text: "Action courte, terminée → prétérit. Action longue en cours à ce moment-là → past continuous. Ensemble : I was working when he called." },
  { a: "futureWill", b: "futurePerfect", title: "Futur ou futur antérieur ?",
    text: "L'action aura lieu à ce moment → will. L'action sera déjà terminée avant ce moment (by + date) → will have + pp." }
];

// Jeu « Qu'est-ce qui s'est passé en premier ? »
// a / b : les deux actions, first : "a" ou "b", f : situé dans le futur, span : la 1re action dure.
window.CHRONO_ITEMS = [
  { s: "When Ms. Hill arrived, the meeting had already started.", a: "Ms. Hill arrived", b: "The meeting started", first: "b",
    e: "« had already started » (past perfect) = action la plus ancienne. La réunion avait commencé avant son arrivée." },
  { s: "When Ms. Hill arrived, the meeting started.", a: "Ms. Hill arrived", b: "The meeting started", first: "a",
    e: "Deux prétérits : les actions se suivent dans l'ordre. Elle arrive, PUIS la réunion commence." },
  { s: "By the time we got to the airport, our flight had left.", a: "We got to the airport", b: "Our flight left", first: "b",
    e: "« had left » = past perfect → l'avion était déjà parti." },
  { s: "After he had checked the figures, he sent the report.", a: "He checked the figures", b: "He sent the report", first: "a",
    e: "« had checked » (past perfect) = action antérieure : vérifier, puis envoyer." },
  { s: "She sent the e-mail before she called the client.", a: "She called the client", b: "She sent the e-mail", first: "b",
    e: "« before » indique l'ordre : l'e-mail d'abord, l'appel ensuite." },
  { s: "The client called while I was having lunch.", a: "The client called", b: "I started having lunch", first: "b", span: true,
    e: "« was having lunch » (past continuous) = action déjà en cours quand l'appel arrive." },
  { s: "The technician fixed the printer after we had reported the problem.", a: "The technician fixed the printer", b: "We reported the problem", first: "b",
    e: "« had reported » = past perfect → le signalement a eu lieu en premier." },
  { s: "By the time the CEO arrives tomorrow, we will have prepared the room.", a: "The CEO arrives", b: "We prepare the room", first: "b", f: true,
    e: "« will have prepared » (futur antérieur) = ce sera terminé AVANT l'arrivée du CEO." },
  { s: "Before the guests arrived, the staff had decorated the hall.", a: "The staff decorated the hall", b: "The guests arrived", first: "a",
    e: "« had decorated » = past perfect → la décoration est antérieure." },
  { s: "When the alarm rang, everybody left the building.", a: "The alarm rang", b: "Everybody left", first: "a",
    e: "Deux prétérits = succession : l'alarme sonne, puis tout le monde sort." },
  { s: "When the alarm rang, everybody had already left the building.", a: "The alarm rang", b: "Everybody left", first: "b",
    e: "« had already left » → tout le monde était déjà parti quand l'alarme a sonné." },
  { s: "He had been waiting for an hour when the bus finally came.", a: "The bus came", b: "He started waiting", first: "b", span: true,
    e: "« had been waiting » (past perfect continu) = l'attente durait déjà avant l'arrivée du bus." },
  { s: "Once you have signed the form, return it to HR.", a: "You return the form", b: "You sign the form", first: "b", f: true,
    e: "« Once you have signed » = d'abord signer, ensuite renvoyer." },
  { s: "The meeting will start as soon as the director arrives.", a: "The meeting starts", b: "The director arrives", first: "b", f: true,
    e: "« as soon as the director arrives » : l'arrivée déclenche le début de la réunion." }
];
