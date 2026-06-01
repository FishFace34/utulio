import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { generateId } from '@/lib/utils';

export const metadata: Metadata = toolMetadata({
  title: 'Consulting Invoice Generator — Free PDF Invoice for Consultants',
  description:
    'Create professional consulting invoices instantly. Pre-filled with consulting line items and terms. Download as PDF.',
  path: '/invoice-generator/for-consultants',
  keywords: ['consulting invoice generator', 'consultant invoice template', 'consulting billing'],
});

const schemas = [
  softwareApplicationSchema({
    name: 'Consulting Invoice Generator',
    description: 'Create professional consulting invoices and download as PDF.',
    url: '/invoice-generator/for-consultants',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Invoice Generator', url: '/invoice-generator' },
    { name: 'For Consultants', url: '/invoice-generator/for-consultants' },
  ]),
];

export default function ForConsultantsPage() {
  const prefill = {
    items: [
      { id: generateId(), description: 'Consulting services — hourly rate', quantity: 10, rate: 150 },
    ],
    notes: 'Payment due within 14 days. Wire transfer or check accepted.',
  };

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
          title="Consulting Invoice Generator"
          description="Create professional consulting invoices with pre-filled line items and payment terms. Download as PDF instantly."
          category="Freelancer Tools"
          categoryVariant="freelancer"
        />

        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-zinc-900">Built for Consultants</h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            This invoice is pre-loaded with a consulting services line item and standard consulting
            payment terms (net 14 days). Simply update the rate and hours to match your engagement,
            add your contact details, and download your professional PDF invoice.
          </p>
        </div>

        <InvoiceGenerator prefill={prefill} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>
      </Container>
    </>
  );
}
