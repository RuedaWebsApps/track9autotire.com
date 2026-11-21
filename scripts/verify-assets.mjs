import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

const htmlFiles = [
  'index.html',
  'es/index.html',
  'privacy/index.html',
  'terms/index.html',
  'cookies/index.html',
  'accessibility/index.html',
  'es/privacidad/index.html',
  'es/terminos/index.html',
  'es/cookies/index.html',
  'es/accesibilidad/index.html',
];

const assets = new Set();

for (const file of htmlFiles) {
  const full = path.join(dist, file);
  if (!fs.existsSync(full)) {
    console.error('MISSING HTML:', file);
    process.exit(1);
  }
  const html = fs.readFileSync(full, 'utf8');
  const regex = /(?:src|href)="\/([^"]+\.(?:webp|avif|png|jpg|svg|css|js|webmanifest))"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    assets.add(match[1]);
  }
}

let missing = 0;
for (const a of assets) {
  const full = path.join(dist, a);
  if (!fs.existsSync(full)) {
    console.error('MISSING ASSET:', a);
    missing++;
  }
}

if (missing === 0) {
  console.log(`ALL ${assets.size} REFERENCED ASSETS EXIST ON DISK ACROSS ${htmlFiles.length} ROUTES (0 404s)!`);
} else {
  console.error('Total missing assets:', missing);
  process.exit(1);
}
