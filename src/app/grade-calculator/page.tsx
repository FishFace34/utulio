import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import GradeCalculator from '@/components/tools/GradeCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Grade Calculator — Weighted Grades & Final Grade Needed',
  description:
    'Calculate your weighted course grade and find out what score you need on your final exam. Free grade calculator for students.',
  path: '/grade-calculator',
  keywords: ['grade calculator', 'final grade calculator', 'weighted grade calculator'],
});

const FAQS = [
  {
    question: 'How do I calculate my weighted grade?',
    answer:
      'Multiply each assignment\'s score by its weight percentage, sum the results, then divide by the total weight. For example: Homework (90% score, 20% weight = 18), Midterm (75% score, 30% weight = 22.5), Projects (85% score, 20% weight = 17). Sum = 57.5 ÷ 70 = 82.1% if weights don\'t add to 100%.',
  },
  {
    question: 'How do I find what I need on the final?',
    answer:
      'Formula: Final Needed = (Target Grade − Current Grade × (Current Weight ÷ 100)) ÷ (Final Weight ÷ 100). For example, current grade 85%, completed 70% of the course, final is worth 30%, target is 90%: (90 − 85 × 0.7) ÷ 0.3 = (90 − 59.5) ÷ 0.3 = 30.5 ÷ 0.3 ≈ 101.7%.',
  },
  {
    question: "What if my weights don't add up to 100%?",
    answer:
      'This tool shows a warning when weights don\'t sum to 100%. The calculated grade may not reflect your final course grade accurately. Check with your instructor\'s syllabus for the exact weight breakdown. A common case is when the final exam hasn\'t been entered yet.',
  },
  {
    question: 'How are letter grades assigned?',
    answer:
      'This calculator uses the common US grading scale: A (93–100), A- (90–92), B+ (87–89), B (83–86), B- (80–82), C+ (77–79), C (73–76), C- (70–72), D+ (67–69), D (60–66), F (below 60). Your school may use a different scale.',
  },
  {
    question: 'Can my required grade exceed 100%?',
    answer:
      'Yes — this happens when the grades earned so far make a target grade mathematically impossible to achieve. For example, if you need 101.7% on the final and your instructor only gives up to 100%, the target grade is not achievable. The calculator displays a warning in this case.',
  },
  {
    question: 'How do I raise my grade?',
    answer:
      'Focus on the highest-weighted remaining assignments. Use the "Final Needed" mode to see exactly what score you need. If extra credit is available, factor it in. Communicate with your instructor early if you are struggling — many offer accommodations or retake options.',
  },
];

export default function GradeCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Grade Calculator',
      description: 'Calculate weighted course grades and final exam scores needed.',
      url: '/grade-calculator',
      category: 'EducationalApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Grade Calculator', url: '/grade-calculator' },
    ]),
  ];

  const related = getRelatedTools('grade-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Grade Calculator"
          description="Calculate your current weighted grade and find out exactly what score you need on the final exam to hit your target. Two modes: Current Grade and Final Needed."
          category="Student Tools"
          categoryVariant="default"
        />

        <GradeCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Understanding Weighted Grades</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Most courses don&apos;t treat all assignments equally. A final exam worth 30% of your grade
            has three times the impact of a homework category worth 10%. Weighted grade calculations
            account for these differences, giving you an accurate picture of where you stand.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Always refer to your course syllabus for the exact weight breakdown. Weights should sum
            to exactly 100% for an accurate calculation. If you&apos;re entering grades mid-semester,
            the weights of ungraded categories will reduce the total, and the calculator will
            display a warning.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            The &quot;Final Needed&quot; mode is especially useful near the end of the semester. Enter your
            current grade, how much of the course grade that represents, the final exam&apos;s weight,
            and your target grade — and instantly see what you need to score on the final.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Grade Calculator FAQs" />
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
