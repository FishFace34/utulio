'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency } from '@/lib/utils';

const QUICK_TIPS = [15, 18, 20, 25];

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(1);
  const [roundUp, setRoundUp] = useState(false);

  const calc = useMemo(() => {
    const tipAmount = bill * (tipPct / 100);
    const total = bill + tipAmount;
    let perPerson = total / Math.max(1, people);
    if (roundUp) perPerson = Math.ceil(perPerson);
    const tipPerPerson = tipAmount / Math.max(1, people);
    return { tipAmount, total, perPerson, tipPerPerson };
  }, [bill, tipPct, people, roundUp]);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      {/* Bill */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Bill Amount</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={bill} min={0} step={0.01} onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-3 pl-7 pr-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      {/* Tip percent */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700">Tip Percentage</label>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {QUICK_TIPS.map((p) => (
            <button key={p} type="button" onClick={() => setTipPct(p)}
              className={`rounded-xl py-2 text-sm font-semibold transition-colors ${tipPct === p ? 'bg-zinc-900 text-white' : 'border border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}>
              {p}%
            </button>
          ))}
        </div>
        <div className="relative">
          <input type="number" value={tipPct} min={0} max={100} step={1} onChange={(e) => setTipPct(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">%</span>
        </div>
      </div>

      {/* People */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Number of People</label>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setPeople((p) => Math.max(1, p - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-xl font-medium text-zinc-700 hover:bg-zinc-100 transition-colors">−</button>
          <span className="min-w-[3rem] text-center text-2xl font-bold text-zinc-900">{people}</span>
          <button type="button" onClick={() => setPeople((p) => p + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-xl font-medium text-zinc-700 hover:bg-zinc-100 transition-colors">+</button>
        </div>
      </div>

      {/* Round up */}
      <label className="flex cursor-pointer items-center gap-3">
        <div className="relative">
          <input type="checkbox" checked={roundUp} onChange={(e) => setRoundUp(e.target.checked)} className="sr-only" />
          <div className={`h-5 w-9 rounded-full transition-colors ${roundUp ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
          <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${roundUp ? 'translate-x-4' : 'translate-x-0.5'}`} />
        </div>
        <span className="text-sm font-medium text-zinc-700">Round up per person</span>
      </label>

      {/* Results */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 space-y-3">
        <ResultStat label={people > 1 ? 'Per Person' : 'Total Per Person'} value={formatCurrency(calc.perPerson)} highlight />
        <ResultStat label="Tip Amount" value={formatCurrency(calc.tipAmount)} />
        {people > 1 && <ResultStat label="Tip Per Person" value={formatCurrency(calc.tipPerPerson)} />}
        <ResultStat label="Total Bill" value={formatCurrency(calc.total)} />
      </div>
    </div>
  );
}
