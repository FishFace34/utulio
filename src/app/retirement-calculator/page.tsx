import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RetirementCalculator from '@/components/tools/RetirementCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Retirement Calculator — How Much Will You Save?',
  description: 'Calculate how much you will have at retirement based on contributions and returns. Free retirement planner.',
  path: '/retirement-calculator',
  keywords: ['retirement calculator', 'retirement savings', '401k calculator'],
});

const FAQS = [
  { question: 'How much do I need to retire?', answer: 'A widely used rule of thumb is the "25x rule" — save 25 times your expected annual expenses. If you plan to spend $60,000/year in retirement, you need $1.5 million. This is based on the 4% withdrawal rule, which suggests you can safely withdraw 4% of your portfolio each year without running out of money over a 30-year retirement.' },
  { question: 'What is the 4% rule?', answer: 'The 4% rule (also called the "safe withdrawal rate") suggests that retirees can withdraw 4% of their portfolio in year one and adjust for inflation each subsequent year, with a high probability of not running out of money over a 30-year period. It is based on historical stock and bond market returns. This calculator uses the 4% rule to estimate monthly retirement income.' },
  { question: 'How much should I save each month?', answer: 'A common guideline is to save 15% of your gross income for retirement, including any employer match. The earlier you start, the less you need to save each month due to compound growth. For example, saving $300/month starting at age 25 at 7% return yields more than saving $600/month starting at 35.' },
  { question: 'What return rate should I use?', answer: 'The U.S. stock market has historically returned about 10% annually before inflation, or roughly 7% after inflation adjustment. A diversified portfolio of stocks and bonds might average 6–8%. More conservative estimates use 5–6%. For planning purposes, 7% (inflation-adjusted) is a commonly used benchmark.' },
  { question: 'What is a 401(k) and how does it help?', answer: 'A 401(k) is an employer-sponsored retirement savings account in the U.S. Contributions are made pre-tax (reducing your current taxable income), and the investments grow tax-deferred until withdrawal. Many employers match a portion of your contributions — this is essentially free money. In 2025, the annual contribution limit is $23,500 ($31,000 if age 50+).' },
  { question: 'Can I retire early?', answer: 'Early retirement (before 65) is achievable with higher savings rates and lower expenses. The FIRE movement (Financial Independence, Retire Early) aims for a 25–50% savings rate. The key factors are: how much you save, your investment returns, and your planned annual spending in retirement. Use this calculator to model different scenarios.' },
];

export default function RetirementCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Retirement Calculator', description: 'Calculate retirement savings based on contributions and investment returns.', url: '/retirement-calculator', category: 'FinanceApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Retirement Calculator', url: '/retirement-calculator' }]),
  ];
  const related = getRelatedTools('retirement-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Retirement Calculator" description="Project your retirement savings with compound growth. See how your monthly contributions and investment returns add up over decades — and estimate your monthly income using the 4% rule." category="Finance Tools" categoryVariant="finance" />
        <RetirementCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">The Power of Starting Early</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Compound interest is often called the &quot;eighth wonder of the world.&quot; The difference between starting at 25 vs. 35 is enormous. Starting at 25 with $500/month at 7% return yields approximately $1.3 million by age 65. Starting at 35 with the same amount yields only $610,000 — less than half — despite only 10 fewer years of saving.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This calculator uses month-by-month compound growth simulation: each month, your balance grows by the monthly interest rate, and your contribution is added. This is more accurate than simple lump-sum formulas for regular contributions.</p>
          <p className="text-zinc-600 leading-relaxed">The estimated monthly retirement income uses the 4% rule: multiply your total portfolio by 4%, then divide by 12. This rate has historically supported withdrawals for 30+ years across most market scenarios. Note that individual results depend on actual market returns, which can vary significantly from historical averages.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Retirement Calculator FAQs" /></div>
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
