import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import AspectRatioCalculator from '@/components/tools/AspectRatioCalculator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'YouTube Thumbnail Size Calculator — 1280×720 Dimensions',
  description:
    'Calculate YouTube thumbnail dimensions proportionally. Standard size is 1280×720 (16:9). Free tool for content creators.',
  path: '/aspect-ratio-calculator/for-youtube-thumbnail',
  keywords: ['youtube thumbnail size', 'youtube thumbnail dimensions', 'youtube thumbnail calculator'],
});

export default function YouTubeThumbnailPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'YouTube Thumbnail Size Calculator',
      description: 'Calculate proportional dimensions for YouTube thumbnails.',
      url: '/aspect-ratio-calculator/for-youtube-thumbnail',
      category: 'UtilityApplication',
    }),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Aspect Ratio Calculator', url: '/aspect-ratio-calculator' },
      { name: 'YouTube Thumbnail', url: '/aspect-ratio-calculator/for-youtube-thumbnail' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="YouTube Thumbnail Size Calculator"
          description="Calculate the correct dimensions for YouTube thumbnails. The standard size is 1280×720 pixels (16:9 ratio). Enter your desired width or height to get the proportional counterpart."
          category="Utility Tools"
          categoryVariant="utility"
        />

        <AspectRatioCalculator defaultWidth={1280} defaultHeight={720} />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">YouTube Thumbnail Requirements</h2>
          <ul className="space-y-2 text-zinc-600 text-sm leading-relaxed list-disc pl-5">
            <li><strong className="text-zinc-900">Recommended size:</strong> 1280×720 pixels (minimum 640px wide)</li>
            <li><strong className="text-zinc-900">Aspect ratio:</strong> 16:9 (the standard YouTube player ratio)</li>
            <li><strong className="text-zinc-900">File format:</strong> JPG, PNG, GIF, or WebP</li>
            <li><strong className="text-zinc-900">Maximum file size:</strong> 2MB</li>
            <li><strong className="text-zinc-900">Best practice:</strong> Use high contrast, readable text, and a clear focal point</li>
          </ul>
        </section>
      </Container>
    </>
  );
}
