import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import QuoteGenerator from '@/components/tools/QuoteGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Quote Generator for Contractors — Free Estimate Template',
  description: 'Create professional contractor quotes and project estimates. Download as PDF. Free for contractors.',
  path: '/quote-generator/for-contractors',
  keywords: ['contractor quote generator', 'construction estimate template', 'contractor estimate pdf'],
});

export default function ContractorQuotePage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Contractor Quote Generator', description: 'Create professional contractor quotes and estimates.', url: '/quote-generator/for-contractors', category: 'BusinessApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Quote Generator', url: '/quote-generator' }, { name: 'For Contractors', url: '/quote-generator/for-contractors' }]),
  ];

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Contractor Quote Generator" description="Create professional project quotes and estimates for construction, renovation, landscaping, or any contracting work. Itemize labor and materials. Download as PDF." category="Business Tools" categoryVariant="business" />
        <QuoteGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Tips for Contractor Quotes</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Separate your line items clearly: labor, materials, permits, and equipment rental should each be their own line. This transparency builds trust with clients and makes it easier to adjust the quote if they want to change scope.</p>
          <p className="text-zinc-600 leading-relaxed">Contractor quotes should typically be valid for 7–30 days due to fluctuating material prices. Always include your license number, insurance information, and warranty terms in the notes field.</p>
        </section>
      </Container>
    </>
  );
}
