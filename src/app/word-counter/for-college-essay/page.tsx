import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import WordCounter from '@/components/tools/WordCounter';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Essay Word Counter for College Students — Free Word Count Tool',
  description:
    'Count words in your college essay. Common App limit is 650 words. Track your essay length in real time, free.',
  path: '/word-counter/for-college-essay',
  keywords: ['college essay word counter', 'common app word count', 'essay word limit tool'],
});

const schemas = [
  softwareApplicationSchema({
    name: 'College Essay Word Counter',
    description: 'Count words in college essays. Common App and supplemental essay tracking.',
    url: '/word-counter/for-college-essay',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Word Counter', url: '/word-counter' },
    { name: 'For College Essay', url: '/word-counter/for-college-essay' },
  ]),
];

export default function ForCollegeEssayPage() {
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
          title="Essay Word Counter for College Students"
          description="Track your word count as you write your college essay. See words, characters, and reading time update in real time."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-zinc-900">
            College Essay Word Limits
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="py-1.5 text-left font-medium text-zinc-700">Application</th>
                  <th className="py-1.5 text-right font-medium text-zinc-700">Word Limit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Common App Personal Essay', '650 words'],
                  ['Common App Activities (each)', '150 characters'],
                  ['Common App Additional Info', '650 words'],
                  ['UC Personal Insight Questions (each)', '350 words'],
                  ['Coalition App Essay', '500–650 words'],
                  ['Most supplemental essays', '150–650 words'],
                ].map(([app, limit]) => (
                  <tr key={app} className="border-b border-zinc-100">
                    <td className="py-1.5 text-zinc-600">{app}</td>
                    <td className="py-1.5 text-right font-medium text-zinc-700">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <WordCounter />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 pb-16">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            College Essay Word Count Tips
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Aim for 90–100% of the limit',
                desc: 'For the Common App 650-word essay, aim for 620–650 words. Hitting the limit shows you can fill the space; staying far under can suggest you haven\'t developed your ideas fully.',
              },
              {
                title: 'Never exceed the limit',
                desc: 'Application portals typically hard-stop at the word limit. Going over doesn\'t show ambition — it shows you can\'t follow directions. Always count before submitting.',
              },
              {
                title: 'Cut ruthlessly if over',
                desc: 'If you\'re over the limit, look for adjectives and adverbs to cut, wordy phrases to tighten, and repetitive ideas that can be consolidated.',
              },
              {
                title: 'Count words the same way colleges do',
                desc: 'Colleges count hyphenated words as one word. "Well-being" = 1 word. Numbers written as numerals ("100") count as 1 word. Our counter follows the same conventions.',
              },
            ].map((tip) => (
              <div key={tip.title} className="rounded-xl border border-zinc-200 p-4">
                <h3 className="mb-1.5 font-semibold text-zinc-900">{tip.title}</h3>
                <p className="text-sm text-zinc-500">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
