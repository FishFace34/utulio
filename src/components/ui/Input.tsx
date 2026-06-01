import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  prefix?: string;
  error?: string;
}

export default function Input({ label, helperText, prefix, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-700">
          {label}
        </label>
      )}
      <div className="flex">
        {prefix && (
          <span className="flex items-center rounded-l-lg border border-r-0 border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'h-10 w-full border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder-zinc-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-zinc-900',
            prefix ? 'rounded-r-lg' : 'rounded-lg',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      </div>
      {helperText && !error && <p className="text-xs text-zinc-500">{helperText}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
