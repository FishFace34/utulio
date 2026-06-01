'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency, parseNum } from '@/lib/utils';
import type { Currency } from '@/types';

type InputType = 'annual' | 'monthly' | 'weekly' | 'daily' | 'hourly';
const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR'];

const INPUT_LABELS: Record<InputType, string> = {
  annual: 'Annual Salary',
  monthly: 'Monthly Salary',
  weekly: 'Weekly Pay',
  daily: 'Daily Pay',
  hourly: 'Hourly Rate',
};

export default function SalaryCalculator() {
  const [amount, setAmount] = useState(60000);
  const [inputType, setInputType] = useState<InputType>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [currency, setCurrency] = useState<Currency>('USD');

  const results = useMemo(() => {
    const totalHoursPerYear = hoursPerWeek * weeksPerYear;
    const daysPerYear = weeksPerYear * 5;
    let annual = 0;
    switch (inputType) {
      case 'annual': annual = amount; break;
      case 'monthly': annual = amount * 12; break;
      case 'weekly': annual = amount * weeksPerYear; break;
      case 'daily': annual = amount * daysPerYear; break;
      case 'hourly': annual = amount * totalHoursPerYear; break;
    }
    const hourly = totalHoursPerYear > 0 ? annual / totalHoursPerYear : 0;
    const daily = hoursPerWeek > 0 ? hourly * (hoursPerWeek / 5) : 0;
    const weekly = weeksPerYear > 0 ? annual / weeksPerYear : 0;
    const monthly = annual / 12;
    return { annual, monthly, weekly, daily, hourly };
  }, [amount, inputType, hoursPerWeek, weeksPerYear]);

  const fmt = (n: number) => formatCurrency(n, currency);

  const stats: { label: string; value: string; key: InputType }[] = [
    { label: 'Hourly', value: fmt(results.hourly), key: 'hourly' },
    { label: 'Daily', value: fmt(results.daily), key: 'daily' },
    { label: 'Weekly', value: fmt(results.weekly), key: 'weekly' },
    { label: 'Monthly', value: fmt(results.monthly), key: 'monthly' },
    { label: 'Annual', value: fmt(results.annual), key: 'annual' },
  ];

  return (
    <CalculatorShell
      inputs={
        <div className="space-y-5 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-base font-semibold text-zinc-900">Salary Details</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Pay Type</label>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value as InputType)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              >
                {(Object.keys(INPUT_LABELS) as InputType[]).map((t) => (
                  <option key={t} value={t}>{INPUT_LABELS[t]}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                {INPUT_LABELS[inputType]}
              </label>
              <input
                type="number"
                min={0}
                step={inputType === 'hourly' ? 1 : 1000}
                value={amount || ''}
                onChange={(e) => setAmount(parseNum(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Hours per Week
              </label>
              <input
                type="number"
                min={1}
                max={168}
                step={1}
                value={hoursPerWeek || ''}
                onChange={(e) => setHoursPerWeek(parseNum(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                Weeks per Year
              </label>
              <input
                type="number"
                min={1}
                max={52}
                step={1}
                value={weeksPerYear || ''}
                onChange={(e) => setWeeksPerYear(parseNum(e.target.value))}
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
          {stats.map(({ label, value, key }) => (
            <ResultStat key={key} label={label} value={value} highlight={key !== inputType} />
          ))}
        </div>
      }
    />
  );
}
