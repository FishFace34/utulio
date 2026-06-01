import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RateCalculator from '@/components/tools/RateCalculator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Freelance Writer Rate Calculator — Hourly Rate for Writers',
  description:
    'Calculate your freelance writing hourly rate. For content writers, copywriters, and technical writers.',
  path: '/freelance-rate-calculator/for-writers',
  keywords: ['freelance writer rate', 'content writer hourly rate', 'copywriter pricing'],
});

const FAQ_ITEMS = [
  {
    question: 'What is a good hourly rate for a freelance writer?',
    answer:
      'Freelance writer rates vary by experience and specialty. Content writers typically charge $25–75/hour, while experienced copywriters and technical writers can charge $75–200+/hour. Many writers also price per word ($0.05–0.50+/word) or per project. Use our calculator to find your minimum hourly rate, then decide on your preferred pricing model.',
  },
  {
    question: 'Should freelance writers charge per word or per hour?',
    answer:
      'Both models work, and each has trade-offs. Per-word pricing is straightforward for clients but penalizes fast writers. Hourly pricing rewards efficiency but requires trust from clients. Many experienced writers use project-based pricing (per article, per page), which captures the full value of their work including research, revision, and strategy.',
  },
  {
    question: 'How do copywriters typically price their services differently from content writers?',
    answer:
      'Copywriters (who write sales pages, emails, and ads) typically charge more than content writers (who write blog posts and articles) because copywriting has a direct and measurable impact on revenue. Direct response copywriters often charge 2–5x more than content writers of equivalent experience, sometimes supplemented by performance bonuses.',
  },
  {
    question: 'How many billable hours per day should a freelance writer plan for?',
    answer:
      'Freelance writers typically bill 3–5 hours of actual writing per day. Writing is mentally demanding, and quality work requires focus and creativity that is hard to sustain for 8 hours. The remaining time covers research, editing, client communication, pitching, and business admin. Our default for writers is 4 billable hours per day.',
  },
];

export default function ForWritersPage() {
  const writerDefaults = {
    desiredAnnualIncome: 50000,
    billableHoursPerDay: 4,
    profitMarginPercent: 15,
  };

  const schemas = [
    softwareApplicationSchema({
      name: 'Freelance Writer Rate Calculator',
      description: 'Calculate your freelance writing hourly rate.',
      url: '/freelance-rate-calculator/for-writers',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Freelance Rate Calculator', url: '/freelance-rate-calculator' },
      { name: 'For Writers', url: '/freelance-rate-calculator/for-writers' },
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
          title="Freelance Writer Rate Calculator"
          description="Find your ideal hourly rate as a freelance content writer, copywriter, or technical writer."
          category="Freelancer Tools"
          categoryVariant="freelancer"
        />

        {/* Intro */}
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            Setting Your Freelance Writing Rate
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-600">
            <p>
              Freelance writing is one of the most accessible yet commonly undervalued creative
              services. Content writers, copywriters, ghostwriters, and technical writers all have
              very different market rates — knowing your numbers helps you charge what your work is
              actually worth.
            </p>
            <p>
              Writing is cognitively demanding work, and most writers can only sustain 3–5 hours of
              focused, billable writing per day. Planning for 4 billable hours per day (rather than
              8) leads to more realistic rates that don&apos;t have you burning out while still
              making less than minimum wage.
            </p>
            <p>
              We&apos;ve pre-loaded this calculator with conservative defaults for freelance writers:
              a $50,000 income goal, 4 billable hours per day, and a 15% profit margin. Adjust
              based on your specialty — copywriters should increase the income goal significantly.
            </p>
          </div>
        </div>

        <RateCalculator defaults={writerDefaults} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <FAQ items={FAQ_ITEMS} />
      </Container>
    </>
  );
}
