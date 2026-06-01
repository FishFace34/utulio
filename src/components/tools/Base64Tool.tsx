'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

type Mode = 'encode' | 'decode';

function encodeBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function decodeBase64(str: string): string {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

function tryConvert(mode: Mode, input: string): { output: string; error: string | null } {
  try {
    const output = mode === 'encode' ? encodeBase64(input) : decodeBase64(input);
    return { output, error: null };
  } catch {
    return { output: '', error: 'Invalid Base64 input — ensure input is properly encoded Base64.' };
  }
}

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('Hello, World! 👋');

  const { output, error } = tryConvert(mode, input);

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-zinc-200 p-1 max-w-xs">
        {(['encode', 'decode'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-colors capitalize ${
              mode === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">
            {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            rows={8}
            className="min-h-[200px] resize-y rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <p className="text-xs text-zinc-400">{input.length} characters</p>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            rows={8}
            className="min-h-[200px] resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm focus:outline-none"
          />
          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : (
            <p className="text-xs text-zinc-400">{output.length} characters</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        🔒 Your data never leaves your browser. All encoding and decoding happens locally.
      </div>
    </div>
  );
}
