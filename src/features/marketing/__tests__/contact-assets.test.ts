import fs from 'node:fs';
import path from 'node:path';

import jsQR from 'jsqr';

import { cardQrs, type CardQrKey } from '../data/card-qr';
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

const qrCards: { key: CardQrKey; fileName: string }[] = [
  { key: 'agency', fileName: contact.vcardFileName },
  ...contact.founders.map((founder) => ({
    key: founder.slug as CardQrKey,
    fileName: founder.vcardFileName,
  })),
];

qrCards.forEach(({ key, fileName }) => {
  test(`le QR de la carte ${key} est decodable et pointe vers sa vCard`, () => {
    const qr = cardQrs[key];

    expect(qr).toBeDefined();

    const decoded = decodeQr(qr.size, qr.path);

    expect(decoded).not.toBeNull();
    expect(decoded).toMatch(/^https:\/\//);
    expect(decoded?.endsWith(`/${fileName}`)).toBe(true);
  });
});

contact.founders.forEach((founder) => {
  test(`la vCard de ${founder.name} ne porte que ses propres coordonnees`, () => {
    const filePath = path.resolve(
      process.cwd(),
      'public',
      founder.vcardFileName,
    );
    expect(fs.existsSync(filePath)).toBe(true);

    const vcard = fs.readFileSync(filePath, 'utf8');
    const compact = founder.phone.replace(/\s/g, '');

    expect(compact).toMatch(/^\+221\d{9}$/);
    expect(vcard).toContain(`FN:${founder.name}`);
    expect(vcard).toContain(`N:${founder.lastName};${founder.firstName};;;`);
    expect(vcard).toContain(`TEL;TYPE=CELL,VOICE:${compact}`);
    expect(vcard).toContain(`EMAIL;TYPE=WORK,INTERNET:${founder.email}`);

    // Le point de la carte individuelle : scanner Khadidiatou ne doit pas
    // ajouter Aminata.
    contact.founders
      .filter((other) => other.slug !== founder.slug)
      .forEach((other) => {
        expect(vcard).not.toContain(other.phone.replace(/\s/g, ''));
        expect(vcard).not.toContain(other.email);
      });
  });
});
