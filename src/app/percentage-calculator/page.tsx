import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import PercentageCalculator from '@/components/tools/PercentageCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Percentage Calculator — Calculate Percentages Easily',
  description: 'Calculate percentages, percentage increase/decrease, and reverse percentage. 4 modes. Free.',
  path: '/percentage-calculator',
  keywords: ['percentage calculator', 'percent calculator', 'percentage increase'],
});

const FAQS = [
  { question: 'How do I calculate a percentage of a number?', answer: 'To find X% of Y: multiply Y by (X ÷ 100). Example: 25% of 200 = 200 × 0.25 = 50. This calculator\'s first mode ("What is X% of Y?") does this automatically.' },
  { question: 'How do I calculate what percentage X is of Y?', answer: 'Divide X by Y, then multiply by 100. Formula: (X ÷ Y) × 100. Example: 50 is what % of 200? = (50 ÷ 200) × 100 = 25%. Use this calculator\'s second mode for quick results.' },
  { question: 'How do I calculate percentage increase?', answer: 'Percentage change = ((New Value − Old Value) ÷ Old Value) × 100. If the result is positive, it\'s an increase; if negative, a decrease. Example: from 100 to 150 = ((150 − 100) ÷ 100) × 100 = +50% increase.' },
  { question: 'How do I find the original number if I know the percentage?', answer: 'If X is Y% of some number, that number = X ÷ (Y ÷ 100) = X × (100 ÷ Y). Example: 50 is 25% of what? = 50 × (100 ÷ 25) = 50 × 4 = 200. This calculator\'s fourth mode handles this.' },
  { question: 'What is the difference between percentage change and percentage points?', answer: 'Percentage change is a relative measure. If approval rating goes from 50% to 55%, that is a 10% increase (5 ÷ 50 × 100 = 10%). Percentage points is an absolute measure: it went up 5 percentage points. Both are correct but measure different things. Politicians often confuse the two deliberately.' },
  { question: 'How do I calculate a tip percentage?', answer: 'Tip = Bill × (Tip% ÷ 100). For a 20% tip on a $45 bill: $45 × 0.20 = $9.00 tip. Or use our dedicated Tip Calculator for bill splitting. For quick mental math: move the decimal left one place for 10% ($4.50), then double for 20% ($9.00).' },
];

export default function PercentageCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Percentage Calculator', description: 'Calculate percentages in 4 different modes: of, what%, change, and reverse.', url: '/percentage-calculator', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Percentage Calculator', url: '/percentage-calculator' }]),
  ];
  const related = getRelatedTools('percentage-calculator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Percentage Calculator" description="Four percentage calculators in one: find X% of Y, find what % X is of Y, calculate percentage change, and reverse-calculate percentages. Instant results as you type." category="Utility Tools" categoryVariant="utility" />
        <PercentageCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Percentage Formulas</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">The four percentage formulas covered by this calculator:</p>
          <ul className="mb-4 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900">X% of Y</strong>: result = (X ÷ 100) × Y — e.g., 25% of 200 = 50</li>
            <li><strong className="text-zinc-900">X is what % of Y</strong>: result = (X ÷ Y) × 100 — e.g., 50 is 25% of 200</li>
            <li><strong className="text-zinc-900">% change from X to Y</strong>: result = ((Y − X) ÷ X) × 100 — e.g., 100→150 = +50%</li>
            <li><strong className="text-zinc-900">X is Y% of what</strong>: result = X ÷ (Y ÷ 100) — e.g., 50 is 25% of 200</li>
          </ul>
          <p className="text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Verifications:</strong> 25% of 200 = 50 ✓ · 50 is 25% of 200 ✓ · 100→150 = +50% increase ✓ · 50 is 25% of 200 ✓</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Percentage Calculator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
