import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import ReceiptGenerator from '@/components/tools/ReceiptGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Receipt Generator — Free Printable PDF Receipts',
  description: 'Create professional receipts in seconds. Download as PDF. Free, no signup required.',
  path: '/receipt-generator',
  keywords: ['receipt generator', 'free receipt maker', 'pdf receipt'],
});

const FAQS = [
  { question: 'What information should a receipt include?', answer: 'A proper receipt includes: business name and contact info, receipt number, date, itemized list of goods/services with quantities and prices, subtotal, any applicable tax, total amount, payment method, and optionally the customer name. This generator creates receipts with all standard fields.' },
  { question: 'Is a receipt the same as an invoice?', answer: 'No. An invoice is a request for payment (sent before payment). A receipt is proof that payment has been received (given after payment). Receipts are also simpler — they show what was purchased, how much was paid, and the payment method, without the payment terms and due dates found on invoices.' },
  { question: 'Do I need to provide receipts to customers?', answer: 'Requirements vary by jurisdiction. In many countries and U.S. states, receipts are required for transactions above a certain value, or for certain types of goods. Even where not legally required, providing receipts is good business practice — customers may need them for returns, expense reports, or tax purposes.' },
  { question: 'Can I customize the receipt with my business logo?', answer: 'This generator creates text-based PDF receipts optimized for quick creation without requiring design software. For receipts with custom logos and branding, you can print the PDF and stamp it, or use dedicated receipt printing software with your POS system.' },
  { question: 'How does the change calculation work?', answer: 'When you select Cash as the payment method and enter the amount tendered, this calculator automatically computes the change due (Amount Paid − Total). This is displayed on screen and included in the PDF so you have a record of the transaction.' },
  { question: 'Is my data saved?', answer: 'Yes — your receipt data is automatically saved to your browser&apos;s localStorage. If you close the tab and return, your data will be there. Your data never leaves your device or gets sent to any server. Use the Reset button to clear all saved data.' },
];

export default function ReceiptGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Receipt Generator', description: 'Create professional PDF receipts online, free.', url: '/receipt-generator', category: 'BusinessApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Receipt Generator', url: '/receipt-generator' }]),
  ];
  const related = getRelatedTools('receipt-generator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Receipt Generator" description="Create professional receipts and download as PDF in seconds. Add your business info, itemize purchases, set payment method, and calculate cash change automatically." category="Business Tools" categoryVariant="business" />
        <ReceiptGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">When You Need a Receipt Generator</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Receipts are essential for any business transaction. Customers may need them for returns, warranty claims, expense reimbursements, or tax deductions. Businesses need them for their own records and to demonstrate sales for tax purposes.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This free receipt generator is ideal for freelancers, small businesses, market vendors, service providers, and anyone who needs a professional receipt without expensive POS software. Fill in your business details once (they&apos;re saved automatically), then create receipts in under a minute.</p>
          <p className="text-zinc-600 leading-relaxed">All data stays on your device — nothing is sent to our servers. You can create unlimited receipts at no cost.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Receipt Generator FAQs" /></div>
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
