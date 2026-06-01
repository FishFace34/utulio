import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'business' | 'developer' | 'freelancer' | 'utility' | 'finance' | 'student';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-zinc-100 text-zinc-700',
  business: 'bg-blue-50 text-blue-700',
  developer: 'bg-purple-50 text-purple-700',
  freelancer: 'bg-emerald-50 text-emerald-700',
  utility: 'bg-amber-50 text-amber-700',
  finance: 'bg-green-50 text-green-700',
  student: 'bg-sky-50 text-sky-700',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
