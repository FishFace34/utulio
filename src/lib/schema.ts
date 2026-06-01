const BASE_URL = 'https://utulio.com';

interface SoftwareApplicationParams {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function softwareApplicationSchema({
  name,
  description,
  url,
  category = 'UtilityApplication',
}: SoftwareApplicationParams): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${BASE_URL}${url}`,
    applicationCategory: category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function websiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Utulio',
    url: BASE_URL,
    description:
      'Free, fast, no-signup online tools. Calculators, generators, converters — built for freelancers, developers, and small businesses.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Utulio',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description:
      'Free online tools for freelancers, developers, and small businesses. No signup required.',
  };
}

export function jsonLdScript(schema: object): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
