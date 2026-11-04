-- Teklozy landing-page backend: profiles, public contact submissions and RLS.
-- Run this migration in Supabase SQL Editor or with Supabase CLI.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  institution_name text not null default '',
  role text not null default 'student' check (role in ('student', 'teacher', 'management')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role text;
begin
  requested_role := coalesce(new.raw_user_meta_data ->> 'requested_role', 'student');
  -- Public registration may create student or teacher accounts only.
  -- Management access must be provisioned by a trusted administrator.
  if requested_role not in ('student', 'teacher') then
    requested_role := 'student';
  end if;

  insert into public.profiles (id, full_name, institution_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'institution_name', ''),
    requested_role
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    institution_name = excluded.institution_name,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(email) <= 254 and email ~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$'),
  topic text not null check (topic in ('Student / Learner', 'College Partnership', 'Mentorship', 'Other')),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  source text not null default 'landing_page' check (source = 'landing_page'),
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions(created_at desc);
create index if not exists contact_submissions_status_idx
  on public.contact_submissions(status);

alter table public.profiles enable row level security;
alter table public.contact_submissions enable row level security;

-- Users can read their own profile. They cannot change their role from the client.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

-- Profile writes are performed by the trusted auth trigger/admin only.

-- Anonymous visitors may submit contact forms; public users cannot read or modify submissions.
drop policy if exists "Anyone can submit landing page contact form" on public.contact_submissions;
create policy "Anyone can submit landing page contact form"
on public.contact_submissions for insert
to anon, authenticated
with check (
  source = 'landing_page'
  and status = 'new'
  and char_length(trim(full_name)) between 2 and 120
  and char_length(trim(message)) between 10 and 5000
);

revoke all on public.profiles from anon;
revoke insert, update, delete on public.profiles from authenticated;
grant select on public.profiles to authenticated;


revoke all on public.contact_submissions from anon, authenticated;
grant insert (full_name, email, topic, message, source) on public.contact_submissions to anon, authenticated;

-- Never expose a service_role key in frontend code. Use Supabase Dashboard/admin tools
-- to assign management role to trusted staff, e.g.:
-- update public.profiles set role = 'management' where id = '<auth-user-uuid>';
