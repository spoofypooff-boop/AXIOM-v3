create extension if not exists "uuid-ossp";

create table public.user_profiles (
  id                      uuid primary key default uuid_generate_v4(),
  user_id                 uuid not null references auth.users(id) on delete cascade,
  display_name            text not null default '',
  role                    text not null default 'user' check (role in ('user', 'admin')),
  color                   text not null default '#3b82f6',
  poly_proxy_wallet       text not null default '',
  poly_wallet_private_key text not null default '',
  strategy_id             text not null default 'stub',
  strategy_config         jsonb not null default '{}',
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),
  unique(user_id)
);

alter table public.user_profiles enable row level security;

-- Users can read their own profile (excluding key fields — use a view or explicit column list)
create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = user_id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.user_profiles for select
  using (
    exists (
      select 1 from public.user_profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can delete profiles"
  on public.user_profiles for delete
  using (
    exists (
      select 1 from public.user_profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- Auto-create profile on signup with color assignment
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  color_palette text[] := array[
    '#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6',
    '#ec4899','#14b8a6','#f97316','#06b6d4','#84cc16',
    '#a855f7','#22d3ee','#fb923c','#4ade80','#f472b6','#facc15'
  ];
  assigned_color text;
  user_count int;
begin
  select count(*) into user_count from public.user_profiles;
  assigned_color := color_palette[(user_count % 16) + 1];
  insert into public.user_profiles (user_id, display_name, color)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    assigned_color
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute procedure public.set_updated_at();
