'use client';

import { useState, useCallback } from 'react';
import { Trash2, Plus, Download, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getCurrencySymbol, generateId } from '@/lib/utils';
import type { Currency } from '@/types';

interface POItem { id: string; description: string; quantity: number; unitPrice: number; }

interface POData {
  buyerName: string; buyerAddress: string; buyerEmail: string;
  vendorName: string; vendorAddress: string; vendorEmail: string;
  poNumber: string; orderDate: string; deliveryDate: string;
  items: POItem[];
  shipping: number; taxRate: number;
  terms: string; notes: string;
  currency: Currency;
}

function today() { return new Date().toISOString().slice(0, 10); }
function inDays(n: number) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }

function getDefault(): POData {
  return { buyerName: '', buyerAddress: '', buyerEmail: '', vendorName: '', vendorAddress: '', vendorEmail: '', poNumber: 'PO-001', orderDate: today(), deliveryDate: inDays(14), items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0 }], shipping: 0, taxRate: 0, terms: 'Net 30', notes: '', currency: 'USD' };
}

const STORAGE_KEY = 'utulio-po';

export default function PurchaseOrderGenerator() {
  const [data, setData] = useState<POData>(() => {
    if (typeof window !== 'undefined') { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || getDefault(); } catch { return getDefault(); } }
    return getDefault();
  });

  function set<K extends keyof POData>(k: K, v: POData[K]) {
    setData((d) => { const n = { ...d, [k]: v }; if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(n)); return n; });
  }

  function updateItem(id: string, field: keyof POItem, value: string | number) {
    set('items', data.items.map((i) => i.id === id ? { ...i, [field]: value } : i));
  }

  const subtotal = data.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const tax = subtotal * (data.taxRate / 100);
  const total = subtotal + tax + data.shipping;
  const sym = getCurrencySymbol(data.currency);

  const downloadPDF = useCallback(async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const mg = 40; let y = mg;
    const line = (txt: string, size = 10, bold = false) => {
      doc.setFontSize(size); doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.text(txt, mg, y); y += size * 1.5;
    };
    line('PURCHASE ORDER', 22, true); y += 4;
    line(`PO #: ${data.poNumber}  |  Order Date: ${data.orderDate}  |  Delivery: ${data.deliveryDate}`, 10);
    y += 8;
    line('BUYER', 10, true); if (data.buyerName) line(data.buyerName); if (data.buyerAddress) line(data.buyerAddress); if (data.buyerEmail) line(data.buyerEmail);
    y += 4;
    line('VENDOR', 10, true); if (data.vendorName) line(data.vendorName); if (data.vendorAddress) line(data.vendorAddress); if (data.vendorEmail) line(data.vendorEmail);
    y += 8; doc.setDrawColor(200); doc.line(mg, y, 555, y); y += 12;
    line('Description  |  Qty  |  Unit Price  |  Total', 9, true); y += 4;
    data.items.forEach((i) => { if (i.description) line(`${i.description}  |  ${i.quantity}  |  ${sym}${i.unitPrice.toFixed(2)}  |  ${sym}${(i.quantity * i.unitPrice).toFixed(2)}`); });
    y += 8; doc.line(mg, y, 555, y); y += 12;
    line(`Subtotal: ${sym}${subtotal.toFixed(2)}`);
    if (data.taxRate > 0) line(`Tax (${data.taxRate}%): ${sym}${tax.toFixed(2)}`);
    if (data.shipping > 0) line(`Shipping: ${sym}${data.shipping.toFixed(2)}`);
    line(`TOTAL: ${sym}${total.toFixed(2)}`, 12, true);
    if (data.terms) { y += 4; line(`Terms: ${data.terms}`, 9); }
    if (data.notes) { y += 4; line(data.notes, 9); }
    doc.save(`purchase-order-${data.poNumber}.pdf`);
  }, [data, subtotal, tax, total, sym]);

  function reset() { const d = getDefault(); setData(d); if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY); }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
              <p className="text-sm font-semibold text-zinc-700">Buyer</p>
              {(['buyerName', 'buyerAddress', 'buyerEmail'] as const).map((k) => (
                <input key={k} value={data[k]} onChange={(e) => set(k, e.target.value)}
                  placeholder={{ buyerName: 'Company name', buyerAddress: 'Address', buyerEmail: 'Email' }[k]}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              ))}
            </div>
            <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
              <p className="text-sm font-semibold text-zinc-700">Vendor</p>
              {(['vendorName', 'vendorAddress', 'vendorEmail'] as const).map((k) => (
                <input key={k} value={data[k]} onChange={(e) => set(k, e.target.value)}
                  placeholder={{ vendorName: 'Vendor name', vendorAddress: 'Address', vendorEmail: 'Email' }[k]}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
            <p className="text-sm font-semibold text-zinc-700">Order Details</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">PO Number</label>
                <input value={data.poNumber} onChange={(e) => set('poNumber', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Order Date</label>
                <input type="date" value={data.orderDate} onChange={(e) => set('orderDate', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-500">Delivery Date</label>
                <input type="date" value={data.deliveryDate} onChange={(e) => set('deliveryDate', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
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
                  <input type="number" value={item.unitPrice} min={0} step={0.01} onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full rounded-lg border border-zinc-200 py-1.5 pl-5 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                </div>
                <button type="button" onClick={() => set('items', data.items.filter((i) => i.id !== item.id))} className="flex items-center justify-center text-zinc-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => set('items', [...data.items, { id: generateId(), description: '', quantity: 1, unitPrice: 0 }])} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900">
              <Plus size={14} /> Add item
            </button>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="mb-1 block text-xs text-zinc-500">Tax Rate (%)</label>
                <input type="number" value={data.taxRate} min={0} max={30} step={0.5} onChange={(e) => set('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
              <div><label className="mb-1 block text-xs text-zinc-500">Shipping ({sym})</label>
                <input type="number" value={data.shipping} min={0} step={0.01} onChange={(e) => set('shipping', parseFloat(e.target.value) || 0)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
              </div>
            </div>
            <input value={data.terms} onChange={(e) => set('terms', e.target.value)} placeholder="Terms (e.g. Net 30)"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
            <textarea value={data.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Notes (optional)" rows={2}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 text-sm">
            <div className="mb-4 flex items-start justify-between">
              <div><div className="text-xl font-bold text-zinc-900">PURCHASE ORDER</div><div className="mt-1 text-zinc-500">#{data.poNumber}</div></div>
              <div className="text-right text-xs text-zinc-500">{data.orderDate}{data.deliveryDate && <div>Delivery: {data.deliveryDate}</div>}</div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4 text-xs">
              <div><strong className="text-zinc-700">BUYER</strong>{data.buyerName && <div>{data.buyerName}</div>}{data.buyerEmail && <div className="text-zinc-400">{data.buyerEmail}</div>}</div>
              <div><strong className="text-zinc-700">VENDOR</strong>{data.vendorName && <div>{data.vendorName}</div>}{data.vendorEmail && <div className="text-zinc-400">{data.vendorEmail}</div>}</div>
            </div>
            <div className="border-t border-zinc-100 pt-3 space-y-1">
              {data.items.map((i) => i.description ? (
                <div key={i.id} className="flex justify-between text-xs"><span>{i.description} × {i.quantity}</span><span>{sym}{(i.quantity * i.unitPrice).toFixed(2)}</span></div>
              ) : null)}
            </div>
            <div className="mt-3 border-t border-zinc-100 pt-3 space-y-1 text-xs">
              <div className="flex justify-between"><span>Subtotal</span><span>{sym}{subtotal.toFixed(2)}</span></div>
              {data.taxRate > 0 && <div className="flex justify-between text-zinc-500"><span>Tax</span><span>{sym}{tax.toFixed(2)}</span></div>}
              {data.shipping > 0 && <div className="flex justify-between text-zinc-500"><span>Shipping</span><span>{sym}{data.shipping.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-base text-zinc-900 pt-1"><span>Total</span><span>{sym}{total.toFixed(2)}</span></div>
            </div>
            {data.terms && <p className="mt-2 text-xs text-zinc-400">Terms: {data.terms}</p>}
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
