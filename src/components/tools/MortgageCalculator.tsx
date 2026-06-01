'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency } from '@/lib/utils';

interface Inputs {
  homePrice: number;
  downPayment: number;
  downIsPercent: boolean;
  interestRate: number;
  loanTermYears: number;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  pmiRate: number;
  hoaMonthly: number;
}

const DEFAULT: Inputs = {
  homePrice: 400000,
  downPayment: 80000,
  downIsPercent: false,
  interestRate: 6.5,
  loanTermYears: 30,
  propertyTaxAnnual: 4800,
  homeInsuranceAnnual: 1500,
  pmiRate: 0.5,
  hoaMonthly: 0,
};

function NumberInput({ label, value, onChange, prefix, step = 1, min = 0 }: {
  label: string; value: number; onChange: (v: number) => void;
  prefix?: string; step?: number; min?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full rounded-xl border border-zinc-200 py-2.5 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 ${prefix ? 'pl-7' : 'pl-3'}`}
        />
      </div>
    </div>
  );
}

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULT);
  const [showSchedule, setShowSchedule] = useState(false);

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const calc = useMemo(() => {
    const dp = inputs.downIsPercent
      ? inputs.homePrice * (inputs.downPayment / 100)
      : inputs.downPayment;
    const loanAmount = Math.max(0, inputs.homePrice - dp);
    const r = inputs.interestRate / 100 / 12;
    const n = inputs.loanTermYears * 12;
    const pi = r === 0
      ? loanAmount / n
      : loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const monthlyTax = inputs.propertyTaxAnnual / 12;
    const monthlyIns = inputs.homeInsuranceAnnual / 12;
    const downPercent = inputs.homePrice > 0 ? (dp / inputs.homePrice) * 100 : 0;
    const monthlyPMI = downPercent < 20 ? (loanAmount * inputs.pmiRate / 100) / 12 : 0;
    const total = pi + monthlyTax + monthlyIns + monthlyPMI + inputs.hoaMonthly;
    const totalPaid = pi * n;
    const totalInterest = totalPaid - loanAmount;

    // amortization
    const schedule: { month: number; principal: number; interest: number; balance: number }[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= n && balance > 0; m++) {
      const intPmt = balance * r;
      const prinPmt = Math.min(pi - intPmt, balance);
      balance -= prinPmt;
      if (m <= 12 || m % 12 === 0) {
        schedule.push({ month: m, principal: prinPmt, interest: intPmt, balance: Math.max(0, balance) });
      }
    }

    return { pi, total, totalInterest, loanAmount, dp, downPercent, monthlyPMI, monthlyTax, monthlyIns, schedule };
  }, [inputs]);

  const inputPanel = (
    <div className="space-y-4">
      <NumberInput label="Home Price" value={inputs.homePrice} onChange={(v) => set('homePrice', v)} prefix="$" />

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-700">Down Payment</label>
          <button
            type="button"
            onClick={() => set('downIsPercent', !inputs.downIsPercent)}
            className="text-xs text-zinc-500 underline underline-offset-2"
          >
            Switch to {inputs.downIsPercent ? '$' : '%'}
          </button>
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
            {inputs.downIsPercent ? '%' : '$'}
          </span>
          <input
            type="number"
            value={inputs.downPayment}
            min={0}
            step={inputs.downIsPercent ? 1 : 1000}
            onChange={(e) => set('downPayment', parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
        <p className="mt-1 text-xs text-zinc-400">
          {inputs.downIsPercent
            ? `= ${formatCurrency(inputs.homePrice * inputs.downPayment / 100)} down`
            : `= ${calc.downPercent.toFixed(1)}% of home price`}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <NumberInput label="Interest Rate (%)" value={inputs.interestRate} onChange={(v) => set('interestRate', v)} step={0.1} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Loan Term</label>
          <select
            value={inputs.loanTermYears}
            onChange={(e) => set('loanTermYears', parseInt(e.target.value))}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 space-y-3">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Optional (PITI)</p>
        <NumberInput label="Annual Property Tax" value={inputs.propertyTaxAnnual} onChange={(v) => set('propertyTaxAnnual', v)} prefix="$" />
        <NumberInput label="Annual Home Insurance" value={inputs.homeInsuranceAnnual} onChange={(v) => set('homeInsuranceAnnual', v)} prefix="$" />
        {calc.downPercent < 20 && (
          <NumberInput label="PMI Rate (% of loan/yr)" value={inputs.pmiRate} onChange={(v) => set('pmiRate', v)} step={0.05} />
        )}
        <NumberInput label="HOA (monthly)" value={inputs.hoaMonthly} onChange={(v) => set('hoaMonthly', v)} prefix="$" />
      </div>
    </div>
  );

  const resultPanel = (
    <div className="space-y-3">
      <ResultStat label="Total Monthly Payment" value={formatCurrency(calc.total)} highlight />
      <ResultStat label="Principal & Interest" value={formatCurrency(calc.pi)} />
      <ResultStat label="Property Tax" value={formatCurrency(calc.monthlyTax)} />
      <ResultStat label="Home Insurance" value={formatCurrency(calc.monthlyIns)} />
      {calc.monthlyPMI > 0 && (
        <ResultStat label="PMI" value={formatCurrency(calc.monthlyPMI)} />
      )}
      {inputs.hoaMonthly > 0 && (
        <ResultStat label="HOA" value={formatCurrency(inputs.hoaMonthly)} />
      )}
      <div className="border-t border-zinc-100 pt-3 space-y-3">
        <ResultStat label="Loan Amount" value={formatCurrency(calc.loanAmount)} />
        <ResultStat label="Total Interest Paid" value={formatCurrency(calc.totalInterest)} />
        <ResultStat label="Total Cost of Loan" value={formatCurrency(calc.loanAmount + calc.totalInterest)} />
      </div>

      {calc.downPercent < 20 && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
          PMI applies because your down payment is less than 20%. PMI typically drops off once you reach 20% equity.
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowSchedule((s) => !s)}
        className="mt-2 w-full rounded-xl border border-zinc-200 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
      >
        {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
      </button>

      {showSchedule && (
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-xs">
            <thead className="bg-zinc-50">
              <tr>
                {['Month', 'Principal', 'Interest', 'Balance'].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-medium text-zinc-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calc.schedule.map((row) => (
                <tr key={row.month} className="border-t border-zinc-100">
                  <td className="px-3 py-2 text-zinc-500">{row.month}</td>
                  <td className="px-3 py-2">{formatCurrency(row.principal)}</td>
                  <td className="px-3 py-2 text-red-600">{formatCurrency(row.interest)}</td>
                  <td className="px-3 py-2 text-zinc-600">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return <CalculatorShell inputs={inputPanel} results={resultPanel} />;
}
