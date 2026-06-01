import Link from 'next/link';
import {
  Calculator, FileText, Briefcase, Lock, Type,
  Landmark, TrendingDown, LineChart, Percent, Scale, Car, TrendingUp, Clock,
  Braces, SearchCode, Binary, Palette, QrCode, GraduationCap, Ratio,
} from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import type { Tool } from '@/types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Calculator,
  FileText,
  Briefcase,
  Lock,
  Type,
  Landmark,
  TrendingDown,
  LineChart,
  Percent,
  Scale,
  Car,
  TrendingUp,
  Clock,
  Braces,
  SearchCode,
  Binary,
  Palette,
  QrCode,
  GraduationCap,
  Ratio,
};

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = ICON_MAP[tool.icon] || Calculator;

  return (
    <Link href={tool.href} className="group block">
      <Card hover className="flex h-full flex-col p-5 transition-all group-hover:border-zinc-300">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
            <Icon size={18} strokeWidth={1.5} />
          </div>
          <Badge variant={tool.category}>{tool.category}</Badge>
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-zinc-900">{tool.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-zinc-500">{tool.description}</p>
        <div className="mt-4 text-xs font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors">
          Open tool →
        </div>
      </Card>
    </Link>
  );
}
