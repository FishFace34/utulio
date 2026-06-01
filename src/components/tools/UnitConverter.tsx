'use client';

import { useState, useMemo } from 'react';
import Tabs from '@/components/ui/Tabs';
import { UNIT_CATEGORIES, convert, type UnitCategory } from '@/lib/unitConversions';

const CATEGORY_TABS = (Object.keys(UNIT_CATEGORIES) as UnitCategory[]).map((k) => ({
  id: k,
  label: UNIT_CATEGORIES[k].label,
}));

interface UnitConverterProps {
  defaultCategory?: UnitCategory;
}

export default function UnitConverter({ defaultCategory = 'length' }: UnitConverterProps) {
  const [category, setCategory] = useState<UnitCategory>(defaultCategory);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState(1);

  const units = UNIT_CATEGORIES[category].units;

  const result = useMemo(() => {
    const fromUnit = units[fromIdx] || units[0];
    const toUnit = units[toIdx] || units[1];
    return convert(value, fromUnit, toUnit);
  }, [value, fromIdx, toIdx, units]);

  function formatResult(n: number): string {
    if (!isFinite(n)) return '—';
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(6);
    return parseFloat(n.toPrecision(8)).toString();
  }

  function handleCategoryChange(id: string) {
    setCategory(id as UnitCategory);
    setFromIdx(0);
    setToIdx(1);
    setValue(1);
  }

  return (
    <div className="space-y-5">
      <Tabs tabs={CATEGORY_TABS} activeTab={category} onChange={handleCategoryChange} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">From</label>
          <div className="space-y-2">
            <select value={fromIdx} onChange={(e) => setFromIdx(parseInt(e.target.value))}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
              {units.map((u, i) => <option key={i} value={i}>{u.name} ({u.symbol})</option>)}
            </select>
            <input type="number" value={value} step="any" onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">To</label>
          <div className="space-y-2">
            <select value={toIdx} onChange={(e) => setToIdx(parseInt(e.target.value))}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
              {units.map((u, i) => <option key={i} value={i}>{u.name} ({u.symbol})</option>)}
            </select>
            <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="text-lg font-semibold text-zinc-900">{formatResult(result)}</span>
              <span className="ml-2 text-sm text-zinc-500">{units[toIdx]?.symbol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swap button */}
      <button type="button" onClick={() => { setFromIdx(toIdx); setToIdx(fromIdx); }}
        className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
        ⇄ Swap units
      </button>

      {/* Quick reference */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
        <p className="mb-2 text-xs font-semibold text-zinc-500">Common Conversions</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-zinc-600">
          {category === 'length' && (<>
            <span>1 mile = 1.60934 km</span><span>1 inch = 2.54 cm</span>
            <span>1 foot = 0.3048 m</span><span>1 yard = 0.9144 m</span>
          </>)}
          {category === 'weight' && (<>
            <span>1 lb = 0.453592 kg</span><span>1 oz = 28.3495 g</span>
            <span>1 stone = 6.35029 kg</span><span>1 ton = 1000 kg</span>
          </>)}
          {category === 'temperature' && (<>
            <span>0°C = 32°F</span><span>100°C = 212°F</span>
            <span>37°C = 98.6°F</span><span>-40°C = -40°F</span>
          </>)}
          {category === 'volume' && (<>
            <span>1 gal = 3.78541 L</span><span>1 cup = 236.588 mL</span>
            <span>1 fl oz = 29.5735 mL</span><span>1 qt = 946.353 mL</span>
          </>)}
          {category === 'speed' && (<>
            <span>1 mph = 1.60934 km/h</span><span>1 m/s = 3.6 km/h</span>
          </>)}
          {category === 'data' && (<>
            <span>1 KB = 1024 bytes</span><span>1 MB = 1024 KB</span>
            <span>1 GB = 1024 MB</span><span>1 TB = 1024 GB</span>
          </>)}
        </div>
      </div>
    </div>
  );
}
