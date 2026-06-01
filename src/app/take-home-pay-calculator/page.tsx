import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import TakeHomePayCalculator from '@/components/tools/TakeHomePayCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Take-Home Pay Calculator — Net Salary After Tax',
  description: 'Estimate your take-home pay after federal tax, state tax, and deductions. Free paycheck calculator.',
  path: '/take-home-pay-calculator',
  keywords: ['take home pay calculator', 'paycheck calculator', 'net salary calculator'],
});

const FAQS = [
  { question: 'What is take-home pay?', answer: 'Take-home pay (also called net pay) is the amount left in your paycheck after all deductions — federal income tax, state income tax, FICA (Social Security and Medicare), and any pre- or post-tax deductions like 401(k) contributions or health insurance premiums.' },
  { question: 'What is FICA tax?', answer: 'FICA stands for Federal Insurance Contributions Act. It covers two taxes: Social Security (6.2% of gross wages up to the annual wage base) and Medicare (1.45% of all wages). Together they total 7.65% and are automatically withheld from every paycheck. Self-employed workers pay the full 15.3%.' },
  { question: 'What are pre-tax deductions?', answer: 'Pre-tax deductions are contributions taken out of your paycheck before taxes are calculated, reducing your taxable income. Common examples include traditional 401(k) contributions, health insurance premiums (employer-sponsored), FSA and HSA contributions, and commuter benefits.' },
  { question: 'Why is this an estimate?', answer: 'This calculator uses flat tax rates that you enter manually, rather than the actual progressive tax brackets. Real withholding also depends on your W-4 filing status, any exemptions, additional income sources, and tax credits. The actual amount your employer withholds may differ. Use this as a planning guide, not a precise figure.' },
  { question: 'What is an effective tax rate?', answer: 'Your effective tax rate is the actual percentage of your gross income paid in taxes, after deductions. It is lower than your marginal (bracket) rate because not all income is taxed at the highest rate. For example, if your marginal rate is 22% but you have pre-tax deductions, your effective rate might be 18–19%.' },
  { question: 'How do I reduce my tax burden?', answer: 'Common strategies include maximizing pre-tax retirement contributions (401k, IRA), contributing to an HSA (triple tax advantage), using a dependent care FSA, claiming all eligible deductions and credits on your tax return, and potentially adjusting your W-4 withholding. Consult a tax professional for personalized advice.' },
];

export default function TakeHomePayPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Take-Home Pay Calculator', description: 'Estimate net salary after federal tax, state tax, and deductions.', url: '/take-home-pay-calculator', category: 'FinanceApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Take-Home Pay Calculator', url: '/take-home-pay-calculator' }]),
  ];
  const related = getRelatedTools('take-home-pay-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Take-Home Pay Calculator" description="Estimate your net paycheck after federal income tax, state tax, FICA, and deductions. Understand exactly where your money goes before it hits your account." category="Finance Tools" categoryVariant="finance" />
        <TakeHomePayCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How Paycheck Deductions Work</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Every paycheck goes through several layers of deductions before reaching your bank account. Understanding each layer helps you make smarter decisions about savings, benefits, and tax planning.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Pre-tax deductions</strong> (like 401k contributions and health insurance) come out first, reducing your taxable income. This means you pay less in income tax on the money you contribute. <strong className="text-zinc-900">FICA taxes</strong> (Social Security 6.2% + Medicare 1.45% = 7.65%) are applied to your gross income regardless of other deductions. <strong className="text-zinc-900">Income taxes</strong> are then applied to your adjusted gross income at your federal and state rates.</p>
          <p className="text-zinc-600 leading-relaxed">This calculator uses simplified flat rates for income tax. Real U.S. federal taxes use progressive brackets — your first dollars of income are taxed at a lower rate than your highest dollars. Enter your effective tax rate (your total income tax ÷ your gross income) for the most accurate estimate.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Take-Home Pay FAQs" /></div>
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
