# Fit Parent Plan

A Next.js 16 landing site for busy parents who want fat loss without long gym sessions.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint 9 (`eslint-config-next`)

## Prerequisites

- Node.js 20+
- npm 10+

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Turbopack Root Warning

If you see a warning about multiple lockfiles, Next.js may be picking the wrong workspace root.
This project sets `turbopack.root` in `next.config.ts` so Turbopack always uses this folder.
If you add another lockfile above this repo, remove it or expect the warning to return.

## Scripts

- `npm run dev`: Start the local development server
- `npm run build`: Create a production build
- `npm run start`: Run the production server
- `npm run lint`: Run ESLint checks

## Project Structure

- `app/layout.tsx`: Root layout and global metadata
- `app/page.tsx`: Main landing page (offer, trust, FAQ, lead form)
- `app/api/leads/route.ts`: Lead capture API endpoint
- `app/privacy/page.tsx`: Privacy policy page
- `app/terms/page.tsx`: Terms page
- `app/contact/page.tsx`: Contact page
- `app/thank-you/page.tsx`: Post-submit confirmation page
- `app/sitemap.ts`: XML sitemap generation
- `app/robots.ts`: robots.txt generation
- `app/globals.css`: Global styles and theme variables
- `components/lead-capture-form.tsx`: Lead form UI and submission logic
- `components/analytics.tsx`: Pageview + scroll depth tracking
- `lib/analytics.ts`: Frontend event tracking helper
- `public/`: Static assets

## Environment Variables

Set these variables in production:

- `NEXT_PUBLIC_SITE_URL`: canonical URL + metadata base
- `NEXT_PUBLIC_GA_ID`: optional Google Analytics 4 measurement ID for pageviews, CTA/form events, and scroll-depth tracking
- `LEAD_WEBHOOK_URL`: optional webhook URL for forwarding lead submissions to your CRM
- `CONTACT_EMAIL`: email shown on the contact page
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile site key for frontend challenge
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret key for server-side verification

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
LEAD_WEBHOOK_URL=https://your-crm-webhook-endpoint
CONTACT_EMAIL=coach@fitparentplan.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

If `NEXT_PUBLIC_SITE_URL` is not set, it falls back to `http://localhost:3000`.
If `NEXT_PUBLIC_GA_ID` is not set, analytics scripts are skipped.
If `LEAD_WEBHOOK_URL` is not set, leads are logged on the server.
If Turnstile keys are set, CAPTCHA verification is enforced before processing leads.

## Lead Form Protection

The lead endpoint includes baseline anti-spam protection:

- Hidden honeypot field check
- Minimum form-completion time check
- Per-IP in-memory rate limiting (5 requests / 15 minutes)
- Optional Cloudflare Turnstile verification (recommended for production)

## Deployment

This app can be deployed on Vercel or any platform that supports Node.js and Next.js.

Recommended flow:

```bash
npm run lint
npm run build
```

Then deploy the repository.
