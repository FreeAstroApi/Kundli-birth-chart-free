# Kundli Birth Chart Desk

An AstroSage-like Vedic Kundli chart calculator built with Next.js and FreeAstroAPI. It is free to clone, customize, and deploy for astrologers, astrology students, and client-facing Jyotish chart tools.

Live demo: https://kundli-birth-chart-free.vercel.app

The browser talks only to local Next.js route handlers, so the FreeAstro API key stays server-side.

## What It Includes

- Birth chart form with city search, timezone, ayanamsha, houses, and node settings
- FreeAstroAPI-rendered SVG visual charts for D1 Rashi and D9 Navamsha
- Divisional chart support with local fallback renderers
- North Indian, South Indian, and East Indian chart styles
- Planet tables, dasha, returned yogas, Panchang, Shadbala, and Ashtakavarga
- Kundli matching mode and browser-only saved clients
- Public Muhurat search for general work, purchases, Griha Pravesh, Namkaran, and Mundan
- Local Panchang and daily Muhurat tools with English and Hindi interfaces
- Personal Gochar timelines plus dedicated Nakshatra and Dashamsa D10 results
- Print-ready report flow for PDF export through the browser

## Search-Focused Pages

The interactive workspace is available through indexable, server-rendered pages rather than a single client-only URL:

- `/vedic-birth-chart-calculator` and `/kundli`
- `/hi/janam-kundli`
- `/navamsa-d9-calculator` and `/vimshottari-dasha-calculator`
- `/kundli-matching` and `/hi/kundli-milan`
- `/ashtakavarga-calculator`, `/shadbala-calculator`, and `/manglik-dosha-calculator`
- `/muhurat`
- `/panchang-today` and `/hi/aaj-ka-panchang`
- `/daily-muhurat-timings` and `/hi/aaj-ka-muhurat`
- `/vedic-transit-calculator`, `/nakshatra-calculator`, and `/dashamsa-d10-calculator`
- `/north-indian-birth-chart-calculator`, `/south-indian-birth-chart-calculator`, and `/east-indian-birth-chart-calculator`
- `/learn/why-kundli-calculators-differ`
- `/learn` plus focused guides for ayanamsha, D9, dasha, matching, Manglik, Ashtakavarga, Shadbala, and regional chart layouts
- `/about`, `/methodology`, `/editorial-policy`, `/privacy`, and `/contact`

Each public route has unique metadata, a self-canonical, visible explanatory content, internal links, breadcrumbs, and appropriate JSON-LD. Birth-chart equivalents publish reciprocal `en-US`, `en-IN`, `hi-IN`, and `x-default` annotations; matching pages publish reciprocal `en-IN`, `hi-IN`, and `x-default` annotations. Locale route groups also render the correct `lang` value in the source HTML. `sitemap.xml`, `robots.txt`, the web manifest, and a generated Open Graph image are provided by the App Router.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- FreeAstroAPI V2 endpoints

## Clone This Free Kundli Calculator

This project is intended as a free open starting point for building an AstroSage-style Kundli chart reader. Clone it, add your own branding, connect your own FreeAstroAPI key, and deploy it to Vercel.

```bash
git clone https://github.com/GabrielRw/Kundli-birth-chart-free.git
cd Kundli-birth-chart-free
npm install
```

## Local Development

Create `.env.local`:

```bash
cp .env.example .env.local
```

Set the required server-side key:

```env
FREEASTRO_API_KEY=your_freeastroapi_key_here
FREEASTRO_API_BASE=https://api.freeastroapi.com
FREEASTRO_MIN_INTERVAL_MS=1100
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_SITE_VERIFICATION=your_google_search_console_token
BING_SITE_VERIFICATION=your_bing_webmaster_tools_token
```

Run the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. If that port is occupied, run `npm run dev -- --port 3001`.

## Vercel Deployment

This project is ready for Vercel's zero-config Next.js deployment.

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Add these Environment Variables in Vercel Project Settings for Production and Preview:
   - `FREEASTRO_API_KEY`
   - `FREEASTRO_API_BASE` with value `https://api.freeastroapi.com`
   - `FREEASTRO_MIN_INTERVAL_MS` with value `1100`
   - `NEXT_PUBLIC_SITE_URL` with the permanent `https://` origin of the site
   - `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` after creating the corresponding webmaster properties
4. Deploy.

Do not add `.env.local` to Git. The repo keeps `.env.example` trackable for setup documentation, while local environment files remain ignored.

Set `NEXT_PUBLIC_SITE_URL` before the production build so canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` use the permanent domain. When moving away from the Vercel demo URL, configure a permanent redirect from the old host to the new domain.

Vercel currently supports selecting Node.js through `package.json` `engines.node`; this app pins `24.x` to match Vercel's current default Node runtime family.

FreeAstro free plans can be capped at 1 request per second. The server routes use `FREEASTRO_MIN_INTERVAL_MS` to pace upstream requests instead of sending chart modules in parallel. Keep `1100` for free-plan safety; lower it only if your FreeAstro plan allows higher throughput.

## Production Checks

Run before deployment:

```bash
npm run lint
npm run build
```

## API Routes

- `GET /api/geo/search` proxies FreeAstro city autocomplete.
- `POST /api/kundli` calls the Vedic chart modules server-side.
- `POST /api/match` calls the Vedic matching flow server-side.
- `POST /api/muhurat` searches up to 31 days for ranked public Muhurat windows.
- `POST /api/panchang-today` returns the local Panchang and transition times for a selected date, time, and city.
- `POST /api/daily-muhurat` returns one of the supported daily timing systems, including Hora, Chaughadia, Rahu Kaal, and Abhijit Muhurat.
- `POST /api/gochar` returns a bounded personal Vedic transit timeline for selected planets.

Required FreeAstro docs:

- Vedic chart: https://www.freeastroapi.com/docs/vedic/chart
- Vedic visual chart: https://www.freeastroapi.com/docs/vedic/visual-chart
- City search: https://www.freeastroapi.com/docs/geo/search
- Match by birth: https://www.freeastroapi.com/docs/vedic/match
- Muhurat search: https://www.freeastroapi.com/docs/vedic/muhurat-search
