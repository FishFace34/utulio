import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import MarkdownToHTML from '@/components/tools/MarkdownToHTML';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Markdown to HTML Converter — Live Preview',
  description: 'Convert Markdown to clean HTML with live preview. Copy the sanitized HTML output. Free Markdown converter.',
  path: '/markdown-to-html',
  keywords: ['markdown to html', 'markdown converter', 'md to html'],
});

const FAQS = [
  { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language created by John Gruber in 2004. It uses simple text symbols to format content: **bold**, *italic*, # headings, - bullet lists, [links](url), and so on. It is widely used in README files, documentation, note-taking apps, and content management systems.' },
  { question: 'Is the HTML output safe to use directly in a webpage?', answer: 'Yes — this tool sanitizes the HTML output using DOMPurify before displaying or providing it. DOMPurify removes any potentially dangerous HTML that could be used for XSS (Cross-Site Scripting) attacks, such as <script> tags or event handlers like onclick. The output is safe for use in web applications.' },
  { question: 'What Markdown features are supported?', answer: 'This tool uses the "marked" library, which supports the CommonMark specification plus GitHub Flavored Markdown (GFM) extensions: headers, bold, italic, strikethrough, links, images, code (inline and blocks), blockquotes, ordered and unordered lists, tables, horizontal rules, and HTML passthrough.' },
  { question: 'Can I use this to convert README files?', answer: 'Yes — paste the content of any .md file and you\'ll see the rendered HTML. This is useful for previewing how a README will look on GitHub, generating HTML for documentation sites, or converting Markdown content for use in HTML emails or web pages.' },
  { question: 'What is the difference between Markdown and HTML?', answer: 'Markdown is a human-readable authoring format that converts to HTML. HTML is a markup language that browsers render directly. Markdown is easier to write and read as plain text, while HTML gives more control over structure and styling. Most documentation platforms accept Markdown and convert it to HTML behind the scenes.' },
  { question: 'How do I embed the converted HTML in my website?', answer: 'Copy the HTML output and paste it into your website\'s HTML. If you\'re using a framework, you may need to use dangerouslySetInnerHTML (React), v-html (Vue), or [innerHTML] (Angular) to inject HTML content. Always sanitize user-provided Markdown before rendering — never render unsanitized HTML from untrusted sources.' },
];

export default function MarkdownToHTMLPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Markdown to HTML Converter', description: 'Convert Markdown to clean HTML with live preview and DOMPurify sanitization.', url: '/markdown-to-html', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Markdown to HTML', url: '/markdown-to-html' }]),
  ];
  const related = getRelatedTools('markdown-to-html', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Markdown to HTML Converter" description="Write or paste Markdown and see the rendered HTML preview in real time. Switch to HTML view to copy the clean, sanitized output. Uses marked + DOMPurify for safe conversion." category="Developer Tools" categoryVariant="developer" />
        <MarkdownToHTML />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Markdown Quick Reference</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Common Markdown syntax: <code className="rounded bg-zinc-100 px-1 text-sm"># H1</code>, <code className="rounded bg-zinc-100 px-1 text-sm">## H2</code> (headings), <code className="rounded bg-zinc-100 px-1 text-sm">**bold**</code>, <code className="rounded bg-zinc-100 px-1 text-sm">*italic*</code>, <code className="rounded bg-zinc-100 px-1 text-sm">[link](url)</code>, <code className="rounded bg-zinc-100 px-1 text-sm">![alt](image.png)</code>, <code className="rounded bg-zinc-100 px-1 text-sm">`code`</code>, <code className="rounded bg-zinc-100 px-1 text-sm">- item</code> (list), <code className="rounded bg-zinc-100 px-1 text-sm">&gt; quote</code>.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This converter uses the <a href="https://marked.js.org" className="text-zinc-900 underline underline-offset-2" target="_blank" rel="noopener">marked</a> library for parsing and <a href="https://github.com/cure53/DOMPurify" className="text-zinc-900 underline underline-offset-2" target="_blank" rel="noopener">DOMPurify</a> for HTML sanitization. Both libraries are loaded dynamically in your browser — conversion is instant and private.</p>
          <p className="text-zinc-600 leading-relaxed">The live preview shows the rendered result with basic prose styling. The HTML output is clean, semantic HTML without inline styles — you&apos;ll need to add your own CSS for styling when embedding in a webpage.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Markdown to HTML FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
