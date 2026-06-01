import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import UnitConverter from '@/components/tools/UnitConverter';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Length Unit Converter — meters, feet, miles, km',
  description: 'Convert length units: meters, feet, miles, kilometers, inches, yards. Free and instant.',
  path: '/unit-converter/length',
  keywords: ['length converter', 'meters to feet', 'miles to km converter'],
});

export default function LengthConverterPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Length Unit Converter', description: 'Convert length units: meters, feet, miles, kilometers.', url: '/unit-converter/length', category: 'UtilityApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Unit Converter', url: '/unit-converter' }, { name: 'Length', url: '/unit-converter/length' }]),
  ];
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Length Unit Converter" description="Convert between meters, feet, miles, kilometers, inches, yards, and more. Instant real-time conversion." category="Utility Tools" categoryVariant="utility" />
        <UnitConverter defaultCategory="length" />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
      </Container>
    </>
  );
}
