import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import CarLoanCalculator from '@/components/tools/CarLoanCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Car Loan Calculator — Auto Loan Payments & Total Cost',
  description:
    'Calculate your car loan monthly payment with down payment, trade-in value, and sales tax. Free auto loan calculator.',
  path: '/car-loan-calculator',
  keywords: ['car loan calculator', 'auto loan calculator', 'car payment calculator'],
});

const FAQS = [
  {
    question: 'How is a car loan payment calculated?',
    answer:
      'Your monthly payment is based on the loan amount (vehicle price + tax − down payment − trade-in), the annual interest rate (APR), and the loan term in months. The calculator uses the standard amortization formula to compute a fixed monthly payment that pays off both principal and interest over the term.',
  },
  {
    question: 'How does a trade-in affect my loan?',
    answer:
      'A trade-in reduces both the taxable amount and the loan principal. Your trade-in value is subtracted from the vehicle price before sales tax is calculated (reducing your tax bill) and then also subtracted from the financed amount. A higher trade-in means a smaller loan and lower monthly payments.',
  },
  {
    question: 'Should I make a bigger down payment?',
    answer:
      'A larger down payment reduces your loan amount, monthly payment, and total interest paid. It also gives you immediate equity in the vehicle, reducing the risk of being "underwater" (owing more than the car is worth). If you have the cash available, a 20% down payment is a common recommendation.',
  },
  {
    question: 'Is sales tax included in the loan?',
    answer:
      'In most U.S. states, sales tax is added to the vehicle price and can be rolled into the loan (financed). This calculator adds sales tax to the purchase price before computing the loan amount. Rates vary by state from 0% to over 10% — check your local rate for accurate calculations.',
  },
  {
    question: "What's a good interest rate for a car loan?",
    answer:
      'Auto loan rates depend on your credit score, loan term, and whether the car is new or used. As of recent years, excellent credit (750+) can secure rates of 3–6% for new cars. Average credit (650–700) typically sees 7–12%. Used car loans generally carry higher rates than new car loans.',
  },
  {
    question: 'How does loan term affect total cost?',
    answer:
      'A longer loan term (e.g., 72 months) means lower monthly payments but significantly more total interest. A 60-month loan vs. a 72-month loan on the same vehicle at the same rate can mean $500–$1,500 more in total interest. Always compare the total cost, not just the monthly payment.',
  },
];

export default function CarLoanCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Car Loan Calculator',
      description: 'Calculate car loan payments with down payment, trade-in, and sales tax.',
      url: '/car-loan-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Car Loan Calculator', url: '/car-loan-calculator' },
    ]),
  ];

  const related = getRelatedTools('car-loan-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Car Loan Calculator"
          description="Calculate your exact car loan monthly payment, total interest, and out-of-pocket cost. Includes down payment, trade-in value, and sales tax."
          category="Finance Tools"
          categoryVariant="business"
        />

        <CarLoanCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How to Calculate Your True Car Cost</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            The sticker price of a car is rarely what you actually pay. Sales tax, dealer fees,
            registration, and financing costs all add to the total. This calculator helps you
            understand the real cost by computing the financed amount after your down payment and
            trade-in, then applying your state&apos;s sales tax rate.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            One key insight: a trade-in reduces your taxable amount in most states. If you trade in
            a $5,000 car on a $35,000 purchase in a state with 6% sales tax, you only pay tax on
            $30,000 ($1,800) instead of $35,000 ($2,100) — saving you $300 in tax.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Always look at the <strong>total cost</strong> including down payment and all loan
            payments, not just the monthly payment. Dealers often focus on monthly payment to obscure
            the true total you&apos;re paying.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Car Loan FAQs" />
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
