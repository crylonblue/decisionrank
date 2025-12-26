"use client";

import { Logo } from '@/components/logo';
import { QuickSearch } from '@/components/quicksearch';

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Logo variant="link" size="lg" />

          {/* QuickSearch */}
          <div className="flex-1 max-w-lg">
            <QuickSearch placeholder="Search rankings..." />
          </div>
        </div>
      </div>
    </nav>
  );
}
