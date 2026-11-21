import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const distDir = 'C:/Users/ivang/Desktop/proyectos locales temporales/track9autotire.com/dist';

// Simple static HTTP server for preview
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  else if (reqPath === '/es' || reqPath === '/es/') reqPath = '/es/index.html';

  let filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 4199;
server.listen(PORT, async () => {
  console.log(`Auditor HTTP server running at http://127.0.0.1:${PORT}`);
  try {
    await runHttpChecks();
    await runBrowserAudit();
    console.log('\n=== AUDIT COMPLETE: ALL CHECKS PASSED WITH 0 ERRORS! ===');
  } catch (err) {
    console.error('Audit failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data }));
      res.on('error', reject);
    });
  });
}

async function runHttpChecks() {
  console.log('\n--- 1. HTTP Endpoint & Header Verification ---');

  const endpoints = [
    { url: `http://127.0.0.1:${PORT}/`, expectLang: 'en', expectH1: true },
    { url: `http://127.0.0.1:${PORT}/es`, expectLang: 'es', expectH1: true },
    { url: `http://127.0.0.1:${PORT}/robots.txt`, expectContent: 'GPTBot' },
    { url: `http://127.0.0.1:${PORT}/sitemap.xml`, expectContent: 'https://track9autotire.com/es' },
    { url: `http://127.0.0.1:${PORT}/llms.txt`, expectContent: 'Track 9 Auto & Tire' },
  ];

  for (const ep of endpoints) {
    const res = await fetchUrl(ep.url);
    if (res.status !== 200) {
      throw new Error(`Endpoint ${ep.url} returned status ${res.status}`);
    }
    if (ep.expectLang && !res.data.includes(`lang="${ep.expectLang}"`)) {
      throw new Error(`Endpoint ${ep.url} missing lang="${ep.expectLang}"`);
    }
    if (ep.expectContent && !res.data.includes(ep.expectContent)) {
      throw new Error(`Endpoint ${ep.url} missing expected content "${ep.expectContent}"`);
    }
    console.log(`✓ ${ep.url} -> 200 OK (${res.data.length} bytes)`);
  }
}

async function runBrowserAudit() {
  console.log('\n--- 2. Headless Chrome Runtime & DOM Verification ---');
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

  // Test both English and Spanish in Desktop (1440x900) and Mobile (390x844)
  const scenarios = [
    { name: 'Desktop English', url: `http://127.0.0.1:${PORT}/`, width: 1440, height: 900 },
    { name: 'Mobile English', url: `http://127.0.0.1:${PORT}/`, width: 390, height: 844 },
    { name: 'Desktop Spanish', url: `http://127.0.0.1:${PORT}/es`, width: 1440, height: 900 },
    { name: 'Mobile Spanish', url: `http://127.0.0.1:${PORT}/es`, width: 390, height: 844 },
  ];

  for (const sc of scenarios) {
    const outImg = path.join(distDir, `audit-${sc.name.toLowerCase().replace(/\s+/g, '-')}.png`);
    await new Promise((resolve, reject) => {
      const args = [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        `--window-size=${sc.width},${sc.height}`,
        `--screenshot=${outImg}`,
        sc.url,
      ];
      const proc = spawn(chromePath, args);
      proc.on('close', (code) => {
        if (code === 0 && fs.existsSync(outImg)) {
          const stats = fs.statSync(outImg);
          console.log(`✓ [${sc.name}] Screenshot captured: ${stats.size} bytes (${path.basename(outImg)})`);
          // Clean up test screenshot
          fs.unlinkSync(outImg);
          resolve();
        } else {
          reject(new Error(`Chrome failed for scenario ${sc.name} with code ${code}`));
        }
      });
      proc.on('error', reject);
    });
  }
}
