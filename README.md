# Parcellaire (PWA)

Générateur de paysages de parcelles agricoles vus du ciel. Application web installable, qui fonctionne hors-ligne.
Aucune dépendance, aucun build : ce sont des fichiers statiques.

## Publier sur GitHub Pages

1. Créez un dépôt sur GitHub (par exemple `parcellaire`).
2. Déposez-y **tout le contenu de ce dossier** à la racine du dépôt (`index.html`, `sw.js`, `manifest.webmanifest`, `fonts/`, `icons/`, `.nojekyll`).
   - Sur le site : *Add file → Upload files*, puis glissez les fichiers et dossiers. Le fichier `.nojekyll` est caché sous macOS/Windows ; il est facultatif.
   - Ou en ligne de commande :
     ```
     git init && git add . && git commit -m "Parcellaire PWA"
     git branch -M main
     git remote add origin https://github.com/VOTRE-NOM/parcellaire.git
     git push -u origin main
     ```
3. Dans le dépôt : *Settings → Pages → Build and deployment → Source : Deploy from a branch*, branche `main`, dossier `/ (root)`, puis *Save*.
4. Après une minute environ, l'application est en ligne sur `https://VOTRE-NOM.github.io/parcellaire/`.

Tous les chemins sont relatifs : l'application fonctionne aussi bien dans un sous-dossier (`/parcellaire/`) qu'à la racine d'un domaine.

## Installer l'application

- **Android / Chrome, Edge (ordinateur)** : bouton « Installer l'application » dans la page, ou menu du navigateur.
- **iPhone / iPad (Safari)** : bouton Partager → *Sur l'écran d'accueil*.

Une fois la page ouverte une fois, tout est en cache : elle se lance ensuite sans connexion.

## Mettre à jour

Après modification d'un fichier, changez `VERSION` en haut de `sw.js` (`parcellaire-v1` → `parcellaire-v2`). Les appareils récupèrent alors la nouvelle version à leur prochaine ouverture (parfois au deuxième lancement).

## Contenu

- `index.html` : toute l'application (HTML, CSS, JavaScript)
- `sw.js` : service worker (cache et mode hors-ligne)
- `manifest.webmanifest` : nom, couleurs et icônes de l'application
- `fonts/` : polices Bricolage Grotesque et JetBrains Mono (licence SIL OFL), servies en local
- `icons/` : icônes de l'application, générées par l'application elle-même

## Enregistrement d'images

« Enregistrer l'image » exporte un JPEG léger. Sur téléphone, la feuille de partage du système s'ouvre (Enregistrer dans Photos, Fichiers…). Sur ordinateur, le fichier est téléchargé.
Les favoris et les verrous sont conservés dans le navigateur (localStorage), propres à chaque appareil.
