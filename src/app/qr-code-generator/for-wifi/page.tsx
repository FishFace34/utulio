import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import QRCodeGenerator from '@/components/tools/QRCodeGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'WiFi QR Code Generator — Share WiFi Instantly',
  description:
    'Create a QR code for your WiFi network. Guests scan it to connect automatically — no typing passwords. Free, instant, no signup.',
  path: '/qr-code-generator/for-wifi',
  keywords: ['wifi qr code generator', 'wifi qr code', 'share wifi qr code'],
});

export default function WifiQRPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'WiFi QR Code Generator',
      description: 'Create QR codes for WiFi networks for instant connection.',
      url: '/qr-code-generator/for-wifi',
      category: 'UtilityApplication',
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'QR Code Generator', url: '/qr-code-generator' },
      { name: 'WiFi QR Code', url: '/qr-code-generator/for-wifi' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="WiFi QR Code Generator"
          description="Generate a QR code for your WiFi network. Guests simply scan it with their phone to connect automatically — no passwords to type or share verbally."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <QRCodeGenerator defaultTab="wifi" />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Why Use a WiFi QR Code?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Sharing WiFi passwords can be awkward — guests may not be able to read your handwriting,
            may mistype characters, or may not understand how to find the right network. A WiFi QR
            code eliminates all of that friction. Print it out and place it where guests can easily
            find and scan it.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            WiFi QR codes are perfect for: Airbnb properties, coffee shops, restaurants, offices,
            events, and home use. When a guest scans the code, their phone automatically prompts them
            to join the network — one tap and they&apos;re connected.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Your WiFi password is encoded directly in the QR code. The code never leaves your
            browser — it&apos;s generated locally and not transmitted to any server.
          </p>
        </section>
      </Container>
    </>
  );
}
