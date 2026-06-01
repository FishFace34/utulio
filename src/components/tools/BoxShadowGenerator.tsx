'use client';

import { useState, useMemo } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import { generateId } from '@/lib/utils';

interface Shadow {
  id: string;
  h: number; v: number; blur: number; spread: number;
  color: string; opacity: number; inset: boolean;
}

function newShadow(): Shadow {
  return { id: generateId(), h: 5, v: 5, blur: 10, spread: 0, color: '#000000', opacity: 30, inset: false };
}

function shadowToCss(s: Shadow): string {
  const hex = s.color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const a = (s.opacity / 100).toFixed(2);
  const prefix = s.inset ? 'inset ' : '';
  return `${prefix}${s.h}px ${s.v}px ${s.blur}px ${s.spread}px rgba(${r},${g},${b},${a})`;
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-zinc-500">
        <span>{label}</span><span>{value}px</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-zinc-900" />
    </div>
  );
}

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([newShadow()]);
  const [activeShadowId, setActiveShadowId] = useState(shadows[0].id);
  const [bgColor, setBgColor] = useState('#f4f4f5');
  const [boxColor, setBoxColor] = useState('#ffffff');

  const css = useMemo(() => {
    const val = shadows.map(shadowToCss).join(',\n  ');
    return `box-shadow: ${val};`;
  }, [shadows]);

  const activeShadow = shadows.find((s) => s.id === activeShadowId) || shadows[0];

  function updateActive(patch: Partial<Shadow>) {
    setShadows((prev) => prev.map((s) => s.id === activeShadowId ? { ...s, ...patch } : s));
  }

  function addShadow() {
    const s = newShadow();
    setShadows((prev) => [...prev, s]);
    setActiveShadowId(s.id);
  }

  function removeShadow(id: string) {
    setShadows((prev) => {
      const next = prev.filter((s) => s.id !== id);
      if (next.length === 0) { const s = newShadow(); return [s]; }
      return next;
    });
    if (activeShadowId === id) {
      const remaining = shadows.filter((s) => s.id !== id);
      if (remaining.length > 0) setActiveShadowId(remaining[0].id);
    }
  }

  const previewStyle = {
    boxShadow: shadows.map(shadowToCss).join(', '),
    backgroundColor: boxColor,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      {/* Controls */}
      <div className="space-y-5">
        {/* Shadow layers */}
        <div className="flex flex-wrap gap-2">
          {shadows.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1">
              <button type="button" onClick={() => setActiveShadowId(s.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${activeShadowId === s.id ? 'bg-zinc-900 text-white' : 'border border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}>
                Layer {i + 1}
              </button>
              {shadows.length > 1 && (
                <button type="button" onClick={() => removeShadow(s.id)}
                  className="rounded text-xs text-zinc-400 hover:text-red-500">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addShadow}
            className="rounded-lg border border-dashed border-zinc-300 px-3 py-1.5 text-sm text-zinc-500 hover:border-zinc-500">
            + Add layer
          </button>
        </div>

        {/* Sliders */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
          <Slider label="Horizontal Offset" value={activeShadow.h} min={-50} max={50} onChange={(v) => updateActive({ h: v })} />
          <Slider label="Vertical Offset" value={activeShadow.v} min={-50} max={50} onChange={(v) => updateActive({ v: v })} />
          <Slider label="Blur Radius" value={activeShadow.blur} min={0} max={100} onChange={(v) => updateActive({ blur: v })} />
          <Slider label="Spread Radius" value={activeShadow.spread} min={-50} max={50} onChange={(v) => updateActive({ spread: v })} />
          <div>
            <div className="mb-1 text-xs text-zinc-500">Opacity: {activeShadow.opacity}%</div>
            <input type="range" min={0} max={100} value={activeShadow.opacity} onChange={(e) => updateActive({ opacity: parseInt(e.target.value) })} className="w-full accent-zinc-900" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-zinc-500">Shadow Color</label>
              <input type="color" value={activeShadow.color} onChange={(e) => updateActive({ color: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200" />
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2">
                <div className="relative">
                  <input type="checkbox" checked={activeShadow.inset} onChange={(e) => updateActive({ inset: e.target.checked })} className="sr-only" />
                  <div className={`h-5 w-9 rounded-full transition-colors ${activeShadow.inset ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${activeShadow.inset ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm font-medium text-zinc-700">Inset</span>
              </label>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-50">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5">
            <span className="text-xs font-semibold text-zinc-700">CSS Output</span>
            <CopyButton text={css} />
          </div>
          <pre className="overflow-x-auto p-4 text-xs text-zinc-700">{css}</pre>
        </div>

        {/* Background color */}
        <div className="flex gap-4">
          <div className="flex-1"><label className="mb-1.5 block text-xs text-zinc-500">Preview Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200" /></div>
          <div className="flex-1"><label className="mb-1.5 block text-xs text-zinc-500">Box Color</label>
            <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200" /></div>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-20 lg:self-start">
        <div className="flex items-center justify-center rounded-2xl p-12" style={{ backgroundColor: bgColor, minHeight: 280 }}>
          <div className="h-32 w-48 rounded-xl transition-all duration-200" style={previewStyle} />
        </div>
      </div>
    </div>
  );
}
