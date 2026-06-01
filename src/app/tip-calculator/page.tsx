import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import ToolHero from '@/components/ui/ToolHero';
import FAQ from '@/components/ui/FAQ';
import AdSlot from '@/components/ui/AdSlot';
import TipCalculator from '@/components/tools/TipCalculator';
import ToolCard from '@/components/ui/ToolCard';
import { toolMetadata } from '@/lib/seo';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { getRelatedTools } from '@/lib/tools';

export const metadata: Metadata = toolMetadata({
  title: 'Tip Calculator — Split the Bill & Calculate Tips',
  description: 'Calculate tips and split the bill between any number of people. Free, fast tip calculator.',
  path: '/tip-calculator',
  keywords: ['tip calculator', 'bill split calculator', 'gratuity calculator'],
});

const FAQS = [
  { question: 'How much should I tip at a restaurant?', answer: 'In the United States, the standard tip at a sit-down restaurant is 18–20% for good service. Many people tip 15% for adequate service, 20% for good service, and 25% or more for exceptional service. For counter service or takeout, 10–15% is common but not always expected.' },
  { question: 'How do I split a bill evenly?', answer: 'Enter your total bill amount and set the number of people to split among. This calculator divides the total (including tip) equally. If you want to round up so each person pays a whole dollar amount, enable the "Round up per person" option.' },
  { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'This is a matter of personal preference. Most people tip on the pre-tax amount, which is the price of the food and drinks. Tipping on the post-tax total is slightly more generous. The difference is usually small — on a $50 bill with 8% tax, the difference between tipping on $50 vs. $54 at 20% is just $0.80.' },
  { question: 'Do I tip at fast food or counter service?', answer: 'Tipping at counter service is optional. If you received friendly service or a complex order was handled well, tipping 10–15% is appreciated. Many digital payment terminals now prompt for tips at counter service — you are never obligated to tip, but it is always appreciated by the workers.' },
  { question: 'How do I calculate a tip without a calculator?', answer: 'For a quick 20% tip: move the decimal point one place to the left (10% of the bill), then double it. For a $45 bill: 10% = $4.50, doubled = $9.00 tip. For 15%: calculate 10% and add half of that. For $45: $4.50 + $2.25 = $6.75 tip.' },
  { question: 'What is the difference between tip and gratuity?', answer: 'A tip is a voluntary payment to show appreciation for service. A gratuity is the same thing, but the term "automatic gratuity" or "mandatory gratuity" is sometimes used for large parties (usually 6+ people), where restaurants add a fixed service charge (typically 18–20%) directly to the bill. Always check your receipt for automatic gratuities before adding an additional tip.' },
];

export default function TipCalculatorPage() {
  const schemas = [
    softwareApplicationSchema({ name: 'Tip Calculator', description: 'Calculate tips and split the bill between any number of people.', url: '/tip-calculator', category: 'FinanceApplication' }),
    faqPageSchema(FAQS),
    breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Tip Calculator', url: '/tip-calculator' }]),
  ];
  const related = getRelatedTools('tip-calculator', 3);

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(s) }} />)}
      <Container className="py-4 md:py-8">
        <ToolHero title="Tip Calculator" description="Calculate your tip and split the bill between any number of people. Quick-select 15%, 18%, 20%, or 25%, or enter a custom percentage. Includes a round-up option for easy payment." category="Finance Tools" categoryVariant="finance" />
        <TipCalculator />
        <div className="mt-8"><AdSlot slot="in-content" /></div>
        <section className="mt-12 max-w-2xl">
          <h2 className="mb-4 text-xl font-bold text-zinc-900">Tipping Etiquette Guide</h2>
          <p className="mb-4 text-zinc-600 leading-relaxed">Tipping customs vary by country, service type, and even region within the United States. In the U.S., tipping is deeply embedded in the service economy — many workers in restaurants, bars, and salons earn below minimum wage and rely on tips to make a living wage.</p>
          <p className="mb-4 text-zinc-600 leading-relaxed">Standard U.S. tip amounts by service: <strong className="text-zinc-800">Restaurant (sit-down): 18–20%</strong> · <strong className="text-zinc-800">Bar: $1–2 per drink or 15–20%</strong> · <strong className="text-zinc-800">Coffee shop: 10–15%</strong> · <strong className="text-zinc-800">Food delivery: 15–20%</strong> · <strong className="text-zinc-800">Taxi/rideshare: 15–20%</strong> · <strong className="text-zinc-800">Hair salon: 15–20%</strong> · <strong className="text-zinc-800">Hotel housekeeping: $2–5/night</strong></p>
          <p className="text-zinc-600 leading-relaxed">When splitting a bill, it&apos;s usually simplest to divide the total (including tip) equally. If some people ordered more than others, consider itemizing — though this can slow down the process. The round-up option in this calculator makes it easy to avoid dealing with coins.</p>
        </section>
        <div className="mt-10"><FAQ items={FAQS} title="Tip Calculator FAQs" /></div>
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-lg font-bold text-zinc-900">Related Tools</h2>
            <div className="grid gap-4 sm:grid-cols-3">{related.map((t) => <ToolCard key={t.id} tool={t} />)}</div>
          </section>
        )}
      </Container>
    </>
  );
}
