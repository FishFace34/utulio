'use client';

import { useState, useCallback } from 'react';

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const PRESETS = [
  { label: '16:9', w: 1920, h: 1080 },
  { label: '4:3', w: 1600, h: 1200 },
  { label: '1:1', w: 1080, h: 1080 },
  { label: '21:9', w: 2560, h: 1080 },
  { label: '9:16', w: 1080, h: 1920 },
  { label: '3:2', w: 1500, h: 1000 },
];

interface AspectRatioCalculatorProps {
  defaultWidth?: number;
  defaultHeight?: number;
}

export default function AspectRatioCalculator({
  defaultWidth = 1920,
  defaultHeight = 1080,
}: AspectRatioCalculatorProps) {
  const [origW, setOrigW] = useState(defaultWidth);
  const [origH, setOrigH] = useState(defaultHeight);
  const [newW, setNewW] = useState<string>('');
  const [newH, setNewH] = useState<string>('');

  const ratio = origW > 0 && origH > 0 ? origW / origH : 1;
  const divisor = origW > 0 && origH > 0 ? gcd(origW, origH) : 1;
  const simplifiedRatio = origW > 0 && origH > 0
    ? `${origW / divisor}:${origH / divisor}`
    : '—';

  const calcFromWidth = useCallback((w: string) => {
    setNewW(w);
    const parsed = parseFloat(w);
    if (!isNaN(parsed) && parsed > 0 && ratio > 0) {
      setNewH((parsed / ratio).toFixed(0));
    } else {
      setNewH('');
    }
  }, [ratio]);

  const calcFromHeight = useCallback((h: string) => {
    setNewH(h);
    const parsed = parseFloat(h);
    if (!isNaN(parsed) && parsed > 0 && ratio > 0) {
      setNewW((parsed * ratio).toFixed(0));
    } else {
      setNewW('');
    }
  }, [ratio]);

  function applyPreset(w: number, h: number) {
    setOrigW(w);
    setOrigH(h);
    setNewW('');
    setNewH('');
  }

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <p className="mb-2 text-sm font-medium text-zinc-700">Common Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({ label, w, h }) => (
            <button
              key={label}
              type="button"
              onClick={() => applyPreset(w, h)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                origW === w && origH === h
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Original dimensions */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Original Dimensions</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Width (px)</label>
            <input
              type="number"
              min={1}
              value={origW || ''}
              onChange={(e) => { setOrigW(parseInt(e.target.value) || 0); setNewW(''); setNewH(''); }}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">Height (px)</label>
            <input
              type="number"
              min={1}
              value={origH || ''}
              onChange={(e) => { setOrigH(parseInt(e.target.value) || 0); setNewW(''); setNewH(''); }}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>

        {/* Ratio display */}
        <div className="rounded-lg bg-zinc-900 px-4 py-3 text-center">
          <p className="text-xs text-zinc-400 mb-1">Aspect Ratio</p>
          <p className="text-3xl font-bold text-white">{simplifiedRatio}</p>
        </div>
      </div>

      {/* Calculate new size */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Calculate New Size</h2>
        <p className="text-sm text-zinc-500">Enter either width or height — the other will be calculated automatically.</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">New Width (px)</label>
            <input
              type="number"
              min={1}
              value={newW}
              onChange={(e) => calcFromWidth(e.target.value)}
              placeholder="e.g. 800"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">New Height (px)</label>
            <input
              type="number"
              min={1}
              value={newH}
              onChange={(e) => calcFromHeight(e.target.value)}
              placeholder="e.g. 450"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
          </div>
        </div>
        {newW && newH && (
          <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
            ✓ {newW} × {newH} px — maintains {simplifiedRatio} ratio
          </p>
        )}
      </div>
    </div>
  );
}
