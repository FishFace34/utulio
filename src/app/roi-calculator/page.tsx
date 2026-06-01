import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import ROICalculator from '@/components/tools/ROICalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'ROI Calculator — Return on Investment & Annualized ROI',
  description:
    'Calculate return on investment (ROI) and annualized ROI (CAGR) for any investment or business decision. Free tool.',
  path: '/roi-calculator',
  keywords: ['roi calculator', 'return on investment', 'annualized roi'],
});

const FAQS = [
  {
    question: 'How do I calculate ROI?',
    answer:
      'ROI = (Final Value − Initial Investment) ÷ Initial Investment × 100. If you invested $10,000 and it grew to $15,000, your ROI is ($15,000 − $10,000) ÷ $10,000 × 100 = 50%. This is the simple, total ROI over the entire period.',
  },
  {
    question: 'What is a good ROI?',
    answer:
      'It depends on the investment type and risk level. Stock market investments historically return 7–10% annually (adjusted for inflation). Real estate might return 8–12%. A business investment with 20–30% ROI is generally considered strong. The "good" threshold also depends on how long the money is invested.',
  },
  {
    question: "What's the difference between ROI and annualized ROI?",
    answer:
      'Simple ROI is the total return over the entire investment period, regardless of duration. Annualized ROI (CAGR — Compound Annual Growth Rate) converts the total return into an equivalent yearly rate. This allows fair comparison between investments of different durations.',
  },
  {
    question: 'Why use annualized ROI?',
    answer:
      'A 50% ROI sounds great, but if it took 5 years, the annualized return is only about 8.45% per year. Compare this to another investment with 30% ROI over 2 years, which is 14.02% annualized. Annualized ROI lets you compare apples to apples across different time horizons.',
  },
  {
    question: 'Does ROI account for risk?',
    answer:
      'No, simple ROI doesn\'t account for investment risk, volatility, or the time value of money (beyond the annualized calculation). More sophisticated metrics like risk-adjusted return or Sharpe ratio factor in risk. For personal financial decisions, compare ROI in context of the risk involved.',
  },
  {
    question: 'Can ROI be negative?',
    answer:
      'Yes, ROI is negative when the final value is less than the initial investment — meaning you lost money. For example, if you invested $10,000 and it declined to $7,000, your ROI is −30%. This calculator correctly handles negative ROI scenarios.',
  },
];

export default function ROICalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'ROI Calculator',
      description: 'Calculate return on investment and annualized ROI (CAGR).',
      url: '/roi-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'ROI Calculator', url: '/roi-calculator' },
    ]),
  ];

  const related = getRelatedTools('roi-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="ROI Calculator"
          description="Calculate your return on investment (ROI) and annualized ROI (CAGR) for any investment. Compare performance across different time periods with instant results."
          category="Finance Tools"
          categoryVariant="business"
        />

        <ROICalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">ROI vs Annualized ROI: Why Both Matter</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Total ROI tells you the percentage gain on an investment, but it doesn&apos;t tell you how
            efficient that gain was over time. A 100% ROI sounds impressive — but if it took 20 years,
            the annualized return is only 3.53% per year, which barely beats inflation.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Annualized ROI (also called CAGR — Compound Annual Growth Rate) converts your total return
            into an equivalent yearly rate. This is the standard way professionals compare investments
            across different time periods. Formula: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">CAGR = (Final/Initial)^(1/years) − 1</code>.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            For example, an investment that grew from $10,000 to $15,000 in 3 years has a 50% total
            ROI and a 14.47% annualized ROI — meaning it grew at the same pace as a savings account
            returning 14.47% every year for 3 years.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="ROI FAQs" />
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
