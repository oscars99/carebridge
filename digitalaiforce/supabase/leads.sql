-- Optional: store contact-form submissions in Supabase.
-- 1. Run this in the Supabase SQL editor (or as a migration).
-- 2. In src/config/site.ts set form.supabase.url and form.supabase.anonKey
--    (Project Settings → API → Project URL / publishable "anon" key).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 160),
  phone text check (char_length(phone) <= 40),
  business text check (char_length(business) <= 120),
  website text check (char_length(website) <= 200),
  services text[] not null default '{}',
  budget text check (char_length(budget) <= 40),
  message text not null check (char_length(message) between 1 and 4000),
  plan text check (char_length(plan) <= 80),
  page text check (char_length(page) <= 200)
);

alter table public.leads enable row level security;

-- Visitors (the public anon key) can submit a lead but can never read, change or delete leads.
drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead"
  on public.leads for insert
  to anon
  with check (true);

revoke all on public.leads from anon;
grant insert on public.leads to anon;
