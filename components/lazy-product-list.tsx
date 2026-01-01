"use client";

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProductCardSkeleton } from '@/components/product-card-skeleton';
import { ProductAssetHorizontalCarousel } from '@/components/product-asset-horizontal-carousel';
import { ScoreBadge } from '@/components/score-badge';
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
        const hasProsOrCons = pros.length > 0 || cons.length > 0;
        const hasSpecifications = rp.specifications.length > 0;

        return (
          <Card key={rp.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              {/* Score and Product Name on same line */}
              <div className="flex items-center gap-3 mb-0">
                <div className="flex items-center">
                  <ScoreBadge score={rp.score} size="medium" />
                </div>
                <CardTitle className="text-2xl mb-0 leading-none">{rp.product.name}</CardTitle>
              </div>
            </CardHeader>

            {/* Asset Carousel - Moved to CardContent to avoid CardHeader grid styling */}
            <CardContent className="pt-2 pb-4">
              <div className="w-full">
                <ProductAssetHorizontalCarousel
                  assets={rp.product.assets}
                  productName={rp.product.name}
                  fallbackImageUrl={rp.product.image_url}
                />
              </div>
            </CardContent>

            {/* Custom Tabs for Pros & Cons and Specifications */}
            <CardContent className="pt-0">
              <CustomTabs
                hasProsOrCons={hasProsOrCons}
                hasSpecifications={hasSpecifications}
                pros={pros}
                cons={cons}
                specifications={rp.specifications}
              />
            </CardContent>

            {/* View Product Link - Moved to bottom */}
            {rp.product.link && (
              <CardContent className="pt-0 pb-0">
                <Separator className="mb-4" />
                <a
                  href={rp.product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-slate-600 hover:text-slate-700 hover:underline font-medium transition-colors"
                >
                  View product →
                </a>
              </CardContent>
            )}
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

// Custom Tabs Component with animated underline
function CustomTabs({
  hasProsOrCons,
  hasSpecifications,
  pros,
  cons,
  specifications,
}: {
  hasProsOrCons: boolean;
  hasSpecifications: boolean;
  pros: SentimentWithUser[];
  cons: SentimentWithUser[];
  specifications: { id: string; name: string; value: string; unit: string | null }[];
}) {
  const [activeTab, setActiveTab] = useState<'pros-cons' | 'specifications'>(
    hasProsOrCons ? 'pros-cons' : 'specifications'
  );
  const tabsRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Update underline position when active tab changes or on mount
  useEffect(() => {
    if (!tabsRef.current || !underlineRef.current) return;

    const activeButton = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement;
    if (!activeButton) return;

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (!tabsRef.current || !underlineRef.current) return;
      
      const tabsContainer = tabsRef.current;
      const containerRect = tabsContainer.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;

      underlineRef.current.style.left = `${left}px`;
      underlineRef.current.style.width = `${width}px`;
    });
  }, [activeTab]);

  // Only show tabs if we have at least one tab with content
  if (!hasProsOrCons && !hasSpecifications) {
    return null;
  }

  // Show tabs even if only one tab has content - always show with underline
  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div ref={tabsRef} className="relative flex gap-8 border-b border-border mb-6">
        {hasProsOrCons && (
          <button
            data-tab="pros-cons"
            onClick={() => setActiveTab('pros-cons')}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === 'pros-cons'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            } cursor-pointer`}
          >
            Pros & Cons
          </button>
        )}
        {hasSpecifications && (
          <button
            data-tab="specifications"
            onClick={() => setActiveTab('specifications')}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === 'specifications'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            } cursor-pointer`}
          >
            Specifications
          </button>
        )}
        {/* Animated Underline - always visible, positioned under active tab */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-0.5 bg-foreground transition-all duration-300 ease-in-out"
          style={{ left: 0, width: 0 }}
        />
      </div>

      {/* Tab Content */}
      <div className="mt-0 pb-6">
        {activeTab === 'pros-cons' && (
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Pros */}
            {pros.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-green-700 mb-4">
                  Pros
                </h3>
                <ul className="space-y-6">
                  {pros.map((pro: SentimentWithUser) => (
                    <li key={pro.id} className="flex items-start gap-4">
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
                    <li key={con.id} className="flex items-start gap-4">
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
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {specifications.map((spec) => (
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
        )}
      </div>
    </div>
  );
}

