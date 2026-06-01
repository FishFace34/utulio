'use client';

import { useState, useMemo } from 'react';
import CalculatorShell from '@/components/ui/CalculatorShell';
import ResultStat from '@/components/ui/ResultStat';
import { formatCurrency } from '@/lib/utils';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);

  const calc = useMemo(() => {
    const years = Math.max(0, retirementAge - currentAge);
    const months = years * 12;
    const monthlyRate = annualReturn / 100 / 12;
    let balance = currentSavings;
    let contributed = currentSavings;

    // build chart data (yearly snapshots)
    const chartData: { year: number; balance: number; contributed: number }[] = [
      { year: 0, balance: currentSavings, contributed: currentSavings },
    ];

    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContrib;
      contributed += monthlyContrib;
      if (m % 12 === 0) {
        chartData.push({ year: m / 12, balance, contributed });
      }
    }

    const totalAtRetirement = balance;
    const totalContributed = contributed;
    const totalGrowth = totalAtRetirement - totalContributed;
    const monthlyRetirementIncome = (totalAtRetirement * 0.04) / 12;

    return { totalAtRetirement, totalContributed, totalGrowth, monthlyRetirementIncome, years, chartData };
  }, [currentAge, retirementAge, currentSavings, monthlyContrib, annualReturn]);

  const maxVal = Math.max(...calc.chartData.map((d) => d.balance), 1);
  const W = 300, H = 120;

  const inputPanel = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Current Age</label>
          <input type="number" value={currentAge} min={18} max={80} onChange={(e) => setCurrentAge(parseInt(e.target.value) || 18)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Retirement Age</label>
          <input type="number" value={retirementAge} min={currentAge + 1} max={90} onChange={(e) => setRetirementAge(parseInt(e.target.value) || 65)}
            className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Current Savings</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={currentSavings} min={0} step={1000} onChange={(e) => setCurrentSavings(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Monthly Contribution</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">$</span>
          <input type="number" value={monthlyContrib} min={0} step={50} onChange={(e) => setMonthlyContrib(parseFloat(e.target.value) || 0)}
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Expected Annual Return (%)</label>
        <input type="number" value={annualReturn} min={0} max={20} step={0.5} onChange={(e) => setAnnualReturn(parseFloat(e.target.value) || 0)}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        <p className="mt-1 text-xs text-zinc-400">Historical stock market average: 7% (inflation-adjusted)</p>
      </div>

      {calc.years > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="mb-2 text-xs font-medium text-zinc-500">Growth Over Time</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            <defs>
              <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18181b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#18181b" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {calc.chartData.length > 1 && (() => {
              const pts = calc.chartData.map((d, i) => {
                const x = (i / (calc.chartData.length - 1)) * W;
                const y = H - (d.balance / maxVal) * H * 0.9 - H * 0.05;
                return `${x},${y}`;
              }).join(' ');
              const first = pts.split(' ')[0];
              const last = pts.split(' ').slice(-1)[0];
              const [lx] = last.split(',');
              return (
                <>
                  <polygon points={`0,${H} ${pts} ${lx},${H}`} fill="url(#retGrad)" />
                  <polyline points={pts} fill="none" stroke="#18181b" strokeWidth="1.5" />
                  {first && <circle cx={first.split(',')[0]} cy={first.split(',')[1]} r="3" fill="#18181b" />}
                  {last && <circle cx={last.split(',')[0]} cy={last.split(',')[1]} r="3" fill="#18181b" />}
                </>
              );
            })()}
          </svg>
          <div className="mt-1 flex justify-between text-xs text-zinc-400">
            <span>Age {currentAge}</span>
            <span>Age {retirementAge}</span>
          </div>
        </div>
      )}

      {retirementAge <= currentAge && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">Retirement age must be greater than current age.</p>
      )}
    </div>
  );

  const resultPanel = (
    <div className="space-y-3">
      <ResultStat label="Total at Retirement" value={formatCurrency(calc.totalAtRetirement)} highlight />
      <ResultStat label={`Est. Monthly Income (4% rule)`} value={formatCurrency(calc.monthlyRetirementIncome)} />
      <ResultStat label="Years Until Retirement" value={`${calc.years} years`} />
      <div className="border-t border-zinc-100 pt-3 space-y-3">
        <ResultStat label="Total Contributions" value={formatCurrency(calc.totalContributed)} />
        <ResultStat label="Growth (interest)" value={formatCurrency(calc.totalGrowth)} />
      </div>
      <p className="text-xs text-zinc-400">
        The 4% rule estimates a sustainable annual withdrawal of 4% of your portfolio, historically lasting 30+ years.
      </p>
    </div>
  );

  return <CalculatorShell inputs={inputPanel} results={resultPanel} />;
}
