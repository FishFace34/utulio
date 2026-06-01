'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';
import { daysBetween } from '@/lib/utils';

function todayStr() { return new Date().toISOString().slice(0, 10); }
function inDaysStr(n: number) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }

function calcDuration(start: Date, end: Date, includeEnd: boolean, businessOnly: boolean) {
  const adjusted = includeEnd ? new Date(end.getTime() + 86400000) : end;
  const totalDays = daysBetween(start, adjusted);

  let businessDays = 0;
  if (businessOnly) {
    const d = new Date(start);
    while (d < adjusted) {
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) businessDays++;
      d.setDate(d.getDate() + 1);
    }
  }

  const weeks = Math.floor(totalDays / 7);
  const remainDays = totalDays % 7;

  // rough years/months breakdown
  let years = 0, months = 0;
  const s = new Date(start);
  while (s <= end) {
    const next = new Date(s);
    next.setFullYear(next.getFullYear() + 1);
    if (next <= adjusted) { years++; s.setFullYear(s.getFullYear() + 1); } else break;
  }
  while (s <= end) {
    const next = new Date(s);
    next.setMonth(next.getMonth() + 1);
    if (next <= adjusted) { months++; s.setMonth(s.getMonth() + 1); } else break;
  }
  const remDays = daysBetween(s, adjusted);

  return { totalDays, businessDays, weeks, remainDays, years, months, remDays };
}

export default function DateDurationCalculator() {
  const [startDate, setStartDate] = useState(todayStr());
  const [endDate, setEndDate] = useState(inDaysStr(30));
  const [includeEnd, setIncludeEnd] = useState(false);
  const [businessOnly, setBusinessOnly] = useState(false);

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;
    const s = new Date(startDate + 'T00:00:00');
    const e = new Date(endDate + 'T00:00:00');
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || s > e) return null;
    return calcDuration(s, e, includeEnd, businessOnly);
  }, [startDate, endDate, includeEnd, businessOnly]);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      </div>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} className="rounded" />
          <span className="text-sm text-zinc-700">Include end date</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={businessOnly} onChange={(e) => setBusinessOnly(e.target.checked)} className="rounded" />
          <span className="text-sm text-zinc-700">Business days only (exclude weekends)</span>
        </label>
      </div>

      {result && (
        <div className="space-y-3">
          <ResultStat label="Total Days" value={result.totalDays.toLocaleString()} highlight />
          <ResultStat label="Breakdown" value={`${result.years}y ${result.months}mo ${result.remDays}d`} />
          <ResultStat label="Weeks" value={`${result.weeks} weeks, ${result.remainDays} days`} />
          {businessOnly && <ResultStat label="Business Days" value={result.businessDays.toLocaleString()} />}
        </div>
      )}

      {!result && startDate && endDate && (
        <p className="text-sm text-red-600">Start date must be on or before end date.</p>
      )}
    </div>
  );
}
