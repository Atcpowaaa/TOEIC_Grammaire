# TOEIC Grammaire (APK Android)

Application Android hors ligne pour réviser la grammaire du TOEIC, partie Reading (Parts 5 et 6).

## Contenu

- **Entraînement Part 5** : 246 phrases à trous (4 choix) sur 12 thèmes : temps, nature des mots, prépositions,
  connecteurs, pronoms et relatifs, passif, comparatifs, gérondif/infinitif, conditionnels, quantifieurs,
  modaux, mots souvent confondus. Correction expliquée en français, bouton « Indice » qui surligne le mot-clé,
  chrono optionnel (20 s comme au TOEIC).
- **Test chrono** : 30 questions en 10 minutes, sans correction pendant le test, bilan détaillé à la fin.
- **Part 6** : 8 textes à trous (e-mails, annonces, notes de service, offre d'emploi, communiqué) avec phrase à insérer.
- **Frises des temps** : 12 frises chronologiques animées (présent, passé, futur) avec formation, emplois, mots repères,
  exemples, et un comparateur (prétérit vs present perfect, will vs going to…).
- **Machine à conjuguer** : choisis un verbe, un sujet, un temps et une forme (affirmative, négative, question) :
  la phrase se construit avec sa frise.
- **Jeux** : Survie (3 vies), Défi éclair (60 s), Trouve l'erreur, Quelle frise ?, Chronologie.
- **Cartes mémoire** : prépositions, connecteurs, suffixes, verbes + -ing / to, verbes irréguliers, modaux, mots confondus.
- **Fiches**, **méthode Part 5**, **mes erreurs** (révision ciblée), **statistiques**, XP, niveaux, série de jours,
  **objectif du jour** (20 réponses) et **13 badges** à débloquer.

## Obtenir l'APK

L'APK est compilé automatiquement par GitHub Actions (workflow `.github/workflows/android-apk.yml`)
à chaque push :

1. Onglet **Actions** du dépôt → workflow « Build APK TOEIC Grammaire » → dernier run.
2. Télécharger l'artefact **TOEIC-Grammaire-apk** (un zip contenant `TOEIC-Grammaire.apk`).
3. Copier l'APK sur le téléphone et l'ouvrir (autoriser l'installation d'applications inconnues).

Pousser un tag `v…` (ex. `v1.0`) publie aussi l'APK dans une **Release** GitHub, plus pratique à télécharger
directement depuis le téléphone.

Compilation locale (Android SDK requis) : `./gradlew assembleDebug`.

## Structure

- `app/src/main/assets/www/` : l'application (HTML/CSS/JS, sans dépendance externe).
  - `data/questions.js` : questions Part 5 — pour ajouter une question, copier une entrée existante.
  - `data/tenses.js` : définition des frises, comparaisons et jeu de chronologie.
  - `data/content.js` : fiches, cartes mémoire, textes Part 6.
  - `data/games.js` : « Trouve l'erreur », verbes de la machine à conjuguer, badges.
- `app/src/main/java/.../MainActivity.java` : WebView qui affiche l'application.

Pour tester l'interface sans téléphone : ouvrir `app/src/main/assets/www/index.html` dans un navigateur.
