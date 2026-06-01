import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RandomNumberGenerator from '@/components/tools/RandomNumberGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Random Number Generator — Generate Numbers in Range',
  description: 'Generate random numbers within any range. Bulk generation, no-duplicates option. Cryptographically fair.',
  path: '/random-number-generator',
  keywords: ['random number generator', 'number generator', 'random picker'],
});

const FAQS = [
  { question: 'Is this random number generator truly random?', answer: 'This generator uses crypto.getRandomValues() — the browser\'s cryptographically secure random number generator (CSPRNG). Unlike Math.random(), which is a pseudo-random algorithm, CSPRNG uses hardware entropy sources to generate unpredictable random numbers. Rejection sampling ensures perfectly uniform distribution with no bias toward any particular number.' },
  { question: 'What is rejection sampling?', answer: 'Rejection sampling eliminates modular bias. If you generate a random 32-bit number (0–4,294,967,295) and take it modulo 100, numbers 0–95 appear slightly more often than 96–99 because the range doesn\'t divide evenly. Rejection sampling discards numbers that would cause this bias, ensuring exactly equal probability for every number in your range.' },
  { question: 'What does "no duplicates" mean?', answer: 'When you disable duplicates, each generated number appears at most once in the result set. This is equivalent to randomly drawing numbers from a pool without replacement. For example, generating 5 unique numbers in range 1–10 gives 5 different numbers, none repeated. The total count cannot exceed the size of the range.' },
  { question: 'How do I pick a random winner from a numbered list?', answer: 'Set min to 1, max to the number of entries, and count to 1. Generate once to get the winning number, then look up that position in your list. For multiple winners, increase the count and enable "no duplicates" to ensure each position is picked at most once.' },
  { question: 'Can I generate random lottery numbers?', answer: 'Yes — for example, Powerball uses 5 numbers from 1–69 (no duplicates). Set min=1, max=69, count=5, no duplicates enabled, sorted. For the Powerball number itself (1–26), run a separate generation. Note: this generator is for fun and practice — actual lottery drawings use certified random number generators with regulatory oversight.' },
  { question: 'What is the maximum number of numbers I can generate?', answer: 'This generator supports up to 10,000 numbers per generation. For no-duplicates mode, the count must not exceed the range size (max − min + 1). The display shows the numbers as chips; for very large sets, use the "Copy All" button to copy the full list.' },
];

export default function RandomNumberGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Random Number Generator', description: 'Generate cryptographically random numbers in any range. Supports bulk generation and no-duplicates mode.', url: '/random-number-generator', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Random Number Generator', url: '/random-number-generator' }]),
  ];
  const related = getRelatedTools('random-number-generator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Random Number Generator" description="Generate random numbers within any range using cryptographic randomness. Supports bulk generation up to 10,000 numbers, no-duplicates mode, and sorted output." category="Utility Tools" categoryVariant="utility" />
        <RandomNumberGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Cryptographic vs. Pseudo-Random Numbers</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Most programming languages provide a &quot;random&quot; function based on a deterministic algorithm (PRNG — pseudo-random number generator). These produce numbers that look random but are actually predictable if you know the seed. For games, simulations, and non-security uses, PRNGs are fine.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">For anything requiring fairness (raffles, cryptography, security), use a CSPRNG (cryptographically secure PRNG). This generator uses <code className="rounded bg-zinc-100 px-1 text-sm">crypto.getRandomValues()</code>, which draws from hardware entropy sources — the results are genuinely unpredictable and not reproducible.</p>
          <p className="text-zinc-600 leading-relaxed">Rejection sampling technique used here: <code className="rounded bg-zinc-100 px-1 text-sm">const range = max - min + 1; const maxValid = Math.floor(0xFFFFFFFF / range) * range;</code> — discard values ≥ maxValid to eliminate modular bias, then compute <code className="rounded bg-zinc-100 px-1 text-sm">min + (rand % range)</code>.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Random Number Generator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
