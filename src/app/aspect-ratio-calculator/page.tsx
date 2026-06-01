import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import AspectRatioCalculator from '@/components/tools/AspectRatioCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Aspect Ratio Calculator — Resize Dimensions Proportionally',
  description:
    'Calculate proportional dimensions for any aspect ratio. Enter one dimension to get the other automatically. Free tool for images, video, and design.',
  path: '/aspect-ratio-calculator',
  keywords: ['aspect ratio calculator', 'ratio calculator', 'image dimensions'],
});

const FAQS = [
  {
    question: 'What is an aspect ratio?',
    answer:
      'An aspect ratio is the proportional relationship between an image or screen\'s width and height. It\'s written as two numbers separated by a colon (e.g., 16:9). A 16:9 ratio means for every 16 units of width, there are 9 units of height, regardless of actual pixel dimensions.',
  },
  {
    question: 'How do I keep proportions when resizing?',
    answer:
      'Enter your original width and height, then enter just the new width (or height) — the other dimension will be calculated automatically to maintain the exact same aspect ratio. This ensures your image or video won\'t appear stretched or squished.',
  },
  {
    question: "What's the best aspect ratio for YouTube?",
    answer:
      'YouTube recommends 16:9 for standard videos, with a minimum resolution of 1280×720 (720p). The ideal upload resolution is 1920×1080 (Full HD) or higher. YouTube thumbnails should also be 16:9 at 1280×720 pixels.',
  },
  {
    question: 'What aspect ratio is 1080p?',
    answer:
      '1080p (1920×1080 pixels) is a 16:9 aspect ratio. You can verify this: gcd(1920, 1080) = 120. 1920÷120 = 16, 1080÷120 = 9. So 1920×1080 simplifies to 16:9.',
  },
  {
    question: 'How do I calculate a missing dimension?',
    answer:
      'If you know the desired width and the original aspect ratio: New Height = New Width ÷ (Original Width ÷ Original Height). If you know the desired height: New Width = New Height × (Original Width ÷ Original Height). This calculator handles both automatically.',
  },
  {
    question: 'What does 16:9 mean?',
    answer:
      '16:9 means the width is 16 units for every 9 units of height. This is the modern standard widescreen format used by HDTVs, computer monitors, YouTube, and most video content. Other common ratios: 4:3 (older TV/monitors), 1:1 (square, popular on Instagram), 9:16 (vertical/portrait for mobile).',
  },
];

export default function AspectRatioCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Aspect Ratio Calculator',
      description: 'Calculate proportional image dimensions for any aspect ratio.',
      url: '/aspect-ratio-calculator',
      category: 'UtilityApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Aspect Ratio Calculator', url: '/aspect-ratio-calculator' },
    ]),
  ];

  const related = getRelatedTools('aspect-ratio-calculator', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Aspect Ratio Calculator"
          description="Enter any width or height to get the proportional counterpart. Resize images, videos, and canvases without distortion. Includes presets for common ratios."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <AspectRatioCalculator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Common Aspect Ratios</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500">
                  <th className="pb-2 pr-6">Ratio</th>
                  <th className="pb-2 pr-6">Common Use</th>
                  <th className="pb-2">Example Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-600">
                {[
                  ['16:9', 'HD video, YouTube, presentations', '1920×1080'],
                  ['4:3', 'Classic TV, old monitors', '1024×768'],
                  ['1:1', 'Instagram square, profile photos', '1080×1080'],
                  ['9:16', 'Mobile video, Instagram Stories, TikTok', '1080×1920'],
                  ['21:9', 'Ultra-wide monitors, cinema', '2560×1080'],
                  ['3:2', 'DSLR photos, 35mm film', '3000×2000'],
                ].map(([ratio, use, size]) => (
                  <tr key={ratio}>
                    <td className="py-2 pr-6 font-mono font-semibold text-zinc-900">{ratio}</td>
                    <td className="py-2 pr-6">{use}</td>
                    <td className="py-2 font-mono text-xs">{size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Aspect Ratio FAQs" />
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
