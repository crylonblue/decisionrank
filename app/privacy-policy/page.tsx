import Link from 'next/link';
import { Suspense } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';
import { getBaseUrl, generateBreadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | DecisionRank',
  description: 'Privacy policy and data protection information for DecisionRank',
};

export default function PrivacyPolicyPage() {
  const baseUrl = getBaseUrl();
  
  // Generate breadcrumb JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Privacy Policy', url: `${baseUrl}/privacy-policy` },
  ];
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <>
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  1. Data Protection Overview
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    The following gives a simple overview of what happens to your personal information when you visit our website. Personal information is any data with which you could be personally identified.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  2. Data Collection on Our Website
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="text-xl font-medium text-foreground">Who is responsible for the data collection on this website?</h3>
                  <p>
                    The data collected on this website are processed by the website operator. The operator's contact details can be found in the website's imprint section.
                  </p>
                  <h3 className="text-xl font-medium text-foreground mt-4">How do we collect your data?</h3>
                  <p>
                    Some data are collected when you provide it to us. This could, for example, be data you enter on a contact form.
                  </p>
                  <p>
                    Other data are collected automatically by our IT systems when you visit the website. These data are primarily technical data such as the browser and operating system you are using or when you accessed the page. These data are collected automatically as soon as you enter our website.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  3. Your Rights
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Request information about your personal data we process</li>
                    <li>Request rectification of inaccurate personal data</li>
                    <li>Request erasure of your personal data</li>
                    <li>Request restriction of processing of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-4">
                    If you have any questions about data protection, please contact us using the information provided in the imprint section.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  4. Analytics and Tracking
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    This website may use analytics tools to collect information about how visitors use our site. This helps us improve our website and provide a better user experience.
                  </p>
                  <p>
                    We respect your privacy and comply with applicable data protection regulations. You can opt out of certain tracking technologies through your browser settings.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. Cookies
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our website may use cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us provide certain features and functionality.
                  </p>
                  <p>
                    You can control cookie settings through your browser preferences. However, disabling cookies may limit some functionality of our website.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Third-Party Services
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our website may include links to third-party websites or integrate third-party services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Changes to This Privacy Policy
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Contact Us
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    If you have any questions about this privacy policy or our data practices, please contact us using the information provided in the imprint section.
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}








