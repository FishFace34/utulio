import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950': variant === 'primary',
          'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900':
            variant === 'secondary',
          'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900': variant === 'ghost',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        },
        {
          'h-8 gap-1.5 px-3 text-sm': size === 'sm',
          'h-10 gap-2 px-4 text-sm': size === 'md',
          'h-11 gap-2 px-5 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
