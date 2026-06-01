import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import TDEECalculator from '@/components/tools/TDEECalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'TDEE Calculator — Daily Calorie Needs',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE) and daily calorie needs. Free calorie calculator.',
  path: '/tdee-calculator',
  keywords: ['tdee calculator', 'calorie calculator', 'maintenance calories'],
});

const FAQS = [
  { question: 'What is TDEE?', answer: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day. It includes your BMR (basal metabolic rate — calories burned at rest) multiplied by an activity factor. Eating at your TDEE maintains your current weight; eating below causes weight loss, above causes weight gain.' },
  { question: 'What is the Mifflin-St Jeor formula?', answer: 'The Mifflin-St Jeor equation is considered the most accurate BMR estimation formula for most people. Men: BMR = 10 × kg + 6.25 × cm − 5 × age + 5. Women: BMR = 10 × kg + 6.25 × cm − 5 × age − 161. This formula was validated in a 1990 study and is the preferred formula used by most registered dietitians.' },
  { question: 'How many calories should I eat to lose weight?', answer: 'A deficit of 500 calories/day below TDEE typically results in approximately 0.5 kg (1 lb) per week of fat loss. A 250-calorie deficit results in ~0.25 kg/week. Very large deficits (below 1200 cal for women, 1500 for men) are not recommended as they risk muscle loss and nutrient deficiencies. Consult a dietitian for personalized guidance.' },
  { question: 'Which activity level should I choose?', answer: 'Sedentary: desk job, little movement. Light: 1-3 gym sessions/week or an active job like teaching. Moderate: 3-5 days of moderate exercise per week. Active: hard exercise 6-7 days/week or a very physical job. Very Active: twice-daily training, hard physical labor all day. Most people overestimate their activity level — when in doubt, choose lower.' },
  { question: 'Why does my actual weight change differ from the calculation?', answer: 'TDEE calculations are estimates. Individual metabolic rates vary by 15-20% from predictions. Hormones, sleep quality, gut microbiome, and other factors affect metabolism. Track actual calories and weight for 2-3 weeks to calibrate — if you\'re eating at calculated TDEE but gaining weight, your actual TDEE is lower than estimated.' },
  { question: 'Should I eat my workout calories back?', answer: 'This depends on how you calculated TDEE. If you used an activity multiplier that includes your workouts (e.g., "active"), you have already accounted for exercise calories — don\'t eat them back. If you used "sedentary" and plan to add exercise calories separately, then yes, add them. This calculator\'s activity multiplier includes exercise in the estimate.' },
];

export default function TDEECalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'TDEE Calculator', description: 'Calculate Total Daily Energy Expenditure and calorie targets using Mifflin-St Jeor formula.', url: '/tdee-calculator', category: 'HealthApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'TDEE Calculator', url: '/tdee-calculator' }]),
  ];
  const related = getRelatedTools('tdee-calculator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="TDEE Calculator" description="Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor formula. Shows maintenance calories, BMR, and calorie targets for weight loss or gain. Metric and imperial." category="Utility Tools" categoryVariant="utility" />
        <TDEECalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How TDEE Calculation Works</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">TDEE calculation has two steps. First, calculate your BMR (Basal Metabolic Rate) — the calories your body burns at complete rest just to sustain life. This uses the Mifflin-St Jeor formula, which accounts for weight, height, age, and sex.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Second, multiply BMR by an activity factor to account for movement and exercise. A sedentary person (×1.2) burns only slightly more than at rest, while a very active person (×1.9) nearly doubles their calorie needs through activity alone.</p>
          <p className="text-zinc-600 leading-relaxed">Weight loss targets: −250 cal/day = ~0.25 kg/week, −500 cal/day = ~0.5 kg/week. Weight gain targets: +250 cal/day = ~0.25 kg/week, +500 cal/day = ~0.5 kg/week. <em>These are estimates — individual results vary. Consult a healthcare provider before making significant dietary changes.</em></p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="TDEE Calculator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
