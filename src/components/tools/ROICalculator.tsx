'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

export default function ROICalculator() {
  const [initial, setInitial] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [years, setYears] = useState(3);
  const [currency, setCurrency] = useState<Currency>('USD');

  const results = useMemo(() => {
    const netProfit = finalValue - initial;
    const roi = initial > 0 ? (netProfit / initial) * 100 : 0;
    const annualizedROI = years > 0 && initial > 0 && finalValue > 0
      ? (Math.pow(finalValue / initial, 1 / years) - 1) * 100
      : roi;
    const multiple = initial > 0 ? finalValue / initial : 0;
    return { netProfit, roi, annualizedROI, multiple };
  }, [initial, finalValue, years]);

  const fmt = (n: number) => formatCurrency(n, currency);

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Investment Details</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Initial Investment</label>
              <input
                type="number"
                min={0}
                step={100}
                value={initial || ''}
                onChange={(e) => setInitial(parseNum(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Final Value</label>
              <input
                type="number"
                min={0}
                step={100}
                value={finalValue || ''}
                onChange={(e) => setFinalValue(parseNum(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Time Period (Years)</label>
              <input
                type="number"
                min={1}
                max={50}
                step={1}
                value={years || ''}
                onChange={(e) => setYears(parseNum(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
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
          <ResultStat label="ROI" value={formatPercent(results.roi)} highlight />
          <ResultStat label="Net Profit" value={fmt(results.netProfit)} />
          <ResultStat
            label="Annualized ROI (CAGR)"
            value={formatPercent(results.annualizedROI)}
            sublabel={`over ${years} year${years !== 1 ? 's' : ''}`}
          />
          <ResultStat
            label="Total Return (Multiple)"
            value={`${results.multiple.toFixed(2)}x`}
          />
        </div>
      }
    />
  );
}
