"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Asset } from '@/lib/supabase';

interface ProductAssetCarouselProps {
  assets?: Asset[];
  productName: string;
  fallbackImageUrl?: string | null;
  size?: 'xs' | 'small' | 'medium' | 'large';
}

const sizeClasses = {
  xs: 'w-[56px]',
  small: 'w-[140px]',
  medium: 'w-[280px]',
  large: 'w-full max-w-md',
};

export function ProductAssetCarousel({
  assets,
  productName,
  fallbackImageUrl,
  size = 'medium',
}: ProductAssetCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no assets, use fallback image or show placeholder
  if (!assets || assets.length === 0) {
    if (fallbackImageUrl) {
      return (
        <div className={`${sizeClasses[size]} flex-shrink-0`}>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm">
            <Image
              src={fallbackImageUrl}
              alt={productName}
              fill
              className="object-cover"
            />
          </div>
        </div>
      );
    }
    // No assets and no fallback - show placeholder
    return (
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">No image</span>
        </div>
      </div>
    );
  }

  const currentAsset = assets[currentIndex];
  const hasMultipleAssets = assets.length > 1;
  const showControls = size !== 'xs' && hasMultipleAssets;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? assets.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === assets.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`${sizeClasses[size]} flex-shrink-0`}>
      <div className={`relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm ${showControls ? 'group' : ''}`}>
        {/* Asset Content */}
        {currentAsset.type === 'image' ? (
          <Image
            src={currentAsset.url}
            alt={`${productName} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${currentAsset.url}?rel=0`}
            title={`${productName} - Video ${currentIndex + 1}`}
            className="w-full h-full absolute inset-0"
            style={{ position: 'absolute', zIndex: 0, pointerEvents: 'auto' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {/* Navigation Arrows */}
        {showControls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background z-[50]"
              onClick={goToPrevious}
              aria-label="Previous asset"
              style={{ pointerEvents: 'auto' }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background z-[50]"
              onClick={goToNext}
              aria-label="Next asset"
              style={{ pointerEvents: 'auto' }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Indicators */}
        {showControls && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-[50]">
            {assets.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-background'
                    : 'w-1.5 bg-background/50 hover:bg-background/75'
                }`}
                aria-label={`Go to asset ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

