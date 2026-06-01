import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import UnitConverter from '@/components/tools/UnitConverter';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Unit Converter — Length, Weight, Temperature & More',
  description: 'Convert between metric and imperial units: length, weight, temperature, volume, area, speed, and data. Free.',
  path: '/unit-converter',
  keywords: ['unit converter', 'metric to imperial', 'measurement converter'],
});

const FAQS = [
  { question: 'How do I convert Celsius to Fahrenheit?', answer: 'Fahrenheit = (Celsius × 9/5) + 32. So 100°C = (100 × 9/5) + 32 = 180 + 32 = 212°F. The reverse is: Celsius = (Fahrenheit − 32) × 5/9. Common reference points: 0°C = 32°F (freezing), 100°C = 212°F (boiling), 37°C = 98.6°F (body temperature), -40°C = -40°F (the one point they\'re equal).' },
  { question: 'How many kilometers are in a mile?', answer: '1 mile = 1.60934 kilometers. Conversely, 1 kilometer = 0.621371 miles. A quick approximation: 1 mile ≈ 1.6 km. For rough mental math, multiply miles by 1.6 to get kilometers, or divide kilometers by 1.6 to get miles.' },
  { question: 'How many pounds are in a kilogram?', answer: '1 kilogram = 2.20462 pounds. 1 pound = 0.453592 kilograms. Quick approximation: 1 kg ≈ 2.2 lbs. To convert kg to lbs, multiply by 2.2. To convert lbs to kg, divide by 2.2.' },
  { question: 'Why is temperature conversion different from other units?', answer: 'Most unit conversions use simple multiplication (ratio), but temperature uses offset formulas because the different scales have different zero points. 0°C is not "zero temperature" — it\'s the freezing point of water. Only Kelvin starts at absolute zero (the lowest possible temperature).' },
  { question: 'What is the difference between metric and imperial?', answer: 'The metric system (SI) is used by most of the world and is based on powers of 10 (mm → cm → m → km). The imperial system is used primarily in the United States and uses non-decimal relationships (12 inches = 1 foot, 3 feet = 1 yard, 5,280 feet = 1 mile). The metric system is generally easier for calculations.' },
  { question: 'How are data storage units converted?', answer: 'Data storage uses powers of 2: 1 kilobyte (KB) = 1,024 bytes, 1 megabyte (MB) = 1,024 KB, 1 gigabyte (GB) = 1,024 MB. Note: some contexts use decimal (1 KB = 1,000 bytes), particularly for storage marketing. This converter uses binary (powers of 2) which is standard in computing.' },
];

export default function UnitConverterPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Unit Converter', description: 'Convert between metric and imperial units: length, weight, temperature, volume, area, speed, and data.', url: '/unit-converter', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Unit Converter', url: '/unit-converter' }]),
  ];
  const related = getRelatedTools('unit-converter', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Unit Converter" description="Convert between metric and imperial units across 7 categories: length, weight, temperature, volume, area, speed, and data. Real-time conversion with a swap button." category="Utility Tools" categoryVariant="utility" />
        <UnitConverter />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Metric vs. Imperial Units</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">The world primarily uses the metric system (SI — International System of Units), based on powers of 10. The United States, Myanmar, and Liberia are the only countries that still officially use the imperial system for everyday measurements, though even the U.S. uses metric in science, medicine, and military applications.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This converter uses base-unit conversion: values are first converted to the base unit (meters for length, kilograms for weight, Celsius for temperature), then to the target unit. This approach ensures accuracy across all conversion pairs without needing a separate formula for every combination.</p>
          <p className="text-zinc-600 leading-relaxed"><strong className="text-zinc-900">Verification:</strong> 1 mile = 1.60934 km ✓ · 100°C = 212°F ✓ · 1 lb = 0.453592 kg ✓</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Unit Converter FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
