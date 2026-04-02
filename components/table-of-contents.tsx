import { List } from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * Server-rendered Table of Contents for ranking detail pages.
 * Adds anchor links that Google can surface as "Jump to" links in search results.
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length < 3) return null; // Only show when there's enough content

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded-lg border border-slate-200/60 bg-slate-50/40 px-5 py-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <List className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-semibold text-slate-700">On This Page</span>
      </div>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-baseline gap-2"
            >
              <span className="text-xs text-slate-400 tabular-nums w-4 shrink-0 text-right">
                {i + 1}.
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
