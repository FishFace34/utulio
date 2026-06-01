import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import MortgageCalculator from '@/components/tools/MortgageCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Mortgage Calculator — Monthly Payment & Amortization',
  description: 'Calculate your monthly mortgage payment including taxes, insurance, and PMI. Free amortization schedule.',
  path: '/mortgage-calculator',
  keywords: ['mortgage calculator', 'home loan calculator', 'monthly mortgage payment'],
});

const FAQS = [
  { question: 'What does PITI mean?', answer: 'PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a typical monthly mortgage payment. This calculator shows all four components plus optional PMI and HOA fees.' },
  { question: 'What is PMI and when do I need it?', answer: 'Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. It protects the lender if you default. PMI typically costs 0.5%–1.5% of the loan amount per year. Once you reach 20% equity, you can usually request to remove it.' },
  { question: 'Is a 15-year or 30-year mortgage better?', answer: 'A 15-year mortgage has higher monthly payments but you pay significantly less total interest and build equity faster. A 30-year mortgage has lower monthly payments but costs much more in interest over the life of the loan. The best choice depends on your cash flow and financial goals.' },
  { question: 'How much house can I afford?', answer: 'A common rule is that your total monthly housing costs (PITI) should not exceed 28% of your gross monthly income. Lenders also look at your total debt-to-income ratio, which ideally stays below 36–43%. Use this calculator to test different home prices until you find a payment that fits your budget.' },
  { question: 'How does making extra payments help?', answer: 'Extra payments go directly toward reducing your principal balance, which reduces the interest charged each month. Even small extra payments can save thousands in interest and shorten your loan term by years. Some lenders allow extra payments without penalty — check your loan terms.' },
  { question: 'What is an amortization schedule?', answer: 'An amortization schedule shows how each monthly payment is split between principal and interest over the life of the loan. Early payments are mostly interest; later payments are mostly principal. This calculator shows a simplified annual snapshot of the full schedule.' },
];

export default function MortgageCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Mortgage Calculator', description: 'Calculate monthly mortgage payment including P&I, taxes, insurance, and PMI.', url: '/mortgage-calculator', category: 'FinanceApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Mortgage Calculator', url: '/mortgage-calculator' }]),
  ];
  const related = getRelatedTools('mortgage-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Mortgage Calculator" description="Calculate your complete monthly mortgage payment — principal, interest, taxes, insurance, PMI, and HOA. See the full amortization schedule instantly." category="Finance Tools" categoryVariant="finance" />
        <MortgageCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Understanding Your Mortgage Payment</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">A mortgage payment is more than just principal and interest. The full payment — often called PITI — includes four components: the principal you owe, the interest charged on that principal, property taxes collected monthly and paid to the government, and homeowner&apos;s insurance. If your down payment is less than 20%, lenders typically require PMI (Private Mortgage Insurance) as well.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This calculator uses the standard amortization formula to compute your principal &amp; interest payment: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1]</code>, where P is the loan amount, r is the monthly interest rate, and n is the number of payments.</p>
          <p className="text-zinc-600 leading-relaxed">For a $400,000 home with $80,000 down at 6.5% for 30 years, the principal &amp; interest payment is approximately $2,023/month. Add in taxes, insurance, and other costs to get the full picture of your housing budget.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Mortgage FAQs" /></div>
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
