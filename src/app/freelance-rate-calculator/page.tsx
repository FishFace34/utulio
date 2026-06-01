import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RateCalculator from '@/components/tools/RateCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Freelance Rate Calculator — Find Your Hourly Rate',
  description:
    'Calculate your ideal freelance hourly rate based on your income goals, expenses, and working hours. Free, instant, no signup.',
  path: '/freelance-rate-calculator',
  keywords: ['freelance rate calculator', 'hourly rate calculator', 'freelance pricing'],
});

const FAQ_ITEMS = [
  {
    question: 'How do I calculate my freelance hourly rate?',
    answer:
      'To calculate your freelance hourly rate, add up your desired annual income and annual business expenses, then divide by (1 minus your tax rate) to gross up for taxes. Multiply by (1 plus your profit margin) to add a business buffer. Finally, divide by your total billable hours per year (working days × billable hours per day). Our calculator does all of this automatically as you type.',
  },
  {
    question: "What's a good profit margin for freelancers?",
    answer:
      'A profit margin of 15–25% is common for freelancers. This buffer covers slow periods, unexpected expenses, professional development, and business reinvestment. Newer freelancers often start at 15–20%, while experienced freelancers with strong demand can justify 25–30% or more.',
  },
  {
    question: 'How many billable hours should I plan per year?',
    answer:
      'Most freelancers bill 4–6 hours per working day, not 8, because the rest goes to admin, marketing, sales, and non-billable client communication. Multiply your daily billable hours by your working days (typically 220–250, accounting for weekends, vacation, and holidays). Our default assumes 6 billable hours × 230 working days = 1,380 billable hours per year.',
  },
  {
    question: 'Should I include taxes in my hourly rate?',
    answer:
      'Yes, absolutely. As a freelancer, you are responsible for your own taxes, including self-employment tax (roughly 15% in the US) plus income tax. If you charge clients your desired net income without accounting for taxes, you will significantly underprice yourself. Our calculator grosses up your rate to ensure you keep enough after taxes.',
  },
  {
    question: 'How is freelance rate different from salary?',
    answer:
      'A salaried employee typically earns a gross salary and receives benefits (health insurance, paid leave, retirement contributions) worth 20–30% of their salary. As a freelancer, you pay for all benefits yourself, are not paid for vacation or sick days, and must handle your own taxes. This means a fair freelance rate is typically 50–100% higher than the equivalent salaried position.',
  },
  {
    question: 'How often should I review my freelance rate?',
    answer:
      'Review your freelance rate at least once per year, typically at the start of the new year. Also revisit your rate if your expenses increase significantly, you gain new skills or certifications, you are consistently fully booked (a sign of strong demand), or inflation erodes your purchasing power. Many freelancers raise their rates by 5–10% annually.',
  },
];

export default function FreelanceRateCalculatorPage() {
  const relatedTools = getRelatedTools('freelance-rate-calculator', 4);
  const schemas = [
    softwareApplicationSchema({
      name: 'Freelance Rate Calculator',
      description: 'Calculate your ideal freelance hourly, daily, and monthly rates.',
      url: '/freelance-rate-calculator',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Freelance Rate Calculator', url: '/freelance-rate-calculator' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
        />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Freelance Rate Calculator"
          description="Enter your income goals and working schedule to instantly see your ideal hourly, daily, weekly, and monthly freelance rate."
          category="Freelancer Tools"
          categoryVariant="freelancer"
        />

        <RateCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Enter your income goal',
                desc: 'Set the annual take-home income you want to earn after taxes.',
              },
              {
                step: '2',
                title: 'Add your expenses & tax rate',
                desc: 'Include monthly business expenses and your estimated tax rate.',
              },
              {
                step: '3',
                title: 'Get your rates instantly',
                desc: 'See your hourly, daily, weekly, and monthly rates update in real time.',
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-zinc-900">{s.title}</h3>
                  <p className="text-sm text-zinc-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formula */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            How We Calculate Your Rate
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <p className="mb-4 text-sm leading-relaxed text-zinc-600">
              Our formula ensures your rate covers your desired income, business expenses, taxes, and
              a profit buffer — while being grounded in realistic billable hours.
            </p>
            <ol className="space-y-2 text-sm text-zinc-700">
              <li>
                <strong>1. Total Annual Need</strong> = Desired Income + (Monthly Expenses × 12)
              </li>
              <li>
                <strong>2. Gross Revenue Needed</strong> = Total Need ÷ (1 − Tax Rate)
              </li>
              <li>
                <strong>3. Target Revenue</strong> = Gross Revenue × (1 + Profit Margin)
              </li>
              <li>
                <strong>4. Billable Hours/Year</strong> = Working Days × Billable Hours/Day
              </li>
              <li>
                <strong>5. Hourly Rate</strong> = Target Revenue ÷ Billable Hours/Year
              </li>
            </ol>
          </div>
        </section>

        {/* Variant links */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">Calculator by Profession</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/freelance-rate-calculator/for-designers', label: 'For Designers' },
              { href: '/freelance-rate-calculator/for-developers', label: 'For Developers' },
              { href: '/freelance-rate-calculator/for-writers', label: 'For Writers' },
            ].map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
              >
                {v.label} →
              </Link>
            ))}
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} />

        {/* Related Tools */}
        <section className="mt-4 pb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
