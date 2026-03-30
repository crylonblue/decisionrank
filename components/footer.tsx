import Link from 'next/link';
import { Logo } from '@/components/logo';
import { getAllCategories } from '@/lib/data';

export async function Footer() {
  let categories: { name: string; slug: string }[] = [];
  try {
    categories = await getAllCategories();
  } catch {
    // Silently fall back to no categories in footer
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Multi-column layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="div" size="md" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Trusted editorial product rankings and comparisons to help you make informed decisions.
            </p>
          </div>

          {/* Categories column */}
          {categories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
              <ul className="space-y-2.5">
                {categories.slice(0, 8).map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/${category.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-slate-600"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                {categories.length > 8 && (
                  <li>
                    <Link
                      href="/categories"
                      className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-800"
                    >
                      View all →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-muted-foreground transition-colors hover:text-slate-600"
                >
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/how-we-rank"
                  className="text-sm text-muted-foreground transition-colors hover:text-slate-600"
                >
                  How We Rank
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-slate-600"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/imprint"
                  className="text-sm text-muted-foreground transition-colors hover:text-slate-600"
                >
                  Imprint
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground transition-colors hover:text-slate-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} DecisionRank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
