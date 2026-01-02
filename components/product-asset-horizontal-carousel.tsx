"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Asset } from '@/lib/supabase';

interface ProductAssetHorizontalCarouselProps {
  assets?: Asset[];
  productName: string;
  fallbackImageUrl?: string | null;
}

export function ProductAssetHorizontalCarousel({
  assets,
  productName,
  fallbackImageUrl,
}: ProductAssetHorizontalCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Combine assets with fallback if needed
  const displayAssets = assets && assets.length > 0 
    ? assets 
    : fallbackImageUrl 
      ? [{ 
          id: 'fallback', 
          product_id: '', 
          type: 'image' as const, 
          url: fallbackImageUrl, 
          display_order: 0,
          created_at: '',
          updated_at: '',
        }]
      : [{ 
          id: 'placeholder', 
          product_id: '', 
          type: 'image' as const, 
          url: '/placeholder.svg', 
          display_order: 0,
          created_at: '',
          updated_at: '',
        }];

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const canScrollLeftValue = container.scrollLeft > 10;
    const canScrollRightValue = 
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10;
    
    setCanScrollLeft(canScrollLeftValue);
    setCanScrollRight(canScrollRightValue);
  };

  useEffect(() => {
    // Initial check
    const timer = setTimeout(() => {
      checkScrollButtons();
    }, 100);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        clearTimeout(timer);
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
    
    return () => clearTimeout(timer);
  }, [displayAssets]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    // Responsive scroll amount: 200px + gap on mobile, 300px + gap on desktop
    const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 216 : 320;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // This case should not happen anymore since we always add placeholder, but keep for safety
  if (displayAssets.length === 0) {
    return (
      <div className="w-full">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm">
          <Image
            src="/placeholder.svg"
            alt={productName}
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      {/* Scroll Container - 100% width */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full"
      >
        {displayAssets.map((asset, index) => (
          <div
            key={asset.id || index}
            className="flex-shrink-0 relative w-[200px] md:w-[300px]"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm">
              {asset.type === 'image' ? (
                <Image
                  src={asset.url}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${asset.url}?rel=0`}
                  title={`${productName} - Video ${index + 1}`}
                  className="w-full h-full absolute inset-0"
                  style={{ position: 'absolute', zIndex: 0, pointerEvents: 'auto' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays to indicate scrollable content */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-2 w-20 pointer-events-none z-5 bg-gradient-to-r from-card via-card/90 to-transparent" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-2 w-20 pointer-events-none z-5 bg-gradient-to-l from-card via-card/90 to-transparent" />
      )}

      {/* Navigation Controls - Positioned relative to parent container */}
      {displayAssets.length > 1 && (
        <>
          {/* Left Button */}
          <button
            type="button"
            className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity bg-white/95 hover:bg-white shadow-lg rounded-md border border-gray-300 h-10 w-10 flex items-center justify-center pointer-events-auto z-10 ${
              canScrollLeft ? 'opacity-100 group-hover:opacity-100' : 'opacity-50 pointer-events-none cursor-not-allowed'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scroll('left');
            }}
            aria-label="Scroll left"
            disabled={!canScrollLeft}
            style={{ 
              pointerEvents: canScrollLeft ? 'auto' : 'none'
            }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          {/* Right Button - Always on the right edge */}
          <button
            type="button"
            className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity bg-white/95 hover:bg-white shadow-lg rounded-md border border-gray-300 h-10 w-10 flex items-center justify-center pointer-events-auto z-10 ${
              canScrollRight ? 'opacity-100 group-hover:opacity-100' : 'opacity-50 pointer-events-none cursor-not-allowed'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scroll('right');
            }}
            aria-label="Scroll right"
            disabled={!canScrollRight}
            style={{ 
              pointerEvents: canScrollRight ? 'auto' : 'none'
            }}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
}

