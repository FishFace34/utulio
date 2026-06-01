import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import InvoiceGenerator from '@/components/tools/InvoiceGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Free Invoice Generator for Freelancers',
  description:
    'Create professional freelance invoices instantly. Pre-filled with standard freelance payment terms. Download as PDF, no signup.',
  path: '/invoice-generator/for-freelancers',
  keywords: ['freelance invoice generator', 'invoice for freelancers', 'free freelance invoice'],
});

const schemas = [
  softwareApplicationSchema({
    name: 'Invoice Generator for Freelancers',
    description: 'Create professional freelance invoices and download as PDF.',
    url: '/invoice-generator/for-freelancers',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Invoice Generator', url: '/invoice-generator' },
    { name: 'For Freelancers', url: '/invoice-generator/for-freelancers' },
  ]),
];

export default function ForFreelancersPage() {
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
          title="Free Invoice Generator for Freelancers"
          description="Create professional freelance invoices in seconds. Pre-filled with standard payment terms to get you paid faster."
          category="Freelancer Tools"
          categoryVariant="freelancer"
        />

        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-zinc-900">
            Built for Freelancers
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">
            This invoice generator comes pre-loaded with standard freelance payment terms in the
            notes field. Simply fill in your details, add your line items, and download your PDF.
            Your invoice data is saved automatically in your browser — no account needed.
          </p>
        </div>

        <InvoiceGenerator
          prefill={{
            notes: 'Payment due within 30 days. Late fee: 1.5%/month after due date.',
          }}
        />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>
      </Container>
    </>
  );
}
