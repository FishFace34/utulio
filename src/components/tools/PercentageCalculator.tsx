'use client';

import { useState } from 'react';
import { formatPercent } from '@/lib/utils';

function MiniCalc({ title, fields, result, onFieldChange }: {
  title: string;
  fields: { label: string; value: string; key: string }[];
  result: string;
  onFieldChange: (key: string, value: string) => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
      <p className="text-sm font-semibold text-zinc-700">{title}</p>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {fields.map((f, i) => (
          <span key={f.key} className="flex items-center gap-2">
            <span className="text-zinc-500">{f.label}</span>
            <input type="number" value={f.value} onChange={(e) => onFieldChange(f.key, e.target.value)}
              className="w-24 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            {i < fields.length - 1 && <span className="text-zinc-400">·</span>}
          </span>
        ))}
      </div>
      {result && (
        <div className="rounded-lg bg-zinc-50 px-4 py-3">
          <p className="text-xl font-bold text-zinc-900">{result}</p>
        </div>
      )}
    </div>
  );
}

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1x, setM1x] = useState('25');
  const [m1y, setM1y] = useState('200');

  // Mode 2: X is what % of Y?
  const [m2x, setM2x] = useState('50');
  const [m2y, setM2y] = useState('200');

  // Mode 3: % change from X to Y
  const [m3x, setM3x] = useState('100');
  const [m3y, setM3y] = useState('150');

  // Mode 4: X is Y% of what?
  const [m4x, setM4x] = useState('50');
  const [m4y, setM4y] = useState('25');

  function r1(): string {
    const x = parseFloat(m1x), y = parseFloat(m1y);
    if (!isFinite(x) || !isFinite(y)) return '';
    return `${((x / 100) * y).toLocaleString('en-US', { maximumFractionDigits: 4 })}`;
  }

  function r2(): string {
    const x = parseFloat(m2x), y = parseFloat(m2y);
    if (!isFinite(x) || !isFinite(y) || y === 0) return y === 0 ? 'Division by zero' : '';
    return formatPercent((x / y) * 100);
  }

  function r3(): string {
    const x = parseFloat(m3x), y = parseFloat(m3y);
    if (!isFinite(x) || !isFinite(y) || x === 0) return x === 0 ? 'Division by zero' : '';
    const pct = ((y - x) / x) * 100;
    return `${pct >= 0 ? '+' : ''}${formatPercent(pct)} (${pct >= 0 ? 'increase' : 'decrease'})`;
  }

  function r4(): string {
    const x = parseFloat(m4x), y = parseFloat(m4y);
    if (!isFinite(x) || !isFinite(y) || y === 0) return y === 0 ? 'Division by zero' : '';
    return (x / (y / 100)).toLocaleString('en-US', { maximumFractionDigits: 4 });
  }

  return (
    <div className="space-y-4">
      <MiniCalc
        title="What is X% of Y?"
        fields={[{ label: 'What is', key: 'x', value: m1x }, { label: '% of', key: 'y', value: m1y }, { label: '?', key: '', value: '' }].filter((f) => f.key !== '')}
        result={r1()}
        onFieldChange={(k, v) => k === 'x' ? setM1x(v) : setM1y(v)}
      />
      <MiniCalc
        title="X is what percent of Y?"
        fields={[{ label: '', key: 'x', value: m2x }, { label: 'is what % of', key: 'y', value: m2y }]}
        result={r2()}
        onFieldChange={(k, v) => k === 'x' ? setM2x(v) : setM2y(v)}
      />
      <MiniCalc
        title="Percentage change from X to Y"
        fields={[{ label: 'From', key: 'x', value: m3x }, { label: 'to', key: 'y', value: m3y }]}
        result={r3()}
        onFieldChange={(k, v) => k === 'x' ? setM3x(v) : setM3y(v)}
      />
      <MiniCalc
        title="X is Y% of what?"
        fields={[{ label: '', key: 'x', value: m4x }, { label: 'is', key: 'y', value: m4y }, { label: '% of ?', key: '', value: '' }].filter((f) => f.key !== '')}
        result={r4()}
        onFieldChange={(k, v) => k === 'x' ? setM4x(v) : setM4y(v)}
      />
    </div>
  );
}
