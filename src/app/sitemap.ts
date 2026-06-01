import type { MetadataRoute } from 'next';
import { INDUSTRY_SLUGS } from '@/lib/industries';

const BASE_URL = 'https://utulio.com';
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    // Core
    { url: `${BASE_URL}/`, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.3 },

    // Finance Tools (14)
    { url: `${BASE_URL}/loan-payment-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/debt-payoff-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/compound-interest-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/profit-margin-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/break-even-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/car-loan-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/roi-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/salary-to-hourly-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/mortgage-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/take-home-pay-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/retirement-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tip-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/savings-goal-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/sales-tax-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },

    // Freelancer Tools (2 + variants)
    { url: `${BASE_URL}/freelance-rate-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/freelance-rate-calculator/for-designers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/freelance-rate-calculator/for-developers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/freelance-rate-calculator/for-writers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/invoice-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/invoice-generator/for-freelancers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/invoice-generator/for-consultants`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },

    // Business Tools (5)
    { url: `${BASE_URL}/business-name-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/markup-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/receipt-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/purchase-order-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/quote-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/quote-generator/for-contractors`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/quote-generator/for-freelancers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },

    // Developer Tools (12)
    { url: `${BASE_URL}/json-formatter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/regex-tester`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/base64-encode-decode`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/color-converter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/password-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/jwt-decoder`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/box-shadow-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/cron-expression-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/uuid-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/hash-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/diff-checker`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/markdown-to-html`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },

    // Utility Tools (12 + variants)
    { url: `${BASE_URL}/qr-code-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/qr-code-generator/for-wifi`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/qr-code-generator/for-url`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/word-counter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/word-counter/for-twitter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/word-counter/for-instagram-bio`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/word-counter/for-college-essay`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/aspect-ratio-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/aspect-ratio-calculator/for-youtube-thumbnail`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/aspect-ratio-calculator/for-instagram`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/age-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/date-duration-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/unit-converter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/unit-converter/length`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/unit-converter/weight`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/unit-converter/temperature`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/bmi-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/tdee-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/time-zone-converter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/decision-wheel`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/percentage-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/random-number-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },

    // Student Tools (5 + variants)
    { url: `${BASE_URL}/grade-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/gpa-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/citation-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/citation-generator/apa`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/citation-generator/mla`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/random-name-picker`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/pomodoro-timer`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/business-name-generator/${slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...industryRoutes];
}
