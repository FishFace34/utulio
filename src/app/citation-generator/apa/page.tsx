import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import CitationGenerator from '@/components/tools/CitationGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'APA Citation Generator — APA 7th Edition Format',
  description: 'Generate APA 7th edition citations for websites, books, and journal articles. Free APA citation maker.',
  path: '/citation-generator/apa',
  keywords: ['apa citation generator', 'apa 7 citation', 'apa format generator'],
});

export default function APACitationPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'APA Citation Generator', description: 'Generate APA 7th edition citations.', url: '/citation-generator/apa', category: 'EducationApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Citation Generator', url: '/citation-generator' }, { name: 'APA', url: '/citation-generator/apa' }]),
  ];
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="APA Citation Generator" description="Generate APA 7th edition citations for websites, books, and journal articles. Pre-set to APA format for quick use." category="Student Tools" categoryVariant="student" />
        <CitationGenerator defaultStyle="apa" />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
      </Container>
    </>
  );
}
