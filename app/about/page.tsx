import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { getBaseUrl, generateBreadcrumbJsonLd } from '@/lib/seo';
import { Suspense } from 'react';
import Link from 'next/link';
import { Target, Shield, BarChart3, RefreshCw, Users, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/about`;

  return {
    title: 'About DecisionRank | Our Mission & Editorial Approach',
    description:
      'DecisionRank provides independent, research-backed product rankings to help consumers make informed purchasing decisions. Learn about our mission, editorial standards, and what drives us.',
    alternates: { canonical: url },
    openGraph: {
      title: 'About DecisionRank',
      description:
        'Independent, research-backed product rankings. Learn about our mission and editorial approach.',
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'About DecisionRank',
      description:
        'Independent, research-backed product rankings. Learn about our mission and editorial approach.',
    },
  };
}

const VALUES = [
  {
    icon: Target,
    title: 'Research-First',
    description:
      'Every ranking starts with rigorous data collection — specifications, benchmarks, verified user feedback, and expert analysis. We let the evidence lead.',
  },
  {
    icon: Shield,
    title: 'Editorial Independence',
    description:
      "We don't accept payment for rankings or let commercial relationships influence scores. Our recommendations are earned, not bought.",
  },
  {
    icon: BarChart3,
    title: 'Transparent Scoring',
    description:
      'Our 0–100 scoring system uses weighted, category-specific criteria. You can always see why a product scores the way it does.',
  },
  {
    icon: RefreshCw,
    title: 'Continuously Updated',
    description:
      'Markets evolve fast. We revisit rankings regularly to account for new releases, price changes, and shifting user sentiment.',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description:
      "Rankings are organized around real purchase questions — \"What's the best robot vacuum?\" — because that's how people actually shop.",
  },
  {
    icon: Heart,
    title: 'No Hype, Just Honesty',
    description:
      "We highlight genuine pros and cons for every product. If something isn't great, we say so. Trust is earned through candor.",
  },
];

export default function AboutPage() {
  const baseUrl = getBaseUrl();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'About', url: `${baseUrl}/about` },
  ]);

  // AboutPage JSON-LD for E-E-A-T
  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About DecisionRank',
    description:
      'DecisionRank provides independent, research-backed product rankings to help consumers make informed purchasing decisions.',
    url: `${baseUrl}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'DecisionRank',
      url: baseUrl,
      logo: `${baseUrl}/favicon.svg`,
      description:
        'An independent editorial platform that creates research-backed product rankings and comparisons across technology, home, fitness, and lifestyle categories.',
      foundingDate: '2025',
      knowsAbout: [
        'Product reviews',
        'Consumer electronics',
        'Product comparisons',
        'Editorial rankings',
      ],
      sameAs: [],
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      <Suspense
        fallback={
          <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between gap-4">
                <div className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
                  DecisionRank
                </div>
              </div>
            </div>
          </nav>
        }
      >
        <Navigation />
      </Suspense>

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'About' }]} />

          {/* Hero */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-foreground tracking-tight mb-6">
              About DecisionRank
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              We create independent, research-backed product rankings to help you
              cut through marketing noise and make purchasing decisions you
              won&apos;t regret.
            </p>
          </div>

          {/* Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
              Our Mission
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Shopping online is overwhelming. Thousands of options, paid
                placements disguised as recommendations, and review sites that
                prioritize affiliate commissions over accuracy. We started
                DecisionRank because we believed product research deserved
                better.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Our approach is straightforward: combine hard data —
                specifications, benchmarks, verified user feedback — with
                editorial judgment to produce rankings that genuinely help
                people choose the right products for their needs.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We organize everything around the questions real shoppers ask:
                &ldquo;What&apos;s the best robot vacuum?&rdquo;
                &ldquo;Which mechanical keyboard should I buy?&rdquo;
                &ldquo;What standing desk is worth the money?&rdquo; Then we do
                the homework so you don&apos;t have to.
              </p>
            </div>
          </section>

          {/* Values Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-8">
              What We Stand For
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {VALUES.map((value) => (
                <Card
                  key={value.title}
                  className="border-slate-200/50 bg-slate-50/30"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-slate-100 p-2.5 shrink-0">
                        <value.icon className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How It Works (brief, linking to methodology) */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
              How Our Rankings Work
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Each ranking is built on a structured evaluation process: research
              and discovery, data-driven scoring on a 0–100 scale, sentiment
              analysis from real users and experts, and an editorial verdict that
              synthesizes it all. Rankings are revisited regularly to stay
              current.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Want the full breakdown?{' '}
              <Link
                href="/how-we-rank"
                className="text-slate-600 underline hover:text-slate-800"
              >
                Read our detailed methodology
              </Link>
              .
            </p>
          </section>

          {/* Coverage */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
              What We Cover
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              DecisionRank covers product categories where unbiased, structured
              comparisons make the biggest difference — areas where the market is
              crowded, specs matter, and bad choices are costly:
            </p>
            <ul className="text-lg text-muted-foreground leading-relaxed list-disc pl-6 space-y-2">
              <li>
                <strong>Technology &amp; Electronics</strong> — laptops,
                keyboards, earbuds, monitors, and more
              </li>
              <li>
                <strong>Home &amp; Kitchen</strong> — robot vacuums, air
                purifiers, coffee makers, cookware
              </li>
              <li>
                <strong>Fitness &amp; Wellness</strong> — treadmills, massage
                guns, supplements, recovery gear
              </li>
              <li>
                <strong>Office &amp; Productivity</strong> — standing desks,
                ergonomic chairs, webcams
              </li>
            </ul>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              We&apos;re expanding into new categories regularly.{' '}
              <Link
                href="/categories"
                className="text-slate-600 underline hover:text-slate-800"
              >
                Browse all categories
              </Link>
              .
            </p>
          </section>

          {/* Contact / Transparency */}
          <section>
            <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a question about a ranking, want to suggest a product
              category, or noticed something we got wrong? We welcome feedback.
              Reach us at{' '}
              <a
                href="mailto:hello@decisionrank.com"
                className="text-slate-600 underline hover:text-slate-800"
              >
                hello@decisionrank.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
