# TOEIC Grammaire (APK Android)

Application Android hors ligne pour réviser la partie Reading du TOEIC (Parts 5, 6 et 7).

## Contenu

- **Entraînement Part 5** : 354 phrases à trous (4 choix) sur 12 thèmes : temps, nature des mots, prépositions,
  connecteurs, pronoms et relatifs, passif, comparatifs, gérondif/infinitif, conditionnels, quantifieurs,
  modaux, mots souvent confondus. Correction expliquée en français, bouton « Indice » qui surligne le mot-clé,
  chrono optionnel (20 s comme au TOEIC).
- **Test chrono** : 30 questions en 10 minutes, sans correction pendant le test, bilan détaillé à la fin.
- **Part 6** : 8 textes à trous (e-mails, annonces, notes de service, offre d'emploi, communiqué) avec phrase à insérer.
- **Part 7** : 10 documents (simples, doubles, triples, conversation par messages) et 46 questions de compréhension
  (idée principale, détail, inférence, vocabulaire, NOT, insertion, lien entre documents). Après chaque réponse,
  le passage qui la justifie est surligné dans le texte.
- **Frises des temps** : 12 frises chronologiques animées (présent, passé, futur) avec formation, emplois, mots repères,
  exemples, et un comparateur (prétérit vs present perfect, will vs going to…).
- **Machine à conjuguer** : choisis un verbe, un sujet, un temps et une forme (affirmative, négative, question) :
  la phrase se construit avec sa frise.
- **Jeux** : Survie (3 vies), Défi éclair (60 s), Trouve l'erreur (32 phrases), Quelle frise ?, Chronologie.
- **Cartes mémoire** : prépositions, connecteurs, suffixes, verbes + -ing / to, verbes irréguliers, modaux, mots confondus.
- **Fiches**, **méthode Part 5**, **mes erreurs** (révision ciblée), **statistiques**, XP, niveaux, série de jours,
  **objectif du jour** (20 réponses) et **14 badges** à débloquer.

## Obtenir l'APK

L'APK est compilé automatiquement par GitHub Actions (workflow `.github/workflows/android-apk.yml`)
à chaque push :

1. Onglet **Actions** du dépôt → workflow « Build APK TOEIC Grammaire » → dernier run.
2. Télécharger l'artefact **TOEIC-Grammaire-apk** (un zip contenant `TOEIC-Grammaire.apk`).
3. Copier l'APK sur le téléphone et l'ouvrir (autoriser l'installation d'applications inconnues).

Pousser un tag `v…` (ex. `v1.0`) publie aussi l'APK dans une **Release** GitHub, plus pratique à télécharger
directement depuis le téléphone.

Compilation locale (Android SDK requis) : `./gradlew assembleDebug`.

## Mises à jour automatiques

Au démarrage, l'appli lit `version.json` dans la dernière Release GitHub du dépôt et, si une version plus
récente existe, propose de l'installer (téléchargement et installation depuis l'appli). Le bouton
« Rechercher une mise à jour » de l'écran Statistiques fait la même vérification.

Pour publier une mise à jour :

1. Augmenter `versionCode` et `versionName` dans `app/build.gradle`.
2. Écrire les nouveautés dans `release-notes.txt` (elles s'affichent dans la fenêtre de mise à jour).
3. Pousser sur `main` : le workflow compile l'APK et crée la Release `v<versionName>` avec l'APK et `version.json`.

Le dépôt doit être **public** pour que l'appli puisse lire les Releases sans identifiant. Toutes les versions sont
signées avec `app/toeic-grammaire.keystore` (clé volontairement versionnée, choix assumé pour ce projet personnel) :
c'est ce qui permet d'installer une version par-dessus la précédente.

## Version iPhone (web app)

L'appli est aussi publiée comme site web installable, par le workflow `.github/workflows/web.yml`
(GitHub Pages) : https://atcpowaaa.github.io/TOEIC_Grammaire/

Sur iPhone : ouvrir ce lien dans **Safari**, toucher « ••• » à côté de l'adresse puis Partager (iOS 26 ; avant : le bouton
Partager en bas), puis « Sur l'écran d'accueil » et « Ajouter » (laisser « Ouvrir comme app web » activé). L'appli s'ouvre alors en
plein écran, fonctionne hors ligne (service worker `sw.js`) et se met à jour toute seule dès qu'elle a du réseau.

Pré-requis côté GitHub : dépôt public, puis Settings > Pages > Source = « GitHub Actions ».

## Structure

- `app/src/main/assets/www/` : l'application (HTML/CSS/JS, sans dépendance externe).
  - `data/questions.js` : questions Part 5 — pour ajouter une question, copier une entrée existante.
  - `data/tenses.js` : définition des frises, comparaisons et jeu de chronologie.
  - `data/content.js` : fiches, cartes mémoire, textes Part 6.
  - `data/games.js` : « Trouve l'erreur », verbes de la machine à conjuguer, badges.
  - `data/part7.js` : documents et questions de la Part 7.
- `app/src/main/java/.../MainActivity.java` : WebView qui affiche l'application.

Pour tester l'interface sans téléphone : ouvrir `app/src/main/assets/www/index.html` dans un navigateur.
