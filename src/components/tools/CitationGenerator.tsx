'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import Tabs from '@/components/ui/Tabs';
import { formatCitation, type CitationStyle, type SourceType, type CitationFields } from '@/lib/citations';

const STYLE_TABS = [
  { id: 'apa', label: 'APA 7' },
  { id: 'mla', label: 'MLA 9' },
  { id: 'chicago', label: 'Chicago' },
];

const SOURCE_TABS = [
  { id: 'website', label: 'Website' },
  { id: 'book', label: 'Book' },
  { id: 'journal', label: 'Journal Article' },
];

const DEFAULT_FIELDS: CitationFields = {
  authorLast: '', authorFirst: '', title: '', siteName: '', publisher: '',
  journal: '', volume: '', issue: '', pages: '', year: '',
  month: '', day: '', url: '', accessYear: '', accessMonth: '', accessDay: '', doi: '',
};

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-zinc-600">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
    </div>
  );
}

interface CitationGeneratorProps {
  defaultStyle?: CitationStyle;
}

export default function CitationGenerator({ defaultStyle = 'apa' }: CitationGeneratorProps) {
  const [style, setStyle] = useState<CitationStyle>(defaultStyle);
  const [sourceType, setSourceType] = useState<SourceType>('website');
  const [fields, setFields] = useState<CitationFields>(DEFAULT_FIELDS);

  function set(key: keyof CitationFields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  const citation = formatCitation(style, sourceType, fields);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="mb-1.5 text-sm font-medium text-zinc-700">Citation Style</p>
          <Tabs tabs={STYLE_TABS} activeTab={style} onChange={(id) => setStyle(id as CitationStyle)} />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-medium text-zinc-700">Source Type</p>
          <Tabs tabs={SOURCE_TABS} activeTab={sourceType} onChange={(id) => setSourceType(id as SourceType)} />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Author Last Name" value={fields.authorLast} onChange={(v) => set('authorLast', v)} placeholder="Smith" />
          <Field label="Author First Name" value={fields.authorFirst} onChange={(v) => set('authorFirst', v)} placeholder="Jane" />
        </div>
        <Field label="Title" value={fields.title} onChange={(v) => set('title', v)}
          placeholder={sourceType === 'website' ? 'Page title' : sourceType === 'book' ? 'Book title' : 'Article title'} />

        {sourceType === 'website' && (
          <>
            <Field label="Website / Site Name" value={fields.siteName} onChange={(v) => set('siteName', v)} placeholder="Example.com" />
            <Field label="URL" value={fields.url} onChange={(v) => set('url', v)} placeholder="https://..." />
            <div className="grid grid-cols-3 gap-3">
              <Field label="Year" value={fields.year} onChange={(v) => set('year', v)} placeholder="2025" />
              <Field label="Month" value={fields.month} onChange={(v) => set('month', v)} placeholder="January" />
              <Field label="Day" value={fields.day} onChange={(v) => set('day', v)} placeholder="15" />
            </div>
          </>
        )}

        {sourceType === 'book' && (
          <>
            <Field label="Publisher" value={fields.publisher} onChange={(v) => set('publisher', v)} placeholder="Publisher name" />
            <Field label="Year Published" value={fields.year} onChange={(v) => set('year', v)} placeholder="2025" />
          </>
        )}

        {sourceType === 'journal' && (
          <>
            <Field label="Journal Name" value={fields.journal} onChange={(v) => set('journal', v)} placeholder="Nature" />
            <div className="grid grid-cols-3 gap-3">
              <Field label="Volume" value={fields.volume} onChange={(v) => set('volume', v)} placeholder="12" />
              <Field label="Issue" value={fields.issue} onChange={(v) => set('issue', v)} placeholder="3" />
              <Field label="Pages" value={fields.pages} onChange={(v) => set('pages', v)} placeholder="45-67" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Year" value={fields.year} onChange={(v) => set('year', v)} placeholder="2025" />
              <Field label="DOI" value={fields.doi} onChange={(v) => set('doi', v)} placeholder="10.1000/xyz123" />
            </div>
          </>
        )}
      </div>

      {/* Output */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5">
          <span className="text-xs font-semibold text-zinc-700">
            {STYLE_TABS.find((t) => t.id === style)?.label} Citation
          </span>
          {citation && <CopyButton text={citation} />}
        </div>
        <div className="p-4">
          {citation ? (
            <p className="text-sm leading-relaxed text-zinc-700" dangerouslySetInnerHTML={{ __html: citation.replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
          ) : (
            <p className="text-sm text-zinc-400">Fill in the fields above to generate a citation.</p>
          )}
        </div>
      </div>

      <p className="text-xs text-zinc-400">Always verify citations against official style guides. This generator follows standard formatting rules but may need adjustment for unusual source types.</p>
    </div>
  );
}
