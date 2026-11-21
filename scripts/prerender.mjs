import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const DIST_SSR_DIR = path.join(PROJECT_ROOT, 'dist-ssr');

function escapeAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildLocalizedHtml(templateHtml, rendered) {
  const jsonLdTags = rendered.jsonLd
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .join('\n    ');

  let out = templateHtml;

  out = out.replace(/<html lang="[^"]*"/, `<html lang="${rendered.locale}"`);
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(rendered.title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapeAttr(rendered.description)}" />`,
  );
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${escapeAttr(rendered.canonical)}" />`,
  );
  if (rendered.alternateEn && rendered.alternateEs) {
    out = out.replace(
      /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="en" href="${escapeAttr(rendered.alternateEn)}" />`,
    );
    out = out.replace(
      /<link\s+rel="alternate"\s+hreflang="es"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="es" href="${escapeAttr(rendered.alternateEs)}" />`,
    );
    out = out.replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/>/,
      `<link rel="alternate" hreflang="x-default" href="${escapeAttr(rendered.alternateEn)}" />`,
    );
  }
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapeAttr(rendered.title)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapeAttr(rendered.description)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${escapeAttr(rendered.canonical)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale" content="${escapeAttr(rendered.ogLocale)}" />`,
  );
  out = out.replace(
    /<meta\s+property="og:locale:alternate"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:locale:alternate" content="${escapeAttr(rendered.ogAlternateLocale)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapeAttr(rendered.title)}" />`,
  );
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapeAttr(rendered.description)}" />`,
  );

  out = out.replace('<!--jsonld-outlet-->', jsonLdTags);
  out = out.replace('<!--ssr-outlet-->', rendered.html);

  return out;
}

const ROUTES = [
  { path: '/', outRel: 'index.html' },
  { path: '/es', outRel: 'es/index.html' },
  { path: '/privacy', outRel: 'privacy/index.html' },
  { path: '/terms', outRel: 'terms/index.html' },
  { path: '/cookies', outRel: 'cookies/index.html' },
  { path: '/accessibility', outRel: 'accessibility/index.html' },
  { path: '/es/privacidad', outRel: 'es/privacidad/index.html' },
  { path: '/es/terminos', outRel: 'es/terminos/index.html' },
  { path: '/es/cookies', outRel: 'es/cookies/index.html' },
  { path: '/es/accesibilidad', outRel: 'es/accesibilidad/index.html' },
];

async function run() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  const templateHtml = await fs.readFile(templatePath, 'utf-8');

  const ssrEntryUrl = pathToFileURL(path.join(DIST_SSR_DIR, 'entry-server.js')).href;
  const { render } = await import(ssrEntryUrl);

  console.log('Prerendering static HTML routes:');
  for (const r of ROUTES) {
    const rendered = render(r.path);
    const html = buildLocalizedHtml(templateHtml, rendered);
    const destPath = path.join(DIST_DIR, r.outRel);
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.writeFile(destPath, html, 'utf-8');
    console.log(` - dist/${r.outRel} (lang="${rendered.locale}", ${html.length} chars)`);
  }

  // Clean temporary SSR bundle directory
  await fs.rm(DIST_SSR_DIR, { recursive: true, force: true });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
