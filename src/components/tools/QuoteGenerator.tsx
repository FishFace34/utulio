'use client';

import { useState, useCallback } from 'react';
import { Trash2, Plus, Download, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getCurrencySymbol, generateId } from '@/lib/utils';
import type { Currency } from '@/types';

interface QuoteItem { id: string; description: string; quantity: number; rate: number; }

interface QuoteData {
  fromName: string; fromAddress: string; fromEmail: string; fromPhone: string;
  toName: string; toAddress: string; toEmail: string;
  quoteNumber: string; issueDate: string; validUntil: string;
  items: QuoteItem[];
  taxRate: number; discount: number;
  notes: string; terms: string;
  currency: Currency;
}

function today() { return new Date().toISOString().slice(0, 10); }
function inDays(n: number) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }

function getDefault(): QuoteData {
  return { fromName: '', fromAddress: '', fromEmail: '', fromPhone: '', toName: '', toAddress: '', toEmail: '', quoteNumber: 'QUO-001', issueDate: today(), validUntil: inDays(30), items: [{ id: generateId(), description: '', quantity: 1, rate: 0 }], taxRate: 0, discount: 0, notes: '', terms: 'Quote valid for 30 days.', currency: 'USD' };
}

const STORAGE_KEY = 'utulio-quote';

export default function QuoteGenerator() {
  const [data, setData] = useState<QuoteData>(() => {
    if (typeof window !== 'undefined') { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || getDefault(); } catch { return getDefault(); } }
    return getDefault();
  });

  function set<K extends keyof QuoteData>(k: K, v: QuoteData[K]) {
    setData((d) => { const n = { ...d, [k]: v }; if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }

  function updateItem(id: string, field: keyof QuoteItem, value: string | number) {
    set('items', data.items.map((i) => i.id === id ? { ...i, [field]: value } : i));
  }

  const subtotal = data.items.reduce((s, i) => s + i.quantity * i.rate, 0);
  const discountAmt = Math.min(data.discount, subtotal);
  const taxable = subtotal - discountAmt;
  const taxAmt = taxable * (data.taxRate / 100);
  const total = taxable + taxAmt;
  const sym = getCurrencySymbol(data.currency);

  const downloadPDF = useCallback(async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const mg = 40; let y = mg;
    const line = (txt: string, size = 10, bold = false) => {
      doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.text(txt, mg, y); y += size * 1.5;
    };
    line('QUOTE / ESTIMATE', 22, true); y += 4;
    line(`Quote #: ${data.quoteNumber}  |  Date: ${data.issueDate}`, 10);
    line(`Valid Until: ${data.validUntil}`, 10, true);
    y += 8;
    if (data.fromName) { line(data.fromName, 11, true); if (data.fromAddress) line(data.fromAddress); if (data.fromEmail) line(data.fromEmail); }
    y += 4;
    if (data.toName) { line(`Bill To: ${data.toName}`, 10, true); if (data.toAddress) line(data.toAddress); if (data.toEmail) line(data.toEmail); }
    y += 8; doc.setDrawColor(200); doc.line(mg, y, 555, y); y += 12;
    line('Description  |  Qty  |  Rate  |  Amount', 9, true); y += 4;
    data.items.forEach((i) => { if (i.description) line(`${i.description}  |  ${i.quantity}  |  ${sym}${i.rate.toFixed(2)}  |  ${sym}${(i.quantity * i.rate).toFixed(2)}`); });
    y += 8; doc.line(mg, y, 555, y); y += 12;
    line(`Subtotal: ${sym}${subtotal.toFixed(2)}`);
    if (discountAmt > 0) line(`Discount: -${sym}${discountAmt.toFixed(2)}`);
    if (data.taxRate > 0) line(`Tax (${data.taxRate}%): ${sym}${taxAmt.toFixed(2)}`);
    line(`TOTAL: ${sym}${total.toFixed(2)}`, 12, true);
    if (data.terms) { y += 8; line(data.terms, 9); }
    if (data.notes) { y += 4; line(data.notes, 9); }
    doc.save(`quote-${data.quoteNumber}.pdf`);
  }, [data, subtotal, discountAmt, taxAmt, total, sym]);

  function reset() { const d = getDefault(); setData(d); if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY); }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
              <p className="text-sm font-semibold text-zinc-700">From (Your Business)</p>
              {(['fromName', 'fromAddress', 'fromEmail', 'fromPhone'] as const).map((k) => (
                <input key={k} value={data[k]} onChange={(e) => set(k, e.target.value)}
                  placeholder={{ fromName: 'Business name', fromAddress: 'Address', fromEmail: 'Email', fromPhone: 'Phone' }[k]}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              ))}
            </div>
            <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
              <p className="text-sm font-semibold text-zinc-700">To (Client)</p>
              {(['toName', 'toAddress', 'toEmail'] as const).map((k) => (
                <input key={k} value={data[k]} onChange={(e) => set(k, e.target.value)}
                  placeholder={{ toName: 'Client name', toAddress: 'Address', toEmail: 'Email' }[k]}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Quote Details</p>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="mb-1 block text-xs text-zinc-500">Quote #</label>
                <input value={data.quoteNumber} onChange={(e) => set('quoteNumber', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
              <div><label className="mb-1 block text-xs text-zinc-500">Issue Date</label>
                <input type="date" value={data.issueDate} onChange={(e) => set('issueDate', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
              <div><label className="mb-1 block text-xs text-zinc-500">Valid Until</label>
                <input type="date" value={data.validUntil} onChange={(e) => set('validUntil', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Line Items</p>
            {data.items.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_60px_80px_32px] gap-2 items-center">
                <input value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} placeholder="Description"
                  className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                <input type="number" value={item.quantity} min={1} onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 1)}
                  className="rounded-lg border border-zinc-200 px-2 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                <div className="relative">
                  <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400">{sym}</span>
                  <input type="number" value={item.rate} min={0} step={0.01} onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-zinc-200 py-1.5 pl-5 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </div>
                <button type="button" onClick={() => set('items', data.items.filter((i) => i.id !== item.id))} className="flex items-center justify-center text-zinc-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set('items', [...data.items, { id: generateId(), description: '', quantity: 1, rate: 0 }])} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900">
              <Plus size={14} /> Add item
            </button>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="mb-1 block text-xs text-zinc-500">Tax Rate (%)</label>
                <input type="number" value={data.taxRate} min={0} max={30} step={0.5} onChange={(e) => set('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
              <div><label className="mb-1 block text-xs text-zinc-500">Discount ({sym})</label>
                <input type="number" value={data.discount} min={0} step={0.01} onChange={(e) => set('discount', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" /></div>
            </div>
            <input value={data.terms} onChange={(e) => set('terms', e.target.value)} placeholder="Terms"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            <textarea value={data.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Notes (optional)" rows={2}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm">
            <div className="mb-1 flex items-start justify-between">
              <div><div className="text-xl font-bold text-zinc-900">QUOTE / ESTIMATE</div><div className="mt-1 text-zinc-500">#{data.quoteNumber}</div></div>
              <div className="text-right text-xs text-zinc-500">{data.issueDate}</div>
            </div>
            {data.validUntil && (
              <div className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                Valid until {data.validUntil}
              </div>
            )}
            <div className="mb-4 grid grid-cols-2 gap-4 text-xs">
              <div>{data.fromName && <div className="font-medium text-zinc-800">{data.fromName}</div>}{data.fromEmail && <div className="text-zinc-400">{data.fromEmail}</div>}</div>
              <div>{data.toName && <div className="font-medium text-zinc-800">{data.toName}</div>}{data.toEmail && <div className="text-zinc-400">{data.toEmail}</div>}</div>
            </div>
            <div className="border-t border-zinc-100 pt-3 space-y-1">
              {data.items.map((i) => i.description ? (
                <div key={i.id} className="flex justify-between text-xs"><span>{i.description} × {i.quantity}</span><span>{sym}{(i.quantity * i.rate).toFixed(2)}</span></div>
              ) : null)}
            </div>
            <div className="mt-3 border-t border-zinc-100 pt-3 space-y-1 text-xs">
              <div className="flex justify-between"><span>Subtotal</span><span>{sym}{subtotal.toFixed(2)}</span></div>
              {discountAmt > 0 && <div className="flex justify-between text-zinc-500"><span>Discount</span><span>-{sym}{discountAmt.toFixed(2)}</span></div>}
              {data.taxRate > 0 && <div className="flex justify-between text-zinc-500"><span>Tax</span><span>{sym}{taxAmt.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-base text-zinc-900 pt-1"><span>Total</span><span>{sym}{total.toFixed(2)}</span></div>
            </div>
            {data.terms && <p className="mt-2 text-xs text-zinc-400">{data.terms}</p>}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="primary" onClick={downloadPDF} className="flex-1 flex items-center justify-center gap-2"><Download size={14} /> Download PDF</Button>
            <Button type="button" variant="secondary" onClick={reset} className="flex items-center gap-1.5"><RotateCcw size={14} /> Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
