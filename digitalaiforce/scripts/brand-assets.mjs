/**
 * Regenerates the favicons, app icons and the 1200×630 social share image in /public.
 *
 * Requires Playwright with Chromium (not a project dependency):
 *   npx playwright install chromium
 *   node scripts/brand-assets.mjs
 *
 * Edit the HTML templates below to change the artwork, then re-run.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  ({ chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright'));
}

// Fonts are inlined as data URLs because pages created with setContent() can't load file:// URLs.
const fontData = async (pkg, file) =>
  `data:font/woff2;base64,${(await readFile(path.join(root, 'node_modules', pkg, 'files', file))).toString('base64')}`;
const fonts = `
  @font-face { font-family: 'Space Grotesk'; font-weight: 300 700; src: url('${await fontData('@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2')}') format('woff2'); }
  @font-face { font-family: 'DM Sans'; font-weight: 100 1000; src: url('${await fontData('@fontsource-variable/dm-sans', 'dm-sans-latin-wght-normal.woff2')}') format('woff2'); }
`;

/** The logo mark, kept in sync with src/components/Logo.astro. */
const mark = (id, { rounded = true } = {}) => `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7c5cff"/><stop offset="0.55" stop-color="#3b82f6"/><stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="${rounded ? 9 : 0}" fill="url(#${id})"/>
  <path d="M14.6 7.2c.7 5.3 3.3 7.9 8.6 8.6-5.3.7-7.9 3.3-8.6 8.6-.7-5.3-3.3-7.9-8.6-8.6 5.3-.7 7.9-3.3 8.6-8.6Z" fill="#fff"/>
  <path d="M23.6 4.6c.25 1.85 1.15 2.75 3 3-1.85.25-2.75 1.15-3 3-.25-1.85-1.15-2.75-3-3 1.85-.25 2.75-1.15 3-3Z" fill="#fff" fill-opacity="0.85"/>
</svg>`;

const iconPage = (size, { padding = 0, rounded = true, bg = 'transparent' } = {}) => `<!doctype html>
<html><head><style>
  html,body{margin:0;width:${size}px;height:${size}px;background:${bg};}
  .wrap{width:${size}px;height:${size}px;display:grid;place-items:center;box-sizing:border-box;padding:${padding}px;}
  svg{width:100%;height:100%;display:block}
</style></head><body><div class="wrap">${mark('g' + size, { rounded })}</div></body></html>`;

const ogPage = `<!doctype html>
<html><head><style>
  ${fonts}
  *{box-sizing:border-box;margin:0}
  html,body{width:1200px;height:630px}
  body{font-family:'DM Sans',sans-serif;color:#f1f3ff;overflow:hidden;position:relative;
    background:radial-gradient(60% 80% at 0% 0%, rgba(124,92,255,.55), transparent 60%),
               radial-gradient(50% 70% at 100% 100%, rgba(34,211,238,.35), transparent 60%),
               #070a1f}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(168,176,216,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(168,176,216,.08) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse 80% 80% at 40% 30%,#000 30%,transparent 80%)}
  .content{position:relative;padding:68px 76px;height:100%;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:18px;font-family:'Space Grotesk';font-weight:700;font-size:38px;letter-spacing:-.03em}
  .brand svg{width:64px;height:64px;border-radius:16px;box-shadow:0 14px 40px -10px rgba(91,61,245,.8)}
  .ai{background:linear-gradient(100deg,#c4b5fd,#a78bfa 22%,#60a5fa 58%,#22d3ee);-webkit-background-clip:text;color:transparent}
  h1{margin-top:56px;font-family:'Space Grotesk';font-weight:700;font-size:74px;line-height:1.02;letter-spacing:-.04em;max-width:900px}
  h1 span{background:linear-gradient(100deg,#c4b5fd,#a78bfa 22%,#60a5fa 58%,#22d3ee);-webkit-background-clip:text;color:transparent}
  .chips{display:flex;gap:12px;margin-top:auto}
  .chip{padding:12px 22px;border-radius:999px;font-size:24px;font-weight:500;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16)}
  .url{position:absolute;right:76px;top:80px;font-family:'Space Grotesk';font-size:26px;font-weight:600;color:#a8b0d8}
  .spark{position:absolute;right:72px;bottom:64px;width:200px;height:200px;opacity:.9}
</style></head><body>
  <div class="grid"></div>
  <svg class="spark" viewBox="0 0 24 24"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><path d="M12 2c.8 6.1 3.9 9.2 10 10-6.1.8-9.2 3.9-10 10-.8-6.1-3.9-9.2-10-10 6.1-.8 9.2-3.9 10-10Z" fill="url(#s)"/></svg>
  <div class="content">
    <div class="brand">${mark('og')}<span>Digital <span class="ai">AI</span> Force</span></div>
    <h1>Websites, SEO &amp; marketing that <span>grow small businesses</span></h1>
    <div class="chips"><span class="chip">Web design</span><span class="chip">SEO</span><span class="chip">Ads</span><span class="chip">Mobile apps</span><span class="chip">AI automation</span></div>
  </div>
  <div class="url">digitalaiforce.com</div>
</body></html>`;

await mkdir(pub, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();

async function shot(html, file, size, { transparent = true } = {}) {
  await page.setViewportSize({ width: size.width, height: size.height });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(pub, file), omitBackground: transparent });
  console.log('wrote', file);
}

for (const s of [16, 32, 48]) await shot(iconPage(s), `favicon-${s}.png`, { width: s, height: s });
await shot(iconPage(180, { rounded: false }), 'apple-touch-icon.png', { width: 180, height: 180 }, { transparent: false });
await shot(iconPage(192), 'icon-192.png', { width: 192, height: 192 });
await shot(iconPage(512), 'icon-512.png', { width: 512, height: 512 });
// Maskable icon: full-bleed square; the spark already sits inside the 80% safe zone.
await shot(iconPage(512, { rounded: false }), 'icon-maskable-512.png', { width: 512, height: 512 }, { transparent: false });
await shot(ogPage, 'og-image.png', { width: 1200, height: 630 }, { transparent: false });
await browser.close();

await writeFile(path.join(pub, 'favicon.svg'), mark('favicon').trim() + '\n');
console.log('wrote favicon.svg');
console.log('Combine favicon-16/32/48.png into favicon.ico with ImageMagick: convert favicon-16.png favicon-32.png favicon-48.png favicon.ico');
