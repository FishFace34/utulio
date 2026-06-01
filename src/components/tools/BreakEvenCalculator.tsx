'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(10000);
  const [pricePerUnit, setPricePerUnit] = useState(50);
  const [variableCost, setVariableCost] = useState(20);
  const [targetUnits, setTargetUnits] = useState(0);
  const [currency, setCurrency] = useState<Currency>('USD');

  const results = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCost;
    const contributionMarginRatio = pricePerUnit > 0 ? (contributionMargin / pricePerUnit) * 100 : 0;
    const canBreakEven = contributionMargin > 0;
    const breakEvenUnitsExact = canBreakEven ? fixedCosts / contributionMargin : Infinity;
    const breakEvenUnits = Math.ceil(breakEvenUnitsExact);
    const breakEvenRevenue = breakEvenUnits * pricePerUnit;
    const profitAtTarget = targetUnits > 0
      ? targetUnits * contributionMargin - fixedCosts
      : null;
    return { contributionMargin, contributionMarginRatio, canBreakEven, breakEvenUnits, breakEvenRevenue, profitAtTarget };
  }, [fixedCosts, pricePerUnit, variableCost, targetUnits]);

  const fmt = (n: number) => formatCurrency(n, currency);

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Business Inputs</h2>
          <div className="space-y-4">
            {(
              [
                { label: 'Fixed Costs (per period)', value: fixedCosts, set: setFixedCosts, min: 0, step: 100 },
                { label: 'Price per Unit', value: pricePerUnit, set: setPricePerUnit, min: 0, step: 1 },
                { label: 'Variable Cost per Unit', value: variableCost, set: setVariableCost, min: 0, step: 1 },
              ] as const
            ).map(({ label, value, set, min, step }) => (
              <div key={label}>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
                <input
                  type="number"
                  min={min}
                  step={step}
                  value={value || ''}
                  onChange={(e) => (set as (v: number) => void)(parseNum(e.target.value))}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            ))}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="border-t border-zinc-100 pt-4">
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Profit at X Units (optional)
              </label>
              <input
                type="number"
                min={0}
                step={10}
                value={targetUnits || ''}
                onChange={(e) => setTargetUnits(parseNum(e.target.value))}
                placeholder="e.g. 500"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-3">
          {!results.canBreakEven ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              ⚠️ Your variable cost exceeds your selling price. You can never break even at these numbers.
            </div>
          ) : (
            <>
              <ResultStat
                label="Break-Even Units"
                value={results.breakEvenUnits.toLocaleString()}
                highlight
                sublabel={`${results.breakEvenUnits} units needed`}
              />
              <ResultStat label="Break-Even Revenue" value={fmt(results.breakEvenRevenue)} />
              <ResultStat label="Contribution Margin / Unit" value={fmt(results.contributionMargin)} />
              <ResultStat label="Contribution Margin Ratio" value={formatPercent(results.contributionMarginRatio)} />
              {results.profitAtTarget !== null && (
                <ResultStat
                  label={`Profit at ${targetUnits.toLocaleString()} units`}
                  value={fmt(results.profitAtTarget)}
                  sublabel={results.profitAtTarget >= 0 ? 'Profitable ✓' : 'Below break-even'}
                />
              )}
            </>
          )}
        </div>
      }
    />
  );
}
