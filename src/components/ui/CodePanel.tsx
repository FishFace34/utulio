import { cn } from '@/lib/utils';
import CopyButton from './CopyButton';

interface CodePanelProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  label: string;
  error?: string;
  monospace?: boolean;
  showCopy?: boolean;
}

export default function CodePanel({
  value,
  onChange,
  readOnly = false,
  placeholder,
  label,
  error,
  monospace = true,
  showCopy = false,
}: CodePanelProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-700">{label}</label>
        {showCopy && value && <CopyButton text={value} />}
      </div>
      <textarea
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        className={cn(
          'min-h-[300px] w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900',
          monospace && 'font-mono',
          error ? 'border-red-400' : 'border-zinc-200',
          readOnly && 'cursor-default bg-zinc-50'
        )}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
