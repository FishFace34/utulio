# ToolHub — Free Online Tools for Work & Life

A multi-tool SEO website with 5 free online tools. All tools are 100% client-side, require no signup, and are AdSense-ready.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Lint

```bash
npm run build      # production build
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project at vercel.com
3. Click Deploy (zero config required)
4. Add your custom domain in the Vercel dashboard
5. Update `toolhub.io` → your domain in `src/lib/seo.ts`, `src/lib/schema.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`

## Environment Variables

None required. All tools are client-side.

## All Routes (35+ pages)

| Route | Description |
|---|---|
| `/` | Homepage |
| `/about` | About page |
| `/contact` | Contact page |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/freelance-rate-calculator` | Main calculator |
| `/freelance-rate-calculator/for-designers` | Designer variant |
| `/freelance-rate-calculator/for-developers` | Developer variant |
| `/freelance-rate-calculator/for-writers` | Writer variant |
| `/invoice-generator` | Main invoice generator |
| `/invoice-generator/for-freelancers` | Freelancer variant |
| `/invoice-generator/for-consultants` | Consultant variant |
| `/business-name-generator` | Main generator |
| `/business-name-generator/[industry]` | 20 industry pages |
| `/password-generator` | Password generator |
| `/word-counter` | Main word counter |
| `/word-counter/for-twitter` | Twitter variant |
| `/word-counter/for-instagram-bio` | Instagram variant |
| `/word-counter/for-college-essay` | College essay variant |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots.txt |

## Tools

1. **Freelance Rate Calculator** — Calculate hourly/daily/monthly rates from income goals
2. **Invoice Generator** — Create professional PDF invoices (jsPDF, localStorage persistence)
3. **Business Name Generator** — 20 industry-specific name ideas with domain check links
4. **Password Generator** — Cryptographically secure passwords (crypto.getRandomValues)
5. **Word & Character Counter** — Words, characters, reading time, top words, platform presets

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript (strict)
- Tailwind CSS v4
- jsPDF (invoice PDF export)
- lucide-react (icons)
- clsx (classNames)

## Next Steps (Post-Launch)

- Replace `toolhub.io` with your actual domain (project-wide find & replace)
- Replace placeholder images in `public/` (og-image.png, apple-touch-icon.png)
- Register Google Search Console & submit sitemap
- Apply for Google AdSense (add code to `src/components/ui/AdSlot.tsx`)
- Add Google Analytics 4 script to `src/app/layout.tsx`
