import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import DiffChecker from '@/components/tools/DiffChecker';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Diff Checker — Compare Two Texts Online',
  description: 'Compare two blocks of text and highlight differences line by line. Free text diff tool.',
  path: '/diff-checker',
  keywords: ['diff checker', 'text compare', 'compare two files'],
});

const FAQS = [
  { question: 'What is a diff checker?', answer: 'A diff checker compares two versions of text and shows what changed between them. Added lines are shown in green, removed lines in red, and unchanged lines in white. This is the same format used by version control systems like Git when you run "git diff".' },
  { question: 'What algorithm does this diff checker use?', answer: 'This tool uses the LCS (Longest Common Subsequence) algorithm at the line level. LCS finds the longest sequence of lines that appear in both texts in the same order. Lines not in the LCS are either added or removed. This approach produces clean, human-readable diffs similar to the Unix "diff" command.' },
  { question: 'Can I compare code files?', answer: 'Yes — paste any text content: code files, configuration files, documentation, essays, or any text. For large files, paste the relevant sections rather than thousands of lines, which may be slow to process with a browser-side algorithm.' },
  { question: 'Does this tool handle whitespace differences?', answer: 'This diff checker is line-based and case-sensitive. A line that differs only in trailing spaces or indentation will be marked as changed. This is the strictest and most transparent approach — you see exactly what changed, character for character.' },
  { question: 'How is this different from git diff?', answer: 'Git diff also shows the surrounding context lines (typically 3 lines before and after each change), highlights specific character changes within lines, and handles file metadata. This tool shows the full text with line-level change highlighting — simpler and easier to read for comparing document versions.' },
  { question: 'Is my data sent to a server?', answer: 'No. The comparison algorithm runs entirely in your browser using JavaScript. Neither the original nor the changed text is sent to any server. This makes it safe to diff sensitive code, private documents, or confidential configuration files.' },
];

export default function DiffCheckerPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Text Diff Checker', description: 'Compare two blocks of text and highlight differences line by line.', url: '/diff-checker', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Diff Checker', url: '/diff-checker' }]),
  ];
  const related = getRelatedTools('diff-checker', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Text Diff Checker" description="Paste two versions of text and click Compare to see additions (green) and deletions (red) highlighted line by line. Uses LCS algorithm — no server, no tracking." category="Developer Tools" categoryVariant="developer" />
        <DiffChecker />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">How Text Diffing Works</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Text comparison tools use the Longest Common Subsequence (LCS) algorithm to find the maximum set of lines that appear in both documents in the same order. Lines not in this common sequence are marked as either added (in the new version only) or removed (in the old version only).</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This is the same foundational algorithm used by Git and the Unix <code className="rounded bg-zinc-100 px-1 text-sm">diff</code> command. The LCS approach gives an intuitive, minimal diff — it shows the fewest possible changes needed to transform the original into the changed version.</p>
          <p className="text-zinc-600 leading-relaxed">Common use cases: comparing document revisions, reviewing configuration changes before deployment, checking what changed between two API responses, proofreading edited text, or verifying that a copy-paste was accurate.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Diff Checker FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
