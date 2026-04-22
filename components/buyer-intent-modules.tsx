'use client';

import { Category } from '@/lib/types';
import { ENHANCED_CATEGORY_DESCRIPTIONS } from '@/lib/category-enhancements';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { buyerIntentModules } from '@/lib/buyer-intent-modules';

interface BuyerIntentModulesProps {
  categories: Category[];
  rankingCounts: Record<string, number>;
}

export function BuyerIntentModules({ categories, rankingCounts }: BuyerIntentModulesProps) {
  const categoryMap = new Map(categories.map(c => [c.slug, c]));

  if (categories.length === 0) return null;

  return (
    <>
      {buyerIntentModules.map((module) => {
        const moduleCategories = module.categorySlugs
          .map(slug => categoryMap.get(slug))
          .filter((c): c is Category => !!c);

        if (moduleCategories.length === 0) return null;

        return (
          <section key={module.id} className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {module.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  {module.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {moduleCategories.map((category) => {
                  const count = rankingCounts[category.id] || 0;
                  return (
                    <Link
                      key={category.id}
                      href={`/${category.slug}`}
                    >
                      <Card className="group h-full transition-all hover:shadow-lg hover:border-slate-400/50 hover:-translate-y-1 cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-xl group-hover:text-slate-600 transition-colors">
                            {category.name}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 mt-2">
                             {(ENHANCED_CATEGORY_DESCRIPTIONS[category.slug] || category.description || `Browse ${category.name} rankings and comparisons.`).replace(/\n/g, ' ')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mt-4">
                            {count > 0 && (
                              <span className="text-xs text-muted-foreground">
                                {count} {count === 1 ? 'product' : 'products'} ranked
                              </span>
                            )}
                            <span className="flex items-center text-sm font-medium text-slate-700 group-hover:text-slate-900 group-hover:gap-2 transition-all">
                              Compare the best {category.name}
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              {/* Cluster-level browse module: indexable list of all categories in this collection with descriptions */}
              <div className="mt-10 bg-slate-50/50 rounded-xl p-6 border border-border/30">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Explore all {module.title} categories
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Discover detailed comparisons and expert recommendations across our {module.title.toLowerCase()} coverage. Each category includes hands-on tested products, pros and cons, and our impartial verdict.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {moduleCategories.map((category) => {
                    const rawDesc = ENHANCED_CATEGORY_DESCRIPTIONS[category.slug] || category.description || '';
                    const firstPara = rawDesc.split('\n\n')[0].replace(/\n/g, ' ').trim();
                    const snippet = firstPara.length > 130 ? firstPara.slice(0, 130) + '...' : firstPara;
                    return (
                      <div key={category.id} className="flex flex-col">
                        <Link
                          href={`/${category.slug}`}
                          className="font-medium text-slate-800 hover:text-slate-600 hover:underline"
                        >
                          {category.name}
                        </Link>
                        {snippet && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{snippet}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
