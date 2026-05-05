import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Network, Search } from 'lucide-react';
import type { ThinFamilyClusterSection } from '@/lib/thin-family-clusters';

interface ThinFamilyClusterSectionsProps {
  clusters: ThinFamilyClusterSection[];
  rankingCounts: Record<string, number>;
  title?: string;
  description?: string;
  currentCategorySlug?: string;
}

export function ThinFamilyClusterSections({
  clusters,
  rankingCounts,
  title = 'Explore Fast-Growing Category Families',
  description = 'These thinner families need stronger crawl paths and richer buyer context, so we group their rankings, buyer searches, and adjacent categories together here.',
  currentCategorySlug,
}: ThinFamilyClusterSectionsProps) {
  if (clusters.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
            <Network className="h-3.5 w-3.5" />
            Cluster Spotlights
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-8">
          {clusters.map((cluster) => {
            const isCurrentCluster = currentCategorySlug
              ? cluster.categorySlugs.includes(currentCategorySlug)
              : false;

            return (
              <div
                key={cluster.id}
                className={
                  'rounded-3xl border p-6 sm:p-8 ' +
                  (isCurrentCluster
                    ? 'border-indigo-300 bg-indigo-50/40'
                    : 'border-border bg-muted/20')
                }
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl font-semibold text-foreground">{cluster.title}</h3>
                      {isCurrentCluster && (
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                          Current family
                        </Badge>
                      )}
                    </div>
                    <p className="mt-3 text-muted-foreground">{cluster.intro}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Browse this family</h4>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {cluster.categories.map((category) => {
                        const count = rankingCounts[category.id] || 0;
                        const snippet = (category.description || '').split('\n\n')[0].replace(/\n/g, ' ').trim();
                        return (
                          <Link key={category.id} href={`/${category.slug}`}>
                            <Card className="group h-full border-border/70 bg-background/90 transition-all hover:-translate-y-1 hover:border-slate-400/50 hover:shadow-lg">
                              <CardHeader>
                                <div className="flex items-start justify-between gap-2">
                                  <CardTitle className="text-lg group-hover:text-slate-700">{category.name}</CardTitle>
                                  {count > 0 && (
                                    <Badge variant="secondary" className="shrink-0 text-xs">
                                      {count} {count === 1 ? 'ranking' : 'rankings'}
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription className="line-clamp-4">{snippet}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                                  Compare the best {category.name} rankings
                                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-600">
                        <Search className="h-4 w-4" />
                        Buyer search paths
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Crawl-friendly internal links built from existing long-tail buyer-intent phrases in this family&apos;s category data.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cluster.buyerSearchLinks.map((link) => (
                          <Link
                            key={`${cluster.id}-${link.slug}-${link.phrase}`}
                            href={`/?search=${encodeURIComponent(link.phrase)}`}
                            className="rounded-full border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400/50 hover:bg-background"
                          >
                            {link.phrase}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {cluster.relatedCategories.length > 0 && (
                      <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Adjacent categories</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Cross-links pulled from the family&apos;s existing related-category graph.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {cluster.relatedCategories.map((category) => (
                            <Link
                              key={`${cluster.id}-${category.id}`}
                              href={`/${category.slug}`}
                              className="rounded-full border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-slate-400/50 hover:bg-background"
                            >
                              Explore {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
