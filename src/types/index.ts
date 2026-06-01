export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  category: 'freelancer' | 'business' | 'developer' | 'utility' | 'finance' | 'student';
  icon: string;
  keywords: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Industry {
  slug: string;
  name: string;
  descriptors: string[];
  nouns: string[];
  suffixes: string[];
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR';

export interface RateInputs {
  desiredAnnualIncome: number;
  workingDaysPerYear: number;
  billableHoursPerDay: number;
  monthlyExpenses: number;
  taxRatePercent: number;
  profitMarginPercent: number;
  currency: 'USD' | 'EUR' | 'GBP';
}

export interface RateResults {
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  annualRevenue: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  fromName: string;
  fromAddress: string;
  fromEmail: string;
  fromPhone: string;
  toName: string;
  toAddress: string;
  toEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
  discount: number;
  notes: string;
  currency: Currency;
}

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
}

export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
  longestWord: string;
  averageWordLength: number;
}
