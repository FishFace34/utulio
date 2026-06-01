'use client';

import { useState, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';

type LimitPreset = {
  label: string;
  limit: number;
};

const PRESETS: LimitPreset[] = [
  { label: 'Twitter / X', limit: 280 },
  { label: 'Instagram Bio', limit: 150 },
  { label: 'SMS', limit: 160 },
  { label: 'Meta Title', limit: 60 },
  { label: 'Meta Description', limit: 160 },
];

function computeStats(text: string) {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;

  const readingMinutes = words / 200;
  const speakingMinutes = words / 130;

  const readingTime =
    readingMinutes < 1
      ? `< 1 min read`
      : `${Math.ceil(readingMinutes)} min read`;

  const speakingTime =
    speakingMinutes < 1
      ? `< 1 min`
      : `${Math.ceil(speakingMinutes)} min`;

  const wordList = text.trim() === '' ? [] : text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  const longestWord = wordList.reduce((a, b) => (b.length > a.length ? b : a), '');

  const avgWordLength =
    wordList.length === 0
      ? 0
      : Number((wordList.reduce((sum, w) => sum + w.length, 0) / wordList.length).toFixed(1));

  // Top 10 words
  const freq: Record<string, number> = {};
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'it', 'as', 'by', 'be']);
  for (const w of wordList) {
    if (!stopWords.has(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  }
  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return { characters, charactersNoSpaces, words, sentences, paragraphs, readingTime, speakingTime, longestWord, averageWordLength: avgWordLength, topWords };
}

interface WordCounterProps {
  defaultLimit?: number;
}

export default function WordCounter({ defaultLimit }: WordCounterProps) {
  const [text, setText] = useState('');
  const [activeLimit, setActiveLimit] = useState<number | null>(defaultLimit || null);

  const stats = useMemo(() => computeStats(text), [text]);

  const clearText = useCallback(() => {
    setText('');
  }, []);

  const remaining = activeLimit !== null ? activeLimit - stats.characters : null;
  const overLimit = remaining !== null && remaining < 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      {/* Main textarea area */}
      <div>
        {/* Preset buttons */}
        <div className="mb-3 flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() =>
                setActiveLimit(activeLimit === preset.limit ? null : preset.limit)
              }
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeLimit === preset.limit
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
              }`}
            >
              {preset.label} ({preset.limit})
            </button>
          ))}
          {activeLimit !== null && (
            <button
              onClick={() => setActiveLimit(null)}
              className="flex items-center gap-1 rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-400 hover:border-zinc-300"
            >
              <X size={10} strokeWidth={2} /> Clear limit
            </button>
          )}
        </div>

        {/* Character limit progress bar */}
        {activeLimit !== null && (
          <div className="mb-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className={`h-full rounded-full transition-all duration-100 ${
                  overLimit ? 'bg-red-500' : stats.characters / activeLimit > 0.85 ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min((stats.characters / activeLimit) * 100, 100)}%` }}
              />
            </div>
            <div className={`mt-1 text-right text-xs font-medium ${overLimit ? 'text-red-600' : 'text-zinc-500'}`}>
              {remaining} characters remaining
            </div>
          </div>
        )}

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            aria-label="Text to analyze"
            aria-live="polite"
            className={`min-h-[300px] w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 ${
              overLimit ? 'border-red-300' : 'border-zinc-200'
            }`}
          />
          {text && (
            <button
              onClick={clearText}
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-700"
              aria-label="Clear text"
            >
              <X size={12} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Stats panel */}
      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-zinc-900">Statistics</h2>
          <dl className="space-y-2">
            {[
              { label: 'Words', value: stats.words.toLocaleString() },
              { label: 'Characters', value: stats.characters.toLocaleString() },
              { label: 'Characters (no spaces)', value: stats.charactersNoSpaces.toLocaleString() },
              { label: 'Sentences', value: stats.sentences.toLocaleString() },
              { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
              { label: 'Reading time', value: stats.readingTime },
              { label: 'Speaking time', value: stats.speakingTime },
              {
                label: 'Avg word length',
                value: stats.averageWordLength > 0 ? `${stats.averageWordLength} chars` : '—',
              },
              { label: 'Longest word', value: stats.longestWord || '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <dt className="text-xs text-zinc-500">{label}</dt>
                <dd className="text-sm font-semibold text-zinc-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Top words */}
        {stats.topWords.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <h2 className="mb-3 text-sm font-semibold text-zinc-900">Top Words</h2>
            <ol className="space-y-1">
              {stats.topWords.map(([word, count]) => (
                <li key={word} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-700">{word}</span>
                  <span className="font-medium text-zinc-500">{count}×</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
