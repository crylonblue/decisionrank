import Link from 'next/link';
import { Trophy, Award, Medal, ThumbsUp, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RankingProductWithDetails } from '@/lib/types';

const podiumIcons = [
  { Icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200/60', label: 'Best Overall' },
  { Icon: Award, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200/60', label: 'Runner-Up' },
  { Icon: Medal, color: 'text-orange-400', bg: 'bg-orange-50', border: 'border-orange-200/60', label: 'Great Value' },
];

interface TopPicksProps {
  rankingProducts: RankingProductWithDetails[];
}

export function TopPicks({ rankingProducts }: TopPicksProps) {
  const topThree = rankingProducts
    .sort((a, b) => a.rank_position - b.rank_position)
    .slice(0, 3);

  if (topThree.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby="top-picks-heading">
      <h2 id="top-picks-heading" className="text-2xl font-bold text-foreground mb-1">
        Top Picks at a Glance
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Our highest-rated products based on research and testing
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {topThree.map((rp, i) => {
          const { Icon, color, bg, border, label } = podiumIcons[i] || podiumIcons[2];
          const topPros = rp.sentiments
            .filter((s) => s.type === 'pro')
            .slice(0, 2);

          return (
            <Card
              key={rp.id}
              className={`relative overflow-hidden ${border} ${i === 0 ? 'sm:scale-[1.03] sm:shadow-lg ring-1 ring-amber-200/40' : ''}`}
            >
              {/* Rank badge */}
              <div className={`absolute top-3 right-3 ${bg} rounded-full p-1.5`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>

              <CardContent className="pt-5 pb-4 px-5">
                {/* Position label */}
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider mb-2">
                  #{rp.rank_position} · {label}
                </Badge>

                {/* Product name */}
                <h3 className="text-lg font-semibold text-foreground leading-snug mb-2">
                  {rp.product.name}
                </h3>

                {/* Score */}
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-2xl font-bold tabular-nums text-foreground">
                    {rp.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>

                {/* Key strengths */}
                {topPros.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {topPros.map((pro) => (
                      <li key={pro.id} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                        <ThumbsUp className="h-3 w-3 mt-1 shrink-0 text-emerald-500" />
                        <span className="line-clamp-2">{pro.headline || pro.content}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* External link */}
                {rp.product.link && (
                  <a
                    href={rp.product.link}
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
