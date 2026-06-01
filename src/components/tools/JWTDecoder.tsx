'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return decodeURIComponent(
    atob(str).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
  );
}

function formatTimestamp(ts: number): string {
  try {
    return new Date(ts * 1000).toLocaleString();
  } catch {
    return String(ts);
  }
}

function isExpired(exp: number): boolean {
  return Date.now() / 1000 > exp;
}

interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeJWT(token: string): { data: DecodedJWT | null; error: string | null } {
  const parts = token.trim().split('.');
  if (parts.length !== 3) return { data: null, error: 'Invalid JWT: must have 3 parts separated by dots.' };
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return { data: { header, payload, signature: parts[2] }, error: null };
  } catch {
    return { data: null, error: 'Failed to decode JWT. The token may be malformed or not a valid JWT.' };
  }
}

function JsonPanel({ label, data, copyText }: { label: string; data: Record<string, unknown>; copyText: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
        <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">{label}</span>
        <CopyButton text={copyText} />
      </div>
      <div className="p-4">
        <pre className="overflow-x-auto text-xs leading-relaxed text-zinc-700">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default function JWTDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const { data, error } = decodeJWT(token);

  const exp = data?.payload?.exp as number | undefined;
  const iat = data?.payload?.iat as number | undefined;
  const nbf = data?.payload?.nbf as number | undefined;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700">
        <strong>Security notice:</strong> This tool only <strong>decodes</strong> — it does not verify signatures. Never paste production secrets or tokens containing sensitive personal data.
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">Paste JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          spellCheck={false}
          rows={4}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {data && (
        <div className="space-y-4">
          <JsonPanel label="Header" data={data.header} copyText={JSON.stringify(data.header, null, 2)} />
          <JsonPanel label="Payload" data={data.payload} copyText={JSON.stringify(data.payload, null, 2)} />

          {/* Highlighted claims */}
          {(exp !== undefined || iat !== undefined || nbf !== undefined) && (
            <div className="rounded-xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-100 px-4 py-2.5">
                <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">Standard Claims</span>
              </div>
              <div className="divide-y divide-zinc-50 px-4">
                {iat !== undefined && (
                  <div className="flex items-center justify-between py-2.5 text-sm">
                    <span className="font-mono text-xs text-zinc-500">iat</span>
                    <span className="text-zinc-700">Issued at: {formatTimestamp(iat)}</span>
                  </div>
                )}
                {exp !== undefined && (
                  <div className="flex items-center justify-between py-2.5 text-sm">
                    <span className="font-mono text-xs text-zinc-500">exp</span>
                    <span className={isExpired(exp) ? 'text-red-600 font-medium' : 'text-green-700 font-medium'}>
                      {isExpired(exp) ? 'EXPIRED' : 'Valid'} — {formatTimestamp(exp)}
                    </span>
                  </div>
                )}
                {nbf !== undefined && (
                  <div className="flex items-center justify-between py-2.5 text-sm">
                    <span className="font-mono text-xs text-zinc-500">nbf</span>
                    <span className="text-zinc-700">Not before: {formatTimestamp(nbf)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-zinc-200 bg-white">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
              <span className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">Signature</span>
              <CopyButton text={data.signature} />
            </div>
            <div className="p-4">
              <p className="font-mono text-xs break-all text-zinc-500">{data.signature}</p>
              <p className="mt-2 text-xs text-zinc-400">Signature is shown for reference only. Verification requires the secret key or public key — not available in this tool.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
