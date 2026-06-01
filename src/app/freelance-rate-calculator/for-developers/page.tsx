import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RateCalculator from '@/components/tools/RateCalculator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Freelance Developer Rate Calculator — Hourly Rate for Developers',
  description:
    'Calculate your freelance developer hourly rate. For web developers, software engineers, and full-stack developers.',
  path: '/freelance-rate-calculator/for-developers',
  keywords: ['freelance developer rate', 'software engineer hourly rate', 'web developer freelance pricing'],
});

const FAQ_ITEMS = [
  {
    question: 'What is a good hourly rate for a freelance developer?',
    answer:
      'Freelance developer rates range from $50/hour for junior developers to $200+/hour for senior specialists. Full-stack web developers typically charge $75–150/hour, while niche specialists (mobile, security, ML/AI) can command higher rates. Location and technology stack also significantly affect rates.',
  },
  {
    question: 'How do I price my development services if I am switching from salaried employment?',
    answer:
      'Take your annual salary, multiply by 1.5–2x to account for benefits, taxes, downtime, and business expenses, then divide by your billable hours per year. For example, a $90,000 salary becomes a target of $135,000–180,000 in revenue, which translates to roughly $97–130/hour at 1,380 billable hours per year.',
  },
  {
    question: 'Should freelance developers charge more for specialized skills?',
    answer:
      'Absolutely. Developers specializing in high-demand technologies (React, Node.js, cloud architecture, DevOps, AI/ML, mobile) can charge 20–50% more than generalist developers. Niche expertise with limited supply commands the highest rates. If you are the only developer with a specific skill in your market, you can charge a premium.',
  },
  {
    question: 'How many billable hours do freelance developers typically work?',
    answer:
      'Freelance developers typically bill 5–6 hours per day on focused coding work. The remaining time covers code review, documentation, meetings, debugging non-billable issues, learning, and business development. Our default assumes 6 billable hours per day, which is at the high end but realistic for developers who minimize administrative overhead.',
  },
];

export default function ForDevelopersPage() {
  const developerDefaults = {
    desiredAnnualIncome: 90000,
    billableHoursPerDay: 6,
    profitMarginPercent: 20,
  };

  const schemas = [
    softwareApplicationSchema({
      name: 'Freelance Developer Rate Calculator',
      description: 'Calculate your freelance developer hourly rate.',
      url: '/freelance-rate-calculator/for-developers',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Freelance Rate Calculator', url: '/freelance-rate-calculator' },
      { name: 'For Developers', url: '/freelance-rate-calculator/for-developers' },
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
          title="Freelance Developer Rate Calculator"
          description="Find your ideal hourly rate as a freelance web developer, software engineer, or full-stack developer."
          category="Developer Tools"
          categoryVariant="developer"
        />

        {/* Intro */}
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            Setting Your Freelance Developer Rate
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-600">
            <p>
              Freelance developers are in high demand, and the rates reflect that. Whether you
              specialize in frontend, backend, full-stack, mobile, or DevOps, setting the right
              rate ensures you earn what you deserve while staying competitive in the market.
            </p>
            <p>
              The key insight most developers miss: your hourly rate needs to cover not just your
              income, but also self-employment taxes, health insurance, equipment, professional
              development, and the reality that you won&apos;t be billable every working hour.
            </p>
            <p>
              We&apos;ve pre-loaded this calculator with defaults for experienced freelance
              developers: a $90,000 income goal, 6 billable hours per day, and a 20% profit margin.
              Adjust these to match your specific situation.
            </p>
          </div>
        </div>

        <RateCalculator defaults={developerDefaults} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <FAQ items={FAQ_ITEMS} />
      </Container>
    </>
  );
}
