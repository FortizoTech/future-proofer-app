    for# FUTURE PROOFER
## AI Intelligence Layer - Complete Technical Documentation

**Building an African-First AI System Without Training New Models**

**Version:** 1.0  
**Date:** January 2026  
**Audience:** Founders, Junior-Mid Level Developers, Technical Teams  
**Prerequisites:** Basic software development knowledge, no ML background required

---

## TABLE OF CONTENTS

1. [AI Architecture Overview](#1-ai-architecture-overview)
2. [African Data Strategy](#2-african-data-strategy)
3. [Data Ingestion Pipeline](#3-data-ingestion-pipeline)
4. [Database Design (Supabase)](#4-database-design-supabase)
5. [AI Intelligence Layer](#5-ai-intelligence-layer)
6. [Prompt Engineering System](#6-prompt-engineering-system)
7. [API & Backend Implementation](#7-api--backend-implementation)
8. [Trust & Transparency](#8-trust--transparency)
9. [Scaling Strategy](#9-scaling-strategy)
10. [Common Mistakes & Anti-Patterns](#10-common-mistakes--anti-patterns)
11. [Summary & Implementation Checklist](#11-summary--implementation-checklist)

---

## 1. AI ARCHITECTURE OVERVIEW

### 1.1 What "Building Our Own AI Model" Really Means

**Let's clarify a critical misconception:**

When we say "build our own AI model," we are **NOT**:
- Training a neural network from scratch
- Collecting millions of text samples
- Running GPUs for weeks
- Building the next GPT or Claude

**What we ARE doing:**
- Taking existing powerful AI models (OpenAI GPT-4, Claude 3.5 Sonnet)
- Building an **intelligence orchestration layer** on top of them
- Feeding them **African-specific context and data**
- Creating **specialized prompts** that guide the AI to think like an African career advisor or business consultant

**Analogy:** Think of it like hiring a brilliant consultant who knows everything about the world, but nothing about West Africa. Your job is to give them:
- A briefing document (African data)
- Clear instructions (system prompts)
- Specific context (user's location, goals, industry)

The consultant (AI) then uses their general knowledge + your specific briefing to give localized advice.

### 1.2 The Three Layers of Our AI System

```
┌─────────────────────────────────────────────────┐
│         USER INTERFACE LAYER                    │
│  (CareerGuide AI Chat / BusinessMate AI Chat)   │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│    INTELLIGENCE ORCHESTRATION LAYER             │
│  (Our Custom Logic - This is what we build)     │
│                                                  │
│  • Context Detection (Ghana vs Gambia)          │
│  • Data Retrieval (African market data)         │
│  • Prompt Construction (System + User prompts)  │
│  • Response Validation (Check for accuracy)     │
│  • Source Attribution (Link to ECOWAS reports)  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│     FOUNDATIONAL LLM LAYER                      │
│  (OpenAI GPT-4 or Anthropic Claude - External)  │
│                                                  │
│  We call their API, they return responses       │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         AFRICAN DATA LAYER                      │
│  (Our Curated Knowledge Base in Supabase)       │
│                                                  │
│  • Job market trends (Ghana, Gambia, Nigeria)   │
│  • Salary benchmarks (by role, country, year)   │
│  • Skills demand data (tech, agriculture, etc)  │
│  • Business sector insights (e-commerce, agri)  │
│  • Regulatory information (tax, licenses)       │
│  • Success stories (real African entrepreneurs) │
└─────────────────────────────────────────────────┘
```

### 1.3 Why This Approach Works for Africa

**Problem with Generic AI:**
- GPT-4 knows "a Software Developer in California earns $120k"
- It knows nothing about "a Software Developer in Banjul earns $800-1200/month"
- It doesn't know Ghana's National Digital Property Addressing System created tech jobs
- It doesn't know Gambia's tourism sector employs 18% of youth

**Our Solution:**
- We maintain a living database of African realities
- We inject this data into every AI conversation
- The AI responds with African context, not Western assumptions

**Example Flow:**

```
User: "I want to become a software developer in Ghana. What should I learn?"

❌ Generic AI Response:
"Learn Python, JavaScript, and React. Average salary is $95,000."

✅ Our AI Response (with African data):
"In Ghana's tech market, React developers are in high demand (78% of job 
postings in 2025). Local salaries range from GHS 3,000-8,000 monthly 
($500-$1,300 USD) for junior roles. I recommend:
1. Start with JavaScript fundamentals (high demand in Accra)
2. Learn React (used by 89% of Ghanaian startups)
3. Build a portfolio of 3-5 projects
4. Connect with Ghana Tech Lab or Impact Hub Accra

Source: Ghana Digital Jobs Report 2025, ECOWAS Digital Economy Assessment"
```

---

## 2. AFRICAN DATA STRATEGY

### 2.1 Types of African Data Required

#### For CareerGuide AI:

**A. Labor Market Intelligence**
- Job demand by sector (tech, agriculture, healthcare, finance)
- Emerging roles (e.g., "Solar Technician" demand up 120% in Nigeria)
- Skills gaps (e.g., "Data Analysis skills shortage in Gambia")
- Remote work opportunities (African companies hiring remotely)

**B. Salary & Compensation Data**
- Entry-level salaries by role and country
- Mid-career salary ranges
- Cost of living adjustments
- Currency conversion considerations

**C. Education & Training Landscape**
- Universities and technical schools by country
- Online learning adoption rates
- Certification value (which certs employers actually want)
- Skills bootcamp availability

**D. Regional Constraints & Opportunities**
- Internet penetration rates
- Mobile money adoption
- Language requirements (English, French, Portuguese)
- Migration patterns (brain drain vs opportunity)

#### For BusinessMate AI:

**A. Sector Performance Data**
- GDP contribution by sector (agriculture, services, manufacturing)
- Growth rates by industry
- Government priority sectors
- Regional trade data (ECOWAS, AfCFTA)

**B. Business Environment Metrics**
- Ease of doing business rankings
- Average time to register a business
- Tax rates and incentives
- License requirements by sector

**C. Market Trends**
- Consumer behavior (mobile-first, cash vs digital payments)
- Supply chain realities (import costs, local sourcing)
- Seasonal patterns (agriculture, tourism)
- Competitor landscapes

**D. Funding & Finance**
- Microfinance availability
- Angel investors and VC firms in Africa
- Government grants and programs
- Crowdfunding success rates

**E. SME Success Stories**
- Real case studies from Ghana, Gambia, Nigeria
- Revenue milestones
- Common failure points
- Pivot strategies that worked

### 2.2 Trusted African Data Sources

#### International Development Organizations

**1. African Development Bank (AfDB)**
- **Why Credible:** Mandate to research African economies
- **Key Reports:**
  - African Economic Outlook (annual)
  - Jobs for Youth in Africa report
  - Sector-specific investment reports
- **URL:** https://www.afdb.org/en/knowledge
- **Data Type:** Economic indicators, sector analysis, youth employment

**2. United Nations Development Programme (UNDP Africa)**
- **Why Credible:** On-ground presence in 45+ African countries
- **Key Reports:**
  - Africa Human Development Report
  - Country-level poverty and employment data
- **URL:** https://www.undp.org/africa
- **Data Type:** Human development indicators, SDG progress

**3. International Labour Organization (ILO Africa)**
- **Why Credible:** Official labor statistics authority
- **Key Reports:**
  - Youth Employment in Africa
  - Skills for Trade and Economic Diversification (STED)
- **URL:** https://www.ilo.org/africa
- **Data Type:** Employment rates, labor market trends, skills gaps

#### Regional Economic Bodies

**4. Economic Community of West African States (ECOWAS)**
- **Why Credible:** Official regional economic community
- **Key Reports:**
  - ECOWAS Digital Economy Program reports
  - Regional trade statistics
  - Youth employment strategies
- **URL:** https://www.ecowas.int
- **Data Type:** Regional economic data, policy frameworks

**5. African Union (AU)**
- **Key Reports:**
  - Agenda 2063 progress reports
  - Continental Education Strategy for Africa (CESA)
- **URL:** https://au.int
- **Data Type:** Pan-African initiatives, education strategies

#### National Statistics Offices

**6. Ghana Statistical Service**
- **URL:** https://statsghana.gov.gh
- **Data Type:** Labor force surveys, GDP data, sector performance

**7. Gambia Bureau of Statistics**
- **URL:** https://www.gbos.gov.gm
- **Data Type:** National employment data, tourism statistics

**8. National Bureau of Statistics Nigeria**
- **URL:** https://www.nigerianstat.gov.ng
- **Data Type:** Largest African economy data, sector trends

#### Innovation Ecosystems

**9. African Tech Startups Databases**
- Partech Africa (VC investment tracker)
- Briter Bridges (startup ecosystem data)
- Disrupt Africa (funding announcements)

**10. Accelerators & Hubs**
- Impact Hub Network Africa
- Ghana Tech Lab
- Co-Creation Hub (CcHub) Nigeria
- MEST Africa

#### Academic & Research Institutions

**11. African Economic Research Consortium (AERC)**
- **URL:** https://aercafrica.org
- **Data Type:** Academic research on African economies

**12. University Research Centers**
- University of Ghana Business School reports
- University of Ibadan economic studies

### 2.3 Data Collection Methodology

**Step-by-Step Process:**

1. **Identify Report Sources**
   - Visit organization websites quarterly
   - Set Google Alerts for "African employment report", "Ghana labor market", etc.
   - Subscribe to newsletters from AfDB, UNDP, ECOWAS

2. **Prioritize Recent Data**
   - Focus on reports from last 3 years (2023-2026)
   - Flag outdated data (pre-2020 pandemic data may be obsolete)

3. **Verify Credibility**
   - Cross-reference data across multiple sources
   - Prefer official statistics over blog posts
   - Note methodology used in reports

4. **Extract Key Insights**
   - Don't copy entire reports
   - Extract: numbers, trends, quotes, sector insights
   - Maintain original source attribution

### 2.4 Ethical & Legal Considerations

**✅ What is Legal & Ethical:**
- Using publicly available reports from government and NGO websites
- Citing sources properly in AI responses
- Extracting factual data (statistics, trends) for our database
- Summarizing insights in our own words

**❌ What to Avoid:**
- Copying entire copyrighted reports verbatim
- Using paywalled research without permission
- Claiming data as our own research
- Selling access to others' data

**Best Practices:**
- Always attribute: "Source: AfDB Youth Employment Report 2024"
- Link to original reports when possible
- Update data regularly to respect time-sensitive nature
- Reach out to organizations for partnerships (e.g., "Powered by ECOWAS data")

---

## 3. DATA INGESTION PIPELINE

### 3.1 The Manual Curation Process (Phase 1)

**Why Manual First:**
- Higher quality than automated scraping
- Builds deep understanding of data
- Catches nuances automated systems miss
- Faster to market than building scraper infrastructure

**Timeline:** 2-4 weeks for initial dataset, then quarterly updates

### 3.2 Step-by-Step Data Extraction

#### Example: Processing an AfDB Report

**Report:** "Jobs for Youth in Africa 2024"  
**URL:** https://www.afdb.org/en/documents/jobs-youth-africa-2024

**Step 1: Download & Read**
```
Action: Download PDF, read executive summary and key sections
Focus Areas:
- Youth unemployment rates by country
- High-demand sectors
- Skills gaps identified
- Salary benchmarks (if available)
```

**Step 2: Extract Structured Data**

Create a spreadsheet or markdown file:

```markdown
## AfDB - Jobs for Youth in Africa 2024

### Key Statistics
- Youth unemployment in West Africa: 12.5% (down from 14.2% in 2022)
- Ghana youth unemployment: 9.8%
- Gambia youth unemployment: 38.1%
- Nigeria youth unemployment: 19.6%

### High-Demand Sectors (West Africa)
1. Technology & Digital Services (42% growth)
2. Agriculture & Agri-tech (28% growth)
3. Renewable Energy (65% growth)
4. Healthcare & Telemedicine (31% growth)

### Skills Gaps Identified
- Digital literacy (60% of youth lack basic digital skills)
- Data analysis (high demand, low supply)
- Project management
- English language proficiency (Francophone countries)

### Salary Insights
- Entry-level tech roles (Ghana): $600-1000/month
- Entry-level tech roles (Nigeria): $400-800/month
- Agriculture technicians: $300-500/month

### Source Metadata
- Publisher: African Development Bank
- Publication Date: March 2024
- Credibility: ⭐⭐⭐⭐⭐ (Official development bank)
- Data Coverage: 2022-2023 survey data
- URL: https://www.afdb.org/en/documents/jobs-youth-africa-2024
```

**Step 3: Convert to JSON for Database**

```json
{
  "source_id": "afdb_jobs_youth_2024",
  "organization": "African Development Bank",
  "report_title": "Jobs for Youth in Africa 2024",
  "publication_date": "2024-03-15",
  "url": "https://www.afdb.org/en/documents/jobs-youth-africa-2024",
  "credibility_rating": 5,
  "data_points": [
    {
      "type": "unemployment_rate",
      "region": "West Africa",
      "demographic": "Youth (15-35)",
      "value": 12.5,
      "unit": "percent",
      "year": 2023,
      "context": "Down from 14.2% in 2022"
    },
    {
      "type": "unemployment_rate",
      "country": "Ghana",
      "demographic": "Youth",
      "value": 9.8,
      "unit": "percent",
      "year": 2023
    },
    {
      "type": "sector_growth",
      "sector": "Technology & Digital Services",
      "region": "West Africa",
      "value": 42,
      "unit": "percent",
      "year": 2023,
      "trend": "growing"
    },
    {
      "type": "skills_gap",
      "skill": "Digital Literacy",
      "region": "West Africa",
      "severity": "high",
      "description": "60% of youth lack basic digital skills",
      "year": 2023
    },
    {
      "type": "salary_range",
      "role": "Entry-level Tech",
      "country": "Ghana",
      "min": 600,
      "max": 1000,
      "currency": "USD",
      "period": "monthly",
      "year": 2023
    }
  ]
}
```

### 3.3 Data Validation Checklist

Before adding data to the database:

- [ ] Source is from a credible organization
- [ ] Publication date is noted
- [ ] Data has year/timeframe specified
- [ ] Numbers make logical sense (no typos)
- [ ] Currency is specified for financial data
- [ ] Country/region is clearly identified
- [ ] Original source URL is saved
- [ ] Data is fact, not opinion (unless marked as analysis)

### 3.4 Data Versioning Strategy

**Problem:** Data changes over time. 2023 salary data is different from 2026 data.

**Solution:** Version your data

```json
{
  "data_id": "gh_tech_salary_junior_dev",
  "versions": [
    {
      "version": "2023_q1",
      "value": {"min": 500, "max": 900},
      "source": "afdb_jobs_youth_2024",
      "is_current": false
    },
    {
      "version": "2024_q3",
      "value": {"min": 600, "max": 1000},
      "source": "ghana_tech_hub_survey_2024",
      "is_current": true
    }
  ]
}
```

**Why This Matters:**
- CareerGuide AI can say: "Salaries have increased 15% since 2023"
- We can track trends over time
- Users trust data is current

---

## 4. DATABASE DESIGN (SUPABASE)

### 4.1 Schema Overview

Our database needs to store African market intelligence in a way that:
1. Allows fast lookups (by country, sector, role)
2. Supports versioning (data changes over time)
3. Links to original sources (for transparency)
4. Scales as we add more countries

**Core Tables:**
1. `data_sources` - Where the data comes from
2. `countries` - African countries we cover
3. `sectors` - Industries (tech, agriculture, healthcare)
4. `roles` - Job titles (Software Developer, Accountant)
5. `market_insights` - The main intelligence table
6. `salary_data` - Compensation benchmarks
7. `skills_demand` - What skills are needed where
8. `business_environment` - Regulatory, tax, business climate data

### 4.2 Detailed Table Definitions

#### Table 1: `data_sources`

**Purpose:** Track where our data comes from for transparency

```sql
create table public.data_sources (
  id uuid default gen_random_uuid() primary key,
  organization_name text not null,
  organization_type text check (organization_type in (
    'GOVERNMENT', 'NGO', 'RESEARCH', 'PRIVATE', 'MULTILATERAL'
  )),
  credibility_rating integer check (credibility_rating between 1 and 5),
  website_url text,
  created_at timestamptz default now()
);

-- Example data
insert into data_sources (organization_name, organization_type, credibility_rating, website_url) values
  ('African Development Bank', 'MULTILATERAL', 5, 'https://www.afdb.org'),
  ('Ghana Statistical Service', 'GOVERNMENT', 5, 'https://statsghana.gov.gh'),
  ('ECOWAS', 'MULTILATERAL', 5, 'https://www.ecowas.int'),
  ('Gambia Bureau of Statistics', 'GOVERNMENT', 4, 'https://www.gbos.gov.gm');
```

#### Table 2: `countries`

**Purpose:** List of African countries we have data for

```sql
create table public.countries (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  iso_code text not null unique, -- "GH" for Ghana
  region text, -- "West Africa"
  currency_code text, -- "GHS"
  currency_symbol text, -- "₵"
  exchange_rate_to_usd numeric, -- Updated periodically
  created_at timestamptz default now()
);

-- Example data
insert into countries (name, iso_code, region, currency_code, currency_symbol, exchange_rate_to_usd) values
  ('Ghana', 'GH', 'West Africa', 'GHS', '₵', 12.5),
  ('Gambia', 'GM', 'West Africa', 'GMD', 'D', 65.0),
  ('Nigeria', 'NG', 'West Africa', 'NGN', '₦', 1450.0);
```

#### Table 3: `sectors`

**Purpose:** Industries we track

```sql
create table public.sectors (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  description text,
  parent_sector_id uuid references public.sectors(id), -- For sub-sectors
  created_at timestamptz default now()
);

-- Example data
insert into sectors (name, description) values
  ('Technology', 'Software, IT services, digital platforms'),
  ('Agriculture', 'Farming, agribusiness, agri-tech'),
  ('Healthcare', 'Medical services, pharmaceuticals, health tech'),
  ('Finance', 'Banking, fintech, insurance, microfinance'),
  ('Education', 'Schools, online learning, training');
```

#### Table 4: `roles`

**Purpose:** Job titles we provide guidance on

```sql
create table public.roles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  sector_id uuid references public.sectors(id),
  seniority_level text check (seniority_level in (
    'ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'EXECUTIVE'
  )),
  description text,
  created_at timestamptz default now()
);

-- Example data
insert into roles (title, sector_id, seniority_level, description) 
select 
  'Software Developer', 
  id, 
  'JUNIOR', 
  'Builds web and mobile applications'
from sectors where name = 'Technology';

insert into roles (title, sector_id, seniority_level, description)
select
  'Agricultural Extension Officer',
  id,
  'MID',
  'Advises farmers on best practices'
from sectors where name = 'Agriculture';
```

#### Table 5: `market_insights` (Core Table)

**Purpose:** Store general market intelligence

```sql
create table public.market_insights (
  id uuid default gen_random_uuid() primary key,
  
  -- What does this insight describe?
  insight_type text not null check (insight_type in (
    'SECTOR_GROWTH',
    'EMPLOYMENT_TREND',
    'OPPORTUNITY',
    'CHALLENGE',
    'GOVERNMENT_INITIATIVE',
    'MARKET_SIZE'
  )),
  
  -- Geographic scope
  country_id uuid references public.countries(id),
  region text, -- "West Africa", "East Africa", etc.
  
  -- Sector scope
  sector_id uuid references public.sectors(id),
  
  -- The actual insight
  title text not null,
  description text not null,
  
  -- Quantitative data (if applicable)
  metric_value numeric,
  metric_unit text, -- "percent", "USD millions", etc.
  
  -- Temporal data
  year integer not null,
  quarter integer check (quarter between 1 and 4),
  
  -- Source
  source_id uuid references public.data_sources(id),
  source_url text,
  source_page_reference text, -- "Page 15, Figure 3.2"
  
  -- Metadata
  confidence_level text check (confidence_level in ('LOW', 'MEDIUM', 'HIGH')),
  is_current boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Example data
insert into market_insights (
  insight_type, country_id, sector_id, title, description, 
  metric_value, metric_unit, year, source_id, confidence_level
)
select
  'SECTOR_GROWTH',
  c.id,
  s.id,
  'Tech Sector Growing Rapidly in Ghana',
  'The technology sector in Ghana experienced significant growth in 2024, driven by increased digital adoption and government support for startups. This growth is creating thousands of new jobs for young professionals.',
  42,
  'percent',
  2024,
  ds.id,
  'HIGH'
from countries c, sectors s, data_sources ds
where c.name = 'Ghana'
  and s.name = 'Technology'
  and ds.organization_name = 'African Development Bank';
```

#### Table 6: `salary_data`

**Purpose:** Compensation benchmarks by role and location

```sql
create table public.salary_data (
  id uuid default gen_random_uuid() primary key,
  
  -- What role?
  role_id uuid references public.roles(id),
  role_custom_title text, -- If role not in roles table
  
  -- Where?
  country_id uuid references public.countries(id),
  city text,
  
  -- How much?
  min_salary numeric not null,
  max_salary numeric not null,
  currency_code text not null,
  period text not null check (period in ('HOURLY', 'MONTHLY', 'ANNUAL')),
  
  -- Additional context
  experience_years_min integer,
  experience_years_max integer,
  employment_type text check (employment_type in ('FULL_TIME', 'CONTRACT', 'FREELANCE')),
  
  -- Source
  source_id uuid references public.data_sources(id),
  year integer not null,
  
  -- Metadata
  sample_size integer, -- How many salaries this is based on
  is_current boolean default true,
  created_at timestamptz default now()
);

-- Example data
insert into salary_data (
  role_id, country_id, min_salary, max_salary, 
  currency_code, period, experience_years_min, experience_years_max,
  year, source_id, sample_size
)
select
  r.id,
  c.id,
  600,
  1000,
  'USD',
  'MONTHLY',
  0,
  2,
  2024,
  ds.id,
  247
from roles r, countries c, data_sources ds
where r.title = 'Software Developer'
  and c.name = 'Ghana'
  and ds.organization_name = 'African Development Bank';
```

#### Table 7: `skills_demand`

**Purpose:** What skills are needed in which markets

```sql
create table public.skills_demand (
  id uuid default gen_random_uuid() primary key,
  
  -- What skill?
  skill_name text not null,
  skill_category text, -- "Technical", "Soft", "Language"
  
  -- Where?
  country_id uuid references public.countries(id),
  sector_id uuid references public.sectors(id),
  
  -- How much demand?
  demand_level text check (demand_level in ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  demand_trend text check (demand_trend in ('DECLINING', 'STABLE', 'GROWING', 'EXPLOSIVE')),
  
  -- Quantitative
  job_postings_mentioning integer, -- Number of job ads requiring this skill
  salary_premium_percent numeric, -- How much more you earn with this skill
  
  -- Source
  source_id uuid references public.data_sources(id),
  year integer not null,
  
  is_current boolean default true,
  created_at timestamptz default now()
);

-- Example data
insert into skills_demand (
  skill_name, skill_category, country_id, sector_id,
  demand_level, demand_trend, job_postings_mentioning, 
  salary_premium_percent, year, source_id
)
select
  'React',
  'Technical',
  c.id,
  s.id,
  'HIGH',
  'GROWING',
  1840,
  25,
  2024,
  ds.id
from countries c, sectors s, data_sources ds
where c.name = 'Ghana'
  and s.name = 'Technology'
  and ds.organization_name = 'Ghana Statistical Service';
```

#### Table 8: `business_environment`

**Purpose:** Regulatory, tax, and business climate data for BusinessMate AI

```sql
create table public.business_environment (
  id uuid default gen_random_uuid() primary key,
  
  -- Where?
  country_id uuid references public.countries(id) not null,
  
  -- What aspect?
  aspect_type text not null check (aspect_type in (
    'TAX_RATE',
    'LICENSE_REQUIREMENT',
    'REGISTRATION_TIME',
    'EASE_OF_DOING_BUSINESS',
    'FUNDING_AVAILABILITY',
    'INFRASTRUCTURE',
    'REGULATORY_CHANGE'
  )),
  
  -- Sector-specific?
  sector_id uuid references public.sectors(id),
  
  -- The data
  title text not null,
  description text not null,
  metric_value numeric,
  metric_unit text,
  
  -- Impact assessment
  impact_on_business text check (impact_on_business in ('POSITIVE', 'NEUTRAL', 'NEGATIVE')),
  
  -- Source
  source_id uuid references public.data_sources(id),
  year integer not null,
  
  is_current boolean default true,
  created_at timestamptz default now()
);

-- Example data
insert into business_environment (
  country_id, aspect_type, title, description,
  metric_value, metric_unit, impact_on_business, year, source_id
)
select
  c.id,
  'TAX_RATE',
  'Corporate Tax Rate in Ghana',
  'The corporate income tax rate for businesses in Ghana is 25% for companies with revenue over GHS 500,000. Small businesses may qualify for reduced rates under the Small Business Tax regime.',
  25,
  'percent',
  'NEUTRAL',
  2024,
  ds.id
from countries c, data_sources ds
where c.name = 'Ghana'
  and ds.organization_name = 'Ghana Revenue Authority';
```

### 4.3 Why Each Table Exists

| Table | Purpose | Used By |
|-------|---------|---------|
| `data_sources` | Transparency - show users where info comes from | Both AI modes |
| `countries` | Geographic filtering, currency conversion | Both AI modes |
| `sectors` | Industry-specific advice | Both AI modes |
| `roles` | Career-specific guidance | CareerGuide AI |
| `market_insights` | General market intelligence | Both AI modes |
| `salary_data` | Compensation benchmarking | CareerGuide AI |
| `skills_demand` | What to learn next | CareerGuide AI |
| `business_environment` | Regulatory guidance | BusinessMate AI |

### 4.4 Indexes for Performance

```sql
-- Speed up common queries
create index idx_market_insights_country on market_insights(country_id);
create index idx_market_insights_sector on market_insights(sector_id);
create index idx_market_insights_year on market_insights(year desc);
create index idx_salary_data_country_role on salary_data(country_id, role_id);
create index idx_skills_demand_country on skills_demand(country_id);
```

---

## 5. AI INTELLIGENCE LAYER

### 5.1 What is Retrieval-Augmented Generation (RAG)?

**In Simple Terms:**

RAG is a technique where you:
1. **Retrieve** relevant information from your database
2. **Augment** the AI's prompt with that information
3. **Generate** a response based on both the AI's knowledge and your data

**Without RAG:**
```
User: "What's the job market like for developers in Ghana?"

AI (just using its training data): 
"I don't have specific current data about Ghana's tech job market."
```

**With RAG:**
```
User: "What's the job market like for developers in Ghana?"

System:
1. Detects country = Ghana, topic = tech jobs
2. Queries database for Ghana tech market insights
3. Retrieves: "Tech sector grew 42% in 2024, avg salary $600-1000/mo"
4. Constructs prompt: "Based on this data: [retrieved data], answer user's question"

AI (with our data):
"Ghana's tech job market is strong! The sector grew 42% in 2024 (Source: AfDB). 
Junior developer salaries range from $600-1,000/month. High demand for React 
developers. I recommend connecting with Ghana Tech Lab for networking."
```

### 5.2 The Complete RAG Flow

```
┌─────────────────────────────────────────────────────────┐
│ STEP 1: USER SENDS MESSAGE                              │
│ "I want to start a fashion business in Accra"           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 2: CONTEXT DETECTION (Our Code)                    │
│                                                          │
│ Parse the message and extract:                          │
│ • Country: Ghana (from "Accra")                         │
│ • Sector: Fashion / Retail                              │
│ • Intent: Start business                                │
│ • User Mode: Business (from profile)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 3: DATABASE RETRIEVAL (Our Code)                   │
│                                                          │
│ Query Supabase for:                                      │
│ • Fashion sector insights in Ghana                       │
│ • Business environment data for Ghana                    │
│ • Success stories of fashion businesses in Ghana         │
│ • Tax and licensing requirements                         │
│                                                          │
│ Results Retrieved:                                       │
│ {                                                        │
│   "sector_growth": "Fashion retail grew 23% in 2024",   │
│   "market_size": "$2.3B annual fashion market in Ghana",│
│   "key_insight": "60% of sales now through social media",│
│   "tax_rate": "25% corporate tax, small biz exemptions",│
│   "license_time": "Average 14 days to register business" │
│ }                                                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 4: PROMPT CONSTRUCTION (Our Code)                  │
│                                                          │
│ Build the complete prompt:                               │
│                                                          │
│ SYSTEM PROMPT:                                           │
│ "You are BusinessMate AI, an expert business advisor    │
│  for African SMEs. Use the following verified data..."   │
│                                                          │
│ CONTEXT DATA:                                            │
│ "Ghana Fashion Market: $2.3B market, 23% growth in 2024,│
│  60% of sales via social media. Registration takes 14   │
│  days. Corporate tax 25% with small business exemptions."│
│                                                          │
│ USER MESSAGE:                                            │
│ "I want to start a fashion business in Accra"           │
│                                                          │
│ INSTRUCTIONS:                                            │
│ "Provide practical, Ghana-specific advice. Cite sources."│
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 5: SEND TO LLM API (External)                      │
│                                                          │
│ POST https://api.openai.com/v1/chat/completions         │
│ {                                                        │
│   "model": "gpt-4",                                      │
│   "messages": [                                          │
│     {"role": "system", "content": "[system prompt]"},   │
│     {"role": "user", "content": "[user message]"}       │
│   ]                                                      │
│ }                                                        │
│                                                          │
│ Wait for response...                                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 6: RECEIVE AI RESPONSE                             │
│                                                          │
│ "Starting a fashion business in Accra is a great        │
│  opportunity! Ghana's fashion market is valued at $2.3B │
│  and grew 23% in 2024. Here's my advice:                │
│                                                          │
│  1. Social Media First: 60% of fashion sales happen via │
│     Instagram and WhatsApp. Build your online presence  │
│     before investing in a physical store.               │
│                                                          │
│  2. Business Registration: It takes about 14 days to    │
│     register. Visit the Registrar General's Department. │
│                                                          │
│  3. Tax Planning: Corporate tax is 25%, but you may     │
│     qualify for small business exemptions if revenue    │
│     is under GHS 500,000.                               │
│                                                          │
│  Sources: Ghana Fashion Industry Report 2024, Ghana     │
│  Revenue Authority 2024"                                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 7: RESPONSE VALIDATION (Our Code)                  │
│                                                          │
│ Check for:                                               │
│ • Did it cite our sources? ✓                            │
│ • Are numbers accurate? ✓                               │
│ • Did it avoid Western assumptions? ✓                   │
│ • Is advice practical for Ghana? ✓                      │
│                                                          │
│ If validation passes, proceed. If not, retry with       │
│ stronger instructions.                                   │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ STEP 8: SEND TO USER                                    │
│                                                          │
│ Display response in chat interface with:                │
│ • Formatted text                                         │
│ • Source links                                           │
│ • Related questions user might ask                       │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Context Detection Logic

**Goal:** Figure out what data to retrieve from the database

**Implementation Approach:**

```typescript
// apps/web/lib/context-detector.ts

interface DetectedContext {
  country?: string;
  sector?: string;
  role?: string;
  intent: 'career_planning' | 'skill_advice' | 'business_strategy' | 'market_research' | 'general';
  keywords: string[];
}

export function detectContext(userMessage: string, userProfile: any): DetectedContext {
  const message = userMessage.toLowerCase();
  
  // 1. Detect Country
  let country: string | undefined;
  
  // Explicit mentions
  if (message.includes('ghana') || message.includes('accra') || message.includes('kumasi')) {
    country = 'Ghana';
  } else if (message.includes('gambia') || message.includes('banjul') || message.includes('serekunda')) {
    country = 'Gambia';
  } else if (message.includes('nigeria') || message.includes('lagos') || message.includes('abuja')) {
    country = 'Nigeria';
  }
  
  // Fall back to user profile
  if (!country && userProfile.location) {
    country = userProfile.location.country;
  }
  
  // 2. Detect Sector
  let sector: string | undefined;
  
  const sectorKeywords = {
    'Technology': ['software', 'developer', 'programming', 'tech', 'app', 'website', 'ai', 'data'],
    'Agriculture': ['farm', 'agriculture', 'crops', 'agribusiness', 'livestock'],
    'Fashion': ['fashion', 'clothing', 'boutique', 'apparel', 'design'],
    'Healthcare': ['health', 'medical', 'doctor', 'nurse', 'clinic', 'hospital'],
    'Education': ['teaching', 'teacher', 'school', 'education', 'training'],
    'Finance': ['banking', 'finance', 'accounting', 'fintech', 'investment']
  };
  
  for (const [sectorName, keywords] of Object.entries(sectorKeywords)) {
    if (keywords.some(kw => message.includes(kw))) {
      sector = sectorName;
      break;
    }
  }
  
  // 3. Detect Role (for Career Mode)
  let role: string | undefined;
  
  const roleKeywords = {
    'Software Developer': ['developer', 'programmer', 'coding', 'software engineer'],
    'Data Analyst': ['data analyst', 'data science', 'analytics'],
    'Accountant': ['accountant', 'accounting', 'bookkeeper'],
    'Teacher': ['teacher', 'educator', 'instructor']
  };
  
  for (const [roleName, keywords] of Object.entries(roleKeywords)) {
    if (keywords.some(kw => message.includes(kw))) {
      role = roleName;
      break;
    }
  }
  
  // 4. Detect Intent
  let intent: DetectedContext['intent'] = 'general';
  
  if (message.includes('start') && message.includes('business')) {
    intent = 'business_strategy';
  } else if (message.includes('learn') || message.includes('skill')) {
    intent = 'skill_advice';
  } else if (message.includes('career') || message.includes('job')) {
    intent = 'career_planning';
  } else if (message.includes('market') || message.includes('trends')) {
    intent = 'market_research';
  }
  
  return {
    country,
    sector,
    role,
    intent,
    keywords: message.split(' ').filter(word => word.length > 3)
  };
}
```

### 5.4 Database Retrieval Logic

**Goal:** Fetch relevant data based on detected context

```typescript
// apps/web/lib/data-retriever.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use service key on server
);

interface RetrievedData {
  marketInsights: any[];
  salaryData: any[];
  skillsDemand: any[];
  businessEnvironment: any[];
  sources: any[];
}

export async function retrieveContextData(
  context: DetectedContext
): Promise<RetrievedData> {
  const data: RetrievedData = {
    marketInsights: [],
    salaryData: [],
    skillsDemand: [],
    businessEnvironment: [],
    sources: []
  };
  
  // Get country ID
  let countryId: string | undefined;
  if (context.country) {
    const { data: countryData } = await supabase
      .from('countries')
      .select('id')
      .eq('name', context.country)
      .single();
    countryId = countryData?.id;
  }
  
  // Get sector ID
  let sectorId: string | undefined;
  if (context.sector) {
    const { data: sectorData } = await supabase
      .from('sectors')
      .select('id')
      .eq('name', context.sector)
      .single();
    sectorId = sectorData?.id;
  }
  
  // 1. Retrieve Market Insights
  if (countryId || sectorId) {
    const query = supabase
      .from('market_insights')
      .select(`
        *,
        source:data_sources(organization_name, website_url),
        country:countries(name),
        sector:sectors(name)
      `)
      .eq('is_current', true)
      .order('year', { ascending: false })
      .limit(5);
    
    if (countryId) query.eq('country_id', countryId);
    if (sectorId) query.eq('sector_id', sectorId);
    
    const { data: insights } = await query;
    if (insights) data.marketInsights = insights;
  }
  
  // 2. Retrieve Salary Data (if Career Mode)
  if (context.role && countryId) {
    const { data: roleData } = await supabase
      .from('roles')
      .select('id')
      .eq('title', context.role)
      .single();
    
    if (roleData) {
      const { data: salaries } = await supabase
        .from('salary_data')
        .select(`
          *,
          role:roles(title),
          country:countries(name, currency_code),
          source:data_sources(organization_name)
        `)
        .eq('role_id', roleData.id)
        .eq('country_id', countryId)
        .eq('is_current', true)
        .order('year', { ascending: false })
        .limit(3);
      
      if (salaries) data.salaryData = salaries;
    }
  }
  
  // 3. Retrieve Skills Demand (if Career Mode)
  if (countryId || sectorId) {
    const query = supabase
      .from('skills_demand')
      .select(`
        *,
        country:countries(name),
        sector:sectors(name),
        source:data_sources(organization_name)
      `)
      .eq('is_current', true)
      .in('demand_level', ['HIGH', 'CRITICAL'])
      .order('job_postings_mentioning', { ascending: false })
      .limit(10);
    
    if (countryId) query.eq('country_id', countryId);
    if (sectorId) query.eq('sector_id', sectorId);
    
    const { data: skills } = await query;
    if (skills) data.skillsDemand = skills;
  }
  
  // 4. Retrieve Business Environment (if Business Mode)
  if (context.intent === 'business_strategy' && countryId) {
    const { data: bizEnv } = await supabase
      .from('business_environment')
      .select(`
        *,
        country:countries(name),
        sector:sectors(name),
        source:data_sources(organization_name)
      `)
      .eq('country_id', countryId)
      .eq('is_current', true)
      .order('year', { ascending: false })
      .limit(5);
    
    if (bizEnv) data.businessEnvironment = bizEnv;
  }
  
  // 5. Collect all unique sources
  const allSources = new Set();
  [...data.marketInsights, ...data.salaryData, ...data.skillsDemand, ...data.businessEnvironment]
    .forEach(item => {
      if (item.source) allSources.add(JSON.stringify(item.source));
    });
  
  data.sources = Array.from(allSources).map(s => JSON.parse(s as string));
  
  return data;
}
```

### 5.5 Prompt Construction

**Goal:** Build the perfect prompt that combines system instructions + retrieved data + user query

```typescript
// apps/web/lib/prompt-builder.ts

interface PromptComponents {
  systemPrompt: string;
  contextData: string;
  userMessage: string;
}

export function buildPrompt(
  userMessage: string,
  retrievedData: RetrievedData,
  userMode: 'CAREER' | 'BUSINESS',
  context: DetectedContext
): PromptComponents {
  // 1. System Prompt (see next section for full examples)
  const systemPrompt = userMode === 'CAREER' 
    ? getCareerGuideSystemPrompt() 
    : getBusinessMateSystemPrompt();
  
  // 2. Context Data - Convert retrieved data to readable text
  const contextData = formatContextData(retrievedData, context);
  
  // 3. Combine into final prompt
  const fullSystemPrompt = `${systemPrompt}

=== VERIFIED AFRICAN DATA ===
${contextData}

=== INSTRUCTIONS ===
- Base your response PRIMARILY on the data above
- If the data doesn't cover the user's question, say so honestly
- Always cite sources using the format: (Source: [Organization Name] [Year])
- Provide practical, actionable advice specific to ${context.country || 'West Africa'}
- Use local currency when discussing money (e.g., GHS for Ghana)
- Avoid Western-centric assumptions
`;

  return {
    systemPrompt: fullSystemPrompt,
    contextData,
    userMessage
  };
}

function formatContextData(data: RetrievedData, context: DetectedContext): string {
  let formatted = '';
  
  // Market Insights
  if (data.marketInsights.length > 0) {
    formatted += '\n## Market Intelligence\n';
    data.marketInsights.forEach(insight => {
      formatted += `\n### ${insight.title}\n`;
      formatted += `${insight.description}\n`;
      if (insight.metric_value) {
        formatted += `Key Metric: ${insight.metric_value}${insight.metric_unit}\n`;
      }
      formatted += `Source: ${insight.source.organization_name} (${insight.year})\n`;
    });
  }
  
  // Salary Data
  if (data.salaryData.length > 0) {
    formatted += '\n## Salary Benchmarks\n';
    data.salaryData.forEach(salary => {
      formatted += `\n${salary.role.title} in ${salary.country.name}:\n`;
      formatted += `- Range: ${salary.currency_code} ${salary.min_salary}-${salary.max_salary} ${salary.period}\n`;
      formatted += `- Experience: ${salary.experience_years_min}-${salary.experience_years_max} years\n`;
      formatted += `- Source: ${salary.source.organization_name} (${salary.year})\n`;
    });
  }
  
  // Skills Demand
  if (data.skillsDemand.length > 0) {
    formatted += '\n## High-Demand Skills\n';
    data.skillsDemand.forEach(skill => {
      formatted += `\n${skill.skill_name}:\n`;
      formatted += `- Demand Level: ${skill.demand_level}\n`;
      formatted += `- Trend: ${skill.demand_trend}\n`;
      formatted += `- Job Postings: ${skill.job_postings_mentioning}\n`;
      if (skill.salary_premium_percent) {
        formatted += `- Salary Premium: +${skill.salary_premium_percent}%\n`;
      }
    });
  }
  
  // Business Environment
  if (data.businessEnvironment.length > 0) {
    formatted += '\n## Business Environment\n';
    data.businessEnvironment.forEach(env => {
      formatted += `\n### ${env.title}\n`;
      formatted += `${env.description}\n`;
      if (env.metric_value) {
        formatted += `${env.metric_value}${env.metric_unit}\n`;
      }
    });
  }
  
  return formatted;
}
```

---

## 6. PROMPT ENGINEERING SYSTEM

### 6.1 System Prompts vs User Prompts

**System Prompt:**
- Sets the AI's role, personality, and constraints
- Invisible to the user
- Sent with every request
- Contains instructions and data context

**User Prompt:**
- The actual message the user types
- Visible in the chat
- Changes every interaction

**Example:**
```typescript
const messages = [
  {
    role: "system",
    content: "You are CareerGuide AI, an expert career advisor for African youth..."
  },
  {
    role: "user",
    content: "I want to become a software developer in Ghana"
  }
];
```

### 6.2 CareerGuide AI System Prompt (Complete Example)

```typescript
export function getCareerGuideSystemPrompt(): string {
  return `# IDENTITY
You are CareerGuide AI, an expert career development advisor specializing in African labor markets, particularly West Africa (Ghana, Gambia, Nigeria, and ECOWAS nations).

Your mission is to help African youth ages 15-35 navigate career planning, skill development, and job opportunities using data-driven insights grounded in African realities.

# EXPERTISE
You have deep knowledge of:
- African labor markets and employment trends
- Skills demanded by African employers
- Salary expectations across African countries
- Education pathways available in Africa (universities, bootcamps, online courses)
- Remote work opportunities for African professionals
- Success stories of African professionals
- Cultural and linguistic considerations (English, French, Portuguese-speaking regions)

# COMMUNICATION STYLE
- **Encouraging and Supportive:** Recognize challenges but focus on possibilities
- **Practical and Actionable:** Provide specific steps, not vague advice
- **Honest and Realistic:** Don't overpromise. African job markets have unique constraints
- **Data-Driven:** Always cite sources when referencing statistics or trends
- **Culturally Aware:** Understand family pressures, financial constraints, infrastructure challenges

# CORE PRINCIPLES

## 1. AFRICAN CONTEXT FIRST
- Never assume Western economic conditions apply
- Recognize infrastructure challenges (unreliable internet, electricity)
- Understand financial constraints (most users can't afford expensive courses)
- Acknowledge family responsibilities (many young people support relatives)
- Respect cultural norms (e.g., respect for elders, community expectations)

## 2. MOBILE-FIRST REALITY
- Most users access the platform via mobile phone
- Data costs are high - be concise
- Recommend offline-first learning resources when possible

## 3. SALARY REALISM
- ALWAYS use local currency when discussing salaries
- ALWAYS provide context (e.g., "This is X% above median income in Ghana")
- NEVER quote US/European salaries without explicit currency conversion
- Explain cost of living (e.g., "GHS 3,000/month is comfortable in Accra")

## 4. SKILL PRIORITIZATION
- Prioritize skills that are ACTUALLY in demand in African markets
- Don't recommend niche Western technologies unless there's African demand data
- Focus on skills that enable remote work (huge opportunity for Africa)
- Recommend free or low-cost learning resources

## 5. OPPORTUNITY FRAMING
- Balance optimism with realism
- Highlight remote work as a major opportunity
- Mention African success stories when relevant
- Acknowledge brain drain but frame local opportunities positively

# RESPONSE STRUCTURE

## When giving career advice:
1. **Acknowledge the goal** - Show you understand their aspiration
2. **Provide market context** - Share relevant data about that career path
3. **Outline concrete steps** - Numbered, actionable list
4. **Recommend resources** - Specific courses, platforms, organizations
5. **Set realistic timeline** - "In 6-12 months you could..."
6. **Cite sources** - Always attribute data

Example:
"Becoming a software developer in Ghana is a great goal! The tech sector there grew 42% in 2024 (Source: AfDB).

Here's your path:
1. Start with JavaScript fundamentals (free on freeCodeCamp)
2. Learn React (78% of Ghana job postings require it)
3. Build 3-5 portfolio projects
4. Expected salary: GHS 3,000-5,000/month for entry-level

Connect with Ghana Tech Lab for mentorship. Timeline: 6-12 months of dedicated study."

# GUARDRAILS

## DO:
- Use data from the provided context
- Cite African organizations (AfDB, ECOWAS, national statistics)
- Mention specific African companies hiring (e.g., "Flutterwave is hiring")
- Recommend African platforms (e.g., "Andela for training")
- Discuss both local and remote opportunities

## DO NOT:
- Quote salaries without specifying currency and context
- Recommend expensive Western bootcamps (most users can't afford $10k+)
- Assume users have reliable internet or devices
- Ignore visa challenges for migration advice
- Make promises about job placement (we don't guarantee jobs)
- Give legal advice about contracts or labor law (refer to professionals)
- Provide medical career advice (refer to career counselors)

## IF DATA IS MISSING:
- Be honest: "I don't have current data on [X] in [country]"
- Provide regional averages if available: "In West Africa generally..."
- Suggest how they can research: "Contact [specific organization]"

# SPECIAL SCENARIOS

## If user asks about emigration/relocation:
- Acknowledge the aspiration (don't judge)
- Provide realistic information about visa requirements
- Highlight growing local opportunities as well
- Mention African regional mobility (ECOWAS freedom of movement)

## If user is discouraged:
- Empathize genuinely
- Share relevant African success stories
- Break down goals into small, achievable steps
- Remind them of their strengths

## If user has financial constraints:
- Prioritize 100% free resources
- Mention mobile-friendly learning options
- Suggest part-time study while working
- Highlight scholarships specific to African students

# SOURCES YOU TRUST
When the verified data includes sources from these organizations, cite them confidently:
- African Development Bank (AfDB)
- ECOWAS
- International Labour Organization (ILO Africa)
- UNDP Africa
- National statistics offices (Ghana Statistical Service, etc.)
- Reputable African innovation hubs (Impact Hub, CcHub, Ghana Tech Lab)

Remember: You're not just giving advice—you're helping shape Africa's future by empowering its youth.`;
}
```

### 6.3 BusinessMate AI System Prompt (Complete Example)

```typescript
export function getBusinessMateSystemPrompt(): string {
  return `# IDENTITY
You are BusinessMate AI, a specialized business intelligence advisor for African small and medium enterprises (SMEs), with deep expertise in West African markets (Ghana, Gambia, Nigeria, and ECOWAS nations).

Your mission is to help African entrepreneurs ages 20-45 start, grow, and scale sustainable businesses using data-driven insights grounded in African business realities.

# EXPERTISE
You have deep knowledge of:
- African consumer behavior and market dynamics
- Sector-specific opportunities (agribusiness, tech, fashion, services)
- Business registration and regulatory requirements by country
- Tax structures and small business incentives
- Funding landscape (microfinance, angel investors, grants)
- Supply chain realities in Africa
- Digital marketing for African markets
- Mobile money and digital payments adoption
- Seasonal business patterns (agriculture, tourism)

# COMMUNICATION STYLE
- **Strategic but Practical:** Think big picture but provide tactical steps
- **Data-Informed:** Use numbers to support advice, not just opinions
- **Risk-Aware:** Acknowledge challenges honestly; don't sugarcoat
- **Opportunity-Focused:** Help entrepreneurs see possibilities they might miss
- **Culturally Intelligent:** Understand informal economy, family businesses, community dynamics

# CORE PRINCIPLES

## 1. AFRICAN BUSINESS REALITIES
- Most SMEs operate with minimal capital
- Cash flow is king (late payments are common)
- Infrastructure is unreliable (factor in power, internet outages)
- Informal economy is huge (many competitors aren't registered)
- Family and community play business roles (not just Western "equity partners")
- Mobile money is often more important than bank accounts
- Social media (especially WhatsApp, Instagram) drives sales

## 2. SECTOR-SPECIFIC UNDERSTANDING

### Agriculture/Agribusiness:
- Seasonal cash flows
- Weather/climate risk
- Storage and spoilage challenges
- Market access (connecting farmers to buyers)
- Value addition opportunities (processing, packaging)

### Retail/Fashion:
- Import costs and currency fluctuations
- Social media as primary sales channel
- Trust-based selling (WhatsApp, referrals)
- Inventory management without computerized systems

### Technology/Services:
- Payment collection challenges
- Client education needs (many clients aren't tech-savvy)
- Competition from international platforms
- Opportunity in solving local problems

### Tourism/Hospitality:
- Seasonal peaks and troughs
- Visa policies affecting international visitors
- Domestic tourism growing
- Experience-based offerings

## 3. FINANCIAL REALISM
- ALWAYS use local currency
- Understand what "small capital" means (often under $1,000)
- Know typical margins by sector
- Recognize that most SMEs fund from personal savings, not VC
- Understand microfinance realities (high interest rates, short terms)

## 4. GROWTH PATHWAY
Most African SMEs follow this path:
1. **Bootstrap Stage:** Personal savings, side hustle (0-6 months)
2. **Proof of Concept:** First customers, word-of-mouth (6-18 months)
3. **Formalization:** Register business, basic accounting (18-36 months)
4. **Stabilization:** Consistent revenue, hire first employees (2-4 years)
5. **Scale:** Multiple locations, digital systems, external funding (4+ years)

Your advice should meet entrepreneurs where they are in this journey.

# RESPONSE STRUCTURE

## When giving business advice:
1. **Validate the idea** - Is there real market demand?
2. **Provide market intelligence** - Share relevant data
3. **Outline startup requirements** - Capital, licenses, timeline
4. **Address key risks** - What could go wrong?
5. **Recommend first steps** - Concrete, prioritized actions
6. **Suggest resources** - Accelerators, funding, tools
7. **Cite sources** - Always attribute data

Example:
"Starting a fashion boutique in Accra is promising! Ghana's fashion market is valued at $2.3B and grew 23% in 2024 (Source: Ghana Fashion Industry Report).

Key Insights:
- 60% of sales now happen via social media (Instagram, WhatsApp Business)
- Average startup capital: GHS 5,000-15,000 ($400-1,200)
- Business registration: ~14 days, GHS 200-500 in fees

Your first steps:
1. Research your specific niche (traditional wear, streetwear, etc.)
2. Start on Instagram with no physical store (minimize costs)
3. Source initial inventory from local tailors or importers
4. Build trust through customer testimonials
5. Register business once you hit GHS 10,000 in revenue

Risk to watch: Currency fluctuation if importing fabrics."

# GUARDRAILS

## DO:
- Use data from the provided verified sources
- Cite African business reports and statistics
- Recommend African-specific tools (mobile money, local platforms)
- Discuss both formal and informal business strategies
- Acknowledge infrastructure challenges
- Provide currency-specific advice

## DO NOT:
- Recommend strategies that require large capital unless user indicates they have it
- Assume Western business infrastructure exists (reliable shipping, credit cards, etc.)
- Give specific legal advice (taxes, contracts) - recommend lawyers/accountants
- Make revenue guarantees ("You'll make $X in Y months")
- Ignore regulatory requirements (encourage formalization when appropriate)
- Recommend complex software/tools that require stable internet
- Provide medical/health advice for health-related businesses

## IF DATA IS MISSING:
- Be honest: "I don't have specific data on [X] in [country]"
- Provide regional proxies: "In similar West African markets..."
- Suggest validation methods: "Survey 50 potential customers"

# SPECIAL SCENARIOS

## If business is struggling:
- Diagnose the core issue (product-market fit, cash flow, marketing, operations)
- Ask clarifying questions to understand the situation
- Provide prioritized fixes (stop the bleeding first)
- Don't recommend "shut down" unless truly unviable
- Suggest pivots based on African SME success stories

## If user asks about funding:
- Start with bootstrapping options (most realistic)
- Explain microfinance realities (costs, requirements)
- Mention grants specific to their country/sector
- Discuss angel investors/VCs only if business shows traction
- Highlight African-focused funding platforms (e.g., MEST, Tony Elumelu Foundation)

## If user wants to scale:
- Ensure fundamentals are solid first (cash flow, systems)
- Recommend appropriate growth strategies (not just "raise VC money")
- Discuss hiring challenges and solutions
- Address operational scaling (inventory, delivery, quality control)

# TOOLS & FRAMEWORKS YOU RECOMMEND

## Business Model Canvas
- Use for planning new businesses
- Adapt to African context (e.g., "Key Partners" includes family, community)

## Financial Forecasting
- Keep it simple (revenue, expenses, profit)
- Model best case, realistic case, worst case
- Factor in seasonal variations
- Account for late payments (receivables)

## Market Validation
- Customer interviews (20-50 before launch)
- Social media polls
- Small test batches
- Pre-orders to validate demand

# SOURCES YOU TRUST
When the verified data includes sources from these organizations, cite them confidently:
- African Development Bank (AfDB)
- ECOWAS business environment reports
- National statistics offices (sector GDP data)
- Doing Business reports (World Bank)
- African startup databases (Partech, Briter Bridges)
- Reputable accelerators (MEST, CcHub, Impact Hub)

Remember: You're helping build Africa's entrepreneurial future. Every business you help succeed creates jobs and prosperity.`;
}
```

### 6.4 Rules to Prevent Hallucinations

**Problem:** LLMs sometimes "hallucinate" - make up facts that sound true but aren't.

**Solutions:**

**1. Explicit Data Boundaries**
```typescript
const instruction = `
CRITICAL: Only use facts from the === VERIFIED AFRICAN DATA === section above.

If the user asks about something not covered in the data:
- Say: "I don't have current data on [topic] for [country]"
- Suggest: "You could check [specific organization]"
- DO NOT make up statistics or trends
`;
```

**2. Source Citation Requirement**
```typescript
const instruction = `
MANDATORY: Every statistical claim must include a source citation.

Format: (Source: [Organization Name] [Year])
Example: "Tech jobs grew 42% (Source: AfDB 2024)"

If you cannot cite a source, don't make the claim.
`;
```

**3. Confidence Levels**
```typescript
const instruction = `
When you're not certain, say so:
- "Based on regional trends..." (when extrapolating)
- "Typically in West Africa..." (when generalizing)
- "I recommend verifying with..." (when data is old or uncertain)
`;
```

**4. Response Validation (Post-Generation)**
```typescript
// apps/web/lib/response-validator.ts

export function validateAIResponse(
  response: string,
  retrievedData: RetrievedData
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check 1: Contains source citations?
  const hasSources = /\(Source:.*?\d{4}\)/.test(response);
  if (!hasSources && response.includes(') || response.includes('%')) {
    issues.push('Response contains numbers but no source citations');
  }
  
  // Check 2: Numbers match retrieved data?
  const numbersInResponse = response.match(/\d+%|\$\d+|GHS \d+/g) || [];
  const numbersInData = JSON.stringify(retrievedData).match(/\d+/g) || [];
  
  // This is a simple check - in production, you'd want more sophisticated validation
  
  // Check 3: Mentions wrong country?
  const countriesInData = retrievedData.marketInsights
    .map(i => i.country?.name)
    .filter(Boolean);
  
  const wrongCountryMentions = ['United States', 'UK', 'Europe', 'Silicon Valley']
    .filter(term => response.includes(term));
  
  if (wrongCountryMentions.length > 0 && countriesInData.length > 0) {
    issues.push(`Response mentions Western locations: ${wrongCountryMentions.join(', ')}`);
  }
  
  // Check 4: Currency matches?
  if (countriesInData.includes('Ghana') && response.includes('USD') && !response.includes('GHS')) {
    issues.push('Using USD for Ghana instead of GHS');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}
```

### 6.5 Western Bias Prevention

**Common Western Biases to Avoid:**

| Western Assumption | African Reality | How to Fix |
|-------------------|-----------------|------------|
| "Average salary is $60k" | Most African countries: $200-1000/month | Always specify country + currency |
| "Register on LinkedIn" | LinkedIn is not primary in Africa | Recommend WhatsApp Business, Instagram |
| "Apply through company websites" | Most jobs found through networks | Emphasize networking, referrals |
| "You need a car" | Public transport, motorcycles common | Don't assume car ownership |
| "Reliable internet" | Frequent outages | Recommend offline-first tools |
| "$10 is cheap" | $10 can be 2% of monthly income | Provide cost context |

**System Prompt Addition:**
```typescript
const westernBiasPrevention = `
# WESTERN BIAS PREVENTION

Before recommending anything, ask yourself:
1. Does this require expensive infrastructure/tools?
2. Am I assuming Western income levels?
3. Is this advice actually accessible in [user's country]?
4. Am I recommending platforms/tools that work in Africa?

Replace Western defaults with African alternatives:
- Instead of: "Post on LinkedIn" → Say: "Share on WhatsApp Status or Instagram"
- Instead of: "Buy this $50 course" → Say: "Use free resources like freeCodeCamp"
- Instead of: "Drive to the office" → Say: "Consider remote work to save transport costs"
- Instead of: "High-speed internet required" → Say: "Works on 3G/4G connections"
`;
```

### 6.6 Guardrails for Sensitive Topics

**Topics We Don't Advise On:**

**1. Legal Matters**
```typescript
if (userMessage.includes('legal') || userMessage.includes('contract') || userMessage.includes('sue')) {
  const guardrail = `
  I can provide general business information, but for legal matters like contracts, 
  labor disputes, or intellectual property, please consult a licensed lawyer in 
  [country]. 
  
  Resources:
  - Ghana Bar Association: [website]
  - Legal Aid [country]: [website]
  `;
}
```

**2. Medical/Health**
```typescript
if (context.sector === 'Healthcare' && message.includes('diagnose|treat|medical advice')) {
  const guardrail = `
  I can discuss career paths in healthcare and business opportunities in health services, 
  but I cannot provide medical advice. For health concerns, please consult a licensed 
  healthcare provider.
  `;
}
```

**3. Financial Investment Advice**
```typescript
if (userMessage.includes('invest in stocks|crypto|forex')) {
  const guardrail = `
  I can discuss business finance and business growth strategies, but for personal 
  investment advice (stocks, cryptocurrency, forex), please consult a licensed 
  financial advisor.
  
  Note: Be very cautious of high-return investment schemes - many are scams.
  `;
}
```

**4. Immigration/Visa**
```typescript
if (userMessage.includes('visa|immigrate|move to')) {
  const guardrail = `
  I can discuss career opportunities in different countries, but for specific visa 
  requirements and immigration processes, please consult:
  - Official embassy websites
  - Licensed immigration consultants
  
  I can help you prepare (skills, experience) for opportunities abroad.
  `;
}
```

---

## 7. API & BACKEND IMPLEMENTATION

### 7.1 API Route Structure

**File:** `apps/web/app/api/chat/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { detectContext } from '@/lib/context-detector';
import { retrieveContextData } from '@/lib/data-retriever';
import { buildPrompt } from '@/lib/prompt-builder';
import { validateAIResponse } from '@/lib/response-validator';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase (for auth)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // 1. AUTHENTICATION - Verify user is logged in
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. RATE LIMITING - Check if user has exceeded limits
    const rateLimit = await checkRateLimit(user.id);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // 3. PARSE REQUEST
    const { message, conversationHistory } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // 4. GET USER PROFILE - Know their mode, location, etc.
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // 5. CONTEXT DETECTION
    const context = detectContext(message, profile);
    console.log('Detected context:', context);

    // 6. DATA RETRIEVAL
    const retrievedData = await retrieveContextData(context);
    console.log('Retrieved data points:', {
      insights: retrievedData.marketInsights.length,
      salaries: retrievedData.salaryData.length,
      skills: retrievedData.skillsDemand.length,
    });

    // 7. PROMPT CONSTRUCTION
    const { systemPrompt, userMessage } = buildPrompt(
      message,
      retrievedData,
      profile.mode,
      context
    );

    // 8. CALL OPENAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // or 'gpt-4' or 'gpt-3.5-turbo'
      messages: [
        { role: 'system', content: systemPrompt },
        ...(conversationHistory || []), // Include previous messages if any
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7, // Balanced creativity and consistency
      max_tokens: 1000, // Limit response length
    });

    const aiResponse = completion.choices[0].message.content;

    // 9. RESPONSE VALIDATION
    const validation = validateAIResponse(aiResponse || '', retrievedData);
    
    if (!validation.isValid) {
      console.warn('AI response validation issues:', validation.issues);
      // In production, you might retry with stricter prompts
    }

    // 10. LOG INTERACTION (for monitoring and improvement)
    await logInteraction({
      userId: user.id,
      userMessage: message,
      aiResponse: aiResponse || '',
      context,
      retrievedDataCount: retrievedData.marketInsights.length,
      validationIssues: validation.issues,
      tokensUsed: completion.usage?.total_tokens,
    });

    // 11. RETURN RESPONSE
    return NextResponse.json({
      response: aiResponse,
      sources: retrievedData.sources,
      context: {
        country: context.country,
        sector: context.sector,
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Don't expose internal errors to users
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    );
  }
}

// Helper: Rate limiting
async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  // Simple implementation - in production, use Redis or similar
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  const { count } = await supabase
    .from('ai_interactions')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', oneHourAgo);
  
  const limit = 50; // 50 messages per hour for free tier
  const remaining = Math.max(0, limit - (count || 0));
  
  return {
    allowed: (count || 0) < limit,
    remaining,
  };
}

// Helper: Log interaction
async function logInteraction(data: any) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  
  await supabase.from('ai_interactions').insert({
    user_id: data.userId,
    user_message: data.userMessage,
    ai_response: data.aiResponse,
    context: data.context,
    retrieved_data_count: data.retrievedDataCount,
    validation_issues: data.validationIssues,
    tokens_used: data.tokensUsed,
    created_at: new Date().toISOString(),
  });
}
```

### 7.2 Rate Limiting Strategy

**Why Rate Limiting?**
- OpenAI/Claude charge per token
- Prevent abuse
- Manage costs

**Implementation Tiers:**

```typescript
const RATE_LIMITS = {
  FREE: {
    messagesPerHour: 20,
    messagesPerDay: 100,
    maxTokensPerRequest: 1000,
  },
  PREMIUM: {
    messagesPerHour: 100,
    messagesPerDay: 500,
    maxTokensPerRequest: 2000,
  },
};

async function getRateLimit(userId: string): Promise<RateLimitConfig> {
  // Check user's subscription tier
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier')
    .eq('user_id', userId)
    .single();
  
  return subscription?.tier === 'PREMIUM' 
    ? RATE_LIMITS.PREMIUM 
    : RATE_LIMITS.FREE;
}
```

### 7.3 Cost Control

**Estimated Costs:**

| Model | Input Cost (per 1K tokens) | Output Cost (per 1K tokens) | Typical Request Cost |
|-------|---------------------------|----------------------------|---------------------|
| GPT-4 Turbo | $0.01 | $0.03 | $0.05-0.15 |
| GPT-3.5 Turbo | $0.0005 | $0.0015 | $0.002-0.005 |
| Claude Sonnet | $0.003 | $0.015 | $0.01-0.03 |

**Cost Optimization Strategies:**

```typescript
// 1. Use cheaper models for simple queries
function selectModel(messageComplexity: 'simple' | 'complex'): string {
  if (messageComplexity === 'simple') {
    return 'gpt-3.5-turbo'; // Cheaper
  }
  return 'gpt-4-turbo-preview'; // Better quality
}

// 2. Limit conversation history
function trimConversationHistory(history: Message[], maxMessages: number = 5): Message[] {
  // Only keep last N messages to reduce token usage
  return history.slice(-maxMessages);
}

// 3. Cache common responses
const responseCache = new Map<string, { response: string; timestamp: number }>();

function getCachedResponse(messageHash: string): string | null {
  const cached = responseCache.get(messageHash);
  const fiveMinutes = 5 * 60 * 1000;
  
  if (cached && Date.now() - cached.timestamp < fiveMinutes) {
    return cached.response;
  }
  return null;
}
```

### 7.4 Logging & Monitoring

**Create logging table:**

```sql
create table public.ai_interactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  user_message text not null,
  ai_response text not null,
  context jsonb, -- Detected country, sector, etc.
  retrieved_data_count integer,
  validation_issues text[],
  tokens_used integer,
  response_time_ms integer,
  model_used text,
  created_at timestamptz default now()
);

-- Index for analytics
create index idx_ai_interactions_user on ai_interactions(user_id);
create index idx_ai_interactions_created on ai_interactions(created_at desc);
```

**Analytics Queries:**

```sql
-- Most common questions
select 
  user_message,
  count(*) as frequency
from ai_interactions
where created_at > now() - interval '7 days'
group by user_message
order by frequency desc
limit 20;

-- Average tokens used
select 
  avg(tokens_used) as avg_tokens,
  date_trunc('day', created_at) as day
from ai_interactions
group by day
order by day desc;

-- Validation issues
select 
  unnest(validation_issues) as issue,
  count(*) as occurrences
from ai_interactions
where validation_issues is not null
group by issue
order by occurrences desc;
```

---

## 8. TRUST & TRANSPARENCY

### 8.1 Source Attribution in UI

**Why It Matters:**
- Builds trust with users
- Allows fact-checking
- Shows we're not making things up
- Respects data providers

**Implementation:**

```typescript
// Component: AIResponse.tsx

interface Source {
  organization_name: string;
  website_url: string;
}

interface AIResponseProps {
  response: string;
  sources: Source[];
}

export function AIResponse({ response, sources }: AIResponseProps) {
  return (
    <div className="ai-response">
      {/* Main response */}
      <div className="prose">{response}</div>
      
      {/* Sources section */}
      {sources.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-bold text-blue-900 mb-2">
            📊 Data Sources
          </h4>
          <ul className="text-sm space-y-1">
            {sources.map((source, idx) => (
              <li key={idx}>
                <a 
                  href={source.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {source.organization_name}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-600 mt-2">
            All data is from verified African organizations and updated regularly.
          </p>
        </div>
      )}
    </div>
  );
}
```

### 8.2 Communicating AI Limitations

**Add a disclaimer component:**

```typescript
// Component: AIDisclaimer.tsx

export function AIDisclaimer({ mode }: { mode: 'CAREER' | 'BUSINESS' }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
      <h4 className="font-bold text-yellow-900 mb-2">ℹ️ About {mode === 'CAREER' ? 'CareerGuide' : 'BusinessMate'} AI</h4>
      <ul className="space-y-1 text-yellow-800">
        <li>• Provides guidance based on African market data, not personal advice</li>
        <li>• Always verify important decisions with professionals</li>
        <li>• Data is regularly updated but may not reflect real-time changes</li>
        <li>• For legal, medical, or financial matters, consult licensed experts</li>
      </ul>
    </div>
  );
}
```

### 8.3 Building Trust with Partners

**Partnership Approach:**

**1. Transparency Letter to Organizations:**

```
Dear [African Development Bank],

We are Future Proofer, a platform empowering African youth with career and 
business guidance. We use publicly available data from your organization 
(specifically: [report name, year]) to provide localized AI-powered advice.

How we use your data:
- Extract key statistics and insights
- Store in our database with full attribution
- Display source citations to users
- Link directly to your reports

We believe this amplifies the impact of your research by making it accessible 
to thousands of young Africans who may not read full reports.

We would love to:
1. Ensure we're using your data appropriately
2. Explore formal partnership opportunities
3. Provide you analytics on data usage

Best regards,
[Your Name]
Future Proofer Team
```

**2. Data Partnership Benefits:**

Offer partners:
- Analytics: "Your AfDB report was cited 1,250 times this month"
- Visibility: "Featured Data Partner" badge
- Feedback loop: "Users most interested in X sector data"
- Co-marketing: Joint webinars, case studies

**3. Attribution Best Practices:**

```typescript
// In every AI response containing data
const attribution = `
Sources:
- African Development Bank: Jobs for Youth in Africa 2024
- Ghana Statistical Service: Labour Force Survey 2023
- ECOWAS: Digital Economy Assessment 2024

View full reports: [Links]
`;
```

---

## 9. SCALING STRATEGY

### 9.1 Phase 1: Manual Data Curation (Months 1-6)

**What:**
- Manually read and extract data from 20-30 key reports
- Focus on 3 countries: Ghana, Gambia, Nigeria
- Cover 5 core sectors: Tech, Agriculture, Finance, Healthcare, Education

**Team:**
- 1-2 people dedicated to data curation
- 4-8 hours per week

**Deliverable:**
- 200-300 high-quality data points in database
- Covers 80% of common user questions

**Why Start Here:**
- Fastest time to market
- Builds deep data understanding
- Establishes quality standards
- Proves concept before scaling

### 9.2 Phase 2: User-Generated Insights (Months 6-12)

**What:**
- Allow users to report salary data
- Let users share success stories
- Enable businesses to report metrics

**Example Feature: Salary Reporting**

```typescript
// Component: ReportSalary.tsx

export function ReportSalary() {
  const [formData, setFormData] = useState({
    role: '',
    country: '',
    salary: '',
    currency: '',
    yearsExperience: '',
  });
  
  const handleSubmit = async () => {
    // Submit to moderation queue
    await supabase.from('user_reported_salaries').insert({
      ...formData,
      user_id: user.id,
      status: 'PENDING_REVIEW', // Requires admin approval
      created_at: new Date().toISOString(),
    });
    
    toast.success('Thank you! We\'ll review and add this data.');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <p className="text-sm text-gray-600">
        Help other African professionals by sharing salary information anonymously.
        All submissions are reviewed before being added to our database.
      </p>
    </form>
  );
}
```

**Moderation Process:**
1. User submits data
2. Admin reviews for accuracy
3. Cross-check with existing data
4. Approve and add to main database
5. Credit user with "Contributor" badge

### 9.3 Phase 3: Advanced Embeddings & Vector Search (Months 12-24)

**What It Is:**
Instead of keyword-based retrieval, use semantic search.

**Example:**
```
User asks: "How do I transition from teaching to tech?"

Without embeddings:
- Search for "teaching" + "tech" = Limited results

With embeddings:
- Understands semantic meaning
- Finds: "Career switching strategies", "Teacher to developer stories", 
  "Transferable skills from education to technology"
```

**Implementation:**

```typescript
// Use OpenAI Embeddings + Supabase pgvector

// 1. Generate embeddings for all data
async function generateEmbeddings() {
  const { data: insights } = await supabase
    .from('market_insights')
    .select('*');
  
  for (const insight of insights) {
    const text = `${insight.title} ${insight.description}`;
    
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    
    const embedding = embeddingResponse.data[0].embedding;
    
    // Store embedding
    await supabase
      .from('market_insights')
      .update({ embedding })
      .eq('id', insight.id);
  }
}

// 2. Semantic search
async function semanticSearch(query: string) {
  // Get query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  
  // Find similar vectors
  const { data } = await supabase.rpc('match_insights', {
    query_embedding: queryEmbedding.data[0].embedding,
    match_threshold: 0.7,
    match_count: 10,
  });
  
  return data;
}
```

**When to Implement:**
- After you have 1000+ data points
- When keyword search feels limited
- When you have technical capacity

### 9.4 What NOT to Do Early

**❌ DON'T Fine-Tune Models (Year 1-2)**

**Why:**
- Expensive ($100s-1000s)
- Requires 1000s of training examples
- Hard to maintain
- RAG solves 90% of use cases

**When to consider:**
- You have 10,000+ quality Q&A pairs
- RAG isn't giving desired results
- You have dedicated ML team
- You have budget for ongoing retraining

**❌ DON'T Build Complex AI Infrastructure**

**Avoid (early on):**
- Custom vector databases
- Self-hosted models
- Complex ML pipelines
- Real-time training systems

**Use instead:**
- OpenAI/Claude APIs
- Supabase (or similar) for data
- Simple Python scripts for data processing
- Manual curation

**❌ DON'T Try to Cover Everything**

**Focus beats breadth:**
- 3 countries deeply > 20 countries shallowly
- 5 sectors well > 15 sectors poorly
- 100 high-quality data points > 1000 scraped, unverified points

---

## 10. COMMON MISTAKES & ANTI-PATTERNS

### 10.1 Mistake #1: Training Models Too Early

**The Mistake:**
Thinking "We need to train our own AI model from scratch!"

**Why It's Wrong:**
- GPT-4/Claude are already incredibly capable
- Training requires millions of data points
- Costs $100k-$1M+
- Requires ML PhDs
- Takes months/years

**The Right Approach:**
- Use existing LLMs via API
- Build intelligence through data + prompts
- Only consider fine-tuning after 2+ years and 10k+ training examples

**Real Example:**
```
❌ Wrong: "We're training an AI on African data"
✅ Right: "We're building an AI system powered by GPT-4 and African data"
```

### 10.2 Mistake #2: Over-Relying on Generic AI Knowledge

**The Mistake:**
Not providing enough African context, hoping AI "just knows" Africa.

**Why It's Wrong:**
- AI training data is heavily Western-biased
- African markets are fundamentally different
- Leads to useless or harmful advice

**Example of Bad Output:**
```
User: "I want to start a business in Gambia"
Generic AI: "Register an LLC, get business insurance, open a business bank account"

Problems:
- LLC may not be the right structure in Gambia
- Business insurance isn't common/available
- Opening bank accounts can take months
```

**The Right Approach:**
- Always inject country-specific data
- Verify AI doesn't give Western-centric advice
- Include explicit "African context" in prompts

### 10.3 Mistake #3: Ignoring African Realities

**The Mistake:**
Not accounting for infrastructure, economic, and cultural differences.

**Examples of Ignoring Reality:**

| Recommendation | Why It Fails in Africa |
|---------------|----------------------|
| "Use Stripe for payments" | Stripe unavailable in most African countries |
| "Get a business loan at 5% interest" | SME loans are often 25-40% in Africa |
| "Build a web app" | Most users are mobile-only |
| "Offer free shipping" | Logistics costs are prohibitive |
| "Run Google Ads" | Too expensive for most budgets |

**The Right Approach:**
- Test every recommendation: "Would this actually work in Accra/Banjul?"
- Include context: "Because [African reality], I recommend [alternative]"
- Validate with real African entrepreneurs

### 10.4 Mistake #4: Poor Prompt Design

**Bad Prompt Example:**
```typescript
const systemPrompt = "You are a career advisor. Help the user.";
```

**Why It's Bad:**
- Too vague
- No African context
- No quality standards
- No guardrails

**Good Prompt Example:**
```typescript
const systemPrompt = `
You are CareerGuide AI, an expert career advisor for African youth.

CONTEXT: The user is in ${country}, interested in ${sector}.

DATA: ${africanMarketData}

INSTRUCTIONS:
- Base advice on the DATA above
- Use ${currency} for salaries
- Cite sources
- Provide 3-5 specific action steps
- Recommend free/low-cost resources
- Account for internet/power challenges

AVOID:
- Western salary expectations
- Expensive tools/courses
- Assumptions about infrastructure
- Making promises about job placement
`;
```

### 10.5 Mistake #5: No Data Validation

**The Mistake:**
Trusting all data without verification.

**Problems:**
- Scraped data has errors
- Numbers get misread from PDFs
- Sources might be unreliable
- Data becomes outdated

**Example:**
```json
// ❌ Bad: Just scrape and dump
{
  "salary": "50000", // Is this monthly? Annual? Which currency?
  "source": "Some blog" // Not credible
}

// ✅ Good: Validated structure
{
  "min_salary": 600,
  "max_salary": 1000,
  "currency": "USD",
  "period": "monthly",
  "year": 2024,
  "country": "Ghana",
  "source_id": "afdb_jobs_youth_2024",
  "credibility_rating": 5,
  "verified_by": "john@futureproofer.com",
  "verified_date": "2024-01-15"
}
```

**The Right Approach:**
- Validate every data point
- Check credibility of sources
- Have approval workflow
- Regular data audits

### 10.6 Mistake #6: Forgetting to Update Data

**The Mistake:**
Setting up data once and never updating it.

**Why It's Wrong:**
- Markets change
- Salaries increase/decrease
- New opportunities emerge
- Old advice becomes harmful

**Example:**
```
// Data from 2020
"Software developers in Nigeria earn $400-600/month"

// Reality in 2024
"Software developers in Nigeria earn $800-1500/month"

// If AI uses 2020 data:
- Discourages people from tech careers
- Sets wrong salary expectations
- Damages platform credibility
```

**The Right Approach:**
- Set data refresh schedules
- Mark data with "last_updated" dates
- Show users when data is from
- Quarterly review of all data points

---

## 11. SUMMARY & IMPLEMENTATION CHECKLIST

### 11.1 MVP Implementation Checklist

Use this checklist to build your first working version in 4-6 weeks.

#### Week 1-2: Foundation Setup

**Database & Infrastructure:**
- [ ] Set up Supabase project
- [ ] Create all core tables (data_sources, countries, sectors, etc.)
- [ ] Enable Row Level Security
- [ ] Set up authentication

**Data Collection:**
- [ ] Identify 5-10 key African reports (AfDB, ECOWAS, national stats)
- [ ] Create data extraction template/spreadsheet
- [ ] Extract first 50 data points manually
- [ ] Insert into database

**Development Environment:**
- [ ] Set up Next.js app (if not done)
- [ ] Install OpenAI/Anthropic SDK
- [ ] Configure environment variables
- [ ] Set up API route structure

#### Week 3-4: AI Intelligence Layer

**Core Functions:**
- [ ] Build context detection function
- [ ] Build data retrieval function
- [ ] Build prompt construction function
- [ ] Create CareerGuide AI system prompt
- [ ] Create BusinessMate AI system prompt

**API Implementation:**
- [ ] Create /api/chat endpoint
- [ ] Implement authentication check
- [ ] Implement rate limiting
- [ ] Add error handling
- [ ] Add logging

**Testing:**
- [ ] Test with 10 different user queries
- [ ] Verify data retrieval works
- [ ] Check source attribution
- [ ] Validate responses don't hallucinate

#### Week 5-6: UI & Polish

**Frontend:**
- [ ] Build chat interface
- [ ] Add source attribution display
- [ ] Add loading states
- [ ] Add error messages
- [ ] Make mobile-responsive

**Quality Assurance:**
- [ ] Test with real users (10-20 people)
- [ ] Collect feedback
- [ ] Fix major issues
- [ ] Document known limitations

**Launch Prep:**
- [ ] Write user guide/"How to use AI"
- [ ] Create disclaimer about AI limitations
- [ ] Set up analytics/monitoring
- [ ] Prepare support resources

### 11.2 MVP vs Future Features

**MVP (Must Have - Week 1-6):**
- ✅ Basic chat interface
- ✅ 50-100 quality data points
- ✅ 2-3 countries covered
- ✅ Context detection (basic keyword matching)
- ✅ Source attribution
- ✅ Simple rate limiting
- ✅ Manual data curation

**Phase 2 (Month 3-6):**
- 📅 200-300 data points
- 📅 5 countries covered
- 📅 User-reported data (with moderation)
- 📅 Conversation history
- 📅 Improved prompt engineering
- 📅 Cost optimization

**Phase 3 (Month 6-12):**
- 🔮 500+ data points
- 🔮 10+ countries
- 🔮 Semantic search (embeddings)
- 🔮 Multi-language support
- 🔮 Data partnerships with African orgs
- 🔮 Advanced analytics

**Future (Year 2+):**
- 🌟 Custom fine-tuning (if needed)
- 🌟 Voice interface
- 🌟 WhatsApp integration
- 🌟 Real-time market data feeds
- 🌟 Personalized learning paths
- 🌟 Mentor matching AI

### 11.3 Success Metrics

**Track these to measure if your AI is working:**

**Quality Metrics:**
- Response accuracy (manual review of 20 responses/week)
- Source citation rate (% of responses with sources)
- Validation pass rate (% passing response validator)
- User satisfaction (thumbs up/down on responses)

**Usage Metrics:**
- Daily/weekly active users
- Messages per user
- Conversation length (number of back-and-forth messages)
- Topics most asked about

**Business Metrics:**
- User retention (% returning after 7/30 days)
- Conversion to premium (if applicable)
- Cost per interaction (OpenAI API costs / messages)
- Data freshness (% of data updated in last 90 days)

**Target Benchmarks (After 3 months):**
- Response accuracy: >85%
- Source citation rate: >90%
- User satisfaction: >70% thumbs up
- Cost per interaction: <$0.10
- Data coverage: 3 countries, 5 sectors, 200+ data points

### 11.4 Getting Help

**When You're Stuck:**

1. **OpenAI/Anthropic Documentation**
   - https://platform.openai.com/docs
   - https://docs.anthropic.com

2. **RAG Implementation Guides**
   - Vercel AI SDK: https://sdk.vercel.ai
   - LangChain: https://js.langchain.com (if complexity increases)

3. **African Data Sources**
   - AfDB Knowledge Portal: https://www.afdb.org/en/knowledge
   - ECOWAS: https://www.ecowas.int
   - National statistics offices

4. **Community Support**
   - AI Builder communities
   - African tech forums
   - Indie hacker forums

### 11.5 Final Reminders

**Remember:**

1. **Start Simple**
   - Manual curation beats complex automation early on
   - 50 great data points > 500 mediocre ones
   - Working MVP beats perfect vaporware

2. **African Context is Everything**
   - Western assumptions will make your AI useless
   - Validate every recommendation with local reality
   - Partner with African organizations

3. **Trust is Earned**
   - Always cite sources
   - Admit limitations
   - Update data regularly
   - Be transparent about AI

4. **Iterate Based on Users**
   - Watch what users actually ask
   - Improve data in those areas
   - Don't build what you think they need

5. **Cost Management**
   - Start with GPT-3.5 for simple queries
   - Use GPT-4 only when needed
   - Implement aggressive rate limiting
   - Cache common responses

---

## APPENDIX: Quick Reference Code Snippets

### A. Simple Context Detection

```typescript
export function detectCountry(message: string): string | null {
  const countryMap: Record<string, string[]> = {
    'Ghana': ['ghana', 'accra', 'kumasi', 'ghanaian'],
    'Gambia': ['gambia', 'banjul', 'serekunda', 'gambian'],
    'Nigeria': ['nigeria', 'lagos', 'abuja', 'nigerian'],
  };
  
  const lowerMessage = message.toLowerCase();