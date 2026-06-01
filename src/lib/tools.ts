import type { Tool } from '@/types';

export const TOOLS: Tool[] = [
  // ── Freelancer ──────────────────────────────────────────────────────────
  {
    id: 'freelance-rate-calculator',
    name: 'Freelance Rate Calculator',
    description:
      'Calculate your ideal hourly, daily, and monthly freelance rate based on your income goals and expenses.',
    href: '/freelance-rate-calculator',
    category: 'freelancer',
    icon: 'Calculator',
    keywords: ['freelance rate calculator', 'hourly rate calculator', 'freelance pricing'],
  },
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description:
      'Create professional invoices in seconds. Download as PDF instantly — no signup required.',
    href: '/invoice-generator',
    category: 'freelancer',
    icon: 'FileText',
    keywords: ['invoice generator', 'free invoice maker', 'pdf invoice'],
  },

  // ── Business ─────────────────────────────────────────────────────────────
  {
    id: 'business-name-generator',
    name: 'Business Name Generator',
    description:
      'Generate creative, brandable business names instantly for any industry. 1000+ unique combinations.',
    href: '/business-name-generator',
    category: 'business',
    icon: 'Briefcase',
    keywords: ['business name generator', 'company name ideas', 'brand name generator'],
  },

  // ── Finance ──────────────────────────────────────────────────────────────
  {
    id: 'loan-payment-calculator',
    name: 'Loan Payment Calculator',
    description:
      'Calculate monthly loan payments, total interest, and full amortization schedule for any loan.',
    href: '/loan-payment-calculator',
    category: 'finance',
    icon: 'Landmark',
    keywords: ['loan calculator', 'loan payment calculator', 'monthly payment calculator'],
  },
  {
    id: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator',
    description:
      'Compare snowball vs avalanche strategies to become debt-free faster and save on interest.',
    href: '/debt-payoff-calculator',
    category: 'finance',
    icon: 'TrendingDown',
    keywords: ['debt payoff calculator', 'debt snowball calculator', 'debt avalanche'],
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description:
      'See how your savings grow with compound interest and regular contributions over time.',
    href: '/compound-interest-calculator',
    category: 'finance',
    icon: 'LineChart',
    keywords: ['compound interest calculator', 'investment calculator', 'savings calculator'],
  },
  {
    id: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    description:
      'Calculate gross profit, profit margin percentage, and markup for any product or service.',
    href: '/profit-margin-calculator',
    category: 'finance',
    icon: 'Percent',
    keywords: ['profit margin calculator', 'markup calculator', 'gross margin'],
  },
  {
    id: 'break-even-calculator',
    name: 'Break-Even Calculator',
    description:
      'Find your break-even point in units and revenue. Essential analysis for any small business.',
    href: '/break-even-calculator',
    category: 'finance',
    icon: 'Scale',
    keywords: ['break even calculator', 'break even point', 'break even analysis'],
  },
  {
    id: 'car-loan-calculator',
    name: 'Car Loan Calculator',
    description:
      'Calculate car loan payments including down payment, trade-in value, and sales tax.',
    href: '/car-loan-calculator',
    category: 'finance',
    icon: 'Car',
    keywords: ['car loan calculator', 'auto loan calculator', 'car payment calculator'],
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description:
      'Calculate return on investment and annualized ROI (CAGR) for any investment or business decision.',
    href: '/roi-calculator',
    category: 'finance',
    icon: 'TrendingUp',
    keywords: ['roi calculator', 'return on investment', 'annualized roi'],
  },
  {
    id: 'salary-to-hourly-calculator',
    name: 'Salary to Hourly Calculator',
    description:
      'Convert annual salary to hourly, daily, weekly, and monthly pay — and back. Instant results.',
    href: '/salary-to-hourly-calculator',
    category: 'finance',
    icon: 'Clock',
    keywords: ['salary to hourly', 'hourly to salary', 'salary calculator'],
  },

  // ── Developer ────────────────────────────────────────────────────────────
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description:
      'Format, validate, and minify JSON instantly. Private — runs entirely in your browser.',
    href: '/json-formatter',
    category: 'developer',
    icon: 'Braces',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minify'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description:
      'Test regular expressions in real-time with live match highlighting and capture group display.',
    href: '/regex-tester',
    category: 'developer',
    icon: 'SearchCode',
    keywords: ['regex tester', 'regular expression tester', 'regex online'],
  },
  {
    id: 'base64-encode-decode',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode text to Base64 or decode Base64 to text. UTF-8 safe, private, instant.',
    href: '/base64-encode-decode',
    category: 'developer',
    icon: 'Binary',
    keywords: ['base64 encode', 'base64 decode', 'base64 converter'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description:
      'Convert colors between HEX, RGB, HSL, and CMYK with a live preview swatch. Free tool.',
    href: '/color-converter',
    category: 'developer',
    icon: 'Palette',
    keywords: ['color converter', 'hex to rgb', 'rgb to hex', 'hsl converter'],
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description:
      'Generate strong, cryptographically secure passwords. Customizable length and character sets.',
    href: '/password-generator',
    category: 'developer',
    icon: 'Lock',
    keywords: ['password generator', 'strong password', 'secure password'],
  },

  // ── Utility ──────────────────────────────────────────────────────────────
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description:
      'Create free QR codes for URLs, WiFi, email, and more. Download as PNG or SVG. No signup.',
    href: '/qr-code-generator',
    category: 'utility',
    icon: 'QrCode',
    keywords: ['qr code generator', 'free qr code', 'qr code maker'],
  },
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    description:
      'Count words, characters, sentences, and reading time. Works for essays, tweets, and content.',
    href: '/word-counter',
    category: 'utility',
    icon: 'Type',
    keywords: ['word counter', 'character counter', 'reading time calculator'],
  },
  {
    id: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    description:
      'Calculate proportional dimensions for any aspect ratio. Perfect for images, video, and design.',
    href: '/aspect-ratio-calculator',
    category: 'utility',
    icon: 'Ratio',
    keywords: ['aspect ratio calculator', 'ratio calculator', 'image dimensions'],
  },

  // ── Student ──────────────────────────────────────────────────────────────
  {
    id: 'grade-calculator',
    name: 'Grade Calculator',
    description:
      'Calculate weighted course grades and find out what score you need on your final exam.',
    href: '/grade-calculator',
    category: 'student',
    icon: 'GraduationCap',
    keywords: ['grade calculator', 'final grade calculator', 'weighted grade calculator'],
  },
];

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function getRelatedTools(currentId: string, count = 4): Tool[] {
  const current = TOOLS.find((t) => t.id === currentId);
  if (!current) return TOOLS.filter((t) => t.id !== currentId).slice(0, count);
  // prefer same category
  const sameCategory = TOOLS.filter(
    (t) => t.id !== currentId && t.category === current.category
  );
  const others = TOOLS.filter(
    (t) => t.id !== currentId && t.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function getToolsByCategory(
  category: Tool['category']
): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}
