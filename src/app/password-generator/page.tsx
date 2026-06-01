import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Strong Password Generator — Free & Secure',
  description:
    'Generate strong, random passwords instantly. Customizable length, symbols, numbers. 100% private — generation happens in your browser.',
  path: '/password-generator',
  keywords: ['password generator', 'strong password', 'secure password generator', 'random password'],
});

const FAQ_ITEMS = [
  {
    question: 'Are generated passwords safe?',
    answer:
      'Yes. Our password generator uses the Web Cryptography API\'s crypto.getRandomValues() function, which provides cryptographically secure random numbers. This is the same standard used by security-focused applications. The passwords are generated entirely in your browser — they are never sent to any server, stored, or logged.',
  },
  {
    question: 'Does this tool save my passwords?',
    answer:
      'No. Passwords are generated and displayed in your browser only. We do not log, store, or transmit any generated passwords. Once you leave the page, the password is gone. This is by design — no storage means no data breach risk from our end.',
  },
  {
    question: 'What makes a password strong?',
    answer:
      'Password strength is determined by entropy — the number of bits of randomness. A strong password is long (16+ characters), uses a mix of character types (uppercase, lowercase, numbers, symbols), and is unique (not used for any other account). Our strength meter shows entropy in bits: 60+ bits is strong, 128+ bits is very strong.',
  },
  {
    question: 'How long should my password be?',
    answer:
      'For most accounts, 16 characters is the minimum recommended length. For highly sensitive accounts (email, banking, work), use 20+ characters. For a password manager master password, consider 24+ characters or a passphrase. Longer is always better — even a few extra characters dramatically increases resistance to brute force attacks.',
  },
  {
    question: 'Should I use the same password for everything?',
    answer:
      'Never. If one account is breached and you reuse passwords, all your accounts become vulnerable — this is called credential stuffing. Use a unique password for every account. A password manager makes this practical — you only need to remember one master password, and the manager generates and stores unique passwords for every site.',
  },
  {
    question: 'What is a passphrase and is it more secure?',
    answer:
      'A passphrase is a sequence of random words (e.g., "correct-horse-battery-staple"). It\'s easier to remember than a random character string while still providing strong security through length. A 4-word passphrase from a large word list provides approximately 50+ bits of entropy. Passphrases are especially useful for master passwords you need to type from memory.',
  },
];

export default function PasswordGeneratorPage() {
  const relatedTools = getRelatedTools('password-generator', 4);
  const schemas = [
    softwareApplicationSchema({
      name: 'Strong Password Generator',
      description: 'Generate cryptographically secure passwords in your browser.',
      url: '/password-generator',
      category: 'SecurityApplication',
    }),
    faqPageSchema(FAQ_ITEMS),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Password Generator', url: '/password-generator' },
    ]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
        />
      ))}

      <Container className="py-4 md:py-8">
        <ToolHero
          title="Strong Password Generator"
          description="Generate cryptographically secure, random passwords in seconds. 100% private — your passwords never leave your browser."
          category="Developer Tools"
          categoryVariant="developer"
        />

        <PasswordGenerator />

        <div className="mt-8">
          <AdSlot slot="in-content" />
        </div>

        {/* Strong password tips */}
        <section className="mt-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            How to Create a Strong Password
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Use 16+ characters',
                desc: 'Length is the single most important factor. Each additional character exponentially increases the time needed to crack a password by brute force.',
              },
              {
                title: 'Mix character types',
                desc: 'Combining uppercase, lowercase, numbers, and symbols dramatically increases the number of possible combinations for any given length.',
              },
              {
                title: 'Use a unique password per site',
                desc: 'If one service is breached and you reuse passwords, all your accounts are at risk. A password manager makes unique passwords practical.',
              },
              {
                title: 'Avoid personal information',
                desc: 'Names, birthdays, addresses, and common words are the first things attackers try. A truly random password is always safer than a memorable one.',
              },
            ].map((tip) => (
              <div key={tip.title} className="rounded-xl border border-zinc-200 p-4">
                <h3 className="mb-1.5 font-semibold text-zinc-900">{tip.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why use */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-zinc-900">
            Why Use a Password Generator?
          </h2>
          <p className="mb-4 leading-relaxed text-zinc-600">
            Humans are notoriously bad at choosing random passwords. We gravitate toward memorable
            patterns, common words, and personal information — all of which make passwords easier to
            crack. A password generator removes human bias entirely, producing passwords with true
            cryptographic randomness.
          </p>
          <p className="leading-relaxed text-zinc-600">
            Research shows that most data breaches involve weak or reused passwords. Using a unique,
            randomly generated password for every account is one of the most effective steps you can
            take to protect your digital security.
          </p>
        </section>

        <FAQ items={FAQ_ITEMS} />

        {/* Related Tools */}
        <section className="mt-4 pb-16">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
