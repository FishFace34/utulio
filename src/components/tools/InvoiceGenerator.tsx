'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Download, RotateCcw, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatCurrency, getCurrencySymbol, generateId } from '@/lib/utils';
import type { InvoiceData, InvoiceItem, Currency } from '@/types';

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'CAD', label: 'CAD — Canadian Dollar' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
  { value: 'JPY', label: 'JPY — Japanese Yen' },
  { value: 'INR', label: 'INR — Indian Rupee' },
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getDefault(prefill?: Partial<InvoiceData>): InvoiceData {
  return {
    fromName: '',
    fromAddress: '',
    fromEmail: '',
    fromPhone: '',
    toName: '',
    toAddress: '',
    toEmail: '',
    invoiceNumber: 'INV-001',
    issueDate: today(),
    dueDate: daysFromNow(30),
    items: [{ id: generateId(), description: '', quantity: 1, rate: 0 }],
    taxRate: 0,
    discount: 0,
    notes: '',
    currency: 'USD',
    ...prefill,
  };
}

const STORAGE_KEY = 'toolhub-invoice';

interface InvoiceGeneratorProps {
  prefill?: Partial<InvoiceData>;
}

function calcTotals(items: InvoiceItem[], taxRate: number, discount: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const discountAmount = Math.min(discount, subtotal);
  const taxable = subtotal - discountAmount;
  const taxAmount = (taxable * taxRate) / 100;
  const total = taxable + taxAmount;
  return { subtotal, discountAmount, taxAmount, total };
}

function InvoicePreview({ data }: { data: InvoiceData }) {
  const { subtotal, discountAmount, taxAmount, total } = calcTotals(
    data.items,
    data.taxRate,
    data.discount
  );
  const sym = getCurrencySymbol(data.currency);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 font-sans text-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="text-2xl font-bold text-zinc-900">INVOICE</div>
          <div className="mt-1 text-zinc-500">#{data.invoiceNumber || 'INV-001'}</div>
        </div>
        <div className="text-right">
          {data.fromName && <div className="font-semibold text-zinc-900">{data.fromName}</div>}
          {data.fromAddress && (
            <div className="whitespace-pre-line text-xs text-zinc-500">{data.fromAddress}</div>
          )}
          {data.fromEmail && <div className="text-xs text-zinc-500">{data.fromEmail}</div>}
        </div>
      </div>

      {/* Dates + Bill To */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Bill To
          </div>
          {data.toName && <div className="font-medium text-zinc-900">{data.toName}</div>}
          {data.toAddress && (
            <div className="whitespace-pre-line text-xs text-zinc-500">{data.toAddress}</div>
          )}
          {data.toEmail && <div className="text-xs text-zinc-500">{data.toEmail}</div>}
        </div>
        <div className="text-right">
          <div className="mb-1 text-xs text-zinc-400">
            Issue Date:{' '}
            <span className="text-zinc-700">{data.issueDate || today()}</span>
          </div>
          <div className="text-xs text-zinc-400">
            Due Date:{' '}
            <span className="font-medium text-zinc-700">{data.dueDate || daysFromNow(30)}</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <table className="mb-4 w-full text-xs">
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="py-2 text-left font-semibold text-zinc-500">Description</th>
            <th className="py-2 text-right font-semibold text-zinc-500">Qty</th>
            <th className="py-2 text-right font-semibold text-zinc-500">Rate</th>
            <th className="py-2 text-right font-semibold text-zinc-500">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-zinc-100">
              <td className="py-2 text-zinc-700">{item.description || '—'}</td>
              <td className="py-2 text-right text-zinc-700">{item.quantity}</td>
              <td className="py-2 text-right text-zinc-700">
                {sym}{item.rate.toFixed(2)}
              </td>
              <td className="py-2 text-right font-medium text-zinc-900">
                {sym}{(item.quantity * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="ml-auto w-48 space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-zinc-500">Subtotal</span>
          <span>{sym}{subtotal.toFixed(2)}</span>
        </div>
        {data.discount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Discount</span>
            <span>−{sym}{discountAmount.toFixed(2)}</span>
          </div>
        )}
        {data.taxRate > 0 && (
          <div className="flex justify-between">
            <span className="text-zinc-500">Tax ({data.taxRate}%)</span>
            <span>{sym}{taxAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-zinc-200 pt-1 font-bold">
          <span>Total</span>
          <span>{formatCurrency(total, data.currency)}</span>
        </div>
      </div>

      {data.notes && (
        <div className="mt-6 border-t border-zinc-100 pt-4">
          <div className="mb-1 text-xs font-semibold text-zinc-400">Notes</div>
          <p className="text-xs leading-relaxed text-zinc-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
}

async function downloadPDF(data: InvoiceData) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const { subtotal, discountAmount, taxAmount, total } = calcTotals(
    data.items,
    data.taxRate,
    data.discount
  );
  const sym = getCurrencySymbol(data.currency);

  const marginL = 20;
  const marginR = 190;
  let y = 20;

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', marginL, y);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(113, 113, 122);
  doc.text(`#${data.invoiceNumber}`, marginL, y + 7);

  // From info (right-aligned)
  doc.setTextColor(9, 9, 11);
  doc.setFontSize(10);
  if (data.fromName) {
    doc.setFont('helvetica', 'bold');
    doc.text(data.fromName, marginR, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    y += 5;
  }
  if (data.fromEmail) {
    doc.setTextColor(113, 113, 122);
    doc.text(data.fromEmail, marginR, y + (data.fromName ? 0 : 0), { align: 'right' });
    y += 5;
  }
  doc.setTextColor(9, 9, 11);

  y = 42;

  // Bill To
  doc.setFontSize(8);
  doc.setTextColor(161, 161, 170);
  doc.text('BILL TO', marginL, y);
  y += 5;
  doc.setTextColor(9, 9, 11);
  doc.setFontSize(10);
  if (data.toName) {
    doc.setFont('helvetica', 'bold');
    doc.text(data.toName, marginL, y);
    doc.setFont('helvetica', 'normal');
    y += 5;
  }
  if (data.toAddress) {
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(data.toAddress, 80);
    doc.text(lines, marginL, y);
    y += lines.length * 4;
  }

  // Dates (right side)
  const dateY = 47;
  doc.setFontSize(9);
  doc.setTextColor(113, 113, 122);
  doc.text(`Issue Date: ${data.issueDate}`, marginR, dateY, { align: 'right' });
  doc.text(`Due Date: ${data.dueDate}`, marginR, dateY + 5, { align: 'right' });
  doc.setTextColor(9, 9, 11);

  y = Math.max(y, 65);
  y += 5;

  // Items table header
  doc.setFillColor(244, 244, 245);
  doc.rect(marginL, y, 170, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(113, 113, 122);
  doc.text('DESCRIPTION', marginL + 2, y + 5);
  doc.text('QTY', 130, y + 5, { align: 'right' });
  doc.text('RATE', 155, y + 5, { align: 'right' });
  doc.text('AMOUNT', marginR, y + 5, { align: 'right' });
  y += 10;

  // Items
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(9, 9, 11);
  doc.setFontSize(9);
  data.items.forEach((item) => {
    doc.text(item.description || '—', marginL + 2, y);
    doc.text(String(item.quantity), 130, y, { align: 'right' });
    doc.text(`${sym}${item.rate.toFixed(2)}`, 155, y, { align: 'right' });
    doc.text(`${sym}${(item.quantity * item.rate).toFixed(2)}`, marginR, y, { align: 'right' });
    y += 7;
    doc.setDrawColor(228, 228, 231);
    doc.line(marginL, y - 2, marginR, y - 2);
  });

  y += 5;

  // Totals
  const totalsX = 145;
  doc.setFontSize(9);
  doc.setTextColor(113, 113, 122);
  doc.text('Subtotal', totalsX, y);
  doc.setTextColor(9, 9, 11);
  doc.text(`${sym}${subtotal.toFixed(2)}`, marginR, y, { align: 'right' });
  y += 6;

  if (data.discount > 0) {
    doc.setTextColor(16, 185, 129);
    doc.text('Discount', totalsX, y);
    doc.text(`−${sym}${discountAmount.toFixed(2)}`, marginR, y, { align: 'right' });
    doc.setTextColor(9, 9, 11);
    y += 6;
  }

  if (data.taxRate > 0) {
    doc.setTextColor(113, 113, 122);
    doc.text(`Tax (${data.taxRate}%)`, totalsX, y);
    doc.setTextColor(9, 9, 11);
    doc.text(`${sym}${taxAmount.toFixed(2)}`, marginR, y, { align: 'right' });
    y += 6;
  }

  doc.setDrawColor(228, 228, 231);
  doc.line(totalsX, y, marginR, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Total', totalsX, y);
  doc.text(formatCurrency(total, data.currency), marginR, y, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  y += 10;

  // Notes
  if (data.notes) {
    doc.setDrawColor(228, 228, 231);
    doc.line(marginL, y, marginR, y);
    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(161, 161, 170);
    doc.text('NOTES', marginL, y);
    y += 5;
    doc.setTextColor(113, 113, 122);
    doc.setFontSize(9);
    const noteLines = doc.splitTextToSize(data.notes, 170);
    doc.text(noteLines, marginL, y);
  }

  doc.save(`invoice-${data.invoiceNumber}.pdf`);
}

export default function InvoiceGenerator({ prefill }: InvoiceGeneratorProps) {
  const [data, setData] = useState<InvoiceData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...getDefault(prefill), ...(JSON.parse(saved) as InvoiceData) };
        }
      } catch {
        // ignore
      }
    }
    return getDefault(prefill);
  });
  const [tab, setTab] = useState<'form' | 'preview'>('form');

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const update = useCallback(<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateItem = useCallback(
    (id: string, key: keyof InvoiceItem, value: string | number) => {
      setData((prev) => ({
        ...prev,
        items: prev.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
      }));
    },
    []
  );

  const addItem = useCallback(() => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: generateId(), description: '', quantity: 1, rate: 0 }],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const reset = useCallback(() => {
    if (confirm('Reset invoice? All data will be cleared.')) {
      const fresh = getDefault(prefill);
      setData(fresh);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [prefill]);

  const { subtotal, discountAmount, taxAmount, total } = calcTotals(
    data.items,
    data.taxRate,
    data.discount
  );
  const sym = getCurrencySymbol(data.currency);

  const fieldCls =
    'h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900';
  const labelCls = 'block text-xs font-medium text-zinc-600 mb-1';

  return (
    <div>
      {/* Mobile tab switcher */}
      <div className="mb-4 flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 md:hidden">
        <button
          onClick={() => setTab('form')}
          className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${tab === 'form' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
        >
          Edit
        </button>
        <button
          onClick={() => setTab('preview')}
          className={`flex flex-1 items-center justify-center gap-1 rounded-md py-1.5 text-sm font-medium transition-colors ${tab === 'preview' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
        >
          <Eye size={14} strokeWidth={1.5} /> Preview
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className={tab === 'preview' ? 'hidden md:block' : ''}>
          <div className="space-y-5">
            {/* From */}
            <div className="rounded-xl border border-zinc-200 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">From (Your Business)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Business Name *</label>
                  <input
                    className={fieldCls}
                    placeholder="Your Name / Company"
                    value={data.fromName}
                    onChange={(e) => update('fromName', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input
                    className={fieldCls}
                    type="email"
                    placeholder="you@example.com"
                    value={data.fromEmail}
                    onChange={(e) => update('fromEmail', e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address</label>
                  <textarea
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    rows={2}
                    placeholder="123 Main St, City, State"
                    value={data.fromAddress}
                    onChange={(e) => update('fromAddress', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* To */}
            <div className="rounded-xl border border-zinc-200 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">Bill To (Client)</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Client Name *</label>
                  <input
                    className={fieldCls}
                    placeholder="Client Name / Company"
                    value={data.toName}
                    onChange={(e) => update('toName', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Client Email</label>
                  <input
                    className={fieldCls}
                    type="email"
                    placeholder="client@example.com"
                    value={data.toEmail}
                    onChange={(e) => update('toEmail', e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Client Address</label>
                  <textarea
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    rows={2}
                    placeholder="456 Client Ave, City, State"
                    value={data.toAddress}
                    onChange={(e) => update('toAddress', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="rounded-xl border border-zinc-200 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">Invoice Details</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelCls}>Invoice # </label>
                  <input
                    className={fieldCls}
                    value={data.invoiceNumber}
                    onChange={(e) => update('invoiceNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Issue Date</label>
                  <input
                    className={fieldCls}
                    type="date"
                    value={data.issueDate}
                    onChange={(e) => update('issueDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Due Date</label>
                  <input
                    className={fieldCls}
                    type="date"
                    value={data.dueDate}
                    onChange={(e) => update('dueDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Currency</label>
                  <select
                    className={fieldCls}
                    value={data.currency}
                    onChange={(e) => update('currency', e.target.value as Currency)}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="rounded-xl border border-zinc-200 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">Line Items</h3>
              <div className="space-y-2">
                <div className="hidden grid-cols-[1fr_80px_90px_90px_40px] gap-2 sm:grid">
                  <span className={labelCls}>Description</span>
                  <span className={labelCls}>Qty</span>
                  <span className={labelCls}>Rate ({sym})</span>
                  <span className={labelCls}>Amount</span>
                  <span />
                </div>
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-2 sm:grid-cols-[1fr_80px_90px_90px_40px]"
                  >
                    <input
                      className={fieldCls}
                      placeholder="Service description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                    <input
                      className={fieldCls}
                      type="number"
                      min={0}
                      step={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    />
                    <input
                      className={fieldCls}
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                    />
                    <div className="flex h-9 items-center rounded-lg bg-zinc-50 px-3 text-sm font-medium text-zinc-700">
                      {sym}{(item.quantity * item.rate).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={data.items.length === 1}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-3 flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
              >
                <Plus size={14} strokeWidth={1.5} />
                Add Item
              </button>
            </div>

            {/* Taxes & Notes */}
            <div className="rounded-xl border border-zinc-200 p-4">
              <h3 className="mb-3 text-sm font-semibold text-zinc-900">Adjustments & Notes</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Tax Rate (%)</label>
                  <input
                    className={fieldCls}
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={data.taxRate}
                    onChange={(e) => update('taxRate', Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Discount ({sym})</label>
                  <input
                    className={fieldCls}
                    type="number"
                    min={0}
                    step={1}
                    value={data.discount}
                    onChange={(e) => update('discount', Number(e.target.value))}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Notes / Payment Terms</label>
                  <textarea
                    className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    rows={3}
                    placeholder="Payment due within 30 days..."
                    value={data.notes}
                    onChange={(e) => update('notes', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => downloadPDF(data)}
                className="flex-1 sm:flex-none"
              >
                <Download size={16} strokeWidth={1.5} />
                Download PDF
              </Button>
              <Button variant="secondary" onClick={reset}>
                <RotateCcw size={14} strokeWidth={1.5} />
                Reset
              </Button>
            </div>

            {/* Totals summary */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span>{sym}{subtotal.toFixed(2)}</span>
              </div>
              {data.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>−{sym}{discountAmount.toFixed(2)}</span>
                </div>
              )}
              {data.taxRate > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Tax ({data.taxRate}%)</span>
                  <span>{sym}{taxAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 font-bold text-zinc-900">
                <span>Total</span>
                <span>{formatCurrency(total, data.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className={`${tab === 'form' ? 'hidden md:block' : ''} lg:sticky lg:top-20 lg:self-start`}>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900">Live Preview</h3>
          <InvoicePreview data={data} />
          <Button
            onClick={() => downloadPDF(data)}
            className="mt-4 w-full"
          >
            <Download size={16} strokeWidth={1.5} />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
