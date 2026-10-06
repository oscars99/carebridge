/**
 * Packages & "starting at" prices shown on the home page, pricing page and
 * service pages. Change a number here and it updates everywhere.
 *
 * NOTE: these are placeholder prices — review them before launch.
 */

export interface Plan {
  id: string;
  name: string;
  price: string;
  /** Suffix shown after the price, e.g. "/mo" or "one-time". */
  period: string;
  prefix?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
}

export const prices = {
  starterSite: '$1,499',
  growthSite: '$3,499',
  customSite: '$5,999',
  care: '$99',
  seo: '$599',
  growth: '$1,299',
} as const;

export const websitePlans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    prefix: 'from',
    price: prices.starterSite,
    period: 'one-time',
    description: 'A professional, mobile-first website that gets a new or local business online fast.',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first, fast & secure build',
      'On-page SEO + Google Business Profile setup',
      'Contact / quote form & click-to-call',
      'Google Analytics & Search Console',
      '30 days of post-launch support',
    ],
    cta: 'Start my website',
  },
  {
    id: 'growth-site',
    name: 'Business Growth Website',
    prefix: 'from',
    price: prices.growthSite,
    period: 'one-time',
    description: 'A lead-generating website for established businesses that want to rank and convert.',
    features: [
      'Up to 15 pages incl. service & location pages',
      'Conversion-focused copywriting',
      'Advanced SEO, schema markup & speed tuning',
      'Booking, CRM or email integrations',
      'Blog setup + 2 launch articles',
      '60 days of post-launch support',
    ],
    cta: 'Grow with this plan',
    featured: true,
    badge: 'Most popular',
  },
  {
    id: 'custom-site',
    name: 'E-commerce & Custom',
    prefix: 'from',
    price: prices.customSite,
    period: 'one-time',
    description: 'Online stores, web apps and advanced builds with custom features and integrations.',
    features: [
      'Shopify, WooCommerce or custom build',
      'Product setup, payments & shipping',
      'Custom features & third-party integrations',
      'AI chat assistant & automations ready',
      'E-commerce SEO & conversion tracking',
      'Dedicated project manager',
    ],
    cta: 'Plan my project',
  },
];

export const monthlyPlans: Plan[] = [
  {
    id: 'care',
    name: 'Website Care',
    prefix: 'from',
    price: prices.care,
    period: '/mo',
    description: 'Hands-off hosting, security and updates so your website always just works.',
    features: [
      'Fast managed hosting & SSL',
      'Daily backups & uptime monitoring',
      'Security & software updates',
      'Small content edits every month',
      'Priority email support',
    ],
    cta: 'Protect my site',
  },
  {
    id: 'seo-plan',
    name: 'SEO Essentials',
    prefix: 'from',
    price: prices.seo,
    period: '/mo',
    description: 'Steady, compounding growth in Google, Maps and AI search for local businesses.',
    features: [
      'Local SEO & Google Business Profile management',
      'Technical SEO monitoring & fixes',
      '2 SEO blog posts or landing pages / mo',
      'Citation & review strategy',
      'Monthly report in plain English',
    ],
    cta: 'Start ranking',
  },
  {
    id: 'growth-plan',
    name: 'Growth Engine',
    prefix: 'from',
    price: prices.growth,
    period: '/mo',
    description: 'Your full-service digital marketing team: SEO, ads, social and email working together.',
    features: [
      'Everything in SEO Essentials',
      'Google or Meta ads management*',
      'Social media content & scheduling',
      'Monthly email campaign',
      'Landing page & conversion optimization',
      'Monthly strategy call',
    ],
    cta: 'Build my growth engine',
    featured: true,
    badge: 'Best value',
  },
];

export const pricingFootnote = '*Ad spend is paid directly to Google or Meta from your own account and is not included in plan prices.';
