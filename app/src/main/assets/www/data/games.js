// Données des jeux « Trouve l'erreur » et « Machine à conjuguer ».

// Trouve l'erreur : la phrase est découpée en 4 morceaux, w = index du morceau fautif,
// fix = correction, e = explication, th = thème lié.
window.ERROR_ITEMS = [
  { p: ["The manager", "have asked", "all employees", "to attend the meeting."], w: 1, fix: "has asked", th: "quantite",
    e: "Le sujet « The manager » est singulier → has asked." },
  { p: ["Despite", "it was raining,", "the event", "continued outdoors."], w: 0, fix: "Although", th: "connecteurs",
    e: "« it was raining » = sujet + verbe → although. Despite est suivi d'un nom." },
  { p: ["We look forward to", "meet", "you", "next week."], w: 1, fix: "meeting", th: "verbes",
    e: "look forward TO + V-ING." },
  { p: ["She has worked", "here", "since", "five years."], w: 2, fix: "for", th: "prepositions",
    e: "« five years » est une durée → for. Since + point de départ." },
  { p: ["The informations", "you sent us", "is", "very useful."], w: 0, fix: "The information", th: "quantite",
    e: "« information » est indénombrable : jamais de -s." },
  { p: ["If I", "will see him,", "I will give him", "the message."], w: 1, fix: "see him,", th: "conditions",
    e: "Jamais will après if : If I see him, I will…" },
  { p: ["The report", "was wrote", "by the", "marketing team."], w: 1, fix: "was written", th: "passif",
    e: "Passif = be + PARTICIPE PASSÉ : write → wrote → written." },
  { p: ["Mr. Davis", "is", "more taller", "than his brother."], w: 2, fix: "taller", th: "comparatifs",
    e: "Adjectif court : tall → taller. On ne combine pas « more » et « -er »." },
  { p: ["Each", "of the candidates", "have", "a strong profile."], w: 2, fix: "has", th: "quantite",
    e: "« Each of + pluriel » → verbe au singulier." },
  { p: ["We", "have signed", "the contract", "last week."], w: 1, fix: "signed", th: "temps",
    e: "« last week » = moment passé daté → prétérit, pas de present perfect." },
  { p: ["The new software", "is", "remarkable", "easy to use."], w: 2, fix: "remarkably", th: "nature",
    e: "Devant un adjectif (easy), il faut un adverbe → remarkably." },
  { p: ["Mr. Lee suggested", "to postpone", "the meeting", "until Friday."], w: 1, fix: "postponing", th: "verbes",
    e: "suggest + V-ING." },
  { p: ["The company", "who", "I work for", "is based in Paris."], w: 1, fix: "which / that", th: "pronoms",
    e: "Antécédent = une chose (the company) → which ou that." },
  { p: ["She", "is very", "interested", "on marketing."], w: 3, fix: "in marketing", th: "prepositions",
    e: "interested IN something." },
  { p: ["By the time", "we arrived,", "the film", "already started."], w: 3, fix: "had already started", th: "temps",
    e: "Action antérieure à une autre action passée → past perfect (had + pp)." },
  { p: ["The manager made us", "to stay", "late", "on Friday."], w: 1, fix: "stay", th: "verbes",
    e: "make + quelqu'un + BASE VERBALE (sans to)." },
  { p: ["You", "must to", "wear", "a badge."], w: 1, fix: "must", th: "modaux",
    e: "Un modal n'est jamais suivi de « to »." },
  { p: ["The company", "plans to", "rise", "its prices."], w: 2, fix: "raise", th: "confusions",
    e: "raise + complément (its prices). rise s'emploie sans complément." },
  { p: ["Sales", "has increased", "a lot", "this year."], w: 1, fix: "have increased", th: "quantite",
    e: "« Sales » est pluriel → have increased." },
  { p: ["Please", "say me", "when", "you are ready."], w: 1, fix: "tell me", th: "confusions",
    e: "tell + personne. On ne dit pas « say me »." },
  { p: ["She", "don't like", "working", "on weekends."], w: 1, fix: "doesn't like", th: "temps",
    e: "Présent simple à la 3e personne du singulier : she doesn't." },
  { p: ["I", "am working", "here", "since 2019."], w: 1, fix: "have been working", th: "temps",
    e: "« since 2019 » → present perfect (continu), jamais le présent." },
  { p: ["The meeting", "will start", "when the director", "will arrive."], w: 3, fix: "arrives.", th: "temps",
    e: "Après when (sens futur), on met le présent : when the director arrives." },
  { p: ["He gave me", "an useful", "piece of", "advice."], w: 1, fix: "a useful", th: "quantite",
    e: "« useful » se prononce avec un son « you » (consonne) → a useful." },
  { p: ["We discussed", "about", "the budget", "yesterday."], w: 1, fix: "(à supprimer)", th: "prepositions",
    e: "discuss est transitif direct : we discussed the budget (pas de « about »)." },
  { p: ["Although", "the delay,", "the project", "was a success."], w: 0, fix: "Despite", th: "connecteurs",
    e: "« the delay » est un nom → despite / in spite of." },
  { p: ["The employees", "which", "work late", "get a bonus."], w: 1, fix: "who", th: "pronoms",
    e: "Antécédent = des personnes → who (ou that)." },
  { p: ["The letters", "were sended", "to all", "our clients."], w: 1, fix: "were sent", th: "passif",
    e: "send est irrégulier : send → sent → sent." },
  { p: ["This is", "the more expensive", "hotel", "in the city."], w: 1, fix: "the most expensive", th: "comparatifs",
    e: "« in the city » → superlatif : the most expensive." },
  { p: ["You", "should to", "call", "the client."], w: 1, fix: "should", th: "modaux",
    e: "should + base verbale, sans « to »." },
  { p: ["I'm looking forward", "to hear", "from", "you."], w: 1, fix: "to hearing", th: "verbes",
    e: "look forward TO + V-ING." },
  { p: ["If I", "would have", "more time,", "I would travel."], w: 1, fix: "had", th: "conditions",
    e: "Type 2 : If + prétérit (If I had), jamais would après if." }
];

// Machine à conjuguer : formes de chaque verbe et complément d'exemple.
window.VERBS = [
  { base: "work",   s: "works",   past: "worked",   pp: "worked",   ing: "working",   obj: "at the office" },
  { base: "call",   s: "calls",   past: "called",   pp: "called",   ing: "calling",   obj: "the client" },
  { base: "finish", s: "finishes", past: "finished", pp: "finished", ing: "finishing", obj: "the report" },
  { base: "study",  s: "studies", past: "studied",  pp: "studied",  ing: "studying",  obj: "English" },
  { base: "go",     s: "goes",    past: "went",     pp: "gone",     ing: "going",     obj: "to London" },
  { base: "take",   s: "takes",   past: "took",     pp: "taken",    ing: "taking",    obj: "the train" },
  { base: "write",  s: "writes",  past: "wrote",    pp: "written",  ing: "writing",   obj: "an e-mail" },
  { base: "meet",   s: "meets",   past: "met",      pp: "met",      ing: "meeting",   obj: "the manager" },
  { base: "buy",    s: "buys",    past: "bought",   pp: "bought",   ing: "buying",    obj: "a new laptop" },
  { base: "make",   s: "makes",   past: "made",     pp: "made",     ing: "making",    obj: "a decision" },
  { base: "leave",  s: "leaves",  past: "left",     pp: "left",     ing: "leaving",   obj: "the office" },
  { base: "send",   s: "sends",   past: "sent",     pp: "sent",     ing: "sending",   obj: "the invoice" }
];

// Sujets : be = forme de « be » au présent, was = forme au passé, third = 3e personne du singulier.
window.SUBJECTS = [
  { w: "I",    be: "am",  was: "was",  third: false },
  { w: "you",  be: "are", was: "were", third: false },
  { w: "she",  be: "is",  was: "was",  third: true },
  { w: "we",   be: "are", was: "were", third: false },
  { w: "they", be: "are", was: "were", third: false }
];

// Repère de temps ajouté en fin de phrase pour chaque temps.
window.TENSE_MARKERS = {
  presentSimple: "every day",
  presentContinuous: "right now",
  presentPerfect: "recently",
  presentPerfectContinuous: "since this morning",
  pastSimple: "yesterday",
  pastContinuous: "when the phone rang",
  pastPerfect: "before the meeting started",
  pastPerfectContinuous: "for an hour when the boss arrived",
  futureWill: "tomorrow",
  goingTo: "next week",
  futureContinuous: "at 10 a.m. tomorrow",
  futurePerfect: "by Friday"
};

// Badges : id, icône, nom, description. La condition est évaluée dans app.js.
window.BADGES = [
  { id: "first",    icon: "🌱", name: "Premiers pas",    desc: "Donner une première bonne réponse" },
  { id: "hundred",  icon: "💯", name: "Centurion",       desc: "100 bonnes réponses" },
  { id: "fivehundred", icon: "🏛️", name: "Légende",     desc: "500 bonnes réponses" },
  { id: "combo10",  icon: "⚡", name: "En feu",          desc: "Combo de 10 bonnes réponses d'affilée" },
  { id: "tenses",   icon: "⏳", name: "Maître du temps", desc: "Étudier les 12 frises des temps" },
  { id: "streak7",  icon: "📅", name: "Régulier",        desc: "S'entraîner 7 jours de suite" },
  { id: "test80",   icon: "⏱️", name: "Prêt pour le jour J", desc: "Au moins 80 % à un test chrono" },
  { id: "survivor", icon: "❤️", name: "Survivant",       desc: "20 points en mode Survie" },
  { id: "blitz",    icon: "🚀", name: "Éclair",          desc: "15 bonnes réponses en Défi éclair" },
  { id: "detective", icon: "🔍", name: "Détective",      desc: "Sans faute à « Trouve l'erreur »" },
  { id: "reader",   icon: "📰", name: "Lecteur",         desc: "Terminer les 8 textes de la Part 6" },
  { id: "reader7",  icon: "📚", name: "Lecteur expert",  desc: "Terminer tous les documents de la Part 7" },
  { id: "allround", icon: "🌍", name: "Polyvalent",      desc: "Répondre à 10 questions dans chaque thème" },
  { id: "goal",     icon: "🎯", name: "Objectif atteint", desc: "Atteindre l'objectif du jour" }
];
