import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import CitationGenerator from '@/components/tools/CitationGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Citation Generator — APA, MLA & Chicago Format',
  description: 'Generate citations in APA, MLA, and Chicago style for websites, books, and journal articles. Free.',
  path: '/citation-generator',
  keywords: ['citation generator', 'apa citation', 'mla citation generator'],
});

const FAQS = [
  { question: 'What is the difference between APA, MLA, and Chicago?', answer: 'APA (American Psychological Association) is used mainly in social sciences, psychology, and education. Citations emphasize the year of publication. MLA (Modern Language Arts) is common in humanities, literature, and arts. Chicago style has two systems: Notes-Bibliography (used in history and humanities) and Author-Date (similar to APA). This generator uses the standard formats for all three.' },
  { question: 'When do I need to cite a source?', answer: 'Cite a source whenever you: quote directly from it, paraphrase its ideas, summarize its content, refer to specific data or findings, or use an image or graphic from it. When in doubt, cite. Failing to cite sources is academic plagiarism and can have serious consequences.' },
  { question: 'How do I cite a website in APA format?', answer: 'APA website citation format: Author, A. A. (Year, Month Day). Title of page. Site Name. URL. For example: Smith, J. (2024, March 15). How to write better essays. Writing Today. https://example.com/writing.' },
  { question: 'How do I cite a website in MLA format?', answer: 'MLA website citation format: Last, First. "Title of Page." Site Name, Day Month Year, URL. For example: Smith, Jane. "How to Write Better Essays." Writing Today, 15 March 2024, example.com/writing.' },
  { question: 'What if information is missing from my source?', answer: 'Handle missing information gracefully: if no author, start with the title. If no date, use "n.d." (APA) or omit (MLA). If no publisher, omit. This generator handles missing fields automatically — only fill in the information you have.' },
  { question: 'Should I always verify auto-generated citations?', answer: 'Yes — always verify citations against the official style guide. Citation generators handle standard cases well but may not correctly handle unusual source types (legal documents, interviews, social media posts, etc.). When submitting academic work, double-check against the Purdue OWL (Purdue Online Writing Lab) which has authoritative style guides for APA, MLA, and Chicago.' },
];

export default function CitationGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Citation Generator', description: 'Generate APA, MLA, and Chicago style citations for websites, books, and journal articles.', url: '/citation-generator', category: 'EducationApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Citation Generator', url: '/citation-generator' }]),
  ];
  const related = getRelatedTools('citation-generator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Citation Generator" description="Generate properly formatted citations in APA 7, MLA 9, or Chicago style. Supports websites, books, and journal articles. Fill in the fields and copy your citation instantly." category="Student Tools" categoryVariant="student" />
        <CitationGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Choosing the Right Citation Style</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Your instructor or institution will specify which citation style to use. When in doubt: psychology, education, and social sciences typically use APA; literature, language arts, and humanities use MLA; history and some other humanities use Chicago.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Key differences at a glance: APA puts the year right after the author&apos;s name in parentheses, making the date highly visible. MLA uses the author&apos;s name and page number in in-text citations. Chicago Notes uses footnotes or endnotes rather than in-text citations.</p>
          <p className="text-zinc-600 leading-relaxed">Always cross-reference important citations with the official guides: the APA Publication Manual, the MLA Handbook, or the Chicago Manual of Style. The Purdue OWL website is an excellent free resource for all three styles.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Citation Generator FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
