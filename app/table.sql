create table public.market_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(btrim(full_name)) between 1 and 120),
  account_type text not null check (account_type in ('customer', 'vendor')),
  created_at timestamptz not null default now()
);

create table public.vendor_applications (
  user_id uuid primary key references auth.users(id) on delete cascade,
  business_name text not null check (char_length(btrim(business_name)) between 1 and 160),
  market_location text not null check (char_length(btrim(market_location)) between 1 and 200),
  business_description text check (
    business_description is null or char_length(business_description) <= 1000
  ),
  website text check (website is null or char_length(website) <= 500),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);



alter table public.market_profiles enable row level security;
alter table public.vendor_applications enable row level security;

revoke all on public.market_profiles from anon, authenticated;
revoke all on public.vendor_applications from anon, authenticated;
grant select on public.market_profiles to authenticated;
grant select on public.vendor_applications to authenticated;

create policy "Users can read their own profile"
on public.market_profiles
for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Vendors can read their own application"
on public.vendor_applications
for select to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.create_market_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role text := coalesce(new.raw_user_meta_data ->> 'requested_role', 'customer');
  full_name_value text := nullif(btrim(new.raw_user_meta_data ->> 'full_name'), '');
  business_name_value text := nullif(btrim(new.raw_user_meta_data ->> 'business_name'), '');
  market_location_value text := nullif(btrim(new.raw_user_meta_data ->> 'market_location'), '');
  business_description_value text := nullif(btrim(new.raw_user_meta_data ->> 'business_description'), '');
  website_value text := nullif(btrim(new.raw_user_meta_data ->> 'website'), '');
begin
  if requested_role not in ('customer', 'vendor') then
    raise exception 'Invalid account type';
  end if;

  if full_name_value is null then
    raise exception 'Full name is required';
  end if;

  insert into public.market_profiles (user_id, full_name, account_type)
  values (new.id, full_name_value, requested_role);

  if requested_role = 'vendor' then
    if business_name_value is null or market_location_value is null then
      raise exception 'Vendor business name and market location are required';
    end if;

    insert into public.vendor_applications (
      user_id,
      business_name,
      market_location,
      business_description,
      website
    )
    values (
      new.id,
      business_name_value,
      market_location_value,
      business_description_value,
      website_value
    );
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created_market_profile
  after insert on auth.users
  for each row execute procedure public.create_market_profile_for_new_user();