/**
 * Service catalog. Each entry powers a card on the home/services pages,
 * the header mega-menu, and a full keyword-targeted page at /services/<slug>/.
 */
import { prices } from './pricing';

export interface ServiceFeature {
  icon: string;
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  icon: string;
  tagline: string;
  summary: string;
  highlights: string[];
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; accent: string; intro: string; bullets: string[] };
  overview: { heading: string; paragraphs: string[] };
  features: ServiceFeature[];
  deliverables: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  pricingNote: string;
}

export const services: Service[] = [
  {
    slug: 'web-design-development',
    name: 'Web Design & Development',
    navLabel: 'Web Design & Development',
    icon: 'monitor-smartphone',
    tagline: 'Fast, mobile-first websites built to convert',
    summary:
      'Custom websites that load in a blink, look great on every screen and turn visitors into calls, bookings and sales.',
    highlights: ['Custom design', 'Mobile-first', 'SEO-ready'],
    seo: {
      title: 'Small Business Web Design & Development | Digital AI Force',
      description:
        'Custom, mobile-first websites that load fast, rank on Google and turn visitors into leads. Web design & development for small businesses. Get a free quote.',
    },
    hero: {
      eyebrow: 'Web design & development',
      title: 'Small business web design that',
      accent: 'turns visitors into customers',
      intro:
        'Your website is your hardest-working employee — open 24/7 and first in line when someone searches for what you do. We design and build custom, lightning-fast websites that make a great first impression and make it effortless to call, book or buy.',
      bullets: [
        'Custom design — no cookie-cutter templates',
        'Built for speed, mobile and SEO from day one',
        'Most small business sites launch in 2–4 weeks',
      ],
    },
    overview: {
      heading: 'A website built around your customers, not a template',
      paragraphs: [
        'Most small business websites struggle for the same reasons: they load slowly, look dated on phones, bury the phone number and never show up on Google. We fix all of that with a clear structure, persuasive copy and a fast, modern build.',
        'Every project starts with your goals — more calls, more bookings, more online sales — and we design each page to move visitors toward that action. Then we build it with clean, accessible code, connect your analytics and make sure you can update it yourself.',
      ],
    },
    features: [
      {
        icon: 'layout-template',
        title: 'Custom, on-brand design',
        text: 'A unique look that reflects your brand and builds instant trust — designed for your audience, not pulled from a theme marketplace.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile-first & responsive',
        text: 'Most visitors arrive on a phone. Every layout is designed for small screens first, then scaled up beautifully for tablet and desktop.',
      },
      {
        icon: 'gauge',
        title: 'Built for speed',
        text: 'Optimized images, lean code and modern hosting so pages load fast and pass Google’s Core Web Vitals.',
      },
      {
        icon: 'search-check',
        title: 'SEO-ready structure',
        text: 'Clean headings, metadata, schema markup, sitemaps and fast performance give you a head start in search results.',
      },
      {
        icon: 'mouse-pointer-click',
        title: 'Conversion-focused',
        text: 'Clear calls to action, click-to-call buttons and booking or quote forms placed exactly where customers expect them.',
      },
      {
        icon: 'shield-check',
        title: 'Secure & easy to manage',
        text: 'SSL, backups and updates handled — plus an easy editor so you can change text and photos without calling a developer.',
      },
    ],
    deliverables: [
      'Discovery session & sitemap',
      'Custom design mockups for your approval',
      'Responsive development (5–15+ pages)',
      'On-page SEO, schema & XML sitemap',
      'Contact, quote or booking forms',
      'Google Analytics 4 & Search Console setup',
      'Speed, accessibility & cross-browser testing',
      'Training video + post-launch support',
    ],
    process: [
      { title: 'Discover', text: 'We learn your business, customers and goals, review competitors and map out the pages you need.' },
      { title: 'Design', text: 'You review mockups of key pages and we refine them until they feel exactly right.' },
      { title: 'Build', text: 'We develop a fast, responsive, SEO-ready site and connect forms, analytics and integrations.' },
      { title: 'Launch & support', text: 'We test everything, go live and stay on hand for tweaks, training and ongoing care.' },
    ],
    faqs: [
      {
        q: 'How long does it take to build a small business website?',
        a: 'Most 5–10 page websites launch in 2–4 weeks once we have your content. Larger sites, online stores and custom features typically take 4–8 weeks. You’ll get a clear timeline in your proposal before we start.',
      },
      {
        q: 'How much does a small business website cost?',
        a: `Our website projects start at ${prices.starterSite} for a professional starter site. The final price depends on the number of pages, features and integrations, and you’ll always get a fixed written quote before any work begins — no surprises.`,
      },
      {
        q: 'Will I be able to update my website myself?',
        a: 'Yes. We set you up with an easy-to-use editor and a short training video so you can change text, photos and blog posts without touching code. Prefer to leave it to us? Our Website Care plan covers updates too.',
      },
      {
        q: 'Can you redesign my existing website without losing my Google rankings?',
        a: 'Yes. We audit your current site first, keep what’s working, and redirect every old URL properly so you keep the search visibility you’ve already earned.',
      },
      {
        q: 'Do you provide hosting and maintenance?',
        a: 'Yes. We can host your site on fast, secure infrastructure with SSL, backups and monitoring, or launch on hosting you already own. Either way, you own your domain, content and code.',
      },
    ],
    related: ['seo', 'branding-ui-ux-design', 'ecommerce-development'],
    pricingNote: `Websites from ${prices.starterSite}`,
  },
  {
    slug: 'seo',
    name: 'SEO Services',
    navLabel: 'SEO & Local SEO',
    icon: 'search-check',
    tagline: 'Rank higher on Google, Maps and AI search',
    summary:
      'Get found by customers who are already searching for you — with local SEO, technical fixes and content that ranks on Google and in AI answers.',
    highlights: ['Local SEO', 'Technical SEO', 'AI search'],
    seo: {
      title: 'SEO Services for Small Businesses | Digital AI Force',
      description:
        'Rank higher on Google, Google Maps and AI search. Local SEO, technical SEO and content strategy for small businesses — with clear monthly reporting.',
    },
    hero: {
      eyebrow: 'SEO services',
      title: 'SEO services that help small businesses',
      accent: 'get found first',
      intro:
        'When customers search for what you sell, your business should be the one they find. We combine technical SEO, local optimization and genuinely helpful content to grow your visibility on Google, Google Maps and AI-powered search — and we report on it in plain English.',
      bullets: [
        'Local SEO & Google Business Profile optimization',
        'Technical audits and fixes search engines reward',
        'Optimized for Google AI Overviews, ChatGPT & Perplexity',
      ],
    },
    overview: {
      heading: 'Search is where your next customers are looking',
      paragraphs: [
        'People search before they buy — for a plumber nearby, the best tacos in town or a lawyer who handles their exact problem. If your business isn’t on the first page of results or in the map pack, those customers go to a competitor.',
        'Our SEO programs focus on the searches that bring revenue, not vanity rankings. We fix the technical issues holding your site back, strengthen your local presence and publish content that answers real customer questions — the same signals that help you appear in AI-generated answers.',
      ],
    },
    features: [
      {
        icon: 'map-pin',
        title: 'Local SEO & Google Maps',
        text: 'Google Business Profile optimization, local citations, review strategy and location pages that compete for the map pack.',
      },
      {
        icon: 'wrench',
        title: 'Technical SEO',
        text: 'Site speed, crawlability, indexing, schema markup and Core Web Vitals — fixed, then monitored every month.',
      },
      {
        icon: 'target',
        title: 'Keyword strategy',
        text: 'We find the high-intent searches your customers actually use and map each one to the right page.',
      },
      {
        icon: 'file-text',
        title: 'Content that ranks',
        text: 'Service pages, blog posts and FAQs written to answer real questions, build trust and earn links.',
      },
      {
        icon: 'sparkles',
        title: 'AI search optimization',
        text: 'Clear, well-structured content and consistent business information that help AI assistants understand and recommend you.',
      },
      {
        icon: 'chart-column-increasing',
        title: 'Transparent reporting',
        text: 'Monthly reports on rankings, traffic, calls and leads — explained in plain English, with next steps.',
      },
    ],
    deliverables: [
      'Full technical & on-page SEO audit',
      'Keyword research & content plan',
      'Google Business Profile optimization',
      'On-page optimization of key pages',
      'Schema markup (LocalBusiness, Service, FAQ)',
      'Citation & directory cleanup',
      'Monthly SEO content',
      'Monthly report & strategy check-in',
    ],
    process: [
      { title: 'Audit', text: 'We analyze your site, competitors and current rankings to find quick wins and the biggest gaps.' },
      { title: 'Strategy', text: 'A prioritized roadmap of keywords, pages and fixes tied directly to your business goals.' },
      { title: 'Optimize', text: 'We fix technical issues, optimize pages, build local signals and publish new content.' },
      { title: 'Measure & grow', text: 'Monthly reporting on what moved, what’s next and how it’s affecting leads and revenue.' },
    ],
    faqs: [
      {
        q: 'How long does SEO take to work?',
        a: 'You’ll often see early movement within 4–8 weeks from technical fixes and Google Business Profile improvements. Meaningful, compounding growth usually takes 3–6 months, depending on your competition and starting point.',
      },
      {
        q: 'Do you guarantee #1 rankings on Google?',
        a: 'No honest agency can guarantee rankings — Google controls its results. What we do promise is transparent work, proven best practices and reporting that shows exactly what we did and how it’s affecting your traffic and leads.',
      },
      {
        q: 'What is local SEO and does my business need it?',
        a: 'Local SEO helps you appear when people search for services near them, like “dentist near me” or “roof repair in [your city]”. If you serve customers in a specific area, it’s usually one of the highest-return marketing investments you can make.',
      },
      {
        q: 'What is AI search optimization?',
        a: 'More people now get answers from Google AI Overviews, ChatGPT and Perplexity. We structure your content, schema and online presence so these tools understand your business and are more likely to mention it.',
      },
      {
        q: 'Do I need a new website to do SEO?',
        a: 'Not necessarily — we can optimize most existing sites. If your platform is holding you back (very slow, not mobile-friendly or impossible to edit), we’ll tell you honestly and walk you through the options.',
      },
    ],
    related: ['web-design-development', 'digital-marketing', 'ppc-advertising'],
    pricingNote: `SEO plans from ${prices.seo}/mo`,
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    navLabel: 'Digital Marketing',
    icon: 'megaphone',
    tagline: 'Social, email & content that builds demand',
    summary:
      'Consistent, on-brand marketing across social media, email and content — planned, created and measured for you.',
    highlights: ['Social media', 'Email automation', 'Content'],
    seo: {
      title: 'Small Business Digital Marketing Services | Digital AI Force',
      description:
        'Social media marketing, email automation and content that keep your business top of mind and turn followers into customers. Plans for small businesses.',
    },
    hero: {
      eyebrow: 'Digital marketing',
      title: 'Digital marketing that turns',
      accent: 'attention into customers',
      intro:
        'Posting “when you have time” doesn’t grow a business. We build a simple, consistent marketing engine — social media, email campaigns and content — that keeps you top of mind, nurtures leads and brings customers back again and again.',
      bullets: [
        'Social media strategy, content & management',
        'Email marketing & automated customer journeys',
        'A monthly content calendar you approve',
      ],
    },
    overview: {
      heading: 'Show up consistently — without it taking over your week',
      paragraphs: [
        'Small business owners know marketing matters, but between customers, staff and operations it’s usually the first thing to slip. Inconsistent posting, forgotten newsletters and one-off promotions make it hard to build momentum.',
        'We plan your marketing a month ahead, create the content, schedule it across your channels and track what works. AI helps us generate more ideas and variations quickly; our team keeps every post on-brand and on-strategy.',
      ],
    },
    features: [
      {
        icon: 'share-2',
        title: 'Social media marketing',
        text: 'Strategy, content creation, scheduling and community management for Instagram, Facebook, LinkedIn and TikTok.',
      },
      {
        icon: 'mail-check',
        title: 'Email marketing',
        text: 'Newsletters, promotions and automated welcome, follow-up and win-back sequences that drive repeat business.',
      },
      {
        icon: 'pen-tool',
        title: 'Content creation',
        text: 'Blog posts, graphics, short-form video scripts and offers that speak your customers’ language.',
      },
      {
        icon: 'workflow',
        title: 'Marketing automation',
        text: 'Connect your website, CRM and email so leads are captured, tagged and nurtured automatically.',
      },
      {
        icon: 'users',
        title: 'Audience & brand strategy',
        text: 'Clear positioning and messaging so every channel tells the same compelling story.',
      },
      {
        icon: 'chart-column-increasing',
        title: 'Analytics & reporting',
        text: 'We track reach, clicks, leads and sales from each channel — and show you what it means for revenue.',
      },
    ],
    deliverables: [
      'Marketing audit & 90-day plan',
      'Monthly content calendar',
      'Custom social graphics & captions',
      'Email newsletters & campaigns',
      'Automated email sequences',
      'CRM & email list setup',
      'Conversion & UTM tracking',
      'Monthly performance report',
    ],
    process: [
      { title: 'Audit & plan', text: 'We review your channels, audience and competitors, then build a focused 90-day plan.' },
      { title: 'Create', text: 'Our team produces posts, emails and content in your brand voice for your approval.' },
      { title: 'Publish & automate', text: 'We schedule, publish and set up automations so marketing runs in the background.' },
      { title: 'Optimize', text: 'Monthly reviews show what’s working — we double down on winners and cut what isn’t.' },
    ],
    faqs: [
      {
        q: 'Which social media platforms should my business be on?',
        a: 'The ones your customers actually use. For most local businesses that’s Google, Facebook and Instagram; for B2B companies it’s often LinkedIn. We’ll recommend a focused mix instead of spreading you thin.',
      },
      {
        q: 'Do I have to approve every post?',
        a: 'You approve the monthly content calendar before anything goes live. Some clients like to review every post; others prefer a quick monthly sign-off. We’ll work the way that suits you.',
      },
      {
        q: 'Is email marketing still worth it for small businesses?',
        a: 'Yes. Your email list is an audience you own, with no algorithm in the way. Well-timed automated emails — welcome, reminder, review request and win-back — are one of the most cost-effective ways to generate repeat sales.',
      },
      {
        q: 'How do you measure marketing results?',
        a: 'We track metrics that tie to revenue: website visits from social and email, form fills, calls, bookings and sales — not just likes. You get a clear monthly report with recommendations.',
      },
    ],
    related: ['seo', 'ppc-advertising', 'ai-automation'],
    pricingNote: `Growth plans from ${prices.growth}/mo`,
  },
  {
    slug: 'ppc-advertising',
    name: 'Google Ads & Paid Social',
    navLabel: 'Google & Meta Ads',
    icon: 'mouse-pointer-click',
    tagline: 'Paid campaigns built for leads and ROI',
    summary:
      'Google Ads plus Facebook & Instagram campaigns with tight targeting, high-converting landing pages and transparent reporting.',
    highlights: ['Google Ads', 'Meta Ads', 'Landing pages'],
    seo: {
      title: 'Google Ads & Facebook Ads Management | Digital AI Force',
      description:
        'PPC management for small businesses: Google Ads, Local Services Ads and Meta (Facebook & Instagram) campaigns built for leads and ROI — not wasted clicks.',
    },
    hero: {
      eyebrow: 'Google & Meta ads management',
      title: 'Paid ads that bring in customers,',
      accent: 'not just clicks',
      intro:
        'Paid ads can put your business in front of ready-to-buy customers today — or quietly burn through your budget. We build tightly targeted Google, Facebook and Instagram campaigns, pair them with landing pages designed to convert and optimize every week for cost per lead and return on ad spend.',
      bullets: [
        'Google Search, Maps, Local Services & YouTube ads',
        'Facebook & Instagram ads that stop the scroll',
        'You own your ad accounts and data — always',
      ],
    },
    overview: {
      heading: 'Stop paying for clicks that never call',
      paragraphs: [
        'The most common problem we see is ad spend leaking to the wrong searches, the wrong audiences or landing pages that don’t convert. A few changes to targeting, tracking and messaging can dramatically change what each lead costs.',
        'We start with accurate conversion tracking so every decision is based on real leads and sales. Then we use AI-assisted testing to try more headlines, creatives and audiences — and shift budget to what’s proven to work.',
      ],
    },
    features: [
      {
        icon: 'search',
        title: 'Google Search & Maps ads',
        text: 'Show up the moment people search for your services, with keyword targeting that filters out wasted clicks.',
      },
      {
        icon: 'users',
        title: 'Facebook & Instagram ads',
        text: 'Scroll-stopping creative and precise audience targeting to build demand and retarget warm visitors.',
      },
      {
        icon: 'layout-template',
        title: 'High-converting landing pages',
        text: 'Focused pages for each campaign with clear offers and fast load times that lift conversion rates.',
      },
      {
        icon: 'target',
        title: 'Conversion tracking',
        text: 'GA4, Google Tag Manager, call tracking and the Meta pixel set up so you know exactly which ads create leads.',
      },
      {
        icon: 'repeat',
        title: 'Continuous A/B testing',
        text: 'We test ad copy, creative and landing pages every month and scale what wins.',
      },
      {
        icon: 'badge-dollar-sign',
        title: 'Budget optimization',
        text: 'Bids, schedules and budgets tuned weekly to lower your cost per lead and grow your return.',
      },
    ],
    deliverables: [
      'Account audit or new account setup',
      'Competitor & keyword research',
      'Campaign structure & ad copy',
      'Ad creative (static & short video)',
      'Landing page design & build',
      'Conversion & call tracking setup',
      'Weekly optimization',
      'Monthly report with cost per lead & ROI',
    ],
    process: [
      { title: 'Audit & research', text: 'We review past performance, competitors and search demand to find the best opportunities.' },
      { title: 'Build', text: 'Campaigns, ads, audiences, landing pages and tracking — set up properly from day one.' },
      { title: 'Launch & learn', text: 'We launch with controlled budgets and watch closely as real data comes in.' },
      { title: 'Optimize & scale', text: 'Weekly optimizations and monthly tests lower costs, then we scale what’s profitable.' },
    ],
    faqs: [
      {
        q: 'How much should a small business spend on Google Ads?',
        a: 'It depends on your industry, location and goals. We’ll recommend a starting budget based on the real cost per click in your market and how many leads you need, then adjust once we see actual results.',
      },
      {
        q: 'Is your management fee separate from ad spend?',
        a: 'Yes. Your ad spend is paid directly to Google or Meta from your own account, so you always see exactly where the money goes. Our management fee is a separate, flat monthly fee.',
      },
      {
        q: 'Who owns the ad accounts?',
        a: 'You do. We set up campaigns in accounts owned by your business and work as managers. If we ever part ways, your campaigns, data and history stay with you.',
      },
      {
        q: 'How quickly will I see results from paid ads?',
        a: 'Ads can start generating leads within days of launch. The first 30–60 days are a learning period where we gather data and optimize; performance typically improves steadily after that.',
      },
    ],
    related: ['digital-marketing', 'seo', 'web-design-development'],
    pricingNote: `Growth plans from ${prices.growth}/mo`,
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    navLabel: 'Mobile App Development',
    icon: 'smartphone',
    tagline: 'iOS & Android apps your customers love',
    summary:
      'Cross-platform iOS and Android apps — from booking and loyalty apps to MVPs for new ideas — designed, built and launched for you.',
    highlights: ['iOS & Android', 'Cross-platform', 'MVPs'],
    seo: {
      title: 'Mobile App Development (iOS & Android) | Digital AI Force',
      description:
        'Custom iOS & Android apps for small businesses and startups — booking, loyalty and ordering apps and MVPs, built cross-platform and launched in the app stores.',
    },
    hero: {
      eyebrow: 'Mobile app development',
      title: 'Mobile app development that puts your business',
      accent: 'in your customers’ pocket',
      intro:
        'An app can turn one-time buyers into loyal regulars with easy booking, ordering, rewards and push notifications. We design and build fast, polished iOS and Android apps from a single codebase, so you get both platforms in less time and for less cost.',
      bullets: [
        'One codebase for iPhone & Android',
        'Lean MVPs for startups and new ideas',
        'App Store & Google Play launch handled for you',
      ],
    },
    overview: {
      heading: 'The right app, built the smart way',
      paragraphs: [
        'Not every business needs an app — and we’ll tell you if a fast mobile website will do the job better. But when customers come back often, an app makes ordering, booking and rewards effortless and gives you a direct line to them through push notifications.',
        'We use modern cross-platform frameworks such as Flutter and React Native to ship native-quality apps on iOS and Android from one codebase. That means a faster launch, lower costs and simpler updates down the road.',
      ],
    },
    features: [
      {
        icon: 'layers',
        title: 'Cross-platform builds',
        text: 'Native-quality iOS and Android apps from a single codebase — faster to build and easier to maintain.',
      },
      {
        icon: 'pencil-ruler',
        title: 'App UI/UX design',
        text: 'Intuitive screens and flows designed and prototyped before development, so you know exactly what you’re getting.',
      },
      {
        icon: 'calendar-check',
        title: 'Booking, ordering & loyalty',
        text: 'Appointments, online ordering, payments and rewards programs — tailored to how your customers buy.',
      },
      {
        icon: 'bell-ring',
        title: 'Push notifications',
        text: 'Bring customers back with timely offers, reminders and updates sent straight to their phones.',
      },
      {
        icon: 'workflow',
        title: 'Integrations & backend',
        text: 'Connect your POS, CRM, payments and website, with secure cloud backends and easy admin dashboards.',
      },
      {
        icon: 'rocket',
        title: 'Launch & maintenance',
        text: 'App Store and Google Play submission, analytics, updates and ongoing support after launch.',
      },
    ],
    deliverables: [
      'Product discovery & feature roadmap',
      'Wireframes & clickable prototype',
      'UI design for iOS & Android',
      'Cross-platform app development',
      'Backend, admin panel & integrations',
      'QA testing on real devices',
      'App Store & Google Play submission',
      'Post-launch support & updates',
    ],
    process: [
      { title: 'Discovery', text: 'We define your users, core features and success metrics — and trim anything not needed for launch.' },
      { title: 'Prototype', text: 'A clickable prototype lets you test the experience before a line of code is written.' },
      { title: 'Develop & test', text: 'We build in short sprints with regular demos, testing on real devices as we go.' },
      { title: 'Launch & iterate', text: 'We handle store submission, monitor usage and keep improving based on real feedback.' },
    ],
    faqs: [
      {
        q: 'Does my small business need a mobile app or a website?',
        a: 'Start with a great mobile-friendly website — every business needs one. An app makes sense when customers interact with you often (ordering, booking, loyalty) or when you need device features like push notifications, offline use or the camera.',
      },
      {
        q: 'How much does it cost to build a mobile app?',
        a: 'App costs depend on features, integrations and design complexity. After a free discovery call we’ll send a detailed, fixed-scope estimate — and suggest a lean MVP if you want to launch faster and validate the idea first.',
      },
      {
        q: 'How long does app development take?',
        a: 'A focused MVP typically takes 8–14 weeks from discovery to launch. Larger apps are delivered in phases so you can launch sooner and add features over time.',
      },
      {
        q: 'Will my app work on both iPhone and Android?',
        a: 'Yes. We build cross-platform apps that run natively on both iOS and Android from a single codebase, so you reach every customer without paying for two separate apps.',
      },
      {
        q: 'Do you help with App Store and Google Play approval?',
        a: 'Yes. We prepare store listings, screenshots and privacy details, and handle submission to the Apple App Store and Google Play — including any reviewer feedback.',
      },
    ],
    related: ['branding-ui-ux-design', 'ai-automation', 'web-design-development'],
    pricingNote: 'Custom quote after a free discovery call',
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation & Chatbots',
    navLabel: 'AI Automation & Chatbots',
    icon: 'bot',
    tagline: 'Chatbots and automations that save hours',
    summary:
      'AI chat assistants that answer customers 24/7, plus automations that handle follow-ups, scheduling and data entry for you.',
    highlights: ['AI chatbots', 'Workflow automation', 'Integrations'],
    seo: {
      title: 'AI Automation & Chatbot Services | Digital AI Force',
      description:
        'Custom AI chatbots that capture leads 24/7 and automations that handle follow-ups, scheduling and data entry. Practical AI for small businesses, set up for you.',
    },
    hero: {
      eyebrow: 'AI automation & chatbots',
      title: 'AI automation that gives small businesses',
      accent: 'their time back',
      intro:
        'You didn’t start a business to copy data between apps or answer the same five questions all day. We set up practical AI tools — website chat assistants, smart follow-ups and connected workflows — that work around the clock, so you and your team can focus on customers.',
      bullets: [
        'AI chat assistants trained on your business',
        'Automated follow-ups, reminders & review requests',
        'Connected to the tools you already use',
      ],
    },
    overview: {
      heading: 'Practical AI, not hype',
      paragraphs: [
        'AI is most valuable for small businesses when it quietly removes busywork: answering common questions instantly, qualifying leads, booking appointments, drafting replies and keeping your CRM up to date.',
        'We start by mapping your day-to-day workflows and spotting the tasks that eat the most time. Then we design, build and test automations with clear guardrails — human hand-off when needed, privacy-conscious data handling and full visibility into what the AI does.',
      ],
    },
    features: [
      {
        icon: 'message-circle',
        title: 'AI website chat assistants',
        text: 'Answer questions, capture leads and book appointments 24/7 using your own services, pricing and policies.',
      },
      {
        icon: 'workflow',
        title: 'Workflow automation',
        text: 'Connect forms, email, CRM, calendars and spreadsheets so information flows between your tools automatically.',
      },
      {
        icon: 'mail-check',
        title: 'Smart follow-ups',
        text: 'Instant lead responses, appointment reminders and review requests — sent at exactly the right moment.',
      },
      {
        icon: 'user-check',
        title: 'Lead qualification & routing',
        text: 'AI sorts and routes inquiries so your team spends its time on the leads most likely to buy.',
      },
      {
        icon: 'wand-sparkles',
        title: 'AI content assistance',
        text: 'Draft emails, social posts, product descriptions and replies faster — always reviewed by a human.',
      },
      {
        icon: 'lock',
        title: 'Secure & privacy-conscious',
        text: 'Clear data boundaries, human hand-off rules and reputable AI providers keep your business and customers protected.',
      },
    ],
    deliverables: [
      'Workflow & automation audit',
      'AI assistant trained on your business info',
      'Website, Messenger or WhatsApp integration',
      'CRM, calendar & email automations',
      'Lead capture & routing rules',
      'Human hand-off & escalation setup',
      'Team training & documentation',
      'Monitoring and monthly improvements',
    ],
    process: [
      { title: 'Map', text: 'We map your workflows and identify the repetitive tasks with the biggest time and revenue impact.' },
      { title: 'Design', text: 'You approve how each automation and assistant behaves, including guardrails and hand-offs.' },
      { title: 'Build & train', text: 'We build, connect your tools and train the AI on your services, FAQs and policies.' },
      { title: 'Launch & improve', text: 'We monitor real conversations and results, refine accuracy and add new automations.' },
    ],
    faqs: [
      {
        q: 'Will an AI chatbot replace my staff?',
        a: 'No — it supports them. A chat assistant handles routine questions and after-hours inquiries instantly, then hands complex or sensitive conversations to your team with the full context.',
      },
      {
        q: 'Is my business and customer data safe?',
        a: 'We design every automation with privacy in mind: we use reputable, business-grade AI providers, limit what data the AI can access, avoid collecting sensitive information through chat and document exactly how your data flows.',
      },
      {
        q: 'What can a small business realistically automate?',
        a: 'Common wins include lead follow-up, appointment booking and reminders, review requests, FAQ responses, quote and invoice reminders, data entry between apps and internal reporting.',
      },
      {
        q: 'Which tools do you integrate with?',
        a: 'We work with popular platforms such as Google Workspace, Microsoft 365, HubSpot, Calendly, Shopify, Stripe and Slack, using native integrations or automation tools like Zapier, Make and n8n.',
      },
      {
        q: 'How much does AI automation cost?',
        a: 'Most small business automation projects are a one-time setup plus a modest monthly fee for hosting, AI usage and improvements. We’ll give you a fixed quote after a free workflow review.',
      },
    ],
    related: ['digital-marketing', 'web-design-development', 'mobile-app-development'],
    pricingNote: 'Custom quote after a free workflow review',
  },
  {
    slug: 'ecommerce-development',
    name: 'E-commerce Development',
    navLabel: 'E-commerce Stores',
    icon: 'shopping-bag',
    tagline: 'Online stores that sell around the clock',
    summary:
      'Shopify and WooCommerce stores designed to convert — with smooth checkout, inventory, shipping and marketing integrations.',
    highlights: ['Shopify', 'WooCommerce', 'Fast checkout'],
    seo: {
      title: 'E-commerce Website Development | Digital AI Force',
      description:
        'Shopify & WooCommerce stores for small businesses — product pages that sell, fast checkout, payments, shipping and e-commerce SEO that turns browsers into buyers.',
    },
    hero: {
      eyebrow: 'E-commerce development',
      title: 'E-commerce websites that turn',
      accent: 'browsers into buyers',
      intro:
        'Whether you’re taking your shop online for the first time or outgrowing your current store, we build fast, beautiful e-commerce websites with product pages that sell, frictionless checkout and the integrations you need to run smoothly.',
      bullets: [
        'Shopify, WooCommerce & custom storefronts',
        'Fast, mobile-friendly checkout',
        'Product SEO, analytics & email marketing built in',
      ],
    },
    overview: {
      heading: 'A store built to sell — not just to look nice',
      paragraphs: [
        'Small details decide online sales: how fast product pages load, how clear your photos and descriptions are, how many steps checkout takes and whether shoppers trust you enough to pay.',
        'We design every step of the buying journey with conversion in mind, connect payments, shipping, taxes and inventory, and set up the tracking and email flows that recover abandoned carts and bring customers back.',
      ],
    },
    features: [
      {
        icon: 'store',
        title: 'Custom storefront design',
        text: 'An on-brand store with collections, filters and product pages designed to showcase what you sell.',
      },
      {
        icon: 'credit-card',
        title: 'Smooth checkout & payments',
        text: 'Fast, mobile-friendly checkout with cards, Apple Pay, Google Pay, PayPal and buy-now-pay-later options.',
      },
      {
        icon: 'package',
        title: 'Inventory & product management',
        text: 'Simple product, variant and stock management — including bulk imports from spreadsheets or your POS.',
      },
      {
        icon: 'truck',
        title: 'Shipping & fulfillment',
        text: 'Shipping rates, local pickup and delivery, label printing and fulfillment app integrations.',
      },
      {
        icon: 'search-check',
        title: 'E-commerce SEO',
        text: 'Optimized product and category pages, product schema and fast performance to win organic sales.',
      },
      {
        icon: 'mail-check',
        title: 'Retention automations',
        text: 'Abandoned cart, post-purchase and win-back emails that increase repeat orders.',
      },
    ],
    deliverables: [
      'Store strategy & platform recommendation',
      'Custom theme design',
      'Product & collection setup',
      'Payments, taxes & shipping configuration',
      'Abandoned cart & order emails',
      'Product schema & e-commerce SEO',
      'Analytics & conversion tracking',
      'Store training + post-launch support',
    ],
    process: [
      { title: 'Plan', text: 'We choose the right platform and map your catalog, customer journey and integrations.' },
      { title: 'Design', text: 'Homepage, collection and product page designs crafted to build trust and drive sales.' },
      { title: 'Build & integrate', text: 'Store development, product setup, payments, shipping and apps — tested end to end.' },
      { title: 'Launch & grow', text: 'Go live with tracking in place, then grow with SEO, ads and email marketing.' },
    ],
    faqs: [
      {
        q: 'Should I use Shopify or WooCommerce?',
        a: 'Shopify is ideal if you want an all-in-one, low-maintenance platform. WooCommerce suits businesses that want full control on WordPress. We’ll recommend the best fit for your products, budget and growth plans.',
      },
      {
        q: 'Can you migrate my existing online store?',
        a: 'Yes. We migrate products, customers and order history where the platforms allow it, and set up redirects to protect your search rankings.',
      },
      {
        q: 'Can I sell in person and online at the same time?',
        a: 'Yes. We can connect your online store with POS systems like Shopify POS or Square so inventory and sales stay in sync across every channel.',
      },
      {
        q: 'Will my store be easy to manage?',
        a: 'Definitely. We train you on adding products, managing orders and running promotions, and provide written guides for your team.',
      },
    ],
    related: ['web-design-development', 'ppc-advertising', 'seo'],
    pricingNote: `Online stores from ${prices.customSite}`,
  },
  {
    slug: 'branding-ui-ux-design',
    name: 'Branding & UI/UX Design',
    navLabel: 'Branding & UI/UX Design',
    icon: 'pen-tool',
    tagline: 'Memorable brands and intuitive experiences',
    summary:
      'Logos, brand identities and user-centered UI/UX design that make your business look established and easy to choose.',
    highlights: ['Logo & identity', 'Brand guidelines', 'UI/UX'],
    seo: {
      title: 'Branding, Logo & UI/UX Design Services | Digital AI Force',
      description:
        'Logo design, brand identity and UI/UX design for small businesses and startups. Look established, stand out from competitors and give customers a great experience.',
    },
    hero: {
      eyebrow: 'Branding & UI/UX design',
      title: 'Branding & UI/UX design that makes you',
      accent: 'the obvious choice',
      intro:
        'People decide whether to trust a business in seconds. We create brand identities and digital experiences that look professional, feel consistent everywhere and make it easy for customers to choose you.',
      bullets: [
        'Logo, colors, typography & brand guidelines',
        'User-centered UI/UX for websites and apps',
        'Wireframes and clickable prototypes',
      ],
    },
    overview: {
      heading: 'Look as good as the work you do',
      paragraphs: [
        'Many great small businesses look smaller than they are online. A dated logo, inconsistent colors and a confusing website quietly cost them customers every day.',
        'We build a clear, flexible brand system and apply it to user-friendly interfaces grounded in how real people browse, compare and buy. The result is a business that looks credible and feels effortless to deal with.',
      ],
    },
    features: [
      {
        icon: 'gem',
        title: 'Logo & visual identity',
        text: 'A distinctive logo, color palette and typography that work everywhere — from your storefront to your app icon.',
      },
      {
        icon: 'book-open',
        title: 'Brand guidelines',
        text: 'A practical style guide so your team and partners keep everything consistent.',
      },
      {
        icon: 'message-square',
        title: 'Messaging & voice',
        text: 'Taglines, value propositions and a tone of voice that make your offer easy to understand.',
      },
      {
        icon: 'pencil-ruler',
        title: 'UI design',
        text: 'Polished, accessible interfaces for websites, apps and dashboards.',
      },
      {
        icon: 'eye',
        title: 'UX research & testing',
        text: 'User flows, usability reviews and testing that remove friction and improve conversions.',
      },
      {
        icon: 'component',
        title: 'Design systems & prototypes',
        text: 'Clickable prototypes and reusable component libraries that speed up development.',
      },
    ],
    deliverables: [
      'Brand discovery workshop',
      'Logo concepts & refinements',
      'Color palette & typography system',
      'Brand guidelines (PDF)',
      'Social media & stationery templates',
      'User flows & wireframes',
      'High-fidelity UI design',
      'Clickable prototype & developer handoff',
    ],
    process: [
      { title: 'Discover', text: 'We dig into your story, audience, competitors and what makes you different.' },
      { title: 'Explore', text: 'Mood boards and concepts explore different directions before we commit.' },
      { title: 'Design', text: 'We refine the chosen direction into a complete identity or interface.' },
      { title: 'Deliver', text: 'You receive every file, guideline and template — ready to use everywhere.' },
    ],
    faqs: [
      {
        q: 'Do I need a full brand identity or just a logo?',
        a: 'A logo is a good start, but a simple identity — colors, fonts and usage rules — is what makes you look consistent and professional everywhere. We offer both, so you can start small and grow.',
      },
      {
        q: 'What files will I receive?',
        a: 'Your logo in all standard formats (SVG, PNG and PDF) in full-color, black and white versions, plus brand guidelines and any templates in your package. You own all final files.',
      },
      {
        q: 'What’s the difference between UI and UX design?',
        a: 'UX (user experience) design is about how something works — the flow, structure and ease of use. UI (user interface) design is how it looks — layout, color, typography and visual detail. Great products need both.',
      },
      {
        q: 'Can you refresh my existing brand instead of starting over?',
        a: 'Yes. A brand refresh modernizes your look while keeping the recognition you’ve built — often the best option for established businesses.',
      },
    ],
    related: ['web-design-development', 'mobile-app-development', 'digital-marketing'],
    pricingNote: 'Custom quote — packages for every stage',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceUrl = (slug: string) => `/services/${slug}/`;
