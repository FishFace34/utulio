'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent } from '@/lib/utils';

type Mode = 'cost-markup' | 'cost-price';

export default function MarkupCalculator() {
  const [mode, setMode] = useState<Mode>('cost-markup');
  const [cost, setCost] = useState(40);
  const [markup, setMarkup] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(60);

  const calc = useMemo(() => {
    if (mode === 'cost-markup') {
      const profit = cost * (markup / 100);
      const price = cost + profit;
      const margin = price > 0 ? (profit / price) * 100 : 0;
      return { cost, profit, price, markup, margin };
    } else {
      const profit = sellingPrice - cost;
      const markupPct = cost > 0 ? (profit / cost) * 100 : 0;
      const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
      return { cost, profit, price: sellingPrice, markup: markupPct, margin };
    }
  }, [mode, cost, markup, sellingPrice]);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-zinc-200 p-1">
        {([['cost-markup', 'Cost + Markup %'], ['cost-price', 'Cost + Selling Price']] as [Mode, string][]).map(([m, label]) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {label}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Cost Price</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={cost} min={0} step={0.01} onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      {mode === 'cost-markup' ? (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Markup Percentage</label>
          <div className="relative">
            <input type="number" value={markup} min={0} step={0.5} onChange={(e) => setMarkup(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">%</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[10, 20, 30, 50, 100, 200].map((p) => (
              <button key={p} type="button" onClick={() => setMarkup(p)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${markup === p ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}>
                {p}%
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Selling Price</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
            <input type="number" value={sellingPrice} min={0} step={0.01} onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3">
        <ResultStat label="Selling Price" value={formatCurrency(calc.price)} highlight />
        <ResultStat label="Profit" value={formatCurrency(calc.profit)} />
        <ResultStat label="Markup" value={formatPercent(calc.markup)} />
        <ResultStat label="Profit Margin" value={formatPercent(calc.margin)} />
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        <strong className="text-zinc-700">Markup vs. Margin:</strong> Markup is profit as a % of <em>cost</em>. Margin is profit as a % of <em>selling price</em>. A 50% markup gives a 33.3% margin — they are never equal (except at 0%).
      </div>
    </div>
  );
}
