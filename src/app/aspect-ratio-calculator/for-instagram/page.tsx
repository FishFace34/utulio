import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import AspectRatioCalculator from '@/components/tools/AspectRatioCalculator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Instagram Image Size Calculator — Post & Story Dimensions',
  description:
    'Calculate correct Instagram image dimensions. Square 1080×1080, portrait 1080×1350, Stories 1080×1920. Free tool for creators.',
  path: '/aspect-ratio-calculator/for-instagram',
  keywords: ['instagram image size', 'instagram dimensions calculator', 'instagram post size'],
});

export default function InstagramPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Instagram Image Size Calculator',
      description: 'Calculate proportional dimensions for Instagram posts and stories.',
      url: '/aspect-ratio-calculator/for-instagram',
      category: 'UtilityApplication',
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Aspect Ratio Calculator', url: '/aspect-ratio-calculator' },
      { name: 'Instagram', url: '/aspect-ratio-calculator/for-instagram' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Instagram Image Size Calculator"
          description="Calculate the right dimensions for Instagram posts, carousels, and Stories. Square posts are 1:1, portrait posts are 4:5, and Stories are 9:16."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <AspectRatioCalculator defaultWidth={1080} defaultHeight={1080} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Instagram Image Sizes (2025)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500">
                  <th className="pb-2 pr-4">Format</th>
                  <th className="pb-2 pr-4">Ratio</th>
                  <th className="pb-2">Recommended Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-600">
                {[
                  ['Square Post', '1:1', '1080×1080 px'],
                  ['Portrait Post', '4:5', '1080×1350 px'],
                  ['Landscape Post', '1.91:1', '1080×566 px'],
                  ['Stories / Reels', '9:16', '1080×1920 px'],
                  ['Profile Photo', '1:1', '320×320 px (displays at 110×110)'],
                ].map(([format, ratio, size]) => (
                  <tr key={format}>
                    <td className="py-2 pr-4 font-medium text-zinc-900">{format}</td>
                    <td className="py-2 pr-4 font-mono">{ratio}</td>
                    <td className="py-2 font-mono text-xs">{size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </>
  );
}
