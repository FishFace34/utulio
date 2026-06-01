'use client';

import { useState, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import type { RateInputs } from '@/types';

const DEFAULT_INPUTS: RateInputs = {
  desiredAnnualIncome: 60000,
  workingDaysPerYear: 230,
  billableHoursPerDay: 6,
  monthlyExpenses: 500,
  taxRatePercent: 25,
  profitMarginPercent: 20,
  currency: 'USD',
};

interface RateCalculatorProps {
  defaults?: Partial<RateInputs>;
}

function calculateRates(inputs: RateInputs) {
  const annualExpenses = inputs.monthlyExpenses * 12;
  const totalAnnualNeed = inputs.desiredAnnualIncome + annualExpenses;
  const grossNeeded = totalAnnualNeed / (1 - inputs.taxRatePercent / 100);
  const targetRevenue = grossNeeded * (1 + inputs.profitMarginPercent / 100);
  const annualBillableHours = inputs.workingDaysPerYear * inputs.billableHoursPerDay;
  const hourlyRate = annualBillableHours > 0 ? targetRevenue / annualBillableHours : 0;
  const dailyRate = hourlyRate * inputs.billableHoursPerDay;
  const weeklyRate = dailyRate * 5;
  const monthlyRate = targetRevenue / 12;
  return { hourlyRate, dailyRate, weeklyRate, monthlyRate, annualRevenue: targetRevenue };
}

function NumericInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  helperText,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  helperText?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>
      <div className="flex">
        {prefix && (
          <span className="flex items-center rounded-l-lg border border-r-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`h-10 w-full border border-zinc-200 bg-white px-3 text-sm text-zinc-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-zinc-900 ${prefix ? 'rounded-r-lg' : 'rounded-l-lg'} ${suffix ? '' : 'rounded-r-lg'}`}
        />
        {suffix && (
          <span className="flex items-center rounded-r-lg border border-l-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
      {helperText && <p className="text-xs text-zinc-500">{helperText}</p>}
    </div>
  );
}

export default function RateCalculator({ defaults = {} }: RateCalculatorProps) {
  const [inputs, setInputs] = useState<RateInputs>({ ...DEFAULT_INPUTS, ...defaults });

  const update = useCallback(<K extends keyof RateInputs>(key: K, value: RateInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setInputs({ ...DEFAULT_INPUTS, ...defaults }), [defaults]);

  const results = calculateRates(inputs);
  const cur = inputs.currency;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900">Your Details</h2>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw size={14} strokeWidth={1.5} />
            Reset
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <NumericInput
            label="Desired Annual Income"
            value={inputs.desiredAnnualIncome}
            onChange={(v) => update('desiredAnnualIncome', v)}
            min={0}
            step={1000}
            prefix={cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '£'}
            helperText="Your take-home income goal"
          />
          <NumericInput
            label="Monthly Business Expenses"
            value={inputs.monthlyExpenses}
            onChange={(v) => update('monthlyExpenses', v)}
            min={0}
            step={100}
            prefix={cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '£'}
            helperText="Software, equipment, etc."
          />
          <NumericInput
            label="Working Days Per Year"
            value={inputs.workingDaysPerYear}
            onChange={(v) => update('workingDaysPerYear', Math.max(1, v))}
            min={1}
            max={365}
            helperText="Subtract vacation & holidays"
          />
          <NumericInput
            label="Billable Hours Per Day"
            value={inputs.billableHoursPerDay}
            onChange={(v) => update('billableHoursPerDay', Math.max(0.5, v))}
            min={0.5}
            max={24}
            step={0.5}
            helperText="Hours clients actually pay for"
          />
          <NumericInput
            label="Tax Rate"
            value={inputs.taxRatePercent}
            onChange={(v) => update('taxRatePercent', Math.min(99, Math.max(0, v)))}
            min={0}
            max={99}
            suffix="%"
            helperText="Estimated income tax rate"
          />
          <NumericInput
            label="Profit Margin"
            value={inputs.profitMarginPercent}
            onChange={(v) => update('profitMarginPercent', Math.max(0, v))}
            min={0}
            max={100}
            suffix="%"
            helperText="Business buffer & growth"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="currency" className="text-sm font-medium text-zinc-700">
            Currency
          </label>
          <select
            id="currency"
            value={inputs.currency}
            onChange={(e) => update('currency', e.target.value as RateInputs['currency'])}
            className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div aria-live="polite" aria-label="Calculated rates">
        <h2 className="mb-4 text-base font-semibold text-zinc-900">Your Rates</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {[
              { label: 'Hourly Rate', value: results.hourlyRate },
              { label: 'Daily Rate', value: results.dailyRate },
              { label: 'Weekly Rate', value: results.weeklyRate },
              { label: 'Monthly Rate', value: results.monthlyRate },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">{r.label}</span>
                <span className="text-xl font-bold text-zinc-900">
                  {formatCurrency(r.value, cur)}
                </span>
              </div>
            ))}
            <div className="mt-4 border-t border-zinc-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Target Annual Revenue</span>
                <span className="text-base font-semibold text-zinc-700">
                  {formatCurrency(results.annualRevenue, cur)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Formula</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            (Income + Expenses × 12) ÷ (1 − Tax%) × (1 + Margin%) ÷ (Days × Hours/Day)
          </p>
        </Card>
      </div>
    </div>
  );
}
