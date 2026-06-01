import Badge from './Badge';

interface ToolHeroProps {
  title: string;
  description: string;
  category?: string;
  categoryVariant?: 'default' | 'business' | 'developer' | 'freelancer' | 'utility' | 'finance' | 'student';
}

export default function ToolHero({
  title,
  description,
  category,
  categoryVariant = 'default',
}: ToolHeroProps) {
  return (
    <div className="pt-12 pb-8 text-center">
      <div className="mx-auto max-w-[768px]">
        {category && (
          <div className="mb-4">
            <Badge variant={categoryVariant}>{category}</Badge>
          </div>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-[600px] text-lg text-zinc-600">{description}</p>
      </div>
    </div>
  );
}
