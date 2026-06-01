import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import HashGenerator from '@/components/tools/HashGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Hash Generator — SHA-256, SHA-1, SHA-512 Online',
  description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text. Private — runs entirely in your browser.',
  path: '/hash-generator',
  keywords: ['hash generator', 'sha256 generator', 'sha1 hash'],
});

const FAQS = [
  { question: 'What is a cryptographic hash?', answer: 'A cryptographic hash function takes input data (any length) and produces a fixed-length output (the hash or digest). The same input always produces the same hash. Even a tiny change in the input produces a completely different hash. Hash functions are one-way — you cannot reverse a hash to get the original input.' },
  { question: 'What is SHA-256?', answer: 'SHA-256 (Secure Hash Algorithm 256-bit) produces a 64-character hexadecimal hash. It is part of the SHA-2 family designed by the NSA. SHA-256 is widely used for digital signatures, certificate verification, password storage (with proper salting), and data integrity verification (e.g., file checksums). Bitcoin mining uses SHA-256.' },
  { question: 'What is the SHA-256 hash of "abc"?', answer: 'SHA-256("abc") = ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad. You can verify this with this tool. This is a known test vector for SHA-256.' },
  { question: 'Why is MD5 not available?', answer: 'MD5 is cryptographically broken — collisions (two different inputs producing the same hash) can be found in seconds on modern hardware. It should not be used for any security purpose. Additionally, MD5 is not available in the browser\'s native Web Crypto API (crypto.subtle). This tool uses only the native API without external libraries, so MD5 is intentionally excluded.' },
  { question: 'Can I hash passwords with this tool?', answer: 'No — you should never hash passwords with a plain SHA algorithm. Password hashing requires slow, memory-hard algorithms like bcrypt, scrypt, or Argon2 that make brute-force attacks impractical. Plain SHA algorithms (even SHA-256) are too fast for password storage. Use this tool for file integrity checking, not passwords.' },
  { question: 'What is SHA-512 used for?', answer: 'SHA-512 produces a 128-character hash and offers higher security than SHA-256, though SHA-256 is considered sufficient for most purposes today. SHA-512 is sometimes used in applications where extra security margin is desired, or when performance is better on 64-bit CPUs (SHA-512 is actually faster than SHA-256 on 64-bit architectures for large inputs).' },
];

export default function HashGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Hash Generator', description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes from text. Private, runs in browser.', url: '/hash-generator', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Hash Generator', url: '/hash-generator' }]),
  ];
  const related = getRelatedTools('hash-generator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Hash Generator" description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 cryptographic hashes from any text. Real-time output as you type. Uses the native Web Crypto API — nothing sent to any server." category="Developer Tools" categoryVariant="developer" />
        <HashGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How Cryptographic Hashing Works</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">A cryptographic hash function maps arbitrary-length data to a fixed-length output. The key properties: <strong className="text-zinc-900">Deterministic</strong> (same input → same output), <strong className="text-zinc-900">Fast to compute</strong>, <strong className="text-zinc-900">Pre-image resistant</strong> (cannot reverse), <strong className="text-zinc-900">Avalanche effect</strong> (tiny change → completely different hash), <strong className="text-zinc-900">Collision resistant</strong> (extremely hard to find two inputs with the same hash).</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This tool uses <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">crypto.subtle.digest()</code>, the native Web Crypto API. This runs in your browser&apos;s secure context using optimized, native code. No JavaScript libraries are involved, and your data never leaves your device.</p>
          <p className="text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Verification test:</strong> SHA-256 of &quot;abc&quot; = <code className="rounded bg-zinc-100 px-1 text-xs">ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad</code></p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Hash Generator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
