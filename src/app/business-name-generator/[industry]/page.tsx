import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator';
import { INDUSTRIES, INDUSTRY_SLUGS } from '@/lib/industries';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export async function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }));
}

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const data = INDUSTRIES[industry];
  if (!data) return {};

  return toolMetadata({
    title: `${data.displayName} Business Name Generator — Free Name Ideas`,
    description: `Generate creative ${data.displayName.toLowerCase()} business name ideas instantly. Free, no signup required.`,
    path: `/business-name-generator/${industry}`,
    keywords: [
      `${data.displayName.toLowerCase()} business name generator`,
      `${data.displayName.toLowerCase()} business names`,
      `${data.displayName.toLowerCase()} company name ideas`,
    ],
  });
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const data = INDUSTRIES[industry];

  if (!data) {
    notFound();
  }

  const schemas = [
    softwareApplicationSchema({
      name: `${data.displayName} Business Name Generator`,
      description: `Generate creative ${data.displayName.toLowerCase()} business name ideas.`,
      url: `/business-name-generator/${industry}`,
      category: 'BusinessApplication',
    }),
    faqPageSchema(data.faqs),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Business Name Generator', url: '/business-name-generator' },
      { name: data.displayName, url: `/business-name-generator/${industry}` },
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
          title={`${data.displayName} Business Name Generator`}
          description={`Generate creative, brandable ${data.displayName.toLowerCase()} business name ideas instantly. Free, no signup required.`}
          category="Business Tools"
          categoryVariant="business"
        />

        {/* Industry intro */}
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900">
            Naming Your {data.displayName} Business
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600">{data.intro}</p>
        </div>

        {/* Example names */}
        <div className="mb-8">
          <h2 className="mb-3 text-base font-semibold text-zinc-900">
            Example {data.displayName} Business Names
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.examples.map((name) => (
              <span
                key={name}
                className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <BusinessNameGenerator defaultIndustry={industry} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <FAQ items={data.faqs} title={`${data.displayName} Business Name FAQs`} />

        <div className="mb-16 mt-4">
          <Link
            href="/business-name-generator"
            className="text-sm font-medium text-zinc-600 underline underline-offset-2 hover:text-zinc-900"
          >
            ← Back to all industries
          </Link>
        </div>
      </Container>
    </>
  );
}
