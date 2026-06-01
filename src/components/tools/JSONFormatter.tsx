'use client';

import { useState, useCallback } from 'react';
import CodePanel from '@/components/ui/CodePanel';
import Button from '@/components/ui/Button';

type IndentSize = 2 | 4 | 'tab';

function formatJSON(input: string, indent: IndentSize): { output: string; error: string | null; stats: { keys: number; depth: number; bytes: number } | null } {
  try {
    const parsed = JSON.parse(input);
    const indentArg = indent === 'tab' ? '\t' : indent;
    const output = JSON.stringify(parsed, null, indentArg);

    // Count keys and depth
    let keys = 0;
    let maxDepth = 0;
    function traverse(obj: unknown, depth: number) {
      if (depth > maxDepth) maxDepth = depth;
      if (Array.isArray(obj)) {
        obj.forEach((item) => traverse(item, depth + 1));
      } else if (obj !== null && typeof obj === 'object') {
        for (const key of Object.keys(obj as Record<string, unknown>)) {
          keys++;
          traverse((obj as Record<string, unknown>)[key], depth + 1);
        }
      }
    }
    traverse(parsed, 0);

    return {
      output,
      error: null,
      stats: { keys, depth: maxDepth, bytes: new Blob([output]).size },
    };
  } catch (e) {
    return { output: '', error: (e as Error).message, stats: null };
  }
}

function minifyJSON(input: string): { output: string; error: string | null } {
  try {
    return { output: JSON.stringify(JSON.parse(input)), error: null };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<IndentSize>(2);
  const [stats, setStats] = useState<{ keys: number; depth: number; bytes: number } | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleFormat = useCallback(() => {
    const result = formatJSON(input, indent);
    setOutput(result.output);
    setError(result.error);
    setStats(result.stats);
    setIsValid(!result.error);
  }, [input, indent]);

  const handleMinify = useCallback(() => {
    const result = minifyJSON(input);
    setOutput(result.output);
    setError(result.error);
    setStats(null);
    setIsValid(!result.error);
  }, [input]);

  const handleValidate = useCallback(() => {
    try {
      JSON.parse(input);
      setError(null);
      setIsValid(true);
    } catch (e) {
      setError((e as Error).message);
      setIsValid(false);
    }
  }, [input]);

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setStats(null);
    setIsValid(null);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="primary" size="sm" onClick={handleFormat}>
          Format
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={handleMinify}>
          Minify
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={handleValidate}>
          Validate
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-zinc-600">Indent:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value === 'tab' ? 'tab' : (parseInt(e.target.value) as 2 | 4))}
            className="rounded-lg border border-zinc-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value="tab">Tab</option>
          </select>
        </div>
      </div>

      {/* Validity indicator */}
      {isValid !== null && (
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${isValid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
        </div>
      )}

      {/* Panels */}
      <div className="grid gap-4 lg:grid-cols-2">
        <CodePanel
          label="Input JSON"
          value={input}
          onChange={setInput}
          placeholder='Paste your JSON here, e.g. {"name": "Alice", "age": 30}'
        />
        <CodePanel
          label="Output"
          value={output}
          readOnly
          error={error ?? undefined}
          showCopy={!!output}
          placeholder="Formatted output will appear here"
        />
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex gap-6 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
          <span><strong className="text-zinc-900">{stats.keys.toLocaleString()}</strong> keys</span>
          <span><strong className="text-zinc-900">{stats.depth}</strong> max depth</span>
          <span><strong className="text-zinc-900">{stats.bytes.toLocaleString()}</strong> bytes</span>
        </div>
      )}
    </div>
  );
}
