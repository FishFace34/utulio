import type { MetadataRoute } from 'next';
import { INDUSTRY_SLUGS } from '@/lib/industries';

const BASE_URL = 'https://utulio.com';
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    // Core
    { url: `${BASE_URL}/`, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.3 },

    // Finance Tools
    { url: `${BASE_URL}/loan-payment-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/debt-payoff-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/compound-interest-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/profit-margin-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/break-even-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/car-loan-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/roi-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/salary-to-hourly-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },

    // Freelancer Tools
    { url: `${BASE_URL}/freelance-rate-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/freelance-rate-calculator/for-designers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/freelance-rate-calculator/for-developers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/freelance-rate-calculator/for-writers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/invoice-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/invoice-generator/for-freelancers`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/invoice-generator/for-consultants`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },

    // Business Tools
    { url: `${BASE_URL}/business-name-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },

    // Developer Tools
    { url: `${BASE_URL}/json-formatter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/regex-tester`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/base64-encode-decode`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/color-converter`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/password-generator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },

    // Utility Tools
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

    // Student Tools
    { url: `${BASE_URL}/grade-calculator`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/business-name-generator/${slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...industryRoutes];
}
