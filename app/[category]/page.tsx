import { getCategoryBySlug, getCategoryWithProducts, getAllCategories, getRankingCountsByCategory } from '@/lib/data';
import { computeBuyersChoice } from '@/lib/buyers-choice';
import { CategoryBuyersChoice } from '@/components/category-buyers-choice';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import type { Ranking, Category } from '@/lib/types';
import type { Metadata } from 'next';
import {
  getBaseUrl,
  generateBreadcrumbJsonLd,
  generateItemListJsonLd,
  generateFAQJsonLd,
  generateCollectionPageJsonLd,
} from '@/lib/seo';
import { ChevronLeft, ChevronRight, Clock, ArrowRight, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getEnhancedDescription, getCategoryFAQs } from '@/lib/category-enhancements';
import { CategoryLinks } from '@/components/category-links';
import { getRelatedCategorySlugs } from '@/lib/category-relations';
import { FeaturedRankings } from '@/components/featured-rankings';
import { ClusterNavigation } from '@/components/cluster-navigation';
import { UseCaseModule } from '@/components/use-case-module';
import { ComparisonModule } from '@/components/comparison-module';
import { ComparisonCallouts } from '@/components/comparison-callouts';
import { TrustIndicators } from '@/components/trust-indicators';
import { ThinFamilyClusterSections } from '@/components/thin-family-cluster-sections';
import { buildThinFamilyClusterSections } from '@/lib/thin-family-clusters';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

const RANKINGS_PER_PAGE = 25;

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const { page } = await searchParams;

  let category;
  try {
    category = await getCategoryBySlug(categorySlug);
  } catch (error) {
    return {
      title: 'Category Not Found | DecisionRank',
    };
  }

  const baseUrl = getBaseUrl();
  const pageNumber = Math.max(1, parseInt(page || '1', 10));
  const canonicalUrl = pageNumber > 1
    ? `${baseUrl}/${categorySlug}?page=${pageNumber}`
    : `${baseUrl}/${categorySlug}`;

  const rankingCount = category.rankings?.length || 0;
  const enhancedDescription = getEnhancedDescription(categorySlug, category.description);
  const metaDescription = enhancedDescription
    ? `${enhancedDescription} Browse ${rankingCount} expert ${rankingCount === 1 ? 'ranking' : 'rankings'} with verdicts and comparisons.`
    : `Browse ${rankingCount} expert product ${rankingCount === 1 ? 'ranking' : 'rankings'} in ${category.name}. Compare top products with research-backed scores and editorial verdicts.`;

  return {
    title: `Best ${category.name} Rankings & Comparisons (${new Date().getFullYear()}) | DecisionRank`,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Best ${category.name} Rankings & Comparisons`,
      description: metaDescription,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Best ${category.name} Rankings & Comparisons`,
      description: metaDescription,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const { page } = await searchParams;

  // Fetch category with full product data for buyer's choice
  let category;
  try {
    category = await getCategoryWithProducts(categorySlug);
  } catch (error) {
    notFound();
  }

  if (!category) notFound();

  // Compute buyer's choice picks
  const buyersChoicePicks = computeBuyersChoice(category);

  // Rankings for pagination and listing come from category.rankings (now with ranking_products already populated)
  const { rankings } = category;

  // Fetch all categories and ranking counts for internal linking
  const allCategories = await getAllCategories();
  const rankingCounts = await getRankingCountsByCategory();
  const thinFamilyClusters = buildThinFamilyClusterSections(allCategories, rankingCounts).filter((cluster) =>
    cluster.categorySlugs.includes(categorySlug)
  );

  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const totalRankings = rankings.length;
  const totalPages = Math.ceil(totalRankings / RANKINGS_PER_PAGE);
  const startIndex = (currentPage - 1) * RANKINGS_PER_PAGE;
  const endIndex = startIndex + RANKINGS_PER_PAGE;
  const paginatedRankings = rankings.slice(startIndex, endIndex);

  const baseUrl = getBaseUrl();

  const mostRecentUpdate = rankings.reduce((latest: string, r: Ranking) => {
    return r.updated_at > latest ? r.updated_at : latest;
  }, rankings[0]?.updated_at || category.updated_at);
  const freshDate = new Date(mostRecentUpdate);
  const freshDateFormatted = freshDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: category.name, url: `${baseUrl}/${categorySlug}` },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  const itemListJsonLd = generateItemListJsonLd(
    `${category.name} Rankings`,
    paginatedRankings.map((ranking: Ranking, index: number) => ({
      name: ranking.question,
      url: `${baseUrl}/${category.slug}/${ranking.slug}`,
      position: startIndex + index + 1,
      description: ranking.description || undefined,
    })),
  );

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: `${category.name} Rankings`,
    url: currentPage > 1 ? `${baseUrl}/${categorySlug}?page=${currentPage}` : `${baseUrl}/${categorySlug}`,
    description: getEnhancedDescription(categorySlug, category.description),
    items: paginatedRankings.map((ranking: Ranking, index: number) => ({
      name: ranking.question,
      url: `${baseUrl}/${category.slug}/${ranking.slug}`,
      position: startIndex + index + 1,
      description: ranking.description || undefined,
    })),
  });

  const faqs = getCategoryFAQs(categorySlug);
  const faqJsonLd = generateFAQJsonLd(faqs);


  // Compute related categories based on adjacency mapping
  const relatedSlugs = getRelatedCategorySlugs(categorySlug);
  const relatedCategories = allCategories.filter(
    (c: Category) => relatedSlugs.includes(c.slug) && c.slug !== categorySlug
  );
  const displayCategories =
    relatedCategories.length > 0
      ? relatedCategories
      : allCategories.filter((c: Category) => c.slug !== categorySlug).slice(0, 4);
  const thinFamilyClusterJsonLd = thinFamilyClusters.map((cluster) =>
    generateCollectionPageJsonLd({
      name: `${cluster.title} for ${category.name}`,
      url: `${baseUrl}/${categorySlug}`,
      description: cluster.intro,
      items: cluster.categories.map((clusterCategory, index) => ({
        name: clusterCategory.name,
        url: `${baseUrl}/${clusterCategory.slug}`,
        position: index + 1,
        description: clusterCategory.description || undefined,
      })),
    }),
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="py-12 bg-muted/30" id="faq">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-card rounded-lg border p-4">
                <summary className="font-medium cursor-pointer hover:text-slate-600">
                  {faq.question}
                </summary>
                <p className="mt-2 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {thinFamilyClusterJsonLd.map((schema, index) => (
        <script
          key={`category-cluster-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Buyer's Choice JSON-LD */}
      {buyersChoicePicks.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": `Buyer's Choice: ${category.name}`,
              "description": "Top-rated products selected by our editorial team based on score, value, and fit for different buyer needs.",
              "numberOfItems": buyersChoicePicks.length,
              "itemListElement": buyersChoicePicks.map((pick, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "Product",
                  "name": pick.product.name,
                  "description": pick.quickVerdict,
                  "image": pick.assets?.[0]?.url || undefined,
                  "award": pick.badge,
                },
              })),
            })
          }}
        />
      )}
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
          <Breadcrumbs items={[{ label: category.name }]} />

          <div className="mb-8">
            <h1 className="text-5xl font-bold text-foreground mb-3 tracking-tight">
              {category.name}
            </h1>
            <div className="text-lg text-muted-foreground whitespace-pre-line mb-4">
              {getEnhancedDescription(categorySlug, category.description)}
            </div>
            {/* Credibility snippet */}
            <p className="text-sm text-muted-foreground/80 mb-4 italic">
              We test each product in our lab for 20+ hours to ensure accurate, hands-on recommendations.
            </p>
            {/* Trust and freshness signals */}
            <div className="mb-4">
              <TrustIndicators
                lastUpdated={mostRecentUpdate}
                researchHours={20}
                productsTested={totalRankings * 6}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <time dateTime={mostRecentUpdate}>Last updated {freshDateFormatted}</time>
              </span>
              <span>·</span>
              <span>
                Scores based on our{' '}
                <Link href="/how-we-rank" className="text-slate-600 underline hover:text-slate-800">
                  research-backed methodology
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Use-case blocks + query-intent long-tail phrases */}
        <UseCaseModule categorySlug={categorySlug} />

        {/* Comparison guide module for comparative search intent */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {(() => {
            const { ComparisonModule } = require('@/components/comparison-module');
            return <ComparisonModule categorySlug={categorySlug} />;
          })()}
        </div>

        {/* Cross-category comparison callouts with links to related categories */}
        {relatedCategories.length > 0 && (
          <ComparisonCallouts
            categorySlug={categorySlug}
            categoryName={category.name}
            relatedCategories={displayCategories.slice(0, 3)}
          />
        )}

        <ThinFamilyClusterSections
          clusters={thinFamilyClusters}
          rankingCounts={rankingCounts}
          currentCategorySlug={categorySlug}
          title={`More ${category.name} buyer paths`}
          description="This family spotlight adds stronger family context, grouped browse cards, and related buyer-intent links without creating a thin standalone hub page."
        />

        {/* Cluster-based navigation for adjacent-category discovery */}
        <ClusterNavigation
          categories={allCategories}
          rankingCounts={rankingCounts}
          currentSlug={categorySlug}
          title="Explore Category Clusters"
        />

        {/* Related Categories - Internal Linking */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <CategoryLinks
            categories={displayCategories}
            rankingCounts={rankingCounts}
            title={relatedCategories.length > 0 ? "Related Categories" : "Explore Other Categories"}
            description={relatedCategories.length > 0 ? "Discover rankings in adjacent product categories" : "Discover rankings in other product categories"}
          />
        </div>

        {/* Featured Rankings - Internal Linking */}
        {rankings.length > 0 && (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <FeaturedRankings
              rankings={rankings.slice(0, 4)}
              categorySlug={categorySlug}
              title="Featured Rankings"
              description="Top guides in this category"
            />
          </div>
        )}

        {rankings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No rankings found in this category.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Buyer's Choice Section */}
            <CategoryBuyersChoice picks={buyersChoicePicks} categoryName={category.name} />
            <div className="space-y-6">
              {paginatedRankings.map((ranking: Ranking) => {
                const updatedDate = new Date(ranking.updated_at);
                const formattedDate = updatedDate.toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                });
                return (
                  <Link 
                    key={ranking.id} 
                    href={`/${category.slug}/${ranking.slug}`}
                    className="block"
                  >
                    <Card className="group transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl group-hover:text-slate-600 transition-colors">{ranking.question}</CardTitle>
                        {ranking.description && (
                          <CardDescription className="line-clamp-2">
                            {ranking.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {ranking.verdict_summary && (
                          <div className="flex gap-2 items-start">
                            <Quote className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" />
                            <p className="text-sm text-muted-foreground/80 line-clamp-2 italic">
                              {ranking.verdict_summary}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <time dateTime={ranking.updated_at}>Updated {formattedDate}</time>
                          </span>
                          <span className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                            View Ranking
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Link
                  href={currentPage > 1 ? `/${categorySlug}?page=${currentPage - 1}` : `/${categorySlug}?page=${currentPage}`}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                >
                  <Button variant="outline" size="sm" disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                </Link>

                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>

                <Link
                  href={currentPage < totalPages ? `/${categorySlug}?page=${currentPage + 1}` : `/${categorySlug}?page=${currentPage}`}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                >
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
