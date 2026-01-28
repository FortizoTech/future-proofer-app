-- Create tables for African-First AI System

-- 1. Data Sources
create table if not exists public.data_sources (
  id uuid default gen_random_uuid() primary key,
  organization_name text not null,
  organization_type text check (organization_type in (
    'GOVERNMENT', 'NGO', 'RESEARCH', 'PRIVATE', 'MULTILATERAL'
  )),
  credibility_rating integer check (credibility_rating between 1 and 5),
  website_url text,
  created_at timestamptz default now()
);

-- 2. Countries
create table if not exists public.countries (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  iso_code text not null unique,
  region text,
  currency_code text,
  currency_symbol text,
  exchange_rate_to_usd numeric,
  created_at timestamptz default now()
);

-- 3. Sectors
create table if not exists public.sectors (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  description text,
  parent_sector_id uuid references public.sectors(id),
  created_at timestamptz default now()
);

-- 4. Roles
create table if not exists public.roles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  sector_id uuid references public.sectors(id),
  seniority_level text check (seniority_level in (
    'ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE'
  )),
  description text,
  created_at timestamptz default now()
);

-- 5. Market Insights
create table if not exists public.market_insights (
  id uuid default gen_random_uuid() primary key,
  insight_type text not null check (insight_type in (
    'SECTOR_GROWTH', 'EMPLOYMENT_TREND', 'OPPORTUNITY', 'CHALLENGE', 'GOVERNMENT_INITIATIVE', 'MARKET_SIZE'
  )),
  country_id uuid references public.countries(id),
  region text,
  sector_id uuid references public.sectors(id),
  title text not null,
  description text not null,
  metric_value numeric,
  metric_unit text,
  year integer not null,
  quarter integer check (quarter between 1 and 4),
  source_id uuid references public.data_sources(id),
  source_url text,
  source_page_reference text,
  confidence_level text check (confidence_level in ('LOW', 'MEDIUM', 'HIGH')),
  is_current boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Salary Data
create table if not exists public.salary_data (
  id uuid default gen_random_uuid() primary key,
  role_id uuid references public.roles(id),
  role_custom_title text,
  country_id uuid references public.countries(id),
  city text,
  min_salary numeric not null,
  max_salary numeric not null,
  currency_code text not null,
  period text not null check (period in ('HOURLY', 'MONTHLY', 'ANNUAL')),
  experience_years_min integer,
  experience_years_max integer,
  employment_type text check (employment_type in ('FULL_TIME', 'CONTRACT', 'FREELANCE')),
  source_id uuid references public.data_sources(id),
  year integer not null,
  sample_size integer,
  is_current boolean default true,
  created_at timestamptz default now()
);

-- 7. Skills Demand
create table if not exists public.skills_demand (
  id uuid default gen_random_uuid() primary key,
  skill_name text not null,
  skill_category text,
  country_id uuid references public.countries(id),
  sector_id uuid references public.sectors(id),
  demand_level text check (demand_level in ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  demand_trend text check (demand_trend in ('DECLINING', 'STABLE', 'GROWING', 'EXPLOSIVE')),
  job_postings_mentioning integer,
  salary_premium_percent numeric,
  source_id uuid references public.data_sources(id),
  year integer not null,
  is_current boolean default true,
  created_at timestamptz default now()
);

-- 8. Business Environment
create table if not exists public.business_environment (
  id uuid default gen_random_uuid() primary key,
  country_id uuid references public.countries(id) not null,
  aspect_type text not null check (aspect_type in (
    'TAX_RATE', 'LICENSE_REQUIREMENT', 'REGISTRATION_TIME', 'EASE_OF_DOING_BUSINESS', 'FUNDING_AVAILABILITY', 'INFRASTRUCTURE', 'REGULATORY_CHANGE'
  )),
  sector_id uuid references public.sectors(id),
  title text not null,
  description text not null,
  metric_value numeric,
  metric_unit text,
  impact_on_business text check (impact_on_business in ('POSITIVE', 'NEUTRAL', 'NEGATIVE')),
  source_id uuid references public.data_sources(id),
  year integer not null,
  is_current boolean default true,
  created_at timestamptz default now()
);

-- 9. AI Interactions (Logging)
create table if not exists public.ai_interactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  user_message text not null,
  ai_response text not null,
  context jsonb,
  retrieved_data_count integer,
  validation_issues text[],
  tokens_used integer,
  response_time_ms integer,
  model_used text,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_market_insights_country on market_insights(country_id);
create index if not exists idx_market_insights_sector on market_insights(sector_id);
create index if not exists idx_market_insights_year on market_insights(year desc);
create index if not exists idx_salary_data_country_role on salary_data(country_id, role_id);
create index if not exists idx_skills_demand_country on skills_demand(country_id);
create index if not exists idx_ai_interactions_user on ai_interactions(user_id);
create index if not exists idx_ai_interactions_created on ai_interactions(created_at desc);

-- Seed Data

-- Data Sources
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('African Development Bank', 'MULTILATERAL', 5, 'https://www.afdb.org'),
  ('Ghana Statistical Service', 'GOVERNMENT', 5, 'https://statsghana.gov.gh'),
  ('ECOWAS', 'MULTILATERAL', 5, 'https://www.ecowas.int'),
  ('Gambia Bureau of Statistics', 'GOVERNMENT', 4, 'https://www.gbos.gov.gm'),
  ('National Bureau of Statistics Nigeria', 'GOVERNMENT', 5, 'https://www.nigerianstat.gov.ng');

-- Countries
insert into countries (name, iso_code, region, currency_code, currency_symbol, exchange_rate_to_usd) values
  ('Ghana', 'GH', 'West Africa', 'GHS', '₵', 15.0),
  ('Gambia', 'GM', 'West Africa', 'GMD', 'D', 68.0),
  ('Nigeria', 'NG', 'West Africa', 'NGN', '₦', 1600.0);

-- Sectors
insert into sectors (name, description) values
  ('Technology', 'Software, IT services, digital platforms'),
  ('Agriculture', 'Farming, agribusiness, agri-tech'),
  ('Healthcare', 'Medical services, pharmaceuticals, health tech'),
  ('Finance', 'Banking, fintech, insurance, microfinance'),
  ('Education', 'Schools, online learning, training');

-- Roles (Technology)
do $$
declare
  tech_id uuid;
begin
  select id into tech_id from sectors where name = 'Technology';
  
  insert into roles (title, sector_id, seniority_level, description) values
    ('Software Developer', tech_id, 'JUNIOR', 'Builds web and mobile applications'),
    ('Data Analyst', tech_id, 'ENTRY', 'Analyzes data sets to find trends'),
    ('Product Manager', tech_id, 'MID', 'Manages product development lifecycle');
end $$;

-- Market Insights (Ghana Tech)
do $$
declare
  gh_id uuid;
  tech_id uuid;
  afdb_id uuid;
begin
  select id into gh_id from countries where name = 'Ghana';
  select id into tech_id from sectors where name = 'Technology';
  select id into afdb_id from data_sources where organization_name = 'African Development Bank';

  insert into market_insights (
    insight_type, country_id, sector_id, title, description, 
    metric_value, metric_unit, year, source_id, confidence_level
  ) values (
    'SECTOR_GROWTH', gh_id, tech_id, 'Tech Sector Growing Rapidly in Ghana',
    'The technology sector in Ghana experienced significant growth in 2024, driven by increased digital adoption and government support for startups.',
    42, 'percent', 2024, afdb_id, 'HIGH'
  );
end $$;

-- Salary Data (Ghana Software Developer)
do $$
declare
  gh_id uuid;
  role_id uuid;
  afdb_id uuid;
begin
  select id into gh_id from countries where name = 'Ghana';
  select id into role_id from roles where title = 'Software Developer';
  select id into afdb_id from data_sources where organization_name = 'African Development Bank';

  insert into salary_data (
    role_id, country_id, min_salary, max_salary, 
    currency_code, period, experience_years_min, experience_years_max,
    year, source_id, sample_size
  ) values (
    role_id, gh_id, 3000, 8000, 'GHS', 'MONTHLY', 0, 2, 2024, afdb_id, 247
  );
end $$;
