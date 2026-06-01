import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import PurchaseOrderGenerator from '@/components/tools/PurchaseOrderGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Purchase Order Generator — Free PO Template PDF',
  description: 'Create professional purchase orders and download as PDF. Free purchase order generator.',
  path: '/purchase-order-generator',
  keywords: ['purchase order generator', 'po template', 'purchase order pdf'],
});

const FAQS = [
  { question: 'What is a purchase order?', answer: 'A purchase order (PO) is a formal document sent by a buyer to a vendor/supplier requesting specific goods or services. It specifies quantities, prices, delivery dates, and payment terms. Once the vendor accepts, the PO becomes a legally binding contract.' },
  { question: 'Why use a purchase order instead of just ordering informally?', answer: 'Purchase orders create a clear paper trail, prevent disputes about what was ordered and at what price, help with budgeting and approval workflows, and simplify accounting and auditing. For businesses spending significant amounts with vendors, POs are essential for financial control.' },
  { question: 'What should a purchase order include?', answer: 'A complete PO includes: PO number, order date, delivery date, buyer and vendor contact information, itemized list of goods/services with quantities and unit prices, shipping costs, taxes, total amount, and payment terms. This generator covers all standard fields.' },
  { question: 'What is "Net 30" in purchase order terms?', answer: '"Net 30" means payment is due 30 days after the invoice date. Other common terms: Net 15 (15 days), Net 60 (60 days), Due on receipt (immediate), 2/10 Net 30 (2% discount if paid within 10 days, otherwise full amount due in 30 days). Agree on terms with your vendor before sending the PO.' },
  { question: 'How do I number my purchase orders?', answer: 'Use a sequential numbering system that starts with a prefix (e.g., PO-001, PO-002). This makes it easy to reference POs in conversations and financial records. Some businesses include the year (e.g., PO-2025-001). Keep the system simple and consistent.' },
  { question: 'Is a purchase order legally binding?', answer: 'A PO becomes legally binding when a vendor accepts it — either explicitly (signing) or implicitly (beginning to fulfill the order). At that point, both parties are bound by the terms. Always review vendor acceptance policies and ensure your PO terms are clear to avoid disputes.' },
];

export default function PurchaseOrderGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Purchase Order Generator', description: 'Create professional purchase orders and download as PDF.', url: '/purchase-order-generator', category: 'BusinessApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Purchase Order Generator', url: '/purchase-order-generator' }]),
  ];
  const related = getRelatedTools('purchase-order-generator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Purchase Order Generator" description="Create professional purchase orders with buyer and vendor information, line items, shipping, and payment terms. Download as PDF instantly — no signup required." category="Business Tools" categoryVariant="business" />
        <PurchaseOrderGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Why Purchase Orders Matter</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Even small businesses benefit from a formal purchasing process. A purchase order protects both the buyer and the seller by documenting exactly what was agreed upon — preventing disputes over quantities, prices, and delivery expectations.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">For growing businesses, POs enable a structured approval workflow: someone requests a purchase, a manager approves the PO, the PO is sent to the vendor, goods arrive, and the invoice is matched against the PO before payment. This &quot;three-way match&quot; process prevents unauthorized spending and catches billing errors.</p>
          <p className="text-zinc-600 leading-relaxed">This generator creates clean, professional POs that you can download as PDF and email or print. Your data is auto-saved to your browser for convenience.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Purchase Order FAQs" /></div>
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
