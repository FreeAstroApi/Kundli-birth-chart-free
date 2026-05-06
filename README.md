# Kundli Birth Chart Desk

A Next.js app for generating Vedic Kundli birth charts with FreeAstroAPI. The browser talks only to local Next.js route handlers, so the FreeAstro API key stays server-side.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- FreeAstroAPI V2 endpoints

## Local Development

Create `.env.local`:

```bash
cp .env.example .env.local
```

Set the required server-side key:

```env
FREEASTRO_API_KEY=your_freeastroapi_key_here
FREEASTRO_API_BASE=https://api.freeastroapi.com
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
4. Deploy.

Do not add `.env.local` to Git. The repo keeps `.env.example` trackable for setup documentation, while local environment files remain ignored.

Vercel currently supports selecting Node.js through `package.json` `engines.node`; this app pins `24.x` to match Vercel's current default Node runtime family.

## Production Checks

Run before deployment:

```bash
npm run lint
npm run build
```

## API Routes

- `GET /api/geo/search` proxies FreeAstro city autocomplete.
- `POST /api/kundli` calls the Vedic chart modules server-side.

Required FreeAstro docs:

- Vedic chart: https://www.freeastroapi.com/docs/vedic/chart
- City search: https://www.freeastroapi.com/docs/geo/search
