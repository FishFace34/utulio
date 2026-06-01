'use client';

import { useState, useEffect, useRef } from 'react';
import CopyButton from '@/components/ui/CopyButton';

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;
type Algo = typeof ALGORITHMS[number];

async function hashText(text: string, algo: Algo): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const [input, setInput] = useState('Hello, World!');
  const [hashes, setHashes] = useState<Record<Algo, string>>({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    async function run() {
      if (!input) {
        if (!cancelRef.current) setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
        return;
      }
      const results = await Promise.all(ALGORITHMS.map((a) => hashText(input, a)));
      if (!cancelRef.current) {
        const next = {} as Record<Algo, string>;
        ALGORITHMS.forEach((a, i) => { next[a] = results[i]; });
        setHashes(next);
      }
    }
    run().catch(() => {});
    return () => { cancelRef.current = true; };
  }, [input]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Input Text</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} spellCheck={false}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        <p className="mt-1 text-xs text-zinc-400">{input.length} characters</p>
      </div>

      <div className="space-y-3">
        {ALGORITHMS.map((algo) => (
          <div key={algo} className="rounded-xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
              <span className="text-xs font-semibold text-zinc-700">{algo}</span>
              {hashes[algo] && <CopyButton text={hashes[algo]} />}
            </div>
            <div className="p-4">
              {hashes[algo] ? (
                <p className="break-all font-mono text-xs text-zinc-700">{hashes[algo]}</p>
              ) : (
                <p className="text-xs text-zinc-400">Enter text above to generate hash</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        All hashing runs in your browser using the native Web Crypto API (<code>crypto.subtle.digest</code>). Nothing is sent to any server. MD5 is not available natively (it is cryptographically broken) and has been omitted intentionally.
      </div>
    </div>
  );
}
