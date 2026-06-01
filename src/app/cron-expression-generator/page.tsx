import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import CronExpressionGenerator from '@/components/tools/CronExpressionGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Cron Expression Generator — Build & Explain Cron Jobs',
  description: 'Build cron expressions visually and see them explained in plain English. Includes next run times. Free.',
  path: '/cron-expression-generator',
  keywords: ['cron expression generator', 'cron generator', 'crontab generator'],
});

const FAQS = [
  { question: 'What is a cron expression?', answer: 'A cron expression is a 5-field string that defines a schedule for recurring tasks. The fields represent: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0=Sunday). For example, "0 9 * * 1-5" means "at 9:00 AM, Monday through Friday."' },
  { question: 'What does * mean in a cron expression?', answer: 'An asterisk (*) in a field means "every possible value." So * in the minute field means "every minute," * in the hour field means "every hour," etc. A full asterisk expression "* * * * *" runs every minute of every day.' },
  { question: 'How do I run a job every 5 minutes?', answer: 'Use the step syntax: */5 * * * *. This means "every 5 minutes." Similarly, */15 * * * * runs every 15 minutes, and 0 */2 * * * runs every 2 hours at minute 0. The / operator divides the range into steps.' },
  { question: 'What is the difference between cron and crontab?', answer: 'Cron is the background service (daemon) that runs scheduled tasks on Unix/Linux systems. Crontab (cron table) is the file that defines the schedules. The crontab command is used to edit this file. In modern systems, cron expressions are also used by cloud schedulers (AWS EventBridge, GitHub Actions), job queues, and application frameworks.' },
  { question: 'Does cron run in UTC or local time?', answer: 'By default, system cron runs in the server\'s local timezone. However, most cloud services (AWS Lambda, Google Cloud Scheduler) use UTC. Always confirm the timezone of your scheduler. Daylight Saving Time changes can cause cron jobs to run at unexpected times if the timezone is not fixed (e.g., use UTC or a specific IANA timezone).' },
  { question: 'Why might my cron job not run?', answer: 'Common reasons: (1) the expression is syntactically wrong, (2) the script has permission issues, (3) the working directory is wrong (use absolute paths), (4) environment variables differ from your shell session, (5) the cron daemon itself isn\'t running. Use this tool to verify your expression is correct, then check system logs (/var/log/cron or journalctl) for execution details.' },
];

export default function CronExpressionGeneratorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Cron Expression Generator', description: 'Build cron expressions visually with plain-English explanation and next run times.', url: '/cron-expression-generator', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Cron Expression Generator', url: '/cron-expression-generator' }]),
  ];
  const related = getRelatedTools('cron-expression-generator', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Cron Expression Generator" description="Build cron expressions using a visual field editor or enter raw expressions. See a plain-English explanation of what the schedule means and the next 5 run times." category="Developer Tools" categoryVariant="developer" />
        <CronExpressionGenerator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Cron Expression Reference</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">A cron expression has 5 space-separated fields: <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">minute hour day-of-month month day-of-week</code>. Each field accepts specific values, wildcards, ranges, and steps.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Special values: <code className="rounded bg-zinc-100 px-1 text-sm">*</code> (any), <code className="rounded bg-zinc-100 px-1 text-sm">1-5</code> (range), <code className="rounded bg-zinc-100 px-1 text-sm">1,3,5</code> (list), <code className="rounded bg-zinc-100 px-1 text-sm">*/5</code> (every 5). For example: <code className="rounded bg-zinc-100 px-1 text-sm">0 9,17 * * 1-5</code> means &quot;at 9:00 AM and 5:00 PM, Monday through Friday.&quot;</p>
          <p className="text-zinc-600 leading-relaxed">Note: some extended cron implementations support 6 or 7 fields (adding seconds and/or year). This generator uses the standard 5-field format supported by most Unix systems and cloud schedulers.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Cron Expression FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
