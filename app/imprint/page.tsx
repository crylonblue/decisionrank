import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Suspense fallback={
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
                DecisionRank
              </div>
            </div>
          </div>
        </nav>
      }>
        <Navigation />
      </Suspense>
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-slate-600 transition-colors"
          >
            ← Back to home
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
              Imprint
            </h1>
            <p className="text-muted-foreground">
              Legal information according to § 5 TMG
            </p>
          </div>

          {/* Content */}
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Information according to § 5 TMG
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">DecisionRank</strong>
                  </p>
                  <p>
                    [Your Company Name]<br />
                    [Your Street Address]<br />
                    [Your City, Postal Code]<br />
                    [Your Country]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Phone: [Your Phone Number]<br />
                    Email: [Your Email Address]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Responsible for content
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    [Your Name]<br />
                    [Your Address]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  EU Dispute Resolution
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    The European Commission provides a platform for online dispute resolution (ODR):
                    <a 
                      href="https://ec.europa.eu/consumers/odr/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline ml-1"
                    >
                      https://ec.europa.eu/consumers/odr/
                    </a>
                  </p>
                  <p>
                    You can find our email address in the contact section above.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Consumer dispute resolution / Universal arbitration board
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

