import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import SalesTaxCalculator from '@/components/tools/SalesTaxCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Sales Tax Calculator — Add or Remove Tax',
  description: 'Calculate sales tax, add tax to a price, or find the pre-tax amount. Reverse tax calculation supported.',
  path: '/sales-tax-calculator',
  keywords: ['sales tax calculator', 'tax calculator', 'reverse sales tax'],
});

const FAQS = [
  { question: 'How do I calculate sales tax?', answer: 'To add sales tax: multiply the pre-tax price by the tax rate (as a decimal) to get the tax amount, then add it to the price. Formula: Tax = Price × Rate. For example, $100 × 0.0825 = $8.25 tax, so the total is $108.25.' },
  { question: 'How do I remove tax from a total price?', answer: 'To reverse-calculate (extract tax from a gross price): divide the total price by (1 + tax rate). For example, $108.25 ÷ 1.0825 = $100.00 pre-tax. The tax amount is then $108.25 − $100.00 = $8.25. This calculator does this automatically with the "Remove Tax" mode.' },
  { question: 'What states have no sales tax?', answer: 'Five U.S. states have no state sales tax: Oregon, Montana, New Hampshire, Delaware, and Alaska (though some Alaska localities charge local taxes). All other states have state sales taxes ranging from 2.9% (Colorado) to 7.25% (California), with many localities adding additional taxes on top.' },
  { question: 'What is the average U.S. sales tax rate?', answer: 'The average combined state and local sales tax rate in the U.S. is approximately 7–8%. The highest average combined rates are in Tennessee (~9.5%), Louisiana (~9.5%), and Arkansas (~9.4%). Individual city rates can be even higher — some Chicago suburbs exceed 10%.' },
  { question: 'Is sales tax included in listed prices?', answer: 'In the United States, prices are typically listed without sales tax (unlike many countries where tax is included). This is why you often pay more at the register than the listed price. E-commerce sales tax rules changed in 2018 (South Dakota v. Wayfair), requiring most online retailers to collect tax in states where they have customers.' },
  { question: 'Do businesses pay sales tax?', answer: 'Generally, businesses do not pay sales tax on goods purchased for resale or for use in manufacturing — they collect sales tax from customers and remit it to the government. However, businesses do pay sales tax on items used internally (office supplies, equipment) that are not for resale. Rules vary by state and item type.' },
];

export default function SalesTaxCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Sales Tax Calculator', description: 'Add or remove sales tax from any price. Supports reverse tax calculation.', url: '/sales-tax-calculator', category: 'FinanceApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Sales Tax Calculator', url: '/sales-tax-calculator' }]),
  ];
  const related = getRelatedTools('sales-tax-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Sales Tax Calculator" description="Add sales tax to any price, or reverse-calculate to find the pre-tax amount from a total. Quick-select common tax rates or enter any custom rate." category="Finance Tools" categoryVariant="finance" />
        <SalesTaxCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Sales Tax: Add or Remove</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">This calculator handles both directions of sales tax. <strong className="text-zinc-900">Add tax</strong> mode is useful when you see a listed price and want to know what you&apos;ll actually pay at checkout. <strong className="text-zinc-900">Remove tax (reverse)</strong> mode is useful when you have a total receipt and need to separate the tax from the base price — common for expense reports and accounting.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The reverse calculation formula is: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">Net Price = Gross Price ÷ (1 + Tax Rate)</code>. This is different from simply subtracting the tax rate percentage from the gross — that would give the wrong answer. For example, removing 8.25% from $108.25 does not give $100 (it gives $99.31). The correct method divides by 1.0825.</p>
          <p className="text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Verification:</strong> $100 + 8.25% → tax $8.25, total $108.25. Reverse: $108.25 at 8.25% → net $100.00.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Sales Tax FAQs" /></div>
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
