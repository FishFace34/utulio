'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';

type Gender = 'male' | 'female';
type Units = 'metric' | 'imperial';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: 'Sedentary (little or no exercise)',
  light: 'Light (exercise 1-3 days/week)',
  moderate: 'Moderate (exercise 3-5 days/week)',
  active: 'Active (hard exercise 6-7 days/week)',
  very_active: 'Very Active (physical job or 2× training)',
};

export default function TDEECalculator() {
  const [units, setUnits] = useState<Units>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState(30);
  const [heightCm, setHeightCm] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightKg, setWeightKg] = useState(75);
  const [weightLbs, setWeightLbs] = useState(165);
  const [activity, setActivity] = useState<Activity>('moderate');

  const { bmr, tdee } = useMemo(() => {
    let kg: number, cm: number;
    if (units === 'metric') {
      kg = weightKg;
      cm = heightCm;
    } else {
      kg = weightLbs * 0.453592;
      cm = (heightFt * 12 + heightIn) * 2.54;
    }
    const bmr = gender === 'male'
      ? 10 * kg + 6.25 * cm - 5 * age + 5
      : 10 * kg + 6.25 * cm - 5 * age - 161;
    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
    return { bmr: Math.round(bmr), tdee: Math.round(tdee) };
  }, [units, gender, age, heightCm, heightFt, heightIn, weightKg, weightLbs, activity]);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      <div className="flex rounded-lg border border-zinc-200 p-1">
        {(['metric', 'imperial'] as Units[]).map((u) => (
          <button key={u} type="button" onClick={() => setUnits(u)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors capitalize ${units === u ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {u}
          </button>
        ))}
      </div>

      <div className="flex rounded-lg border border-zinc-200 p-1">
        {(['male', 'female'] as Gender[]).map((g) => (
          <button key={g} type="button" onClick={() => setGender(g)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors capitalize ${gender === g ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {g}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Age</label>
        <input type="number" value={age} min={10} max={100} onChange={(e) => setAge(parseInt(e.target.value) || 0)}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
      </div>

      {units === 'metric' ? (
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1.5 block text-sm font-medium text-zinc-700">Height (cm)</label>
            <input type="number" value={heightCm} min={50} max={300} step={0.5} onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
          <div><label className="mb-1.5 block text-sm font-medium text-zinc-700">Weight (kg)</label>
            <input type="number" value={weightKg} min={10} max={500} step={0.1} onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div><label className="mb-1.5 block text-sm font-medium text-zinc-700">Ft</label>
            <input type="number" value={heightFt} min={1} max={9} onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
          <div><label className="mb-1.5 block text-sm font-medium text-zinc-700">In</label>
            <input type="number" value={heightIn} min={0} max={11} step={0.5} onChange={(e) => setHeightIn(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
          <div><label className="mb-1.5 block text-sm font-medium text-zinc-700">Lbs</label>
            <input type="number" value={weightLbs} min={50} max={1000} step={0.5} onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value as Activity)}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
          {(Object.keys(ACTIVITY_LABELS) as Activity[]).map((a) => (
            <option key={a} value={a}>{ACTIVITY_LABELS[a]}</option>
          ))}
        </select>
      </div>

      {tdee > 0 && (
        <div className="space-y-3">
          <ResultStat label="TDEE (Maintenance Calories)" value={`${tdee.toLocaleString()} cal/day`} highlight />
          <ResultStat label="BMR (Base Metabolic Rate)" value={`${bmr.toLocaleString()} cal/day`} />
          <div className="border-t border-zinc-100 pt-3 space-y-2">
            <p className="text-xs font-semibold text-zinc-500">Calorie Targets</p>
            <ResultStat label="Mild weight loss (−0.25 kg/wk)" value={`${(tdee - 250).toLocaleString()} cal`} />
            <ResultStat label="Weight loss (−0.5 kg/wk)" value={`${(tdee - 500).toLocaleString()} cal`} />
            <ResultStat label="Mild weight gain (+0.25 kg/wk)" value={`${(tdee + 250).toLocaleString()} cal`} />
            <ResultStat label="Weight gain (+0.5 kg/wk)" value={`${(tdee + 500).toLocaleString()} cal`} />
          </div>
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
        This is an estimate using the Mifflin-St Jeor formula. Actual calorie needs vary based on health conditions and body composition. Consult a dietitian or healthcare provider for personalized guidance.
      </div>
    </div>
  );
}
