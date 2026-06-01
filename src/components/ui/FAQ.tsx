import type { FAQItem } from '@/types';

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: FAQProps) {
  return (
    <section className="py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">{title}</h2>
      <div className="space-y-1">
        {items.map((item, index) => (
          <details
            key={index}
            className="group rounded-lg border border-zinc-200 bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50">
              {item.question}
              <svg
                className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed text-zinc-600">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
