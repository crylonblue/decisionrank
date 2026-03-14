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
