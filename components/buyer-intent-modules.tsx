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
                                {count} {count === 1 ? 'ranking' : 'rankings'}
                              </span>
                            )}
                            <span className="flex items-center text-sm font-medium text-slate-600 group-hover:gap-2 transition-all">
                               View {category.name} rankings
                              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
