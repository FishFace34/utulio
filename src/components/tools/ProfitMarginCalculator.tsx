'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

type Mode = 'cost-price' | 'cost-margin';
const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

export default function ProfitMarginCalculator() {
  const [mode, setMode] = useState<Mode>('cost-price');
  const [cost, setCost] = useState(50);
  const [revenue, setRevenue] = useState(80);
  const [targetMargin, setTargetMargin] = useState(40);
  const [currency, setCurrency] = useState<Currency>('USD');

  const results = useMemo(() => {
    const fmt = (n: number) => formatCurrency(n, currency);
    if (mode === 'cost-price') {
      const grossProfit = revenue - cost;
      const profitMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
      const markup = cost > 0 ? (grossProfit / cost) * 100 : 0;
      return { grossProfit, profitMargin, markup, requiredPrice: null, fmt };
    } else {
      const requiredPrice = targetMargin < 100 ? cost / (1 - targetMargin / 100) : Infinity;
      const grossProfit = isFinite(requiredPrice) ? requiredPrice - cost : 0;
      return { grossProfit, profitMargin: targetMargin, markup: cost > 0 ? (grossProfit / cost) * 100 : 0, requiredPrice, fmt };
    }
  }, [mode, cost, revenue, targetMargin, currency]);

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Profit Margin Calculator</h2>

          {/* Mode toggle */}
          <div className="flex rounded-lg border border-zinc-200 p-1">
            {(['cost-price', 'cost-margin'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {m === 'cost-price' ? 'Cost & Price' : 'Cost & Target Margin'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Cost</label>
              <input
                type="number"
                min={0}
                step={1}
                value={cost || ''}
                onChange={(e) => setCost(parseNum(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            {mode === 'cost-price' ? (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Selling Price
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={revenue || ''}
                  onChange={(e) => setRevenue(parseNum(e.target.value))}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            ) : (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Target Profit Margin (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={99.9}
                  step={0.1}
                  value={targetMargin || ''}
                  onChange={(e) => setTargetMargin(parseNum(e.target.value))}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            )}

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
          </div>
        </div>
      }
      results={
        <div className="space-y-3">
          <ResultStat
            label="Gross Profit"
            value={results.fmt(results.grossProfit)}
            highlight
          />
          <ResultStat label="Profit Margin" value={formatPercent(results.profitMargin)} />
          <ResultStat label="Markup" value={formatPercent(results.markup)} />
          {results.requiredPrice !== null && isFinite(results.requiredPrice) && (
            <ResultStat label="Required Selling Price" value={results.fmt(results.requiredPrice)} />
          )}
          <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-xs text-zinc-500 space-y-1">
            <p><strong className="text-zinc-700">Margin</strong> = profit ÷ selling price × 100</p>
            <p><strong className="text-zinc-700">Markup</strong> = profit ÷ cost × 100</p>
          </div>
        </div>
      }
    />
  );
}
