import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import CompoundInterestCalculator from '@/components/tools/CompoundInterestCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Compound Interest Calculator — Grow Your Savings',
  description:
    'Calculate compound interest with regular contributions. See how your investment grows year by year with a visual chart. Free calculator.',
  path: '/compound-interest-calculator',
  keywords: ['compound interest calculator', 'investment calculator', 'savings calculator'],
});

const FAQS = [
  {
    question: 'How does compound interest work?',
    answer:
      'Compound interest means you earn interest on both your original principal AND on the interest you\'ve already earned. Over time, this creates exponential growth — your money grows faster and faster. Einstein reportedly called compound interest the "eighth wonder of the world."',
  },
  {
    question: "What's the difference between simple and compound interest?",
    answer:
      'Simple interest is calculated only on the original principal amount. Compound interest is calculated on the principal plus all previously earned interest. Over long periods, compound interest grows dramatically larger than simple interest.',
  },
  {
    question: 'How often should interest compound?',
    answer:
      'More frequent compounding means slightly more growth. Daily compounding produces slightly more than monthly, which produces slightly more than quarterly. However, the difference becomes less significant at lower interest rates. The most important factor is the annual rate, not how often it compounds.',
  },
  {
    question: 'Why are regular contributions so powerful?',
    answer:
      'Regular monthly contributions benefit from compound growth just like your original investment. Every dollar you contribute starts compounding immediately. A $200/month contribution over 20 years at 7% annual return doesn\'t just add up to $48,000 — it can grow to over $100,000 due to compounding.',
  },
  {
    question: "What's a realistic rate of return?",
    answer:
      'Historical long-term stock market returns (S&P 500) have averaged around 7–10% annually after inflation adjustment. Savings accounts and CDs offer 3–5%. Bonds typically return 2–5%. Your actual return depends heavily on your asset allocation and time horizon. Always use conservative estimates for financial planning.',
  },
  {
    question: 'How long until my money doubles? (Rule of 72)',
    answer:
      'The Rule of 72 gives a quick estimate: divide 72 by your annual interest rate to find the approximate years to double. At 7%, money doubles in about 72 ÷ 7 = ~10.3 years. At 10%, it doubles in ~7.2 years. This works because of the nature of exponential growth.',
  },
];

export default function CompoundInterestCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Compound Interest Calculator',
      description: 'Calculate how savings grow with compound interest and regular contributions.',
      url: '/compound-interest-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Compound Interest Calculator', url: '/compound-interest-calculator' },
    ]),
  ];

  const related = getRelatedTools('compound-interest-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Compound Interest Calculator"
          description="See how your money grows over time with compound interest and regular contributions. Enter your starting amount, monthly savings, and expected return to project your future wealth."
          category="Finance Tools"
          categoryVariant="business"
        />

        <CompoundInterestCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">The Power of Compound Growth</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Compound interest is the most powerful concept in personal finance. Unlike simple
            interest, which only grows your original principal, compound interest allows your
            earnings to earn earnings. The longer your money compounds, the more dramatic the effect.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Consider two people who both invest $200/month at 7% annual return. Person A starts at
            age 25 and invests for 40 years. Person B starts at age 35 and invests for 30 years.
            Person A ends up with roughly <strong>2.5x more money</strong>, despite only investing
            for 10 extra years. That extra decade of compounding makes an enormous difference.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Starting early — even with small amounts — is far more powerful than starting later with
            larger contributions. Time is the most valuable ingredient in compound growth.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Compound Interest FAQs" />
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
