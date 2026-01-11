import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Ranking, Category } from '@/lib/supabase';

interface RelatedRankingsProps {
  rankings: Pick<Ranking, 'id' | 'slug' | 'question' | 'description'>[];
  category: Category;
}

export function RelatedRankings({ rankings, category }: RelatedRankingsProps) {
  if (!rankings || rankings.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Related Rankings</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {rankings.map((ranking) => (
          <Link
            key={ranking.id}
            href={`/${category.slug}/${ranking.slug}`}
          >
            <Card className="group h-full border-slate-200/50 bg-slate-50/30 transition-all hover:shadow-md hover:border-slate-400/50 hover:-translate-y-0.5 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-700 group-hover:text-slate-600 transition-colors">
                  {ranking.question}
                </CardTitle>
                {ranking.description && (
                  <CardDescription className="line-clamp-2 mt-1">
                    {ranking.description}
                  </CardDescription>
                )}
                <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-600 group-hover:gap-1.5 transition-all mt-3">
                  View Ranking
                  <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
