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
  @font-face { font-family: 'Instrument Serif'; font-style: normal; font-weight: 400; src: url('${await fontData('@fontsource/instrument-serif', 'instrument-serif-latin-400-normal.woff2')}') format('woff2'); }
  @font-face { font-family: 'Instrument Serif'; font-style: italic; font-weight: 400; src: url('${await fontData('@fontsource/instrument-serif', 'instrument-serif-latin-400-italic.woff2')}') format('woff2'); }
  @font-face { font-family: 'Inter Tight'; font-weight: 100 900; src: url('${await fontData('@fontsource-variable/inter-tight', 'inter-tight-latin-wght-normal.woff2')}') format('woff2'); }
`;

const INK = '#141311';
const PAPER = '#f2eee6';
const EMBER = '#ff6a3d';

/**
 * The logo mark ("D" monogram + ember dot), kept in sync with src/components/Logo.astro.
 * `scale` shrinks the glyph toward the centre (used for the maskable icon's safe zone).
 */
const mark = ({ rounded = true, scale = 1, tile = INK, glyph = PAPER } = {}) => `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="${rounded ? 8 : 0}" fill="${tile}"/>
  <g transform="translate(16 16) scale(${scale}) translate(-16 -16)">
    <path d="M10.5 8.5v15h4.25a7.5 7.5 0 0 0 0-15z" fill="none" stroke="${glyph}" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="24.75" cy="23.75" r="2.25" fill="${EMBER}"/>
  </g>
</svg>`;

const iconPage = (size, opts = {}) => `<!doctype html>
<html><head><style>
  html,body{margin:0;width:${size}px;height:${size}px;background:transparent;}
  svg{width:${size}px;height:${size}px;display:block}
</style></head><body>${mark(opts)}</body></html>`;

const star =
  'M10.6 1h2.8v7.6l5.4-5.4 2 2-5.4 5.4H23v2.8h-7.6l5.4 5.4-2 2-5.4-5.4V23h-2.8v-7.6l-5.4 5.4-2-2 5.4-5.4H1v-2.8h7.6L3.2 5.2l2-2 5.4 5.4z';

const ogPage = `<!doctype html>
<html><head><style>
  ${fonts}
  *{box-sizing:border-box;margin:0}
  html,body{width:1200px;height:630px}
  body{font-family:'Inter Tight',sans-serif;color:${INK};background:${PAPER};overflow:hidden;position:relative}
  .lines{position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(20,19,17,.08) 1px,transparent 1px);background-size:200px 100%;background-position:76px 0}
  .content{position:relative;padding:64px 76px;height:100%;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:16px;font-family:'Instrument Serif';font-size:44px;letter-spacing:-.01em}
  .brand svg{width:54px;height:54px}
  .brand em{color:#b83a17}
  h1{margin-top:52px;font-family:'Instrument Serif';font-weight:400;font-size:104px;line-height:.9;letter-spacing:-.03em;max-width:980px}
  h1 em{color:#b83a17}
  .foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:22px;border-top:1px solid rgba(20,19,17,.3);font-size:24px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
  .foot span:last-child{letter-spacing:0;text-transform:none;font-weight:500}
  .star{position:absolute;right:-70px;top:-70px;width:330px;height:330px;fill:${EMBER}}
</style></head><body>
  <div class="lines"></div>
  <svg class="star" viewBox="0 0 24 24"><path d="${star}"/></svg>
  <div class="content">
    <div class="brand">${mark()}<span>Digital <em>AI</em> Force</span></div>
    <h1>Websites, SEO &amp; marketing that <em>grow small businesses</em></h1>
    <div class="foot"><span>Web · SEO · Ads · Apps · AI</span><span>digitalaiforce.com</span></div>
  </div>
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
// Maskable icon: full-bleed square with the glyph scaled into the central 80% safe zone.
await shot(iconPage(512, { rounded: false, scale: 0.78 }), 'icon-maskable-512.png', { width: 512, height: 512 }, { transparent: false });
await shot(ogPage, 'og-image.png', { width: 1200, height: 630 }, { transparent: false });
await browser.close();

await writeFile(path.join(pub, 'favicon.svg'), mark().trim() + '\n');
console.log('wrote favicon.svg');
console.log('Combine favicon-16/32/48.png into favicon.ico with ImageMagick: convert favicon-16.png favicon-32.png favicon-48.png favicon.ico');
