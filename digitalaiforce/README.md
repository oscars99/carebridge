# Digital AI Force — digitalaiforce.com

Marketing website for **Digital AI Force**, a digital agency offering web design & development, SEO, digital marketing, Google & Meta ads, mobile apps, e-commerce, branding and AI automation for small businesses.

Built with [Astro](https://astro.build) as a fully static, SEO-first site: every page is pre-rendered HTML, styles are plain CSS, and a small script adds the animations and interactions (it works without JavaScript too).

| Lighthouse (local build, mobile) | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 99 | 100 | 100 | 100 |
| Service, blog, about & contact pages | 100 | 100 | 100 | 100 |

## Quick start

Requires Node.js 22.12 or newer.

```bash
cd digitalaiforce
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the production build locally
npm run check     # type-check .astro/.ts files
```

## What's included

- **Home page** with animated hero, service bento grid, AI chat demo, scroll-driven process timeline, animated stats, industries, pricing tabs, FAQ and contact form
- **8 service pages** (`/services/<slug>/`), each targeting its own keywords, plus a services hub with an interactive "what's your goal?" service finder
- **Pricing**, **About**, **Contact**, **Blog** (3 starter articles), **Privacy**, **Terms** and a custom **404**
- **SEO:** unique titles and descriptions, canonical URLs, Open Graph/Twitter cards, JSON-LD structured data (Organization, WebSite, Service, FAQPage, BreadcrumbList, BlogPosting), XML sitemap, `robots.txt`, web manifest and icons
- **Accessibility:** semantic landmarks, skip link, keyboard-friendly menus and tabs, visible focus states, `prefers-reduced-motion` support

## Editing content

| What | Where |
| --- | --- |
| Business name, email, phone, location, socials, form delivery | `src/config/site.ts` |
| Service catalog and every service page's copy, features, process and FAQs | `src/data/services.ts` |
| Package names, prices and features | `src/data/pricing.ts` |
| Home page process, promises (stats), industries, FAQs, ticker | `src/data/home.ts` |
| Blog articles | `src/content/blog/*.md` — add a Markdown file with the same frontmatter fields |
| Privacy policy / terms | `src/pages/privacy.astro`, `src/pages/terms.astro` |
| Colors, fonts, spacing | `src/styles/global.css` (design tokens at the top) |
| Logo, favicons, social share image | `src/components/Logo.astro`, then `npm run assets` (see below) |

Empty optional fields in `site.ts` (phone, location, socials) are hidden automatically.

## Contact form

By default, submitting the form opens the visitor's email app with their message pre-filled to `site.email`. Connect a backend before launch so leads arrive automatically:

- **Any form service** (Formspree, Getform, a serverless function…): set `form.endpoint` in `src/config/site.ts` to the URL that accepts a JSON `POST`.
- **Supabase:** run `supabase/leads.sql` in your Supabase project, then set `form.supabase.url` and `form.supabase.anonKey`. The table only allows inserts from the public key; nobody can read leads from the browser.

## Deploying

**Vercel (recommended):** import the repository, set **Root Directory** to `digitalaiforce`, and deploy — Astro is detected automatically. `vercel.json` adds trailing-slash redirects, long-term caching for hashed assets and security headers. Then add `digitalaiforce.com` (and `www`) under Domains.

**Netlify / Cloudflare Pages:** base directory `digitalaiforce`, build command `npm run build`, publish directory `digitalaiforce/dist`.

**Any static host:** run `npm run build` and upload the contents of `dist/`.

## After launch

1. Verify the domain in [Google Search Console](https://search.google.com/search-console) and Bing Webmaster Tools, and submit `https://digitalaiforce.com/sitemap-index.xml`.
2. Create or update your Google Business Profile and link it to the site.
3. Add your city/service area and phone number in `src/config/site.ts` for stronger local SEO.
4. If you add analytics (e.g. GA4 or Plausible), update the privacy policy to match.
5. Keep publishing articles in `src/content/blog/` — fresh, helpful content is one of the strongest SEO signals.

## Before going live — please confirm

These are reasonable defaults written as placeholders. Review each so the site matches how the business actually operates:

- [ ] Prices in `src/data/pricing.ts`
- [ ] Promises shown as stats in `src/data/home.ts` (90+ PageSpeed, 24h replies, 100% ownership, 30 days support) and the "no long-term contracts" / "you own everything" commitments used across the site
- [ ] `hello@digitalaiforce.com` exists and is monitored (or change `site.email`)
- [ ] Contact form backend connected (see above)
- [ ] Privacy policy and terms reviewed (ideally by a legal professional)
- [ ] Add real client testimonials, logos or case studies once you have them — none were invented for this site

## Regenerating brand assets

`scripts/brand-assets.mjs` renders the favicons, app icons and the 1200×630 share image (`public/og-image.png`) with Playwright:

```bash
npx playwright install chromium
npm i -D playwright
npm run assets
cd public && convert favicon-16.png favicon-32.png favicon-48.png favicon.ico && rm favicon-16.png favicon-32.png favicon-48.png   # ImageMagick
```

## Project structure

```text
digitalaiforce/
├── public/                 # favicons, OG image, robots.txt, web manifest
├── scripts/brand-assets.mjs
├── supabase/leads.sql      # optional form backend
├── src/
│   ├── components/         # Header, Footer, ServicesBento, PricingPlans, FAQ, ContactForm…
│   │   └── home/           # home-only sections (hero, AI showcase, promises, industries)
│   ├── config/site.ts      # business details & form settings
│   ├── content/blog/       # Markdown articles
│   ├── data/               # services, pricing and home content
│   ├── layouts/            # BaseLayout (SEO head), LegalLayout
│   ├── lib/                # JSON-LD builders, blog helpers
│   ├── pages/              # routes
│   ├── scripts/            # client-side interactions & animations
│   └── styles/global.css   # design tokens & shared styles
├── astro.config.mjs
└── vercel.json
```
