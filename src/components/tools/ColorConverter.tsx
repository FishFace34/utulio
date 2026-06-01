'use client';

import { useState, useCallback } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToCmyk } from '@/lib/colorConvert';

interface ColorState {
  hex: string;
  r: number; g: number; b: number;
  h: number; s: number; l: number;
  c: number; m: number; y: number; k: number;
}

function fromRgb(r: number, g: number, b: number): ColorState {
  const hsl = rgbToHsl(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  return { hex: rgbToHex(r, g, b), r, g, b, ...hsl, ...cmyk };
}

const DEFAULT = fromRgb(59, 130, 246); // #3B82F6

export default function ColorConverter() {
  const [color, setColor] = useState<ColorState>(DEFAULT);
  const [hexInput, setHexInput] = useState(DEFAULT.hex);

  const updateFromHex = useCallback((raw: string) => {
    setHexInput(raw);
    const rgb = hexToRgb(raw);
    if (rgb) setColor(fromRgb(rgb.r, rgb.g, rgb.b));
  }, []);

  const updateFromRgb = (field: 'r' | 'g' | 'b', val: number) => {
    const next = { r: color.r, g: color.g, b: color.b, [field]: Math.max(0, Math.min(255, val)) };
    const c = fromRgb(next.r, next.g, next.b);
    setColor(c);
    setHexInput(c.hex);
  };

  const updateFromHsl = (field: 'h' | 's' | 'l', val: number) => {
    const next = { h: color.h, s: color.s, l: color.l, [field]: val };
    const rgb = hslToRgb(next.h, next.s, next.l);
    const c = fromRgb(rgb.r, rgb.g, rgb.b);
    setColor(c);
    setHexInput(c.hex);
  };

  return (
    <div className="space-y-6">
      {/* Color picker + swatch */}
      <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5">
        <div
          className="h-20 w-20 shrink-0 rounded-xl border border-zinc-200 shadow-sm"
          style={{ backgroundColor: color.hex }}
          aria-label={`Color preview: ${color.hex}`}
        />
        <div className="flex-1">
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Color Picker</label>
          <input
            type="color"
            value={color.hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200"
          />
        </div>
      </div>

      {/* HEX */}
      <FormatCard label="HEX" copyText={color.hex}>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-mono">#</span>
          <input
            type="text"
            value={hexInput.replace('#', '')}
            onChange={(e) => updateFromHex('#' + e.target.value)}
            maxLength={6}
            spellCheck={false}
            className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        </div>
      </FormatCard>

      {/* RGB */}
      <FormatCard label="RGB" copyText={`rgb(${color.r}, ${color.g}, ${color.b})`}>
        <div className="grid grid-cols-3 gap-2">
          {(['r', 'g', 'b'] as const).map((ch) => (
            <div key={ch}>
              <label className="mb-1 block text-xs font-medium text-zinc-500 uppercase">{ch}</label>
              <input
                type="number"
                min={0}
                max={255}
                value={color[ch]}
                onChange={(e) => updateFromRgb(ch, parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          ))}
        </div>
      </FormatCard>

      {/* HSL */}
      <FormatCard label="HSL" copyText={`hsl(${color.h}, ${color.s}%, ${color.l}%)`}>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: 'h' as const, label: 'H', max: 360 },
            { key: 's' as const, label: 'S%', max: 100 },
            { key: 'l' as const, label: 'L%', max: 100 },
          ].map(({ key, label, max }) => (
            <div key={key}>
              <label className="mb-1 block text-xs font-medium text-zinc-500">{label}</label>
              <input
                type="number"
                min={0}
                max={max}
                value={color[key]}
                onChange={(e) => updateFromHsl(key, parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          ))}
        </div>
      </FormatCard>

      {/* CMYK */}
      <FormatCard label="CMYK" copyText={`cmyk(${color.c}%, ${color.m}%, ${color.y}%, ${color.k}%)`}>
        <div className="grid grid-cols-4 gap-2">
          {(['c', 'm', 'y', 'k'] as const).map((ch) => (
            <div key={ch}>
              <label className="mb-1 block text-xs font-medium text-zinc-500 uppercase">{ch}</label>
              <input
                type="number"
                min={0}
                max={100}
                value={color[ch]}
                readOnly
                className="w-full rounded-lg border border-zinc-100 bg-zinc-50 px-2 py-1.5 text-sm"
              />
            </div>
          ))}
        </div>
      </FormatCard>
    </div>
  );
}

function FormatCard({ label, copyText, children }: { label: string; copyText: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-900">{label}</span>
        <CopyButton text={copyText} />
      </div>
      {children}
    </div>
  );
}
