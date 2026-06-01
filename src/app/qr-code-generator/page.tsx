import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import QRCodeGenerator from '@/components/tools/QRCodeGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'QR Code Generator — Free Custom QR Codes',
  description:
    'Create free QR codes for URLs, text, WiFi, email, and more. Customize colors and download as PNG or SVG. No signup required.',
  path: '/qr-code-generator',
  keywords: ['qr code generator', 'free qr code', 'qr code maker'],
});

const FAQS = [
  {
    question: 'How do I create a QR code?',
    answer:
      'Select the content type (URL, WiFi, Email, etc.), enter your information, and the QR code generates automatically. Customize the colors if desired, then click Download PNG or Download SVG to save the file to your device.',
  },
  {
    question: "Do QR codes expire?",
    answer:
      'Static QR codes (like the ones this tool generates) never expire. They contain the data directly encoded in the pattern. As long as the URL or information you encoded is still valid, the QR code will work forever.',
  },
  {
    question: 'Can I customize QR code colors?',
    answer:
      'Yes — use the foreground and background color pickers to create custom-colored QR codes. Make sure there is sufficient contrast between the two colors for reliable scanning. Dark foreground on light background works best.',
  },
  {
    question: "What's the best error correction level?",
    answer:
      'M (15%) is the default and works well for most use cases. Use H (30%) if you plan to add a logo or design overlay on the QR code — higher error correction means the code can still be scanned even if part of it is obscured. Use L (7%) only when you need to fit more data in a smaller code.',
  },
  {
    question: 'How do I make a WiFi QR code?',
    answer:
      'Select the "WiFi" tab, enter your network name (SSID) and password, select the security type, and the QR code is generated. When someone scans it with their phone, they\'ll be prompted to join the network automatically — no typing required.',
  },
  {
    question: 'Can I use these QR codes commercially?',
    answer:
      'Yes, completely free for personal and commercial use. There are no watermarks, usage limits, or attribution requirements. The generated QR codes are yours to use however you like.',
  },
];

export default function QRCodeGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'QR Code Generator',
      description: 'Create free custom QR codes for URLs, WiFi, email, and more.',
      url: '/qr-code-generator',
      category: 'UtilityApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'QR Code Generator', url: '/qr-code-generator' },
    ]),
  ];

  const related = getRelatedTools('qr-code-generator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="QR Code Generator"
          description="Create custom QR codes for URLs, WiFi networks, emails, and more. Customize colors and download as PNG or SVG. Free, no signup, no watermark."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <QRCodeGenerator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">What Can QR Codes Be Used For?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            QR codes can encode almost any text-based information. The most common uses include
            linking to websites, sharing WiFi credentials, pre-filling email or SMS messages,
            storing contact information (vCard), and directing customers to payment pages.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            For businesses, QR codes appear on product packaging, restaurant menus, event posters,
            business cards, and marketing materials. They bridge the physical and digital worlds —
            a customer can scan a code on a physical item and be taken directly to a web page.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            PNG format is best for print materials, digital screens, and general use.
            SVG format is resolution-independent — it can be scaled to any size without losing quality,
            making it ideal for large print projects like banners and posters.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="QR Code Generator FAQs" />
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
