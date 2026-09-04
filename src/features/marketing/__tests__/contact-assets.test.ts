import fs from 'node:fs';
import path from 'node:path';

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

test('le QR encode bien l URL de la vCard servie', async () => {
  const { cardQr } = await import('../data/card-qr');
  const { contactInfo } = await import('../data/contact-info');

  expect(contactInfo.vcardUrl.endsWith(`/${contact.vcardFileName}`)).toBe(true);
  expect(cardQr.size).toBeGreaterThan(20);
  expect(cardQr.path.length).toBeGreaterThan(100);
});
