import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FAQ } from '@/lib/supabase';

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card 
            key={faq.id} 
            className="border-slate-200/50 bg-slate-50/30 transition-all hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-700">
                {faq.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

