import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import DecisionWheel from '@/components/tools/DecisionWheel';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Decision Wheel — Spin to Decide',
  description: 'Add your options and spin the animated wheel to make a random decision. Free spinner wheel.',
  path: '/decision-wheel',
  keywords: ['decision wheel', 'spinner wheel', 'random picker wheel'],
});

const FAQS = [
  { question: 'How does the decision wheel work?', answer: 'Enter your options (one per line), then click "Spin!". The wheel rotates with a smooth animation, decelerating and landing on a randomly selected option. The winning segment is shown below the wheel after the spin completes.' },
  { question: 'Is the wheel selection truly random?', answer: 'Yes — the winning option is determined using crypto.getRandomValues() before the animation starts. The animation shows the wheel spinning to the pre-determined winner. This means each option has an exactly equal probability of winning, regardless of its position on the wheel.' },
  { question: 'What can I use the decision wheel for?', answer: 'Common uses: deciding where to eat, choosing a movie, picking a game, assigning tasks, selecting winners for giveaways, classroom activities, settling friendly disputes, and any situation where you want a fun, visual way to make a random choice from a list of options.' },
  { question: 'How many options can I add?', answer: 'The wheel works best with 2–12 options for readability, but supports more. With many options, the text on each segment may be truncated for display. All options still have equal probability regardless of segment size.' },
  { question: 'Can I use this for classroom activities?', answer: 'Yes — many teachers use spinner wheels for calling on students, assigning groups, picking topics, or adding gamification to lessons. The animated spin builds excitement and the randomness is visibly fair to all students.' },
  { question: 'Why is the selection made before the animation?', answer: 'Pre-determining the winner before the animation starts ensures true randomness and prevents any possibility of the visual position influencing the outcome. It also ensures smooth animation — the wheel always spins to the correct segment without jerking or adjusting mid-spin.' },
];

export default function DecisionWheelPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Decision Wheel', description: 'Animated spinner wheel for random decision making.', url: '/decision-wheel', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Decision Wheel', url: '/decision-wheel' }]),
  ];
  const related = getRelatedTools('decision-wheel', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Decision Wheel" description="Add your options, spin the wheel, and let fate decide. Each spin uses cryptographic randomness for perfectly fair selection. The animated wheel makes any decision fun." category="Utility Tools" categoryVariant="utility" />
        <DecisionWheel />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">When to Use a Decision Wheel</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Decision paralysis is real — sometimes you just need something or someone else to decide. A decision wheel works best for choices where all options are acceptable, but you can&apos;t pick one. If you find yourself hoping for a specific outcome when the wheel spins, that&apos;s actually useful information — it means you had a preference all along.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The spinning animation serves a psychological purpose: it creates a sense of ceremony and finality. &quot;The wheel decided&quot; removes decision-making burden and makes the outcome feel fair to everyone involved — useful for group decisions, games, and classroom activities.</p>
          <p className="text-zinc-600 leading-relaxed">For high-stakes decisions, a spinner wheel is not the right tool. Use it for low-stakes fun choices like where to eat, what movie to watch, or who goes first in a game.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Decision Wheel FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
