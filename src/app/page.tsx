import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolCard from '@/components/ui/ToolCard';
import { TOOLS, getToolsByCategory } from '@/lib/tools';
import { websiteSchema, organizationSchema, jsonLdScript } from '@/lib/schema';
import type { Tool } from '@/types';

export const metadata: Metadata = {
  title: 'Utulio — 50 Free Online Tools for Work & Life',
  description:
    'Free, fast, no-signup online tools. Finance calculators, developer utilities, freelance tools — 50 tools built for freelancers, developers, and small businesses.',
  alternates: { canonical: '/' },
};

const CATEGORY_SECTIONS: { key: Tool['category']; label: string; desc: string }[] = [
  { key: 'finance', label: 'Finance Tools', desc: 'Mortgage, loan, retirement, tax, and salary calculators.' },
  { key: 'business', label: 'Business Tools', desc: 'Name generators, quotes, receipts, POs, and pricing calculators.' },
  { key: 'freelancer', label: 'Freelancer Tools', desc: 'Rate calculators and invoice generators for independent professionals.' },
  { key: 'developer', label: 'Developer Tools', desc: 'JSON formatter, JWT decoder, hash generator, regex tester, and more.' },
  { key: 'utility', label: 'Utility Tools', desc: 'Unit converter, BMI, TDEE, time zones, age calculator, and more.' },
  { key: 'student', label: 'Student Tools', desc: 'GPA, grade, citation, Pomodoro timer, and academic utilities.' },
];

export default function HomePage() {
  const schemas = [websiteSchema(), organizationSchema()];
  const totalTools = TOOLS.length;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="bg-zinc-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">
              {totalTools} Free Tools · No Signup
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Free Online Tools
              <br />
              <span className="text-zinc-500">for Work &amp; Life</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600">
              Professional-grade tools that work entirely in your browser. No account, no cost, no
              data collection.
            </p>
          </div>
        </Container>
      </section>

      {/* Tools by category */}
      <section className="py-16" aria-label="Available tools">
        <Container>
          {CATEGORY_SECTIONS.map(({ key, label, desc }) => {
            const tools = getToolsByCategory(key);
            if (tools.length === 0) return null;
            return (
              <div key={key} className="mb-14 last:mb-0">
                <h2 className="mb-1 text-xl font-bold tracking-tight text-zinc-900">{label}</h2>
                <p className="mb-5 text-sm text-zinc-500">{desc}</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Why Utulio */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
              Why Utulio?
            </h2>
            <p className="text-zinc-600">
              We built Utulio because the best tools shouldn&apos;t require an account, credit
              card, or monthly subscription.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Completely Free',
                desc: 'Every tool is 100% free to use, forever. No hidden fees, no premium tier, no upsells.',
              },
              {
                title: 'No Signup Required',
                desc: 'Open any tool and start using it immediately. We never ask for your email address.',
              },
              {
                title: 'Private by Design',
                desc: 'All computation happens in your browser. Your data never leaves your device.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-zinc-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
