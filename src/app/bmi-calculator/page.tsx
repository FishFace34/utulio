import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import BMICalculator from '@/components/tools/BMICalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'BMI Calculator — Body Mass Index (Metric & Imperial)',
  description: 'Calculate your BMI in metric or imperial units and see your weight category. Free BMI calculator.',
  path: '/bmi-calculator',
  keywords: ['bmi calculator', 'body mass index', 'bmi chart'],
});

const FAQS = [
  { question: 'How is BMI calculated?', answer: 'BMI = weight (kg) ÷ height (m)². For imperial: BMI = (weight in lbs ÷ height in inches²) × 703. For example, a person 175cm tall weighing 70kg has BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 = 22.9.' },
  { question: 'What BMI is considered healthy?', answer: 'For adults: Underweight = below 18.5, Normal weight = 18.5–24.9, Overweight = 25–29.9, Obese = 30 and above. These categories are the same for men and women, though the interpretation may differ by age and other factors. BMI ranges for children use different percentile-based thresholds.' },
  { question: 'Is BMI accurate?', answer: 'BMI is a useful screening tool but has significant limitations. It does not distinguish between fat and muscle mass — a muscular athlete might have a "high" BMI but low body fat. It also doesn\'t account for age, sex, ethnicity, or where fat is distributed. A high BMI is associated with increased health risks, but BMI alone cannot diagnose health status.' },
  { question: 'What is a healthy weight for my height?', answer: 'This calculator shows the healthy weight range for your height (BMI 18.5–24.9). For example, a 175cm (5\'9") person\'s healthy weight range is approximately 56.5–76.5 kg (125–169 lbs). These are population-level guidelines, not individual targets.' },
  { question: 'Does BMI apply to children?', answer: 'Children\'s BMI is calculated the same way but interpreted differently using age- and sex-specific percentiles. A child is considered "healthy weight" if BMI falls between the 5th and 85th percentile for their age and sex. This calculator is designed for adults (18+).' },
  { question: 'What is BMI used for?', answer: 'BMI is used by healthcare providers as a quick screening tool to categorize patients and identify potential health risks. It is also used in population-level research. While not a diagnostic tool, a BMI outside the normal range typically prompts further investigation using more detailed measures.' },
];

export default function BMICalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'BMI Calculator', description: 'Calculate Body Mass Index in metric or imperial units with weight category.', url: '/bmi-calculator', category: 'HealthApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'BMI Calculator', url: '/bmi-calculator' }]),
  ];
  const related = getRelatedTools('bmi-calculator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="BMI Calculator" description="Calculate your Body Mass Index in metric (cm/kg) or imperial (ft+in/lbs) units. See your BMI category, healthy weight range, and a visual scale showing where you fall." category="Utility Tools" categoryVariant="utility" />
        <BMICalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Understanding BMI</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Body Mass Index (BMI) was developed in the 1830s by Belgian statistician Adolphe Quetelet as a population-level measure, not an individual diagnostic tool. It became widely used in medicine because it&apos;s quick and requires only height and weight — two measurements anyone can take without specialized equipment.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The formula: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">BMI = kg ÷ m²</code> (metric) or <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">BMI = (lbs ÷ in²) × 703</code> (imperial). <strong className="text-zinc-900">Verification:</strong> 70kg, 175cm → 70 ÷ 3.0625 = 22.9 (Normal weight).</p>
          <p className="text-zinc-600 leading-relaxed">BMI is a starting point, not a complete picture. For a more accurate assessment of body composition, healthcare providers may also measure waist circumference, body fat percentage, blood pressure, cholesterol, and blood sugar. Always consult a healthcare professional for health assessments.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="BMI Calculator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
