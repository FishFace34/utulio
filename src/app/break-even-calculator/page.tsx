import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import BreakEvenCalculator from '@/components/tools/BreakEvenCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Break-Even Point Calculator — Units & Revenue',
  description:
    'Find your break-even point in units and revenue. Free calculator for small businesses, startups, and freelancers.',
  path: '/break-even-calculator',
  keywords: ['break even calculator', 'break even point', 'break even analysis'],
});

const FAQS = [
  {
    question: 'What is the break-even point?',
    answer:
      'The break-even point is the level of sales at which total revenue equals total costs — meaning no profit and no loss. Below break-even, you lose money. Above break-even, every additional unit sold is pure profit (contribution margin). It\'s the minimum you must sell to cover all your costs.',
  },
  {
    question: 'How do I calculate break-even in units?',
    answer:
      'Break-Even Units = Fixed Costs ÷ Contribution Margin per Unit. The contribution margin per unit is: Selling Price − Variable Cost per Unit. If fixed costs are $10,000, price is $50, and variable cost is $20, the contribution margin is $30 and break-even is 10,000 ÷ 30 = 333.33 → rounded up to 334 units.',
  },
  {
    question: 'What is contribution margin?',
    answer:
      'Contribution margin is the amount each unit sold contributes toward covering fixed costs and generating profit. It\'s calculated as: Selling Price − Variable Cost per Unit. Once you sell enough units to cover fixed costs (break-even), every additional unit sold generates profit equal to the contribution margin.',
  },
  {
    question: 'How can I lower my break-even point?',
    answer:
      'You can lower your break-even point by: (1) reducing fixed costs (rent, salaries, software), (2) reducing variable costs per unit (better supplier deals, efficiency), (3) raising your selling price, or (4) a combination. This calculator shows the immediate impact of any of these changes.',
  },
  {
    question: "What's the difference between fixed and variable costs?",
    answer:
      'Fixed costs remain constant regardless of how much you produce or sell — rent, salaries, insurance, and subscriptions are examples. Variable costs change proportionally with output — materials, shipping, and per-unit labor costs are variable. Break-even analysis separates these two types.',
  },
  {
    question: 'Why is break-even important for a business?',
    answer:
      'Break-even analysis tells you the minimum viable sales volume for your business to survive. It helps with pricing decisions, cost management, and evaluating new products. Investors and lenders often ask for break-even analysis because it shows you understand your cost structure and have a path to profitability.',
  },
];

export default function BreakEvenCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Break-Even Calculator',
      description: 'Calculate break-even point in units and revenue for any business.',
      url: '/break-even-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Break-Even Calculator', url: '/break-even-calculator' },
    ]),
  ];

  const related = getRelatedTools('break-even-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Break-Even Point Calculator"
          description="Find your break-even point in units and revenue. Enter your fixed costs, price, and variable costs to instantly see how much you need to sell to start making a profit."
          category="Finance Tools"
          categoryVariant="business"
        />

        <BreakEvenCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Understanding Break-Even Analysis</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Break-even analysis is one of the most fundamental tools in business finance. It answers
            the critical question: &quot;How much do I need to sell just to cover my costs?&quot; Until you
            reach break-even, every sale reduces your losses. After break-even, every sale adds to
            your profit.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            The key concept is <strong>contribution margin</strong> — the amount each unit contributes
            to covering fixed costs after variable costs are paid. If you sell a product for $50 and
            it costs $20 to produce, each unit contributes $30 toward your fixed overhead and
            eventually toward profit.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Break-even analysis is especially valuable when launching a new product, evaluating a
            price change, or planning how many hours you need to bill as a freelancer to cover your
            monthly business expenses.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Break-Even FAQs" />
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
