import Link from 'next/link';
import { Logo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <Logo variant="div" size="md" />

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link 
              href="/imprint" 
              className="transition-colors hover:text-slate-600"
            >
              Imprint
            </Link>
            <Link 
              href="/privacy-policy" 
              className="transition-colors hover:text-slate-600"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DecisionRank. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
