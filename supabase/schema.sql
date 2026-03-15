-- PathPilot Database Schema for Supabase/PostgreSQL
-- Run this in Supabase SQL Editor

-- ================================================
-- EXTENSIONS
-- ================================================
create extension if not exists "uuid-ossp";

-- ================================================
-- TABLES
-- ================================================

-- Cities / Stations table
create table if not exists cities (
  id          text primary key,
  name        text not null,
  code        text not null,
  state       text not null check (state in ('Maharashtra', 'Bihar', 'Gujarat', 'Delhi', 'Rajasthan')),
  latitude    numeric(9,6),
  longitude   numeric(9,6),
  image_url   text,
  popular     boolean default false,
  created_at  timestamptz default now()
);

-- Transports table (flights, trains, buses, taxis)
create table if not exists transports (
  id               uuid primary key default uuid_generate_v4(),
  mode             text not null check (mode in ('flight', 'train', 'bus', 'taxi')),
  from_city_id     text references cities(id),
  to_city_id       text references cities(id),
  operator         text not null,
  depart_time      text not null,
  arrive_time      text not null,
  duration_minutes integer not null,
  cost             numeric(10,2) not null,
  co2_kg           numeric(8,2),
  available_seats  integer default 0,
  class            text,
  created_at       timestamptz default now()
);

-- Itineraries table
create table if not exists itineraries (
  id                     uuid primary key default uuid_generate_v4(),
  user_id                uuid references auth.users(id) on delete cascade,
  title                  text not null,
  from_city              text not null,
  to_city                text not null,
  travel_date            date not null,
  return_date            date,
  total_cost             numeric(10,2) default 0,
  total_duration_minutes integer default 0,
  status                 text default 'draft' check (status in ('draft', 'saved', 'booked', 'confirmed', 'cancelled')),
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

-- Itinerary segments (ordered list of transport options in a trip)
create table if not exists itinerary_segments (
  id              uuid primary key default uuid_generate_v4(),
  itinerary_id    uuid references itineraries(id) on delete cascade,
  transport_id    uuid references transports(id),
  order_index     integer not null,
  passenger_name  text,
  seat            text,
  created_at      timestamptz default now()
);

-- Payments table
create table if not exists payments (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id),
  itinerary_id     uuid references itineraries(id),
  paypal_order_id  text unique,
  amount           numeric(10,2) not null,
  currency         text default 'INR',
  status           text default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  paid_at          timestamptz,
  created_at       timestamptz default now()
);

-- ================================================
-- INDEXES
-- ================================================
create index if not exists idx_transports_from_to on transports(from_city_id, to_city_id);
create index if not exists idx_itineraries_user on itineraries(user_id);
create index if not exists idx_segments_itinerary on itinerary_segments(itinerary_id);
create index if not exists idx_payments_user on payments(user_id);
create index if not exists idx_payments_itinerary on payments(itinerary_id);

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS on all user-specific tables
alter table itineraries enable row level security;
alter table itinerary_segments enable row level security;
alter table payments enable row level security;

-- Itineraries: users see only their own
create policy "Users can view own itineraries"
  on itineraries for select
  using (auth.uid() = user_id);

create policy "Users can insert own itineraries"
  on itineraries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own itineraries"
  on itineraries for update
  using (auth.uid() = user_id);

create policy "Users can delete own itineraries"
  on itineraries for delete
  using (auth.uid() = user_id);

-- Itinerary segments: users can manage segments of their own itineraries
create policy "Users can manage own segments"
  on itinerary_segments for all
  using (
    exists (
      select 1 from itineraries
      where itineraries.id = itinerary_segments.itinerary_id
      and itineraries.user_id = auth.uid()
    )
  );

-- Payments: users see only their own
create policy "Users can view own payments"
  on payments for select
  using (auth.uid() = user_id);

-- Public read on cities and transports (no auth needed to search)
alter table cities enable row level security;
alter table transports enable row level security;

create policy "Anyone can view cities"
  on cities for select
  using (true);

create policy "Anyone can view transports"
  on transports for select
  using (true);

-- ================================================
-- SEED DATA: CITIES
-- ================================================
insert into cities (id, name, code, state, latitude, longitude, popular) values
  ('del', 'Delhi', 'DEL', 'Delhi', 28.6139, 77.2090, true),
  ('bom', 'Mumbai', 'BOM', 'Maharashtra', 19.0760, 72.8777, true),
  ('pnq', 'Pune', 'PNQ', 'Maharashtra', 18.5204, 73.8567, true),
  ('nag', 'Nagpur', 'NAG', 'Maharashtra', 21.1458, 79.0882, false),
  ('aur', 'Aurangabad', 'IXU', 'Maharashtra', 19.8762, 75.3433, false),
  ('amd', 'Ahmedabad', 'AMD', 'Gujarat', 23.0225, 72.5714, true),
  ('sur', 'Surat', 'STV', 'Gujarat', 21.1702, 72.8311, false),
  ('raj', 'Rajkot', 'RAJ', 'Gujarat', 22.3039, 70.8022, false),
  ('vdr', 'Vadodara', 'BDQ', 'Gujarat', 22.3072, 73.1812, false),
  ('jai', 'Jaipur', 'JAI', 'Rajasthan', 26.9124, 75.7873, true),
  ('jod', 'Jodhpur', 'JDH', 'Rajasthan', 26.2389, 73.0243, false),
  ('udp', 'Udaipur', 'UDR', 'Rajasthan', 24.5854, 73.7125, true),
  ('bkn', 'Bikaner', 'BKB', 'Rajasthan', 28.0229, 73.3119, false),
  ('aja', 'Ajmer', 'AII', 'Rajasthan', 26.4499, 74.6399, false),
  ('pat', 'Patna', 'PAT', 'Bihar', 25.5941, 85.1376, true),
  ('gay', 'Gaya', 'GAY', 'Bihar', 24.7955, 85.0002, false),
  ('muz', 'Muzaffarpur', 'MFP', 'Bihar', 26.1197, 85.3910, false),
  ('bgl', 'Bhagalpur', 'BGP', 'Bihar', 25.2425, 86.9842, false)
on conflict (id) do nothing;

-- ================================================
-- FUNCTION: Update updated_at on itinerary change
-- ================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger itineraries_updated_at
  before update on itineraries
  for each row execute function update_updated_at();
