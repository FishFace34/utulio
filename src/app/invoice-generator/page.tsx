import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Free Invoice Generator — Create & Download PDF Invoices',
  description:
    'Create professional invoices in seconds. Free, no signup, no email required. Download as PDF instantly.',
  path: '/invoice-generator',
  keywords: ['invoice generator', 'free invoice maker', 'pdf invoice creator'],
});

const FAQ_ITEMS = [
  {
    question: 'Is this invoice generator really free?',
    answer:
      'Yes, completely free. There are no hidden fees, no premium tier, and no credit card required. You can create and download as many invoices as you like without ever paying anything.',
  },
  {
    question: 'Do I need to sign up?',
    answer:
      'No signup or account is required. Open the tool and start creating your invoice immediately. We never ask for your email address or personal information.',
  },
  {
    question: 'What format will my invoice be in?',
    answer:
      'Your invoice is downloaded as a professionally formatted PDF file (A4 size). PDF is universally accepted for invoicing and can be opened on any device without special software.',
  },
  {
    question: 'Can I save my invoices?',
    answer:
      'Your invoice data is automatically saved in your browser\'s local storage as you type, so your work is preserved if you accidentally close the tab or refresh the page. Note that this data is stored only on your device — we do not save it to any server. To permanently save an invoice, download the PDF.',
  },
  {
    question: 'What should I include in a professional invoice?',
    answer:
      'A professional invoice should include: your business name and contact information, the client\'s name and address, a unique invoice number, issue date and due date, itemized list of services or products with quantities and rates, subtotal, any applicable taxes or discounts, and total amount due. Optionally include payment terms and bank/payment details in the notes section.',
  },
  {
    question: 'How do I send the invoice to my client?',
    answer:
      'After downloading the PDF, you can email it directly to your client as an attachment. Many freelancers use a standard email like: "Please find attached invoice [number] for [services]. Payment is due by [date]." You can also share the PDF via messaging apps or file sharing services if your client prefers.',
  },
];

export default function InvoiceGeneratorPage() {
  const relatedTools = getRelatedTools('invoice-generator', 4);
  const schemas = [
    softwareApplicationSchema({
      name: 'Free Invoice Generator',
      description: 'Create professional invoices and download as PDF. No signup required.',
      url: '/invoice-generator',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Invoice Generator', url: '/invoice-generator' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
        />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Free Invoice Generator"
          description="Create professional invoices in seconds. Fill in your details, add line items, and download as PDF — no signup needed."
          category="Freelancer Tools"
          categoryVariant="freelancer"
        />

        <InvoiceGenerator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        {/* How to use */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">
            How to Use the Invoice Generator
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Fill in your details',
                desc: 'Enter your business information and your client\'s details. The live preview updates as you type.',
              },
              {
                step: '2',
                title: 'Add line items',
                desc: 'Add your services or products with quantities and rates. Taxes and discounts are calculated automatically.',
              },
              {
                step: '3',
                title: 'Download as PDF',
                desc: 'Click "Download PDF" to get a professionally formatted A4 invoice ready to send to your client.',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-zinc-900">{s.title}</h3>
                  <p className="text-sm text-zinc-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What to include */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            What to Include in a Freelance Invoice
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              {[
                {
                  title: 'Business Information',
                  items: [
                    'Your full legal name or business name',
                    'Your address (for legal purposes)',
                    'Contact email and phone number',
                    'Tax ID or VAT number (if applicable)',
                  ],
                },
                {
                  title: 'Client Information',
                  items: [
                    "Client's full name or company name",
                    'Client billing address',
                    'Client contact email',
                    'Purchase order number (if required)',
                  ],
                },
                {
                  title: 'Invoice Details',
                  items: [
                    'Unique invoice number (for your records)',
                    'Invoice issue date',
                    'Payment due date',
                    'Currency of payment',
                  ],
                },
                {
                  title: 'Line Items & Totals',
                  items: [
                    'Description of each service or product',
                    'Quantity and unit rate for each item',
                    'Subtotal before taxes',
                    'Applicable taxes and final total',
                  ],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 font-semibold text-zinc-900">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-zinc-600">
                        <span className="mt-0.5 text-emerald-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} />

        {/* Related Tools */}
        <section className="mt-4 pb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
