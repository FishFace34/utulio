'use client';

import { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';

type QRTab = 'url' | 'wifi' | 'email' | 'phone' | 'sms';
type ErrorLevel = 'L' | 'M' | 'Q' | 'H';
type WifiEncryption = 'WPA' | 'WEP' | 'nopass';
type QRSize = 256 | 512 | 1024;

const TABS: { key: QRTab; label: string }[] = [
  { key: 'url', label: 'URL / Text' },
  { key: 'wifi', label: 'WiFi' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'sms', label: 'SMS' },
];

function buildQRContent(tab: QRTab, fields: Record<string, string>): string {
  switch (tab) {
    case 'wifi':
      return `WIFI:T:${fields.encryption || 'WPA'};S:${fields.ssid || ''};P:${fields.password || ''};;`;
    case 'email':
      return `mailto:${fields.email || ''}${fields.subject ? `?subject=${encodeURIComponent(fields.subject)}` : ''}`;
    case 'phone':
      return `tel:${fields.phone || ''}`;
    case 'sms':
      return `sms:${fields.phone || ''}${fields.message ? `?body=${encodeURIComponent(fields.message)}` : ''}`;
    default:
      return fields.url || '';
  }
}

interface QRCodeGeneratorProps {
  defaultTab?: QRTab;
}

export default function QRCodeGenerator({ defaultTab = 'url' }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tab, setTab] = useState<QRTab>(defaultTab);
  const [fields, setFields] = useState<Record<string, string>>({
    url: 'https://utulio.com',
    ssid: '',
    password: '',
    encryption: 'WPA',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState<QRSize>(512);
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('M');
  const [svgString, setSvgString] = useState('');

  const content = buildQRContent(tab, fields);

  useEffect(() => {
    if (!content) return;
    let cancelled = false;

    async function run() {
      const QRCode = (await import('qrcode')).default;
      if (cancelled) return;

      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, content, {
          width: size,
          margin: 2,
          color: { dark: fgColor, light: bgColor },
          errorCorrectionLevel: errorLevel,
        });
      }

      const svg = await QRCode.toString(content, {
        type: 'svg',
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorLevel,
      });

      if (!cancelled) setSvgString(svg);
    }

    run().catch(() => {/* ignore generation errors */});
    return () => { cancelled = true; };
  }, [content, size, fgColor, bgColor, errorLevel]);

  function setField(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function downloadPNG() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }

  function downloadSVG() {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
      {/* Inputs */}
      <div className="space-y-5">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 rounded-xl border border-zinc-200 bg-zinc-50 p-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === key ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Dynamic fields */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
          {tab === 'url' && (
            <InputField label="URL or Text" value={fields.url} onChange={(v) => setField('url', v)} placeholder="https://example.com" />
          )}
          {tab === 'wifi' && (
            <>
              <InputField label="Network Name (SSID)" value={fields.ssid} onChange={(v) => setField('ssid', v)} placeholder="MyWiFiNetwork" />
              <InputField label="Password" value={fields.password} onChange={(v) => setField('password', v)} placeholder="password" type="password" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Security</label>
                <select
                  value={fields.encryption}
                  onChange={(e) => setField('encryption', e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  {(['WPA', 'WEP', 'nopass'] as WifiEncryption[]).map((e) => (
                    <option key={e} value={e}>{e === 'nopass' ? 'None (open)' : e}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          {tab === 'email' && (
            <>
              <InputField label="Email Address" value={fields.email} onChange={(v) => setField('email', v)} placeholder="hello@example.com" />
              <InputField label="Subject (optional)" value={fields.subject} onChange={(v) => setField('subject', v)} placeholder="Hello there" />
            </>
          )}
          {tab === 'phone' && (
            <InputField label="Phone Number" value={fields.phone} onChange={(v) => setField('phone', v)} placeholder="+1 555 000 0000" />
          )}
          {tab === 'sms' && (
            <>
              <InputField label="Phone Number" value={fields.phone} onChange={(v) => setField('phone', v)} placeholder="+1 555 000 0000" />
              <InputField label="Message (optional)" value={fields.message} onChange={(v) => setField('message', v)} placeholder="Your message" />
            </>
          )}
        </div>

        {/* Customization */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-900">Customization</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Foreground</label>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Size</label>
              <select value={size} onChange={(e) => setSize(parseInt(e.target.value) as QRSize)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                <option value={256}>Small (256px)</option>
                <option value={512}>Medium (512px)</option>
                <option value={1024}>Large (1024px)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700">Error Correction</label>
              <select value={errorLevel} onChange={(e) => setErrorLevel(e.target.value as ErrorLevel)}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                <option value="L">L — 7%</option>
                <option value="M">M — 15%</option>
                <option value="Q">Q — 25%</option>
                <option value="H">H — 30%</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Preview + download */}
      <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
        <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-6">
          <canvas
            ref={canvasRef}
            className="max-w-full rounded-lg"
            style={{ maxHeight: 280 }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="primary" size="sm" onClick={downloadPNG}>
            Download PNG
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={downloadSVG}>
            Download SVG
          </Button>
        </div>
        <p className="text-center text-xs text-zinc-400">Free to use commercially. No watermark.</p>
      </div>
    </div>
  );
}

function InputField({
  label, value, onChange, placeholder, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
      />
    </div>
  );
}
