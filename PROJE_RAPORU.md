# Utulio.com — Proje Raporu

**Tarih:** 1 Haziran 2026  
**Durum:** Build hazır, domain alınmadı, deploy edilmedi

---

## 1. Proje Özeti

| Özellik | Değer |
|---|---|
| Site Adı | Utulio |
| Domain | utulio.com (henüz alınmadı) |
| Proje Dizini | `d:\seo2money\toolhub` |
| Tool Sayısı | 20 |
| Toplam Sayfa | 62 (statik) |
| Gelir Modeli | Google AdSense (entegrasyon bekliyor) |
| Analitik | Google Analytics 4 (entegrasyon bekliyor) |

---

## 2. Teknik Stack

| Paket | Versiyon |
|---|---|
| Next.js | 16.2.6 (App Router) |
| React | 19.2.4 |
| TypeScript | 5.9.3 (strict mode) |
| Tailwind CSS | 4.3.0 |
| lucide-react | 1.17.0 |
| jspdf | 4.2.1 |
| qrcode | 1.5.4 |
| ESLint | 9.39.4 |

**Build sonucu:** ✅ 62 sayfa, sıfır TypeScript hatası, sıfır lint hatası

---

## 3. Tool Listesi (20 Tool)

### Finance (8 tool)
| Tool | URL | Özellik |
|---|---|---|
| Loan Payment Calculator | `/loan-payment-calculator` | Amortizasyon tablosu, toplam faiz |
| Debt Payoff Calculator | `/debt-payoff-calculator` | Snowball vs Avalanche simülasyonu |
| Compound Interest Calculator | `/compound-interest-calculator` | Aylık katkıyla büyüme, SVG grafik |
| Profit Margin Calculator | `/profit-margin-calculator` | Margin & markup, 2 mod |
| Break-Even Calculator | `/break-even-calculator` | Birim ve gelir bazlı başa baş noktası |
| Car Loan Calculator | `/car-loan-calculator` | Trade-in, satış vergisi dahil |
| ROI Calculator | `/roi-calculator` | ROI + CAGR (yıllıklandırılmış) |
| Salary to Hourly Calculator | `/salary-to-hourly-calculator` | Yıllık/aylık/haftalık/günlük/saatlik dönüşüm |

### Freelancer (2 tool)
| Tool | URL | Özellik |
|---|---|---|
| Freelance Rate Calculator | `/freelance-rate-calculator` | Hedef gelir bazlı saatlik ücret + varyantlar |
| Invoice Generator | `/invoice-generator` | PDF indirme, localStorage kayıt + varyantlar |

### Business (1 tool)
| Tool | URL | Özellik |
|---|---|---|
| Business Name Generator | `/business-name-generator` | 50+ sektör varyant sayfası |

### Developer (5 tool)
| Tool | URL | Özellik |
|---|---|---|
| JSON Formatter & Validator | `/json-formatter` | Format/minify/validate, istatistikler |
| Regex Tester | `/regex-tester` | Canlı highlight, capture group, replace modu |
| Base64 Encoder/Decoder | `/base64-encode-decode` | UTF-8 güvenli, anlık dönüşüm |
| Color Converter | `/color-converter` | HEX/RGB/HSL/CMYK karşılıklı dönüşüm |
| Password Generator | `/password-generator` | Kriptografik güvenli, özelleştirilebilir |

### Utility (3 tool)
| Tool | URL | Özellik |
|---|---|---|
| QR Code Generator | `/qr-code-generator` | URL/WiFi/Email/SMS, PNG+SVG indirme |
| Word & Character Counter | `/word-counter` | Kelime/karakter/cümle/okuma süresi + varyantlar |
| Aspect Ratio Calculator | `/aspect-ratio-calculator` | GCD tabanlı, çift yönlü + varyantlar |

### Student (1 tool)
| Tool | URL | Özellik |
|---|---|---|
| Grade Calculator | `/grade-calculator` | Ağırlıklı not + final sınavı için gereken puan |

---

## 4. Tüm Route'lar (62 sayfa)

```
/                                           ← Ana sayfa
/about
/contact
/privacy
/terms

# Finance
/loan-payment-calculator
/debt-payoff-calculator
/compound-interest-calculator
/profit-margin-calculator
/break-even-calculator
/car-loan-calculator
/roi-calculator
/salary-to-hourly-calculator

# Freelancer
/freelance-rate-calculator
/freelance-rate-calculator/for-designers
/freelance-rate-calculator/for-developers
/freelance-rate-calculator/for-writers
/invoice-generator
/invoice-generator/for-freelancers
/invoice-generator/for-consultants

# Business
/business-name-generator
/business-name-generator/[industry]   ← 50+ sektör sayfası (dinamik)

# Developer
/json-formatter
/regex-tester
/base64-encode-decode
/color-converter
/password-generator

# Utility
/qr-code-generator
/qr-code-generator/for-wifi
/qr-code-generator/for-url
/word-counter
/word-counter/for-twitter
/word-counter/for-instagram-bio
/word-counter/for-college-essay
/aspect-ratio-calculator
/aspect-ratio-calculator/for-youtube-thumbnail
/aspect-ratio-calculator/for-instagram

# Student
/grade-calculator

# System
/sitemap.xml
/robots.txt
```

---

## 5. Proje Dosya Yapısı

```
d:\seo2money\toolhub\
├── src/
│   ├── app/                    ← Next.js App Router sayfaları
│   │   ├── layout.tsx          ← Global layout, metadata, viewport
│   │   ├── page.tsx            ← Ana sayfa (kategori bazlı grid)
│   │   ├── sitemap.ts          ← /sitemap.xml (70+ URL)
│   │   ├── robots.ts           ← /robots.txt
│   │   ├── globals.css         ← Tailwind import
│   │   └── [tool-name]/        ← Her tool için klasör
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      ← Sticky header, mobile hamburger menü
│   │   │   ├── Footer.tsx      ← 4 kolonlu footer, top 8 tool
│   │   │   └── Container.tsx   ← Max-width wrapper
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx       ← Kategori renkleri (finance, student dahil)
│   │   │   ├── ToolCard.tsx    ← Tool grid kartı
│   │   │   ├── ToolHero.tsx    ← Tool sayfası başlığı
│   │   │   ├── FAQ.tsx         ← Accordion FAQ
│   │   │   ├── AdSlot.tsx      ← AdSense placeholder (boş)
│   │   │   ├── CalculatorShell.tsx  ← 2 kolonlu hesap makinesi layout
│   │   │   ├── ResultStat.tsx  ← Sonuç gösterimi, aria-live
│   │   │   ├── CopyButton.tsx  ← Panoya kopyala, 2s feedback
│   │   │   └── CodePanel.tsx   ← Monospace textarea + kopyala
│   │   └── tools/              ← Her tool için component
│   │       ├── LoanCalculator.tsx
│   │       ├── DebtPayoffCalculator.tsx
│   │       ├── CompoundInterestCalculator.tsx
│   │       ├── ProfitMarginCalculator.tsx
│   │       ├── BreakEvenCalculator.tsx
│   │       ├── CarLoanCalculator.tsx
│   │       ├── ROICalculator.tsx
│   │       ├── SalaryCalculator.tsx
│   │       ├── JSONFormatter.tsx
│   │       ├── RegexTester.tsx
│   │       ├── Base64Tool.tsx
│   │       ├── ColorConverter.tsx
│   │       ├── QRCodeGenerator.tsx
│   │       ├── GradeCalculator.tsx
│   │       ├── AspectRatioCalculator.tsx
│   │       ├── FreelanceRateCalculator.tsx
│   │       ├── InvoiceGenerator.tsx
│   │       ├── BusinessNameGenerator.tsx
│   │       ├── PasswordGenerator.tsx
│   │       └── WordCounter.tsx
│   ├── lib/
│   │   ├── tools.ts            ← TOOLS array (20 tool), getRelatedTools, getToolsByCategory
│   │   ├── seo.ts              ← toolMetadata() helper
│   │   ├── schema.ts           ← JSON-LD şema fonksiyonları
│   │   ├── utils.ts            ← formatCurrency, formatPercent, clamp, parseNum
│   │   ├── colorConvert.ts     ← hexToRgb, rgbToHsl, rgbToCmyk vb.
│   │   └── industries.ts       ← 50+ sektör slug listesi
│   └── types/
│       └── index.ts            ← Tool tipi (id, name, href, category, icon, keywords)
└── public/
    ├── og-image.png            ← ⚠️ PLACEHOLDER — gerçek görsel gerekli
    ├── favicon.svg
    └── apple-touch-icon.png    ← ⚠️ PLACEHOLDER
```

---

## 6. SEO Yapısı

### Her tool sayfasında mevcut:
- `<title>` ve `<meta description>` — toolMetadata() ile üretilir
- `canonical` URL
- Open Graph (og:title, og:description, og:image, og:site_name)
- Twitter Card (summary_large_image)
- JSON-LD: **SoftwareApplication** + **FAQPage** + **BreadcrumbList**
- 5–6 soruluk FAQ içeriği

### Ana sayfada mevcut:
- JSON-LD: **WebSite** (SearchAction ile) + **Organization**
- robots: index, follow
- `lang="en"`
- Skip-to-content erişilebilirlik linki

### Sistem dosyaları:
- `/sitemap.xml` — 70+ URL, öncelik ve changeFrequency ile
- `/robots.txt` — tüm botlara izin, sitemap işaretli

---

## 7. Yapılması Gerekenler (Sen)

### Öncelik 1 — Domain
- [ ] **utulio.com** domain'i satın al (Namecheap, GoDaddy, Porkbun vb.)
- [ ] DNS'i Vercel/Netlify'a yönlendir

### Öncelik 2 — Deploy
- [ ] Kodu GitHub'a push et
- [ ] Vercel veya Netlify'a bağla (`d:\seo2money\toolhub` klasörü)
- [ ] Build komutu: `npm run build` | Çıktı klasörü: `.next`

### Öncelik 3 — Google Search Console
- [ ] https://search.google.com/search-console adresine gir
- [ ] utulio.com domain'i ekle
- [ ] DNS TXT kaydı ile doğrula
- [ ] `https://utulio.com/sitemap.xml` submit et

### Öncelik 4 — Google Analytics 4
- [ ] https://analytics.google.com → yeni property oluştur
- [ ] Measurement ID al: `G-XXXXXXXXXX`
- [ ] **Bana ver → layout.tsx'e eklerim**

### Öncelik 5 — Google AdSense
- [ ] https://adsense.google.com → site ekle: utulio.com
- [ ] Site deploy edildikten sonra başvur (canlı site gerektirir)
- [ ] Onay gelince Publisher ID: `ca-pub-XXXXXXXXXXXXXXXX`
- [ ] **Bana ver → AdSlot.tsx'e eklerim**

### Öncelik 6 — OG Image
- [ ] 1200×630px görsel oluştur (Canva, Figma vb.)
- [ ] Üzerinde "Utulio" yazısı + "Free Online Tools" tagline
- [ ] `public/og-image.png` olarak kaydet

---

## 8. Tamamlanan İşler Özeti

| Aşama | İçerik | Durum |
|---|---|---|
| Stage 1 | 5 temel tool (Rate Calc, Invoice, Business Name, Password, Word Counter) | ✅ |
| Domain rename | toolhub.io → utulio.com, tüm kodda "ToolHub" → "Utulio" | ✅ |
| Stage 2-A | Paylaşılan altyapı (CalculatorShell, ResultStat, CopyButton, CodePanel, lib/utils, lib/colorConvert) | ✅ |
| Stage 2-B | 8 finance calculator | ✅ |
| Stage 2-C | 4 developer tool | ✅ |
| Stage 2-D | QR Code Generator, Aspect Ratio Calculator + varyantlar | ✅ |
| Stage 2-E | Grade Calculator, sitemap güncelleme, homepage kategori gruplandırma | ✅ |
| Stage 2-F | QA — build + lint temizleme (30 hata düzeltildi) | ✅ |
| SEO audit | Brand tutarlılığı, schema, canonical, robots, sitemap doğrulama | ✅ |

**Son build:** 62 sayfa · 0 TypeScript hatası · 0 lint hatası
