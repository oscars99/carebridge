/** Content blocks shared by the home page (and reused on About/Pricing). */
import { prices } from './pricing';

export const processSteps = [
  {
    title: 'Discover',
    text: 'A free strategy call and quick audit. We learn your goals, customers and competitors — and spot the fastest wins.',
    icon: 'compass',
  },
  {
    title: 'Plan & design',
    text: 'You get a clear roadmap, a fixed written quote and designs to approve before anything gets built.',
    icon: 'pencil-ruler',
  },
  {
    title: 'Build & launch',
    text: 'We develop, test and launch — fast, secure, mobile-first and SEO-ready from day one.',
    icon: 'rocket',
  },
  {
    title: 'Grow',
    text: 'SEO, ads, content and AI automations keep the leads coming, with plain-English reports every month.',
    icon: 'trending-up',
  },
];

/** Service commitments shown as animated counters. Keep these promises true. */
export const promises = [
  { value: 90, suffix: '+', label: 'Google PageSpeed score we build every site to hit' },
  { value: 24, suffix: 'h', label: 'Maximum reply time on business days' },
  { value: 100, suffix: '%', label: 'Ownership of your site, content & ad accounts' },
  { value: 30, suffix: ' days', label: 'Of post-launch support included with every website' },
];

export const industries = [
  { name: 'Restaurants & cafés', icon: 'utensils' },
  { name: 'Home services & trades', icon: 'wrench' },
  { name: 'Health & wellness', icon: 'stethoscope' },
  { name: 'Beauty & salons', icon: 'scissors' },
  { name: 'Retail & e-commerce', icon: 'store' },
  { name: 'Real estate', icon: 'house' },
  { name: 'Legal & professional', icon: 'scale' },
  { name: 'Fitness & studios', icon: 'dumbbell' },
  { name: 'Automotive', icon: 'car' },
  { name: 'Startups & SaaS', icon: 'rocket' },
  { name: 'Nonprofits', icon: 'heart-handshake' },
  { name: 'Coaches & education', icon: 'graduation-cap' },
];

export const aiAdvantages = [
  {
    icon: 'message-circle',
    title: '24/7 lead capture',
    text: 'AI chat assistants answer questions and book appointments while you sleep.',
  },
  {
    icon: 'zap',
    title: 'Faster launches',
    text: 'AI-assisted research, drafts and QA mean projects move in weeks, not months.',
  },
  {
    icon: 'repeat',
    title: 'Smarter campaigns',
    text: 'We test more ad and content variations and double down on what converts.',
  },
  {
    icon: 'shield-check',
    title: 'Human-reviewed, always',
    text: 'Nothing goes live without expert review. Your brand voice and data stay protected.',
  },
];

export const homeFaqs = [
  {
    q: 'What services does Digital AI Force offer?',
    a: 'We’re a full-service digital agency for small businesses: website design and development, SEO and local SEO, digital marketing (social media, email and content), Google and Meta ads, mobile app development, e-commerce stores, branding and UI/UX design, and AI automation and chatbots.',
  },
  {
    q: 'How much does a small business website cost?',
    a: `Our websites start at ${prices.starterSite} for a professional starter site, and lead-generating business websites start at ${prices.growthSite}. Every project gets a fixed written quote after a free strategy call, so you know the full cost before we begin.`,
  },
  {
    q: 'How long does it take to launch a new website?',
    a: 'Most small business websites launch in 2–4 weeks once we have your content. Larger websites, online stores and custom features usually take 4–8 weeks, and mobile apps are planned in phases.',
  },
  {
    q: 'Do you lock clients into long-term contracts?',
    a: 'No. Website projects are fixed-price, and our monthly plans are month-to-month. We’d rather earn your business every month than trap you in a contract.',
  },
  {
    q: 'How do you use AI — and is my data safe?',
    a: 'We use AI to work faster — research, first drafts, testing and automation — while experienced people handle strategy, design and final review. We use business-grade tools and never share sensitive customer data without your permission.',
  },
  {
    q: 'Will I own my website, content and accounts?',
    a: 'Yes. Your domain, website, content, ad accounts and analytics belong to your business. If you ever move on, you take everything with you.',
  },
  {
    q: 'Can you help if I already have a website?',
    a: 'Absolutely. We can improve your current site’s speed, SEO and conversions, or plan a redesign that keeps your existing search rankings intact.',
  },
  {
    q: 'How do I get started?',
    a: 'Send us a message or book a free strategy call. We’ll learn about your business, share a few quick wins and follow up with a clear plan and quote — no pressure and no obligation.',
  },
];

export const marqueeServices = [
  'Web Design',
  'SEO',
  'Google Ads',
  'Social Media',
  'Mobile Apps',
  'AI Chatbots',
  'E-commerce',
  'Email Marketing',
  'Branding',
  'UI/UX Design',
  'Local SEO',
  'Automation',
];
