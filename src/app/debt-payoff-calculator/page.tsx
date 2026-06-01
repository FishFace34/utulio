import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import DebtPayoffCalculator from '@/components/tools/DebtPayoffCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Debt Payoff Calculator — Snowball vs Avalanche',
  description:
    'See how fast you can become debt-free. Compare the snowball and avalanche methods with a month-by-month simulation. Free debt payoff planner.',
  path: '/debt-payoff-calculator',
  keywords: ['debt payoff calculator', 'debt snowball calculator', 'debt avalanche'],
});

const FAQS = [
  {
    question: 'What is the debt snowball method?',
    answer:
      'The debt snowball method pays off debts in order from smallest balance to largest, regardless of interest rate. You pay minimums on all debts and put any extra money toward the smallest balance. When it\'s paid off, you roll that payment to the next smallest. It provides motivational "wins" early in the process.',
  },
  {
    question: 'What is the debt avalanche method?',
    answer:
      'The debt avalanche method targets the debt with the highest interest rate first. You pay minimums on all debts and apply extra funds to the highest-rate balance. When it\'s eliminated, you move to the next highest rate. This approach minimizes total interest paid.',
  },
  {
    question: 'Which method saves the most money?',
    answer:
      'The avalanche method mathematically always saves the same or more money compared to the snowball method, because you eliminate the highest-cost debt first. However, the snowball method can be more effective for people who need motivational milestones to stay on track.',
  },
  {
    question: 'Should I pay off debt or save first?',
    answer:
      'A common strategy is to first build a small emergency fund (1–3 months of expenses), then aggressively pay off high-interest debt (above 6–7%). After that, redirect those payments to savings and investments. Carrying high-interest debt is effectively a guaranteed negative return on money you could be saving.',
  },
  {
    question: "What if my minimum payments don't cover interest?",
    answer:
      'If minimum payments are less than monthly interest accruing, your balance grows every month even when you pay. This is called negative amortization. You must increase payments above the monthly interest amount to make progress. The calculator warns you when this occurs.',
  },
  {
    question: 'How much extra should I pay each month?',
    answer:
      'Any extra payment accelerates your payoff significantly. Even $50–100 extra per month can shave years off your debt and save thousands in interest. Use the calculator to see exactly how different extra payment amounts affect your payoff date.',
  },
];

export default function DebtPayoffCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Debt Payoff Calculator',
      description: 'Compare snowball vs avalanche debt payoff strategies.',
      url: '/debt-payoff-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Debt Payoff Calculator', url: '/debt-payoff-calculator' },
    ]),
  ];

  const related = getRelatedTools('debt-payoff-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Debt Payoff Calculator"
          description="Enter your debts and see exactly when you'll be debt-free. Compare the snowball and avalanche methods side by side with a month-by-month simulation."
          category="Finance Tools"
          categoryVariant="business"
        />

        <DebtPayoffCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Snowball vs Avalanche: Which Is Better?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Both strategies work — they just prioritize different things. The <strong>avalanche method</strong>{' '}
            targets your highest-interest debt first, saving the maximum amount of money over time.
            The <strong>snowball method</strong> targets your smallest balance first, giving you quick
            wins that build momentum and motivation.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Research suggests that the psychological boost of the snowball method leads many people
            to actually stick with their debt payoff plan, even if it costs slightly more in interest.
            The &quot;best&quot; method is the one you will actually follow through with.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            For maximum interest savings, use the avalanche. For maximum motivation and quick wins,
            use the snowball. Either way, the most important factor is adding extra payments beyond
            the minimums as consistently as possible.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Debt Payoff FAQs" />
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
