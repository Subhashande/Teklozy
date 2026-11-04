# Teklozy backend (Supabase)

The working backend for this landing site is **Supabase Auth + PostgREST + PostgreSQL**.

- `supabase/migrations/`: SQL schema, policies and triggers to apply to your Supabase project.
- `BACKEND_SETUP.md`: step-by-step configuration, OAuth, SMTP, and production checks.
- The frontend calls Supabase through `src/lib/supabase.ts` (browser integration, not a backend server).

This is not a standalone Node/Express server. Deploying the frontend alone does not provision the backend.
You must apply the SQL migration and configure your own Supabase project and `.env` values.
No real credentials are bundled.
