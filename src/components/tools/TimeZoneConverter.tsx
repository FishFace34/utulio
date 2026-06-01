'use client';

import { useState, useMemo } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'America/Vancouver', 'America/Sao_Paulo', 'America/Mexico_City',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam',
  'Europe/Moscow', 'Europe/Istanbul', 'Africa/Cairo', 'Africa/Johannesburg',
  'Asia/Dubai', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Dhaka',
  'Asia/Bangkok', 'Asia/Singapore', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul',
  'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland', 'Pacific/Honolulu',
  'UTC',
];

function formatTZ(tz: string, date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function getHour(tz: string, date: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false }).formatToParts(date);
  return parseInt(parts.find((p) => p.type === 'hour')?.value || '0');
}

function isGoodHour(tz: string, date: Date): boolean {
  const h = getHour(tz, date);
  return h >= 9 && h < 17;
}

function todayDateTimeLocal(): string {
  const now = new Date();
  now.setSeconds(0, 0);
  return now.toISOString().slice(0, 16);
}

export default function TimeZoneConverter() {
  const [baseDateTime, setBaseDateTime] = useState(todayDateTimeLocal());
  const [baseTZ, setBaseTZ] = useState('America/New_York');
  const [zones, setZones] = useState(['Europe/London', 'Asia/Tokyo', 'America/Los_Angeles']);
  const [newZone, setNewZone] = useState(TIMEZONES[0]);

  const date = useMemo(() => new Date(baseDateTime), [baseDateTime]);

  function addZone() {
    if (!zones.includes(newZone)) setZones((z) => [...z, newZone]);
  }

  function removeZone(tz: string) {
    setZones((z) => z.filter((t) => t !== tz));
  }

  return (
    <div className="space-y-5">
      {/* Base time */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-3">
        <p className="text-sm font-semibold text-zinc-700">Base Time</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Date & Time</label>
            <input type="datetime-local" value={baseDateTime} onChange={(e) => setBaseDateTime(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Timezone</label>
            <select value={baseTZ} onChange={(e) => setBaseTZ(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
              {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Conversions */}
      <div className="space-y-2">
        {zones.map((tz) => {
          const good = isGoodHour(tz, date);
          return (
            <div key={tz} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${good ? 'border-green-200 bg-green-50' : 'border-zinc-200 bg-white'}`}>
              <div>
                <p className="text-xs text-zinc-500">{tz}</p>
                <p className="text-base font-semibold text-zinc-900">{formatTZ(tz, date)}</p>
                {good && <p className="text-xs text-green-600">Business hours</p>}
              </div>
              <button type="button" onClick={() => removeZone(tz)} className="text-zinc-300 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add zone */}
      <div className="flex gap-2">
        <select value={newZone} onChange={(e) => setNewZone(e.target.value)}
          className="flex-1 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
          {TIMEZONES.filter((tz) => !zones.includes(tz) && tz !== baseTZ).map((tz) => <option key={tz} value={tz}>{tz}</option>)}
        </select>
        <button type="button" onClick={addZone}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors">
          <Plus size={14} /> Add
        </button>
      </div>

      <p className="text-xs text-zinc-400">Green = business hours (9am–5pm). Conversion uses your browser&apos;s native Intl API — DST is handled automatically.</p>
    </div>
  );
}
