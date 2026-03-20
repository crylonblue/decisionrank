/**
 * SEO utility functions for generating metadata and structured data
 */

const CANONICAL_BASE_URL = 'https://www.decisionrank.com';

export function getBaseUrl(): string {
  // Keep localhost in development so local previews/open graph URLs stay debuggable.
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Always use the production canonical host for SEO-critical URLs
  // (canonical tags, sitemap, robots, JSON-LD).
  return CANONICAL_BASE_URL;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate JSON-LD for breadcrumbs
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD for FAQPage
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQJsonLd(faqs: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD for WebSite (enables Google Sitelinks Search Box)
 */
export function generateWebSiteJsonLd(): object {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DecisionRank',
    url: baseUrl,
    description:
      'Editorial product rankings and comparisons — unbiased, research-backed verdicts to help you choose the right tools.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD for Organization
 */
export function generateOrganizationJsonLd(): object {
  const baseUrl = getBaseUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DecisionRank',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
  };
}

/**
 * Generate JSON-LD for ItemList (category listing pages)
 */
export interface ItemListEntry {
  name: string;
  url: string;
  position: number;
  description?: string;
}

export function generateItemListJsonLd(
  listName: string,
  items: ItemListEntry[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}
