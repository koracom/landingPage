// Extrait le pictogramme kora du logo et l'ecrit en constante TypeScript,
// pour l'utiliser comme motif decoratif dans l'interface.
//
//   node scripts/generate-kora-mark.mjs
//
// Meme extraction que scripts/generate-favicons.mjs : le logo contient le
// pictogramme puis le lettrage « KoraCom », separes sur l'axe X.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Au-dela de cette abscisse commence le lettrage, pas le pictogramme. */
const ICON_MAX_X = 150;

const logo = fs.readFileSync(
  path.join(root, 'src/assets/koracom-logo.svg'),
  'utf8',
);

const bboxOf = (subpath) => {
  const nums = subpath.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = nums.filter((_, index) => index % 2 === 0);
  const ys = nums.filter((_, index) => index % 2 === 1);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
};

const subpaths = logo
  .match(/ d="([^"]+)"/g)
  .map((attribute) => attribute.slice(4, -1))
  .flatMap((d) => d.split(/(?=M)/))
  .filter((subpath) => subpath.trim())
  .filter((subpath) => bboxOf(subpath).maxX < ICON_MAX_X);

const boxes = subpaths.map(bboxOf);
const minX = Math.min(...boxes.map((box) => box.minX));
const maxX = Math.max(...boxes.map((box) => box.maxX));
const minY = Math.min(...boxes.map((box) => box.minY));
const maxY = Math.max(...boxes.map((box) => box.maxY));

fs.writeFileSync(
  path.join(root, 'src/features/marketing/data/kora-mark.ts'),
  `/* eslint-disable */
/**
 * GENERE AUTOMATIQUEMENT - ne pas editer a la main.
 * Pictogramme kora extrait de src/assets/koracom-logo.svg.
 * Regenerer : node scripts/generate-kora-mark.mjs
 */
export const koraMark = {
  // Le logo est dessine en fill-rule evenodd : sans cette regle, les formes
  // creuses (la caisse de la kora) se remplissent et le trait devient aplat.
  fillRule: 'evenodd',
  viewBox: '${minX} ${minY} ${(maxX - minX).toFixed(3)} ${(maxY - minY).toFixed(3)}',
  path: '${subpaths.join('')}',
} as const;
`,
  'utf8',
);

console.log(
  `kora-mark.ts : ${subpaths.length} sous-chemins, viewBox ${minX} ${minY} ${(maxX - minX).toFixed(3)} ${(maxY - minY).toFixed(3)}`,
);
