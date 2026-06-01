import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import BoxShadowGenerator from '@/components/tools/BoxShadowGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'CSS Box Shadow Generator — Visual Shadow Maker',
  description: 'Create CSS box shadows visually with live preview and copy the code. Free box-shadow generator.',
  path: '/box-shadow-generator',
  keywords: ['box shadow generator', 'css box shadow', 'shadow generator'],
});

const FAQS = [
  { question: 'What is box-shadow in CSS?', answer: 'The CSS box-shadow property adds shadow effects around an element\'s frame. You can set multiple shadows using comma-separated values. Each shadow is defined by: horizontal offset, vertical offset, blur radius, spread radius, color, and an optional inset keyword.' },
  { question: 'What do the box-shadow parameters mean?', answer: 'Horizontal offset: positive moves shadow right, negative moves left. Vertical offset: positive moves shadow down, negative moves up. Blur radius: 0 = sharp edges, larger values = more blurred. Spread radius: positive expands the shadow, negative contracts it. Color: typically rgba() for transparency control.' },
  { question: 'What is an inset shadow?', answer: 'Adding the "inset" keyword makes the shadow appear inside the element rather than outside. Inset shadows are useful for creating pressed/sunken button effects, inner glows, or inner border effects. You can combine inset and outset shadows on the same element.' },
  { question: 'How do I add multiple shadows?', answer: 'Multiple box-shadow layers are separated by commas in the CSS: box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05). This generator supports multiple layers — use the "Add layer" button to add additional shadows. Each layer is controlled independently.' },
  { question: 'How do I use rgba() for shadow colors?', answer: 'rgba(r, g, b, a) lets you specify a color with transparency. The alpha (a) value ranges from 0 (fully transparent) to 1 (fully opaque). For shadows, a low alpha value (0.1–0.3) creates subtle, realistic shadows. This generator converts your hex color and opacity setting to the correct rgba() format automatically.' },
  { question: 'What are some popular shadow styles?', answer: 'Subtle elevation: 0 1px 3px rgba(0,0,0,0.12). Card shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.1). Floating button: 0 10px 25px rgba(0,0,0,0.2). Hard/retro shadow: 4px 4px 0px #000000. Inner glow: inset 0 2px 4px rgba(0,0,0,0.15).' },
];

export default function BoxShadowGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'CSS Box Shadow Generator', description: 'Create CSS box shadows visually with live preview.', url: '/box-shadow-generator', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Box Shadow Generator', url: '/box-shadow-generator' }]),
  ];
  const related = getRelatedTools('box-shadow-generator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="CSS Box Shadow Generator" description="Visually create CSS box shadows with sliders for offset, blur, spread, color, and opacity. Add multiple layered shadows and copy the ready-to-use CSS code." category="Developer Tools" categoryVariant="developer" />
        <BoxShadowGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">CSS Box Shadow Syntax</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">The full box-shadow syntax is: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">box-shadow: [inset] offset-x offset-y [blur-radius] [spread-radius] color</code>. All length values are in pixels. Multiple shadows are comma-separated and rendered back-to-front (first value is on top).</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">For realistic depth, professional designs often stack multiple subtle shadows at different sizes. A common pattern uses a tight shadow for definition and a soft, diffuse shadow for depth. This creates the material design &quot;elevation&quot; effect used by Google and many modern UI libraries.</p>
          <p className="text-zinc-600 leading-relaxed">This generator uses <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">rgba()</code> format for colors, which is the best practice for shadows as it allows transparent colors that blend naturally over any background.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Box Shadow FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
