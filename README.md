# Track 9 Auto & Tire (`track9autotire.com`)

Static bilingual (**English** `/` default, **Spanish** `/es`) React 19 + Vite 8 + Tailwind CSS 4 + TypeScript project configured for zero-CPU deployment on Vercel.

## Features
- **Static HTML Prerendering (`dist/index.html` & `dist/es/index.html`)**: Full SSR-rendered DOM with `hydrateRoot`, route-specific `<html lang>`, `<title>`, `<meta name="description">`, canonicals, `hreflang` (`en`, `es`, `x-default`), Open Graph, Twitter Cards, and localized `JSON-LD` (`AutoRepair` / `AutomotiveBusiness` + `Service` catalog).
- **SEO & AI Search (GEO/AEO)**: `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` ready at root.
- **Optimized Active Media**: Only the 20 active website assets extracted from the WordPress archive and converted via `sharp` into responsive `.avif` and `.webp` sizes (with EXIF auto-rotation).
- **Zero-CPU Quote Form**: Decoupled adapter supporting Web3Forms or a custom HTTPS webhook (e.g. n8n), client-side validation, and anti-spam honeypot.
- **Vercel A+ Security Headers**: Configured in `vercel.json` with `cleanUrls: true`, `trailingSlash: false`, HSTS, CSP (no `unsafe-inline` in `script-src`), and immutable asset caching.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Prerender

```bash
npx tsc --noEmit
npm run build
npm run preview
```

`npm run build` executes:
1. `vite build` -> client bundle in `dist/`
2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` -> temporary SSR bundle
3. `node scripts/prerender.mjs` -> writes `dist/index.html` (`en`) and `dist/es/index.html` (`es`), then removes `dist-ssr/`

## Contact Form Setup (Vercel)
The original WordPress recipient email is `confg.ruedalarola@gmail.com`.

1. **Web3Forms (Recommended for Zero-CPU)**:
   - Generate an access key at https://web3forms.com bound to `confg.ruedalarola@gmail.com`.
   - Set `VITE_CONTACT_PROVIDER=web3forms` and `VITE_WEB3FORMS_ACCESS_KEY=<your-key>` in Vercel Project Settings -> Environment Variables.
2. **Custom Webhook (e.g., n8n)**:
   - Set `VITE_CONTACT_PROVIDER=webhook` and `VITE_CONTACT_WEBHOOK_URL=https://your-webhook-endpoint`.
   - Add your webhook origin to `connect-src` inside `vercel.json` if it is on a separate domain.

## Re-Extracting Assets (Optional)
If regenerating optimized images from the local WordPress backup archive:

```bash
npm run assets:extract
```
