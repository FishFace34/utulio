import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RandomNamePicker from '@/components/tools/RandomNamePicker';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Random Name Picker — Pick a Winner Fairly',
  description: 'Enter names and pick a random winner. Great for giveaways, classrooms, and raffles. Free.',
  path: '/random-name-picker',
  keywords: ['random name picker', 'random name generator', 'name wheel'],
});

const FAQS = [
  { question: 'Is the random selection truly fair?', answer: 'Yes — this tool uses crypto.getRandomValues() with rejection sampling to ensure a perfectly unbiased selection. Unlike Math.random() which is a pseudo-random generator, crypto.getRandomValues() uses the system\'s cryptographically secure random number generator (CSPRNG), which is suitable for games, raffles, and fair random selection.' },
  { question: 'Can I pick multiple winners at once?', answer: 'Yes — set the "Pick" count to any number up to the total number of names. Each winner is picked without replacement (no duplicates), so all picks in a single round are unique. This is equivalent to randomly shuffling all names and taking the first N.' },
  { question: 'What does "Remove winner after picking" do?', answer: 'When enabled, each picked winner is removed from the pool for subsequent draws. This is useful for running multiple rounds of a raffle where the same person shouldn\'t win twice. The remaining count is shown below the name list.' },
  { question: 'How many names can I add?', answer: 'This tool handles from 2 to thousands of names. The animation cycles quickly through the list regardless of size. Enter one name per line in the text area. Blank lines are automatically ignored.' },
  { question: 'Can I use this for classroom activities?', answer: 'Absolutely — teachers use random pickers for calling on students, assigning groups, or choosing who presents next. The animated selection builds anticipation and makes the process visibly fair. Students can see their own name was in the pool during the animation.' },
  { question: 'What if I need to verify the fairness of results?', answer: 'This tool uses crypto.getRandomValues() with rejection sampling, which ensures each name has exactly equal probability. The source code runs entirely in your browser with no server communication, so you can inspect it using browser developer tools. For high-stakes raffles, consider using a verifiable random function or third-party service with public auditability.' },
];

export default function RandomNamePickerPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Random Name Picker', description: 'Pick random winners fairly using cryptographic randomness.', url: '/random-name-picker', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Random Name Picker', url: '/random-name-picker' }]),
  ];
  const related = getRelatedTools('random-name-picker', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Random Name Picker" description="Enter your list of names and click to pick a random winner with an animated selection. Supports multiple winners, remove-after-pick mode, and fair cryptographic randomness." category="Student Tools" categoryVariant="student" />
        <RandomNamePicker />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Fair Random Selection</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Fairness in random selection matters — whether you&apos;re running a classroom activity, a social media giveaway, or a company raffle. This picker uses <code className="rounded bg-zinc-100 px-1 text-sm">crypto.getRandomValues()</code> with rejection sampling, which gives every name an exactly equal probability of being selected with no statistical bias.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The animation cycles through random names before landing on the winner, building suspense and showing that all names are in the pool. The final selection is made using the same cryptographic randomness as the preview — not predetermined before the animation starts.</p>
          <p className="text-zinc-600 leading-relaxed">Common uses: classroom participation (cold calling), group assignment, team selection, giveaway winners, assigning tasks, office party games, and any situation where you need visibly fair random selection.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Random Name Picker FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
