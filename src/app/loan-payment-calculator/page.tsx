import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import LoanCalculator from '@/components/tools/LoanCalculator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';
import ToolCard from '@/components/ui/ToolCard';

export const metadata: Metadata = toolMetadata({
  title: 'Loan Payment Calculator — Monthly Payments & Total Interest',
  description:
    'Calculate your monthly loan payment, total interest, and full amortization schedule. Free, instant, no signup.',
  path: '/loan-payment-calculator',
  keywords: ['loan calculator', 'loan payment calculator', 'monthly payment calculator'],
});

const FAQS = [
  {
    question: 'How is a loan payment calculated?',
    answer:
      'Monthly loan payments are calculated using the standard amortization formula: M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments. This formula ensures that each payment covers both interest for that month and a portion of the principal.',
  },
  {
    question: 'What is amortization?',
    answer:
      'Amortization is the process of paying off a loan in fixed installments over time. Early payments are mostly interest, while later payments go primarily toward the principal. An amortization schedule shows exactly how much of each payment goes to interest vs. principal each month.',
  },
  {
    question: 'How can I lower my monthly payment?',
    answer:
      'You can lower monthly payments by: (1) extending the loan term, (2) making a larger down payment to reduce the principal, (3) finding a lower interest rate through better credit or shopping lenders, or (4) making extra payments to reduce principal faster.',
  },
  {
    question: 'Does paying extra reduce total interest?',
    answer:
      'Yes — paying extra reduces your principal balance faster, which in turn reduces the amount of interest calculated each month. Even small extra payments can save thousands in interest over the life of a loan and shorten the payoff period.',
  },
  {
    question: "What's the difference between APR and interest rate?",
    answer:
      'The interest rate is the basic cost of borrowing the principal, expressed as a percentage per year. APR (Annual Percentage Rate) is broader — it includes the interest rate plus other fees like origination fees and closing costs. APR gives a more complete picture of the true cost of a loan.',
  },
  {
    question: 'Is this calculator accurate for any loan type?',
    answer:
      'This calculator uses standard amortization and is accurate for most personal loans, auto loans, and fixed-rate mortgages. It may not account for variable rates, balloon payments, or fees that some lenders charge. Always verify with your lender for exact figures.',
  },
];

export default function LoanPaymentCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Loan Payment Calculator',
      description: 'Calculate monthly loan payments and amortization schedule.',
      url: '/loan-payment-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Loan Payment Calculator', url: '/loan-payment-calculator' },
    ]),
  ];

  const related = getRelatedTools('loan-payment-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Loan Payment Calculator"
          description="Calculate your exact monthly loan payment, total interest paid, and full amortization schedule for any loan — instantly and free."
          category="Finance Tools"
          categoryVariant="business"
        />

        <LoanCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How Loan Payments Are Calculated</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Every loan payment you make consists of two parts: <strong>principal</strong> (the amount
            you borrowed) and <strong>interest</strong> (the lender&apos;s fee for providing the loan).
            In a standard amortizing loan, the monthly payment stays the same every month — but the
            split between principal and interest changes.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            In the early months, most of each payment goes toward interest because your balance is
            high. Over time, as you pay down the principal, less interest accrues each month and more
            of each payment reduces the balance. This is called <strong>amortization</strong>.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            The formula used is: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">M = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1]</code> — where
            P = loan amount, r = monthly interest rate, n = total number of payments.
          </p>
        </section>

        <section className="mt-10 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">What Affects Your Monthly Payment</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Three factors directly control your monthly payment: the loan amount, the interest rate,
            and the loan term. A longer term (more months) means lower monthly payments but
            significantly more total interest paid. A lower interest rate reduces both your monthly
            payment and total cost.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            For a $25,000 loan at 7.5% over 5 years, the monthly payment is approximately $500.76.
            Extending to 7 years drops the monthly payment to about $377 — but you pay roughly
            $6,700 more in total interest.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Loan Calculator FAQs" />
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
