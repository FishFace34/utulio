'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import Button from '@/components/ui/Button';
import { formatCurrency, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

interface CarLoanInputs {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  salesTaxRate: number;
  interestRate: number;
  loanTermMonths: number;
  currency: Currency;
}

const DEFAULTS: CarLoanInputs = {
  vehiclePrice: 35000,
  downPayment: 5000,
  tradeInValue: 0,
  salesTaxRate: 6,
  interestRate: 6.5,
  loanTermMonths: 60,
  currency: 'USD',
};

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];
const TERMS = [24, 36, 48, 60, 72, 84];

export default function CarLoanCalculator() {
  const [inputs, setInputs] = useState<CarLoanInputs>(DEFAULTS);

  function set(field: keyof CarLoanInputs, raw: string) {
    setInputs((prev) => ({
      ...prev,
      [field]: field === 'currency' ? raw : parseNum(raw),
    }));
  }

  const results = useMemo(() => {
    const { vehiclePrice, downPayment, tradeInValue, salesTaxRate, interestRate, loanTermMonths } = inputs;
    const taxableAmount = vehiclePrice - tradeInValue;
    const salesTax = taxableAmount * (salesTaxRate / 100);
    const loanAmount = vehiclePrice + salesTax - downPayment - tradeInValue;
    const r = interestRate / 100 / 12;
    const n = loanTermMonths;
    const monthlyPayment = r === 0
      ? loanAmount / n
      : loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - loanAmount;
    const totalCost = totalPaid + downPayment + tradeInValue;
    return { loanAmount, salesTax, monthlyPayment, totalInterest, totalCost };
  }, [inputs]);

  const fmt = (n: number) => formatCurrency(n, inputs.currency);

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Vehicle &amp; Loan Details</h2>
          <div className="space-y-4">
            {(
              [
                { key: 'vehiclePrice' as const, label: 'Vehicle Price', min: 0, max: undefined as number | undefined, step: 500 },
                { key: 'downPayment' as const, label: 'Down Payment', min: 0, max: undefined as number | undefined, step: 500 },
                { key: 'tradeInValue' as const, label: 'Trade-In Value', min: 0, max: undefined as number | undefined, step: 500 },
                { key: 'salesTaxRate' as const, label: 'Sales Tax Rate (%)', min: 0, max: 30 as number | undefined, step: 0.1 },
                { key: 'interestRate' as const, label: 'Annual Interest Rate (APR %)', min: 0, max: 50 as number | undefined, step: 0.1 },
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
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Loan Term</label>
              <select
                value={inputs.loanTermMonths}
                onChange={(e) => set('loanTermMonths', e.target.value)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {TERMS.map((t) => (
                  <option key={t} value={t}>{t} months ({Math.round(t / 12 * 10) / 10} yr)</option>
                ))}
              </select>
            </div>

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
          <ResultStat label="Monthly Payment" value={fmt(results.monthlyPayment)} highlight />
          <ResultStat label="Loan Amount" value={fmt(results.loanAmount)} />
          <ResultStat label="Sales Tax" value={fmt(results.salesTax)} />
          <ResultStat label="Total Interest" value={fmt(results.totalInterest)} />
          <ResultStat label="Total Cost of Vehicle" value={fmt(results.totalCost)} />
        </div>
      }
    />
  );
}
