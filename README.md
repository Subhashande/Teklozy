# Teklozy — Career Journey Website

A responsive React + TypeScript + Vite website with a Supabase-backed login and contact form.

## Included

- Responsive landing page, career journey, community section and team page.
- Shared navigation with **Events & Programs** and working Events / Career Opportunities pages.
- Login-only interface (public sign-up controls are removed from the website UI).
- Supabase email/password login, Google OAuth, GitHub OAuth, password recovery and profile lookup.
- Supabase `profiles` and `contact_submissions` schema with Row Level Security migration.
- Contact form limited to **College Partnership**.
- Startup India mark in the community section.
- Optimized WebP hero, community, login, team and career-stage imagery.
- Reduced-motion support and responsive styles for mobile, tablet and desktop.

## Requirements

- Node.js 20.19+ or 22.12+ (Node 24 is also suitable).
- npm.
- A Supabase project.

## Run locally

1. Extract this project and open the folder containing `package.json`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set the Supabase Project URL and publishable/anon key:

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
   ```

4. Start Vite:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (normally `http://localhost:5173`).

## Supabase setup

1. Open Supabase Dashboard → SQL Editor.
2. Run `supabase/migrations/202610300001_initial_landing_page_backend.sql` once.
3. Configure Google and GitHub under Authentication → Sign In / Providers.
4. Add your local and production callback URLs to the provider configuration. Supabase's OAuth callback is shown in the provider settings.
5. Configure the allowed redirect URLs in Authentication → URL Configuration.
6. Follow `BACKEND_SETUP.md` for the database, authentication and deployment checklist.

The frontend uses only the Supabase publishable/anon key. **Never put a Supabase `service_role` key in `.env`, source code, or a client bundle.**

## Login-only website UI

The public Sign Up tab and registration links have been removed from the UI. Existing accounts can still log in. If public account creation must also be blocked at the Supabase Auth service level, turn off **Authentication → Sign In / Providers → Allow new users to sign up** in the Supabase Dashboard. Do this only if account creation should be administrator-managed.

## Pages

- `/` — Landing page
- `/#login` — Login
- `/#team` — Our Team
- `/#events` — Events & Programs (content placeholder, ready for real event details)
- `/#opportunities` — Career Opportunities (content placeholder, ready for verified listings)

Vercel's SPA rewrite is configured in `vercel.json` so direct route visits resolve to the app.

## Data transparency notes

- Placement metrics that were not backed by updated source figures have been replaced with a notice that verified figures will be published when supplied.
- Events and career listings are empty-state placeholders; no synthetic events or jobs are shown. Unconfirmed sample team profiles and numeric team/placement claims are also withheld until real details are supplied.
- The existing company email and LinkedIn destination have been retained because updated official values were not supplied.

## Build and checks

```bash
npm run build
npm run lint
npm test
```

Before production deployment, run the build and test commands locally after `npm install`, then test the site at mobile (360–430px), tablet (768–1024px) and desktop widths.
