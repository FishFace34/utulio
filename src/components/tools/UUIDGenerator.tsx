'use client';

import { useState, useCallback } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import Button from '@/components/ui/Button';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([crypto.randomUUID()]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [withQuotes, setWithQuotes] = useState(false);

  function format(uuid: string): string {
    let s = uuid;
    if (noHyphens) s = s.replace(/-/g, '');
    if (uppercase) s = s.toUpperCase();
    if (withQuotes) s = `"${s}"`;
    return s;
  }

  const generate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < Math.min(count, 100); i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
  }, [count]);

  const allFormatted = uuids.map(format).join('\n');

  return (
    <div className="space-y-5">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-700">Count:</label>
          <input type="number" value={count} min={1} max={100} onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-20 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        {[['uppercase', uppercase, setUppercase, 'Uppercase'], ['noHyphens', noHyphens, setNoHyphens, 'No Hyphens'], ['withQuotes', withQuotes, setWithQuotes, 'With Quotes']] as [string, boolean, (v: boolean) => void, string][]}
        <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="rounded" /><span className="text-sm text-zinc-700">Uppercase</span></label>
        <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={noHyphens} onChange={(e) => setNoHyphens(e.target.checked)} className="rounded" /><span className="text-sm text-zinc-700">No Hyphens</span></label>
        <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={withQuotes} onChange={(e) => setWithQuotes(e.target.checked)} className="rounded" /><span className="text-sm text-zinc-700">With Quotes</span></label>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="primary" onClick={generate}>Generate {count > 1 ? `${count} UUIDs` : 'UUID'}</Button>
        <CopyButton text={allFormatted} />
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
            <span className="font-mono text-sm text-zinc-700">{format(uuid)}</span>
            <CopyButton text={format(uuid)} />
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-400">Generated using <code>crypto.randomUUID()</code> — cryptographically random, version 4 UUID.</p>
    </div>
  );
}
