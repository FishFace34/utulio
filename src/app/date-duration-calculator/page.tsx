import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import DateDurationCalculator from '@/components/tools/DateDurationCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Date Duration Calculator — Days Between Dates',
  description: 'Calculate the number of days, weeks, and months between two dates. Includes business days option.',
  path: '/date-duration-calculator',
  keywords: ['date duration calculator', 'days between dates', 'date difference'],
});

const FAQS = [
  { question: 'How many days are between two dates?', answer: 'Enter your start and end dates and this calculator will show the exact number of days between them. Toggle "Include end date" if you want to count both the first and last day (useful for date ranges like event durations or billing periods).' },
  { question: 'What are business days?', answer: 'Business days (also called working days) are Monday through Friday, excluding weekends (Saturday and Sunday). This calculator\'s business day count does not exclude public holidays — it only excludes weekends. For holiday-aware business day calculation, you would need to specify which holidays to exclude.' },
  { question: 'What is the difference between "days between" and "duration"?', answer: 'From January 1 to January 10 is 9 days between (10 - 1 = 9), but a duration of 10 days if you count both January 1 and January 10 inclusively. Toggle "Include end date" to switch between these two conventions.' },
  { question: 'How many days until a future date?', answer: 'Set the start date to today and the end date to your future date. The result shows how many days remain. This works for deadlines, countdowns, and project planning.' },
  { question: 'How many days since a past date?', answer: 'Set the start date to the past date and the end date to today. This is useful for tracking how long something has been running, how many days since an event, or calculating age in days.' },
  { question: 'How are weeks calculated?', answer: 'The weeks breakdown shows complete weeks (total days ÷ 7, rounded down) and remaining days. For example, 30 days = 4 weeks and 2 days.' },
];

export default function DateDurationCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Date Duration Calculator', description: 'Calculate days, weeks, and months between two dates.', url: '/date-duration-calculator', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Date Duration Calculator', url: '/date-duration-calculator' }]),
  ];
  const related = getRelatedTools('date-duration-calculator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Date Duration Calculator" description="Calculate the exact number of days, weeks, and months between any two dates. Toggle business-days-only mode to exclude weekends, and include/exclude the end date." category="Utility Tools" categoryVariant="utility" />
        <DateDurationCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Date Calculation Use Cases</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Date duration calculations are useful in many contexts: project management (how long until a deadline?), legal (how many days since an agreement?), payroll (how many business days in a pay period?), and personal tracking (how many days until an event?).</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">The business days calculation is particularly useful for deadline estimation and SLA (Service Level Agreement) tracking. If a contract requires response &quot;within 5 business days,&quot; you can enter the start date and count forward to find the deadline — taking weekends off the count automatically.</p>
          <p className="text-zinc-600 leading-relaxed">Note that this calculator excludes weekends but not holidays. Public holidays vary by country, region, and industry. For holiday-aware calculations, consult a specialized project management or HR tool.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Date Duration FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
