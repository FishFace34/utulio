import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { toolMetadata } from '@/lib/seo';

export const metadata: Metadata = toolMetadata({
  title: 'Contact Utulio',
  description:
    'Get in touch with the Utulio team. We welcome feedback, suggestions, and bug reports.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">Contact Us</h1>

        <div className="space-y-6 text-zinc-600 leading-relaxed">
          <p>
            Have a question, suggestion, or found a bug? We&apos;d love to hear from you. Utulio
            is a small project and we genuinely read every message.
          </p>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-zinc-900">Get in Touch</h2>
            <p className="text-sm text-zinc-600">
              Send us an email at:{' '}
              <a
                href="mailto:hello@utulio.com"
                className="font-medium text-zinc-900 underline underline-offset-2"
              >
                hello@utulio.com
              </a>
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              We typically respond within 1–2 business days.
            </p>
          </div>

          <h2 className="text-xl font-semibold text-zinc-900">What to include in your message</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>
              <strong className="text-zinc-700">Bug reports:</strong> Include the tool name, what
              you were doing, and what happened unexpectedly. If possible, include your browser name
              and version.
            </li>
            <li>
              <strong className="text-zinc-700">Feature requests:</strong> Describe the tool or
              feature you&apos;d like to see added, and how you&apos;d use it.
            </li>
            <li>
              <strong className="text-zinc-700">General feedback:</strong> Anything goes — we
              appreciate hearing what&apos;s working well and what could be improved.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900">Advertising</h2>
          <p className="text-sm">
            For advertising inquiries, please also reach out via email. Utulio uses Google AdSense
            for display advertising.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900">Legal Notices</h2>
          <p className="text-sm">
            For DMCA notices, privacy requests, or other legal matters, please direct your inquiry
            to the same email address with the subject line &quot;Legal Notice.&quot;
          </p>
        </div>
      </div>
    </Container>
  );
}
