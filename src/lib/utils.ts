import { clsx, type ClassValue } from 'clsx';
import type { Currency } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  JPY: '¥',
  INR: '₹',
};

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency];
}

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function formatPercent(value: number, decimals: number = 2): string {
  if (!isFinite(value)) return '—';
  return `${value.toFixed(decimals)}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function parseNum(value: string | number): number {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  return isFinite(n) ? n : 0;
}
