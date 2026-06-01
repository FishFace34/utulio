'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, RefreshCw, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import { WORDLIST } from '@/lib/wordlist';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeSimilar: false,
  excludeAmbiguous: false,
};

const SIMILAR_CHARS = '0OlI1';
const AMBIGUOUS_CHARS = '{}[]()/' + "\\" + "'\"`~,;:.<>";

function buildCharset(opts: PasswordOptions): string {
  let chars = '';
  let lower = 'abcdefghijklmnopqrstuvwxyz';
  let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let nums = '0123456789';
  let symbols = '!@#$%^&*_-+=?';

  if (opts.excludeSimilar) {
    lower = lower.split('').filter((c) => !SIMILAR_CHARS.includes(c)).join('');
    upper = upper.split('').filter((c) => !SIMILAR_CHARS.includes(c)).join('');
    nums = nums.split('').filter((c) => !SIMILAR_CHARS.includes(c)).join('');
  }
  if (opts.excludeAmbiguous) {
    symbols = symbols.split('').filter((c) => !AMBIGUOUS_CHARS.includes(c)).join('');
  }

  if (opts.includeLowercase) chars += lower;
  if (opts.includeUppercase) chars += upper;
  if (opts.includeNumbers) chars += nums;
  if (opts.includeSymbols) chars += symbols;

  return chars;
}

function generatePassword(opts: PasswordOptions): string {
  const charset = buildCharset(opts);
  if (!charset) return '';

  const array = new Uint32Array(opts.length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((n) => charset[n % charset.length])
    .join('');
}

function generatePassphrase(): string {
  const words: string[] = [];
  const indices = new Uint32Array(4);
  crypto.getRandomValues(indices);
  for (const idx of indices) {
    words.push(WORDLIST[idx % WORDLIST.length]);
  }
  return words.join('-');
}

function calcEntropy(opts: PasswordOptions): number {
  const charset = buildCharset(opts);
  if (!charset) return 0;
  return opts.length * Math.log2(charset.length);
}

function entropyLabel(bits: number): { label: string; color: string; width: string } {
  if (bits < 28) return { label: 'Very Weak', color: 'bg-red-500', width: 'w-1/5' };
  if (bits < 36) return { label: 'Weak', color: 'bg-orange-500', width: 'w-2/5' };
  if (bits < 60) return { label: 'Reasonable', color: 'bg-yellow-500', width: 'w-3/5' };
  if (bits < 128) return { label: 'Strong', color: 'bg-emerald-400', width: 'w-4/5' };
  return { label: 'Very Strong', color: 'bg-emerald-500', width: 'w-full' };
}

export default function PasswordGenerator() {
  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState('');
  const [passphraseMode, setPassphraseMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const regenerate = useCallback(() => {
    setPassword(passphraseMode ? generatePassphrase() : generatePassword(opts));
  }, [opts, passphraseMode]);

  // Debounced regeneration on options change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(regenerate, 100);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [regenerate]);

  const update = useCallback(<K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    setOpts((prev) => ({ ...prev, [key]: value }));
  }, []);

  const copy = useCallback(() => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [password]);

  const entropy = passphraseMode ? 52 : calcEntropy(opts);
  const strength = entropyLabel(entropy);
  const charset = buildCharset(opts);
  const charsetDesc = [
    opts.includeLowercase && 'a–z',
    opts.includeUppercase && 'A–Z',
    opts.includeNumbers && '0–9',
    opts.includeSymbols && '!@#$...',
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="mx-auto max-w-lg">
      {/* Password display */}
      <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-4">
        <div className="mb-3 flex min-h-[48px] items-center gap-3 rounded-lg bg-zinc-50 px-4 py-3 font-mono text-base leading-relaxed break-all text-zinc-900">
          {password || <span className="text-zinc-400 text-sm font-sans">Click Regenerate to generate a password</span>}
        </div>

        {/* Strength meter */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Strength</span>
            <span className="font-medium text-zinc-700">{strength.label} ({Math.round(entropy)} bits)</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={copy} className="flex-1">
            {copied ? <Check size={14} strokeWidth={1.5} className="text-emerald-500" /> : <Copy size={14} strokeWidth={1.5} />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button size="sm" onClick={regenerate} className="flex-1">
            <RefreshCw size={14} strokeWidth={1.5} />
            Regenerate
          </Button>
        </div>
      </div>

      {/* Options */}
      <div className="rounded-xl border border-zinc-200 p-5">
        <h2 className="mb-4 text-sm font-semibold text-zinc-900">Options</h2>

        {/* Passphrase toggle */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5">
          <div>
            <div className="text-sm font-medium text-zinc-700">Generate Passphrase</div>
            <div className="text-xs text-zinc-500">e.g. correct-horse-battery-staple</div>
          </div>
          <button
            role="switch"
            aria-checked={passphraseMode}
            onClick={() => setPassphraseMode((v) => !v)}
            className={`relative h-5 w-9 rounded-full transition-colors ${passphraseMode ? 'bg-zinc-900' : 'bg-zinc-200'}`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${passphraseMode ? 'translate-x-4' : 'translate-x-0.5'}`}
            />
          </button>
        </div>

        {!passphraseMode && (
          <>
            {/* Length slider */}
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="length-slider" className="text-sm font-medium text-zinc-700">
                  Length
                </label>
                <span className="text-sm font-bold text-zinc-900">{opts.length}</span>
              </div>
              <input
                id="length-slider"
                type="range"
                min={8}
                max={64}
                step={1}
                value={opts.length}
                onChange={(e) => update('length', Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900"
              />
              <div className="mt-1 flex justify-between text-xs text-zinc-400">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              {[
                { key: 'includeUppercase', label: 'Uppercase letters', example: 'A–Z' },
                { key: 'includeLowercase', label: 'Lowercase letters', example: 'a–z' },
                { key: 'includeNumbers', label: 'Numbers', example: '0–9' },
                { key: 'includeSymbols', label: 'Symbols', example: '!@#$%^&*' },
                { key: 'excludeSimilar', label: 'Exclude similar characters', example: '0, O, l, I, 1' },
                { key: 'excludeAmbiguous', label: 'Exclude ambiguous characters', example: '{ } [ ] ( )' },
              ].map(({ key, label, example }) => (
                <label key={key} className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 hover:bg-zinc-50">
                  <div>
                    <span className="text-sm text-zinc-700">{label}</span>
                    <span className="ml-2 text-xs text-zinc-400">{example}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={opts[key as keyof PasswordOptions] as boolean}
                    onChange={(e) => update(key as keyof PasswordOptions, e.target.checked)}
                    className="h-4 w-4 rounded accent-zinc-900"
                  />
                </label>
              ))}
            </div>

            {charsetDesc && (
              <p className="mt-3 text-xs text-zinc-400">
                Using: {charsetDesc} ({charset.length} characters)
              </p>
            )}
          </>
        )}
      </div>

      {/* Security note */}
      <div className="mt-4 flex items-start gap-2 rounded-lg bg-zinc-50 px-4 py-3">
        <Shield size={14} strokeWidth={1.5} className="mt-0.5 shrink-0 text-zinc-400" />
        <p className="text-xs text-zinc-500">
          Passwords are generated entirely in your browser using{' '}
          <code className="text-zinc-700">crypto.getRandomValues()</code>. They are never sent to
          any server.
        </p>
      </div>
    </div>
  );
}
