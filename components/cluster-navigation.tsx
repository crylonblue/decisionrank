'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Layers } from 'lucide-react';
import { CATEGORY_CLUSTERS } from '@/lib/category-relations';
import type { Category } from '@/lib/types';

interface ClusterNavigationProps {
  categories: Category[];
  rankingCounts: Record<string, number>;
  /** Slug of the current category — its cluster is highlighted */
  currentSlug?: string;
  title?: string;
}

export function ClusterNavigation({
  categories,
  rankingCounts,
  currentSlug,
  title = "Explore by Category Cluster",
}: ClusterNavigationProps) {
  const categoryMap = new Map(categories.map(c => [c.slug, c]));

  return (
    <section className="py-10 border-t border-border/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            Category Clusters
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-1">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm mb-7">
          Browse related product categories grouped by use case and lifestyle.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CLUSTERS.map((cluster) => {
            // Only show clusters that have at least one category in our dataset
            const clusterCategories = cluster.slugs
              .map(s => categoryMap.get(s))
              .filter((c): c is Category => !!c);

            if (clusterCategories.length === 0) return null;

            const isCurrentCluster = currentSlug
              ? cluster.slugs.includes(currentSlug)
              : false;

            return (
              <Card
                key={cluster.id}
                className={
                  isCurrentCluster
                    ? 'border-indigo-300 bg-indigo-50/40'
                    : 'border-slate-200/50 bg-slate-50/30'
                }
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`text-base ${isCurrentCluster ? 'text-indigo-700' : ''}`}>
                    {cluster.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {clusterCategories.map(cat => {
                    const count = rankingCounts[cat.id] || 0;
                    const isActive = cat.slug === currentSlug;
                    return (
                      <Link
                        key={cat.id}
                        href={`/${cat.slug}`}
                        className={
                          `flex items-center justify-between text-xs py-0.5 px-1.5 rounded-md transition-colors ` +
                          (isActive
                            ? 'text-indigo-600 font-semibold bg-indigo-100'
                            : isCurrentCluster
                            ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100')
                        }
                      >
                        <span>{cat.name}</span>
                        {count > 0 && (
                          <span className="text-muted-foreground/60 font-normal">{count}</span>
                        )}
                      </Link>
                    );
                  })}
                  {isCurrentCluster && (
                    <div className="pt-1.5 mt-1 border-t border-indigo-200/50">
                      <span className="text-xs text-indigo-600 font-medium italic">
                        ← You&apos;re here
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}