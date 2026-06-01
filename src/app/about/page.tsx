import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { toolMetadata } from '@/lib/seo';

export const metadata: Metadata = toolMetadata({
  title: 'About Utulio',
  description:
    'Utulio is a collection of free online tools built for freelancers, developers, and small businesses. No signup, no fees, ever.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900">About Utulio</h1>

        <div className="space-y-6 text-zinc-600 leading-relaxed">
          <p>
            Utulio is a collection of free, fast, browser-based tools built for people who get
            things done. Whether you&apos;re a freelancer setting your rates, a small business owner
            creating your first invoice, or a developer looking for a quick password generator —
            Utulio has you covered.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900">Our Mission</h2>
          <p>
            We believe the best productivity tools should be free, fast, and private. Too many tools
            online require you to create an account, share your email, or pay a subscription just to
            access basic utilities. We built Utulio to be the opposite of that.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900">What Makes Utulio Different</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-zinc-900">100% client-side:</strong> Every calculation,
              generation, and conversion happens entirely in your browser. Your data never touches
              our servers.
            </li>
            <li>
              <strong className="text-zinc-900">No account required:</strong> We never ask for your
              email address or personal information.
            </li>
            <li>
              <strong className="text-zinc-900">Always free:</strong> All tools are completely free,
              with no hidden premium tier or paid upgrades.
            </li>
            <li>
              <strong className="text-zinc-900">Mobile-first design:</strong> Every tool works
              flawlessly on phones and tablets, not just desktop browsers.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900">Our Tools</h2>
          <p>Utulio offers 20 free tools across six categories:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="text-zinc-900">Finance</strong> — Loan calculator, compound interest, ROI, debt payoff, profit margin, break-even, car loan, salary converter.</li>
            <li><strong className="text-zinc-900">Freelancer</strong> — Rate calculator (designers, developers, writers) and invoice generator.</li>
            <li><strong className="text-zinc-900">Business</strong> — Business name generator with 50+ industry variants.</li>
            <li><strong className="text-zinc-900">Developer</strong> — JSON formatter, regex tester, Base64 encoder/decoder, color converter, password generator.</li>
            <li><strong className="text-zinc-900">Utility</strong> — QR code generator (URL, WiFi, email, SMS), word counter, aspect ratio calculator.</li>
            <li><strong className="text-zinc-900">Student</strong> — Grade calculator with weighted averages and final exam planner.</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900">How We&apos;re Funded</h2>
          <p>
            Utulio is supported by advertising. We use Google AdSense to display relevant ads on
            our pages. These ads allow us to keep all tools free for everyone, with no paywalls or
            subscriptions.
          </p>

          <p>
            Have a suggestion for a new tool or feedback about an existing one? We&apos;d love to
            hear from you. Reach out via our{' '}
            <a href="/contact" className="font-medium text-zinc-900 underline underline-offset-2">
              contact page
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
