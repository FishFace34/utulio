import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import CitationGenerator from '@/components/tools/CitationGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'MLA Citation Generator — MLA 9th Edition Format',
  description: 'Generate MLA 9th edition citations for websites, books, and journal articles. Free MLA citation maker.',
  path: '/citation-generator/mla',
  keywords: ['mla citation generator', 'mla 9 citation', 'mla format generator'],
});

export default function MLACitationPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'MLA Citation Generator', description: 'Generate MLA 9th edition citations.', url: '/citation-generator/mla', category: 'EducationApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Citation Generator', url: '/citation-generator' }, { name: 'MLA', url: '/citation-generator/mla' }]),
  ];
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="MLA Citation Generator" description="Generate MLA 9th edition citations for websites, books, and journal articles. Pre-set to MLA format." category="Student Tools" categoryVariant="student" />
        <CitationGenerator defaultStyle="mla" />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
      </Container>
    </>
  );
}
