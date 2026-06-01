'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface DiffLine {
  type: 'equal' | 'added' | 'removed';
  text: string;
  lineNumLeft?: number;
  lineNumRight?: number;
}

function lcs(a: string[], b: string[]): number[][] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

function diff(a: string[], b: string[]): DiffLine[] {
  const dp = lcs(a, b);
  let i = a.length, j = b.length;
  const temp: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      temp.push({ type: 'equal', text: a[i - 1], lineNumLeft: i, lineNumRight: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.push({ type: 'added', text: b[j - 1], lineNumRight: j });
      j--;
    } else {
      temp.push({ type: 'removed', text: a[i - 1], lineNumLeft: i });
      i--;
    }
  }
  return temp.reverse();
}

export default function DiffChecker() {
  const [original, setOriginal] = useState('The quick brown fox\njumps over the lazy dog\nHello World');
  const [changed, setChanged] = useState('The quick brown fox\nleaps over the lazy cat\nHello World\nNew line added');
  const [result, setResult] = useState<DiffLine[] | null>(null);

  function compare() {
    const a = original.split('\n');
    const b = changed.split('\n');
    setResult(diff(a, b));
  }

  const additions = result?.filter((l) => l.type === 'added').length ?? 0;
  const deletions = result?.filter((l) => l.type === 'removed').length ?? 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Original</label>
          <textarea value={original} onChange={(e) => setOriginal(e.target.value)} rows={10} spellCheck={false}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Changed</label>
          <textarea value={changed} onChange={(e) => setChanged(e.target.value)} rows={10} spellCheck={false}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      <Button type="button" variant="primary" onClick={compare}>Compare</Button>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-green-700"><span className="h-2.5 w-2.5 rounded-sm bg-green-200" />{additions} addition{additions !== 1 ? 's' : ''}</span>
            <span className="flex items-center gap-1.5 text-red-700"><span className="h-2.5 w-2.5 rounded-sm bg-red-200" />{deletions} deletion{deletions !== 1 ? 's' : ''}</span>
            {additions === 0 && deletions === 0 && <span className="text-zinc-500">No differences found</span>}
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-200 font-mono text-xs">
            {result.map((line, i) => (
              <div key={i} className={`flex ${line.type === 'added' ? 'bg-green-50' : line.type === 'removed' ? 'bg-red-50' : 'bg-white'}`}>
                <span className="w-8 shrink-0 select-none border-r border-zinc-100 px-1.5 py-1.5 text-right text-zinc-400">
                  {line.type !== 'added' ? line.lineNumLeft ?? '' : ''}
                </span>
                <span className="w-8 shrink-0 select-none border-r border-zinc-100 px-1.5 py-1.5 text-right text-zinc-400">
                  {line.type !== 'removed' ? line.lineNumRight ?? '' : ''}
                </span>
                <span className={`w-5 shrink-0 select-none py-1.5 text-center font-bold ${line.type === 'added' ? 'text-green-600' : line.type === 'removed' ? 'text-red-600' : 'text-zinc-300'}`}>
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '−' : ' '}
                </span>
                <span className={`flex-1 py-1.5 pl-2 pr-4 whitespace-pre-wrap break-all ${line.type === 'added' ? 'text-green-800' : line.type === 'removed' ? 'text-red-800' : 'text-zinc-700'}`}>
                  {line.text || ' '}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
