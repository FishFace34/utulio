import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { toolMetadata } from '@/lib/seo';

export const metadata: Metadata = toolMetadata({
  title: 'Privacy Policy',
  description: 'Utulio Privacy Policy — how we collect, use, and protect your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-zinc-900">Privacy Policy</h1>
        <p className="mb-8 text-sm text-zinc-500">Last updated: January 1, 2026</p>

        <div className="space-y-8 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">1. Overview</h2>
            <p>
              Utulio (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we handle information when
              you visit utulio.com (the &quot;Site&quot;) and use our free online tools.
            </p>
            <p className="mt-3">
              <strong className="text-zinc-900">The short version:</strong> All of our tools run
              entirely in your browser. We do not collect, store, or transmit any data you input
              into our tools. We do use third-party services (Google Analytics, Google AdSense) that
              may collect limited usage data, as described below.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">2. Information We Collect</h2>
            <h3 className="mb-2 font-semibold text-zinc-800">2.1 Tool Inputs</h3>
            <p>
              Any data you enter into our tools (invoices, text, passwords, rate information) is
              processed entirely within your browser using JavaScript. This data is{' '}
              <strong className="text-zinc-900">never sent to our servers</strong>. Some tools (like
              the Invoice Generator) may use your browser&apos;s localStorage to save your work
              locally on your device. This data stays on your device.
            </p>

            <h3 className="mb-2 mt-4 font-semibold text-zinc-800">2.2 Usage Data</h3>
            <p>
              We use Google Analytics 4 to collect anonymized usage data, including pages visited,
              time spent on pages, and general geographic region. This data helps us understand how
              our tools are used and improve them. Google Analytics may use cookies to track
              sessions.
            </p>

            <h3 className="mb-2 mt-4 font-semibold text-zinc-800">2.3 Advertising Data</h3>
            <p>
              We use Google AdSense to display advertisements. Google AdSense may collect data about
              your browsing behavior to serve personalized ads. This includes the use of cookies and
              similar tracking technologies. Google&apos;s use of advertising cookies enables it and
              its partners to serve ads based on your visits to our Site and other sites on the
              Internet.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">3. Cookies</h2>
            <p>
              Our Site uses cookies in limited circumstances. We do not set our own advertising
              cookies. Third-party cookies may be set by Google Analytics and Google AdSense. You
              can opt out of Google&apos;s advertising cookies by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 underline underline-offset-2"
              >
                Google Ad Settings
              </a>
              . You can also use your browser&apos;s cookie settings to block or delete cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">
              4. Third-Party Services
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-zinc-900">Google Analytics:</strong> Web analytics service.{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline underline-offset-2"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-zinc-900">Google AdSense:</strong> Advertising service.{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 underline underline-offset-2"
                >
                  Google Advertising Policies
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">5. Children&apos;s Privacy</h2>
            <p>
              Our Site is not directed to children under the age of 13. We do not knowingly collect
              personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">6. Data Security</h2>
            <p>
              Since we do not collect or store your tool inputs on our servers, there is no
              associated data security risk for your tool usage. Our website is served over HTTPS to
              protect data in transit.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">7. Your Rights</h2>
            <p>
              Depending on your location, you may have rights regarding your personal data under
              applicable privacy laws (GDPR, CCPA, etc.). Since we do not collect personal data
              directly, most of these rights apply to data collected by Google on our behalf. To
              exercise your rights, contact Google directly or reach out to us at hello@utulio.com.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated &quot;Last updated&quot; date. Continued use of the Site after
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-900">9. Contact</h2>
            <p>
              Questions about this Privacy Policy? Contact us at{' '}
              <a
                href="mailto:hello@utulio.com"
                className="text-zinc-900 underline underline-offset-2"
              >
                hello@utulio.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
