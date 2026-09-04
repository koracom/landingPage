# React Vite Application

## Get Started

Prerequisites:

- Node 20+
- Yarn 1.22+

To set up the app execute the following commands.

```bash
git clone https://github.com/alan2207/bulletproof-react.git
cd bulletproof-react
cd apps/react-vite
cp .env.example .env
yarn install
```

##### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

##### `yarn build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://vitejs.dev/guide/static-deploy) for more information.

---
## Landing KoraCom (`/`)

La page vitrine vit dans `src/features/marketing` et est assemblée par
`src/app/routes/landing.tsx`.

### Système visuel

La landing utilise un système visuel dédié, volontairement séparé des tokens
sémantiques de l'application :

- couleurs : `kora-*` dans `tailwind.config.cjs` (terre, argile, cuivre, sable) ;
- typographies : `font-display` (Fraunces) et `font-body` (Outfit), chargées
  depuis Google Fonts dans `index.html` ;
- tailles fluides : `text-display-xl`, `text-display-lg`, `text-body-lg`… en
  `clamp()`, donc sans media query sur le texte ;
- animations : `animate-ko-rise`, `animate-ko-cord`, `animate-ko-tick`,
  `animate-ko-stair`, toutes neutralisées par `prefers-reduced-motion`.

### Contenu éditorial

Les textes des sections sont centralisés dans `src/features/marketing/data/` :
`services.ts`, `differentiators.ts`, `audiences.ts`, `nav-links.ts`. Les
coordonnées ont une source unique, `contact-info.json`, partagée entre
l'application et les scripts de build.

### Carte digitale : QR + vCard

Le QR encode l'URL de la vCard servie par le site
(`$VITE_APP_SITE_URL/koracom-africa.vcf`). Scanner le code ajoute donc les
coordonnées directement au répertoire du téléphone, sans page intermédiaire.

Les deux artefacts sont générés depuis `contact-info.json` :

```bash
node scripts/generate-contact-assets.mjs
```

À relancer après toute modification de `contact-info.json` ou de
`VITE_APP_SITE_URL`. Le fichier `public/_headers` force le
`Content-Type: text/vcard` côté Netlify, indispensable pour que l'import
fonctionne sur iOS et Android.

### Identité visuelle : logo et favicons

Le logo est un SVG vectorisé (`src/assets/koracom-logo.svg`). Le PNG d'origine
reste dans `src/assets/koracom-logo.png` comme référence.

Les icônes du site dérivent de ce SVG : seule l'icône kora est extraite, le
logotype complet étant illisible dans un carré de 16 px.

```bash
npm i --no-save sharp png-to-ico
node scripts/generate-favicons.mjs
```

Produit `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180)
et `icon-192/512.png` pour le manifeste.

### Formulaire de contact

`src/features/marketing/api/submit-contact.ts` poste vers
`VITE_APP_CONTACT_ENDPOINT`. Tant que la variable est vide, la soumission est
**simulée côté client** (un `console.warn` le signale) : aucun message n'est
envoyé.

### Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `VITE_APP_SITE_URL` | Domaine public. Alimente le lien du site, le partage et l'URL encodée dans le QR. |
| `VITE_APP_CONTACT_ENDPOINT` | Réception du formulaire. Vide = mode simulation. |

### Tests

```bash
yarn test                                 # formulaire, menu mobile, vCard servie + QR
yarn playwright test --project=landing    # responsive 320 → 1920 + non-régression overflow
yarn storybook                            # itération visuelle section par section
```

---

## Déploiement Vercel

Le dépôt contient un `vercel.json` (preset Vite, repli SPA, en-têtes). Le plus
simple est l'intégration Git : importer `koracom/landingPage` sur
[vercel.com/new](https://vercel.com/new), chaque push sur `main` redéploie.

### Variables d'environnement (obligatoires)

À définir sur les environnements Production **et** Preview. `.env` est
gitignoré, donc rien n'est hérité du dépôt.

| Variable | Valeur | Conséquence si absente |
| --- | --- | --- |
| `VITE_APP_API_URL` | `https://api.koracomsn.com` | **Page blanche.** `env.ts` lève « Invalid env provided » au chargement. |
| `VITE_APP_ENABLE_API_MOCKING` | `false` | MSW démarre en production et intercepte le POST Formspree : aucun message ne part. |
| `VITE_APP_CONTACT_ENDPOINT` | `https://formspree.io/f/mkjnzbrv` | Le formulaire tourne en mode simulation. |
| `VITE_APP_SITE_URL` | `https://koracomsn.com` | Repli sur la valeur par défaut du schéma. |

`VITE_APP_API_URL` n'est utilisée que par les routes `/app` et `/auth` héritées
du starter, mais le schéma d'environnement l'exige au démarrage : une valeur
syntaxiquement valide suffit tant qu'il n'y a pas de backend.

### En CLI

```bash
vercel login
vercel link
vercel env add VITE_APP_API_URL production
vercel env add VITE_APP_ENABLE_API_MOCKING production
vercel env add VITE_APP_CONTACT_ENDPOINT production
vercel env add VITE_APP_SITE_URL production
vercel --prod
```

### Après le premier déploiement

1. Vérifier que `/koracom-africa.vcf` renvoie `Content-Type: text/vcard`
   (`curl -I https://koracomsn.com/koracom-africa.vcf`) — sans quoi le scan du
   QR n'ajoute pas le contact.
2. Scanner le QR de la carte avec un iPhone **et** un Android.
3. Envoyer un message de test via le formulaire et vérifier sa réception
   Formspree.
4. Rattacher le domaine `koracomsn.com` dans les réglages du projet.
