'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { generateNames } from '@/lib/businessNameGenerator';
import { INDUSTRY_LIST } from '@/lib/industries';

type Style = 'modern' | 'classic' | 'playful' | 'professional';
type Length = 'short' | 'medium' | 'long' | 'any';

interface BusinessNameGeneratorProps {
  defaultIndustry?: string;
}

export default function BusinessNameGenerator({ defaultIndustry = 'tech-startup' }: BusinessNameGeneratorProps) {
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState(defaultIndustry);
  const [style, setStyle] = useState<Style>('modern');
  const [length, setLength] = useState<Length>('any');
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(() => {
    const result = generateNames({ keyword, industry, style, length }, 20);
    setNames(result);
    setGenerated(true);
  }, [keyword, industry, style, length]);

  const copyName = useCallback((name: string) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  const domainCheckUrl = (name: string) => {
    const encoded = encodeURIComponent(
      name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'
    );
    return `https://www.namecheap.com/domains/registration/results/?domain=${encoded}`;
  };

  const fieldCls = 'h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900';

  return (
    <div>
      {/* Inputs */}
      <div className="mb-8 rounded-xl border border-zinc-200 p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="keyword" className="mb-1 block text-sm font-medium text-zinc-700">
              Seed Keyword (optional)
            </label>
            <input
              id="keyword"
              className={fieldCls}
              placeholder="e.g. swift, bloom..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="industry" className="mb-1 block text-sm font-medium text-zinc-700">
              Industry
            </label>
            <select
              id="industry"
              className={fieldCls}
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              {INDUSTRY_LIST.map((ind) => (
                <option key={ind.slug} value={ind.slug}>
                  {ind.displayName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="style" className="mb-1 block text-sm font-medium text-zinc-700">
              Style
            </label>
            <select
              id="style"
              className={fieldCls}
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="playful">Playful</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label htmlFor="length" className="mb-1 block text-sm font-medium text-zinc-700">
              Name Length
            </label>
            <select
              id="length"
              className={fieldCls}
              value={length}
              onChange={(e) => setLength(e.target.value as Length)}
            >
              <option value="any">Any Length</option>
              <option value="short">Short (1–2 words)</option>
              <option value="medium">Medium (2–3 words)</option>
              <option value="long">Long (3+ words)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Button onClick={generate} size="lg">
            Generate Names
          </Button>
          {generated && (
            <Button variant="secondary" onClick={generate} size="lg">
              <RefreshCw size={16} strokeWidth={1.5} />
              Regenerate
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      {generated && names.length === 0 && (
        <p className="text-center text-zinc-500">No names generated. Try different options.</p>
      )}

      {names.length > 0 && (
        <div>
          <p className="mb-4 text-sm text-zinc-500">{names.length} name ideas generated</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {names.map((name) => (
              <div
                key={name}
                role="listitem"
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm"
              >
                <span className="font-semibold text-zinc-900">{name}</span>
                <div className="flex items-center gap-1">
                  <a
                    href={domainCheckUrl(name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                    title="Check domain availability"
                    aria-label={`Check domain for ${name}`}
                  >
                    <ExternalLink size={14} strokeWidth={1.5} />
                  </a>
                  <button
                    onClick={() => copyName(name)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                    title="Copy name"
                    aria-label={`Copy ${name}`}
                  >
                    {copied === name ? (
                      <Check size={14} strokeWidth={1.5} className="text-emerald-500" />
                    ) : (
                      <Copy size={14} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!generated && (
        <div className="rounded-xl border border-dashed border-zinc-200 py-16 text-center text-zinc-400">
          <p className="text-sm">Select your options above and click &quot;Generate Names&quot;</p>
        </div>
      )}
    </div>
  );
}
