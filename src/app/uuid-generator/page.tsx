import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import UUIDGenerator from '@/components/tools/UUIDGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'UUID Generator — Generate UUID v4 Online',
  description: 'Generate random UUID v4 identifiers instantly. Bulk generation, formatting options. Free and secure.',
  path: '/uuid-generator',
  keywords: ['uuid generator', 'guid generator', 'uuid v4'],
});

const FAQS = [
  { question: 'What is a UUID?', answer: 'A UUID (Universally Unique Identifier) is a 128-bit identifier standardized by RFC 4122. It is represented as 32 hexadecimal digits in the format 8-4-4-4-12 (e.g., 550e8400-e29b-41d4-a716-446655440000). UUIDs are designed to be unique across space and time without requiring a central authority.' },
  { question: 'What is UUID v4?', answer: 'UUID v4 is randomly generated — all 128 bits are random except for 4 bits that indicate the version (version 4) and 2 bits for the variant. This is the most commonly used UUID version for generating unique IDs in applications. The probability of two v4 UUIDs colliding is astronomically low (1 in 2^122 ≈ 5.3 × 10^36 combinations).' },
  { question: 'What is the difference between UUID and GUID?', answer: 'GUID (Globally Unique Identifier) is Microsoft\'s implementation of UUID. They are functionally equivalent and use the same format. GUID is the term used in Microsoft technologies (.NET, SQL Server), while UUID is the term used in the open-source and Unix world. Both are 128-bit identifiers.' },
  { question: 'When should I use a UUID?', answer: 'Use UUIDs as primary keys when you need to generate IDs client-side or across distributed systems without coordination. Common uses: database primary keys (avoids sequential ID guessing), file names for uploads, session tokens (though dedicated token generation is better), and correlation IDs for distributed tracing.' },
  { question: 'Are UUID v4 values truly unique?', answer: 'In practice, yes. UUID v4 uses 122 bits of randomness. If you generated 1 billion UUIDs per second, it would take approximately 86 years before the probability of a collision exceeds 50%. For all practical application purposes, v4 UUIDs are unique.' },
  { question: 'What is crypto.randomUUID()?', answer: 'crypto.randomUUID() is a native browser and Node.js API that generates cryptographically secure UUID v4 values. It uses the platform\'s secure random number generator (CSPRNG), making it more secure than Math.random()-based approaches. This tool uses crypto.randomUUID() for all UUID generation.' },
];

export default function UUIDGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'UUID Generator', description: 'Generate random UUID v4 identifiers. Bulk generation and formatting options.', url: '/uuid-generator', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'UUID Generator', url: '/uuid-generator' }]),
  ];
  const related = getRelatedTools('uuid-generator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="UUID Generator" description="Generate cryptographically random UUID v4 identifiers using crypto.randomUUID(). Generate up to 100 at once with formatting options: uppercase, no hyphens, or wrapped in quotes." category="Developer Tools" categoryVariant="developer" />
        <UUIDGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">UUID Format and Usage</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">A standard UUID looks like: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">550e8400-e29b-41d4-a716-446655440000</code>. The format is 8-4-4-4-12 hexadecimal characters. The third group&apos;s first digit indicates the version (4 for v4), and the fourth group&apos;s first digit is 8, 9, a, or b (the variant bits).</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This generator uses the native <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">crypto.randomUUID()</code> API, which is cryptographically secure and available in all modern browsers and Node.js 14.17+. It is always preferable to <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">Math.random()</code> for security-sensitive contexts.</p>
          <p className="text-zinc-600 leading-relaxed">Format options: databases like PostgreSQL store UUIDs natively; some databases prefer uppercase or no hyphens. Use the formatting options to match your specific requirements.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="UUID Generator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
