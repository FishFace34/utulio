import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import JWTDecoder from '@/components/tools/JWTDecoder';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'JWT Decoder — Decode JSON Web Tokens Online',
  description: 'Decode and inspect JWT tokens. View header, payload, and claims. Free, private — runs in your browser.',
  path: '/jwt-decoder',
  keywords: ['jwt decoder', 'jwt decode', 'json web token decoder'],
});

const FAQS = [
  { question: 'What is a JWT?', answer: 'A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and information exchange. It consists of three Base64url-encoded parts separated by dots: a header (algorithm and type), a payload (claims/data), and a signature. JWTs are commonly used for API authentication and stateless sessions.' },
  { question: 'Is it safe to decode a JWT in this tool?', answer: 'This tool only decodes — it reads the Base64url-encoded header and payload, which are not encrypted. The contents of a JWT are already readable by anyone who has the token. However, never paste tokens that grant access to sensitive systems, contain personal data, or are from production environments into any third-party tool.' },
  { question: 'What is the exp claim?', answer: 'The "exp" (expiration time) claim is a Unix timestamp (seconds since January 1, 1970 UTC) indicating when the token expires. This tool automatically converts exp to a human-readable date and shows whether the token has expired. A server should reject tokens where the current time is past the exp timestamp.' },
  { question: 'What is the difference between HS256 and RS256?', answer: 'HS256 (HMAC-SHA256) uses a shared secret key for both signing and verification — the same key creates and validates the token. RS256 (RSA-SHA256) uses a private key to sign and a public key to verify — the secret never needs to be shared. RS256 is preferred for distributed systems where multiple services need to verify tokens without needing the signing secret.' },
  { question: 'Why can\'t this tool verify the signature?', answer: 'JWT signature verification requires the secret key (HS256) or the public key (RS256) that was used to sign the token. These keys are server-side secrets that should never be exposed in a client-side tool. This decoder shows the signature for inspection only. Always verify JWT signatures on your server.' },
  { question: 'What are standard JWT claims?', answer: 'Standard claims defined in RFC 7519: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration), nbf (not before), iat (issued at), jti (JWT ID). Applications often add custom claims for user roles, permissions, and other data. This tool highlights the standard time-based claims (exp, iat, nbf) with human-readable timestamps.' },
];

export default function JWTDecoderPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'JWT Decoder', description: 'Decode and inspect JWT tokens. View header, payload, and claims.', url: '/jwt-decoder', category: 'DeveloperApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'JWT Decoder', url: '/jwt-decoder' }]),
  ];
  const related = getRelatedTools('jwt-decoder', 3);
  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="JWT Decoder" description="Paste a JWT to instantly decode the header, payload, and claims. Expiration dates are shown in human-readable format with an expired/valid indicator. Runs entirely in your browser." category="Developer Tools" categoryVariant="developer" />
        <JWTDecoder />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Understanding JWT Structure</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">A JWT has three parts separated by dots: <code className="rounded bg-zinc-100 px-1.5 text-sm">header.payload.signature</code>. The header and payload are Base64url-encoded JSON — they are readable by anyone with the token. Only the signature is opaque without the secret key.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">This means JWTs are <em>not</em> encrypted — they are only signed. Never put sensitive data (passwords, credit card numbers, SSNs) in a JWT payload. The signature proves the token hasn&apos;t been tampered with, but the data inside is readable.</p>
          <p className="text-zinc-600 leading-relaxed">Common debugging scenarios: checking if a token is expired (exp claim), seeing what scopes/roles are included, verifying the issuer (iss) and audience (aud), or inspecting custom claims your auth server added.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="JWT Decoder FAQs" /></div>
        {related.length > 0 && (<section className="mt-12"><h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2><div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div></section>)}
      </Container>
    </>
  );
}
