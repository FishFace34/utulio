'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';
import Button from '@/components/ui/Button';
import { formatCurrency, parseNum, generateId } from '@/lib/utils';

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

type Strategy = 'snowball' | 'avalanche';

function simulate(debts: Debt[], extra: number, strategy: Strategy) {
  if (debts.length === 0 || debts.every((d) => d.balance <= 0)) {
    return { months: 0, totalInterest: 0, debtFreeDate: new Date() };
  }

  const MAX_MONTHS = 600;
  const remaining = debts.map((d) => ({ ...d, balance: d.balance }));
  let month = 0;
  let totalInterest = 0;

  while (remaining.some((d) => d.balance > 0) && month < MAX_MONTHS) {
    month++;

    // Add monthly interest
    for (const d of remaining) {
      if (d.balance > 0) {
        const interest = d.balance * (d.interestRate / 100 / 12);
        totalInterest += interest;
        d.balance += interest;
      }
    }

    // Pay minimums
    let freed = 0;
    for (const d of remaining) {
      if (d.balance > 0) {
        const pay = Math.min(d.balance, d.minimumPayment);
        d.balance -= pay;
        if (d.balance <= 0.01) {
          freed += d.minimumPayment;
          d.balance = 0;
        }
      }
    }

    // Sort priority debt
    const prioritized = remaining
      .filter((d) => d.balance > 0)
      .sort((a, b) =>
        strategy === 'snowball' ? a.balance - b.balance : b.interestRate - a.interestRate
      );

    if (prioritized.length > 0) {
      const available = extra + freed;
      prioritized[0].balance = Math.max(0, prioritized[0].balance - available);
    }
  }

  const date = new Date();
  date.setMonth(date.getMonth() + month);
  return { months: month, totalInterest, debtFreeDate: date };
}

const SAMPLE_DEBTS: Debt[] = [
  { id: generateId(), name: 'Credit Card', balance: 5000, interestRate: 19.99, minimumPayment: 100 },
  { id: generateId(), name: 'Car Loan', balance: 12000, interestRate: 6.5, minimumPayment: 250 },
];

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>(SAMPLE_DEBTS);
  const [extra, setExtra] = useState(200);
  const [strategy, setStrategy] = useState<Strategy>('avalanche');

  function addDebt() {
    setDebts((prev) => [
      ...prev,
      { id: generateId(), name: `Debt ${prev.length + 1}`, balance: 1000, interestRate: 10, minimumPayment: 25 },
    ]);
  }

  function removeDebt(id: string) {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }

  function updateDebt(id: string, field: keyof Debt, value: string) {
    setDebts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, [field]: field === 'name' ? value : parseNum(value) }
          : d
      )
    );
  }

  const snowball = useMemo(() => simulate(debts, extra, 'snowball'), [debts, extra]);
  const avalanche = useMemo(() => simulate(debts, extra, 'avalanche'), [debts, extra]);
  const results = strategy === 'snowball' ? snowball : avalanche;

  const totalBalance = debts.reduce((s, d) => s + d.balance, 0);
  const minPaymentsTotal = debts.reduce((s, d) => s + d.minimumPayment, 0);
  const monthlyInterestTotal = debts.reduce((s, d) => s + d.balance * (d.interestRate / 100 / 12), 0);
  const insufficientPayments = minPaymentsTotal < monthlyInterestTotal;

  return (
    <div className="space-y-6">
      {insufficientPayments && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          ⚠️ Your minimum payments ({formatCurrency(minPaymentsTotal)}/mo) may not cover the monthly
          interest ({formatCurrency(monthlyInterestTotal)}/mo). Consider increasing your payments.
        </div>
      )}

      {/* Debt Rows */}
      <div className="rounded-xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-100 px-5 py-4">
          <h2 className="text-base font-semibold text-zinc-900">Your Debts</h2>
        </div>
        <div className="divide-y divide-zinc-100">
          {debts.map((debt) => (
            <div key={debt.id} className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
                <input
                  type="text"
                  value={debt.name}
                  onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">Balance ($)</label>
                <input
                  type="number"
                  min={0}
                  value={debt.balance || ''}
                  onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500">APR (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  value={debt.interestRate || ''}
                  onChange={(e) => updateDebt(debt.id, 'interestRate', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-zinc-500">Min. Payment</label>
                  <input
                    type="number"
                    min={0}
                    value={debt.minimumPayment || ''}
                    onChange={(e) => updateDebt(debt.id, 'minimumPayment', e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                {debts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDebt(debt.id)}
                    className="mb-0.5 rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-100 px-5 py-3">
          <Button type="button" variant="secondary" size="sm" onClick={addDebt}>
            + Add Debt
          </Button>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Payoff Settings</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Extra Monthly Payment ($)
            </label>
            <input
              type="number"
              min={0}
              value={extra || ''}
              onChange={(e) => setExtra(parseNum(e.target.value))}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Strategy</label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value as Strategy)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            >
              <option value="avalanche">Avalanche (saves most interest)</option>
              <option value="snowball">Snowball (motivational wins)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <ResultStat
          label="Debt-Free Date"
          value={results.months >= 600 ? 'Over 50 years' : results.debtFreeDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          highlight
          sublabel={`${results.months} months`}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <ResultStat label="Total Interest (Avalanche)" value={formatCurrency(avalanche.totalInterest)} sublabel={`${avalanche.months} months`} />
          <ResultStat label="Total Interest (Snowball)" value={formatCurrency(snowball.totalInterest)} sublabel={`${snowball.months} months`} />
        </div>
        <ResultStat label="Total Debt" value={formatCurrency(totalBalance)} />
        {avalanche.totalInterest < snowball.totalInterest && (
          <p className="text-sm text-green-700 bg-green-50 rounded-xl px-4 py-3 border border-green-200">
            Avalanche method saves you{' '}
            <strong>{formatCurrency(snowball.totalInterest - avalanche.totalInterest)}</strong> in
            interest vs. snowball.
          </p>
        )}
      </div>
    </div>
  );
}
