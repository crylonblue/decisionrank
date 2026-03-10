"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import type { Ranking } from '@/lib/types';

interface QuickSearchProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showButton?: boolean;
  buttonText?: string;
  iconSize?: 'sm' | 'md';
  iconPosition?: 'left-3' | 'left-4';
}

export function QuickSearch({
  placeholder = "Search rankings...",
  className = "",
  inputClassName = "",
  showButton = false,
  buttonText = "Search",
  iconSize = 'sm',
  iconPosition = 'left-3'
}: QuickSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const rawResults = useQuery(
    api.rankings.quickSearch,
    debouncedQuery.trim() ? { query: debouncedQuery } : "skip"
  );

  const results = (rawResults || []) as (Ranking & { category: { slug: string; name: string } })[];
  const isLoading = debouncedQuery.trim().length > 0 && rawResults === undefined;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query, rawResults]);

  const handleSelect = (ranking: Ranking & { category: { slug: string; name: string } }) => {
    router.push(`/${ranking.category.slug}/${ranking.slug}`);
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        } else if (results.length > 0) {
          handleSelect(results[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const iconSizeClass = iconSize === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const iconLeftClass = iconPosition;
  const inputPaddingLeft = iconSize === 'sm' ? 'pl-10' : 'pl-12';

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className={`absolute ${iconLeftClass} top-1/2 ${iconSizeClass} -translate-y-1/2 text-muted-foreground`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-input bg-card ${inputPaddingLeft} ${showButton ? 'pr-20' : 'pr-4'} py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:ring-offset-0 transition-all ${inputClassName}`}
        />
        {showButton && (
          <button
            type="button"
            onClick={() => {
              if (selectedIndex >= 0 && selectedIndex < results.length) {
                handleSelect(results[selectedIndex]);
              } else if (results.length > 0) {
                handleSelect(results[0]);
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-slate-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
          >
            {buttonText}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="py-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-4 py-3 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="py-1">
              {results.map((ranking, index) => (
                <button
                  key={ranking.id}
                  type="button"
                  onClick={() => handleSelect(ranking)}
                  className={`w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                    index === selectedIndex ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {ranking.question}
                      </div>
                      {ranking.category && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {ranking.category.name}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              No results found
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
