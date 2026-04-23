# Fit Parent Plan – The Busy Parent’s Landing Platform

[Live Demo](https://fit-parent-plan-platform.vercel.app/)

Welcome to Fit Parent Plan!  
Created and maintained by Virginia Mwega (Full-Stack Developer)

---

## Why This Project?

As a full-stack developer and a fitness enthusiast who understands the demands of parenthood, I built this Next.js platform specifically for busy parents who want proven fat loss strategies—without spending hours in the gym or navigating complex nutrition plans.

## Technical Stack

- Frameworks/Libraries: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4
- Best Practices: Strict linting (ESLint 9), modern deployment (Turbopack)
- Development Tools: Node.js 20+, npm 10+

## Features for Families on the Go

- Fast landing page with offer, social proof, FAQ, and simple lead capture
- Mobile-first, accessible design
- Optimized form submissions for minimal time investment
- Automated privacy protection (rate limiting, anti-spam, bot detection, optional CAPTCHA)
- Clear “Thank You” confirmation and direct contact options

## How to Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Core Structure

- app/page.tsx — Main landing page (offer, FAQ, lead form)
- components/lead-capture-form.tsx — Collects leads securely
- app/api/leads/route.ts — Handles form submissions
- lib/analytics.ts — Tracks page views and scroll depth for analytics

## Data Protection and Security

The lead form is designed to stop spam and bots:
- Hidden honeypot fields
- Minimum fill-out time check
- Per-IP request rate limiting
- Optional Cloudflare Turnstile CAPTCHA

## Production-Ready

- Deployable to Vercel or any Node.js/Next.js host
- Environment variables supported for Google Analytics, CRM integrations, security keys, and contact email

## About the Developer

I’m Virginia, a full-stack developer who codes with empathy for both users and businesses.  
If you're interested in collaborating, hiring, or just want to discuss the project, feel free to reach out.

---

“Helping parents get fit shouldn’t mean giving up all your time—great code makes health simple.”
