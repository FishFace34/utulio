import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import ProfitMarginCalculator from '@/components/tools/ProfitMarginCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Profit Margin Calculator — Markup, Margin & Profit',
  description:
    'Calculate profit margin, markup percentage, and gross profit instantly. Free tool for businesses and freelancers.',
  path: '/profit-margin-calculator',
  keywords: ['profit margin calculator', 'markup calculator', 'gross margin'],
});

const FAQS = [
  {
    question: "What's the difference between margin and markup?",
    answer:
      'Margin is profit expressed as a percentage of the selling price. Markup is profit expressed as a percentage of the cost. For example, if cost is $50 and price is $80: margin = $30/$80 = 37.5%, markup = $30/$50 = 60%. Margin is always lower than markup for the same transaction.',
  },
  {
    question: 'How do I calculate profit margin?',
    answer:
      'Profit margin = (Selling Price − Cost) ÷ Selling Price × 100. If you sell a product for $100 that costs you $60 to produce, your profit margin is ($100 − $60) ÷ $100 × 100 = 40%. This is also called "gross margin" in business contexts.',
  },
  {
    question: "What's a good profit margin?",
    answer:
      'It varies significantly by industry. Retail businesses often operate at 2–10% net margin. Software and SaaS companies can achieve 60–80% gross margins. Service businesses typically range from 20–40%. As a freelancer or consultant, target margins of 20–40% above your base cost to account for business expenses.',
  },
  {
    question: 'How do I set my price from a target margin?',
    answer:
      'Use the reverse formula: Price = Cost ÷ (1 − Target Margin %). To achieve a 40% margin on a $60 cost: Price = $60 ÷ (1 − 0.40) = $60 ÷ 0.60 = $100. This calculator\'s "Cost & Target Margin" mode does this automatically.',
  },
  {
    question: 'Why is margin always lower than markup?',
    answer:
      'Because they use different bases. Margin divides profit by the (larger) selling price, while markup divides by the (smaller) cost. The same profit amount becomes a smaller percentage when divided by a larger number. This is why a 60% markup does not give you a 60% margin — it gives you 37.5%.',
  },
  {
    question: 'Does this include taxes?',
    answer:
      'No, this calculator computes gross profit margin, which is before taxes, operating expenses, and overhead. Net profit margin (after all expenses) will be lower. For accurate business planning, account for all your costs including taxes, salaries, rent, and software subscriptions.',
  },
];

export default function ProfitMarginCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Profit Margin Calculator',
      description: 'Calculate profit margin, markup, and gross profit for any product or service.',
      url: '/profit-margin-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Profit Margin Calculator', url: '/profit-margin-calculator' },
    ]),
  ];

  const related = getRelatedTools('profit-margin-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Profit Margin Calculator"
          description="Calculate gross profit, profit margin percentage, and markup for any product or service. Switch between Cost & Price mode and Cost & Target Margin mode."
          category="Finance Tools"
          categoryVariant="business"
        />

        <ProfitMarginCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Margin vs Markup: What&apos;s the Difference?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Margin and markup are two ways of expressing the same profit — but they use different
            reference points. <strong>Margin</strong> divides profit by the selling price.
            <strong> Markup</strong> divides profit by the cost. Because cost is always lower than
            selling price, the markup percentage is always higher than the margin percentage for the
            same transaction.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            This distinction matters in business conversations. When a buyer asks &quot;what&apos;s your margin?&quot;
            and you say &quot;60%&quot;, they may expect to pay significantly less, thinking you&apos;re marking up
            from cost by 60%. But 60% markup from a $50 cost is an $80 price — a 37.5% margin.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Always clarify whether margins or markups are being discussed to avoid miscommunication
            in pricing negotiations.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Profit Margin FAQs" />
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
