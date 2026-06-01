import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import TimeZoneConverter from '@/components/tools/TimeZoneConverter';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Time Zone Converter — Compare Times Across Zones',
  description: 'Convert times between time zones and find the best meeting time. Free time zone converter.',
  path: '/time-zone-converter',
  keywords: ['time zone converter', 'world clock', 'time difference'],
});

const FAQS = [
  { question: 'How do I find the time in another city?', answer: 'Enter your local date and time, select your timezone, then add the target city\'s timezone using the "Add" button. The converted time appears instantly. Business hours (9am–5pm) are highlighted in green to help identify good meeting times.' },
  { question: 'What is UTC?', answer: 'UTC (Coordinated Universal Time) is the primary time standard by which the world regulates clocks and time. It is the same as GMT (Greenwich Mean Time) for most practical purposes. All time zones are expressed as UTC offsets: New York is UTC-5 (or UTC-4 during DST), London is UTC+0 (or UTC+1 during BST), Tokyo is UTC+9.' },
  { question: 'What is Daylight Saving Time?', answer: 'Daylight Saving Time (DST) is the practice of advancing clocks by one hour during warmer months to extend evening daylight. This converter uses the browser\'s native Intl API, which automatically applies DST rules for each timezone — so conversions are always correct regardless of the time of year.' },
  { question: 'How do I find the best time for an international meeting?', answer: 'Add all participants\' timezones to the converter. Then adjust the time until all zones show green (business hours 9am–5pm). If it\'s impossible to find a time that works for everyone, look for a time that is business hours in the most important locations and early/late (but not the middle of the night) for others.' },
  { question: 'Why is timezone data accurate?', answer: 'This converter uses the browser\'s native Intl.DateTimeFormat API with IANA timezone identifiers (e.g., America/New_York). These are the same timezone definitions used by operating systems and servers worldwide, and they are automatically updated when your browser/OS updates. No manual timezone data is hardcoded.' },
  { question: 'What is the IANA timezone database?', answer: 'The IANA (Internet Assigned Numbers Authority) timezone database is the authoritative source of timezone data worldwide. It is maintained by a group of volunteers and updated whenever countries change their timezone rules or DST schedules. Examples: America/New_York, Europe/London, Asia/Tokyo. Your browser uses this database for all timezone operations.' },
];

export default function TimeZoneConverterPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Time Zone Converter', description: 'Convert times between time zones and find the best meeting time.', url: '/time-zone-converter', category: 'UtilityApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Time Zone Converter', url: '/time-zone-converter' }]),
  ];
  const related = getRelatedTools('time-zone-converter', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Time Zone Converter" description="Enter a time in any timezone and instantly see what it is in multiple other zones. Business hours highlighted in green. Uses your browser&apos;s native timezone engine — DST handled automatically." category="Utility Tools" categoryVariant="utility" />
        <TimeZoneConverter />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Working Across Time Zones</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Remote work and global teams make time zone awareness essential. A meeting scheduled for &quot;3pm&quot; means 3pm for someone — but which someone? Using UTC offsets or unambiguous timezone names (America/New_York, Europe/London) avoids confusion, especially around DST transitions when the offset changes.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Finding overlapping business hours for teams spread across multiple continents is often challenging. Americas + Europe often have a 3–4 hour overlap window (1–5pm ET = 9am–1pm PT = 6–10pm London). Americas + Asia rarely overlap during business hours — one team must work early or late.</p>
          <p className="text-zinc-600 leading-relaxed">This tool uses the native browser <code className="rounded bg-zinc-100 px-1 text-sm">Intl.DateTimeFormat</code> API with IANA timezone identifiers. Daylight Saving Time is handled automatically using the same rules your operating system uses.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Time Zone Converter FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
