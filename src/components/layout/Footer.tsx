import Link from 'next/link';
import Container from './Container';

const TOP_TOOLS = [
  { href: '/loan-payment-calculator', label: 'Loan Calculator' },
  { href: '/freelance-rate-calculator', label: 'Rate Calculator' },
  { href: '/invoice-generator', label: 'Invoice Generator' },
  { href: '/json-formatter', label: 'JSON Formatter' },
  { href: '/qr-code-generator', label: 'QR Code Generator' },
  { href: '/password-generator', label: 'Password Generator' },
  { href: '/word-counter', label: 'Word Counter' },
  { href: '/grade-calculator', label: 'Grade Calculator' },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-50">
      <Container>
        <div className="grid gap-8 border-t border-zinc-200 py-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-bold text-zinc-900">
              Utulio
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Free online tools for freelancers, developers, and small businesses.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Popular Tools</h3>
            <ul className="space-y-2">
              {TOP_TOOLS.slice(0, 5).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">More Tools</h3>
            <ul className="space-y-2">
              {TOP_TOOLS.slice(5).map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools" className="text-sm font-medium text-zinc-900 underline underline-offset-2">
                  View all 50 tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-zinc-200 py-4 text-center text-sm text-zinc-400">
          © 2026 Utulio. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
