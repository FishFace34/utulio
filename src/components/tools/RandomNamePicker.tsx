'use client';

import { useState, useCallback } from 'react';
import Button from '@/components/ui/Button';

function secureRandomInt(max: number): number {
  const range = max;
  const maxValid = Math.floor(0xFFFFFFFF / range) * range;
  let rand: number;
  do {
    rand = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (rand >= maxValid);
  return rand % range;
}

export default function RandomNamePicker() {
  const [namesText, setNamesText] = useState('Alice\nBob\nCharlie\nDavid\nEve\nFrank');
  const [removeAfterPick, setRemoveAfterPick] = useState(false);
  const [pickCount, setPickCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const [animatingName, setAnimatingName] = useState('');
  const [remaining, setRemaining] = useState<string[]>([]);

  const names = namesText.split('\n').map((n) => n.trim()).filter(Boolean);
  const pool = remaining.length > 0 ? remaining : names;

  const pick = useCallback(() => {
    if (pool.length === 0) return;
    const count = Math.min(pickCount, pool.length);
    setAnimating(true);
    setWinners([]);

    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      frame++;
      const idx = secureRandomInt(pool.length);
      setAnimatingName(pool[idx]);
      if (frame >= totalFrames) {
        clearInterval(interval);
        // final picks
        const shuffled = [...pool];
        const picked: string[] = [];
        for (let i = 0; i < count; i++) {
          const ri = secureRandomInt(shuffled.length);
          picked.push(shuffled[ri]);
          shuffled.splice(ri, 1);
        }
        setWinners(picked);
        setAnimating(false);
        setAnimatingName('');
        if (removeAfterPick) {
          setRemaining(shuffled);
        }
      }
    }, 60);
  }, [pool, pickCount, removeAfterPick]);

  function reset() {
    setWinners([]);
    setRemaining([]);
    setAnimatingName('');
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Names (one per line)</label>
        <textarea value={namesText} onChange={(e) => { setNamesText(e.target.value); reset(); }} rows={8} spellCheck={false}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        <p className="mt-1 text-xs text-zinc-400">{names.length} names · {removeAfterPick ? (pool.length) + ' remaining' : 'removing disabled'}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-700">Pick:</label>
          <input type="number" value={pickCount} min={1} max={names.length} onChange={(e) => setPickCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          <span className="text-sm text-zinc-700">winner{pickCount > 1 ? 's' : ''}</span>
        </div>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={removeAfterPick} onChange={(e) => { setRemoveAfterPick(e.target.checked); reset(); }} className="rounded" />
          <span className="text-sm text-zinc-700">Remove winner after picking</span>
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="primary" onClick={pick} disabled={pool.length === 0 || animating}>
          {animating ? 'Picking...' : pool.length === 0 ? 'No names remaining' : `Pick ${pickCount > 1 ? `${pickCount} Winners` : 'a Winner'}`}
        </Button>
        {(winners.length > 0 || remaining.length > 0) && (
          <Button type="button" variant="secondary" onClick={reset}>Reset</Button>
        )}
      </div>

      {/* Animation display */}
      {animating && (
        <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-900 p-8 text-center">
          <p className="text-2xl font-bold text-white animate-pulse">{animatingName}</p>
        </div>
      )}

      {/* Winners */}
      {!animating && winners.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-zinc-700">{winners.length === 1 ? 'Winner!' : 'Winners!'}</p>
          {winners.map((winner, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">{i + 1}</span>
              <span className="text-lg font-semibold text-zinc-900">{winner}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
