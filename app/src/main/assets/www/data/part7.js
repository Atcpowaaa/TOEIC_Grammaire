// Part 7 : compréhension écrite (documents simples, doubles et triples).
// Chaque question : q (énoncé), c (choix), a (bonne réponse), type (catégorie), e (explication),
// d (index du document où se trouve la réponse), ev (passage du document qui justifie la réponse).
window.PART7_METHOD = [
  "Lis d'abord les questions, puis cherche la réponse dans le texte : tu gagnes beaucoup de temps.",
  "Les bonnes réponses reformulent souvent le texte avec d'autres mots (synonymes).",
  "Question « NOT true / NOT mentioned » : élimine les 3 réponses que tu retrouves dans le texte.",
  "Question « suggested / implied » (inférence) : la réponse n'est pas écrite telle quelle, mais elle se déduit clairement.",
  "Documents multiples : au moins une question demande de croiser deux documents (dates, prix, noms…).",
  "Question de vocabulaire : remplace le mot par chaque proposition et garde celle qui a le même sens dans la phrase."
];

window.PART7 = [
  { id: "p7-01", title: "E-mail : commande retardée", icon: "📧", kind: "Texte simple", time: 3,
    docs: [ { label: "E-mail", text: "From: Laura Bennett, Customer Relations, Hartwell Office Supplies\nTo: Daniel Okafor\nSubject: Your order #58213\n\nDear Mr. Okafor,\n\nThank you for your order of 40 ergonomic chairs placed on May 2. Unfortunately, our supplier has informed us that production of this model has been delayed because of a shortage of materials. As a result, we expect to ship your chairs on June 10 instead of May 20.\n\nWe understand that this may cause difficulties for your office move. To compensate for the inconvenience, we would like to offer you free delivery and a 10% discount on your next purchase. If you would prefer to cancel your order, you will receive a full refund within five business days.\n\nPlease let me know how you would like to proceed by replying to this e-mail or calling me directly at 555-0148.\n\nSincerely,\nLaura Bennett" } ],
    qs: [
      { q: "Why did Ms. Bennett write to Mr. Okafor?", type: "Intention", c: ["To confirm a delivery date he requested", "To inform him about a delay", "To advertise a new chair model", "To request payment for an order"], a: 1, d: 0, ev: "we expect to ship your chairs on June 10 instead of May 20",
        e: "Tout l'e-mail explique que la livraison est repoussée du 20 mai au 10 juin." },
      { q: "What caused the problem?", type: "Détail", c: ["A lack of materials", "An error in the order", "A strike at the warehouse", "Bad weather"], a: 0, d: 0, ev: "a shortage of materials",
        e: "« a shortage of materials » = un manque de matériaux. La bonne réponse le reformule (a lack of)." },
      { q: "What is suggested about Mr. Okafor's company?", type: "Inférence", c: ["It has ordered chairs before", "It is moving to a new office", "It works for the supplier", "It has canceled the order"], a: 1, d: 0, ev: "your office move",
        e: "Ms. Bennett parle de « your office move » : l'entreprise va déménager." },
      { q: "What is NOT offered to Mr. Okafor?", type: "NOT", c: ["Free delivery", "A discount on a future order", "A full refund", "A different chair model"], a: 3, d: 0, ev: "free delivery and a 10% discount on your next purchase",
        e: "La livraison gratuite, la remise de 10 % et le remboursement sont cités. Aucun autre modèle n'est proposé." },
      { q: "The word \"proceed\" in paragraph 3 is closest in meaning to", type: "Vocabulaire", c: ["continue", "pay", "return", "complain"], a: 0, d: 0, ev: "how you would like to proceed",
        e: "« how you would like to proceed » = comment vous souhaitez continuer / donner suite." }
    ] },

  { id: "p7-02", title: "Avis : bibliothèque en travaux", icon: "📚", kind: "Texte simple", time: 3,
    docs: [ { label: "Avis", text: "NOTICE TO ALL LIBRARY USERS\n\nThe Riverside Public Library will be closed from July 1 to August 15 for renovation work. During this period, a temporary branch will operate in the Community Center at 22 Elm Street, open Monday to Saturday from 10 a.m. to 6 p.m.\n\nBooks borrowed before July 1 may be returned to the temporary branch or placed in the drop box outside the main building, which will remain accessible. No late fees will be charged during the closure.\n\nWhen the library reopens, visitors will enjoy a larger children's area, a new café and twenty additional computer stations." } ],
    qs: [
      { q: "What is the main purpose of the notice?", type: "Idée principale", c: ["To announce a temporary closure", "To recruit new library staff", "To advertise a new café", "To ask for donations"], a: 0, d: 0, ev: "will be closed from July 1 to August 15 for renovation work",
        e: "La première phrase annonce la fermeture pour travaux : c'est le sujet principal." },
      { q: "Where can borrowed books be returned during the closure?", type: "Détail", c: ["At a nearby bookstore", "In a drop box outside the main building", "At the city hall", "By mail only"], a: 1, d: 0, ev: "placed in the drop box outside the main building",
        e: "Les livres peuvent être déposés dans la boîte de retour devant le bâtiment principal (ou à l'antenne temporaire)." },
      { q: "What is indicated about late fees?", type: "Détail", c: ["They will be doubled", "They must be paid online", "They will not be charged during the closure", "They will increase after August 15"], a: 2, d: 0, ev: "No late fees will be charged during the closure",
        e: "« No late fees will be charged during the closure » : pas de pénalités de retard pendant la fermeture." },
      { q: "What will NOT be added to the library?", type: "NOT", c: ["A bigger space for children", "A café", "More computers", "A parking area"], a: 3, d: 0, ev: "a larger children's area, a new café and twenty additional computer stations",
        e: "L'espace enfants, le café et les ordinateurs sont cités. Le parking n'est pas mentionné." }
    ] },

  { id: "p7-03", title: "Messages : retard avant une présentation", icon: "💬", kind: "Messages", time: 2,
    docs: [ { label: "Conversation", text: "Mia Torres [9:12 A.M.]: Hi Kevin, are you already at the client's office?\nKevin Park [9:14 A.M.]: Not yet. My train is stuck outside the station. I'll probably be 20 minutes late.\nMia Torres [9:15 A.M.]: OK. The presentation starts at 10. Do you have the slides with you?\nKevin Park [9:16 A.M.]: They're on my laptop, but I also uploaded them to the shared folder last night.\nMia Torres [9:17 A.M.]: Perfect. I'll start with the introduction and the budget section, then.\nKevin Park [9:18 A.M.]: Sounds good. I'll take over for the product demo.\nMia Torres [9:19 A.M.]: You got it." } ],
    qs: [
      { q: "Why will Mr. Park be late?", type: "Détail", c: ["He forgot his laptop", "His train is delayed", "He went to the wrong office", "His meeting ran late"], a: 1, d: 0, ev: "My train is stuck outside the station",
        e: "« My train is stuck outside the station » : son train est bloqué." },
      { q: "Where can Ms. Torres find the slides?", type: "Détail", c: ["In a shared folder", "On her own phone", "In a printed file", "At the client's reception"], a: 0, d: 0, ev: "I also uploaded them to the shared folder last night",
        e: "Kevin a mis les diapositives dans le dossier partagé la veille." },
      { q: "What will Ms. Torres most likely do first?", type: "Inférence", c: ["Wait for Mr. Park at the station", "Cancel the presentation", "Present the introduction", "Show the product demo"], a: 2, d: 0, ev: "I'll start with the introduction and the budget section",
        e: "Elle commencera par l'introduction et le budget ; Kevin fera la démonstration." },
      { q: "At 9:19 A.M., what does Ms. Torres mean when she writes, \"You got it\"?", type: "Intention", c: ["She has received the file", "She agrees with Mr. Park's plan", "She thinks he will win a prize", "She wants him to buy a ticket"], a: 1, d: 0, ev: "You got it",
        e: "« You got it » répond à « I'll take over for the product demo » : c'est d'accord, elle accepte le plan." }
    ] },

  { id: "p7-04", title: "Publicité : traiteur pour entreprises", icon: "🍽️", kind: "Texte simple", time: 2,
    docs: [ { label: "Publicité", text: "GREENLEAF CATERING\n\nPlanning a business lunch, a conference or a company party? Greenleaf Catering has been serving companies in the Westfield area for over 15 years.\n\n• Fresh, locally sourced ingredients\n• Vegetarian, vegan and gluten-free menus available\n• Free delivery for orders over $300\n• Professional staff for events of 20 to 500 guests\n\nBook before March 31 and receive a free dessert buffet for any event of 50 guests or more!\n\nCall 555-0192 or visit our office on Pine Street to request a quote." } ],
    qs: [
      { q: "For whom is the advertisement most likely intended?", type: "Idée principale", c: ["Students looking for a job", "Businesses organizing events", "Farmers selling vegetables", "Families planning a holiday"], a: 1, d: 0, ev: "Planning a business lunch, a conference or a company party?",
        e: "La publicité s'adresse aux entreprises qui organisent des déjeuners, conférences ou fêtes." },
      { q: "What is mentioned about Greenleaf Catering?", type: "Détail", c: ["It opened recently", "It offers menus for special diets", "It only serves small groups", "It charges for every delivery"], a: 1, d: 0, ev: "Vegetarian, vegan and gluten-free menus available",
        e: "Menus végétariens, végans et sans gluten = des menus pour des régimes particuliers. L'entreprise existe depuis 15 ans (pas récente)." },
      { q: "How can a customer receive a free dessert buffet?", type: "Détail", c: ["By ordering online", "By booking before March 31 for at least 50 guests", "By spending more than $300", "By visiting the office on Pine Street"], a: 1, d: 0, ev: "Book before March 31 and receive a free dessert buffet for any event of 50 guests or more!",
        e: "Deux conditions : réserver avant le 31 mars ET avoir au moins 50 invités. Les 300 $ concernent la livraison gratuite." },
      { q: "The word \"quote\" in the last line is closest in meaning to", type: "Vocabulaire", c: ["citation", "price estimate", "receipt", "reservation"], a: 1, d: 0, ev: "request a quote",
        e: "Dans un contexte commercial, « a quote » = un devis, une estimation de prix." }
    ] },

  { id: "p7-05", title: "Article : une usine passe au solaire", icon: "☀️", kind: "Texte simple", time: 3,
    docs: [ { label: "Article", text: "LAKEVIEW — Brennan Textiles, one of the largest employers in Lakeview, announced on Monday that it will install solar panels on the roofs of its three factories. — [1] — The project, which will cost about $4 million, is expected to cover 40 percent of the company's electricity needs.\n\n\"Energy prices have risen sharply over the past two years,\" explained CEO Martin Brennan. \"Investing in solar power will reduce our costs and our impact on the environment.\" — [2] —\n\nWork will begin in April and should be completed by the end of the year. — [3] — The company also plans to replace its delivery trucks with electric vehicles by 2030. — [4] —" } ],
    qs: [
      { q: "What is the article mainly about?", type: "Idée principale", c: ["A company's plan to use renewable energy", "The opening of a new factory", "A rise in local unemployment", "A new model of electric truck"], a: 0, d: 0, ev: "it will install solar panels on the roofs of its three factories",
        e: "L'article présente le projet d'installer des panneaux solaires (énergie renouvelable)." },
      { q: "According to Mr. Brennan, why is the company making this investment?", type: "Détail", c: ["To attract new employees", "To lower its energy costs", "To build a fourth factory", "To meet a government deadline"], a: 1, d: 0, ev: "Investing in solar power will reduce our costs",
        e: "Les prix de l'énergie ont fortement augmenté : le solaire réduira les coûts." },
      { q: "When will the installation be completed?", type: "Détail", c: ["In April", "By the end of the year", "In two years", "By 2030"], a: 1, d: 0, ev: "should be completed by the end of the year",
        e: "Les travaux commencent en avril et doivent être terminés d'ici la fin de l'année. 2030 concerne les camions." },
      { q: "In which of the positions marked [1], [2], [3] and [4] does the following sentence best belong?\n\"Local residents will not be disturbed, as most of the work will take place on weekends.\"", type: "Insertion", c: ["[1]", "[2]", "[3]", "[4]"], a: 2, d: 0, ev: "— [3] —",
        e: "La phrase parle du déroulement des travaux : elle suit logiquement « Work will begin in April… », donc en [3]." }
    ] },

  { id: "p7-06", title: "Note de service : notes de frais en ligne", icon: "🧾", kind: "Texte simple", time: 3,
    docs: [ { label: "Mémo", text: "MEMO\nTo: All sales staff\nFrom: Rachel Kim, Sales Director\nDate: September 3\nSubject: New expense procedure\n\nStarting October 1, all travel expenses must be submitted through our new online system instead of on paper forms. Training sessions on the system will be held on September 15 and 22 in Conference Room B. Attendance at one of the sessions is mandatory.\n\nPlease note that receipts must now be scanned and uploaded within seven days of your return. Claims submitted after this deadline will require approval from your manager.\n\nIf you cannot attend either training session, contact Tom Alvarez in the IT department to arrange an individual session." } ],
    qs: [
      { q: "What is the purpose of the memo?", type: "Idée principale", c: ["To announce a change in procedure", "To introduce a new sales director", "To cancel a training session", "To reduce travel budgets"], a: 0, d: 0, ev: "all travel expenses must be submitted through our new online system instead of on paper forms",
        e: "Le mémo annonce le passage des formulaires papier à un système en ligne." },
      { q: "What are all sales staff required to do?", type: "Détail", c: ["Buy a scanner", "Attend a training session", "Travel less often", "Meet Ms. Kim in person"], a: 1, d: 0, ev: "Attendance at one of the sessions is mandatory",
        e: "Assister à l'une des deux sessions est obligatoire." },
      { q: "What happens if receipts are uploaded more than seven days after a trip?", type: "Détail", c: ["The claim is automatically rejected", "A manager must approve the claim", "The employee pays a fee", "The IT department checks them"], a: 1, d: 0, ev: "Claims submitted after this deadline will require approval from your manager",
        e: "Après le délai, la demande doit être approuvée par le manager (elle n'est pas refusée automatiquement)." },
      { q: "Why would an employee contact Mr. Alvarez?", type: "Détail", c: ["To report a lost receipt", "To schedule a private training session", "To book a conference room", "To request a new laptop"], a: 1, d: 0, ev: "contact Tom Alvarez in the IT department to arrange an individual session",
        e: "Mr. Alvarez organise une session individuelle pour ceux qui ne peuvent pas venir aux deux dates." },
      { q: "The word \"mandatory\" in paragraph 1 is closest in meaning to", type: "Vocabulaire", c: ["optional", "required", "free", "short"], a: 1, d: 0, ev: "mandatory",
        e: "mandatory = obligatoire = required." }
    ] },

  { id: "p7-07", title: "Invitation : forum des entrepreneurs", icon: "✉️", kind: "Texte simple", time: 3,
    docs: [ { label: "Lettre", text: "Dear Ms. Laurent,\n\nOn behalf of the Harbor City Chamber of Commerce, I am pleased to invite you to speak at our annual Small Business Forum, which will be held on October 3 at the Harbor City Convention Center.\n\nLast year's forum attracted more than 300 local entrepreneurs, and many of them have asked to hear from successful business owners like yourself. We would be delighted if you could give a 30-minute talk on how you grew your bakery from a single shop into a chain of six stores.\n\nThe Chamber will cover your travel expenses and provide a speaker's fee of $500. Please let us know by August 31 whether you are able to accept our invitation.\n\nKind regards,\nThomas Reed, Events Coordinator" } ],
    qs: [
      { q: "Why did Mr. Reed write the letter?", type: "Intention", c: ["To thank Ms. Laurent for a donation", "To invite Ms. Laurent to give a talk", "To order products from a bakery", "To announce the results of a contest"], a: 1, d: 0, ev: "I am pleased to invite you to speak",
        e: "Il invite Ms. Laurent à intervenir au forum." },
      { q: "What is indicated about the Small Business Forum?", type: "Détail", c: ["It takes place every year", "It is held in a bakery", "It is only for new businesses", "It lasts 30 minutes"], a: 0, d: 0, ev: "our annual Small Business Forum",
        e: "« annual » = qui a lieu chaque année. Les 30 minutes concernent l'intervention de Ms. Laurent." },
      { q: "What is suggested about Ms. Laurent?", type: "Inférence", c: ["She organized last year's forum", "She owns several bakeries", "She works for the Chamber of Commerce", "She is opening her first shop"], a: 1, d: 0, ev: "grew your bakery from a single shop into a chain of six stores",
        e: "Sa boulangerie est devenue une chaîne de six magasins : elle possède plusieurs boulangeries." },
      { q: "What is NOT mentioned as something the Chamber will provide?", type: "NOT", c: ["Reimbursement of travel costs", "A speaker's fee", "Free hotel accommodation", "An audience of entrepreneurs"], a: 2, d: 0, ev: "The Chamber will cover your travel expenses and provide a speaker's fee of $500",
        e: "Transport et cachet sont cités, le public d'entrepreneurs aussi. L'hôtel n'est jamais mentionné." },
      { q: "What is Ms. Laurent asked to do by August 31?", type: "Détail", c: ["Send her travel receipts", "Reply to the invitation", "Pay a registration fee", "Prepare written materials"], a: 1, d: 0, ev: "Please let us know by August 31 whether you are able to accept our invitation",
        e: "Elle doit répondre (accepter ou non) avant le 31 août." }
    ] },

  { id: "p7-08", title: "Hôtel : forfaits conférence + e-mail", icon: "🏨", kind: "Double", time: 4,
    docs: [
      { label: "Page web", text: "SEASIDE GRAND HOTEL — Conference packages\n\nStandard Package — $45 per person: meeting room, projector, morning coffee break.\nPremium Package — $70 per person: meeting room, projector, two coffee breaks, buffet lunch.\nExecutive Package — $95 per person: all Premium features, plus an evening reception and free parking.\n\nGroups of 30 or more receive a 10% discount on all packages. Bookings must be confirmed at least three weeks in advance." },
      { label: "E-mail", text: "To: events@seasidegrand.com\nFrom: Paul Moreau, Arden Electronics\nDate: October 10\nSubject: Booking request\n\nHello,\n\nI would like to book a meeting room for our annual sales meeting on Thursday, November 14. There will be 25 participants. We need a projector, and we would like lunch to be served, but we do not need an evening event since most participants will return home the same day.\n\nCould you also tell me whether parking is available near the hotel?\n\nBest regards,\nPaul Moreau" } ],
    qs: [
      { q: "Which package will Mr. Moreau most likely choose?", type: "Lien entre documents", c: ["Standard", "Premium", "Executive", "None of them"], a: 1, d: 1, ev: "we would like lunch to be served, but we do not need an evening event",
        e: "Il veut un déjeuner (Premium) mais pas de soirée (Executive). Le Standard n'inclut pas le déjeuner → Premium." },
      { q: "What is indicated about Mr. Moreau's group?", type: "Lien entre documents", c: ["It will receive a 10% discount", "It is too small for the group discount", "It needs two meeting rooms", "It will stay at the hotel for two nights"], a: 1, d: 1, ev: "There will be 25 participants",
        e: "La remise est pour 30 personnes ou plus ; le groupe compte 25 participants." },
      { q: "What does Mr. Moreau ask about?", type: "Détail", c: ["The price of the rooms", "Parking near the hotel", "Vegetarian meals", "The hotel's location"], a: 1, d: 1, ev: "whether parking is available near the hotel",
        e: "Il demande s'il y a un parking près de l'hôtel." },
      { q: "What is suggested about Mr. Moreau's booking?", type: "Lien entre documents", c: ["It was made too late", "It was made more than three weeks in advance", "It includes an evening reception", "It is for a weekend"], a: 1, d: 1, ev: "Date: October 10",
        e: "E-mail du 10 octobre pour le 14 novembre : environ 5 semaines, donc plus que les 3 semaines exigées." },
      { q: "In the e-mail, the word \"annual\" is closest in meaning to", type: "Vocabulaire", c: ["yearly", "important", "official", "large"], a: 0, d: 1, ev: "our annual sales meeting",
        e: "annual = yearly (annuel)." }
    ] },

  { id: "p7-09", title: "Offre d'emploi + candidature", icon: "💼", kind: "Double", time: 4,
    docs: [
      { label: "Offre d'emploi", text: "MARKETING ASSISTANT — Full time\nBristow Foods, Chicago office\n\nResponsibilities: managing our social media accounts, preparing monthly sales reports and assisting with trade shows.\n\nRequirements: a degree in marketing or a related field; at least one year of work experience; good knowledge of design software. Fluency in Spanish is a plus.\n\nTo apply, send your résumé and a cover letter to the Human Resources Department by June 30." },
      { label: "E-mail de candidature", text: "Date: June 18\nSubject: Marketing Assistant position\n\nDear Hiring Manager,\n\nI am writing to apply for the Marketing Assistant position advertised on your website. I graduated two years ago with a degree in communications and have since worked for eighteen months as a social media coordinator at a travel agency.\n\nI am comfortable using several design programs, and I spent a year studying in Madrid, where I became fluent in Spanish. Although I currently live in Denver, I am planning to move to Chicago in August.\n\nPlease find my résumé attached. I look forward to hearing from you.\n\nSofia Lindqvist" } ],
    qs: [
      { q: "What is NOT listed as a responsibility of the job?", type: "NOT", c: ["Managing social media", "Preparing reports", "Helping at trade shows", "Hiring new employees"], a: 3, d: 0, ev: "managing our social media accounts, preparing monthly sales reports and assisting with trade shows",
        e: "Réseaux sociaux, rapports et salons sont cités. Recruter n'en fait pas partie." },
      { q: "What is indicated about Ms. Lindqvist's experience?", type: "Lien entre documents", c: ["It is shorter than required", "It meets the job requirement", "It is in the food industry", "It was gained in Chicago"], a: 1, d: 1, ev: "have since worked for eighteen months",
        e: "L'offre demande au moins un an d'expérience ; elle a 18 mois → l'exigence est remplie." },
      { q: "Which of Ms. Lindqvist's skills is described as a plus in the advertisement?", type: "Lien entre documents", c: ["Her knowledge of design software", "Her Spanish", "Her degree", "Her travel experience"], a: 1, d: 1, ev: "where I became fluent in Spanish",
        e: "L'offre indique « Fluency in Spanish is a plus » ; elle parle couramment espagnol." },
      { q: "What is suggested about Ms. Lindqvist's application?", type: "Lien entre documents", c: ["It was sent after the deadline", "It was sent before the deadline", "It did not include a résumé", "It was sent by mail"], a: 1, d: 1, ev: "Date: June 18",
        e: "Envoyée le 18 juin, avant la date limite du 30 juin." },
      { q: "What does Ms. Lindqvist mention about her plans?", type: "Détail", c: ["She will study in Madrid again", "She will relocate to Chicago", "She will start a travel agency", "She will finish her degree in August"], a: 1, d: 1, ev: "I am planning to move to Chicago in August",
        e: "« move to Chicago » = relocate to Chicago (déménager)." }
    ] },

  { id: "p7-10", title: "Salon : programme, e-mail et avis", icon: "🗂️", kind: "Triple", time: 5,
    docs: [
      { label: "Programme", text: "NORTHERN RETAIL SUMMIT — Saturday, May 9, Hall C\n\n9:00 Opening remarks — Linda Cho, organizer\n9:30 Keynote: The future of online shopping — Dr. Amir Haddad\n11:00 Panel: Managing supply chains\n12:30 Lunch\n14:00 Workshop: Customer loyalty programs — Grace Miller\n15:30 Closing session" },
      { label: "E-mail", text: "From: Linda Cho\nTo: All registered participants\nDate: May 6\n\nDear participants,\n\nPlease note a change to the program. Dr. Haddad's flight has been rescheduled, so his keynote will now take place at 14:00, and Grace Miller's workshop will move to 9:30. All sessions will remain in Hall C. Lunch is included in your registration.\n\nSee you on Saturday!\nLinda Cho" },
      { label: "Formulaire d'avis", text: "Name: Jonas Weber\nOverall rating: 4/5\n\nComments: The morning workshop was very practical, and I will use several of the ideas in my store. However, the afternoon keynote started 15 minutes late, and the room was too small for the number of people who attended. I would also suggest offering vegetarian options at lunch." } ],
    qs: [
      { q: "Why was the program changed?", type: "Lien entre documents", c: ["The hall was not available", "A speaker's travel plans changed", "Too many people registered", "The lunch was canceled"], a: 1, d: 1, ev: "Dr. Haddad's flight has been rescheduled",
        e: "Le vol de Dr. Haddad a été modifié : ses horaires de voyage ont changé." },
      { q: "At what time did Ms. Miller's workshop begin?", type: "Lien entre documents", c: ["9:00", "9:30", "11:00", "14:00"], a: 1, d: 1, ev: "Grace Miller's workshop will move to 9:30",
        e: "Prévu à 14h dans le programme, l'atelier a été déplacé à 9h30 (e-mail)." },
      { q: "Which session did Mr. Weber find useful?", type: "Lien entre documents", c: ["The opening remarks", "The workshop on customer loyalty", "The keynote on online shopping", "The panel on supply chains"], a: 1, d: 2, ev: "The morning workshop was very practical",
        e: "L'atelier du MATIN est celui de Grace Miller (déplacé à 9h30) : Customer loyalty programs. Il faut croiser les 3 documents !" },
      { q: "What problem does Mr. Weber mention?", type: "Détail", c: ["The hall was too cold", "The room was too crowded", "The lunch was too expensive", "The speakers were hard to hear"], a: 1, d: 2, ev: "the room was too small for the number of people who attended",
        e: "« the room was too small for the number of people » = la salle était trop pleine (crowded)." },
      { q: "What is suggested about Mr. Weber?", type: "Inférence", c: ["He organized the summit", "He works in retail", "He gave the keynote speech", "He did not attend the afternoon session"], a: 1, d: 2, ev: "I will use several of the ideas in my store",
        e: "Il parle de « my store » : il travaille dans le commerce (retail). Il a vu la keynote de l'après-midi, puisqu'il dit qu'elle a commencé en retard." }
    ] }
];
