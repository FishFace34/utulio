import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import GPACalculator from '@/components/tools/GPACalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'GPA Calculator — Calculate Your Grade Point Average',
  description: 'Calculate your GPA from course grades and credit hours. Standard 4.0 scale. Free GPA calculator.',
  path: '/gpa-calculator',
  keywords: ['gpa calculator', 'college gpa calculator', 'grade point average'],
});

const FAQS = [
  { question: 'How is GPA calculated?', answer: 'GPA = Total Quality Points ÷ Total Credit Hours. Quality points for each course = Grade Points × Credit Hours. For example, an A (4.0) in a 3-credit course = 12 quality points. Sum all quality points, divide by total credit hours.' },
  { question: 'What is a good GPA?', answer: 'A 4.0 GPA is a perfect A average. Generally: 3.7+ is exceptional (A range), 3.0–3.6 is good (B range), 2.0–2.9 is average (C range). Many graduate schools require a minimum 3.0 GPA. Scholarships, honors programs, and competitive employers often set specific GPA requirements.' },
  { question: 'What is the difference between GPA and cumulative GPA?', answer: 'A semester GPA is calculated for one term only. Cumulative GPA covers all semesters combined. This calculator computes a GPA for the courses you enter — to calculate your cumulative GPA, either enter all courses you\'ve ever taken, or add your current cumulative GPA weighted by credits completed.' },
  { question: 'Does an A+ affect GPA differently than an A?', answer: 'On the standard 4.0 scale, A+ and A are both worth 4.0 grade points. This is the most common grading scale used in the U.S. Some schools use a 4.3 scale where A+ = 4.3, but this is less common. Check your school\'s official grading policy.' },
  { question: 'How do I raise my GPA?', answer: 'Your GPA is a weighted average, so recent grades in high-credit courses have the most impact. To raise a 3.0 GPA to 3.5 over two more semesters, you would need to average approximately 4.0 in those semesters (the exact amount depends on credits completed). Retaking failed or low-grade courses (where the new grade replaces the old) is another effective strategy if your school allows it.' },
  { question: 'What is the difference between a weighted and unweighted GPA?', answer: 'An unweighted GPA treats all courses equally (on a 4.0 scale). A weighted GPA gives extra points for harder courses — for example, AP or honors courses might be worth 5.0 instead of 4.0 for an A. This calculator uses the standard unweighted 4.0 scale. Check if your school or program uses a weighted scale.' },
];

export default function GPACalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'GPA Calculator', description: 'Calculate your GPA from course grades and credit hours on the standard 4.0 scale.', url: '/gpa-calculator', category: 'EducationApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'GPA Calculator', url: '/gpa-calculator' }]),
  ];
  const related = getRelatedTools('gpa-calculator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="GPA Calculator" description="Calculate your GPA from course grades and credit hours. Uses the standard 4.0 scale with all letter grades including +/− modifiers. Add or remove courses instantly." category="Student Tools" categoryVariant="student" />
        <GPACalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How GPA Calculation Works</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">GPA uses a weighted average where each course&apos;s contribution is proportional to its credit hours. A 4-credit course has twice the impact on your GPA as a 2-credit course. This is why high-credit courses (labs, core requirements) matter more to your overall average.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The standard 4.0 scale: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0. Many U.S. colleges use exactly this scale, though some have minor variations.</p>
          <p className="text-zinc-600 leading-relaxed">To verify: a student taking three 3-credit courses (A, B+, B) has quality points: (4.0×3) + (3.3×3) + (3.0×3) = 12 + 9.9 + 9 = 30.9 ÷ 9 credits = GPA of 3.43.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="GPA Calculator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
