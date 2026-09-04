// Générateur QR minimal — mode octet, niveau de correction H, versions 1 à 6.
// Retourne { size, path } : chemin SVG en unités de module (1 module = 1 unité).

const EXP = [], LOG = [];
(function () { let x = 1; for (let i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 0x100) x ^= 0x11d; } EXP[255] = 1; })();
const mul = (a, b) => (a === 0 || b === 0) ? 0 : EXP[(LOG[a] + LOG[b]) % 255];

function genPoly(n) {
  let p = [1];
  for (let i = 0; i < n; i++) {
    const r = new Array(p.length + 1).fill(0);
    for (let j = 0; j < p.length; j++) { r[j] ^= mul(p[j], 1); r[j + 1] ^= mul(p[j], EXP[i]); }
    p = r;
  }
  return p;
}

function ecc(data, n) {
  const gen = genPoly(n);
  const res = new Array(data.length + n).fill(0);
  data.forEach((b, i) => { res[i] = b; });
  for (let i = 0; i < data.length; i++) {
    const c = res[i];
    if (c === 0) continue;
    for (let j = 0; j < gen.length; j++) res[i + j] ^= mul(gen[j], c);
  }
  return res.slice(data.length);
}

const V = {
  1: { ec: 17, g: [[1, 9]] },
  2: { ec: 28, g: [[1, 16]] },
  3: { ec: 22, g: [[2, 13]] },
  4: { ec: 16, g: [[4, 9]] },
  5: { ec: 22, g: [[2, 11], [2, 12]] },
  6: { ec: 28, g: [[4, 15]] }
};
const ALIGN = { 1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34] };

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r, c) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2 + (r * c) % 3) === 0,
  (r, c) => (((r * c) % 2 + (r * c) % 3) % 2) === 0,
  (r, c) => (((r + c) % 2 + (r * c) % 3) % 2) === 0
];

function fmtBits(d) {
  let v = d << 10;
  for (let i = 4; i >= 0; i--) if (v & (1 << (i + 10))) v ^= 0x537 << i;
  return ((d << 10) | (v & 0x3ff)) ^ 0x5412;
}

function penalty(m, n) {
  let p = 0, dark = 0;
  const run = (get) => {
    for (let a = 0; a < n; a++) {
      let len = 1, prev = get(a, 0);
      for (let b = 1; b < n; b++) {
        const cur = get(a, b);
        if (cur === prev) { len++; } else { if (len >= 5) p += 3 + (len - 5); len = 1; prev = cur; }
      }
      if (len >= 5) p += 3 + (len - 5);
    }
  };
  run((r, c) => m[r][c]);
  run((c, r) => m[r][c]);
  for (let r = 0; r < n - 1; r++) for (let c = 0; c < n - 1; c++) {
    const v = m[r][c];
    if (v === m[r][c + 1] && v === m[r + 1][c] && v === m[r + 1][c + 1]) p += 3;
  }
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (m[r][c]) dark++;
  p += Math.floor(Math.abs(dark * 100 / (n * n) - 50) / 5) * 10;
  return p;
}

export function qr(text) {
  const bytes = Array.from(new TextEncoder().encode(text));
  let ver = 0;
  for (let v = 1; v <= 6; v++) {
    const cap = V[v].g.reduce((s, [c, d]) => s + c * d, 0);
    if (bytes.length + 2 <= cap) { ver = v; break; }
  }
  if (!ver) throw new Error('QR: contenu trop long');

  const bits = [];
  const put = (v, n) => { for (let i = n - 1; i >= 0; i--) bits.push((v >> i) & 1); };
  put(4, 4); put(bytes.length, 8); bytes.forEach(b => put(b, 8));
  const totalData = V[ver].g.reduce((s, [c, d]) => s + c * d, 0);
  put(0, Math.min(4, totalData * 8 - bits.length));
  while (bits.length % 8) bits.push(0);
  const dc = [];
  for (let i = 0; i < bits.length; i += 8) { let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; dc.push(b); }
  const pads = [0xEC, 0x11]; let pi = 0;
  while (dc.length < totalData) dc.push(pads[pi++ % 2]);

  const blocks = [], ecs = [];
  let off = 0;
  V[ver].g.forEach(([c, d]) => {
    for (let i = 0; i < c; i++) { const blk = dc.slice(off, off + d); off += d; blocks.push(blk); ecs.push(ecc(blk, V[ver].ec)); }
  });
  const final = [];
  const maxD = Math.max.apply(null, blocks.map(b => b.length));
  for (let i = 0; i < maxD; i++) blocks.forEach(b => { if (i < b.length) final.push(b[i]); });
  for (let i = 0; i < V[ver].ec; i++) ecs.forEach(e => final.push(e[i]));

  const n = 17 + 4 * ver;
  const m = Array.from({ length: n }, () => new Array(n).fill(null));

  [[0, 0], [0, n - 7], [n - 7, 0]].forEach(([r0, c0]) => {
    for (let i = -1; i < 8; i++) for (let j = -1; j < 8; j++) {
      const r = r0 + i, c = c0 + j;
      if (r < 0 || c < 0 || r >= n || c >= n) continue;
      const inb = i >= 0 && i < 7 && j >= 0 && j < 7;
      const on = inb && (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4));
      m[r][c] = on ? 1 : 0;
    }
  });
  for (let i = 8; i < n - 8; i++) { const v = i % 2 === 0 ? 1 : 0; m[6][i] = v; m[i][6] = v; }
  const al = ALIGN[ver];
  for (const r0 of al) for (const c0 of al) {
    if (m[r0][c0] !== null) continue;
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) m[r0 + i][c0 + j] = Math.max(Math.abs(i), Math.abs(j)) !== 1 ? 1 : 0;
  }
  for (let i = 0; i < 9; i++) { if (m[8][i] === null) m[8][i] = 2; if (m[i][8] === null) m[i][8] = 2; }
  for (let i = 0; i < 8; i++) { if (m[8][n - 1 - i] === null) m[8][n - 1 - i] = 2; if (m[n - 1 - i][8] === null) m[n - 1 - i][8] = 2; }
  m[n - 8][8] = 2;

  const fn = m.map(row => row.map(v => v !== null));

  const dataBits = [];
  final.forEach(b => { for (let i = 7; i >= 0; i--) dataBits.push((b >> i) & 1); });
  let bi = 0, up = true;
  for (let col = n - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let k = 0; k < n; k++) {
      const row = up ? n - 1 - k : k;
      for (const c of [col, col - 1]) {
        if (m[row][c] === null) m[row][c] = bi < dataBits.length ? dataBits[bi++] : 0;
      }
    }
    up = !up;
  }

  let best = null;
  for (let mk = 0; mk < 8; mk++) {
    const t = m.map((row, r) => row.map((v, c) => fn[r][c] ? (v === 2 ? 0 : v) : (MASKS[mk](r, c) ? v ^ 1 : v)));
    // format + version reserved cells written below; approximate penalty on data area
    const p = penalty(t, n);
    if (best === null || p < best.p) best = { p, mk, t };
  }

  const out = best.t;
  const fmt = fmtBits((2 << 3) | best.mk);
  const set = (r, c, v) => { out[r][c] = v; };
  for (let i = 0; i <= 5; i++) set(8, i, (fmt >> i) & 1);
  set(8, 7, (fmt >> 6) & 1); set(8, 8, (fmt >> 7) & 1); set(7, 8, (fmt >> 8) & 1);
  for (let i = 9; i <= 14; i++) set(14 - i, 8, (fmt >> i) & 1);
  for (let i = 0; i <= 7; i++) set(n - 1 - i, 8, (fmt >> i) & 1);
  for (let i = 8; i <= 14; i++) set(8, n - 15 + i, (fmt >> i) & 1);
  set(n - 8, 8, 1);

  let path = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (out[r][c]) path += 'M' + c + ' ' + r + 'h1v1h-1z';
  return { size: n, path };
}
