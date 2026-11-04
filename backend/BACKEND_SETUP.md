# Teklozy landing page — Supabase backend

This implementation intentionally covers the **public landing website only**: the login screen linked from the landing page, password reset, optional Google/GitHub OAuth, user profile/role records, and the Contact Us form. It does not create the future student/mentor dashboards, career-level activities, assessments, or admin application.

## 1. Supabase project setup

1. Create a project at https://supabase.com/dashboard.
2. Open **Project Settings → API** and copy the Project URL and the publishable/anon key.
3. In the project **SQL Editor**, run the complete SQL file:
   `supabase/migrations/202610300001_initial_landing_page_backend.sql`
4. In **Authentication → URL Configuration**, set:
   - Site URL: `https://www.teklozy.in`
   - Redirect URLs: `https://www.teklozy.in/login`, `https://teklozy.in/login`, and your local development URL such as `http://localhost:5173/login`.
5. In **Authentication → Providers**, enable Email. Configure SMTP in **Authentication → SMTP Settings** before production so confirmation and password-reset emails are reliably delivered. Supabase's default email service has sending limits and is not intended for production volume.
6. For Google/GitHub buttons, enable each provider and enter the provider's OAuth client credentials. Configure the callback URL shown by Supabase in the provider console. If a provider is not enabled, its button will return a provider configuration error.

## 2. Configure the frontend

Copy `.env.example` to `.env` and fill in the values from your Supabase project:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Install dependencies and start the site:

```bash
npm install
npm run dev
```

Build for deployment:

```bash
npm run build
```

Set the same two environment variables in your hosting provider (for example, Vercel → Project → Settings → Environment Variables), then redeploy. Configure SPA rewrites so `/login` and `/team` serve `index.html`.

## 3. What is connected

- **Email/password login:** Supabase Auth authenticates existing users. Passwords are handled by Supabase Auth; this application never stores plaintext passwords. Public sign-up controls and the client-side sign-up helper are not included in the website UI.
- **Profiles:** an `auth.users` trigger creates a matching `public.profiles` row with name, institution and role.
- **Role safety:** the auth trigger creates profiles for users provisioned through Supabase Auth. Management accounts cannot grant themselves management privileges. A trusted project owner must promote a verified account using the SQL below. To block all public account creation at the service level, turn off **Authentication → Sign In / Providers → Allow new users to sign up**.
- **Password reset:** sends a Supabase recovery email. Configure the email template and redirect URL in Supabase.
- **Google/GitHub:** real OAuth redirects; each provider must be configured in Supabase first.
- **Contact form:** submissions are inserted into `public.contact_submissions`. The UI reports success only after Supabase confirms the insert. Public visitors cannot read, update or delete submissions.
- **Data access:** Row Level Security is enabled. The browser only uses the publishable/anon key. No service-role key belongs in this repository or frontend environment.

## 4. Grant management access safely

The landing page currently includes a Management login choice. Public registration UI is removed; management accounts should be provisioned by a trusted administrator. After the person has created and verified an account through an approved process, locate their UUID in **Authentication → Users** and run this as the project owner in SQL Editor:

```sql
update public.profiles
set role = 'management'
where id = 'AUTH_USER_UUID';
```

Do not expose the Supabase service-role key to the browser or put it in `.env` variables prefixed with `VITE_`.

## 5. View real contact submissions

Open **Table Editor → public.contact_submissions** in Supabase. Each successfully submitted contact form appears there with its timestamp and `new` status. The public landing page does not expose a contact-submission admin dashboard. Email notifications to the Teklozy team are not automatically sent by a database insert; configure a Supabase Database Webhook/Edge Function and a transactional email provider if inbox notifications are required.

## 6. Production checks before launch

- Add a production SMTP provider and test password reset end-to-end. If you enable account provisioning workflows, test email delivery for those workflows separately.
- Configure Google/GitHub OAuth only if you intend to offer those methods.
- Test a student account, a teacher account, and an administrator-promoted management account.
- Confirm the `contact_submissions` table receives a real record and anonymous users cannot select it.
- Add CAPTCHA/Turnstile and server-side rate limiting to the contact endpoint before exposing it to high-volume public traffic. Database constraints and RLS protect data access, but do not by themselves prevent automated spam.
- Add privacy policy/terms and ensure the contact form consent and data-retention policy match Teklozy's actual practices.

## Important scope note

No real Supabase project credentials were supplied, so this ZIP contains the integration and database migration but cannot be connected to or live-tested against Teklozy's actual Supabase instance yet. No sample users, enquiries, fake dashboard metrics, or synthetic business records are inserted by the migration.
