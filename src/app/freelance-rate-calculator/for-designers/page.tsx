import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RateCalculator from '@/components/tools/RateCalculator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Freelance Designer Rate Calculator — Hourly Rate for Designers',
  description:
    'Calculate your freelance design hourly rate. Tailored for graphic designers, UI/UX designers, and branding professionals.',
  path: '/freelance-rate-calculator/for-designers',
  keywords: ['freelance designer rate', 'graphic designer hourly rate', 'UI UX freelance pricing'],
});

const FAQ_ITEMS = [
  {
    question: 'What is a good hourly rate for a freelance graphic designer?',
    answer:
      'Freelance graphic designer rates vary widely based on experience, specialty, and location. Junior designers typically charge $25–50/hour, mid-level designers $50–100/hour, and senior or specialist designers $100–200+/hour. UI/UX designers often command higher rates than general graphic designers due to the specialized skill set and demand.',
  },
  {
    question: 'Should I charge by the hour or by the project as a designer?',
    answer:
      'Many experienced designers transition from hourly to project-based pricing as they become more efficient. Project pricing rewards speed and expertise. However, hourly pricing works well for open-ended engagements or when scope is unclear. Use our calculator to determine your minimum hourly rate, then apply that to project estimates.',
  },
  {
    question: 'How do UI/UX designer rates compare to graphic designer rates?',
    answer:
      'UI/UX designers typically command 20–40% higher rates than general graphic designers due to the technical complexity, research skills, and direct business impact of their work. Senior UX designers in major markets often charge $100–200+ per hour. The gap grows larger at senior levels.',
  },
  {
    question: 'How many billable hours should a freelance designer plan for?',
    answer:
      'Experienced freelance designers typically bill 4–5 hours per working day, not 8. The remaining time goes to client communication, revisions discussions, invoicing, business development, and professional learning. Our default for designers is 5 billable hours per day, which totals approximately 1,150 hours per year.',
  },
];

export default function ForDesignersPage() {
  const designerDefaults = {
    desiredAnnualIncome: 70000,
    billableHoursPerDay: 5,
    profitMarginPercent: 25,
  };

  const schemas = [
    softwareApplicationSchema({
      name: 'Freelance Designer Rate Calculator',
      description: 'Calculate your freelance design hourly rate.',
      url: '/freelance-rate-calculator/for-designers',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Freelance Rate Calculator', url: '/freelance-rate-calculator' },
      { name: 'For Designers', url: '/freelance-rate-calculator/for-designers' },
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
          title="Freelance Designer Rate Calculator"
          description="Find your ideal hourly rate as a freelance graphic designer, UI/UX designer, or branding professional."
          category="Freelancer Tools"
          categoryVariant="freelancer"
        />

        {/* Intro */}
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            Setting Your Freelance Design Rate
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-zinc-600">
            <p>
              Setting the right freelance rate as a designer requires balancing market rates with
              your personal financial goals. Many designers underprice their work early in their
              career, leaving significant income on the table.
            </p>
            <p>
              The design industry spans a wide range of specializations — graphic design, branding,
              UI/UX, motion design, product design — each with different market rates. As a general
              rule, the more specialized and technical your skill set, the higher your rate can be.
            </p>
            <p>
              We&apos;ve pre-loaded this calculator with defaults relevant to experienced freelance
              designers: a $70,000 income goal, 5 billable hours per day (realistic for design work
              which requires deep focus), and a 25% profit margin to cover slow periods and equipment.
            </p>
          </div>
        </div>

        <RateCalculator defaults={designerDefaults} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <FAQ items={FAQ_ITEMS} />
      </Container>
    </>
  );
}
