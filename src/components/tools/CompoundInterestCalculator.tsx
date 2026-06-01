'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import Button from '@/components/ui/Button';
import { formatCurrency, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

interface CompoundInputs {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  currency: Currency;
}

const DEFAULTS: CompoundInputs = {
  principal: 10000,
  monthlyContribution: 200,
  annualRate: 7,
  years: 20,
  currency: 'USD',
};

function calcCompound(inputs: CompoundInputs) {
  const { principal, monthlyContribution, annualRate, years } = inputs;
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;
  let balance = principal;
  let totalContributed = principal;
  const yearlyData: { year: number; balance: number; contributions: number }[] = [];

  for (let m = 1; m <= totalMonths; m++) {
    balance += balance * monthlyRate + monthlyContribution;
    totalContributed += monthlyContribution;
    if (m % 12 === 0) {
      yearlyData.push({ year: m / 12, balance, contributions: totalContributed });
    }
  }

  return {
    futureValue: balance,
    totalContributed,
    totalInterest: balance - totalContributed,
    yearlyData,
  };
}

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

export default function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState<CompoundInputs>(DEFAULTS);

  function set(field: keyof CompoundInputs, raw: string) {
    setInputs((prev) => ({
      ...prev,
      [field]: field === 'currency' ? raw : parseNum(raw),
    }));
  }

  const results = useMemo(() => calcCompound(inputs), [inputs]);
  const fmt = (n: number) => formatCurrency(n, inputs.currency);

  // SVG chart
  const maxBalance = Math.max(...results.yearlyData.map((d) => d.balance), 1);
  const chartW = 500;
  const chartH = 160;
  const pad = { t: 10, r: 20, b: 30, l: 60 };
  const innerW = chartW - pad.l - pad.r;
  const innerH = chartH - pad.t - pad.b;

  const points = results.yearlyData.map((d, i) => ({
    x: pad.l + (i / (results.yearlyData.length - 1 || 1)) * innerW,
    yBalance: pad.t + innerH - (d.balance / maxBalance) * innerH,
    yContrib: pad.t + innerH - (d.contributions / maxBalance) * innerH,
  }));

  const balancePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.yBalance}`).join(' ');
  const contribPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.yContrib}`).join(' ');

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Investment Details</h2>
          <div className="space-y-4">
            {(
              [
                { key: 'principal' as const, label: 'Starting Amount', min: 0, max: undefined as number | undefined, step: 1000 },
                { key: 'monthlyContribution' as const, label: 'Monthly Contribution', min: 0, max: undefined as number | undefined, step: 50 },
                { key: 'annualRate' as const, label: 'Annual Return Rate (%)', min: 0, max: 100 as number | undefined, step: 0.1 },
                { key: 'years' as const, label: 'Time Period (Years)', min: 1, max: 50 as number | undefined, step: 1 },
              ]
            ).map(({ key, label, min, max, step }) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={inputs[key] || ''}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            ))}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Currency</label>
              <select
                value={inputs.currency}
                onChange={(e) => set('currency', e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Button variant="secondary" size="sm" type="button" onClick={() => setInputs(DEFAULTS)}>
            Reset
          </Button>
        </div>
      }
      results={
        <div className="space-y-3">
          <ResultStat label="Future Value" value={fmt(results.futureValue)} highlight />
          <ResultStat label="Total Contributions" value={fmt(results.totalContributed)} />
          <ResultStat label="Interest Earned" value={fmt(results.totalInterest)} />

          {/* SVG Growth Chart */}
          {results.yearlyData.length > 1 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="mb-3 text-xs font-medium text-zinc-500">Growth Over Time</p>
              <svg
                viewBox={`0 0 ${chartW} ${chartH}`}
                className="w-full"
                aria-label="Investment growth chart"
              >
                {/* Y-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                  const y = pad.t + innerH - t * innerH;
                  return (
                    <g key={t}>
                      <line x1={pad.l - 4} y1={y} x2={chartW - pad.r} y2={y} stroke="#f4f4f5" strokeWidth={1} />
                      <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize={9} fill="#a1a1aa">
                        {fmt(maxBalance * t).replace(/\.00$/, '')}
                      </text>
                    </g>
                  );
                })}
                {/* Contributions area */}
                <path d={contribPath} fill="none" stroke="#d4d4d8" strokeWidth={1.5} strokeDasharray="4,2" />
                {/* Balance line */}
                <path d={balancePath} fill="none" stroke="#18181b" strokeWidth={2} />
                {/* X-axis labels */}
                {results.yearlyData
                  .filter((_, i) => i % Math.ceil(results.yearlyData.length / 5) === 0)
                  .map((d, i) => {
                    const x = pad.l + (results.yearlyData.indexOf(d) / (results.yearlyData.length - 1)) * innerW;
                    return (
                      <text key={i} x={x} y={chartH - 6} textAnchor="middle" fontSize={9} fill="#a1a1aa">
                        Yr {d.year}
                      </text>
                    );
                  })}
              </svg>
              <div className="mt-2 flex gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><span className="h-0.5 w-4 bg-zinc-900 inline-block" /> Balance</span>
                <span className="flex items-center gap-1"><span className="h-0.5 w-4 border-t-2 border-dashed border-zinc-400 inline-block" /> Contributions</span>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
