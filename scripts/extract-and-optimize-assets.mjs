import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yauzl from 'yauzl';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

const DEFAULT_ZIP_PATH =
  process.env.WP_ZIP_PATH ||
  'C:\\Users\\ivang\\Desktop\\inmotion\\track9autotire.com\\wp-admin.zip';

const ACTIVE_ASSETS = [
  {
    zipPath: 'wp-content/uploads/2024/11/TRACK-9_logo.png',
    outName: 'track9-logo',
    widths: [160, 320],
    pngFallbackWidth: 512,
    isAlpha: true,
    isLogo: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/cropped-TRACK-9_logo.png',
    outName: 'track9-badge',
    widths: [240, 480],
    isAlpha: true,
    isSiteIcon: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-1-1.jpg',
    outName: 'hero-banner',
    widths: [640, 1080],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-3b.jpg',
    outName: 'service-tires-sale',
    widths: [400, 800],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-4.jpg',
    outName: 'service-tire-repair',
    widths: [400, 800],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-5.jpg',
    outName: 'service-brakes',
    widths: [400, 800],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-6.jpg',
    outName: 'used-brands-tire',
    widths: [400, 800],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-7.jpg',
    outName: 'special-oil-change',
    widths: [400, 800],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-8b.jpg',
    outName: 'special-flat-tire',
    widths: [400, 800],
    isAlpha: false,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-background-01-1.png',
    outName: 'bg-shape-top',
    widths: [768, 1440],
    isAlpha: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/auto-parts-background-02.png',
    outName: 'bg-shape-bottom',
    widths: [768, 1572],
    isAlpha: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/atlas_logo.png',
    outName: 'brand-atlas',
    widths: [270],
    isAlpha: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/f9fee31fc24543c39912346d01a9983c.png',
    outName: 'brand-atlander',
    widths: [320, 640],
    isAlpha: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/zfSrp6VBUdL7zqn6ByY9Uzn6996iXNKOixHG1VL3.webp',
    outName: 'brand-delinte',
    widths: [393],
    isAlpha: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/premiorri_logo_e_motors_ru.webp',
    outName: 'brand-premiorri',
    widths: [320, 640],
    isAlpha: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/landscape-maintenance-38-1.jpg',
    outName: 'footer-shop-bg',
    widths: [640, 1280, 1920],
    isAlpha: false,
    isOgBg: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/20190916_173504-scaled.jpg',
    outName: 'gallery-1',
    widths: [480, 720],
    isAlpha: false,
    isGallery: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/20190916_173432-scaled.jpg',
    outName: 'gallery-2',
    widths: [480, 720],
    isAlpha: false,
    isGallery: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/20190915_162823-scaled.jpg',
    outName: 'gallery-3',
    widths: [480, 720],
    isAlpha: false,
    isGallery: true,
  },
  {
    zipPath: 'wp-content/uploads/2024/11/received_481094149149293.jpeg',
    outName: 'gallery-4',
    widths: [480, 720],
    isAlpha: false,
    isGallery: true,
  },
];

function extractNeededEntries(zipFilePath, wantedPaths) {
  return new Promise((resolve, reject) => {
    const wantedSet = new Set(wantedPaths);
    const buffers = new Map();

    yauzl.open(zipFilePath, { lazyEntries: true }, (openErr, zipfile) => {
      if (openErr || !zipfile) {
        reject(openErr || new Error('Failed to open zip file'));
        return;
      }

      zipfile.on('error', reject);
      zipfile.on('end', () => resolve(buffers));

      zipfile.on('entry', (entry) => {
        if (!wantedSet.has(entry.fileName)) {
          zipfile.readEntry();
          return;
        }

        zipfile.openReadStream(entry, (streamErr, readStream) => {
          if (streamErr || !readStream) {
            reject(streamErr || new Error(`Failed stream for ${entry.fileName}`));
            return;
          }

          const chunks = [];
          readStream.on('data', (chunk) => chunks.push(chunk));
          readStream.on('error', reject);
          readStream.on('end', () => {
            buffers.set(entry.fileName, Buffer.concat(chunks));
            zipfile.readEntry();
          });
        });
      });

      zipfile.readEntry();
    });
  });
}

async function generateFavicons(iconBuffer) {
  const sizes = [
    { file: 'favicon-16x16.png', size: 16 },
    { file: 'favicon-32x32.png', size: 32 },
    { file: 'apple-touch-icon.png', size: 180 },
    { file: 'icon-192.png', size: 192 },
    { file: 'icon-512.png', size: 512 },
  ];

  for (const item of sizes) {
    const outPath = path.join(PUBLIC_DIR, item.file);
    await sharp(iconBuffer)
      .rotate()
      .resize(item.size, item.size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
  }
}

async function generateOgImage(bgBuffer, logoBuffer) {
  const logoOverlay = await sharp(logoBuffer)
    .rotate()
    .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const darkenedBg = await sharp(bgBuffer)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.48 })
    .toBuffer();

  const outPath = path.join(IMAGES_DIR, 'og-cover.jpg');
  await sharp(darkenedBg)
    .composite([{ input: logoOverlay, gravity: 'center' }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);
}

async function main() {
  await fs.rm(IMAGES_DIR, { recursive: true, force: true });
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const wantedPaths = ACTIVE_ASSETS.map((a) => a.zipPath);
  console.log(`Streaming ${wantedPaths.length} active assets from ${DEFAULT_ZIP_PATH}...`);
  const extracted = await extractNeededEntries(DEFAULT_ZIP_PATH, wantedPaths);

  const missing = wantedPaths.filter((p) => !extracted.has(p));
  if (missing.length > 0) {
    throw new Error(`Missing expected ZIP entries:\n${missing.join('\n')}`);
  }

  let ogBgBuffer = null;
  let logoBuffer = null;

  for (const asset of ACTIVE_ASSETS) {
    const rawBuffer = extracted.get(asset.zipPath);
    // Bake EXIF orientation via .rotate() first before reading dimensions or resizing
    const orientedBuffer = await sharp(rawBuffer).rotate().toBuffer();
    const meta = await sharp(orientedBuffer).metadata();

    if (asset.isSiteIcon) {
      await generateFavicons(orientedBuffer);
    }
    if (asset.isLogo) {
      logoBuffer = orientedBuffer;
    }
    if (asset.isOgBg) {
      ogBgBuffer = orientedBuffer;
    }

    if (asset.pngFallbackWidth) {
      const pngOut = path.join(IMAGES_DIR, `${asset.outName}-${asset.pngFallbackWidth}.png`);
      await sharp(orientedBuffer)
        .resize({ width: asset.pngFallbackWidth, withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toFile(pngOut);
    }

    for (const width of asset.widths) {
      const pipeline = sharp(orientedBuffer).resize({
        width,
        withoutEnlargement: true,
      });

      const webpOut = path.join(IMAGES_DIR, `${asset.outName}-${width}.webp`);
      const avifOut = path.join(IMAGES_DIR, `${asset.outName}-${width}.avif`);

      await pipeline
        .clone()
        .webp({ quality: asset.isAlpha ? 86 : asset.isGallery ? 74 : 80, effort: 5 })
        .toFile(webpOut);

      await pipeline
        .clone()
        .avif({ quality: asset.isAlpha ? 72 : asset.isGallery ? 54 : 62, effort: 5 })
        .toFile(avifOut);
    }

    console.log(
      `[OK] ${asset.outName.padEnd(20)} (${meta.width}x${meta.height} after EXIF rotate) -> widths [${asset.widths.join(', ')}]`,
    );
  }

  if (ogBgBuffer && logoBuffer) {
    await generateOgImage(ogBgBuffer, logoBuffer);
    console.log('[OK] og-cover.jpg         (1200x630)');
  }

  // Audit output sizes
  const files = await fs.readdir(IMAGES_DIR);
  let oversized = [];
  for (const file of files) {
    const stat = await fs.stat(path.join(IMAGES_DIR, file));
    if (stat.size > 200 * 1024) {
      oversized.push({ file, kb: (stat.size / 1024).toFixed(1) });
    }
  }

  console.log(`\nGenerated ${files.length} optimized image files in public/images/.`);
  if (oversized.length > 0) {
    console.warn('Warning: files > 200 KB:', oversized);
  } else {
    console.log('All files in public/images/ are <= 200 KB.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
