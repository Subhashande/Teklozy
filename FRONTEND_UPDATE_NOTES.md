# Teklozy frontend update

This ZIP contains the updated React/Vite frontend and the client-side Supabase integration files required by the UI.

## UI changes
- The Our Team page now reuses the same floating dark capsule navigation as the landing page.
- The shared header keeps the four navigation items (How it works, Career Levels, Success Stories, Our Team), plus Log in and Contact Us.
- The Our Team category filter chips have been removed; all team cards are displayed together.
- The footer has a more polished visual treatment while retaining its existing sections, links, and actions.

## Supabase client configuration
The frontend still expects the following variables in a local `.env` file:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Copy `.env.example` to `.env` and add your own project values. Never commit `.env` or a Supabase service-role/secret key.

## Run locally

```bash
npm install
npm run dev
```

The Supabase database migration and backend setup guide are intentionally not included in this frontend-only archive. Keep using the separate backend package/repository for those files.

## Responsive update (November 2026)
- Added a shared responsive stylesheet for phone, tablet, and desktop breakpoints.
- Changed the shared navigation to use the compact menu drawer below 1024px, avoiding crowded navigation on iPad/tablet widths.
- Tuned the team page hero, metrics, and member grid for narrow screens and tablets.
- Tuned footer columns to avoid cramped links at tablet widths.
- Changed the login layout to allow natural scrolling on phones/tablets and retain the contained split-panel layout on larger desktop screens.
- Added short-screen scrolling behavior for the contact dialog and reduced-motion support.
- Kept the existing Supabase browser client, authentication flows, contact submission behavior, page content, and intro animation intact.

## Device testing checklist
- Phone: 320px, 360px, 390px, 430px widths.
- Tablet: 768px portrait and 1024px landscape widths.
- Desktop: 1280px and 1440px widths.
- Check menu open/close, login form scrolling, contact dialog scrolling, team cards, and horizontal overflow.
