'use client';

import { useState, useMemo } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { generateId } from '@/lib/utils';

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0,
};

const LETTER_GRADES = Object.keys(GRADE_POINTS);

interface Course { id: string; name: string; grade: string; credits: number; }

function getDefault(): Course[] {
  return [
    { id: generateId(), name: 'Introduction to Math', grade: 'A', credits: 3 },
    { id: generateId(), name: 'English Composition', grade: 'B+', credits: 3 },
    { id: generateId(), name: 'Chemistry Lab', grade: 'B', credits: 4 },
  ];
}

function gpaColor(gpa: number): string {
  if (gpa >= 3.7) return 'text-green-700';
  if (gpa >= 3.0) return 'text-blue-700';
  if (gpa >= 2.0) return 'text-amber-700';
  return 'text-red-700';
}

function gpaLabel(gpa: number): string {
  if (gpa >= 3.7) return 'A range — Excellent';
  if (gpa >= 3.3) return 'B+ range — Very Good';
  if (gpa >= 3.0) return 'B range — Good';
  if (gpa >= 2.7) return 'B- range — Above Average';
  if (gpa >= 2.0) return 'C range — Satisfactory';
  if (gpa >= 1.0) return 'D range — Below Average';
  return 'F — Failing';
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>(getDefault);

  function updateCourse(id: string, field: keyof Course, value: string | number) {
    setCourses((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));
  }

  function addCourse() {
    setCourses((prev) => [...prev, { id: generateId(), name: '', grade: 'A', credits: 3 }]);
  }

  function removeCourse(id: string) {
    setCourses((prev) => prev.length > 1 ? prev.filter((c) => c.id !== id) : prev);
  }

  const { gpa, totalCredits, totalPoints } = useMemo(() => {
    const valid = courses.filter((c) => c.credits > 0 && c.grade in GRADE_POINTS);
    const pts = valid.reduce((s, c) => s + GRADE_POINTS[c.grade] * c.credits, 0);
    const creds = valid.reduce((s, c) => s + c.credits, 0);
    return { gpa: creds > 0 ? pts / creds : 0, totalCredits: creds, totalPoints: pts };
  }, [courses]);

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-600">Course</th>
              <th className="w-28 px-3 py-2.5 text-left font-medium text-zinc-600">Grade</th>
              <th className="w-24 px-3 py-2.5 text-left font-medium text-zinc-600">Credits</th>
              <th className="w-24 px-3 py-2.5 text-left font-medium text-zinc-600">Points</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-zinc-100">
                <td className="px-4 py-2">
                  <input value={course.name} onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Course name"
                    className="w-full rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </td>
                <td className="px-3 py-2">
                  <select value={course.grade} onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                    {LETTER_GRADES.map((g) => <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>)}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input type="number" value={course.credits} min={1} max={6} step={0.5}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-zinc-200 px-2.5 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </td>
                <td className="px-3 py-2 text-zinc-500 text-xs">
                  {(GRADE_POINTS[course.grade] * course.credits).toFixed(2)}
                </td>
                <td className="px-2 py-2">
                  <button type="button" onClick={() => removeCourse(course.id)}
                    className="flex items-center justify-center text-zinc-300 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" onClick={addCourse}
        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
        <Plus size={14} /> Add course
      </button>

      {/* Result */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">Your GPA</p>
            <p className={`text-5xl font-bold tabular-nums ${gpaColor(gpa)}`}>{gpa.toFixed(2)}</p>
            <p className={`mt-1 text-sm font-medium ${gpaColor(gpa)}`}>{totalCredits > 0 ? gpaLabel(gpa) : '—'}</p>
          </div>
          <div className="text-right text-sm text-zinc-500 space-y-1">
            <p>Total Credits: <strong className="text-zinc-900">{totalCredits}</strong></p>
            <p>Quality Points: <strong className="text-zinc-900">{totalPoints.toFixed(2)}</strong></p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        Uses the standard 4.0 scale. A+ = A = 4.0. Verify your institution&apos;s specific grade point scale as some schools have minor variations.
      </div>
    </div>
  );
}
