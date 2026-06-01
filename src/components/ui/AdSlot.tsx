import { cn } from '@/lib/utils';

interface AdSlotProps {
  slot: 'header' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

const HEIGHT: Record<AdSlotProps['slot'], string> = {
  header: 'min-h-[90px]',
  'in-content': 'min-h-[250px]',
  sidebar: 'min-h-[600px]',
  footer: 'min-h-[90px]',
};

export default function AdSlot({ slot, className }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      className={cn(
        'flex items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50 text-xs text-zinc-400',
        HEIGHT[slot],
        className
      )}
      aria-hidden="true"
    >
      Ad space
    </div>
  );
}
