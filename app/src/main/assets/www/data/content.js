// Fiches de cours, cartes mémoire et textes Part 6.

window.METHOD = [
  "Lis d'abord les 4 choix : ils te disent quel point de grammaire est testé.",
  "Choix de la même famille (create / creative / creatively…) → question de nature de mot : regarde ce qu'il y a AVANT et APRÈS le blanc.",
  "Même verbe à des temps différents → cherche le repère de temps (since, ago, by, yesterday…).",
  "Mots de liaison différents → regarde si la suite est un nom (despite, because of) ou une phrase (although, because).",
  "Vise environ 20 secondes par question : la Part 5 compte 30 questions, garde du temps pour les Parts 6 et 7.",
  "Tu bloques ? Élimine les réponses impossibles, réponds quand même et passe : il n'y a pas de points négatifs."
];

window.LESSONS = {
  temps: {
    intro: "Au TOEIC, la question de temps se repère vite : les 4 choix sont le même verbe conjugué différemment. Le secret : trouver le MOT REPÈRE dans la phrase.",
    blocks: [
      { title: "Les repères qui décident", rows: [
        ["yesterday, ago, last…, in 2019", "Prétérit"],
        ["since, for, yet, already, so far, this year", "Present perfect"],
        ["now, currently, at the moment", "Présent continu"],
        ["usually, every day, always", "Présent simple"],
        ["by the time + passé, before, already", "Past perfect"],
        ["by + date future", "Futur antérieur (will have + pp)"],
        ["this time tomorrow", "Futur continu"],
        ["when / once / as soon as + futur", "PRÉSENT dans la subordonnée"]
      ] },
      { title: "Piège n°1", text: "Après when, once, as soon as, before, after, until, if, unless : jamais will. « Once the team finishes the report, they will send it. »" }
    ],
    tenses: true
  },
  nature: {
    intro: "Les 4 choix sont de la même famille (succeed, success, successful, successfully). Ne cherche pas le sens : regarde la PLACE du mot.",
    blocks: [
      { title: "Quelle nature selon la place ?", rows: [
        ["the / a / my + ___ + of", "NOM"],
        ["the / a + ___ + nom", "ADJECTIF"],
        ["very / so + ___", "ADJECTIF (ou adverbe)"],
        ["verbe + ___  /  ___ + adjectif", "ADVERBE"],
        ["will / has / is + ___ + verbe", "ADVERBE"],
        ["to + ___", "VERBE (base verbale)"],
        ["be + ___ (sujet = personne qui ressent)", "Adjectif en -ED"]
      ] },
      { title: "Les suffixes", rows: [
        ["-tion, -sion, -ment, -ness, -ity, -ance, -ence", "Nom"],
        ["-er, -or, -ant, -ist, -ee", "Nom de personne"],
        ["-ive, -ful, -ous, -able, -ible, -al, -ic", "Adjectif"],
        ["-ly", "Adverbe (sauf friendly, costly, timely, likely = adjectifs)"],
        ["-ize, -ify, -en, -ate", "Verbe"]
      ] }
    ]
  },
  prepositions: {
    intro: "Les prépositions de temps et de lieu tombent souvent. Apprends-les avec des exemples.",
    blocks: [
      { title: "Temps", rows: [
        ["AT", "heure précise : at 6 p.m., at noon, at night"],
        ["ON", "jour, date : on Monday, on May 3"],
        ["IN", "mois, année, saison : in June, in 2027"],
        ["BY", "au plus tard : by Friday"],
        ["UNTIL", "jusqu'à (ça dure) : open until midnight"],
        ["FOR / SINCE", "for + durée / since + point de départ"],
        ["DURING", "pendant + nom : during the meeting"],
        ["WITHIN", "dans un délai de : within 2 weeks"]
      ] },
      { title: "Verbes / adjectifs + préposition", rows: [
        ["depend ON", "rely ON, focus ON"],
        ["responsible FOR", "apply FOR, wait FOR"],
        ["interested IN", "invest IN, participate IN"],
        ["comply WITH", "deal WITH, provide sb WITH sth"]
      ] }
    ]
  },
  connecteurs: {
    intro: "La question clé : ce qui suit le blanc est-il un NOM ou une PHRASE (sujet + verbe) ?",
    blocks: [
      { title: "Nom ou phrase ?", rows: [
        ["despite / in spite of + NOM", "although / even though + PHRASE"],
        ["because of / due to / owing to + NOM", "because / since / as + PHRASE"],
        ["during + NOM", "while + PHRASE"]
      ] },
      { title: "Les paires fixes", rows: [
        ["both … and", "à la fois … et"],
        ["either … or", "soit … soit"],
        ["neither … nor", "ni … ni"],
        ["not only … but also", "non seulement … mais aussi"],
        ["whether … or", "que … ou"]
      ] },
      { title: "Entre deux phrases", text: "However, therefore, moreover, otherwise, in addition : souvent en début de phrase, suivis d'une virgule." }
    ]
  },
  pronoms: {
    intro: "Identifie la fonction du blanc : sujet, complément, possession ou réfléchi.",
    blocks: [
      { title: "Les formes", rows: [
        ["Sujet", "I, you, he, she, it, we, they"],
        ["Complément", "me, you, him, her, it, us, them"],
        ["Possessif + nom", "my, your, his, her, its, our, their"],
        ["Pronom possessif", "mine, yours, his, hers, ours, theirs"],
        ["Réfléchi", "myself, himself, herself, ourselves, themselves"]
      ] },
      { title: "Les relatifs", rows: [
        ["WHO", "personne, sujet"],
        ["WHOM", "personne, complément"],
        ["WHICH / THAT", "chose"],
        ["WHOSE + nom", "possession (dont le…)"],
        ["WHERE / WHEN", "lieu / moment"]
      ] }
    ]
  },
  passif: {
    intro: "Le sujet SUBIT l'action ? → be (au bon temps) + participe passé.",
    blocks: [
      { title: "Le passif à tous les temps", rows: [
        ["Présent", "is / are done"],
        ["Prétérit", "was / were done"],
        ["Present perfect", "has / have been done"],
        ["En cours", "is being done"],
        ["Futur", "will be done"],
        ["Modal", "must / can / should be done"]
      ] },
      { title: "Astuce", text: "« by + personne » après le blanc = signal fort du passif. Expressions fréquentes : be required to, be expected to, be scheduled to." }
    ]
  },
  comparatifs: {
    intro: "Repère « than », « as … as », « the … of all / in the » et le nombre de syllabes de l'adjectif.",
    blocks: [
      { title: "Les règles", rows: [
        ["Adjectif court", "cheaper than / the cheapest"],
        ["Adjectif long", "more expensive than / the most expensive"],
        ["Égalité", "as fast as"],
        ["Irréguliers", "good → better → best ; bad → worse → worst ; far → further"],
        ["Progression", "the more …, the better …"]
      ] }
    ]
  },
  verbes: {
    intro: "Certains verbes sont suivis de -ING, d'autres de TO + verbe. Il faut les apprendre (voir les cartes mémoire).",
    blocks: [
      { title: "Les deux familles", rows: [
        ["+ V-ING", "enjoy, avoid, finish, suggest, consider, mind, recommend, keep"],
        ["+ TO V", "decide, plan, agree, hope, want, need, refuse, offer, afford, expect"],
        ["make / let + base verbale", "The boss made us stay."],
        ["Préposition + V-ING", "before leaving, for training, look forward to seeing"]
      ] }
    ]
  },
  conditions: {
    intro: "Repère le temps dans la proposition en « if » pour déduire celui de la principale.",
    blocks: [
      { title: "Les 4 types", rows: [
        ["Type 0 (vérité)", "If + présent → présent"],
        ["Type 1 (possible)", "If + présent → will + V"],
        ["Type 2 (imaginaire)", "If + prétérit → would + V"],
        ["Type 3 (passé, regret)", "If + had + pp → would have + pp"]
      ] },
      { title: "Formes soutenues (très TOEIC !)", rows: [
        ["Should you need help, …", "= If you need help"],
        ["Had we known, …", "= If we had known"],
        ["Unless", "= if … not"]
      ] }
    ]
  },
  quantite: {
    intro: "Dénombrable ou indénombrable ? Singulier ou pluriel ?",
    blocks: [
      { title: "Les quantifieurs", rows: [
        ["many / few / fewer / a number of", "+ dénombrable pluriel"],
        ["much / little / less / an amount of", "+ indénombrable"],
        ["each / every + singulier", "→ verbe au singulier"],
        ["the number of …", "→ singulier ; a number of → pluriel"]
      ] },
      { title: "Indénombrables pièges", text: "information, advice, equipment, furniture, luggage, baggage, feedback, research, news : pas de « s », pas de « a »." }
    ]
  },
  modaux: {
    intro: "Un modal (can, could, may, might, must, should, will, would) est toujours suivi de la BASE VERBALE : pas de -s, pas de to.",
    blocks: [
      { title: "Le sens de chaque modal", rows: [
        ["must", "obligation forte / déduction certaine"],
        ["mustn't", "INTERDICTION"],
        ["don't have to / needn't", "pas d'obligation (pas nécessaire)"],
        ["should / ought to", "conseil"],
        ["can / could", "capacité, permission (could = passé ou plus poli)"],
        ["may / might", "possibilité, permission polie (May I…?)"]
      ] },
      { title: "Modal + have + participe passé", rows: [
        ["must have done", "a sûrement fait (déduction)"],
        ["should have done", "aurait dû faire (reproche)"],
        ["could / might have done", "aurait pu faire"]
      ] },
      { title: "Piège", text: "need to / have to / ought to se construisent avec « to » ; must, can, should, may n'en ont jamais." }
    ]
  },
  confusions: {
    intro: "Des paires de mots proches qui piègent souvent les candidats. Le contexte (complément ou non, nom ou verbe) décide.",
    blocks: [
      { title: "Avec ou sans complément ?", rows: [
        ["raise sth (raised)", "rise (rose, risen) — sans complément"],
        ["lay sth (laid)", "lie (lay, lain) — sans complément"],
        ["lend sb sth (prêter)", "borrow sth from sb (emprunter)"]
      ] },
      { title: "Make ou do ?", rows: [
        ["MAKE", "a decision, an effort, a mistake, a call, progress, a profit"],
        ["DO", "business, research, your best, a favor, the work, an exercise"]
      ] },
      { title: "Autres paires", rows: [
        ["say sth / tell sb", "He said hello. He told me the news."],
        ["affect (verbe) / effect (nom)", "It affects sales. It has an effect on sales."],
        ["as / like", "as = en tant que ; like = comme (comparaison)"],
        ["remind / remember", "remind sb to do ; remember to do"]
      ] }
    ]
  }
};

window.FLASH_DECKS = {
  prepTime: { name: "Prépositions de temps", icon: "🕒", cards: [
    ["AT", "Heure précise, moment : at 9 a.m., at noon, at night, at the end of"],
    ["ON", "Jours et dates : on Friday, on June 5, on my birthday"],
    ["IN", "Mois, années, saisons, parties de journée : in May, in 2026, in the morning"],
    ["BY", "Au plus tard (échéance) : Send it by Friday."],
    ["UNTIL", "Jusqu'à (l'action dure) : The store is open until 9."],
    ["SINCE", "Depuis + point de départ (+ present perfect) : since 2015"],
    ["FOR", "Pendant / depuis + durée : for three years"],
    ["DURING", "Pendant + nom : during the meeting"],
    ["WITHIN", "Dans un délai de : within 30 days"]
  ] },
  connect: { name: "Connecteurs", icon: "🔗", cards: [
    ["ALTHOUGH / EVEN THOUGH", "Bien que + sujet + verbe : Although it rained, we went out."],
    ["DESPITE / IN SPITE OF", "Malgré + NOM ou V-ing : Despite the rain…"],
    ["HOWEVER", "Cependant (entre deux phrases) : It's expensive. However, it sells well."],
    ["BECAUSE / SINCE / AS", "Parce que + sujet + verbe"],
    ["BECAUSE OF / DUE TO", "À cause de + NOM : due to bad weather"],
    ["UNLESS", "À moins que (= if not) : Unless you hurry, you'll be late."],
    ["WHEREAS / WHILE", "Alors que (opposition) : Sales rose here, whereas they fell there."],
    ["SO THAT", "Afin que (but) : We left early so that we could park."],
    ["THEREFORE", "Par conséquent : Costs rose; therefore, prices increased."],
    ["MOREOVER / IN ADDITION", "De plus (ajout d'idée)"],
    ["OTHERWISE", "Sinon : Hurry, otherwise you'll miss the train."]
  ] },
  suffix: { name: "Suffixes : quelle nature ?", icon: "🧩", cards: [
    ["-tion / -sion", "NOM : information, decision"],
    ["-ment / -ness / -ity", "NOM : payment, awareness, ability"],
    ["-ance / -ence", "NOM : performance, experience"],
    ["-er / -or / -ant / -ee", "NOM DE PERSONNE : employer, applicant, employee"],
    ["-ive / -ful / -ous", "ADJECTIF : effective, useful, generous"],
    ["-able / -ible / -al", "ADJECTIF : reliable, flexible, financial"],
    ["-ly", "ADVERBE : quickly… mais friendly, costly, timely = ADJECTIFS !"],
    ["-ize / -ify / -en", "VERBE : organize, simplify, strengthen"],
    ["-ed / -ing (adjectifs)", "-ed = ce que je ressens (interested) ; -ing = ce qui provoque (interesting)"]
  ] },
  gerund: { name: "Verbe + -ing ou to ?", icon: "🎯", cards: [
    ["enjoy", "+ V-ING : I enjoy working here."],
    ["avoid", "+ V-ING : Avoid using the elevator."],
    ["suggest", "+ V-ING : She suggested postponing the meeting."],
    ["consider", "+ V-ING : We are considering moving."],
    ["look forward to", "+ V-ING : We look forward to hearing from you."],
    ["decide", "+ TO V : He decided to accept."],
    ["plan", "+ TO V : We plan to expand."],
    ["agree", "+ TO V : They agreed to help."],
    ["afford", "+ TO V : We can't afford to wait."],
    ["make / let", "+ BASE VERBALE : They made us wait. Let me know."],
    ["stop", "stop doing = arrêter de faire ; stop to do = s'arrêter pour faire"]
  ] },
  irregular: { name: "Verbes irréguliers TOEIC", icon: "📚", cards: [
    ["begin", "began — begun"], ["bring", "brought — brought"], ["buy", "bought — bought"],
    ["choose", "chose — chosen"], ["give", "gave — given"], ["grow", "grew — grown"],
    ["hold", "held — held"], ["lead", "led — led"], ["leave", "left — left"],
    ["rise", "rose — risen"], ["seek", "sought — sought"], ["send", "sent — sent"],
    ["meet", "met — met"], ["take", "took — taken"], ["write", "wrote — written"]
  ] },
  modals: { name: "Les modaux", icon: "🛂", cards: [
    ["must", "Obligation forte : You must wear a badge. / Déduction : He must be tired."],
    ["mustn't", "INTERDICTION : You mustn't smoke here."],
    ["don't have to", "Pas d'obligation : You don't have to come (ce n'est pas nécessaire)."],
    ["should", "Conseil : You should check your e-mail."],
    ["could", "Capacité passée ou demande polie : Could you help me?"],
    ["might / may", "Possibilité : It might rain. / Permission : May I come in?"],
    ["should have + pp", "Reproche : You should have called me."],
    ["must have + pp", "Déduction sur le passé : She must have left."]
  ] },
  pairs: { name: "Mots confondus", icon: "🔀", cards: [
    ["rise / raise", "rise (rose, risen) = monter, sans complément ; raise (raised) + complément : raise prices"],
    ["lie / lay", "lie (lay, lain) = être allongé ; lay (laid) + complément : lay the files on the desk"],
    ["say / tell", "say something ; tell SOMEONE something"],
    ["make / do", "make a decision, an effort ; do business, a favor, research"],
    ["lend / borrow", "lend = prêter ; borrow = emprunter"],
    ["affect / effect", "affect = verbe ; effect = nom"],
    ["as / like", "as = en tant que (fonction) ; like = comme (comparaison)"],
    ["remind / remember", "remind someone to do ; remember to do"],
    ["economic / economical", "economic = lié à l'économie ; economical = économe, peu coûteux"]
  ] }
};

// Part 6 : textes à trous. Chaque blanc : c (choix), a (bonne réponse), e (explication).
// Le dernier blanc de chaque texte est une phrase à insérer.
window.PART6 = [
  { title: "E-mail : travaux au bureau", icon: "📧",
    text: "To: All staff\nSubject: Office renovation\n\nDear colleagues,\n\nPlease note that the third floor [1] from May 3 to May 17. During this period, employees from the third floor will work in the conference rooms on the first floor. [2], parking will be limited because of the construction trucks. We recommend [3] public transportation if possible. [4]\n\nThank you for your understanding.\nFacilities Department",
    blanks: [
      { c: ["renovates", "will be renovated", "renovated", "has renovated"], a: 1, e: "L'étage subit l'action (passif) et c'est dans le futur (from May 3) : will be renovated." },
      { c: ["However", "In addition", "Therefore", "Instead"], a: 1, e: "On ajoute un deuxième inconvénient : In addition (de plus)." },
      { c: ["use", "to use", "using", "used"], a: 2, e: "recommend + V-ING : We recommend using…" },
      { c: ["The renovation was completed last year.", "We apologize for any inconvenience this may cause.", "Parking is free for all visitors.", "Please send your résumé to HR."], a: 1, e: "La phrase logique avant « Thank you for your understanding » : des excuses pour la gêne occasionnée." }
    ] },
  { title: "Annonce : nouveau café", icon: "☕",
    text: "Greenline Café is proud to announce the opening of [1] second location on Main Street. Since we opened in 2018, our customers [2] us for fresh, local food. The new café will offer the same menu, [3] a larger terrace. [4] To celebrate, all drinks will be half price during the opening week.",
    blanks: [
      { c: ["its", "it's", "his", "their"], a: 0, e: "Possessif de « Greenline Café » (une chose, singulier) : its. « it's » = it is." },
      { c: ["chose", "have chosen", "choose", "will choose"], a: 1, e: "« Since we opened in 2018 » : depuis un point du passé jusqu'à maintenant → present perfect." },
      { c: ["in addition", "as well as", "moreover", "although"], a: 1, e: "Suivi d'un groupe nominal (a larger terrace) : as well as (ainsi que)." },
      { c: ["The grand opening is scheduled for June 1.", "Our café closed permanently last month.", "Customers must book tables a year in advance.", "The terrace is too small for guests."], a: 0, e: "La phrase suivante dit « To celebrate… » : il faut d'abord annoncer la date d'ouverture." }
    ] },
  { title: "Note de service : notes de frais", icon: "🧾",
    text: "Effective next month, all employees [1] to submit travel expense reports within ten days of returning from a trip. Reports must include original receipts. Expenses submitted [2] this deadline will not be reimbursed. [3] you have questions about the new policy, please contact Mr. Novak in Accounting. [4]",
    blanks: [
      { c: ["require", "will be required", "requiring", "had required"], a: 1, e: "« Effective next month » = futur ; les employés sont tenus de… (passif) : will be required to." },
      { c: ["after", "before", "during", "since"], a: 0, e: "Les dépenses envoyées APRÈS la date limite ne sont pas remboursées." },
      { c: ["Unless", "Despite", "If", "Whether"], a: 2, e: "Condition logique : SI vous avez des questions, contactez…" },
      { c: ["He is available Monday through Friday from 9 a.m. to 5 p.m.", "The trip was very successful.", "Receipts are not necessary.", "Mr. Novak retired last year."], a: 0, e: "La phrase prolonge l'information sur Mr. Novak (ses horaires de disponibilité)." }
    ] },
  { title: "Lettre : produit en rupture", icon: "✉️",
    text: "Dear Ms. Fischer,\n\nThank you for your recent order. Unfortunately, the item you ordered is [1] out of stock. We expect to receive new stock [2] two weeks. If you prefer not to wait, we would be happy to offer you a full refund. [3], you may choose a similar product at the same price. [4]\n\nSincerely,\nCustomer Service",
    blanks: [
      { c: ["temporary", "temporarily", "temporariness", "temporize"], a: 1, e: "Le mot modifie « out of stock » : adverbe (temporarily)." },
      { c: ["within", "since", "until", "by"], a: 0, e: "« within two weeks » = dans un délai de deux semaines." },
      { c: ["Alternatively", "Because", "Despite", "Therefore"], a: 0, e: "On propose une autre option : Alternatively (sinon, autrement)." },
      { c: ["Please let us know which option you prefer.", "Your order was delivered yesterday.", "We do not offer refunds.", "The product has never been popular."], a: 0, e: "Après avoir proposé deux options, on demande au client de choisir." }
    ] },
  { title: "Offre d'emploi : superviseur", icon: "💼",
    text: "Brightway Logistics is looking for an experienced warehouse supervisor. The successful candidate [1] a team of 20 employees. Applicants must have at least three years of experience [2] a similar position. [3], knowledge of inventory software is required. [4]\n\nApplications should be sent to jobs@brightway.com by March 15.",
    blanks: [
      { c: ["manages", "will manage", "managed", "has managed"], a: 1, e: "Le futur employé dirigera l'équipe (pas encore recruté) → will manage." },
      { c: ["in", "on", "at", "of"], a: 0, e: "« experience IN a position / IN a field » = de l'expérience dans un poste." },
      { c: ["Moreover", "However", "Instead", "Otherwise"], a: 0, e: "On ajoute une exigence supplémentaire : Moreover (de plus)." },
      { c: ["We offer a competitive salary and excellent benefits.", "The warehouse was closed last year.", "Our trucks are painted blue.", "Please do not apply for this position."], a: 0, e: "Après les exigences, une offre d'emploi présente ce que l'entreprise propose (salaire, avantages)." }
    ] },
  { title: "Avis : maintenance du site", icon: "🛠️",
    text: "Dear valued customers,\n\nOur online banking service will be unavailable on Sunday, June 8, from 1 a.m. to 5 a.m. [1] this time, our technicians will install important security updates. We recommend [2] any urgent transactions before Saturday evening. [3] you experience any difficulties after the maintenance, please contact our support team. [4]\n\nThank you for your patience.",
    blanks: [
      { c: ["While", "During", "Since", "Until"], a: 1, e: "DURING + nom (this time). While serait suivi d'un sujet + verbe." },
      { c: ["complete", "to complete", "completing", "completed"], a: 2, e: "recommend + V-ING." },
      { c: ["Should", "Unless", "Despite", "Whether"], a: 0, e: "« Should you experience… » = If you experience… (inversion soutenue)." },
      { c: ["Our team is available 24 hours a day at 555-0199.", "Our bank was founded in 1890.", "The update failed completely.", "Online banking is no longer available."], a: 0, e: "La phrase prolonge logiquement « contact our support team » en donnant le moyen de le joindre." }
    ] },
  { title: "Note : réservation des salles", icon: "🗓️",
    text: "To: All employees\nFrom: Office Management\n\nStarting next Monday, meeting rooms [1] through the new online booking system. The paper sign-up sheets [2] no longer be used. To reserve a room, simply log in with your employee ID and select a time slot. Rooms can be booked up to two weeks [3] advance. [4]",
    blanks: [
      { c: ["must book", "must be booked", "booking", "have booked"], a: 1, e: "Les salles SONT réservées (passif) : modal + be + participe passé." },
      { c: ["will", "are", "have", "do"], a: 0, e: "« no longer be used » demande un modal devant la base verbale « be » : will." },
      { c: ["on", "at", "in", "by"], a: 2, e: "Expression fixe : IN advance (à l'avance)." },
      { c: ["A short user guide is attached to this e-mail.", "The meeting was very productive.", "Paper is more reliable than computers.", "Employee IDs will be deleted."], a: 0, e: "On présente un nouveau système : il est logique de joindre un guide d'utilisation." }
    ] },
  { title: "Communiqué : nouvelle usine", icon: "🏭",
    text: "Solara Energy announced yesterday that it [1] a new solar panel factory in Spain. The facility, [2] will open in 2028, is expected to create 400 jobs.\n\n\"This expansion reflects the [3] demand for renewable energy in Europe,\" said CEO Laura Mendes. [4]",
    blanks: [
      { c: ["builds", "will build", "built", "has been built"], a: 1, e: "La construction est un projet futur (l'usine ouvrira en 2028) → will build." },
      { c: ["who", "which", "where", "whose"], a: 1, e: "Antécédent = une chose (the facility), sujet de « will open » → which." },
      { c: ["grow", "growing", "grown", "growth"], a: 1, e: "Entre « the » et le nom « demand » : adjectif → growing (croissant)." },
      { c: ["Construction work will begin next spring.", "The CEO retired ten years ago.", "Solar energy is not popular in Spain.", "The factory closed last month."], a: 0, e: "Seule cette phrase est cohérente avec un projet d'usine qui ouvrira en 2028." }
    ] }
];
