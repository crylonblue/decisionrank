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

/**
 * Generate JSON-LD for a Product with AggregateRating.
 * Maps DecisionRank's 0-100 score to a 1-5 star scale for schema.org compatibility.
 */
export interface ProductJsonLdInput {
  name: string;
  url?: string;          // product external link
  image?: string;        // first asset URL
  description?: string;  // assembled from pros
  score: number;         // 0-100
  rankPosition: number;
  categoryName: string;
  rankingQuestion: string;
  /** Total number of sentiments (pros + cons + comments) used as reviewCount */
  reviewCount: number;
  specifications?: Array<{ name: string; value: string; unit?: string | null }>;
}

export function generateProductJsonLd(
  product: ProductJsonLdInput,
  pageUrl: string,
): object {
  // Map 0-100 score to 1-5 scale (linear: 0→1, 100→5)
  const ratingValue = Math.round(((product.score / 100) * 4 + 1) * 10) / 10;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    category: product.categoryName,
    ...(product.image ? { image: product.image } : {}),
    ...(product.url ? { url: product.url } : {}),
    ...(product.description ? { description: product.description } : {}),
    review: {
      '@type': 'Review',
      author: {
        '@type': 'Organization',
        name: 'DecisionRank',
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue,
        bestRating: 5,
        worstRating: 1,
      },
      name: product.rankingQuestion,
      url: pageUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
      reviewCount: Math.max(product.reviewCount, 1),
    },
  };

  // Add key specifications as additionalProperty
  if (product.specifications && product.specifications.length > 0) {
    jsonLd.additionalProperty = product.specifications.slice(0, 8).map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.name,
      value: `${spec.value}${spec.unit ? ` ${spec.unit}` : ''}`,
    }));
  }

  return jsonLd;
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
