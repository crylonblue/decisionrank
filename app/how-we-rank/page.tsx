import { Suspense } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import { getBaseUrl, generateBreadcrumbJsonLd, generateHowWeRankJsonLd, generateFAQJsonLd } from '@/lib/seo';
import { Search, BarChart3, MessageSquare, Shield, RefreshCw, Scale } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/how-we-rank`;

  return {
    title: 'How We Rank — Our Methodology',
    description:
      'Learn how DecisionRank evaluates and ranks products. Our transparent, research-backed methodology covers sourcing, scoring, and editorial independence.',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: 'How We Rank — Our Methodology | DecisionRank',
      description:
        'Learn how DecisionRank evaluates and ranks products. Our transparent, research-backed methodology covers sourcing, scoring, and editorial independence.',
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'How We Rank — Our Methodology | DecisionRank',
      description:
        'Learn how DecisionRank evaluates and ranks products.',
    },
  };
}

const steps = [
  {
    icon: Search,
    title: 'Research & Discovery',
    description:
      'Every ranking begins with thorough market research. We identify the products that matter most in a category by analyzing market share, consumer interest, and expert coverage. We cast a wide net so no strong contender is left out.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Scoring',
    description:
      'Each product receives a DecisionRank score from 0 to 100 based on weighted criteria specific to its category. We evaluate specifications, real-world performance benchmarks, value for money, and reliability data. Scores are normalized so they are comparable within a ranking.',
  },
  {
    icon: MessageSquare,
    title: 'Sentiment Analysis',
    description:
      'We aggregate thousands of verified user reviews and expert opinions to surface the most common pros and cons. This sentiment layer captures real-world experiences that raw specs alone cannot reveal — things like build quality, customer support, and long-term durability.',
  },
  {
    icon: Scale,
    title: 'Editorial Verdict',
    description:
      'Our editors synthesize the quantitative scores and qualitative sentiment into a final ranking order. When products are close in score, editorial judgment breaks ties based on factors like ecosystem compatibility, brand track record, and value trajectory.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Updates',
    description:
      'Markets evolve, and so do our rankings. We revisit each ranking periodically to incorporate new product releases, price changes, firmware updates, and shifting user sentiment. Every ranking page shows when it was last updated.',
  },
  {
    icon: Shield,
    title: 'Editorial Independence',
    description:
      'DecisionRank does not accept payment for placement or favorable reviews. Our rankings are editorially independent. If we partner with retailers through affiliate links in the future, those relationships will never influence product scores or ranking positions.',
  },
];

export default function HowWeRankPage() {
  const baseUrl = getBaseUrl();

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'How We Rank', url: `${baseUrl}/how-we-rank` },
  ]);

  const howToJsonLd = generateHowWeRankJsonLd();

  const faqJsonLd = generateFAQJsonLd([
    {
      question: 'Do you test every product in-house?',
      answer:
        'We combine hands-on evaluation with aggregated data from trusted third-party reviewers and verified user feedback. Where in-house testing is not feasible, we weight sources by credibility and recency.',
    },
    {
      question: 'How often are rankings updated?',
      answer:
        'We aim to revisit every ranking at least quarterly. High-traffic categories like smartphones and laptops may be updated more frequently as new models launch.',
    },
    {
      question: 'Can manufacturers influence their score?',
      answer:
        'No. DecisionRank scores are determined solely by our research process. We do not accept payment for higher placement or adjust scores based on manufacturer relationships.',
    },
    {
      question: 'I think a ranking is wrong. How can I provide feedback?',
      answer:
        'We welcome feedback. If you believe a product is misrepresented or missing, reach out through our contact details on the Imprint page. Every suggestion is reviewed by our editorial team.',
    },
  ]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          {/* Breadcrumb navigation */}
          <Breadcrumbs items={[{ label: 'How We Rank' }]} />

          {/* Page header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              How We Rank
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Transparency is at the core of what we do. Here&apos;s a look inside
              our ranking methodology — from initial research to final verdict.
            </p>
          </div>

          {/* Score explainer */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Understanding DecisionRank Scores
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every ranked product receives a <strong>DecisionRank score between 0 and 100</strong>.
              The score is a composite metric that weighs category-specific criteria — for example,
              a laptop ranking might weight battery life and display quality more heavily, while a
              kitchen appliance ranking emphasizes build quality and ease of cleaning. Scores are
              relative within a ranking: an 85 in one category is not directly comparable to an 85
              in another.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-green-200 bg-green-50/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">80–100</div>
                  <div className="text-sm font-medium text-green-700">Excellent</div>
                  <p className="text-xs text-green-600 mt-2">
                    Outstanding in nearly every evaluated criterion.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-amber-700 mb-1">50–79</div>
                  <div className="text-sm font-medium text-amber-700">Good</div>
                  <p className="text-xs text-amber-600 mt-2">
                    Solid performers with some trade-offs to consider.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50/50">
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-red-700 mb-1">0–49</div>
                  <div className="text-sm font-medium text-red-700">Below Average</div>
                  <p className="text-xs text-red-600 mt-2">
                    Notable weaknesses or limited value for most buyers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Methodology steps */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Our Process
            </h2>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={step.title} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          <span className="text-muted-foreground mr-2">{index + 1}.</span>
                          {step.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-18 sm:pl-[4.5rem]">
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* FAQ-like section for common questions */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Do you test every product in-house?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We combine hands-on evaluation with aggregated data from trusted third-party
                  reviewers and verified user feedback. Where in-house testing is not feasible,
                  we weight sources by credibility and recency.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  How often are rankings updated?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We aim to revisit every ranking at least quarterly. High-traffic categories
                  like smartphones and laptops may be updated more frequently as new models
                  launch.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  Can manufacturers influence their score?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  No. DecisionRank scores are determined solely by our research process. We do
                  not accept payment for higher placement or adjust scores based on
                  manufacturer relationships.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  I think a ranking is wrong. How can I provide feedback?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We welcome feedback. If you believe a product is misrepresented or missing,
                  reach out through our contact details on the{' '}
                  <Link href="/imprint" className="text-slate-600 underline hover:text-slate-800">
                    Imprint page
                  </Link>
                  . Every suggestion is reviewed by our editorial team.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-8 border-t border-border/40">
            <p className="text-muted-foreground mb-4">
              Ready to find your next product?
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Browse All Categories
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
