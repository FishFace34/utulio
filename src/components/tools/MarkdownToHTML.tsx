'use client';

import { useState, useEffect, useRef } from 'react';
import CopyButton from '@/components/ui/CopyButton';

const SAMPLE = `# Hello, Markdown!

This is a **bold** statement and this is *italic*.

## Lists

- Item one
- Item two
- Item three

## Code

Inline \`code\` and a code block:

\`\`\`
function hello() {
  return "world";
}
\`\`\`

## Links

[Visit Utulio](https://utulio.com)

> This is a blockquote.
`;

type ViewMode = 'preview' | 'html';

export default function MarkdownToHTML() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [html, setHtml] = useState('');
  const [view, setView] = useState<ViewMode>('preview');
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    async function run() {
      if (!markdown.trim()) {
        if (!cancelRef.current) setHtml('');
        return;
      }
      const { marked } = await import('marked');
      const DOMPurify = (await import('dompurify')).default;
      if (cancelRef.current) return;
      const raw = await marked.parse(markdown);
      const clean = DOMPurify.sanitize(raw);
      if (!cancelRef.current) setHtml(clean);
    }
    run().catch(() => {});
    return () => { cancelRef.current = true; };
  }, [markdown]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Markdown Input</label>
          <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} spellCheck={false} rows={16}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          <p className="mt-1 text-xs text-zinc-400">{markdown.length} chars · {markdown.split('\n').length} lines</p>
        </div>

        {/* Output */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex rounded-lg border border-zinc-200 p-0.5">
              {(['preview', 'html'] as ViewMode[]).map((m) => (
                <button key={m} type="button" onClick={() => setView(m)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors capitalize ${view === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
                  {m}
                </button>
              ))}
            </div>
            <CopyButton text={view === 'html' ? html : markdown} />
          </div>

          {view === 'preview' ? (
            <div
              className="min-h-[350px] rounded-xl border border-zinc-200 bg-white px-6 py-4 prose prose-sm max-w-none overflow-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <textarea readOnly value={html} rows={16}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-xs focus:outline-none" />
          )}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        HTML output is sanitized with DOMPurify to prevent XSS. Conversion runs entirely in your browser.
      </div>
    </div>
  );
}
