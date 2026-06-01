'use client';

import { useState, useMemo } from 'react';
import CopyButton from '@/components/ui/CopyButton';

interface CronFields {
  minute: string; hour: string; dayOfMonth: string; month: string; dayOfWeek: string;
}

const PRESETS = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every day at 9am', cron: '0 9 * * *' },
  { label: 'Every Monday', cron: '0 0 * * 1' },
  { label: 'Every weekday at 9am', cron: '0 9 * * 1-5' },
  { label: 'Every Sunday at noon', cron: '0 12 * * 0' },
  { label: 'First of month', cron: '0 0 1 * *' },
  { label: 'Twice daily (9am & 5pm)', cron: '0 9,17 * * *' },
];

function humanize(f: CronFields): string {
  const { minute: min, hour, dayOfMonth: dom, month, dayOfWeek: dow } = f;
  const parts: string[] = [];

  const minLabel = min === '*' ? 'every minute' : `at minute ${min}`;
  const hourLabel = hour === '*' ? 'every hour' : `${hour.includes(',') ? 'hours ' + hour : 'hour ' + hour}`;
  const domLabel = dom === '*' ? 'every day' : `day ${dom}`;
  const monthLabel = month === '*' ? 'every month' : `month(s) ${month}`;
  const dowLabel = dow === '*' ? 'every day of the week' : `day(s) of week: ${dow}`;

  if (min === '0' && hour !== '*' && dom === '*' && month === '*' && dow === '*') {
    return `At ${hour.padStart(2, '0')}:00 every day`;
  }
  if (min === '0' && hour === '9' && dow === '1-5') return 'At 09:00, Monday through Friday';
  if (min === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') return 'Every minute';
  if (min === '0' && hour === '*') return 'At the start of every hour';

  parts.push(minLabel, hourLabel, domLabel, monthLabel, dowLabel);
  return parts.join(', ');
}

function getNextRuns(expr: string, count = 5): string[] {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const results: string[] = [];
  let d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  let tries = 0;
  while (results.length < count && tries < 10000) {
    tries++;
    if (matchesCron(parts, d)) {
      results.push(d.toLocaleString());
    }
    d = new Date(d.getTime() + 60 * 1000);
  }
  return results;
}

function matchField(field: string, value: number): boolean {
  if (field === '*') return true;
  return field.split(',').some((part) => {
    if (part.includes('-')) {
      const [lo, hi] = part.split('-').map(Number);
      return value >= lo && value <= hi;
    }
    if (part.includes('/')) {
      const [, step] = part.split('/');
      return value % parseInt(step) === 0;
    }
    return parseInt(part) === value;
  });
}

function matchesCron(parts: string[], d: Date): boolean {
  return matchField(parts[0], d.getMinutes()) &&
    matchField(parts[1], d.getHours()) &&
    matchField(parts[2], d.getDate()) &&
    matchField(parts[3], d.getMonth() + 1) &&
    matchField(parts[4], d.getDay());
}

function parseCron(expr: string): CronFields {
  const p = expr.trim().split(/\s+/);
  if (p.length !== 5) return { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' };
  return { minute: p[0], hour: p[1], dayOfMonth: p[2], month: p[3], dayOfWeek: p[4] };
}

interface CronFieldProps { label: string; fieldKey: keyof CronFields; value: string; onChange: (key: keyof CronFields, val: string) => void; }
function CronField({ label, fieldKey, value, onChange }: CronFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-zinc-500">{label}</label>
      <input value={value} onChange={(e) => onChange(fieldKey, e.target.value)}
        className="w-full rounded-lg border border-zinc-200 px-2.5 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
    </div>
  );
}

export default function CronExpressionGenerator() {
  const [fields, setFields] = useState<CronFields>({ minute: '0', hour: '9', dayOfMonth: '*', month: '*', dayOfWeek: '1-5' });
  const [rawMode, setRawMode] = useState(false);
  const [rawExpr, setRawExpr] = useState('0 9 * * 1-5');

  const expr = rawMode ? rawExpr : `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
  const parsed = rawMode ? parseCron(rawExpr) : fields;
  const explanation = humanize(parsed);
  const nextRuns = useMemo(() => getNextRuns(expr), [expr]);

  function applyPreset(cron: string) {
    setRawMode(false);
    const p = parseCron(cron);
    setFields(p);
  }

  function handleFieldChange(key: keyof CronFields, val: string) {
    setFields((f) => ({ ...f, [key]: val }));
  }

  return (
    <div className="space-y-5">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.cron} type="button" onClick={() => applyPreset(p.cron)}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:border-zinc-500 hover:text-zinc-900 transition-colors">
            {p.label}
          </button>
        ))}
      </div>

      {/* Mode toggle */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={rawMode} onChange={(e) => setRawMode(e.target.checked)} className="sr-only" />
          <div className={`h-4 w-8 rounded-full transition-colors ${rawMode ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
          <span className="text-sm text-zinc-600">Raw mode</span>
        </label>
      </div>

      {rawMode ? (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Cron Expression</label>
          <input value={rawExpr} onChange={(e) => setRawExpr(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
            placeholder="* * * * *" />
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="grid grid-cols-5 gap-3">
            <CronField label="Minute (0-59)" fieldKey="minute" value={fields.minute} onChange={handleFieldChange} />
            <CronField label="Hour (0-23)" fieldKey="hour" value={fields.hour} onChange={handleFieldChange} />
            <CronField label="Day of Month (1-31)" fieldKey="dayOfMonth" value={fields.dayOfMonth} onChange={handleFieldChange} />
            <CronField label="Month (1-12)" fieldKey="month" value={fields.month} onChange={handleFieldChange} />
            <CronField label="Day of Week (0-6)" fieldKey="dayOfWeek" value={fields.dayOfWeek} onChange={handleFieldChange} />
          </div>
          <div className="mt-3 flex justify-between text-xs text-zinc-400">
            <span>minute</span><span>hour</span><span>day/month</span><span>month</span><span>day/week</span>
          </div>
        </div>
      )}

      {/* Result */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5">
          <span className="text-xs font-semibold text-zinc-700">Expression</span>
          <CopyButton text={expr} />
        </div>
        <div className="p-4">
          <p className="font-mono text-lg font-bold text-zinc-900">{expr}</p>
          <p className="mt-1 text-sm text-zinc-600">{explanation}</p>
        </div>
      </div>

      {/* Next runs */}
      {nextRuns.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="mb-3 text-xs font-semibold text-zinc-700">Next 5 Scheduled Runs</p>
          <ul className="space-y-1">
            {nextRuns.map((run, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                {run}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        Fields accept: <code className="text-zinc-700">*</code> (any), numbers, ranges (<code className="text-zinc-700">1-5</code>), lists (<code className="text-zinc-700">1,3,5</code>), steps (<code className="text-zinc-700">*/2</code>). Day-of-week: 0=Sunday, 6=Saturday.
      </div>
    </div>
  );
}
