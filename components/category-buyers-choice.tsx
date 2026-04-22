import { Award, Wallet, Building2, Quote, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BuyerChoicePick } from '@/lib/buyers-choice';

const badgeStyles = {
  'Best Overall': {
    Icon: Award,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200/60',
    ring: 'ring-amber-200/40',
    accent: 'amber',
  },
  'Best for Budget': {
    Icon: Wallet,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200/60',
    ring: 'ring-emerald-200/40',
    accent: 'emerald',
  },
  'Best for Enterprise': {
    Icon: Building2,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-200/60',
    ring: 'ring-blue-200/40',
    accent: 'blue',
  },
};

interface CategoryBuyersChoiceProps {
  picks: BuyerChoicePick[];
  categoryName: string;
}

export function CategoryBuyersChoice({ picks, categoryName }: CategoryBuyersChoiceProps) {
  if (picks.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby="buyers-choice-heading">
      <h2 id="buyers-choice-heading" className="text-2xl font-bold text-foreground mb-1">
        Buyer&apos;s Choice: {categoryName}
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Top-rated picks based on score, value, and fit for different buyer needs
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((pick, idx) => {
          const style = badgeStyles[pick.badge as keyof typeof badgeStyles];
          if (!style) return null;
          const { Icon, color, bg, border, ring } = style;
          const topPros = pick.product.assets; // actually we need top pros from sentiments? Wait BuyerChoicePick includes specifications and assets not sentiments
          // The data includes product.assets but not sentiments. But quickVerdict already precomputed.
          // For display, we may show specs highlights.
          return (
            <Card
              key={idx}
              className={`relative overflow-hidden ${border} ${idx === 0 ? 'sm:scale-[1.02] sm:shadow-lg' : ''}`}
            >
              {/* Badge top-right */}
              <div className={`absolute top-3 right-3 ${bg} rounded-full p-1.5`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>

              <CardContent className="pt-5 pb-4 px-5">
                {/* Badge label */}
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase tracking-wider mb-2 border-${style.accent}-200 text-${style.accent}-700`}
                >
                  {pick.badge}
                </Badge>

                {/* Product name */}
                <h3 className="text-lg font-semibold text-foreground leading-snug mb-2">
                  {pick.product.name}
                </h3>

                {/* Score */}
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-2xl font-bold tabular-nums text-foreground">
                    {pick.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>

                {/* Quick Verdict */}
                <div className="flex gap-2 items-start mb-3">
                  <Quote className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${color}`} />
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {pick.quickVerdict}
                  </p>
                </div>

                {/* Key specs highlight — up to 2 most relevant */}
                {pick.specifications && pick.specifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {pick.specifications.slice(0, 2).map((spec, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-${style.accent}-50 text-${style.accent}-700 border border-${style.accent}-100`}
                      >
                        {spec.name}: {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
                      </span>
                    ))}
                  </div>
                )}

                {/* External link */}
                {pick.product.link && (
                  <a
                    href={pick.product.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    View Product
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
