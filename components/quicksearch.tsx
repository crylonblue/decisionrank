"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Ranking } from '@/lib/supabase';

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
  const [results, setResults] = useState<(Ranking & { category: { slug: string; name: string } })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rankings')
        .select(`
          *,
          category:categories(slug, name)
        `)
        .ilike('question', `%${searchQuery}%`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Filter out rankings without categories
      const filtered = (data || [])
        .filter((ranking: any) => ranking.category !== null)
        .map((ranking: any) => ({
          ...ranking,
          category: ranking.category as { slug: string; name: string },
        })) as (Ranking & { category: { slug: string; name: string } })[];

      setResults(filtered);
      setIsOpen(searchQuery.trim().length > 0);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle input change with debouncing
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Handle result selection
  const handleSelect = (ranking: Ranking & { category: { slug: string; name: string } }) => {
    router.push(`/${ranking.category.slug}/${ranking.slug}`);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  // Handle keyboard navigation
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
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
          onChange={(e) => handleInputChange(e.target.value)}
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

      {/* Results Dropdown */}
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
