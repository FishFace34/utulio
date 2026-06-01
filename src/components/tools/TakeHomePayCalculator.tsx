'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent } from '@/lib/utils';

type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';

const PERIODS: Record<PayFrequency, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };
const FREQ_LABELS: Record<PayFrequency, string> = { weekly: 'Weekly', biweekly: 'Bi-Weekly', semimonthly: 'Semi-Monthly', monthly: 'Monthly' };

export default function TakeHomePayCalculator() {
  const [gross, setGross] = useState(70000);
  const [freq, setFreq] = useState<PayFrequency>('biweekly');
  const [federalRate, setFederalRate] = useState(22);
  const [stateRate, setStateRate] = useState(5);
  const [pretaxDed, setPretaxDed] = useState(3000);
  const [postTaxDed, setPostTaxDed] = useState(0);

  const calc = useMemo(() => {
    const taxable = gross - pretaxDed;
    const federal = taxable * (federalRate / 100);
    const state = taxable * (stateRate / 100);
    const fica = gross * 0.0765;
    const netAnnual = gross - federal - state - fica - pretaxDed - postTaxDed;
    const periods = PERIODS[freq];
    const netPerPaycheck = netAnnual / periods;
    const effectiveRate = gross > 0 ? ((federal + state + fica) / gross) * 100 : 0;
    return { federal, state, fica, netAnnual, netPerPaycheck, effectiveRate };
  }, [gross, freq, federalRate, stateRate, pretaxDed, postTaxDed]);

  const inputPanel = (
    <div className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Gross Annual Salary</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={gross} min={0} step={1000} onChange={(e) => setGross(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Pay Frequency</label>
        <select value={freq} onChange={(e) => setFreq(e.target.value as PayFrequency)}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
          {(Object.keys(FREQ_LABELS) as PayFrequency[]).map((f) => (
            <option key={f} value={f}>{FREQ_LABELS[f]}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Federal Tax Rate (%)</label>
          <input type="number" value={federalRate} min={0} max={50} step={0.5} onChange={(e) => setFederalRate(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">State Tax Rate (%)</label>
          <input type="number" value={stateRate} min={0} max={20} step={0.5} onChange={(e) => setStateRate(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 space-y-3">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Deductions</p>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Pre-Tax Deductions (annual)</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
            <input type="number" value={pretaxDed} min={0} step={100} onChange={(e) => setPretaxDed(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
          <p className="mt-1 text-xs text-zinc-400">401(k), health insurance, FSA, etc.</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Post-Tax Deductions (annual)</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
            <input type="number" value={postTaxDed} min={0} step={100} onChange={(e) => setPostTaxDed(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
        <strong>Estimate only.</strong> This uses flat tax rates. Actual withholding depends on your W-4, filing status, and tax brackets. Consult a tax professional for exact figures.
      </div>
    </div>
  );

  const resultPanel = (
    <div className="space-y-3">
      <ResultStat label={`Net Pay Per ${FREQ_LABELS[freq]} Paycheck`} value={formatCurrency(calc.netPerPaycheck)} highlight />
      <ResultStat label="Annual Take-Home" value={formatCurrency(calc.netAnnual)} />
      <div className="border-t border-zinc-100 pt-3 space-y-3">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Tax Breakdown (annual)</p>
        <ResultStat label="Federal Tax" value={formatCurrency(calc.federal)} />
        <ResultStat label="State Tax" value={formatCurrency(calc.state)} />
        <ResultStat label="FICA (SS + Medicare)" value={formatCurrency(calc.fica)} />
        <ResultStat label="Effective Tax Rate" value={formatPercent(calc.effectiveRate)} />
      </div>
    </div>
  );

  return <CalculatorShell inputs={inputPanel} results={resultPanel} />;
}
