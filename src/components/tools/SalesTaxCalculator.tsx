'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency } from '@/lib/utils';

type Mode = 'add' | 'remove';

export default function SalesTaxCalculator() {
  const [mode, setMode] = useState<Mode>('add');
  const [price, setPrice] = useState(100);
  const [taxRate, setTaxRate] = useState(8.25);

  const calc = useMemo(() => {
    if (mode === 'add') {
      const taxAmount = price * (taxRate / 100);
      return { net: price, tax: taxAmount, gross: price + taxAmount };
    } else {
      const net = price / (1 + taxRate / 100);
      const taxAmount = price - net;
      return { net, tax: taxAmount, gross: price };
    }
  }, [mode, price, taxRate]);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-zinc-200 p-1">
        {([['add', 'Add Tax'], ['remove', 'Remove Tax (Reverse)']] as [Mode, string][]).map(([m, label]) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {label}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          {mode === 'add' ? 'Price Before Tax' : 'Price Including Tax'}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={price} min={0} step={0.01} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-3 pl-7 pr-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Tax Rate (%)</label>
        <div className="relative">
          <input type="number" value={taxRate} min={0} max={30} step={0.05} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">%</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[5, 6, 7, 8, 8.25, 8.875, 9, 10].map((r) => (
            <button key={r} type="button" onClick={() => setTaxRate(r)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${taxRate === r ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}>
              {r}%
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3">
        <ResultStat label="Pre-Tax Price" value={formatCurrency(calc.net)} />
        <ResultStat label="Tax Amount" value={formatCurrency(calc.tax)} highlight />
        <ResultStat label="Total (with Tax)" value={formatCurrency(calc.gross)} />
      </div>
    </div>
  );
}
