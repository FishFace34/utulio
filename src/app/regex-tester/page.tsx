import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import RegexTester from '@/components/tools/RegexTester';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Regex Tester — Test & Debug Regular Expressions',
  description:
    'Test regular expressions in real-time with live match highlighting and capture group display. Free online regex tester.',
  path: '/regex-tester',
  keywords: ['regex tester', 'regular expression tester', 'regex online'],
});

const FAQS = [
  {
    question: 'What is a regular expression?',
    answer:
      'A regular expression (regex) is a sequence of characters that defines a search pattern. Regex can match specific text, validate formats (email, phone, URL), extract data, and perform find-and-replace operations. They are supported in virtually every programming language.',
  },
  {
    question: 'What do the regex flags mean?',
    answer:
      'The most common flags are: g (global — find all matches, not just the first), i (case insensitive), m (multiline — ^ and $ match line boundaries instead of string start/end), and s (dotall — makes . match newline characters too). You can combine multiple flags.',
  },
  {
    question: "What's the difference between * and +?",
    answer:
      '* means "zero or more" repetitions. It matches even if the pattern appears zero times. + means "one or more" repetitions — it requires at least one match. For example, \\d* matches an empty string, while \\d+ requires at least one digit.',
  },
  {
    question: 'How do capture groups work?',
    answer:
      'Parentheses () create capture groups that extract specific parts of a match. For example, the pattern (\\w+)@(\\w+\\.\\w+) applied to "hello@example.com" captures "hello" as group 1 and "example.com" as group 2. You can reference captured groups in replacement strings with $1, $2, etc.',
  },
  {
    question: 'Is my data sent anywhere?',
    answer:
      'No. This regex tester runs entirely in your browser using the native JavaScript RegExp engine. Your patterns and test strings are never transmitted to any server. This makes it safe to test sensitive data patterns.',
  },
  {
    question: 'Why does my regex match nothing?',
    answer:
      'Common reasons: (1) the pattern is case-sensitive and your text has different casing — try the i flag, (2) special characters like . * + ? need escaping with \\ if meant literally, (3) you\'re missing the g flag so only the first match is found, (4) anchors (^ $) are restricting the match too tightly.',
  },
];

export default function RegexTesterPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'Regex Tester',
      description: 'Test and debug regular expressions with live match highlighting.',
      url: '/regex-tester',
      category: 'DeveloperApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Regex Tester', url: '/regex-tester' },
    ]),
  ];

  const related = getRelatedTools('regex-tester', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Regex Tester"
          description="Test and debug regular expressions in real-time. See match highlighting, capture groups, and replacement previews — all running instantly in your browser."
          category="Developer Tools"
          categoryVariant="developer"
        />

        <RegexTester />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Getting Started with Regular Expressions</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Regular expressions are one of the most powerful tools in a developer&apos;s toolkit.
            Whether you&apos;re validating form inputs, parsing log files, transforming text, or
            extracting data, regex provides a concise and universal solution.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Start with simple patterns and build complexity. A pattern like <code className="rounded bg-zinc-100 px-1 text-sm">\d+</code> matches
            one or more digits. Add grouping: <code className="rounded bg-zinc-100 px-1 text-sm">(\d{3})-(\d{4})</code> matches a phone
            number and captures the two parts separately. Use flags like <code className="rounded bg-zinc-100 px-1 text-sm">i</code> for
            case-insensitive matching and <code className="rounded bg-zinc-100 px-1 text-sm">g</code> to find all occurrences.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            This tester uses the standard JavaScript RegExp engine, so patterns work exactly as
            they would in Node.js, browser JavaScript, and most modern programming environments.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="Regex Tester FAQs" />
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
