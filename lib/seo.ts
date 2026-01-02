/**
 * SEO utility functions for generating metadata and structured data
 */

export function getBaseUrl(): string {
  // Priority 1: Explicitly set site URL (set in Vercel environment variables)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Priority 2: Production domain (hardcoded for reliability)
  // Check if we're in production (not a preview deployment)
  const isProduction = process.env.VERCEL_ENV === 'production';
  if (isProduction) {
    return 'https://decisionrank.com';
  }
  
  // Priority 3: Preview/staging deployments on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Priority 4: Local development
  return 'http://localhost:3000';
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

