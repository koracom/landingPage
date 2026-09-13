import fs from 'node:fs';
import path from 'node:path';

import jsQR from 'jsqr';

import contact from '../data/contact-info.json';

const vcardPath = path.resolve(process.cwd(), 'public', contact.vcardFileName);
const readVCard = () => fs.readFileSync(vcardPath, 'utf8');

test('la vCard servie est generee et valide', () => {
  expect(fs.existsSync(vcardPath)).toBe(true);

  const vcard = readVCard();

  expect(vcard.startsWith('BEGIN:VCARD\r\nVERSION:3.0')).toBe(true);
  expect(vcard.endsWith('END:VCARD')).toBe(true);
  expect(vcard).toContain(`FN:${contact.name}`);
  expect(vcard).toContain(`EMAIL;TYPE=WORK,INTERNET:${contact.email}`);
  // L'accent doit survivre : le fichier est ecrit et servi en UTF-8.
  expect(vcard).toContain(contact.country);
});

test('la vCard expose un numero libelle par fondatrice', () => {
  const vcard = readVCard();

  contact.founders.forEach((founder, index) => {
    const compact = founder.phone.replace(/\s/g, '');

    // Les espaces de mise en forme ne doivent jamais atterrir dans le tel:
    expect(compact).toMatch(/^\+221\d{9}$/);
    expect(vcard).toContain(`item${index + 1}.TEL;TYPE=CELL,VOICE:${compact}`);
    expect(vcard).toContain(`item${index + 1}.X-ABLabel:${founder.name}`);
  });
});

// Un QR peut avoir la bonne taille, le bon nombre de modules noirs et rester
// totalement indechiffrable : c'est exactement ce qui est parti en production.
// Seul un decodage reel prouve qu'il fonctionne.
const decodeQr = (size: number, svgPath: string) => {
  const grid = Array.from({ length: size }, () => new Array(size).fill(0));
  for (const [, x, y] of svgPath.matchAll(/M(\d+) (\d+)h1v1h-1z/g)) {
    grid[Number(y)][Number(x)] = 1;
  }

  // Zone de silence de 4 modules exigee par la norme, puis agrandissement :
  // un decodeur a besoin de plusieurs pixels par module.
  const quietZone = 4;
  const scale = 8;
  const dim = (size + quietZone * 2) * scale;
  const pixels = new Uint8ClampedArray(dim * dim * 4).fill(255);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!grid[y][x]) continue;
      for (let dy = 0; dy < scale; dy += 1) {
        for (let dx = 0; dx < scale; dx += 1) {
          const offset =
            (((y + quietZone) * scale + dy) * dim +
              (x + quietZone) * scale +
              dx) *
            4;
          pixels[offset] = 0;
          pixels[offset + 1] = 0;
          pixels[offset + 2] = 0;
        }
      }
    }
  }

  return jsQR(pixels, dim, dim)?.data ?? null;
};

test('le QR est reellement decodable et pointe vers la vCard servie', async () => {
  const { cardQr } = await import('../data/card-qr');

  const decoded = decodeQr(cardQr.size, cardQr.path);

  expect(decoded).not.toBeNull();
  expect(decoded).toMatch(/^https:\/\//);
  expect(decoded?.endsWith(`/${contact.vcardFileName}`)).toBe(true);
});
