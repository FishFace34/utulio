import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import ColorConverter from '@/components/tools/ColorConverter';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Color Converter — HEX, RGB, HSL & CMYK',
  description:
    'Convert colors between HEX, RGB, HSL, and CMYK with a live preview swatch. Free online color converter.',
  path: '/color-converter',
  keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter'],
});

const FAQS = [
  {
    question: 'How do I convert HEX to RGB?',
    answer:
      'A HEX color like #3B82F6 is broken into three two-digit hex values: 3B (red), 82 (green), F6 (blue). Convert each from hexadecimal to decimal: 3B = 59, 82 = 130, F6 = 246. So #3B82F6 → RGB(59, 130, 246). This tool does the conversion automatically when you enter any color format.',
  },
  {
    question: 'What is HSL color?',
    answer:
      'HSL stands for Hue, Saturation, Lightness. Hue is the color angle on a color wheel (0°–360°): 0° is red, 120° is green, 240° is blue. Saturation is how vivid the color is (0% = gray, 100% = full color). Lightness is brightness (0% = black, 50% = normal, 100% = white). HSL is more intuitive for adjusting colors.',
  },
  {
    question: 'What is CMYK used for?',
    answer:
      'CMYK (Cyan, Magenta, Yellow, Key/Black) is used in print design. Unlike RGB which is additive (for screens), CMYK is subtractive (for ink on paper). When sending files to a printer, designs must use CMYK color values. Note that not all RGB colors can be reproduced accurately in CMYK print.',
  },
  {
    question: 'Why are there different color formats?',
    answer:
      'Different systems use different color models. Screens (monitors, phones) use RGB because they emit light additively. Printers use CMYK because ink absorbs light subtractively. HEX is just a compact way to write RGB for web development. HSL/HSV is used in design tools because it matches how humans perceive color adjustments.',
  },
  {
    question: "What's the difference between RGB and CMYK?",
    answer:
      'RGB is an additive model — combining all values at maximum gives white (255, 255, 255). CMYK is a subtractive model — combining all values at maximum gives black (100, 100, 100, 100). RGB is for screens; CMYK is for print. Converting between them can result in color shifts because their gamuts (color ranges) don\'t perfectly overlap.',
  },
  {
    question: 'How do I pick a color?',
    answer:
      'Use the color picker at the top of this tool — click the color swatch to open a native browser color picker. Alternatively, type directly into any format\'s input fields and all other formats will update instantly. You can also enter a known HEX code (like a brand color) and immediately see its RGB/HSL/CMYK equivalents.',
  },
];

export default function ColorConverterPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Color Converter',
      description: 'Convert colors between HEX, RGB, HSL, and CMYK with live preview.',
      url: '/color-converter',
      category: 'DeveloperApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Color Converter', url: '/color-converter' },
    ]),
  ];

  const related = getRelatedTools('color-converter', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Color Converter"
          description="Convert any color between HEX, RGB, HSL, and CMYK formats instantly. Use the color picker or type in any format — all others update in real time."
          category="Developer Tools"
          categoryVariant="developer"
        />

        <ColorConverter />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Understanding Color Formats</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Designers and developers work with colors in many formats. Web developers use HEX codes
            in CSS. JavaScript and Canvas APIs typically use RGB. Design tools like Figma often work
            in HSL or HSB. Print designers need CMYK values. Converting between them is a constant
            need.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            The verification example: <code className="rounded bg-zinc-100 px-1 text-sm">#3B82F6</code> →
            RGB(59, 130, 246) → HSL(217°, 91%, 60%). This is Tailwind CSS&apos;s blue-500 color, a
            popular design system choice. You can enter any known brand or design system color and
            get all its format equivalents instantly.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            CMYK values shown here are calculated from RGB and may differ slightly from professional
            print software due to different color profile assumptions. For production print work,
            always verify colors in your design software with the correct ICC profile for your printer.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Color Converter FAQs" />
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
