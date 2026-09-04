// Genere les deux artefacts de la carte digitale KoraCom :
//   1. public/<vcardFileName>            -> la vCard servie par le site
//   2. src/features/marketing/data/card-qr.ts -> le QR pointant vers cette vCard
//
//   node scripts/generate-contact-assets.mjs
//
// A relancer apres toute modification de contact-info.json ou de
// VITE_APP_SITE_URL.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { qr } from './qr.mjs';

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
const vcardUrl = `${siteUrl}/${contact.vcardFileName}`;

// --- 1. vCard servie -------------------------------------------------------
const vcard = [
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
    `item${index + 1}.TEL;TYPE=CELL,VOICE:${founder.phone.replace(/\s/g, '')}`,
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

fs.writeFileSync(
  path.join(root, 'public', contact.vcardFileName),
  vcard,
  'utf8',
);

// --- 2. QR pointant vers la vCard -----------------------------------------
const { size, path: svgPath } = qr(vcardUrl);

fs.writeFileSync(
  path.join(root, 'src/features/marketing/data/card-qr.ts'),
  `/* eslint-disable */
/**
 * GENERE AUTOMATIQUEMENT - ne pas editer a la main.
 * Encode : ${vcardUrl}
 * Regenerer : node scripts/generate-contact-assets.mjs
 */
export const cardQr = {
  size: ${size},
  path: '${svgPath}',
} as const;
`,
  'utf8',
);

console.log(`vCard  : public/${contact.vcardFileName}`);
console.log(`QR     : ${vcardUrl} (${size}x${size} modules)`);
