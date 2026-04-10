import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users } from 'lucide-react';
import type { RankingProductWithDetails } from '@/lib/types';

interface PopularComparisonsProps {
  products: RankingProductWithDetails[];
  categorySlug: string;
  currentSlug: string;
  limit?: number;
  title?: string;
  description?: string;
  className?: string;
}

export function PopularComparisons({
  products,
  categorySlug,
  currentSlug,
  limit = 4,
  title = "Popular Comparisons",
  description,
  className = ""
}: PopularComparisonsProps) {
  if (!products || products.length <= 1) {
    return null;
  }

  // Get other products (exclude current ranking's product if we can identify it)
  // For now, show top-ranked products that aren't the current page
  const otherProducts = products
    .filter(p => p.rank_position > 1) // Skip #1 product (usually the focus)
    .slice(0, limit);

  if (otherProducts.length === 0) {
    return null;
  }

  return (
    <section className={`mb-12 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {otherProducts.map((rp) => {
          const slug = rp.product.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          const href = `/${categorySlug}/${slug}`;

          return (
            <Link
              key={rp.id}
              href={href}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-md hover:border-slate-400/50 hover:-translate-y-0.5 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-medium text-muted-foreground">Compared</span>
                  </div>
                  <CardTitle className="text-base group-hover:text-slate-600 transition-colors line-clamp-2">
                    {rp.product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score: {rp.score.toFixed(1)}</span>
                    <span className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-600 group-hover:gap-2 transition-all">
                      Compare
                      <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
