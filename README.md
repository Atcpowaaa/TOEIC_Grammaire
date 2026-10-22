# TOEIC Grammaire (APK Android)

Application Android hors ligne pour réviser la grammaire du TOEIC, partie Reading (Parts 5 et 6).

## Contenu

- **Entraînement Part 5** : 152 phrases à trous (4 choix) sur 10 thèmes : temps, nature des mots, prépositions,
  connecteurs, pronoms et relatifs, passif, comparatifs, gérondif/infinitif, conditionnels, quantifieurs.
  Correction expliquée en français, bouton « Indice » qui surligne le mot-clé, chrono optionnel (20 s comme au TOEIC).
- **Test chrono** : 30 questions en 10 minutes, sans correction pendant le test, bilan détaillé à la fin.
- **Part 6** : 4 textes à trous (e-mail, annonce, note de service, lettre) avec phrase à insérer.
- **Frises des temps** : 12 frises chronologiques animées (présent, passé, futur) avec formation, emplois, mots repères,
  exemples, et un comparateur (prétérit vs present perfect, will vs going to…).
- **Jeux** : « Quelle frise ? » (associer une phrase à sa frise) et « Chronologie » (quelle action a eu lieu en premier ?).
- **Cartes mémoire** : prépositions de temps, connecteurs, suffixes, verbes + -ing / to, verbes irréguliers.
- **Fiches**, **méthode Part 5**, **mes erreurs** (révision ciblée), **statistiques**, XP, niveaux et série de jours.

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
- `app/src/main/java/.../MainActivity.java` : WebView qui affiche l'application.

Pour tester l'interface sans téléphone : ouvrir `app/src/main/assets/www/index.html` dans un navigateur.
