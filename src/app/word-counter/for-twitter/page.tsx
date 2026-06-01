import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import WordCounter from '@/components/tools/WordCounter';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Twitter / X Character Counter — Stay Under 280 Characters',
  description:
    'Count characters for your tweet before posting. Twitter / X has a 280 character limit. Free, instant counter with live tracking.',
  path: '/word-counter/for-twitter',
  keywords: ['twitter character counter', 'tweet length checker', 'x character limit'],
});

const schemas = [
  softwareApplicationSchema({
    name: 'Twitter Character Counter',
    description: 'Count characters for Twitter/X posts. Shows remaining characters with live progress bar.',
    url: '/word-counter/for-twitter',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Word Counter', url: '/word-counter' },
    { name: 'For Twitter', url: '/word-counter/for-twitter' },
  ]),
];

export default function ForTwitterPage() {
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
          title="Twitter / X Character Counter"
          description="Write your tweet here and see your character count update in real time. Stay under 280 characters for standard posts."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-zinc-900">
            Twitter / X Character Limits
          </h2>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>• <strong className="text-zinc-900">Standard tweet:</strong> 280 characters</li>
            <li>• <strong className="text-zinc-900">URLs:</strong> Always count as 23 characters</li>
            <li>• <strong className="text-zinc-900">Replies:</strong> @mentions at start don&apos;t count</li>
            <li>• <strong className="text-zinc-900">Twitter Blue:</strong> Up to 25,000 characters for long posts</li>
          </ul>
        </div>

        <WordCounter defaultLimit={280} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 pb-16">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Tips for Writing Effective Tweets
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Front-load your value',
                desc: 'Put the most important information in the first 120 characters — people often read just the beginning before deciding to engage.',
              },
              {
                title: 'Use thread for longer content',
                desc: 'If your message is more than 280 characters, break it into a numbered thread. Each tweet in a thread is limited to 280 characters.',
              },
              {
                title: 'Save room for engagement',
                desc: 'Leave 20–30 characters free so others can add context when retweeting with a comment.',
              },
              {
                title: 'Links always cost 23 chars',
                desc: 'No matter how short or long, every URL in a tweet counts as exactly 23 characters after Twitter\'s t.co shortening.',
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
