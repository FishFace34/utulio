import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Business Name Generator — Free Brand Name Ideas',
  description:
    'Generate creative business name ideas instantly. Free, no signup. 1000+ unique combinations for any industry.',
  path: '/business-name-generator',
  keywords: ['business name generator', 'company name ideas', 'brand name generator'],
});

const FAQ_ITEMS = [
  {
    question: 'How does this business name generator work?',
    answer:
      'Our generator combines industry-specific words, descriptors, and suffixes using different style patterns (modern, classic, playful, professional) to create unique, brandable business names. All generation happens instantly in your browser using pre-built word lists — no AI or external API required.',
  },
  {
    question: 'Are the generated names available as domain names?',
    answer:
      'Not necessarily. Domain availability changes constantly. Each name card includes a link to check domain availability on Namecheap. We recommend checking both the exact .com and alternative TLDs like .io or .co. Also search for the name on social media platforms to ensure handle availability.',
  },
  {
    question: 'Can I trademark a name from this generator?',
    answer:
      'Generated names are not pre-screened for trademark conflicts. Before using a business name commercially, you should search the USPTO trademark database (for US businesses) or your national trademark registry. Consider consulting a trademark attorney for high-value brands.',
  },
  {
    question: 'How do I choose the best business name?',
    answer:
      'The best business name is easy to remember, easy to spell, and works well as a domain name and social media handle. Check if it\'s available as a .com, search it on Google to see what comes up, say it out loud to test pronunciation, and get feedback from your target customers. A name that resonates with your audience is more important than one you personally love.',
  },
  {
    question: 'Should my business name describe what I do?',
    answer:
      'Descriptive names have the advantage of immediate clarity ("Fast Loans," "Quick Clean") but can feel generic and hard to trademark. Abstract or invented names (Apple, Nike, Google) are more distinctive and scalable but require more marketing to build association. For small local businesses, descriptive names often work better. For scalable brands, unique names have long-term advantages.',
  },
  {
    question: "What if I don't like any of the generated names?",
    answer:
      'Click "Regenerate" to get a fresh batch of 20 names. Try different style options (modern vs. classic vs. playful) or different length settings. You can also use the generated names as inspiration — take your favorite elements and combine them with your own words. Consider the generated names as a creative starting point rather than final answers.',
  },
];

export default function BusinessNameGeneratorPage() {
  const relatedTools = getRelatedTools('business-name-generator', 4);
  const schemas = [
    softwareApplicationSchema({
      name: 'Business Name Generator',
      description: 'Generate creative business name ideas for any industry.',
      url: '/business-name-generator',
      category: 'BusinessApplication',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Business Name Generator', url: '/business-name-generator' },
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
          title="Business Name Generator"
          description="Generate 20 unique, creative business name ideas instantly. Choose your industry, style, and length preference — no signup needed."
          category="Business Tools"
          categoryVariant="business"
        />

        <BusinessNameGenerator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        {/* Industry pages */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Business Names by Industry
          </h2>
          <div className="flex flex-wrap gap-2">
            {['bakery', 'consulting', 'cleaning', 'coffee-shop', 'tech-startup', 'fitness',
              'yoga-studio', 'photography', 'clothing-boutique', 'restaurant', 'hair-salon',
              'real-estate', 'marketing-agency', 'construction', 'pet-grooming', 'event-planning',
              'landscaping', 'tutoring', 'graphic-design', 'e-commerce'
            ].map((slug) => (
              <a
                key={slug}
                href={`/business-name-generator/${slug}`}
                className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
              >
                {slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </a>
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
