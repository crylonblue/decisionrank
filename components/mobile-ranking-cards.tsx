import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreBadge } from '@/components/score-badge';
import { Trophy, Award, Medal } from 'lucide-react';
import type { RankingProductWithDetails, SentimentWithUser } from '@/lib/types';

interface MobileRankingCardsProps {
  rankingProducts: RankingProductWithDetails[];
}

const rankIcons = [
  { icon: Trophy, color: 'text-amber-500' },
  { icon: Award, color: 'text-slate-400' },
  { icon: Medal, color: 'text-amber-700' },
];

export function MobileRankingCards({ rankingProducts }: MobileRankingCardsProps) {
  const sorted = [...rankingProducts].sort((a, b) => a.rank_position - b.rank_position);

  return (
    <div className="mb-12 md:hidden">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Considered Options
      </h2>
      <div className="space-y-3">
        {sorted.map((rp) => {
          const RankIcon = rankIcons[rp.rank_position - 1]?.icon;
          const rankColor = rankIcons[rp.rank_position - 1]?.color;
          const isTop3 = rp.rank_position <= 3;

          // Get top 2 pros for quick glance
          const topPros = rp.sentiments
            .filter((s: SentimentWithUser) => s.type === 'pro')
            .slice(0, 2);

          // Get top 2 specs
          const topSpecs = rp.specifications.slice(0, 3);

          return (
            <Card
              key={rp.id}
              className={`overflow-hidden transition-all ${
                rp.rank_position === 1
                  ? 'border-amber-200/60 bg-amber-50/20 shadow-sm'
                  : ''
              }`}
            >
              <CardContent className="p-4">
                {/* Header: Rank + Name + Score */}
                <div className="flex items-center gap-3 mb-3">
                  {isTop3 && RankIcon ? (
                    <RankIcon className={`h-5 w-5 shrink-0 ${rankColor}`} />
                  ) : (
                    <Badge
                      variant="secondary"
                      className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs shrink-0"
                    >
                      {rp.rank_position}
                    </Badge>
                  )}
                  <span className="text-base font-semibold text-foreground flex-1 min-w-0 truncate">
                    {rp.product.name}
                  </span>
                  <ScoreBadge score={rp.score} size="small" showMaxScore={false} />
                </div>

                {/* Key specs row */}
                {topSpecs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {topSpecs.map((spec) => (
                      <span
                        key={spec.id}
                        className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-muted-foreground"
                      >
                        <span className="font-medium text-foreground">
                          {spec.value}
                          {spec.unit ? ` ${spec.unit}` : ''}
                        </span>
                        <span className="text-muted-foreground/60">{spec.name}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Top strengths */}
                {topPros.length > 0 && (
                  <div className="flex flex-col gap-1">
                    {topPros.map((pro: SentimentWithUser) => (
                      <span
                        key={pro.id}
                        className="text-xs text-green-700 flex items-start gap-1.5"
                      >
                        <span className="shrink-0 mt-0.5">✓</span>
                        <span className="line-clamp-1">
                          {pro.headline || pro.content}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
