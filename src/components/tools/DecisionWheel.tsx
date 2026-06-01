'use client';

import { useState, useRef, useCallback } from 'react';
import Button from '@/components/ui/Button';

const COLORS = ['#18181b','#3f3f46','#52525b','#71717a','#a1a1aa','#d4d4d8','#e4e4e7','#f4f4f5'];

function getSecureRandom(): number {
  const arr = crypto.getRandomValues(new Uint32Array(1));
  return arr[0] / 0x100000000;
}

export default function DecisionWheel() {
  const [optionsText, setOptionsText] = useState('Pizza\nBurger\nSushi\nTacos\nSalad');
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState('');
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGGElement>(null);
  const currentRotationRef = useRef(0);

  const options = optionsText.split('\n').map((s) => s.trim()).filter(Boolean);
  const N = options.length;

  const spin = useCallback(() => {
    if (N < 2 || spinning) return;
    setSpinning(true);
    setWinner('');

    const fullSpins = 5 + Math.floor(getSecureRandom() * 5);
    const winnerIdx = Math.floor(getSecureRandom() * N);
    const segAngle = 360 / N;
    const targetAngle = fullSpins * 360 + (360 - winnerIdx * segAngle - segAngle / 2);
    const finalRotation = currentRotationRef.current + targetAngle;

    setRotation(finalRotation);
    currentRotationRef.current = finalRotation % 360;

    setTimeout(() => {
      setWinner(options[winnerIdx]);
      setSpinning(false);
    }, 3500);
  }, [N, options, spinning]);

  if (N === 0) return (
    <div className="mx-auto max-w-lg space-y-4">
      <textarea value={optionsText} onChange={(e) => setOptionsText(e.target.value)} rows={6}
        placeholder="Enter options, one per line"
        className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
    </div>
  );

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  const segAngle = (2 * Math.PI) / N;

  const segments = options.map((opt, i) => {
    const startAngle = i * segAngle - Math.PI / 2;
    const endAngle = startAngle + segAngle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = segAngle > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const midAngle = startAngle + segAngle / 2;
    const textR = r * 0.65;
    const tx = cx + textR * Math.cos(midAngle);
    const ty = cy + textR * Math.sin(midAngle);
    const rotateDeg = (midAngle * 180) / Math.PI + 90;
    return { path, tx, ty, rotateDeg, opt, color: COLORS[i % COLORS.length] };
  });

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Options (one per line)</label>
          <textarea value={optionsText} onChange={(e) => { setOptionsText(e.target.value); setWinner(''); }} rows={8}
            disabled={spinning}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:opacity-50" />
          <p className="mt-1 text-xs text-zinc-400">{N} options</p>
        </div>

        {/* Wheel */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {/* Pointer */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-xl">▼</div>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <g ref={wheelRef} style={{ transformOrigin: `${cx}px ${cy}px`, transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none' }}>
                {segments.map((seg, i) => (
                  <g key={i}>
                    <path d={seg.path} fill={seg.color} stroke="white" strokeWidth="1.5" />
                    <text x={seg.tx} y={seg.ty} textAnchor="middle" dominantBaseline="middle"
                      transform={`rotate(${seg.rotateDeg}, ${seg.tx}, ${seg.ty})`}
                      fill="white" fontSize="11" fontWeight="600" style={{ userSelect: 'none' }}>
                      {seg.opt.length > 8 ? seg.opt.slice(0, 7) + '…' : seg.opt}
                    </text>
                  </g>
                ))}
                <circle cx={cx} cy={cy} r={12} fill="white" stroke="#e4e4e7" strokeWidth="2" />
              </g>
            </svg>
          </div>

          <Button type="button" variant="primary" onClick={spin} disabled={spinning || N < 2}>
            {spinning ? 'Spinning...' : 'Spin!'}
          </Button>

          {winner && !spinning && (
            <div className="rounded-xl border border-zinc-900 bg-zinc-900 px-6 py-3 text-center">
              <p className="text-xs text-zinc-400">Winner</p>
              <p className="text-xl font-bold text-white">{winner}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
