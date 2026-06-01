'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { generateId, parseNum } from '@/lib/utils';

interface GradeItem {
  id: string;
  name: string;
  grade: number;
  weight: number;
}

function letterGrade(pct: number): string {
  if (pct >= 93) return 'A';
  if (pct >= 90) return 'A-';
  if (pct >= 87) return 'B+';
  if (pct >= 83) return 'B';
  if (pct >= 80) return 'B-';
  if (pct >= 77) return 'C+';
  if (pct >= 73) return 'C';
  if (pct >= 70) return 'C-';
  if (pct >= 67) return 'D+';
  if (pct >= 60) return 'D';
  return 'F';
}

type Mode = 'weighted' | 'final-needed';

const SAMPLE_ITEMS: GradeItem[] = [
  { id: generateId(), name: 'Homework', grade: 92, weight: 20 },
  { id: generateId(), name: 'Midterm', grade: 78, weight: 30 },
  { id: generateId(), name: 'Projects', grade: 88, weight: 20 },
];

export default function GradeCalculator() {
  const [mode, setMode] = useState<Mode>('weighted');
  const [items, setItems] = useState<GradeItem[]>(SAMPLE_ITEMS);
  const [currentGrade, setCurrentGrade] = useState(85);
  const [currentWeight, setCurrentWeight] = useState(70);
  const [finalWeight, setFinalWeight] = useState(30);
  const [targetGrade, setTargetGrade] = useState(90);

  function addItem() {
    setItems((prev) => [...prev, { id: generateId(), name: `Assignment ${prev.length + 1}`, grade: 85, weight: 10 }]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateItem(id: string, field: keyof GradeItem, value: string) {
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, [field]: field === 'name' ? value : parseNum(value) } : i)
    );
  }

  const weightedResults = useMemo(() => {
    const totalWeight = items.reduce((s, i) => s + i.weight, 0);
    const weightedSum = items.reduce((s, i) => s + i.grade * i.weight, 0);
    const avg = totalWeight > 0 ? weightedSum / totalWeight : 0;
    return { avg, totalWeight, letter: letterGrade(avg) };
  }, [items]);

  const finalNeeded = useMemo(() => {
    const needed = (targetGrade - currentGrade * (currentWeight / 100)) / (finalWeight / 100);
    return { needed, achievable: needed <= 100 };
  }, [currentGrade, currentWeight, finalWeight, targetGrade]);

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="flex rounded-lg border border-zinc-200 p-1 max-w-sm">
        {(['weighted', 'final-needed'] as Mode[]).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${mode === m ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {m === 'weighted' ? 'Current Grade' : 'Final Needed'}
          </button>
        ))}
      </div>

      {mode === 'weighted' ? (
        <>
          {/* Grade rows */}
          <div className="rounded-xl border border-zinc-200 bg-white">
            <div className="border-b border-zinc-100 px-5 py-4">
              <h2 className="text-base font-semibold text-zinc-900">Grade Items</h2>
            </div>
            <div className="divide-y divide-zinc-100">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr_80px_80px_32px] gap-3 items-end px-4 py-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
                    <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-500">Grade %</label>
                    <input type="number" min={0} max={100} value={item.grade || ''} onChange={(e) => updateItem(item.id, 'grade', e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-zinc-500">Weight %</label>
                    <input type="number" min={0} max={100} value={item.weight || ''} onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)}
                    className="rounded-lg p-1 text-zinc-400 hover:bg-red-50 hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-100 px-5 py-3">
              <Button type="button" variant="secondary" size="sm" onClick={addItem}>+ Add Item</Button>
            </div>
          </div>

          {/* Results */}
          <div className={`rounded-xl p-6 text-center ${weightedResults.avg >= 60 ? 'bg-zinc-900' : 'bg-red-900'}`}>
            <p className="text-zinc-400 text-sm font-medium mb-1">Current Weighted Grade</p>
            <p className="text-5xl font-bold text-white">{weightedResults.avg.toFixed(1)}%</p>
            <p className="text-2xl font-semibold text-zinc-300 mt-1">{weightedResults.letter}</p>
            {Math.abs(weightedResults.totalWeight - 100) > 0.5 && (
              <p className="mt-3 text-sm text-yellow-300">
                ⚠️ Weights sum to {weightedResults.totalWeight}% (should be 100%)
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
            <h2 className="text-base font-semibold text-zinc-900">Grade So Far</h2>
            {[
              { label: 'Current Grade (%)', val: currentGrade, set: setCurrentGrade },
              { label: 'Current Weight (% of final grade)', val: currentWeight, set: setCurrentWeight },
              { label: 'Final Exam Weight (%)', val: finalWeight, set: setFinalWeight },
              { label: 'Target Final Grade (%)', val: targetGrade, set: setTargetGrade },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
                <input type="number" min={0} max={100} step={0.1} value={val || ''}
                  onChange={(e) => (set as (v: number) => void)(parseNum(e.target.value))}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
            ))}
          </div>

          <div className={`rounded-xl p-6 text-center ${finalNeeded.achievable ? 'bg-zinc-900' : 'bg-amber-600'}`}>
            <p className="text-zinc-400 text-sm font-medium mb-1">Score Needed on Final</p>
            <p className="text-5xl font-bold text-white">{finalNeeded.needed.toFixed(1)}%</p>
            {!finalNeeded.achievable && (
              <p className="mt-3 text-sm text-amber-200">
                ⚠️ You&apos;d need over 100% — this target grade is not achievable with current grades.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
