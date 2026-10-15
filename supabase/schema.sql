-- Run this once in Supabase Dashboard > SQL Editor.
-- Visitors can only INSERT messages. Only you (signed in with the owner email) can read or delete them.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254 and email like '%@%'),
  message text not null check (char_length(message) between 10 and 2000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Visitors can send a message" on public.contact_messages;
create policy "Visitors can send a message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Change the email below if you sign in to the inbox with a different address.
drop policy if exists "Owner can read messages" on public.contact_messages;
create policy "Owner can read messages"
  on public.contact_messages
  for select
  to authenticated
  using ((auth.jwt() ->> 'email') = 'jyotishkumarjhar@gmail.com');

drop policy if exists "Owner can delete messages" on public.contact_messages;
create policy "Owner can delete messages"
  on public.contact_messages
  for delete
  to authenticated
  using ((auth.jwt() ->> 'email') = 'jyotishkumarjhar@gmail.com');
