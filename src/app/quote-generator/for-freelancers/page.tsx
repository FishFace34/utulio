import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import AdSlot from '@/components/ui/AdSlot';
import QuoteGenerator from '@/components/tools/QuoteGenerator';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';

export const metadata: Metadata = toolMetadata({
  title: 'Quote Generator for Freelancers — Free Project Quote',
  description: 'Create professional project quotes as a freelancer. Itemize services and deliverables. Download as PDF.',
  path: '/quote-generator/for-freelancers',
  keywords: ['freelancer quote generator', 'freelance project quote', 'project estimate template'],
});

export default function FreelancerQuotePage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Freelancer Quote Generator', description: 'Create professional freelance project quotes.', url: '/quote-generator/for-freelancers', category: 'BusinessApplication' }),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Quote Generator', url: '/quote-generator' }, { name: 'For Freelancers', url: '/quote-generator/for-freelancers' }]),
  ];

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Freelancer Quote Generator" description="Create professional project quotes for design, development, writing, consulting, or any freelance service. Itemize deliverables clearly and include your terms." category="Freelancer Tools" categoryVariant="freelancer" />
        <QuoteGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Writing a Great Freelance Quote</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Break your project into clear deliverables. Instead of &quot;Website design — $2,000,&quot; list each component: discovery call, wireframes, 3 page designs, responsive development, and handoff. This reduces scope creep and makes the value obvious.</p>
          <p className="text-zinc-600 leading-relaxed">Include a brief description of what&apos;s <em>not</em> included in the notes field (e.g., &quot;Additional pages beyond 5 quoted separately&quot;). This sets expectations and protects you if the client tries to expand scope without additional payment.</p>
        </section>
      </Container>
    </>
  );
}
