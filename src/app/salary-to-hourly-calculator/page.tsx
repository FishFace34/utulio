import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import SalaryCalculator from '@/components/tools/SalaryCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Salary to Hourly Calculator — Convert Annual Pay',
  description:
    'Convert your salary to hourly, daily, weekly, and monthly pay — and back. Free salary converter with instant results.',
  path: '/salary-to-hourly-calculator',
  keywords: ['salary to hourly', 'hourly to salary', 'salary calculator'],
});

const FAQS = [
  {
    question: 'How do I convert salary to hourly?',
    answer:
      'Divide your annual salary by the number of work hours in a year. For a 40-hour work week and 52 weeks: $60,000 ÷ (40 × 52) = $60,000 ÷ 2,080 = $28.85 per hour. This calculator does the conversion automatically for any pay type.',
  },
  {
    question: 'How many work hours are in a year?',
    answer:
      'For a standard full-time schedule of 40 hours/week × 52 weeks = 2,080 hours per year. If you work fewer weeks (due to unpaid time off or part-time), adjust the "weeks per year" input accordingly. Some calculations use 250 working days (2,000 hours) to account for a typical holiday schedule.',
  },
  {
    question: 'Does this include paid time off?',
    answer:
      'The calculator uses the total weeks/hours you enter. If you get 2 weeks of paid vacation and still work 52 weeks (including those paid vacation weeks), your hourly rate includes PTO. If you take unpaid time off, reduce the weeks per year to reflect your actual working time.',
  },
  {
    question: 'How do I convert hourly to salary?',
    answer:
      'Multiply your hourly rate by hours per week, then by weeks per year. At $28.85/hour × 40 hours/week × 52 weeks = $60,008 per year. Select "Hourly Rate" as the input type in this calculator and enter your hourly rate to see all equivalent pay periods.',
  },
  {
    question: "What's the difference between gross and net pay?",
    answer:
      'Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you receive after taxes, health insurance premiums, retirement contributions, and other withholdings are deducted. This calculator shows gross pay equivalents. Your actual take-home will be lower depending on your tax situation.',
  },
  {
    question: 'How do unpaid weeks affect my hourly rate?',
    answer:
      'If you work fewer weeks per year (unpaid leave, seasonal work), your effective hourly rate for the hours you work stays the same, but your annualized rate changes. For example, working 48 weeks instead of 52 means your annual income is 48/52 = 92.3% of a full-year salary at the same hourly rate.',
  },
];

export default function SalaryToHourlyPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Salary to Hourly Calculator',
      description: 'Convert annual salary to hourly, daily, weekly, and monthly pay.',
      url: '/salary-to-hourly-calculator',
      category: 'FinanceApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Salary to Hourly Calculator', url: '/salary-to-hourly-calculator' },
    ]),
  ];

  const related = getRelatedTools('salary-to-hourly-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Salary to Hourly Calculator"
          description="Instantly convert any salary to hourly, daily, weekly, and monthly pay. Enter any pay type and get all equivalent rates at once."
          category="Finance Tools"
          categoryVariant="business"
        />

        <SalaryCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Why Convert Salary to Hourly Rate?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Knowing your effective hourly rate is valuable in many situations. Freelancers comparing
            a full-time job offer to contract work need to account for benefits, taxes, and overhead.
            A $70,000 salary might sound better than $35/hour — but $35/hour as a self-employed
            contractor on 2,000 hours is also $70,000, without employer benefits.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Job seekers comparing offers in different pay structures (hourly vs. salary vs. contract)
            can use this tool to normalize all offers to the same basis. A $150/day consulting rate
            works out to roughly $19.50/hour for an 8-hour workday — or about $37,500 annually at
            250 working days.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            This calculator converts between all common pay periods instantly. Just enter any
            amount in any time format and see the equivalent rates across hourly, daily, weekly,
            monthly, and annual pay.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Salary Conversion FAQs" />
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
