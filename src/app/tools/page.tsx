import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolCard from '@/components/ui/ToolCard';
import { TOOLS, getToolsByCategory } from '@/lib/tools';
import type { Tool } from '@/types';
import { websiteSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'All 50 Free Online Tools — Utulio',
  description: 'Browse all 50 free online tools: finance calculators, developer utilities, business generators, student tools, and more. No signup required.',
  alternates: { canonical: '/tools' },
};

const CATEGORY_SECTIONS: { key: Tool['category']; label: string; desc: string }[] = [
  { key: 'finance', label: 'Finance Tools', desc: 'Calculators for loans, mortgages, investments, taxes, salary, and retirement.' },
  { key: 'business', label: 'Business Tools', desc: 'Name generators, document creators, and pricing calculators.' },
  { key: 'freelancer', label: 'Freelancer Tools', desc: 'Rate calculators and invoice generators for independent professionals.' },
  { key: 'developer', label: 'Developer Tools', desc: 'JSON formatter, regex tester, encoders, hash generators, and CSS utilities.' },
  { key: 'utility', label: 'Utility Tools', desc: 'Unit converters, QR codes, calculators, timers, and everyday helpers.' },
  { key: 'student', label: 'Student Tools', desc: 'GPA calculator, citation generator, grade calculator, and study tools.' },
];

export default function ToolsPage() {
  const schema = websiteSchema();
  const total = TOOLS.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }} />
      <Container className="py-8 md:py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            All {total} Free Tools
          </h1>
          <p className="text-zinc-600">
            Every tool runs in your browser — no signup, no cost, no data collection.
          </p>
        </div>

        {CATEGORY_SECTIONS.map(({ key, label, desc }) => {
          const tools = getToolsByCategory(key);
          if (tools.length === 0) return null;
          return (
            <div key={key} className="mb-14 last:mb-0">
              <div className="mb-5 flex items-baseline gap-3">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900">{label}</h2>
                <span className="text-sm text-zinc-400">{tools.length} tools</span>
              </div>
              <p className="mb-5 -mt-3 text-sm text-zinc-500">{desc}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}
