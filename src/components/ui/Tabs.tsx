'use client';

import { useRef, useEffect } from 'react';

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent, currentId: string) {
    const ids = tabs.map((t) => t.id);
    const idx = ids.indexOf(currentId);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(ids[(idx + 1) % ids.length]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(ids[(idx - 1 + ids.length) % ids.length]);
    }
  }

  useEffect(() => {
    const activeBtn = listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    activeBtn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeTab]);

  return (
    <div
      ref={listRef}
      role="tablist"
      className="flex overflow-x-auto gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1 scrollbar-none"
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          type="button"
          aria-selected={activeTab === id}
          onClick={() => onChange(id)}
          onKeyDown={(e) => handleKeyDown(e, id)}
          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
            activeTab === id
              ? 'bg-white text-zinc-900 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
