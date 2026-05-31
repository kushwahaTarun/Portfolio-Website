-- Run this in Supabase Dashboard → SQL Editor → New Query → Run.

create table if not exists public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  content text not null,
  order_index integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists knowledge_base_active_idx
  on public.knowledge_base (is_active, category, order_index);

alter table public.knowledge_base enable row level security;

drop policy if exists "knowledge_base_no_anon_access" on public.knowledge_base;
create policy "knowledge_base_no_anon_access"
  on public.knowledge_base
  for select
  to anon, authenticated
  using (false);

create or replace function public.touch_knowledge_base_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_touch_knowledge_base on public.knowledge_base;
create trigger trg_touch_knowledge_base
  before update on public.knowledge_base
  for each row execute function public.touch_knowledge_base_updated_at();

insert into public.knowledge_base (category, title, content, order_index) values
  ('identity', 'About Tarun',
   'Tarun Kushwaha is a Senior React & Next.js Developer based in Kanpur, India. He has 4 years of experience at Fluid AI building multi-tenant AI products. He is open to full-time roles and freelance engagements. Contact: kushwahatarun9@gmail.com.',
   0),
  ('experience', 'Current role at Fluid AI',
   'Since January 2025, Tarun has been a Senior React & Next.js Developer at Fluid AI, owning a big chunk of the Fluid GPT frontend including performance, multitenancy, and the move to on-prem deployments.',
   1),
  ('experience', 'Senior React Developer at Fluid AI (Aug 2024 - Jan 2025)',
   'Promoted into the senior role and tasked with designing the Fluid GPT Admin frontend from scratch — Knowledge Base, Chat, Admin Settings, and the workflow editor built on React Flow.',
   2),
  ('skills', 'Core stack',
   'React, Next.js, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, React Flow, Node.js, MongoDB, Firebase, Docker, Playwright, CI/CD.',
   10),
  ('availability', 'Hiring and freelance',
   'Tarun is open to senior frontend roles and freelance React/Next.js projects. Best way to start a conversation is the contact form on this site or email kushwahatarun9@gmail.com.',
   20);
