'use client';

import { useState, useMemo } from 'react';

const FLAG_OPTIONS: { flag: string; label: string; title: string }[] = [
  { flag: 'g', label: 'g', title: 'Global — find all matches' },
  { flag: 'i', label: 'i', title: 'Case insensitive' },
  { flag: 'm', label: 'm', title: 'Multiline — ^ and $ match line boundaries' },
  { flag: 's', label: 's', title: 'Dotall — . matches newline characters' },
];

const CHEATSHEET = [
  { token: '.', desc: 'Any character except newline' },
  { token: '\\d', desc: 'Digit [0-9]' },
  { token: '\\w', desc: 'Word character [a-zA-Z0-9_]' },
  { token: '\\s', desc: 'Whitespace' },
  { token: '*', desc: '0 or more' },
  { token: '+', desc: '1 or more' },
  { token: '?', desc: '0 or 1 (optional)' },
  { token: '{n,m}', desc: 'Between n and m times' },
  { token: '[abc]', desc: 'Character class' },
  { token: '(abc)', desc: 'Capture group' },
  { token: 'a|b', desc: 'a or b' },
  { token: '^', desc: 'Start of string/line' },
  { token: '$', desc: 'End of string/line' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('(\\w+)@(\\w+\\.\\w+)');
  const [flags, setFlags] = useState<Set<string>>(new Set(['g', 'i']));
  const [testString, setTestString] = useState('Contact us at hello@utulio.com or support@example.org');
  const [replacement, setReplacement] = useState('');
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) next.delete(flag);
      else next.add(flag);
      return next;
    });
  };

  const { matches, highlighted, error, replaced } = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: testString, error: null, replaced: '' };
    try {
      const flagStr = [...flags].join('');
      const gFlagStr = flagStr.includes('g') ? flagStr : flagStr + 'g';
      const regex = new RegExp(pattern, gFlagStr);

      const allMatches = [...testString.matchAll(regex)].slice(0, 100);

      // Build highlighted HTML
      let lastIndex = 0;
      let html = '';
      for (const match of allMatches) {
        const start = match.index ?? 0;
        const end = start + match[0].length;
        html += escapeHtml(testString.slice(lastIndex, start));
        if (match[0].length === 0) { lastIndex = start + 1; continue; }
        html += `<mark class="bg-yellow-200 rounded-sm">${escapeHtml(match[0])}</mark>`;
        lastIndex = end;
      }
      html += escapeHtml(testString.slice(lastIndex));

      const replaced = replacement
        ? testString.replace(new RegExp(pattern, gFlagStr), replacement)
        : '';

      return { matches: allMatches, highlighted: html, error: null, replaced };
    } catch (e) {
      return { matches: [], highlighted: escapeHtml(testString), error: (e as Error).message, replaced: '' };
    }
  }, [pattern, flags, testString, replacement]);

  return (
    <div className="space-y-4">
      {/* Pattern + flags */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Regular Expression</label>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-lg font-mono">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern"
              spellCheck={false}
              className={`flex-1 rounded-lg border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 ${error ? 'border-red-400' : 'border-zinc-200'}`}
            />
            <span className="text-zinc-400 text-lg font-mono">/</span>
            <span className="font-mono text-sm text-zinc-500">{[...flags].join('') || '–'}</span>
          </div>
          {error && <p className="mt-1 text-sm text-red-600">Invalid regex: {error}</p>}
        </div>

        <div className="flex flex-wrap gap-2">
          {FLAG_OPTIONS.map(({ flag, label, title }) => (
            <button
              key={flag}
              type="button"
              title={title}
              onClick={() => toggleFlag(flag)}
              className={`rounded-lg border px-3 py-1 font-mono text-sm transition-colors ${
                flags.has(flag)
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
              }`}
            >
              {label}
            </button>
          ))}
          <span className="ml-2 self-center text-xs text-zinc-400">{matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
        </div>
      </div>

      {/* Test string with highlights */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          rows={4}
          spellCheck={false}
          className="w-full resize-y rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        {/* Highlighted overlay */}
        {matches.length > 0 && (
          <div className="mt-2 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <p className="mb-1 text-xs font-medium text-zinc-400">Match preview:</p>
            <p
              className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-all"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )}
      </div>

      {/* Matches list */}
      {matches.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900">
            Matches ({matches.length})
          </div>
          <ul className="divide-y divide-zinc-50 max-h-60 overflow-y-auto">
            {matches.map((match, i) => (
              <li key={i} className="px-4 py-2 text-xs">
                <span className="font-mono text-zinc-900 bg-yellow-100 rounded px-1">{match[0]}</span>
                <span className="ml-2 text-zinc-400">at index {match.index}</span>
                {match.length > 1 && (
                  <span className="ml-2 text-zinc-500">
                    groups: {match.slice(1).map((g, gi) => (
                      <span key={gi} className="ml-1 font-mono text-purple-700">{g ?? 'undefined'}</span>
                    ))}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Replace */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Replace (optional — use $1, $2 for groups)
        </label>
        <input
          type="text"
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          placeholder="Replacement string"
          spellCheck={false}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
        {replaced && (
          <div className="mt-2 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 font-mono text-sm whitespace-pre-wrap break-all">
            {replaced}
          </div>
        )}
      </div>

      {/* Cheatsheet */}
      <div>
        <button
          type="button"
          onClick={() => setShowCheatsheet((v) => !v)}
          className="text-sm font-medium text-zinc-600 underline underline-offset-2 hover:text-zinc-900"
        >
          {showCheatsheet ? 'Hide' : 'Show'} quick reference
        </button>
        {showCheatsheet && (
          <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-3">
            {CHEATSHEET.map(({ token, desc }) => (
              <div key={token} className="text-xs">
                <code className="font-mono text-purple-700">{token}</code>
                <span className="ml-1 text-zinc-500">{desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
