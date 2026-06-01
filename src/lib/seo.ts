import type { Metadata } from 'next';

const BASE_URL = 'https://utulio.com';

interface ToolMetadataParams {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function toolMetadata({
  title,
  description,
  path,
  keywords = [],
}: ToolMetadataParams): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'Utulio',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: { canonical: path },
  };
}
