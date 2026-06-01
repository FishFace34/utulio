import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import QRCodeGenerator from '@/components/tools/QRCodeGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'URL QR Code Generator — Create Link QR Codes Free',
  description:
    'Turn any URL into a scannable QR code. Free, no signup, downloadable as PNG or SVG. Perfect for print materials, menus, and business cards.',
  path: '/qr-code-generator/for-url',
  keywords: ['url qr code generator', 'link qr code', 'website qr code'],
});

export default function URLQRPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'URL QR Code Generator',
      description: 'Create QR codes for any URL or website link.',
      url: '/qr-code-generator/for-url',
      category: 'UtilityApplication',
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'QR Code Generator', url: '/qr-code-generator' },
      { name: 'URL QR Code', url: '/qr-code-generator/for-url' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="URL QR Code Generator"
          description="Convert any website URL into a scannable QR code. Download as PNG for print or SVG for scalable use. Completely free, no account required."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <QRCodeGenerator defaultTab="url" />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Using QR Codes to Drive Traffic</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            URL QR codes bridge the gap between physical marketing materials and your online presence.
            Add a QR code to a business card, brochure, flyer, or product label and anyone who scans
            it is taken directly to your website, landing page, menu, or any other URL.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Tips for effective QR codes: keep the destination URL short (use a URL shortener for
            very long URLs to reduce code complexity), use high error correction for printed materials
            that may get dirty or damaged, and test your code with multiple devices before printing.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Download as SVG for print projects — the code can be scaled to any size without
            pixelation. Use PNG for digital use cases like email, social media, and web pages.
          </p>
        </section>
      </Container>
    </>
  );
}
