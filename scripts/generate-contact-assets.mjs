// Genere les artefacts des cartes digitales KoraCom :
//   1. public/<vcardFileName>            -> une vCard par carte
//   2. src/features/marketing/data/card-qr.ts -> les QR pointant vers ces vCards
//
//   node scripts/generate-contact-assets.mjs
//
// A relancer apres toute modification de contact-info.json ou de
// VITE_APP_SITE_URL.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import QRCode from 'qrcode';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const readSiteUrl = () => {
  if (process.env.VITE_APP_SITE_URL) return process.env.VITE_APP_SITE_URL;

  const envFile = path.join(root, '.env');
  if (fs.existsSync(envFile)) {
    const match = fs
      .readFileSync(envFile, 'utf8')
      .match(/^VITE_APP_SITE_URL=(.+)$/m);
    if (match?.[1]) return match[1].trim();
  }

  return 'https://koracom.africa';
};

const contact = JSON.parse(
  fs.readFileSync(
    path.join(root, 'src/features/marketing/data/contact-info.json'),
    'utf8',
  ),
);

const siteUrl = readSiteUrl().replace(/\/+$/, '');
const tel = (phone) => phone.replace(/\s/g, '');

// --- vCards ----------------------------------------------------------------

/** vCard de l'agence : les deux fondatrices sur une meme fiche. */
const agencyVCard = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  `N:;${contact.name};;;`,
  `FN:${contact.name}`,
  `ORG:${contact.name}`,
  `TITLE:${contact.role}`,
  // Un TEL par fondatrice. Le groupement itemN + X-ABLabel est une extension
  // Apple : iOS affiche le nom en libelle, les autres clients voient deux
  // numeros sans se casser.
  ...contact.founders.flatMap((founder, index) => [
    `item${index + 1}.TEL;TYPE=CELL,VOICE:${tel(founder.phone)}`,
    `item${index + 1}.X-ABLabel:${founder.name}`,
  ]),
  `EMAIL;TYPE=WORK,INTERNET:${contact.email}`,
  `URL:${siteUrl}`,
  `ADR;TYPE=WORK:;;${contact.city};${contact.city};;;${contact.country}`,
  `NOTE:${contact.tagline} — ${contact.founders
    .map((founder) => founder.name)
    .join(' · ')}, ${contact.foundersRole.toLowerCase()}.`,
  'END:VCARD',
].join('\r\n');

/**
 * vCard individuelle. Scanner le QR de Khadidiatou doit ajouter Khadidiatou,
 * pas l'agence : la fiche ne porte donc que ses coordonnees, l'agence
 * n'apparaissant que comme employeur.
 */
const founderVCard = (founder) =>
  [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${founder.lastName};${founder.firstName};;;`,
    `FN:${founder.name}`,
    `ORG:${contact.name}`,
    `TITLE:${contact.founderRole}`,
    `TEL;TYPE=CELL,VOICE:${tel(founder.phone)}`,
    `EMAIL;TYPE=WORK,INTERNET:${founder.email}`,
    `URL:${siteUrl}/carte/${founder.slug}`,
    `ADR;TYPE=WORK:;;${contact.city};${contact.city};;;${contact.country}`,
    `NOTE:${contact.tagline}`,
    'END:VCARD',
  ].join('\r\n');

/** Chaque entree produit une vCard servie et un QR qui pointe vers elle. */
const cards = [
  { key: 'agency', fileName: contact.vcardFileName, vcard: agencyVCard },
  ...contact.founders.map((founder) => ({
    key: founder.slug,
    fileName: founder.vcardFileName,
    vcard: founderVCard(founder),
  })),
];

for (const card of cards) {
  fs.writeFileSync(path.join(root, 'public', card.fileName), card.vcard, 'utf8');
}

// --- QR pointant vers les vCards -------------------------------------------
// Niveau H : le QR reste lisible meme partiellement masque ou imprime petit.
// On ne garde que la matrice, convertie en un seul chemin SVG en unites de
// module : le composant React n'embarque ainsi aucune librairie QR.
const toQr = (url) => {
  const matrix = QRCode.create(url, { errorCorrectionLevel: 'H' });
  const size = matrix.modules.size;

  const segments = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (matrix.modules.data[y * size + x]) segments.push(`M${x} ${y}h1v1h-1z`);
    }
  }

  return { size, path: segments.join('') };
};

const entries = cards.map((card) => {
  const url = `${siteUrl}/${card.fileName}`;
  const { size, path: svgPath } = toQr(url);
  return { ...card, url, size, svgPath };
});

fs.writeFileSync(
  path.join(root, 'src/features/marketing/data/card-qr.ts'),
  `/* eslint-disable */
/**
 * GENERE AUTOMATIQUEMENT - ne pas editer a la main.
 * Regenerer : node scripts/generate-contact-assets.mjs
 */
export const cardQrs = {
${entries
  .map(
    (entry) => `  /** ${entry.url} */
  '${entry.key}': {
    size: ${entry.size},
    path: '${entry.svgPath}',
  },`,
  )
  .join('\n')}
} as const;

export type CardQrKey = keyof typeof cardQrs;
`,
  'utf8',
);

for (const entry of entries) {
  console.log(
    `${entry.key.padEnd(12)} vCard public/${entry.fileName} · QR ${entry.size}x${entry.size} -> ${entry.url}`,
  );
}
