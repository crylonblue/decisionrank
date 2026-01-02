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
                  4. Google Analytics
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    This website uses Google Analytics, a web analytics service provided by Google LLC ("Google"). Google Analytics uses cookies to analyze how visitors use our website.
                  </p>
                  <p>
                    The information generated by the cookie about your use of this website (including your IP address) will be transmitted to and stored by Google on servers in the United States. Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity for website operators, and providing other services relating to website activity and internet usage.
                  </p>
                  <p>
                    Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf. Google will not associate your IP address with any other data held by Google.
                  </p>
                  <p>
                    You may refuse the use of cookies by selecting the appropriate settings on your browser. However, please note that if you do this, you may not be able to use the full functionality of this website.
                  </p>
                  <p>
                    You can also opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on, available at:{' '}
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      https://tools.google.com/dlpage/gaoptout
                    </a>
                  </p>
                  <p>
                    For more information about how Google processes data, please refer to Google's Privacy Policy:{' '}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  5. YouTube
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our website embeds videos from YouTube, a service provided by Google LLC. When you view embedded YouTube videos on our website, YouTube may collect data about your interaction, including your IP address and viewing behavior.
                  </p>
                  <p>
                    If you are logged into your YouTube account, YouTube may associate your viewing behavior with your profile. To prevent this, you can log out of your YouTube account before accessing our website.
                  </p>
                  <p>
                    YouTube uses cookies and similar technologies to provide its services. For more information about how YouTube processes data, please refer to YouTube's Privacy Policy:{' '}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      https://policies.google.com/privacy
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  6. Affiliate Marketing and Links
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our website participates in affiliate marketing programs, including but not limited to Amazon Associates and other affiliate programs. This means that some links on our website are affiliate links.
                  </p>
                  <p>
                    When you click on an affiliate link and make a purchase, we may receive a commission at no additional cost to you. Affiliate links are identified by special tracking parameters (e.g., "tag=decisionrank-20" for Amazon links).
                  </p>
                  <p>
                    When you click on affiliate links, you will be redirected to third-party websites (such as Amazon or other retailers). These third-party websites have their own privacy policies and terms of service. We are not responsible for the privacy practices or content of these external websites.
                  </p>
                  <p>
                    We only recommend products that we believe are valuable to our users. Our editorial content and product rankings are independent of any affiliate relationships.
                  </p>
                  <p>
                    For more information about how these third-party services handle your data, please refer to their respective privacy policies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Amazon Privacy Policy:{' '}
                      <a 
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:underline"
                      >
                        https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ
                      </a>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  7. Cookies
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our website uses cookies and similar technologies to enhance your browsing experience, analyze website traffic, and provide personalized content. Cookies are small text files stored on your device.
                  </p>
                  <p>
                    We use the following types of cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential cookies:</strong> These are necessary for the website to function properly.</li>
                    <li><strong>Analytics cookies:</strong> These help us understand how visitors interact with our website (via Google Analytics).</li>
                    <li><strong>Third-party cookies:</strong> These are set by third-party services like YouTube and Google Analytics.</li>
                  </ul>
                  <p>
                    You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, and to delete cookies that have already been set. However, disabling certain cookies may limit the functionality of our website.
                  </p>
                  <p>
                    For more information about managing cookies, please visit:{' '}
                    <a 
                      href="https://www.allaboutcookies.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      https://www.allaboutcookies.org
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  8. Legal Basis for Processing (GDPR)
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Under the General Data Protection Regulation (GDPR), we process your personal data based on the following legal grounds:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Legitimate interests:</strong> We process data for analytics purposes (Google Analytics) based on our legitimate interest in improving our website and understanding user behavior.</li>
                    <li><strong>Consent:</strong> For certain cookies and tracking technologies, we rely on your consent, which you can withdraw at any time.</li>
                    <li><strong>Contractual necessity:</strong> Some data processing is necessary to provide you with access to our website.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  9. Data Retention
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    We retain your personal data only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <p>
                    Google Analytics data is retained according to Google's data retention policies. You can learn more about Google Analytics data retention at:{' '}
                    <a 
                      href="https://support.google.com/analytics/answer/7667196" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      https://support.google.com/analytics/answer/7667196
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  10. International Data Transfers
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Some of our service providers (such as Google Analytics and YouTube) are located outside the European Economic Area (EEA). When we transfer your data to these providers, we ensure appropriate safeguards are in place.
                  </p>
                  <p>
                    Google LLC has certified compliance with the EU-U.S. Data Privacy Framework and other applicable data transfer mechanisms to ensure an adequate level of data protection.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  11. Third-Party Services
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Our website integrates with third-party services including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Google Analytics (for website analytics)</li>
                    <li>YouTube (for embedded videos)</li>
                    <li>Amazon and other affiliate partners (for product links)</li>
                    <li>Supabase (for database hosting)</li>
                  </ul>
                  <p>
                    These third-party services have their own privacy policies. We encourage you to review their privacy policies to understand how they handle your data.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  12. Changes to This Privacy Policy
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last updated" date.
                  </p>
                  <p>
                    We encourage you to review this privacy policy periodically to stay informed about how we protect your information.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  13. Contact Us
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a 
                      href="mailto:hello@till.email" 
                      className="text-slate-600 hover:underline"
                    >
                      hello@till.email
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong><br />
                    Till Kemper<br />
                    Blütenstraße 19a<br />
                    80799 Munich<br />
                    Germany
                  </p>
                  <p className="mt-4">
                    You also have the right to lodge a complaint with a supervisory authority if you believe that our processing of your personal data violates applicable data protection laws. The relevant supervisory authority for Germany is:
                  </p>
                  <p>
                    <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong><br />
                    Promenade 18<br />
                    91522 Ansbach<br />
                    Germany<br />
                    Website:{' '}
                    <a 
                      href="https://www.lda.bayern.de" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:underline"
                    >
                      https://www.lda.bayern.de
                    </a>
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








