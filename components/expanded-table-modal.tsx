"use client";

import { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { RankingProductWithDetails } from '@/lib/supabase';

interface ExpandedTableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rankingProducts: RankingProductWithDetails[];
  specNames: string[];
  getSpecValue: (rp: RankingProductWithDetails, specName: string) => string | null;
}

export function ExpandedTableModal({
  open,
  onOpenChange,
  rankingProducts,
  specNames,
  getSpecValue,
}: ExpandedTableModalProps) {
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Row height constant to ensure alignment
  const ROW_HEIGHT = 88; // Height for each product row (px)
  const PRODUCT_COLUMN_WIDTH = 320; // Fixed width for product column
  const SPEC_COLUMN_WIDTH = 200; // Width for each spec column

  // Calculate total content width based on columns
  const totalContentWidth = (specNames.length + 1) * SPEC_COLUMN_WIDTH; // +1 for score column

  // Calculate max translateX and update button states
  const checkScrollButtons = () => {
    if (!carouselContainerRef.current) {
      console.log('checkScrollButtons: container ref is null');
      return;
    }
    
    const containerWidth = carouselContainerRef.current.clientWidth;
    const maxTranslateX = Math.max(0, totalContentWidth - containerWidth);
    
    console.log('checkScrollButtons:', {
      containerWidth,
      totalContentWidth,
      maxTranslateX,
      currentTranslateX: translateX
    });
    
    const canScrollLeftValue = translateX < -1;
    const canScrollRightValue = maxTranslateX > 0 && translateX > -maxTranslateX + 1;
    
    console.log('Button states:', { canScrollLeftValue, canScrollRightValue });
    
    setCanScrollLeft(canScrollLeftValue);
    setCanScrollRight(canScrollRightValue);
  };

  // Update button states when translateX changes
  useEffect(() => {
    checkScrollButtons();
  }, [translateX, open, specNames.length]);

  // Reset position and check buttons when modal opens
  useEffect(() => {
    if (open) {
      setTranslateX(0);
      // Check buttons after a delay to ensure DOM is ready
      const timer = setTimeout(() => {
        console.log('Checking buttons after modal open');
        checkScrollButtons();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const scrollSpecs = (direction: 'left' | 'right') => {
    console.log('scrollSpecs called', direction, 'current translateX:', translateX);
    if (!carouselContainerRef.current) {
      console.log('carouselContainerRef is null');
      return;
    }
    
    const containerWidth = carouselContainerRef.current.clientWidth;
    const maxTranslateX = Math.max(0, totalContentWidth - containerWidth);
    const scrollAmount = 300; // pixels to scroll
    
    console.log('Container width:', containerWidth, 'Total content width:', totalContentWidth, 'Max translateX:', maxTranslateX);
    
    // Right button: move content left (translateX becomes more negative)
    // Left button: move content right (translateX becomes less negative, towards 0)
    const newTranslateX = direction === 'right' 
      ? Math.max(-maxTranslateX, translateX - scrollAmount)
      : Math.min(0, translateX + scrollAmount);
    
    console.log('Setting translateX to:', newTranslateX);
    setTranslateX(newTranslateX);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[98vw] sm:!max-w-[98vw] w-[98vw] !max-h-[90vh] !h-[90vh] p-0 flex flex-col overflow-hidden" showCloseButton={true}>
        <div className="relative flex-shrink-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl">All Products Comparison</DialogTitle>
          </DialogHeader>
          
          {/* Navigation Controls */}
          <div 
            className="absolute top-6 right-16 flex items-center gap-2 z-[100]"
            style={{ pointerEvents: 'auto' }}
          >
            <button
              onClick={(e) => {
                console.log('LEFT BUTTON CLICKED!', e);
                e.preventDefault();
                e.stopPropagation();
                scrollSpecs('left');
              }}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              style={{ pointerEvents: 'auto' }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                console.log('RIGHT BUTTON CLICKED!', e);
                e.preventDefault();
                e.stopPropagation();
                scrollSpecs('right');
              }}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
              style={{ pointerEvents: 'auto' }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Single scroll container for vertical scrolling */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="flex">
            {/* Product Column (Fixed, no scroll) */}
            <div 
              className="flex-shrink-0 border-r bg-card"
              style={{ width: PRODUCT_COLUMN_WIDTH }}
            >
              {/* Product Header */}
              <div className="bg-muted border-b px-6 py-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  Product
                </div>
              </div>
              
              {/* Product Rows */}
              <div className="divide-y divide-border">
                {rankingProducts.map((rp: RankingProductWithDetails) => (
                  <div 
                    key={rp.id} 
                    className="hover:bg-muted/30 transition-colors"
                    style={{ 
                      minHeight: ROW_HEIGHT,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <div className="px-6 py-4 w-full">
                      <div className="flex items-center gap-3">
                        {rp.product.image_url && (
                          <Image
                            src={rp.product.image_url}
                            alt={rp.product.name}
                            width={56}
                            height={56}
                            className="rounded-lg object-cover border border-border flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                              {rp.rank_position}
                            </Badge>
                            <div className="text-sm font-semibold text-card-foreground truncate">
                              {rp.product.name}
                            </div>
                          </div>
                          {rp.product.link && (
                            <a
                              href={rp.product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-primary transition-colors truncate block"
                            >
                              View product →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs Carousel (Horizontal scroll only) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              {/* Carousel Container with translateX */}
              <div 
                ref={carouselContainerRef}
                className="flex-1 flex flex-col overflow-hidden relative"
              >
                {/* Gradient overlay to indicate more content */}
                {canScrollRight && (
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-20"
                    style={{
                      background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), white)'
                    }}
                  />
                )}
                
                {/* Carousel Header - part of the transform */}
                <div className="flex-shrink-0 sticky top-0 z-10 bg-muted border-b overflow-hidden">
                  <div 
                    className="transition-transform duration-300 ease-out"
                    style={{ 
                      transform: `translateX(${translateX}px)`,
                      willChange: 'transform',
                      width: `${totalContentWidth}px`
                    }}
                  >
                    <div className="flex">
                      {specNames.map((specName) => (
                        <div 
                          key={specName} 
                          className="px-6 py-4 border-r last:border-r-0"
                          style={{ width: SPEC_COLUMN_WIDTH }}
                        >
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                            {specName}
                          </div>
                        </div>
                      ))}
                      {/* Score column */}
                      <div 
                        className="px-6 py-4 text-right"
                        style={{ width: SPEC_COLUMN_WIDTH }}
                      >
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                          Score
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel Body - part of the transform */}
                <div className="flex-1 overflow-hidden">
                  <div 
                    ref={carouselContentRef}
                    className="transition-transform duration-300 ease-out"
                    style={{ 
                      transform: `translateX(${translateX}px)`,
                      willChange: 'transform'
                    }}
                  >
                    <div className="divide-y divide-border" style={{ width: `${totalContentWidth}px` }}>
                      {rankingProducts.map((rp: RankingProductWithDetails) => (
                        <div 
                          key={rp.id} 
                          className="flex hover:bg-muted/30 transition-colors"
                          style={{ 
                            minHeight: ROW_HEIGHT,
                            width: `${totalContentWidth}px`,
                            alignItems: 'center'
                          }}
                        >
                          {/* Spec columns */}
                          {specNames.map((specName) => {
                            const specValue = getSpecValue(rp, specName);
                            return (
                              <div 
                                key={specName} 
                                className="px-6 py-4 border-r last:border-r-0 flex items-center"
                                style={{ width: SPEC_COLUMN_WIDTH }}
                              >
                                {specValue ? (
                                  <span className="text-sm font-semibold text-card-foreground">
                                    {specValue}
                                  </span>
                                ) : (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </div>
                            );
                          })}
                          {/* Score column */}
                          <div 
                            className="px-6 py-4 text-right flex items-center justify-end"
                            style={{ width: SPEC_COLUMN_WIDTH }}
                          >
                            <span className="text-lg font-bold text-card-foreground">
                              {rp.score.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
