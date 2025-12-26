"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProductCardSkeleton } from '@/components/product-card-skeleton';
import type { RankingProductWithDetails, SentimentWithUser } from '@/lib/supabase';

interface LazyProductListProps {
  rankingProducts: RankingProductWithDetails[];
  initialCount?: number;
  loadMoreCount?: number;
}

export function LazyProductList({ 
  rankingProducts, 
  initialCount = 3,
  loadMoreCount = 3 
}: LazyProductListProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const visibleProducts = rankingProducts.slice(0, visibleCount);
  const hasMore = visibleCount < rankingProducts.length;

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < rankingProducts.length && !isLoading) {
          setIsLoading(true);
          // Simulate a small delay for better UX
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + loadMoreCount, rankingProducts.length));
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [visibleCount, rankingProducts.length, loadMoreCount, isLoading, hasMore]);

  return (
    <div className="space-y-8">
      {visibleProducts.map((rp: RankingProductWithDetails) => {
        const pros = rp.sentiments.filter((s: SentimentWithUser) => s.type === 'pro');
        const cons = rp.sentiments.filter((s: SentimentWithUser) => s.type === 'con');

        return (
          <Card key={rp.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div className="flex gap-6">
                  {rp.product.image_url && (
                    <Image
                      src={rp.product.image_url}
                      alt={rp.product.name}
                      width={140}
                      height={140}
                      className="rounded-xl object-cover border border-border shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-3">{rp.product.name}</CardTitle>
                    {rp.product.description && (
                      <CardDescription className="mb-4 leading-relaxed text-base">
                        {rp.product.description}
                      </CardDescription>
                    )}
                    {rp.product.link && (
                      <a
                        href={rp.product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-700 hover:underline font-medium transition-colors"
                      >
                        View product →
                      </a>
                    )}
                  </div>
                </div>
                <div className="text-right sm:text-left sm:min-w-[140px]">
                  <div className="text-sm text-muted-foreground mb-1">
                    Overall Score
                  </div>
                  <div className="text-4xl font-bold text-slate-600 mb-1">
                    {rp.score.toFixed(1)}
                  </div>
                  <Badge variant="outline" className="mt-1 border-slate-200 text-slate-600 bg-slate-50/50">
                    Rank #{rp.rank_position}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {/* Specifications */}
            {rp.specifications.length > 0 && (
              <CardContent>
                <Separator className="mb-6" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {rp.specifications.map((spec: { id: string; name: string; value: string; unit: string | null }) => (
                    <div key={spec.id} className="text-sm">
                      <div className="text-muted-foreground mb-1">
                        {spec.name}
                      </div>
                      <div className="font-semibold text-card-foreground">
                        {spec.value} {spec.unit || ''}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}

            {/* Pros and Cons */}
            <CardContent>
              {rp.specifications.length > 0 && <Separator className="mb-6" />}
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Pros */}
                {pros.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-green-700 mb-4">
                      Pros
                    </h3>
                    <ul className="space-y-6">
                      {pros.map((pro: SentimentWithUser) => (
                        <li
                          key={pro.id}
                          className="flex items-start gap-4"
                        >
                          {pro.user && (
                            <Avatar className="h-10 w-10 mt-0.5">
                              {pro.user.profile_picture_url && (
                                <AvatarImage src={pro.user.profile_picture_url} alt={pro.user.name} />
                              )}
                              <AvatarFallback className="text-sm">
                                {pro.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-semibold">
                                PRO
                              </Badge>
                              <h4 className="text-sm font-semibold text-card-foreground">
                                {pro.headline || pro.content}
                              </h4>
                            </div>
                            {pro.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {pro.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {cons.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-red-700 mb-4">
                      Cons
                    </h3>
                    <ul className="space-y-6">
                      {cons.map((con: SentimentWithUser) => (
                        <li
                          key={con.id}
                          className="flex items-start gap-4"
                        >
                          {con.user && (
                            <Avatar className="h-10 w-10 mt-0.5">
                              {con.user.profile_picture_url && (
                                <AvatarImage src={con.user.profile_picture_url} alt={con.user.name} />
                              )}
                              <AvatarFallback className="text-sm">
                                {con.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-semibold">
                                CON
                              </Badge>
                              <h4 className="text-sm font-semibold text-card-foreground">
                                {con.headline || con.content}
                              </h4>
                            </div>
                            {con.description && (
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {con.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Loading skeleton */}
      {isLoading && (
        <>
          {Array.from({ length: loadMoreCount }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))}
        </>
      )}

      {/* Observer target for lazy loading */}
      {hasMore && !isLoading && (
        <div ref={observerTarget} className="h-20" />
      )}
    </div>
  );
}

