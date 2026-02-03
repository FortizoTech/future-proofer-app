-- ============================================
-- FUTURE PROOFER - EXTENDED SIGNALS SCHEMA
-- Migration: 004_extended_signals.sql
-- Description: Add missing tables for complete data-driven dashboard
-- ============================================

-- ============================================
-- 1. JOB MARKET SIGNALS
-- Real-time job market data and hiring trends
-- ============================================
create table if not exists public.job_market_signals (
  id uuid default gen_random_uuid() primary key,
  signal_type text not null check (signal_type in (
    'HIRING_SURGE', 'LAYOFF_ALERT', 'REMOTE_OPPORTUNITY', 'SALARY_INCREASE', 'NEW_EMPLOYER', 'SKILL_SHIFT'
  )),
  country_id uuid references public.countries(id),
  sector_id uuid references public.sectors(id),
  role_id uuid references public.roles(id),
  title text not null,
  description text not null,
  metric_value numeric,
  metric_unit text,
  source_id uuid references public.data_sources(id),
  source_url text,
  source_page_reference text,
  year integer not null,
  quarter integer check (quarter between 1 and 4),
  confidence_level text check (confidence_level in ('LOW', 'MEDIUM', 'HIGH')),
  is_current boolean default true,
  captured_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================
-- 2. LEARNING PATHWAYS
-- Educational resources and courses for skill development
-- ============================================
create table if not exists public.learning_pathways (
  id uuid default gen_random_uuid() primary key,
  skill_target text not null,
  pathway_type text not null check (pathway_type in (
    'ONLINE_COURSE', 'BOOTCAMP', 'CERTIFICATION', 'DEGREE', 'WORKSHOP', 'MENTORSHIP', 'FREE_RESOURCE'
  )),
  provider text not null,
  title text not null,
  description text,
  duration_hours integer,
  duration_weeks integer,
  cost_usd numeric,
  cost_local numeric,
  cost_currency text,
  is_free boolean default false,
  difficulty_level text check (difficulty_level in ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
  country_id uuid references public.countries(id),
  region text,
  language text default 'English',
  source_id uuid references public.data_sources(id),
  source_url text not null,
  source_page_reference text,
  credibility_rating integer check (credibility_rating between 1 and 5),
  is_current boolean default true,
  captured_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================
-- 3. STARTUP ECOSYSTEM SIGNALS
-- Funding, accelerators, exits, and ecosystem activity
-- ============================================
create table if not exists public.startup_ecosystem_signals (
  id uuid default gen_random_uuid() primary key,
  signal_type text not null check (signal_type in (
    'FUNDING_ROUND', 'ACCELERATOR_COHORT', 'ACQUISITION', 'IPO', 'HUB_LAUNCH', 'INVESTOR_ENTRY', 'ECOSYSTEM_REPORT'
  )),
  country_id uuid references public.countries(id),
  sector_id uuid references public.sectors(id),
  title text not null,
  description text not null,
  company_name text,
  amount_usd numeric,
  investor_names text[],
  source_id uuid references public.data_sources(id),
  source_url text,
  source_page_reference text,
  year integer not null,
  month integer check (month between 1 and 12),
  confidence_level text check (confidence_level in ('LOW', 'MEDIUM', 'HIGH')),
  is_current boolean default true,
  captured_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================
-- 4. POLICY OPPORTUNITY ALERTS
-- Government policies, regulations, and opportunities
-- ============================================
create table if not exists public.policy_opportunity_alerts (
  id uuid default gen_random_uuid() primary key,
  policy_type text not null check (policy_type in (
    'TAX_INCENTIVE', 'GRANT_PROGRAM', 'REGULATORY_CHANGE', 'TRADE_AGREEMENT', 'LABOR_LAW', 'DIGITAL_POLICY', 'SECTOR_SUPPORT'
  )),
  country_id uuid references public.countries(id),
  sector_id uuid references public.sectors(id),
  title text not null,
  description text not null,
  effective_date date,
  expiry_date date,
  impact_on_business text check (impact_on_business in ('POSITIVE', 'NEUTRAL', 'NEGATIVE', 'MIXED')),
  impact_on_career text check (impact_on_career in ('POSITIVE', 'NEUTRAL', 'NEGATIVE', 'MIXED')),
  eligibility_criteria text,
  action_required text,
  source_id uuid references public.data_sources(id),
  source_url text not null,
  source_page_reference text,
  is_current boolean default true,
  captured_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================
-- 5. DATA REFRESH LOG
-- Track data freshness and update status
-- ============================================
create table if not exists public.data_refresh_log (
  id uuid default gen_random_uuid() primary key,
  table_name text not null,
  source_id uuid references public.data_sources(id),
  last_refresh_at timestamptz not null,
  next_scheduled_refresh timestamptz,
  records_updated integer default 0,
  records_added integer default 0,
  records_deleted integer default 0,
  status text check (status in ('SUCCESS', 'PARTIAL', 'FAILED', 'PENDING')),
  error_message text,
  refresh_duration_ms integer,
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
create index if not exists idx_job_market_signals_country on job_market_signals(country_id);
create index if not exists idx_job_market_signals_sector on job_market_signals(sector_id);
create index if not exists idx_job_market_signals_current on job_market_signals(is_current) where is_current = true;

create index if not exists idx_learning_pathways_skill on learning_pathways(skill_target);
create index if not exists idx_learning_pathways_country on learning_pathways(country_id);
create index if not exists idx_learning_pathways_free on learning_pathways(is_free) where is_free = true;

create index if not exists idx_startup_ecosystem_country on startup_ecosystem_signals(country_id);
create index if not exists idx_startup_ecosystem_sector on startup_ecosystem_signals(sector_id);
create index if not exists idx_startup_ecosystem_year on startup_ecosystem_signals(year desc);

create index if not exists idx_policy_alerts_country on policy_opportunity_alerts(country_id);
create index if not exists idx_policy_alerts_current on policy_opportunity_alerts(is_current) where is_current = true;

create index if not exists idx_data_refresh_table on data_refresh_log(table_name);
create index if not exists idx_data_refresh_status on data_refresh_log(status);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.job_market_signals enable row level security;
alter table public.learning_pathways enable row level security;
alter table public.startup_ecosystem_signals enable row level security;
alter table public.policy_opportunity_alerts enable row level security;
alter table public.data_refresh_log enable row level security;

-- Public read access for all tables (authenticated users)
create policy "Authenticated users can view job_market_signals"
  on public.job_market_signals for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view learning_pathways"
  on public.learning_pathways for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view startup_ecosystem_signals"
  on public.startup_ecosystem_signals for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view policy_opportunity_alerts"
  on public.policy_opportunity_alerts for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can view data_refresh_log"
  on public.data_refresh_log for select
  using (auth.role() = 'authenticated');

-- ============================================
-- SEED ADDITIONAL DATA SOURCES
-- ============================================

-- Job Market & Skill Demand Sources
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('LinkedIn Economic Graph', 'PRIVATE', 4, 'https://economicgraph.linkedin.com/'),
  ('Jobberman', 'PRIVATE', 4, 'https://www.jobberman.com/'),
  ('BrighterMonday', 'PRIVATE', 4, 'https://www.brightermonday.co.ke/'),
  ('Indeed Hiring Lab', 'PRIVATE', 4, 'https://www.hiringlab.org/'),
  ('Andela Insights', 'PRIVATE', 4, 'https://andela.com/insights/')
on conflict do nothing;

-- Salary & Compensation Sources
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('Paylab Africa', 'PRIVATE', 3, 'https://www.paylab.com/'),
  ('Salary Explorer', 'PRIVATE', 3, 'https://www.salaryexplorer.com/'),
  ('Glassdoor', 'PRIVATE', 3, 'https://www.glassdoor.com/')
on conflict do nothing;

-- Education & Learning Sources
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('Coursera Africa Skills', 'PRIVATE', 4, 'https://www.coursera.org/business/resources/'),
  ('ALX Africa', 'PRIVATE', 5, 'https://www.alxafrica.com/'),
  ('Andela Learning Community', 'PRIVATE', 4, 'https://andela.com/learning/'),
  ('UNESCO Institute for Statistics', 'MULTILATERAL', 5, 'https://uis.unesco.org/')
on conflict do nothing;

-- Business & Startup Ecosystem Sources
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('Disrupt Africa', 'PRIVATE', 4, 'https://disrupt-africa.com/'),
  ('Briter Bridges', 'RESEARCH', 5, 'https://briterbridges.com/'),
  ('Partech Africa', 'PRIVATE', 4, 'https://partechpartners.com/africa/'),
  ('AfriLabs', 'NGO', 4, 'https://www.afrilabs.com/')
on conflict do nothing;

-- Additional Government & Multilateral Sources
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('World Bank Africa Indicators', 'MULTILATERAL', 5, 'https://databank.worldbank.org/source/africa-development-indicators'),
  ('African Union', 'MULTILATERAL', 5, 'https://au.int/en/documents'),
  ('Kenya National Bureau of Statistics', 'GOVERNMENT', 5, 'https://www.knbs.or.ke/'),
  ('South Africa Statistics', 'GOVERNMENT', 5, 'https://www.statssa.gov.za/')
on conflict do nothing;

-- ============================================
-- SEED SAMPLE DATA FOR NEW TABLES
-- ============================================

-- Sample Job Market Signals
do $$
declare
  gh_id uuid;
  tech_id uuid;
  linkedin_id uuid;
begin
  select id into gh_id from countries where name = 'Ghana';
  select id into tech_id from sectors where name = 'Technology';
  select id into linkedin_id from data_sources where organization_name = 'LinkedIn Economic Graph';

  if gh_id is not null and tech_id is not null and linkedin_id is not null then
    insert into job_market_signals (
      signal_type, country_id, sector_id, title, description,
      metric_value, metric_unit, source_id, source_url, year, confidence_level
    ) values (
      'HIRING_SURGE', gh_id, tech_id,
      'Software Engineering Hiring Surge in Accra',
      'Major tech companies including Andela, MTN, and local startups increasing engineering headcount by 35% in Q4 2025.',
      35, 'percent increase', linkedin_id,
      'https://economicgraph.linkedin.com/resources/linkedin-workforce-report-africa',
      2025, 'HIGH'
    );
  end if;
end $$;

-- Sample Learning Pathways
do $$
declare
  alx_id uuid;
  gh_id uuid;
begin
  select id into alx_id from data_sources where organization_name = 'ALX Africa';
  select id into gh_id from countries where name = 'Ghana';

  if alx_id is not null then
    insert into learning_pathways (
      skill_target, pathway_type, provider, title, description,
      duration_weeks, is_free, region, source_id, source_url, credibility_rating
    ) values
    (
      'Software Engineering', 'BOOTCAMP', 'ALX Africa',
      'ALX Software Engineering Program',
      'Intensive 12-month program covering full-stack development, system design, and professional skills. Free for accepted applicants.',
      52, true, 'Pan-African',
      alx_id, 'https://www.alxafrica.com/software-engineering/', 5
    ),
    (
      'Data Science', 'ONLINE_COURSE', 'Coursera',
      'IBM Data Science Professional Certificate',
      'Self-paced certificate program covering Python, SQL, data visualization, and machine learning fundamentals.',
      24, false, 'Global',
      alx_id, 'https://www.coursera.org/professional-certificates/ibm-data-science', 4
    );
  end if;
end $$;

-- Sample Startup Ecosystem Signal
do $$
declare
  ng_id uuid;
  fintech_id uuid;
  disrupt_id uuid;
begin
  select id into ng_id from countries where name = 'Nigeria';
  select id into fintech_id from sectors where name = 'Finance';
  select id into disrupt_id from data_sources where organization_name = 'Disrupt Africa';

  if ng_id is not null and fintech_id is not null and disrupt_id is not null then
    insert into startup_ecosystem_signals (
      signal_type, country_id, sector_id, title, description,
      company_name, amount_usd, investor_names, source_id, source_url, year, month, confidence_level
    ) values (
      'FUNDING_ROUND', ng_id, fintech_id,
      'Nigerian Fintech Raises $15M Series A',
      'Leading payment infrastructure startup secures major Series A to expand across West Africa.',
      'Sample Fintech Co', 15000000,
      ARRAY['Partech Africa', 'Y Combinator', 'Local Angels'],
      disrupt_id,
      'https://disrupt-africa.com/funding-tracker/',
      2025, 11, 'HIGH'
    );
  end if;
end $$;

-- Sample Policy Alert
do $$
declare
  gh_id uuid;
  tech_id uuid;
  au_id uuid;
begin
  select id into gh_id from countries where name = 'Ghana';
  select id into tech_id from sectors where name = 'Technology';
  select id into au_id from data_sources where organization_name = 'African Union';

  if gh_id is not null and tech_id is not null and au_id is not null then
    insert into policy_opportunity_alerts (
      policy_type, country_id, sector_id, title, description,
      effective_date, impact_on_business, impact_on_career,
      eligibility_criteria, action_required,
      source_id, source_url
    ) values (
      'TAX_INCENTIVE', gh_id, tech_id,
      'Ghana Tech Startup Tax Holiday Extended',
      'Ghana Revenue Authority extends 5-year corporate tax exemption for registered tech startups generating less than $500,000 annual revenue.',
      '2025-01-01', 'POSITIVE', 'POSITIVE',
      'Tech startups registered with GRA, annual revenue under $500k USD',
      'Register with Ghana Investment Promotion Centre (GIPC) and apply through GRA portal',
      au_id,
      'https://gra.gov.gh/domestic-tax/income-tax/corporate-tax/'
    );
  end if;
end $$;

-- Log initial data refresh
insert into data_refresh_log (table_name, last_refresh_at, records_added, status) values
  ('data_sources', now(), 20, 'SUCCESS'),
  ('job_market_signals', now(), 1, 'SUCCESS'),
  ('learning_pathways', now(), 2, 'SUCCESS'),
  ('startup_ecosystem_signals', now(), 1, 'SUCCESS'),
  ('policy_opportunity_alerts', now(), 1, 'SUCCESS');
