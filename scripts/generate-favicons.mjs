// Genere le jeu d'icones du site a partir de src/assets/koracom-logo.svg.
//
// Dependances ponctuelles, volontairement hors du package.json du projet :
//   npm i --no-save sharp png-to-ico
//   node scripts/generate-favicons.mjs
//
// Le logotype complet est illisible dans un carre de 16 px : on n'extrait que
// l'icone kora (calebasse + manche + cordes), la calligraphie demarre a x=155.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const INK = '#2A1B12';
const SAND = '#F0E0CD';
const ICON_MAX_X = 150;
const SIZE = 320;
/** Part de la hauteur du carre occupee par la marque. */
const MARGIN = 0.78;

const logo = fs.readFileSync(
  path.join(root, 'src/assets/koracom-logo.svg'),
  'utf8',
);
const d = logo.match(/ d="([^"]+)"/)[1];

const bboxOf = (subpath) => {
  const nums = subpath.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = [];
  const ys = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    xs.push(nums[i]);
    ys.push(nums[i + 1]);
  }
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
};

// potrace fusionne tous les contours dans un seul `d` : on redecoupe sur les M.
const kept = d
  .split(/(?=M )/)
  .filter((subpath) => subpath.trim())
  .filter((subpath) => bboxOf(subpath).maxX < ICON_MAX_X);

const boxes = kept.map(bboxOf);
const minX = Math.min(...boxes.map((b) => b.minX));
const maxX = Math.max(...boxes.map((b) => b.maxX));
const minY = Math.min(...boxes.map((b) => b.minY));
const maxY = Math.max(...boxes.map((b) => b.maxY));

const scale = (SIZE * MARGIN) / (maxY - minY);
const cx = (minX + maxX) / 2;
const cy = (minY + maxY) / 2;

const mark = `<g transform="translate(${SIZE / 2} ${SIZE / 2}) scale(${scale.toFixed(4)}) translate(${-cx} ${-cy})" fill="${SAND}"><path d="${kept.join('')}"/></g>`;

const makeSvg = (radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="${radius}" fill="${INK}"/>${mark}</svg>`;

const rounded = makeSvg(64);
// iOS applique son propre masque : l'apple-touch-icon reste un carre plein.
const squared = makeSvg(0);

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), `${rounded}\n`, 'utf8');

const render = (svg, size, file) =>
  sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(path.join(publicDir, file));

await Promise.all([
  render(rounded, 192, 'icon-192.png'),
  render(rounded, 512, 'icon-512.png'),
  render(squared, 180, 'apple-touch-icon.png'),
]);

const icoSizes = await Promise.all(
  [16, 32, 48].map((size) =>
    sharp(Buffer.from(rounded)).resize(size, size).png().toBuffer(),
  ),
);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), await pngToIco(icoSizes));

console.log(
  `icone : ${kept.length} sous-chemins, ${(maxX - minX).toFixed(0)}x${(maxY - minY).toFixed(0)}`,
);
console.log(
  'ecrits : favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png',
);
