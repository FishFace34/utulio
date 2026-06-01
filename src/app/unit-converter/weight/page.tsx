import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import UnitConverter from '@/components/tools/UnitConverter';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Weight Unit Converter — kg, lbs, oz, grams',
  description: 'Convert weight units: kilograms, pounds, ounces, grams, stones. Free and instant.',
  path: '/unit-converter/weight',
  keywords: ['weight converter', 'kg to lbs', 'pounds to kg converter'],
});

export default function WeightConverterPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Weight Unit Converter', description: 'Convert weight units: kilograms, pounds, ounces, grams.', url: '/unit-converter/weight', category: 'UtilityApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Unit Converter', url: '/unit-converter' }, { name: 'Weight', url: '/unit-converter/weight' }]),
  ];
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Weight Unit Converter" description="Convert between kilograms, pounds, ounces, grams, stones, and more. Instant real-time conversion." category="Utility Tools" categoryVariant="utility" />
        <UnitConverter defaultCategory="weight" />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
      </Container>
    </>
  );
}
