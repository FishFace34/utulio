import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import QuoteGenerator from '@/components/tools/QuoteGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Quote Generator — Free Estimate Template PDF',
  description: 'Create professional price quotes and estimates. Download as PDF. Free quote generator for businesses.',
  path: '/quote-generator',
  keywords: ['quote generator', 'estimate generator', 'price quote template'],
});

const FAQS = [
  { question: 'What is a quote or estimate?', answer: 'A quote (also called an estimate or proposal) is a document sent to a potential client detailing the scope of work and proposed price before a project begins. It&apos;s a sales document — the client reviews it and either accepts (often by signing) or negotiates. Once accepted, it becomes a binding agreement.' },
  { question: 'What should a quote include?', answer: 'A professional quote includes: your business information, client information, quote number and date, validity period (how long the price is good), itemized list of services/products with descriptions and prices, subtotal, any applicable tax or discounts, total amount, and your payment terms.' },
  { question: 'How long should a quote be valid?', answer: 'Most quotes are valid for 30 days, though this varies by industry. Construction quotes may be valid for only 7–14 days due to material price fluctuations. Service quotes can often be valid for 60–90 days. Always include a "valid until" date so clients understand when prices may change.' },
  { question: 'What is the difference between a quote, estimate, and proposal?', answer: 'A quote is usually a fixed price for a well-defined scope. An estimate is an approximate price where the final cost might vary (common in construction). A proposal is more comprehensive — it includes the problem description, proposed solution, timeline, team, and pricing. For simple transactions, quote and estimate are often used interchangeably.' },
  { question: 'How should I follow up on a quote?', answer: 'Follow up 2–3 days after sending if you haven&apos;t heard back. A brief email checking if they have questions works well. If they haven&apos;t responded after another week, send a final follow-up noting that the quote expires on the validity date. Don&apos;t be pushy — good follow-up is helpful, not harassing.' },
  { question: 'Can I convert a quote to an invoice?', answer: 'Once a client accepts your quote, you convert it to an invoice when work is complete (or at milestone payments). The data is essentially the same — just change "QUOTE" to "INVOICE," update the date, add due date payment terms, and remove the validity date. Use our Invoice Generator for the final billing step.' },
];

export default function QuoteGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Quote Generator', description: 'Create professional price quotes and estimates. Download as PDF.', url: '/quote-generator', category: 'BusinessApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Quote Generator', url: '/quote-generator' }]),
  ];
  const related = getRelatedTools('quote-generator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Quote / Estimate Generator" description="Create professional price quotes for clients. Add your services, pricing, and terms — the &quot;valid until&quot; date is prominently displayed. Download as PDF instantly." category="Business Tools" categoryVariant="business" />
        <QuoteGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Writing Winning Quotes</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">A professional quote does more than list prices — it builds confidence in your business. Clear itemization, a prominent validity date, and straightforward terms signal that you&apos;re organized and serious. Clients are more likely to accept quotes that look professional and are easy to understand.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Include enough detail that the client understands exactly what they&apos;re getting, but not so much that the quote becomes a contract. Keep descriptions clear: &quot;Logo design — 3 concepts, 2 revision rounds, final files in SVG/PNG/PDF&quot; is better than just &quot;Logo design.&quot;</p>
          <p className="text-zinc-600 leading-relaxed">Your quote is also a sales document — make it easy to say yes. Clear total, obvious validity date, and simple acceptance instructions (e.g., &quot;Reply to accept or email with questions&quot;) remove friction from the buying decision.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Quote Generator FAQs" /></div>
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
