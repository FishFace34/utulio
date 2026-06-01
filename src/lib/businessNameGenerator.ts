import { INDUSTRIES } from './industries';

type Style = 'modern' | 'classic' | 'playful' | 'professional';
type Length = 'short' | 'medium' | 'long' | 'any';

interface GeneratorOptions {
  keyword?: string;
  industry: string;
  style: Style;
  length: Length;
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function applyPattern(pattern: string, desc: string, noun: string, suffix: string, kw?: string): string {
  const d = capitalize(desc);
  const n = capitalize(noun);
  const s = capitalize(suffix);
  const k = kw ? capitalize(kw) : d;
  return pattern
    .replace('{descriptor}', desc)
    .replace('{Descriptor}', d)
    .replace('{noun}', noun)
    .replace('{Noun}', n)
    .replace('{suffix}', suffix)
    .replace('{Suffix}', s)
    .replace('{keyword}', kw || desc)
    .replace('{Keyword}', k);
}

const STYLE_PATTERNS: Record<Style, string[]> = {
  modern: [
    '{descriptor}{noun}',
    '{Noun}.io',
    'Get{Noun}',
    '{Noun}HQ',
    '{Keyword}{Noun}',
    '{Noun}AI',
    '{Descriptor}{Noun}App',
    '{Noun}Go',
  ],
  classic: [
    '{Descriptor} & {Noun}',
    'The {Descriptor} {Noun}',
    '{Noun} {Suffix}',
    '{Descriptor} {Noun} {Suffix}',
    '{Keyword} {Suffix}',
    '{Descriptor} {Noun} Co',
    'The {Noun} {Suffix}',
  ],
  playful: [
    '{Noun}ly',
    '{Noun}zy',
    'Hey{Noun}',
    '{Descriptor}{Noun}y',
    '{Noun}Hub',
    '{Noun}Bunch',
    'Super{Noun}',
    '{Keyword}ify',
  ],
  professional: [
    '{Descriptor} {Noun} Group',
    '{Noun} Partners',
    '{Descriptor}{Noun} LLC',
    '{Keyword} {Noun} Associates',
    '{Noun} & Co',
    '{Descriptor} {Noun} Solutions',
    'Premier {Noun}',
    '{Descriptor} {Noun} International',
  ],
};

function fitLength(name: string, length: Length): boolean {
  const wordCount = name.split(' ').length;
  const charCount = name.replace(/\s/g, '').length;
  if (length === 'short') return wordCount <= 2 && charCount <= 12;
  if (length === 'medium') return wordCount <= 3 && charCount <= 20;
  if (length === 'long') return wordCount >= 3;
  return true;
}

export function generateNames(options: GeneratorOptions, count = 20): string[] {
  const industryData = INDUSTRIES[options.industry];
  if (!industryData) return [];

  const { descriptors, nouns, suffixes } = industryData;
  const patterns = STYLE_PATTERNS[options.style];
  const names = new Set<string>();
  let attempts = 0;

  while (names.size < count && attempts < count * 10) {
    attempts++;
    const pattern = pick(patterns);
    const desc = pick(descriptors);
    const noun = pick(nouns);
    const suffix = pick(suffixes);
    const candidate = applyPattern(pattern, desc, noun, suffix, options.keyword);
    if (fitLength(candidate, options.length)) {
      names.add(candidate);
    }
  }

  // If we didn't get enough, fill with simpler patterns
  while (names.size < count && attempts < count * 20) {
    attempts++;
    const desc = pick(descriptors);
    const noun = pick(nouns);
    const suffix = pick(suffixes);
    names.add(`${capitalize(desc)} ${capitalize(noun)} ${suffix}`);
  }

  return Array.from(names).slice(0, count);
}
