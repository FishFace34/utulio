export type CitationStyle = 'apa' | 'mla' | 'chicago';
export type SourceType = 'website' | 'book' | 'journal';

export interface CitationFields {
  authorLast: string;
  authorFirst: string;
  title: string;
  siteName: string;
  publisher: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  year: string;
  month: string;
  day: string;
  url: string;
  accessYear: string;
  accessMonth: string;
  accessDay: string;
  doi: string;
}

function authorAPA(last: string, first: string): string {
  if (!last) return '';
  return first ? `${last}, ${first.charAt(0).toUpperCase()}.` : last;
}

function authorMLA(last: string, first: string): string {
  if (!last) return '';
  return first ? `${last}, ${first}` : last;
}

function clean(s: string | undefined): string { return (s || '').trim(); }

export function formatCitation(style: CitationStyle, type: SourceType, f: CitationFields): string {
  const author = { last: clean(f.authorLast), first: clean(f.authorFirst) };
  const year = clean(f.year);
  const title = clean(f.title);
  const url = clean(f.url);
  const siteName = clean(f.siteName);
  const publisher = clean(f.publisher);
  const journal = clean(f.journal);
  const volume = clean(f.volume);
  const issue = clean(f.issue);
  const pages = clean(f.pages);
  const month = clean(f.month);
  const day = clean(f.day);
  const doi = clean(f.doi);
  const accessDate = [clean(f.accessDay), clean(f.accessMonth), clean(f.accessYear)].filter(Boolean).join(' ');
  const pubDate = [month, day].filter(Boolean).join(' ');

  if (style === 'apa') {
    if (type === 'website') {
      const authorPart = authorAPA(author.last, author.first);
      const datePart = year ? `(${year}${pubDate ? `, ${pubDate}` : ''})` : '(n.d.)';
      const parts = [authorPart && `${authorPart}`, datePart, title && `*${title}*`, siteName, url && url].filter(Boolean);
      return parts.join('. ').replace(/\.\./g, '.') + '.';
    }
    if (type === 'book') {
      const authorPart = authorAPA(author.last, author.first);
      const parts = [authorPart, year && `(${year})`, title && `*${title}*`, publisher].filter(Boolean);
      return parts.join('. ') + '.';
    }
    if (type === 'journal') {
      const authorPart = authorAPA(author.last, author.first);
      const vol = volume && issue ? `*${volume}*(${issue})` : volume ? `*${volume}*` : '';
      const parts = [authorPart, year && `(${year})`, title, journal && `*${journal}*`, vol, pages && `${pages}`, doi && `https://doi.org/${doi}`].filter(Boolean);
      return parts.join('. ') + '.';
    }
  }

  if (style === 'mla') {
    if (type === 'website') {
      const authorPart = authorMLA(author.last, author.first);
      const parts = [authorPart, title && `"${title}."`, siteName && `*${siteName}*`, pubDate && year ? `${pubDate} ${year}` : year || pubDate, url, accessDate && `Accessed ${accessDate}`].filter(Boolean);
      return parts.join(', ').replace(/,\s*\./g, '.') + '.';
    }
    if (type === 'book') {
      const authorPart = authorMLA(author.last, author.first);
      const parts = [authorPart, title && `*${title}*`, publisher, year].filter(Boolean);
      return parts.join(', ') + '.';
    }
    if (type === 'journal') {
      const authorPart = authorMLA(author.last, author.first);
      const vol = volume ? `vol. ${volume}` : '';
      const iss = issue ? `no. ${issue}` : '';
      const parts = [authorPart, title && `"${title}."`, journal && `*${journal}*`, [vol, iss].filter(Boolean).join(', '), year, pages && `pp. ${pages}`, doi && `doi:${doi}`].filter(Boolean);
      return parts.join(', ') + '.';
    }
  }

  if (style === 'chicago') {
    if (type === 'website') {
      const authorPart = authorMLA(author.last, author.first);
      const dateStr = [month, day, year].filter(Boolean).join(' ');
      const parts = [authorPart, title && `"${title}."`, siteName && `*${siteName}*`, dateStr, url].filter(Boolean);
      return parts.join('. ') + '.';
    }
    if (type === 'book') {
      const authorPart = authorMLA(author.last, author.first);
      const parts = [authorPart, title && `*${title}*`, publisher, year].filter(Boolean);
      return parts.join('. ') + '.';
    }
    if (type === 'journal') {
      const authorPart = authorMLA(author.last, author.first);
      const vol = [volume, issue].filter(Boolean).join(', no. ');
      const parts = [authorPart, title && `"${title}."`, journal && `*${journal}*`, vol && `${vol}`, year && `(${year})`, pages && `: ${pages}`, doi && `. https://doi.org/${doi}`].filter(Boolean);
      return parts.join(' ').replace(/\s+/g, ' ').trim() + '.';
    }
  }

  return '';
}
