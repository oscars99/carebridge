/**
 * Global site settings for digitalaiforce.com.
 *
 * Edit this file to change business details everywhere on the site at once
 * (header, footer, contact page, structured data and the contact form).
 * Empty strings hide the related UI, so nothing broken ever shows.
 */
export interface SiteConfig {
  name: string;
  legalName: string;
  /** Company that owns/operates the brand. Empty hides it. */
  parentCompany: string;
  url: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  responseTime: string;
  socials: { label: 'LinkedIn' | 'Instagram' | 'Facebook' | 'YouTube' | 'X'; href: string }[];
  form: {
    endpoint: string;
    supabase: { url: string; anonKey: string; table: string };
  };
  ogImage: string;
  themeColor: string;
  locale: string;
}

export const site: SiteConfig = {
  name: 'Digital AI Force',
  legalName: 'Digital AI Force',
  parentCompany: 'Tap Mobile AI LLC',
  url: 'https://digitalaiforce.com',
  tagline: 'AI-powered digital growth for small businesses',
  description:
    'Digital AI Force builds fast websites, mobile apps, SEO and marketing campaigns that bring small businesses more customers. AI-powered, human-led.',

  /** Main inbox. Used for mailto links and as the form fallback. */
  email: 'hello@digitalaiforce.com',
  /** Optional, e.g. '+1 (555) 010-2030'. Leave empty to hide. */
  phone: '',
  /** Optional city/region you serve from, e.g. 'Miami, FL'. Shown in the footer and schema. */
  location: '',
  /** How quickly you promise to reply to new inquiries (shown on the contact page). */
  responseTime: 'within 1 business day',

  /** Social profiles, e.g. { label: 'LinkedIn', href: 'https://www.linkedin.com/company/…' }. */
  socials: [],

  /**
   * Contact form delivery. Pick ONE:
   *  - endpoint: any service that accepts a JSON POST (Formspree, Web3Forms, Getform, a serverless function…)
   *  - supabase: inserts into a table via the Supabase REST API (see supabase/leads.sql)
   * If neither is configured, the form opens the visitor's email app with the message pre-filled.
   */
  form: {
    endpoint: '',
    supabase: {
      url: '',
      anonKey: '',
      table: 'leads',
    },
  },

  /** Default social share image (public/og-image.png, 1200×630). */
  ogImage: '/og-image.png',
  themeColor: '#070a1f',
  locale: 'en_US',
};
