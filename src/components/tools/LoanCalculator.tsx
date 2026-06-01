'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import Button from '@/components/ui/Button';
import { formatCurrency, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

interface LoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  currency: Currency;
}

function calcLoan(inputs: LoanInputs) {
  const { loanAmount: P, interestRate, loanTermYears } = inputs;
  const r = interestRate / 100 / 12;
  const n = loanTermYears * 12;
  const M = r === 0 ? P / n : (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  const totalPaid = M * n;
  const totalInterest = totalPaid - P;
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + n);
  return { M, totalPaid, totalInterest, payoffDate, n };
}

function buildAmortization(inputs: LoanInputs) {
  const { loanAmount, interestRate, loanTermYears } = inputs;
  const r = interestRate / 100 / 12;
  const n = loanTermYears * 12;
  const M = r === 0 ? loanAmount / n : (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  const rows: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
  let balance = loanAmount;
  for (let i = 1; i <= n; i++) {
    const interestPortion = balance * r;
    const principalPortion = M - interestPortion;
    balance = Math.max(0, balance - principalPortion);
    rows.push({ month: i, payment: M, principal: principalPortion, interest: interestPortion, balance });
  }
  return rows;
}

const DEFAULTS: LoanInputs = {
  loanAmount: 25000,
  interestRate: 7.5,
  loanTermYears: 5,
  currency: 'USD',
};

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

export default function LoanCalculator() {
  const [inputs, setInputs] = useState<LoanInputs>(DEFAULTS);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  function set(field: keyof LoanInputs, raw: string) {
    setInputs((prev) => ({
      ...prev,
      [field]: field === 'currency' ? raw : parseNum(raw),
    }));
  }

  const results = useMemo(() => calcLoan(inputs), [inputs]);
  const schedule = useMemo(() => buildAmortization(inputs), [inputs]);
  const displayRows = showFullSchedule ? schedule : schedule.slice(0, 12);

  const fmt = (n: number) => formatCurrency(n, inputs.currency);

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Loan Details</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Loan Amount
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                value={inputs.loanAmount || ''}
                onChange={(e) => set('loanAmount', e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={inputs.interestRate || ''}
                onChange={(e) => set('interestRate', e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Loan Term (Years)
              </label>
              <input
                type="number"
                min={1}
                max={50}
                step={1}
                value={inputs.loanTermYears || ''}
                onChange={(e) => set('loanTermYears', e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Currency</label>
              <select
                value={inputs.currency}
                onChange={(e) => set('currency', e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setInputs(DEFAULTS)}
          >
            Reset
          </Button>
        </div>
      }
      results={
        <div className="space-y-3">
          <ResultStat label="Monthly Payment" value={fmt(results.M)} highlight />
          <ResultStat label="Total Interest Paid" value={fmt(results.totalInterest)} />
          <ResultStat label="Total Amount Paid" value={fmt(results.totalPaid)} />
          <ResultStat
            label="Payoff Date"
            value={results.payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          />

          {/* Amortization Schedule */}
          <div className="mt-6 rounded-xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-zinc-900">Amortization Schedule</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50 text-left text-zinc-500">
                    <th className="px-3 py-2">#</th>
                    <th className="px-3 py-2">Payment</th>
                    <th className="px-3 py-2">Principal</th>
                    <th className="px-3 py-2">Interest</th>
                    <th className="px-3 py-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row) => (
                    <tr key={row.month} className="border-b border-zinc-50 hover:bg-zinc-50">
                      <td className="px-3 py-2 text-zinc-500">{row.month}</td>
                      <td className="px-3 py-2">{fmt(row.payment)}</td>
                      <td className="px-3 py-2 text-green-700">{fmt(row.principal)}</td>
                      <td className="px-3 py-2 text-red-600">{fmt(row.interest)}</td>
                      <td className="px-3 py-2">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {schedule.length > 12 && (
              <div className="px-4 py-3">
                <button
                  type="button"
                  onClick={() => setShowFullSchedule((v) => !v)}
                  className="text-sm font-medium text-zinc-600 underline underline-offset-2 hover:text-zinc-900"
                >
                  {showFullSchedule ? 'Hide full schedule' : `Show full schedule (${schedule.length} months)`}
                </button>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
