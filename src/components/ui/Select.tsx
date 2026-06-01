import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
}

export default function Select({ label, options, helperText, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-zinc-900',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && <p className="text-xs text-zinc-500">{helperText}</p>}
    </div>
  );
}
