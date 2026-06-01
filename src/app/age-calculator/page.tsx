import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import AgeCalculator from '@/components/tools/AgeCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Age Calculator — Calculate Your Exact Age',
  description: 'Calculate your exact age in years, months, and days. Includes total days, weeks, hours, and next birthday countdown.',
  path: '/age-calculator',
  keywords: ['age calculator', 'how old am i', 'date of birth calculator'],
});

const FAQS = [
  { question: 'How do you calculate exact age?', answer: 'Exact age requires calendar math: count complete years, then complete months within the current year, then remaining days. This differs from simply dividing total days by 365.25 because months have different lengths and leap years add extra days in February.' },
  { question: 'What is a leap year?', answer: 'A leap year has 366 days (February has 29 days instead of 28). A year is a leap year if it is divisible by 4, except century years (1700, 1800, 1900) which are NOT leap years unless divisible by 400 (so 2000 was a leap year, but 1900 was not). This calculator handles leap years correctly.' },
  { question: 'How are birthdays counted across different months?', answer: 'This calculator uses proper calendar arithmetic: if you were born on March 31 and the current date is April 30, you are 0 months and 30 days into your new year of age — not 1 month, because April 31 doesn\'t exist. The days field shows the remaining days after complete months are counted.' },
  { question: 'Why is the total days count different from years × 365?', answer: 'The total days count is the exact number of calendar days between the two dates, accounting for the actual number of days in each month and leap years. This is more accurate than multiplying years by 365 or 365.25.' },
  { question: 'Can I calculate someone\'s age on a past or future date?', answer: 'Yes — change the "Age At Date" field to any past or future date. This is useful for calculating age at a specific historical event, retirement date, or any other milestone. Leave it set to today to calculate current age.' },
  { question: 'How is the next birthday countdown calculated?', answer: 'The calculator finds the next occurrence of your birth month and day in the current or next year, then counts the days between today and that date. If your birthday has already passed this year, it shows days until next year\'s birthday.' },
];

export default function AgeCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Age Calculator', description: 'Calculate exact age in years, months, days with birthday countdown.', url: '/age-calculator', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Age Calculator', url: '/age-calculator' }]),
  ];
  const related = getRelatedTools('age-calculator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Age Calculator" description="Calculate your exact age in years, months, and days from your date of birth. Also shows total days, weeks, hours, day of week you were born, and days until your next birthday." category="Utility Tools" categoryVariant="utility" />
        <AgeCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Age Calculation Methods</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Different cultures count age differently. In most Western countries, age increases on each birthday (0 years old at birth, 1 year old on first birthday). In some East Asian traditions, babies are considered 1 year old at birth and age increases at the new year. This calculator uses the Western counting method.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Exact age calculation requires careful handling of varying month lengths. For example, one month after January 31 is February 28 (or 29 in a leap year) — not March 3. This calculator uses proper calendar arithmetic, not simple day division.</p>
          <p className="text-zinc-600 leading-relaxed">The &quot;age at date&quot; feature is useful for legal and historical purposes: calculating how old someone was on a particular date, determining if someone was a minor at a specific time, or figuring out an age at retirement or graduation.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Age Calculator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
