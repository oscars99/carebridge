/**
 * schema.org JSON-LD builders. Every page outputs one @graph containing the
 * Organization + WebSite nodes plus page-specific nodes (WebPage, Service,
 * FAQPage, BreadcrumbList, BlogPosting…), linked together by @id.
 */
import { site } from '../config/site';
import { services, serviceUrl } from '../data/services';

type Node = Record<string, unknown>;

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

const ORG_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

export function organizationNode(): Node {
  const node: Node = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl('/'),
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/icon-512.png'),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(site.ogImage),
    description: site.description,
    email: site.email,
    slogan: site.tagline,
    knowsAbout: [
      'Web design',
      'Web development',
      'Search engine optimization',
      'Local SEO',
      'Digital marketing',
      'Pay-per-click advertising',
      'Mobile app development',
      'E-commerce development',
      'Branding',
      'UI/UX design',
      'AI automation',
      'AI chatbots',
    ],
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@id': absoluteUrl(`${serviceUrl(s.slug)}#service`) },
    })),
  };
  if (site.phone) node.telephone = site.phone;
  if (site.location) node.areaServed = site.location;
  if (site.socials.length) node.sameAs = site.socials.map((s) => s.href);
  return node;
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: site.name,
    description: site.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
}

export function webPageNode(opts: { path: string; title: string; description: string; type?: string; image?: string }): Node {
  const url = absoluteUrl(opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(opts.image ?? site.ogImage) },
    breadcrumb: opts.path === '/' ? undefined : { '@id': `${url}#breadcrumb` },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqNode(path: string, faqs: { q: string; a: string }[]): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceNode(slug: string): Node {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service ${slug}`);
  const url = absoluteUrl(serviceUrl(s.slug));
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.seo.description,
    url,
    provider: { '@id': ORG_ID },
    audience: { '@type': 'BusinessAudience', name: 'Small and medium-sized businesses' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.name} — what’s included`,
      itemListElement: s.features.map((f) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: f.title, description: f.text },
      })),
    },
  };
}

export function articleNode(opts: {
  path: string;
  title: string;
  description: string;
  published: Date;
  updated?: Date;
  image?: string;
}): Node {
  const url = absoluteUrl(opts.path);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(opts.image ?? site.ogImage),
    inLanguage: 'en-US',
  };
}

/** Removes undefined values so the JSON stays clean. */
export function graph(nodes: Node[]) {
  return JSON.parse(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': nodes,
    }),
  );
}
