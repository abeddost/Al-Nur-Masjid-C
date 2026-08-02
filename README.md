# Mosque An-Nur

Website for An-Nur Mosque / Afghanisch Islamischer Kulturverein Wiesbaden und Umgebung e.V., built with Next.js (App Router).

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- [next-intl](https://next-intl.dev) for 4-language i18n: German (default), English, Farsi, Pashto — with RTL support for Farsi/Pashto
- [Resend](https://resend.com) for the membership and donation form emails
- Live prayer times sourced from [Mawaqit](https://mawaqit.net), rendered in the site's own design

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.local.example` (or create `.env.local`) and set:

```bash
RESEND_API_KEY=your_resend_api_key
```

Without a key, the membership and donation forms will show their error state on submit.

## Project structure

- `src/app/[locale]/` — locale-prefixed routes (`/de`, `/en`, `/fa`, `/ps`)
- `messages/*.json` — per-locale UI and page copy
- `src/components/` — shared UI components
- `src/lib/` — server-side helpers (Resend client, Mawaqit prayer-time fetch/parse)
