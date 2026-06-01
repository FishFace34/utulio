import { cn } from '@/lib/utils';

interface ResultStatProps {
  label: string;
  value: string;
  highlight?: boolean;
  sublabel?: string;
}

export default function ResultStat({ label, value, highlight = false, sublabel }: ResultStatProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-4',
        highlight
          ? 'bg-zinc-900 text-white'
          : 'border border-zinc-200 bg-white'
      )}
    >
      <p className={cn('text-sm font-medium', highlight ? 'text-zinc-400' : 'text-zinc-500')}>
        {label}
      </p>
      <p
        aria-live="polite"
        className={cn(
          'mt-1 font-bold tabular-nums',
          highlight ? 'text-4xl text-white' : 'text-2xl text-zinc-900'
        )}
      >
        {value}
      </p>
      {sublabel && (
        <p className={cn('mt-1 text-xs', highlight ? 'text-zinc-400' : 'text-zinc-400')}>
          {sublabel}
        </p>
      )}
    </div>
  );
}
