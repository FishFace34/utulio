import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import PomodoroTimer from '@/components/tools/PomodoroTimer';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Pomodoro Timer — Focus Timer for Studying',
  description: 'Free Pomodoro timer with 25-minute focus sessions and break intervals. Audio cue, progress ring. No signup.',
  path: '/pomodoro-timer',
  keywords: ['pomodoro timer', 'focus timer', 'study timer'],
});

const FAQS = [
  { question: 'What is the Pomodoro Technique?', answer: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into 25-minute focused sessions (called "pomodoros") separated by 5-minute breaks. After 4 pomodoros, you take a longer 15–30 minute break. The name comes from the tomato-shaped kitchen timer Cirillo used as a student.' },
  { question: 'How does the Pomodoro Technique improve focus?', answer: 'The technique works by creating artificial urgency (25 minutes feels manageable), training your brain to focus in short bursts, providing regular breaks to prevent mental fatigue, building awareness of how you spend time, and reducing the impact of interruptions (note them and return after the pomodoro). Consistent practice improves concentration over time.' },
  { question: 'Can I customize the timer durations?', answer: 'Yes — click "Customize durations" below the timer to set your preferred work session length, short break length, and long break length. Some people prefer 50/10 (50 min work, 10 min break) for deeper work. The classic 25/5 is a good starting point, especially for studying or tasks prone to distraction.' },
  { question: 'What happens after 4 pomodoros?', answer: 'After completing 4 focus sessions, this timer automatically switches to the long break (15 minutes by default). Long breaks are for true mental recovery — get up, stretch, hydrate, or do something completely different from work. After the long break, the cycle resets.' },
  { question: 'Should I stop mid-pomodoro if I get interrupted?', answer: 'According to the original technique, if you get interrupted, note the interruption and either handle it in under 2 minutes and continue, or note it for later and finish your pomodoro first. If you do stop mid-pomodoro, that session doesn\'t count — restart the timer. The goal is to train yourself to work without interruption for the full session.' },
  { question: 'How does the audio cue work?', answer: 'This timer uses the Web Audio API to generate a short beep sound when each interval ends — no audio files are downloaded. The beep plays a brief 880Hz tone that fades out over 0.5 seconds. Make sure your device is not on silent if you want to hear the alert. The timer also shows the remaining time in the browser tab title.' },
];

export default function PomodoroTimerPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Pomodoro Timer', description: 'Focus timer with 25-minute work sessions, short and long breaks, and audio cue.', url: '/pomodoro-timer', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Pomodoro Timer', url: '/pomodoro-timer' }]),
  ];
  const related = getRelatedTools('pomodoro-timer', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Pomodoro Timer" description="Boost your focus with the classic 25/5 Pomodoro technique. Visual progress ring, audio cue at the end of each interval, and tab title countdown. Fully customizable." category="Student Tools" categoryVariant="student" />
        <PomodoroTimer />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">The Science Behind the Pomodoro Technique</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Research on focused work supports the core idea behind the Pomodoro Technique. Studies show that sustained focus is cognitively depleting — taking regular breaks actually improves total productive output compared to working continuously. The brain needs periodic rest to consolidate learning and maintain high-quality attention.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The 25-minute interval is short enough to feel approachable (reducing procrastination) but long enough to enter a focused state. The defined endpoint creates a sense of manageable progress — you&apos;re not working &quot;until it&apos;s done,&quot; you&apos;re working &quot;for just 25 more minutes.&quot;</p>
          <p className="text-zinc-600 leading-relaxed">Many users adapt the technique to their own rhythm. Deep work researchers like Cal Newport suggest longer 90-minute sessions for complex creative work. Try different durations to find what works for your tasks and natural focus cycle.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Pomodoro Timer FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
