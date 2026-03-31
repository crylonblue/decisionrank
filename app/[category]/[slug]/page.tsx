import { getRankingBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RankingTable } from '@/components/ranking-table';
import { LazyProductList } from '@/components/lazy-product-list';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { FAQSection } from '@/components/faq-section';
import { RelatedRankings } from '@/components/related-rankings';
import { TopPicks } from '@/components/top-picks';
import type { RankingProductWithDetails, FAQ } from '@/lib/types';
import type { Metadata } from 'next';
import { getBaseUrl, generateBreadcrumbJsonLd, generateFAQJsonLd, generateProductJsonLd, generateArticleJsonLd } from '@/lib/seo';
import { Calendar, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const dynamic = 'force-dynamic';

interface RankingDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: RankingDetailPageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  
  let ranking;
  try {
    ranking = await getRankingBySlug(slug, categorySlug);
  } catch (error) {
    return {
      title: 'Ranking Not Found | DecisionRank',
    };
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/${categorySlug}/${slug}`;

  return {
    title: `${ranking.question} | DecisionRank`,
    description: ranking.description || `Compare products and find the best ${ranking.question.toLowerCase()}`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ranking.question,
      description: ranking.description || undefined,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ranking.question,
      description: ranking.description || undefined,
    },
  };
}

export default async function RankingDetailPage({ params }: RankingDetailPageProps) {
  const { category: categorySlug, slug } = await params;
  
  let ranking;
  try {
    ranking = await getRankingBySlug(slug, categorySlug);
  } catch (error) {
    notFound();
  }

  const { ranking_products, category, faqs, relatedRankings } = ranking;

  // Collect all unique specification names across all products
  const allSpecNames = new Set<string>();
  ranking_products.forEach((rp: RankingProductWithDetails) => {
    rp.specifications.forEach((spec) => {
      allSpecNames.add(spec.name);
    });
  });
  const specNames = Array.from(allSpecNames).sort();

  const baseUrl = getBaseUrl();
  
  // Generate breadcrumb JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: category.name, url: `${baseUrl}/${category.slug}` },
    { name: ranking.question, url: `${baseUrl}/${categorySlug}/${slug}` },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  // Generate FAQ JSON-LD if FAQs exist
  const faqJsonLd = faqs && faqs.length > 0 
    ? generateFAQJsonLd(faqs.map((faq: FAQ) => ({ question: faq.question, answer: faq.answer })))
    : null;

  // Generate Product JSON-LD for each ranked product (rich snippets with star ratings)
  const pageUrl = `${baseUrl}/${categorySlug}/${slug}`;
  const productJsonLds = ranking_products.map((rp: RankingProductWithDetails) => {
    // Assemble description from top pros
    const pros = rp.sentiments
      .filter((s) => s.type === 'pro')
      .slice(0, 3)
      .map((s) => s.headline || s.content);
    const description = pros.length > 0
      ? `Key strengths: ${pros.join('; ')}`
      : undefined;

    return generateProductJsonLd(
      {
        name: rp.product.name,
        url: rp.product.link || undefined,
        image: rp.product.assets?.[0]?.url,
        description,
        score: rp.score,
        rankPosition: rp.rank_position,
        categoryName: category.name,
        rankingQuestion: ranking.question,
        reviewCount: rp.sentiments.length,
        specifications: rp.specifications.map((s) => ({
          name: s.name,
          value: s.value,
          unit: s.unit,
        })),
      },
      pageUrl,
    );
  });

  // Article JSON-LD — E-E-A-T signals with datePublished / dateModified
  const articleJsonLd = generateArticleJsonLd({
    headline: ranking.question,
    description: ranking.description || undefined,
    url: pageUrl,
    datePublished: ranking.created_at,
    dateModified: ranking.updated_at,
    categoryName: category.name,
  });

  // Format dates for display
  const publishedDate = new Date(ranking.created_at);
  const updatedDate = new Date(ranking.updated_at);
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedPublished = dateFormatter.format(publishedDate);
  const formattedUpdated = dateFormatter.format(updatedDate);
  const showUpdatedDate = updatedDate.getTime() - publishedDate.getTime() > 86400000; // >1 day apart

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* FAQ JSON-LD */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {/* Article JSON-LD — E-E-A-T signals (datePublished, dateModified, author, publisher) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Product JSON-LD — one per ranked product for rich snippets */}
      {productJsonLds.map((jsonLd: object, i: number) => (
        <script
          key={`product-jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
      <Suspense fallback={
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
                DecisionRank
              </div>
            </div>
          </div>
        </nav>
      }>
        <Navigation />
      </Suspense>
      <main className="flex-1">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <Breadcrumbs
          items={[
            { label: category.name, href: `/${category.slug}` },
            { label: ranking.question },
          ]}
        />

        {/* Question */}
        <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
          {ranking.question}
        </h1>

        {/* Description */}
        {ranking.description && (
          <p className="text-lg text-muted-foreground mb-4">
            {ranking.description}
          </p>
        )}

        {/* Publication / last-updated dates — E-E-A-T freshness signal */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={ranking.created_at}>Published {formattedPublished}</time>
          </span>
          {showUpdatedDate && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <time dateTime={ranking.updated_at}>Updated {formattedUpdated}</time>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            {ranking_products.length} {ranking_products.length === 1 ? 'product' : 'products'} ranked
          </span>
        </div>

        {/* Verdict Summary */}
        {ranking.verdict_summary && (
          <Card className="mb-8 border-slate-200/50 bg-slate-50/30">
            <CardHeader>
              <CardTitle className="text-slate-700">Verdict</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {ranking.verdict_summary}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Methodology callout — E-E-A-T internal link */}
        <p className="text-sm text-muted-foreground mb-8">
          Scores are based on our{' '}
          <Link href="/how-we-rank" className="text-slate-600 underline hover:text-slate-800">
            research-backed methodology
          </Link>
          .
        </p>

        {/* Top Picks — quick summary for scanners & featured snippets */}
        <TopPicks rankingProducts={ranking_products} />

        {/* Ranking Table */}
        <RankingTable
          rankingProducts={ranking_products}
          specNames={specNames}
        />

        {/* Product Sections - Lazy Loaded */}
        <LazyProductList 
          rankingProducts={ranking_products}
          initialCount={3}
          loadMoreCount={3}
        />

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && <FAQSection faqs={faqs} />}

        {/* Related Rankings Section */}
        <RelatedRankings rankings={relatedRankings} category={category} />
      </div>
      </main>
      <Footer />
    </div>
  );
}

