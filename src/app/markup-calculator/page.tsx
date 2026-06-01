import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import MarkupCalculator from '@/components/tools/MarkupCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Markup Calculator — Calculate Selling Price & Markup',
  description: 'Calculate markup percentage, selling price, and profit from cost. Shows resulting margin too.',
  path: '/markup-calculator',
  keywords: ['markup calculator', 'selling price calculator', 'retail markup'],
});

const FAQS = [
  { question: 'What is markup?', answer: 'Markup is the percentage added to the cost of a product to arrive at a selling price. If a product costs $40 and you add a 50% markup, the selling price is $60 — the markup is calculated on the cost price.' },
  { question: 'What is the difference between markup and margin?', answer: 'Markup is the profit expressed as a percentage of the cost. Margin (or profit margin) is the profit expressed as a percentage of the selling price. A 50% markup results in a 33.33% margin. They are related but never equal (unless both are zero). Margin = Markup / (1 + Markup).' },
  { question: 'What markup should I use for my products?', answer: 'It depends on your industry. Retail clothing often uses 100–200% markup (keystone pricing). Grocery items typically use 15–40%. Electronics retail might use 20–50%. Services often target 50–100%+. The right markup covers your costs, overhead, and desired profit while remaining competitive.' },
  { question: 'How do I calculate selling price from cost and markup?', answer: 'Selling Price = Cost × (1 + Markup%). For example, cost $40 with 50% markup: $40 × 1.50 = $60. This calculator does this automatically — just enter your cost and desired markup percentage.' },
  { question: 'How do I calculate markup from cost and selling price?', answer: 'Markup % = (Selling Price − Cost) / Cost × 100. For example, if you paid $40 and sell for $60: ($60 − $40) / $40 × 100 = 50% markup. Use the "Cost + Selling Price" mode in this calculator to find the markup percentage from known prices.' },
  { question: 'What is a healthy profit margin for a small business?', answer: 'It varies widely by industry. Net profit margins of 5–10% are common in retail; 15–25% in services; 20–40% in software and professional services. Gross margins (before overhead) need to be high enough to cover operating costs and still leave net profit. Tracking both markup (for pricing) and margin (for profitability) is essential.' },
];

export default function MarkupCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Markup Calculator', description: 'Calculate markup percentage, selling price, and profit from cost.', url: '/markup-calculator', category: 'BusinessApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Markup Calculator', url: '/markup-calculator' }]),
  ];
  const related = getRelatedTools('markup-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Markup Calculator" description="Calculate your selling price from cost and markup percentage, or find the markup on any existing product. Instantly shows both markup and the resulting profit margin." category="Business Tools" categoryVariant="business" />
        <MarkupCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Markup vs. Margin — What&apos;s the Difference?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Markup and margin are both ways to express profitability, but they use different bases. <strong className="text-zinc-900">Markup</strong> is calculated on the <em>cost</em> — a 50% markup means you&apos;re adding 50% of cost to get the price. <strong className="text-zinc-900">Margin</strong> is calculated on the <em>selling price</em> — a 33.3% margin means 33.3% of revenue is profit.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This distinction matters because the two numbers are often confused in business conversations. When someone says &quot;we need a 30% margin,&quot; they mean 30% of the selling price is profit — which requires a 42.86% markup. This calculator shows both numbers simultaneously so you can set prices with confidence.</p>
          <p className="text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Verification:</strong> Cost $40, 50% markup → selling price $60, profit $20, margin 33.33%.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Markup Calculator FAQs" /></div>
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
