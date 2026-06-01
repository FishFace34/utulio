import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import UnitConverter from '@/components/tools/UnitConverter';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Temperature Converter — Celsius, Fahrenheit, Kelvin',
  description: 'Convert temperature between Celsius, Fahrenheit, and Kelvin. Free and instant.',
  path: '/unit-converter/temperature',
  keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius'],
});

export default function TemperatureConverterPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Temperature Converter', description: 'Convert temperature between Celsius, Fahrenheit, and Kelvin.', url: '/unit-converter/temperature', category: 'UtilityApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Unit Converter', url: '/unit-converter' }, { name: 'Temperature', url: '/unit-converter/temperature' }]),
  ];
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Temperature Converter" description="Convert between Celsius, Fahrenheit, and Kelvin. Common references: 0°C = 32°F (freezing), 100°C = 212°F (boiling)." category="Utility Tools" categoryVariant="utility" />
        <UnitConverter defaultCategory="temperature" />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
      </Container>
    </>
  );
}
