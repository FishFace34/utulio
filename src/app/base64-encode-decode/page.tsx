import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import Base64Tool from '@/components/tools/Base64Tool';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Base64 Encoder & Decoder — Encode & Decode Online',
  description:
    'Encode text to Base64 or decode Base64 to text instantly. UTF-8 safe. Free and private — runs entirely in your browser.',
  path: '/base64-encode-decode',
  keywords: ['base64 encode', 'base64 decode', 'base64 converter'],
});

const FAQS = [
  {
    question: 'What is Base64 encoding?',
    answer:
      'Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. It converts every 3 bytes of binary data into 4 printable characters. Base64 is widely used in email attachments, data URLs, HTTP Basic Auth, and JSON Web Tokens (JWTs).',
  },
  {
    question: 'Is Base64 encryption?',
    answer:
      'No — Base64 is encoding, not encryption. It is easily reversible by anyone without a key. Do not use Base64 to "hide" sensitive data. It is used purely for data transport compatibility, not security. If you need to protect data, use proper encryption algorithms like AES.',
  },
  {
    question: 'Why does Base64 make text longer?',
    answer:
      'Base64 encodes every 3 bytes into 4 characters, resulting in approximately 33% size increase. This overhead is the trade-off for converting any binary data into safe printable ASCII text that can be transmitted across systems that only handle text.',
  },
  {
    question: 'Can I encode images?',
    answer:
      'Yes — images can be Base64 encoded and embedded directly in HTML/CSS as data URLs: <img src="data:image/png;base64,{encoded}">. This eliminates a network request for small images. However, this tool currently handles text encoding/decoding only.',
  },
  {
    question: 'Is my data safe here?',
    answer:
      'Yes. This tool runs entirely in your browser. Your text is never sent to any server — the encoding and decoding happen locally using JavaScript\'s built-in btoa() and atob() functions, with UTF-8 handling for international characters.',
  },
  {
    question: 'What characters does Base64 use?',
    answer:
      'Standard Base64 uses: A-Z (26), a-z (26), 0-9 (10), + and / (2) = 64 characters total, plus = for padding. URL-safe Base64 replaces + with - and / with _ to avoid issues in URLs and file names.',
  },
];

export default function Base64Page() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Base64 Encoder & Decoder',
      description: 'Encode text to Base64 or decode Base64 to text. UTF-8 safe.',
      url: '/base64-encode-decode',
      category: 'DeveloperApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Base64 Encoder / Decoder', url: '/base64-encode-decode' },
    ]),
  ];

  const related = getRelatedTools('base64-encode-decode', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Base64 Encoder & Decoder"
          description="Encode any text to Base64 or decode Base64 back to text instantly. UTF-8 safe — handles emojis and non-Latin characters correctly. All processing happens in your browser."
          category="Developer Tools"
          categoryVariant="developer"
        />

        <Base64Tool />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">When Do You Need Base64?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Base64 encoding is necessary when you need to transmit binary data through systems
            designed to handle only text. Common use cases include embedding images in HTML/CSS
            (data URLs), encoding credentials in HTTP Basic Auth headers, encoding binary content
            in JSON payloads, and encoding keys and tokens in JWT (JSON Web Tokens).
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            If you&apos;ve ever looked at a JWT token, it looks like three Base64 segments separated by
            dots. Decoding the middle segment reveals the payload — the actual claims stored in the
            token. This is why it&apos;s important to remember that Base64 is not encryption.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            This tool correctly handles UTF-8 characters — including emojis, Chinese, Arabic, and
            other non-ASCII text — using the proper encoding approach that avoids the common
            character corruption bug in simple btoa() implementations.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Base64 FAQs" />
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
