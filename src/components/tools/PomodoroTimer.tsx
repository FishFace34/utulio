'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type Phase = 'work' | 'short' | 'long';

const PHASE_LABELS: Record<Phase, string> = { work: 'Focus', short: 'Short Break', long: 'Long Break' };
const PHASE_COLORS: Record<Phase, string> = { work: 'text-zinc-900', short: 'text-green-700', long: 'text-blue-700' };
const PHASE_BG: Record<Phase, string> = { work: 'bg-zinc-900', short: 'bg-green-600', long: 'bg-blue-600' };

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch { /* ignore if AudioContext unavailable */ }
}

function padTime(n: number) { return String(n).padStart(2, '0'); }

export default function PomodoroTimer() {
  const [workMins, setWorkMins] = useState(25);
  const [shortMins, setShortMins] = useState(5);
  const [longMins, setLongMins] = useState(15);
  const [phase, setPhase] = useState<Phase>('work');
  const [secsLeft, setSecsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSecs = phase === 'work' ? workMins * 60 : phase === 'short' ? shortMins * 60 : longMins * 60;
  const progress = totalSecs > 0 ? (totalSecs - secsLeft) / totalSecs : 0;
  const mins = Math.floor(secsLeft / 60);
  const secs = secsLeft % 60;

  useEffect(() => {
    const title = running ? `${padTime(mins)}:${padTime(secs)} — ${PHASE_LABELS[phase]}` : 'Pomodoro Timer';
    if (typeof document !== 'undefined') document.title = title;
    return () => { if (typeof document !== 'undefined') document.title = 'Pomodoro Timer | Utulio'; };
  }, [mins, secs, running, phase]);

  const advance = useCallback(() => {
    playBeep();
    setSessions((s) => {
      if (phase === 'work') {
        const newSessions = s + 1;
        if (newSessions % 4 === 0) { setPhase('long'); setSecsLeft(longMins * 60); }
        else { setPhase('short'); setSecsLeft(shortMins * 60); }
        return newSessions;
      } else { setPhase('work'); setSecsLeft(workMins * 60); return s; }
    });
    setRunning(false);
  }, [phase, workMins, shortMins, longMins]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecsLeft((prev) => {
          if (prev <= 1) { advance(); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, advance]);

  function reset() {
    setRunning(false);
    setPhase('work');
    setSecsLeft(workMins * 60);
    setSessions(0);
  }

  function skip() { advance(); }

  function switchPhase(p: Phase) {
    setRunning(false);
    setPhase(p);
    setSecsLeft((p === 'work' ? workMins : p === 'short' ? shortMins : longMins) * 60);
  }

  // SVG ring
  const R = 80, circumference = 2 * Math.PI * R;
  const strokeDash = circumference * (1 - progress);

  return (
    <div className="mx-auto max-w-sm space-y-5">
      {/* Phase tabs */}
      <div className="flex rounded-lg border border-zinc-200 p-1">
        {(['work', 'short', 'long'] as Phase[]).map((p) => (
          <button key={p} type="button" onClick={() => switchPhase(p)}
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${phase === p ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-zinc-900'}`}>
            {PHASE_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="#e4e4e7" strokeWidth="8" />
            <circle cx="100" cy="100" r={R} fill="none" strokeWidth="8"
              className={PHASE_BG[phase].replace('bg-', 'stroke-')}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold tabular-nums ${PHASE_COLORS[phase]}`}>
              {padTime(mins)}:{padTime(secs)}
            </span>
            <span className="mt-1 text-sm text-zinc-500">{PHASE_LABELS[phase]}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" onClick={reset}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Reset</button>
          <button type="button" onClick={() => setRunning((r) => !r)}
            className={`rounded-xl px-8 py-3 text-base font-semibold text-white transition-colors ${PHASE_BG[phase]} hover:opacity-90`}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button type="button" onClick={skip}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Skip</button>
        </div>

        <p className="text-sm text-zinc-500">Sessions completed: <strong className="text-zinc-900">{sessions}</strong></p>
      </div>

      {/* Settings */}
      <div>
        <button type="button" onClick={() => setShowSettings((s) => !s)}
          className="text-sm text-zinc-500 underline underline-offset-2 hover:text-zinc-900">
          {showSettings ? 'Hide settings' : 'Customize durations'}
        </button>
        {showSettings && (
          <div className="mt-3 grid grid-cols-3 gap-3 rounded-xl border border-zinc-200 p-4">
            {([['Focus (min)', workMins, setWorkMins], ['Short Break', shortMins, setShortMins], ['Long Break', longMins, setLongMins]] as [string, number, (v: number) => void][]).map(([label, val, setter]) => (
              <div key={label}>
                <label className="mb-1 block text-xs text-zinc-500">{label}</label>
                <input type="number" value={val} min={1} max={90}
                  onChange={(e) => { setter(parseInt(e.target.value) || 1); setRunning(false); setSecsLeft(workMins * 60); }}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-zinc-400">Audio cue plays when each interval ends. Works best with sound on.</p>
    </div>
  );
}
