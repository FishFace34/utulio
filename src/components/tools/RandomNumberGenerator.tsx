'use client';

import { useState, useCallback } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import Button from '@/components/ui/Button';

function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const maxValid = Math.floor(0xFFFFFFFF / range) * range;
  let rand: number;
  do {
    rand = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (rand >= maxValid);
  return min + (rand % range);
}

export default function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sortResults, setSortResults] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState('');

  const generate = useCallback(() => {
    setError('');
    if (min > max) { setError('Minimum must be less than or equal to maximum.'); return; }
    if (!allowDuplicates && count > (max - min + 1)) {
      setError(`Cannot generate ${count} unique numbers in range ${min}–${max} (only ${max - min + 1} values available).`);
      return;
    }
    const results: number[] = [];
    if (allowDuplicates) {
      for (let i = 0; i < count; i++) results.push(secureRandomInt(min, max));
    } else {
      const pool = new Set<number>();
      let tries = 0;
      while (pool.size < count && tries < 100000) {
        pool.add(secureRandomInt(min, max));
        tries++;
      }
      results.push(...pool);
    }
    if (sortResults) results.sort((a, b) => a - b);
    setNumbers(results);
  }, [min, max, count, allowDuplicates, sortResults]);

  const allText = numbers.join(', ');

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Minimum</label>
          <input type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Maximum</label>
          <input type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">How many numbers?</label>
        <input type="number" value={count} min={1} max={10000} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      </div>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="rounded" />
          <span className="text-sm text-zinc-700">Allow duplicates</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={sortResults} onChange={(e) => setSortResults(e.target.checked)} className="rounded" />
          <span className="text-sm text-zinc-700">Sort results</span>
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="button" variant="primary" onClick={generate}>
        Generate {count > 1 ? `${count} Numbers` : 'Number'}
      </Button>

      {numbers.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">{numbers.length} number{numbers.length > 1 ? 's' : ''} generated</p>
            <CopyButton text={allText} />
          </div>
          <div className="flex flex-wrap gap-2">
            {numbers.map((n, i) => (
              <span key={i} className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-sm font-medium text-zinc-900">
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-400">Uses <code>crypto.getRandomValues()</code> with rejection sampling for unbiased results.</p>
    </div>
  );
}
