import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import WordCounter from '@/components/tools/WordCounter';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Word Counter — Count Words, Characters & Reading Time',
  description:
    'Free word counter with character count, reading time, and keyword density. Works for essays, tweets, and content.',
  path: '/word-counter',
  keywords: ['word counter', 'character counter', 'reading time calculator', 'word count tool'],
});

const FAQ_ITEMS = [
  {
    question: 'How are words counted?',
    answer:
      'Words are counted by splitting text on whitespace (spaces, tabs, line breaks) and filtering out empty segments. Hyphenated words like "well-being" count as one word. Numbers count as words. Punctuation attached to words is ignored.',
  },
  {
    question: 'Does the tool save my text?',
    answer:
      'No. Your text is processed entirely in your browser using JavaScript. It is never sent to any server, saved to a database, or logged. When you close the tab, the text is gone. This is by design — complete privacy.',
  },
  {
    question: 'How is reading time calculated?',
    answer:
      'Reading time is calculated based on the average adult reading speed of 200 words per minute (WPM). This is a widely used benchmark. Actual reading speed varies by individual, content complexity, and purpose (skimming vs. deep reading). Speaking time uses 130 WPM, which is the average conversational speaking speed.',
  },
  {
    question: "What's the character limit for Twitter/X?",
    answer:
      'Twitter/X allows 280 characters per tweet (basic accounts), including spaces and punctuation. Links count as 23 characters regardless of actual length. Media attachments, polls, and quote tweets do not consume character count.',
  },
  {
    question: 'How do I count words excluding spaces?',
    answer:
      'Use the "Characters (no spaces)" stat in our counter, which shows the total character count with all whitespace removed. This is useful for SMS messaging, SMS-based character limits, and certain publishing platforms.',
  },
  {
    question: 'Is my text sent to any server?',
    answer:
      'No. All word counting and statistics calculation happens locally in your browser. Your text never leaves your device. You can verify this by disconnecting from the internet — the tool will continue to work perfectly.',
  },
];

export default function WordCounterPage() {
  const relatedTools = getRelatedTools('word-counter', 4);
  const schemas = [
    softwareApplicationSchema({
      name: 'Word & Character Counter',
      description: 'Count words, characters, sentences, reading time, and keyword frequency.',
      url: '/word-counter',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Word Counter', url: '/word-counter' },
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
          title="Word & Character Counter"
          description="Paste or type your text to instantly see word count, character count, reading time, and more. Works for any content."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <WordCounter />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        {/* Reading time */}
        <section className="mt-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            How Is Reading Time Calculated?
          </h2>
          <p className="mb-4 leading-relaxed text-zinc-600">
            Our reading time estimate uses the widely-accepted benchmark of{' '}
            <strong className="text-zinc-900">200 words per minute (WPM)</strong>, which represents
            the average adult reading speed for informational content. Speaking time uses{' '}
            <strong className="text-zinc-900">130 WPM</strong>, the average conversational speaking
            pace.
          </p>
          <p className="leading-relaxed text-zinc-600">
            Note that these are averages — actual reading speed varies based on content complexity,
            familiarity with the topic, and whether you&apos;re skimming or reading for deep
            comprehension.
          </p>
        </section>

        {/* Word count table */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            Word Count Requirements for Common Platforms
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-left font-semibold text-zinc-900">Platform / Format</th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-900">Character Limit</th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-900">Word Limit</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { platform: 'Twitter / X post', chars: '280', words: '~50' },
                  { platform: 'Instagram caption', chars: '2,200', words: '~400' },
                  { platform: 'Instagram bio', chars: '150', words: '~25' },
                  { platform: 'LinkedIn post', chars: '3,000', words: '~500' },
                  { platform: 'Meta title tag', chars: '60', words: '~8' },
                  { platform: 'Meta description', chars: '160', words: '~25' },
                  { platform: 'SMS message', chars: '160', words: '~25' },
                  { platform: 'Common App essay', chars: '—', words: '650' },
                  { platform: 'Blog post (typical)', chars: '—', words: '1,000–2,500' },
                  { platform: 'Short story', chars: '—', words: '1,000–7,500' },
                ].map((row) => (
                  <tr key={row.platform} className="border-b border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-700">{row.platform}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-500">{row.chars}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-500">{row.words}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
