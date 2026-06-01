import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import JSONFormatter from '@/components/tools/JSONFormatter';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'JSON Formatter & Validator — Beautify & Minify JSON',
  description:
    'Format, validate, and minify JSON instantly. Free online JSON beautifier with error detection. Private — runs in your browser.',
  path: '/json-formatter',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'json minify'],
});

const FAQS = [
  {
    question: 'What is JSON?',
    answer:
      'JSON (JavaScript Object Notation) is a lightweight data interchange format. It\'s human-readable text used to store and transmit data objects consisting of key-value pairs and arrays. JSON is language-independent but uses conventions from the C-family of languages. It\'s the most common format for REST API responses.',
  },
  {
    question: 'Is my JSON data safe?',
    answer:
      'Yes, completely. This tool runs entirely in your browser using JavaScript. Your JSON data is never sent to any server — there is no network request when you click Format, Minify, or Validate. You can verify this by opening your browser\'s Developer Tools → Network tab while using the tool.',
  },
  {
    question: 'How do I fix a JSON syntax error?',
    answer:
      'Common JSON errors include: missing commas between elements, trailing commas (not allowed in JSON), unquoted property names, single quotes instead of double quotes, and undefined values. The error message shown by this validator includes the position of the error to help you find it quickly.',
  },
  {
    question: "What's the difference between formatting and minifying?",
    answer:
      'Formatting (beautifying) adds whitespace and line breaks to make JSON human-readable. Minifying removes all unnecessary whitespace to reduce file size — important for API responses and file storage where every byte counts. Both represent the same data structure.',
  },
  {
    question: 'What\'s the maximum JSON size I can format?',
    answer:
      'There is no hard limit — the constraint is your browser\'s available memory. This tool handles JSON files of several megabytes without issues. For very large JSON files (100MB+), a dedicated desktop tool may be more appropriate.',
  },
  {
    question: 'Can I format JSON with comments?',
    answer:
      'No — JSON does not support comments. This is by design: JSON is a data format, not a configuration format. If you need comments, consider JSONC (JSON with Comments, used by VS Code configs) or JSON5. This tool will flag commented JSON as invalid, because per the JSON spec it is.',
  },
];

export default function JSONFormatterPage() {
  const schemas = [
    softwareApplicationSchema({
      name: 'JSON Formatter & Validator',
      description: 'Format, validate, and minify JSON in your browser.',
      url: '/json-formatter',
      category: 'DeveloperApplication',
    }),
    faqPageSchema(FAQS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'JSON Formatter', url: '/json-formatter' },
    ]),
  ];

  const related = getRelatedTools('json-formatter', 3);

  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="JSON Formatter & Validator"
          description="Instantly format, validate, and minify JSON. Paste your JSON to check for errors, beautify for readability, or minify for production. Completely private — nothing is sent to any server."
          category="Developer Tools"
          categoryVariant="developer"
        />

        <JSONFormatter />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Why Format Your JSON?</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Raw JSON from APIs is often minified — all whitespace removed — to reduce payload size.
            While efficient for machines, this makes it nearly impossible to read and debug manually.
            Formatting adds proper indentation and line breaks to reveal the structure at a glance.
          </p>
          <p className="mb-4 text-zinc-600 leading-relaxed">
            Validation is equally important. A single misplaced comma or missing bracket can break
            an entire JSON document. This tool provides exact error messages and positions so you
            can fix issues immediately rather than hunting through hundreds of lines.
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Minifying is useful for production deployments where you want to reduce API response sizes.
            Removing whitespace from a heavily formatted JSON file can reduce its size by 20–40%.
          </p>
        </section>

        <div className="mt-10">
          <FAQ items={FAQS} title="JSON Formatter FAQs" />
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
