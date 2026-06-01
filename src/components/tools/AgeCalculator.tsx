'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';

function calcAge(birth: Date, target: Date) {
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Day of week born
  const days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const bornDayOfWeek = days_of_week[birth.getDay()];

  // Next birthday
  const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= target) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, bornDayOfWeek, daysToNextBirthday };
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [targetDate, setTargetDate] = useState(todayStr());

  const result = useMemo(() => {
    if (!birthDate || !targetDate) return null;
    const birth = new Date(birthDate + 'T00:00:00');
    const target = new Date(targetDate + 'T00:00:00');
    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) return null;
    return calcAge(birth, target);
  }, [birthDate, targetDate]);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Date of Birth</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Age At Date</label>
        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        <button type="button" onClick={() => setTargetDate(todayStr())}
          className="mt-1 text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900">Use today</button>
      </div>

      {result && (
        <div className="space-y-3">
          <ResultStat label="Your Age" value={`${result.years} years, ${result.months} months, ${result.days} days`} highlight />
          <ResultStat label="Total Days" value={result.totalDays.toLocaleString()} />
          <ResultStat label="Total Weeks" value={result.totalWeeks.toLocaleString()} />
          <ResultStat label="Total Hours" value={result.totalHours.toLocaleString()} />
          <ResultStat label="Born On" value={result.bornDayOfWeek} />
          <ResultStat label="Days to Next Birthday" value={`${result.daysToNextBirthday} days`} />
        </div>
      )}

      {!result && birthDate && targetDate && (
        <p className="text-sm text-red-600">Birth date must be before the target date.</p>
      )}
    </div>
  );
}
