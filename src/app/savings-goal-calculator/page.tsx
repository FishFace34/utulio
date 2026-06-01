import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import SavingsGoalCalculator from '@/components/tools/SavingsGoalCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Savings Goal Calculator — Reach Your Target',
  description: 'Find out how much to save each month to reach your goal, or when you will reach it. Free savings planner.',
  path: '/savings-goal-calculator',
  keywords: ['savings goal calculator', 'savings calculator', 'how much to save'],
});

const FAQS = [
  { question: 'How do I calculate how much to save per month?', answer: 'This calculator uses the future value of annuity formula: FV = PV(1+r)ⁿ + PMT × [((1+r)ⁿ - 1)/r], solved for PMT. It accounts for both your initial savings (which also compound) and your regular monthly contributions. Enter your goal, current savings, time horizon, and expected interest rate.' },
  { question: 'What interest rate should I use for a savings account?', answer: 'For a high-yield savings account or money market account, use 4–5% in the current environment. For a certificate of deposit (CD), use the actual rate offered. For an investment account (stocks/bonds mix), 6–8% is a common long-term assumption. For a basic savings account, 0.5–1% may be realistic.' },
  { question: 'How long will it take to save $20,000?', answer: 'It depends on your current savings and monthly contribution. Saving $500/month with $2,000 already saved at 4% interest: about 3 years and 2 months. At $1,000/month: about 1 year and 6 months. Use the "When will I reach it?" mode to calculate your specific timeline based on your planned monthly savings.' },
  { question: 'What is the best way to reach a savings goal faster?', answer: 'Three levers: increase your monthly contribution, increase your starting balance (lump sum), or increase your return rate (use higher-yield accounts or investments). Of these, increasing your monthly contribution typically has the biggest impact over shorter time horizons. Automating savings (direct deposit to savings) is the most effective way to stay consistent.' },
  { question: 'Should I pay off debt or save?', answer: 'It depends on the interest rates. If your debt interest rate is higher than your expected savings return (e.g., credit card debt at 20% vs. savings at 4%), prioritize debt payoff — it offers a guaranteed "return" equal to the interest rate avoided. For low-rate debt (mortgage, student loans under 4%), saving and investing simultaneously may make sense. Check our Debt Payoff Calculator for a full comparison.' },
  { question: 'Can I save for multiple goals at once?', answer: 'Yes, but you need to prioritize and allocate your savings across goals. Run this calculator separately for each goal to see the required monthly contribution. Common goals: emergency fund (3–6 months expenses), vacation, car down payment, home down payment, and retirement. Many financial advisors recommend automating separate savings accounts for each major goal.' },
];

export default function SavingsGoalCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Savings Goal Calculator', description: 'Calculate how much to save monthly to reach a financial goal.', url: '/savings-goal-calculator', category: 'FinanceApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Savings Goal Calculator', url: '/savings-goal-calculator' }]),
  ];
  const related = getRelatedTools('savings-goal-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Savings Goal Calculator" description="Two modes: find out how much you need to save each month to hit your goal by a deadline, or see exactly when you will reach your target at your current savings rate." category="Finance Tools" categoryVariant="finance" />
        <SavingsGoalCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How to Plan Your Savings Goal</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Reaching any financial goal starts with a clear monthly target. This calculator solves the future value of annuity equation in reverse — given your goal, time horizon, and expected return, it calculates exactly how much you need to set aside each month. Your existing savings also compound over time, reducing the additional contribution needed.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">For example, to save $20,000 for a home down payment in 3 years with $5,000 already saved at 4% interest, you need approximately $360/month. Start with a savings account that earns a competitive interest rate to accelerate your progress without taking on investment risk.</p>
          <p className="text-zinc-600 leading-relaxed">The second mode (&quot;When will I reach it?&quot;) is useful if you have a fixed monthly savings amount and want to know your timeline. It simulates month-by-month growth until your balance reaches the goal, capped at 100 years to prevent infinite loops.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Savings Goal FAQs" /></div>
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div>
          </section>
        )}
      </Container>
    </>
  );
}
