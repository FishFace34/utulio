'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Container from './Container';

const NAV_LINKS = [
  { href: '/freelance-rate-calculator', label: 'Rate Calc' },
  { href: '/invoice-generator', label: 'Invoice' },
  { href: '/business-name-generator', label: 'Names' },
  { href: '/password-generator', label: 'Password' },
  { href: '/word-counter', label: 'Word Counter' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-zinc-200 bg-white">
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          Utulio
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-4 w-px bg-zinc-200" />
          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-zinc-200 bg-white md:hidden">
          <Container>
            <nav className="flex flex-col py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-1 h-px bg-zinc-100" />
              <Link
                href="/about"
                className="rounded-md px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
