'use client';

import { useState, useCallback } from 'react';
import { Trash2, Plus, Download, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getCurrencySymbol, generateId } from '@/lib/utils';
import type { Currency } from '@/types';

interface ReceiptItem { id: string; description: string; quantity: number; rate: number; }
type PayMethod = 'Cash' | 'Card' | 'Check' | 'Other';

interface ReceiptData {
  businessName: string; businessAddress: string; businessPhone: string;
  customerName: string;
  receiptNumber: string; date: string;
  items: ReceiptItem[];
  taxRate: number;
  paymentMethod: PayMethod;
  amountPaid: number;
  notes: string;
  currency: Currency;
}

function today() { return new Date().toISOString().slice(0, 10); }

function getDefault(): ReceiptData {
  return { businessName: '', businessAddress: '', businessPhone: '', customerName: '', receiptNumber: 'REC-001', date: today(), items: [{ id: generateId(), description: '', quantity: 1, rate: 0 }], taxRate: 0, paymentMethod: 'Cash', amountPaid: 0, notes: '', currency: 'USD' };
}

function calcTotals(items: ReceiptItem[], taxRate: number) {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

const STORAGE_KEY = 'utulio-receipt';

export default function ReceiptGenerator() {
  const [data, setData] = useState<ReceiptData>(() => {
    if (typeof window !== 'undefined') {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || getDefault(); } catch { return getDefault(); }
    }
    return getDefault();
  });

  function set<K extends keyof ReceiptData>(k: K, v: ReceiptData[K]) {
    setData((d) => { const n = { ...d, [k]: v }; if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }

  function updateItem(id: string, field: keyof ReceiptItem, value: string | number) {
    set('items', data.items.map((i) => i.id === id ? { ...i, [field]: value } : i));
  }

  function addItem() { set('items', [...data.items, { id: generateId(), description: '', quantity: 1, rate: 0 }]); }
  function removeItem(id: string) { set('items', data.items.filter((i) => i.id !== id)); }

  const { subtotal, tax, total } = calcTotals(data.items, data.taxRate);
  const change = data.amountPaid - total;
  const sym = getCurrencySymbol(data.currency);

  const downloadPDF = useCallback(async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const mg = 40; let y = mg;
    const line = (txt: string, size = 10, bold = false) => {
      doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.text(txt, mg, y); y += size * 1.5;
    };
    line('RECEIPT', 22, true); y += 4;
    line(`#${data.receiptNumber}  |  ${data.date}`, 10);
    if (data.businessName) { y += 8; line(data.businessName, 11, true); if (data.businessAddress) line(data.businessAddress); if (data.businessPhone) line(data.businessPhone); }
    if (data.customerName) { y += 8; line(`Customer: ${data.customerName}`); }
    y += 12;
    doc.setDrawColor(200); doc.line(mg, y, 555, y); y += 12;
    line('Description  |  Qty  |  Rate  |  Amount', 9, true); y += 4;
    data.items.forEach((item) => { if (item.description) line(`${item.description}  |  ${item.quantity}  |  ${sym}${item.rate.toFixed(2)}  |  ${sym}${(item.quantity * item.rate).toFixed(2)}`); });
    y += 8; doc.line(mg, y, 555, y); y += 12;
    if (data.taxRate > 0) { line(`Subtotal: ${sym}${subtotal.toFixed(2)}`); line(`Tax (${data.taxRate}%): ${sym}${tax.toFixed(2)}`); }
    line(`TOTAL: ${sym}${total.toFixed(2)}`, 12, true);
    line(`Payment: ${data.paymentMethod}`, 10);
    if (data.amountPaid >= total) line(`Amount Paid: ${sym}${data.amountPaid.toFixed(2)}  |  Change: ${sym}${Math.max(0, change).toFixed(2)}`);
    if (data.notes) { y += 8; line(data.notes, 9); }
    doc.save(`receipt-${data.receiptNumber}.pdf`);
  }, [data, subtotal, tax, total, change, sym]);

  function reset() { const d = getDefault(); setData(d); if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY); }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Business Info</p>
            {(['businessName', 'businessAddress', 'businessPhone'] as const).map((k) => (
              <input key={k} value={data[k]} onChange={(e) => set(k, e.target.value)}
                placeholder={{ businessName: 'Business name', businessAddress: 'Address', businessPhone: 'Phone' }[k]}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            ))}
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Receipt Details</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Receipt #</label>
                <input value={data.receiptNumber} onChange={(e) => set('receiptNumber', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Date</label>
                <input type="date" value={data.date} onChange={(e) => set('date', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
            </div>
            <input value={data.customerName} onChange={(e) => set('customerName', e.target.value)}
              placeholder="Customer name (optional)"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>

          {/* Items */}
          <div className="rounded-xl border border-zinc-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Items</p>
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
                <button type="button" onClick={() => removeItem(item.id)} className="flex items-center justify-center text-zinc-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addItem} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900">
              <Plus size={14} /> Add item
            </button>
          </div>

          {/* Payment */}
          <div className="rounded-xl border border-zinc-200 p-5 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Payment</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Tax Rate (%)</label>
                <input type="number" value={data.taxRate} min={0} max={30} step={0.5} onChange={(e) => set('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Payment Method</label>
                <select value={data.paymentMethod} onChange={(e) => set('paymentMethod', e.target.value as PayMethod)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                  {(['Cash', 'Card', 'Check', 'Other'] as PayMethod[]).map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            {data.paymentMethod === 'Cash' && (
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Amount Paid ({sym})</label>
                <input type="number" value={data.amountPaid} min={0} step={0.01} onChange={(e) => set('amountPaid', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
            )}
            <textarea value={data.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Notes (optional)" rows={2}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="text-2xl font-bold text-zinc-900">RECEIPT</div>
                <div className="mt-1 text-zinc-500">#{data.receiptNumber}</div>
              </div>
              <div className="text-right text-xs text-zinc-500">
                {data.date}
                {data.businessName && <div className="mt-1 font-medium text-zinc-800">{data.businessName}</div>}
              </div>
            </div>
            {data.customerName && <p className="mb-3 text-xs text-zinc-500">Customer: {data.customerName}</p>}
            <div className="border-t border-zinc-100 pt-3 space-y-1">
              {data.items.map((item) => item.description ? (
                <div key={item.id} className="flex justify-between text-xs">
                  <span>{item.description} × {item.quantity}</span>
                  <span>{sym}{(item.quantity * item.rate).toFixed(2)}</span>
                </div>
              ) : null)}
            </div>
            <div className="mt-3 border-t border-zinc-100 pt-3 space-y-1 text-xs">
              <div className="flex justify-between"><span>Subtotal</span><span>{sym}{subtotal.toFixed(2)}</span></div>
              {data.taxRate > 0 && <div className="flex justify-between text-zinc-500"><span>Tax ({data.taxRate}%)</span><span>{sym}{tax.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-base text-zinc-900 pt-1">
                <span>Total</span><span>{sym}{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500 pt-1"><span>Payment</span><span>{data.paymentMethod}</span></div>
              {data.paymentMethod === 'Cash' && data.amountPaid > 0 && (
                <>
                  <div className="flex justify-between"><span>Amount Paid</span><span>{sym}{data.amountPaid.toFixed(2)}</span></div>
                  <div className="flex justify-between text-green-700"><span>Change</span><span>{sym}{Math.max(0, change).toFixed(2)}</span></div>
                </>
              )}
            </div>
            {data.notes && <p className="mt-3 text-xs text-zinc-400">{data.notes}</p>}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="primary" onClick={downloadPDF} className="flex-1 flex items-center justify-center gap-2">
              <Download size={14} /> Download PDF
            </Button>
            <Button type="button" variant="secondary" onClick={reset} className="flex items-center gap-1.5">
              <RotateCcw size={14} /> Reset
            </Button>
          </div>
          <p className="text-center text-xs text-zinc-400">Auto-saved to your browser</p>
        </div>
      </div>
    </div>
  );
}
