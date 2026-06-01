import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import WordCounter from '@/components/tools/WordCounter';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Instagram Bio Character Counter — Stay Under 150 Characters',
  description:
    'Count characters for your Instagram bio. Instagram bios are limited to 150 characters. Free real-time counter.',
  path: '/word-counter/for-instagram-bio',
  keywords: ['instagram bio character counter', 'instagram bio length', 'instagram bio limit'],
});

const schemas = [
  softwareApplicationSchema({
    name: 'Instagram Bio Character Counter',
    description: 'Count characters for Instagram bio. 150 character limit with live tracking.',
    url: '/word-counter/for-instagram-bio',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Word Counter', url: '/word-counter' },
    { name: 'For Instagram Bio', url: '/word-counter/for-instagram-bio' },
  ]),
];

export default function ForInstagramBioPage() {
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
          title="Instagram Bio Character Counter"
          description="Write your Instagram bio and see how many characters you have left. Instagram bios are limited to 150 characters."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="mb-2 text-base font-semibold text-zinc-900">Instagram Bio Limits</h2>
          <ul className="space-y-1 text-sm text-zinc-600">
            <li>• <strong className="text-zinc-900">Bio:</strong> 150 characters maximum</li>
            <li>• <strong className="text-zinc-900">Username:</strong> 30 characters maximum</li>
            <li>• <strong className="text-zinc-900">Name field:</strong> 30 characters maximum</li>
            <li>• <strong className="text-zinc-900">Website:</strong> 1 link in bio (use linktree for multiple)</li>
          </ul>
        </div>

        <WordCounter defaultLimit={150} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 pb-16">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900">
            Tips for Writing a Great Instagram Bio
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Lead with what you do',
                desc: 'Your first line should immediately tell visitors who you are and what you offer. You have 3 seconds to make an impression.',
              },
              {
                title: 'Include a call to action',
                desc: 'Tell visitors what to do next: "Shop below ↓", "DM for collabs", or "Free guide in link". A CTA increases click-through on your bio link.',
              },
              {
                title: 'Use line breaks for readability',
                desc: 'A bio broken into 3–4 short lines is easier to scan than a dense paragraph. Use the Notes app to format, then copy-paste to Instagram.',
              },
              {
                title: 'Include searchable keywords',
                desc: 'Instagram\'s search indexes your name and username fields — not the bio text. But including relevant terms helps visitors immediately understand your niche.',
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
