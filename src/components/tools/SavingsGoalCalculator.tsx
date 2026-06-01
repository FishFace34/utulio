'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency } from '@/lib/utils';

type Mode = 'monthly' | 'time';

export default function SavingsGoalCalculator() {
  const [mode, setMode] = useState<Mode>('monthly');
  const [goal, setGoal] = useState(20000);
  const [current, setCurrent] = useState(5000);
  const [years, setYears] = useState(3);
  const [monthly, setMonthly] = useState(400);
  const [rate, setRate] = useState(4);

  const calc = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;

    if (mode === 'monthly') {
      // Solve for PMT
      const fvCurrent = r === 0 ? current : current * Math.pow(1 + r, n);
      const required = r === 0
        ? (goal - current) / n
        : (goal - fvCurrent) / ((Math.pow(1 + r, n) - 1) / r);
      const totalContrib = current + Math.max(0, required) * n;
      const totalInterest = goal - totalContrib;
      return { required, totalContrib, totalInterest, months: n };
    } else {
      // Simulate until balance >= goal
      let balance = current;
      let months = 0;
      const MAX = 1200;
      while (balance < goal && months < MAX) {
        balance = balance * (1 + r) + monthly;
        months++;
      }
      if (months >= MAX) return { required: 0, totalContrib: 0, totalInterest: 0, months: -1 };
      const totalContrib = current + monthly * months;
      const totalInterest = goal - totalContrib;
      return { required: monthly, totalContrib, totalInterest, months };
    }
  }, [mode, goal, current, years, monthly, rate]);

  const inputPanel = (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-zinc-200 p-1">
        {(['monthly', 'time'] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${mode === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {m === 'monthly' ? 'How much per month?' : 'When will I reach it?'}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Savings Goal</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={goal} min={0} step={1000} onChange={(e) => setGoal(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Current Savings</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={current} min={0} step={500} onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>

      {mode === 'monthly' ? (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Time to Reach Goal (years)</label>
          <input type="number" value={years} min={0.5} max={50} step={0.5} onChange={(e) => setYears(parseFloat(e.target.value) || 1)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      ) : (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Monthly Savings</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
            <input type="number" value={monthly} min={0} step={50} onChange={(e) => setMonthly(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Annual Interest Rate (%)</label>
        <input type="number" value={rate} min={0} max={20} step={0.1} onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      </div>
    </div>
  );

  const resultPanel = (
    <div className="space-y-3">
      {mode === 'monthly' ? (
        <>
          {calc.required < 0 ? (
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              You&apos;ve already reached your goal! Your current savings exceed the target.
            </div>
          ) : (
            <ResultStat label="Required Monthly Savings" value={formatCurrency(calc.required)} highlight />
          )}
          <ResultStat label="Total Contributions" value={formatCurrency(calc.totalContrib)} />
          <ResultStat label="Interest Earned" value={formatCurrency(Math.max(0, calc.totalInterest))} />
        </>
      ) : (
        <>
          {calc.months === -1 ? (
            <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
              At this savings rate, you will not reach your goal within 100 years. Try increasing your monthly savings.
            </div>
          ) : (
            <>
              <ResultStat
                label="Time to Reach Goal"
                value={`${Math.floor(calc.months / 12)} yr ${calc.months % 12} mo`}
                highlight
              />
              <ResultStat label="Total Contributions" value={formatCurrency(calc.totalContrib)} />
              <ResultStat label="Interest Earned" value={formatCurrency(Math.max(0, calc.totalInterest))} />
            </>
          )}
        </>
      )}
    </div>
  );

  return <CalculatorShell inputs={inputPanel} results={resultPanel} />;
}
