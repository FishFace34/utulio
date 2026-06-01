'use client';

import { useState, useMemo } from 'react';
import ResultStat from '@/components/ui/ResultStat';

type Units = 'metric' | 'imperial';

function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
  if (bmi < 25) return { label: 'Normal weight', color: 'text-green-600' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-600' };
  return { label: 'Obese', color: 'text-red-600' };
}

export default function BMICalculator() {
  const [units, setUnits] = useState<Units>('metric');
  const [heightCm, setHeightCm] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightKg, setWeightKg] = useState(70);
  const [weightLbs, setWeightLbs] = useState(154);

  const { bmi, category, healthyMin, healthyMax } = useMemo(() => {
    let heightM: number, weight: number;
    if (units === 'metric') {
      heightM = heightCm / 100;
      weight = weightKg;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightM = totalInches * 0.0254;
      weight = weightLbs * 0.453592;
    }
    if (heightM <= 0) return { bmi: 0, category: { label: '', color: '' }, healthyMin: 0, healthyMax: 0 };
    const bmi = weight / (heightM * heightM);
    const category = getBMICategory(bmi);
    const healthyMin = 18.5 * heightM * heightM;
    const healthyMax = 24.9 * heightM * heightM;
    return { bmi, category, healthyMin, healthyMax };
  }, [units, heightCm, heightFt, heightIn, weightKg, weightLbs]);

  const bmiDisplay = bmi > 0 ? bmi.toFixed(1) : '—';
  const scalePos = bmi > 0 ? Math.min(100, Math.max(0, ((bmi - 15) / (40 - 15)) * 100)) : 0;

  return (
    <div className="mx-auto max-w-sm space-y-5">
      {/* Unit toggle */}
      <div className="flex rounded-lg border border-zinc-200 p-1">
        {(['metric', 'imperial'] as Units[]).map((u) => (
          <button key={u} type="button" onClick={() => setUnits(u)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors capitalize ${units === u ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {u}
          </button>
        ))}
      </div>

      {units === 'metric' ? (
        <>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Height (cm)</label>
            <input type="number" value={heightCm} min={50} max={300} step={0.5} onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Weight (kg)</label>
            <input type="number" value={weightKg} min={10} max={500} step={0.1} onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Height</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input type="number" value={heightFt} min={1} max={9} onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">ft</span>
              </div>
              <div className="relative">
                <input type="number" value={heightIn} min={0} max={11} step={0.5} onChange={(e) => setHeightIn(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">in</span>
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Weight (lbs)</label>
            <input type="number" value={weightLbs} min={50} max={1000} step={0.5} onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </>
      )}

      {bmi > 0 && (
        <div className="space-y-4">
          <ResultStat label="BMI" value={bmiDisplay} highlight />
          <p className={`text-base font-semibold ${category.color}`}>{category.label}</p>

          {/* Scale */}
          <div>
            <div className="relative h-4 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #3b82f6 0%, #22c55e 25%, #f59e0b 60%, #ef4444 100%)' }}>
              <div className="absolute top-0 h-full w-1 bg-white shadow-md rounded-full transition-all" style={{ left: `${scalePos}%` }} />
            </div>
            <div className="mt-1 flex justify-between text-xs text-zinc-400">
              <span>15 — Underweight</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
            </div>
          </div>

          <ResultStat label="Healthy Weight Range" value={`${healthyMin.toFixed(1)} – ${healthyMax.toFixed(1)} ${units === 'metric' ? 'kg' : 'lbs'}`} />
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
        BMI is a general indicator and does not account for muscle mass, age, sex, or body composition. Consult a healthcare provider for personalized health guidance.
      </div>
    </div>
  );
}
