# FUTURE PROOFER
## Complete Technical Documentation & Implementation Guide

**Version:** 3.0 (Consolidated)  
**Date:** January 2026  
**Framework:** Next.js 15 (TurboRepo)  
**Stack:** React, TypeScript, Tailwind CSS, Supabase

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Problem Analysis](#problem-analysis)
3. [Market Analysis](#market-analysis)
4. [Solution Overview](#solution-overview)
5. [Platform Architecture](#platform-architecture)
6. [Detailed Feature Breakdown](#detailed-feature-breakdown)
7. [Complete User Flows](#complete-user-flows)
8. [Technical Architecture & Implementation](#technical-architecture)
9. [Phase 1 Implementation Plan](#phase-1-implementation)
10. [Database Schema Design](#database-schema)
11. [Component Architecture](#component-architecture)
12. [Development Roadmap](#development-roadmap)

---

## EXECUTIVE SUMMARY

Future Proofer is an AI-powered foresight platform designed to empower African youth with intelligent career planning and business strategy through localized AI insights. The platform addresses the critical gap in strategic career and business guidance for young professionals, students, and entrepreneurs across West Africa, starting with ECOWAS nations.

**Mission:** Empower Africa's next generation with the skills, tools, and guidance needed to thrive in a rapidly evolving, tech-driven economy.

**Vision:** To be the leading digital platform for youth empowerment, career development, and entrepreneurial success across Africa.

---

## PROBLEM ANALYSIS

### 1.1 DESIGN CHALLENGE

"How might we empower African youth with the skills, tools, and strategic guidance needed to thrive in a rapidly changing, tech-driven economy and break free from the cycle of poverty?"

### 1.2 PROBLEM TREE ANALYSIS

```
┌───────────────────────────────────────────────────────────────┐
│ CORE PROBLEM                                                  │
│ Significant number of youth in extreme poverty unable to     │
│ navigate the fast-changing tech-driven/disrupted economy     │
└──────────────────────┬────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │ DIRECT EFFECTS               │
        ├──────────────────────────────┤
        │ • High youth unemployment    │
        │ • Business failures          │
        │ • Skills mismatch            │
        │ • Economic instability       │
        │ • Brain drain                │
        └──────────────┬────────────────┘
                       │
        ┌──────────────┴──────────────────────────┐
        │                                         │
    ┌───▼────┐ ┌─────▼─────┐ ┌────▼────┐ ┌───▼────┐
    │ ROOT   │ │ ROOT      │ │ ROOT    │ │ ROOT   │
    │ CAUSE  │ │ CAUSE     │ │ CAUSE   │ │ CAUSE  │
    │ #1     │ │ #2        │ │ #3      │ │ #4     │
    └────────┘ └───────────┘ └─────────┘ └────────┘
```

#### ROOT CAUSES

1. **Youth Lack Employable On-Demand Skills**
   - Limited access to practical, market-relevant training
   - Traditional education doesn't align with industry needs
   - No continuous upskilling opportunities
   - Lack of digital literacy foundation

2. **Digital Divide**
   - Limited internet access and connectivity
   - Lack of affordable digital devices
   - Insufficient digital infrastructure in rural areas
   - Low awareness of digital opportunities

3. **Rapid Pace of Technological Disruption**
   - Jobs being automated faster than new skills are acquired
   - Emerging technologies creating unknown career paths
   - Traditional careers becoming obsolete
   - Lack of foresight in career planning

4. **Lack of Strategic & Timely Career & Business Guidance**
   - No personalized career counseling at scale
   - Limited access to mentors and business advisors
   - No data-driven insights for decision-making
   - Disconnect between education and employment

### 1.3 FIVE WHYS ANALYSIS

**Problem Statement:** African youth are unable to secure stable employment or build successful businesses.

**Why #1:** Why can't African youth secure stable employment or build successful businesses?
- **Answer:** Because they lack the skills and strategic guidance needed in today's job market and business environment.

**Why #2:** Why do they lack these necessary skills and guidance?
- **Answer:** Because they have limited access to quality, relevant training and personalized career/business mentorship.

**Why #3:** Why is there limited access to quality training and mentorship?
- **Answer:** Because traditional educational systems and mentorship models cannot scale to meet the demand, and digital solutions are not localized for African contexts.

**Why #4:** Why can't existing systems scale and why aren't digital solutions localized?
- **Answer:** Because there's a lack of investment in AI-powered, culturally relevant platforms that understand African market dynamics and can provide personalized guidance at scale.

**Why #5:** Why is there a lack of investment in such platforms?
- **Answer:** Because there's insufficient evidence of impact and sustainable business models for youth empowerment technology in African markets, creating a gap that Future Proofer aims to fill.

**ROOT CAUSE IDENTIFIED:** The absence of scalable, AI-powered, locally contextualized platforms that can deliver personalized career and business guidance to African youth at scale.

---

## MARKET ANALYSIS

### 2.1 TARGET ADDRESSABLE MARKET

- **Total Addressable Market (TAM):** 450 Million African Youth (15-35 years)
- **Serviceable Addressable Market (SAM):** 100 Million West African Youth (ECOWAS region)
- **Serviceable Obtainable Market (SOM):** 5 Million digitally connected youth in The Gambia and Ghana (Year 1-2 focus)

### 2.2 TARGET GROUPS

#### PRIMARY USERS

1. **Youth (Ages 15-24)**
   - Secondary school students
   - University/college students
   - Vocational training participants
   - Out-of-school youth seeking opportunities

2. **Young Professionals (Ages 25-30)**
   - Early career professionals
   - Career switchers
   - Professionals seeking advancement
   - Remote work seekers

3. **Students (All Levels)**
   - High school students planning futures
   - University students preparing for careers
   - Graduate students specializing
   - Lifelong learners

4. **Entrepreneurs (Ages 20-35)**
   - Aspiring entrepreneurs
   - Early-stage founders (0-2 years)
   - Growing SME owners
   - Social entrepreneurs

#### SECONDARY STAKEHOLDERS

1. **Mentors/Trainers**
   - Industry professionals
   - Successful entrepreneurs
   - Academic instructors
   - Skills trainers

2. **Organizations**
   - Educational institutions
   - NGOs and development partners
   - Corporate HR departments
   - Government youth programs

### 2.3 USER PERSONAS

#### PERSONA 1: AMINA - THE AMBITIOUS STUDENT

**Demographics:**
- Age: 21
- Location: Banjul, The Gambia
- Education: 3rd year Computer Science student
- Tech Savvy: High

**Goals:**
- Graduate with marketable skills
- Secure a tech job or remote work opportunity
- Build a strong professional network
- Stay ahead of technology trends

**Pain Points:**
- Uncertain which tech specialization to pursue
- No clear path from education to employment
- Limited access to industry mentors
- Doesn't know which skills employers actually want

**How Future Proofer Helps:**
- CareerGuide AI shows demand for specific tech skills
- Thinkforge courses bridge academic-industry gap
- Network connects her with working tech professionals
- AI generates optimized CV based on market needs

#### PERSONA 2: KWAME - THE ASPIRING ENTREPRENEUR

**Demographics:**
- Age: 28
- Location: Accra, Ghana
- Background: Has a small online retail business
- Tech Savvy: Medium

**Goals:**
- Scale his business beyond friends and family
- Make data-driven business decisions
- Access capital and investors
- Build a sustainable business model

**Pain Points:**
- No mentorship or business guidance
- Doesn't understand market trends
- Can't analyze business data effectively
- No clear growth strategy

**How Future Proofer Helps:**
- BusinessMate AI provides personalized business insights
- Upload business docs for AI-powered analysis
- Market intelligence for West African trends
- Tools for business model validation
- Connect with successful entrepreneur mentors

#### PERSONA 3: FATOU - THE CAREER SWITCHER

**Demographics:**
- Age: 26
- Location: Banjul, The Gambia
- Current: Teacher wanting to transition to tech/digital marketing
- Tech Savvy: Low-Medium

**Goals:**
- Transition to higher-paying digital career
- Learn new, in-demand skills
- Get certified in new field
- Find remote work opportunities

**Pain Points:**
- Doesn't know where to start
- Overwhelmed by too many options
- Can't afford expensive courses
- No one to guide the transition

**How Future Proofer Helps:**
- CareerGuide AI creates personalized transition roadmap
- Thinkforge offers affordable, practical courses
- Skills gap analysis shows exactly what to learn
- CV builder helps repackage existing skills

#### PERSONA 4: IBRAHIM - THE TECH PROFESSIONAL

**Demographics:**
- Age: 29
- Location: Serekunda, The Gambia
- Current: Junior software developer
- Tech Savvy: High

**Goals:**
- Advance to senior developer role
- Stay current with emerging technologies
- Increase earning potential
- Consider entrepreneurship

**Pain Points:**
- Unclear career progression path
- Limited access to advanced training
- No mentorship for career advancement
- Uncertain about market value

**How Future Proofer Helps:**
- AI forecasts demand for specific development skills
- Advanced courses in Thinkforge
- Connect with senior developers as mentors
- Market intelligence on salary benchmarks

---

## SOLUTION OVERVIEW

### 3.1 CORE VALUE PROPOSITION

Future Proofer delivers AI-powered, locally contextualized career and business intelligence that:

1. Predicts future skills demand and market trends specific to West Africa
2. Guides users with personalized career paths and business strategies
3. Connects users with mentors, peers, and opportunities
4. Educates through practical, industry-relevant courses
5. Empowers with tools for CV building, business planning, and decision-making

### 3.2 KEY DIFFERENTIATORS

- **Localized AI:** Trained on West African market data, not Western models
- **Dual Mode:** Serves both career seekers AND entrepreneurs
- **Integrated Learning:** Courses directly linked to career/business needs
- **Real-time Intelligence:** Live market data, not static advice
- **Accessible:** Mobile-first design for low-bandwidth environments
- **Affordable:** Freemium model with accessible premium tiers

---

## PLATFORM ARCHITECTURE

### 4.1 USER MODES

```
┌─────────────────────────────────────┐
│ FUTURE PROOFER PLATFORM             │
├─────────────────────────────────────┤
│                                     │
│ ┌────────────┐ ┌──────────────┐   │
│ │ CAREER     │ │ BUSINESS     │   │
│ │ MODE       │ │ MODE         │   │
│ └──────┬─────┘ └──────┬───────┘   │
│        │              │            │
│ ┌──────▼──────────────▼───────┐   │
│ │ CAREERGUIDE AI / BUSINESSMATE│   │
│ │ AI ENGINE                    │   │
│ └──────┬──────────────┬───────┘   │
│        │              │            │
│ ┌──────▼─────┐ ┌─────▼───────┐   │
│ │ THINKFORGE │ │ NETWORK     │   │
│ │ LEARNING   │ │ CONNECTIONS │   │
│ └────────────┘ └─────────────┘   │
│                                    │
│ ┌────────────────────────────────┐│
│ │ USER PROFILE                   ││
│ │ Education • Skills • Goals     ││
│ └────────────────────────────────┘│
└─────────────────────────────────────┘
```

### 4.2 CORE COMPONENTS

#### A. CAREERGUIDE AI (Career Mode)

Intelligent career navigation system providing:
- Skills gap analysis
- Career path recommendations
- Job market insights (West Africa)
- Salary benchmarks
- CV/Resume generator
- Interview preparation
- Learning recommendations

#### B. BUSINESSMATE AI (Business Mode)

Comprehensive business intelligence suite offering:
- Conversational AI business advisor
- Market trend forecasting (West Africa)
- Business document analysis
- Strategic foresight tools
- Business Model Canvas generator
- Market validation framework
- Growth recommendations
- HR decision support

#### C. THINKFORGE (Learning Hub)

Curated learning platform featuring:
- 6 Core Course Tracks
- Masterclasses from industry experts
- Practical, project-based learning
- Certification programs
- Progress tracking

#### D. NETWORK (Community & Mentorship)

Professional networking platform with:
- Mentor matching
- Peer connections
- Success story sharing
- Posting and engagement
- Message functionality
- Event announcements

---

## DETAILED FEATURE BREAKDOWN

### 5.1 CAREERGUIDE AI FEATURES

#### 5.1.1 Core Capabilities

**A. Career Discovery**
- Skills assessment quiz
- Interest and values alignment
- Personality-based career matching
- Exploration of career options

**B. Skills Gap Analysis**
- Current skills inventory
- Desired role requirements
- Gap identification
- Learning path generation

**C. Market Intelligence Dashboard**
- Real-time job demand data (West Africa)
- Emerging skills trends
- Salary ranges by role and location
- Industry growth forecasts
- Remote work opportunities

**D. CV/Resume Builder**
- AI-powered content generation
- ATS-optimized templates
- Multiple format exports (PDF, DOCX)
- Tailored versions for different roles
- LinkedIn profile optimization

**E. Interview Preparation**
- Common interview questions by role
- AI mock interviews
- Answer frameworks (STAR method)
- Industry-specific prep
- Video practice recordings

**F. Learning Pathway Generator**
- Personalized course recommendations
- Skills prioritization
- Timeline and milestone setting
- Integration with Thinkforge courses

#### 5.1.2 Dashboard View

```
┌─────────────────────────────────────────────────────┐
│ CAREERGUIDE AI                                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 👋 Welcome back, Amina!                            │
│                                                     │
│ 🎯 YOUR CAREER GOAL: Software Developer            │
│ 📊 Progress: 65% Ready                             │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 🔥 TOP INSIGHTS THIS WEEK                   │   │
│ │ • Web3 developer demand up 45% in Ghana     │   │
│ │ • React skills now required for 78% of      │   │
│ │   frontend roles                            │   │
│ │ • Average junior dev salary: $800-1200/mo   │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 📋 YOUR NEXT STEPS:                                │
│ ✅ Complete JavaScript Fundamentals                │
│ ⬜ Build portfolio project                         │
│ ⬜ Connect with 3 mentors                          │
│                                                     │
│ [Ask CareerGuide AI anything...]                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 5.2 BUSINESSMATE AI FEATURES

#### 5.2.1 Core Capabilities

**A. Conversational Business Advisor**
- Natural language interaction
- Context-aware responses
- Learns from user's business over time
- Personalized recommendations

**B. Document Intelligence**
- Upload business plans, financial statements
- Extract key insights
- Identify gaps and opportunities
- Generate summaries and action items

**C. Market Intelligence Suite**
- West African market trends
- Competitive landscape analysis
- Customer behavior insights
- Pricing recommendations
- Market entry strategies

**D. Strategic Business Tools**

*Business Model Canvas Generator*
- Interactive canvas creation
- AI suggestions for each section
- Export and share functionality
- Version control

*Market Validation Framework*
- Customer discovery templates
- Survey design assistance
- Results analysis
- Pivot recommendations

*Financial Forecasting*
- Revenue projections
- Expense modeling
- Break-even analysis
- Cash flow forecasting

*Strategic Foresight*
- Scenario planning
- Risk identification
- Opportunity mapping
- Strategic options analysis

**E. Growth Acceleration**
- Identify bottlenecks
- Scale-up strategies
- Funding readiness assessment
- Partnership opportunities

**F. HR & Team Management**
- Hiring recommendations
- Role definition assistance
- Compensation benchmarking
- Team structure optimization

#### 5.2.2 BusinessMate Dashboard

```
┌─────────────────────────────────────────────────────┐
│ BUSINESSMATE AI                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 💼 TechStyle Boutique - Online Fashion Retail      │
│ 📈 Growth Stage: Early (8 months)                  │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 🎯 KEY BUSINESS METRICS                     │   │
│ │ Revenue (30d): $2,450 ↑ 18%                 │   │
│ │ Customers: 156 ↑ 23%                        │   │
│ │ Avg Order: $45.20 ↑ 5%                      │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 🔮 AI INSIGHTS & RECOMMENDATIONS:                  │
│                                                     │
│ ⚠️ URGENT: Low inventory turnover on               │
│ Category: Accessories. Consider discount.          │
│                                                     │
│ 💡 OPPORTUNITY: Instagram engagement up 40%.       │
│ Now is ideal time to launch paid campaigns.        │
│                                                     │
│ 📊 TREND ALERT: Sustainable fashion queries        │
│ growing 65% in Ghana. Consider eco-line.           │
│                                                     │
│ 📁 CONNECTED DOCUMENTS: 3                          │
│ └─ Business Plan v2.pdf                            │
│ └─ Q4 Financial Report.xlsx                        │
│ └─ Customer Survey Results.doc                     │
│                                                     │
│ [Ask BusinessMate anything about your business...] │
│                                                     │
│ [📊 Tools] [📈 Forecast] [🎯 Canvas] [📄 Docs]    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 5.3 THINKFORGE (LEARNING HUB)

#### 5.3.1 Course Structure

**6 PRIMARY COURSE TRACKS:**

**1. DIGITAL LITERACY 101 ⭐** (Foundation Course)
- Duration: 8-12 weeks
- Level: Beginner
- Modules: 12

Module Breakdown:
1. Introduction to Digital Literacy
2. Computer & Device Fundamentals
3. Internet, Online Tools & Information Literacy
4. Productivity Tools & Workplace Digital Skills
5. Digital Communication & Collaboration
6. Digital Safety, Cybersecurity & Ethics
7. Introduction to Data Literacy & Data Analysis
8. Integrating Data Analysis with AI
9. Digital Troubleshooting & Problem Solving
10. Practical Project & Assessment

Learning Outcomes:
- Confidently operate digital devices
- Use productivity tools effectively
- Navigate internet safely
- Communicate professionally online
- Understand data fundamentals
- Apply AI tools responsibly
- Practice cybersecurity
- Troubleshoot common issues

**2. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING**
- Duration: 10-14 weeks
- Level: Intermediate
- Modules: 10
- Topics: AI fundamentals, ML algorithms, practical AI applications, ethics

**3. DATA ANALYTICS**
- Duration: 12 weeks
- Level: Beginner to Intermediate
- Modules: 12
- Topics: Data collection, analysis, visualization, statistical thinking, tools (Excel, Python, Tableau)

**4. DESIGN, MEDIA & DIGITAL MARKETING**
- Duration: 10 weeks
- Level: Beginner to Intermediate
- Modules: 10
- Topics: Graphic design, content creation, social media marketing, SEO, brand building

**5. HARDWARE & ROBOTICS**
- Duration: 12 weeks
- Level: Intermediate
- Modules: 10
- Topics: Electronics basics, Arduino, IoT, robotics fundamentals, practical projects

**6. WEB & SOFTWARE DEVELOPMENT**
- Duration: 16 weeks
- Level: Beginner to Advanced
- Modules: 14
- Topics: HTML/CSS, JavaScript, React, backend development, databases, deployment

#### 5.3.2 Learning Experience Features

**A. Interactive Learning**
- Video lessons
- Hands-on projects
- Quizzes and assessments
- Code playgrounds (for tech courses)
- Peer review

**B. Progress Tracking**
- Course completion percentage
- Skill badges earned
- Certificates of completion
- Learning streaks
- Time invested analytics

**C. Personalized Recommendations**
AI suggests next courses based on:
- Career goals
- Current skills
- Market demand
- Learning pace
- Interest areas

**D. Community Learning**
- Discussion forums per course
- Study groups
- Peer help
- Expert Q&A sessions

#### 5.3.3 Thinkforge Interface

```
┌─────────────────────────────────────────────────────┐
│ THINKFORGE - YOUR LEARNING HUB                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 🎓 MY LEARNING JOURNEY                             │
│ ▓▓▓▓▓▓▓░░░░░░░░ 48% Complete                       │
│ 3 courses active • 2 completed • 12 badges         │
│                                                     │
│ ┌────────────── CONTINUE LEARNING ──────────────┐  │
│ │                                                │  │
│ │ 📘 Digital Literacy 101                       │  │
│ │ Module 7 of 12 • 65% complete                 │  │
│ │ [Continue Learning →]                         │  │
│ │                                                │  │
│ └────────────────────────────────────────────────┘  │
│                                                     │
│ ⭐ RECOMMENDED FOR YOU                             │
│                                                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ AI       │ │ Data     │ │ Web      │           │
│ │ & ML     │ │ Analytics│ │ Dev      │           │
│ │ ──────── │ │ ──────── │ │ ──────── │           │
│ │ 10 weeks │ │ 12 weeks │ │ 16 weeks │           │
│ │ [Start]  │ │ [Start]  │ │ [Start]  │           │
│ └──────────┘ └──────────┘ └──────────┘           │
│                                                     │
│ 📚 ALL COURSE TRACKS                               │
│ • Digital Literacy 101 ⭐ (In Progress)            │
│ • Artificial Intelligence & ML                     │
│ • Data Analytics                                   │
│ • Design, Media & Digital Marketing                │
│ • Hardware & Robotics                              │
│ • Web & Software Development                       │
│                                                     │
│ 🏆 YOUR ACHIEVEMENTS                               │
│ [Badge] [Badge] [Badge] [Badge] [+8 more]         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 5.4 NETWORK (MENTORSHIP & COMMUNITY)

#### 5.4.1 Core Features

**A. Profile Discovery**
Browse professionals by:
- Industry
- Role
- Experience level
- Location
- Skills
- Availability as mentor

**B. Connection Types**
- **Mentor:** Request formal mentorship
- **Coach:** Hire for specific guidance
- **Peer:** Connect as equal/colleague
- **Follow:** Stay updated on their content

**C. Mentorship System**
- Request mentorship with message
- Mentors can accept/decline
- Set meeting schedules
- Track mentorship progress
- Rate and review experiences

**D. Content & Engagement**
- Create posts (text, images, links)
- Like, comment, share
- Success story highlights
- Ask questions to community
- Share resources

**E. Messaging**
- Direct messages
- Group chats
- Voice/video calls (future)

**F. Events & Opportunities**
- Virtual events calendar
- Job/internship postings
- Collaboration opportunities
- Competitions and challenges

#### 5.4.2 Network Interface

```
┌─────────────────────────────────────────────────────┐
│ NETWORK - CONNECT & GROW                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ [🏠 Feed] [🔍 Discover] [💬 Messages] [👤 Profile] │
│                                                     │
│ ───────────────── FEED ─────────────────           │
│                                                     │
│ ┌────────────────────────────────────────────────┐ │
│ │ 👤 Sarah Johnson • Senior Data Analyst        │ │
│ │ Accra, Ghana • 2 hours ago                    │ │
│ │                                                │ │
│ │ Just completed an amazing project using ML to │ │
│ │ predict customer churn. Happy to mentor anyone│ │
│ │ interested in data science! #DataScience      │ │
│ │                                                │ │
│ │ ❤️ 45 💬 12 🔄 8                              │ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
│ ┌────────────────────────────────────────────────┐ │
│ │ 🌟 Featured Mentor                            │ │
│ │                                                │ │
│ │ 👤 Michael Osei                               │ │
│ │ Tech Entrepreneur • 10 years experience       │ │
│ │ • Founder, 3 successful startups              │ │
│ │ • Available for mentorship                    │ │
│ │                                                │ │
│ │ [📧 Request Mentorship]                       │ │
│ └────────────────────────────────────────────────┘ │
│                                                     │
│ 📢 UPCOMING EVENTS                                 │
│ • "Breaking into Tech" Webinar - Jan 15            │
│ • Pitch Competition for SMEs - Jan 20              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 5.5 USER PROFILE & SETTINGS

#### 5.5.1 Profile Components

**A. Personal Information**
- Full name
- Profile photo
- Location (city, country)
- Date of birth
- Contact information
- Languages spoken

**B. Professional Information**
- Current role/title
- Company/organization
- Industry
- Years of experience
- Specializations

**C. Educational Background**
- Schools attended
- Degrees earned
- Certifications
- Courses completed (within Thinkforge)
- Skills acquired

**D. Career Goals & Interests**
- Career aspirations
- Target roles
- Industries of interest
- Preferred work arrangement (remote, hybrid, office)
- Relocation preferences

**E. Business Information** (if in Business Mode)
- Business name
- Business type
- Industry/sector
- Years in operation
- Team size
- Revenue stage

**F. Skills & Expertise**
- Technical skills (with proficiency levels)
- Soft skills
- Languages
- Tools/software
- Endorsements from connections

**G. Portfolio & Work Samples**
- Project showcase
- GitHub/portfolio links
- Work samples upload
- Publications/writing

**H. Resume/CV Management**
- Upload existing resume
- Download generated resumes
- Multiple versions for different roles
- Last updated date

#### 5.5.2 Settings & Preferences

**A. Account Settings**
- Email
- Password
- Two-factor authentication
- Account deletion

**B. Notification Preferences**
- Email notifications
- Push notifications
- Notification frequency
- Types (messages, mentor replies, course updates, etc.)

**C. Privacy Settings**
- Profile visibility
- Who can message you
- Who can see your posts
- Data sharing preferences

**D. Mode Preferences**
- Default mode (Career/Business)
- Quick switch toggle

**E. AI Personalization**
- Allow AI to learn from interactions
- Data usage consent
- Feedback preferences

**F. Display & Accessibility**
- Language selection
- Theme (light/dark mode)
- Font size
- Accessibility features

---

## COMPLETE USER FLOWS

### 6.1 LANDING PAGE TO ONBOARDING FLOW

#### Step 1: Landing Page

**URL:** www.futureproofer.com

```
┌─────────────────────────────────────────────────────┐
│ [LOGO] Future Proofer Features How It Works        │
│                         Success Stories Sign In     │
│                         [Join Now CTA]              │
├─────────────────────────────────────────────────────┤
│                                                     │
│ HERO SECTION                                        │
│                                                     │
│ AI Foresight for Smarter Careers                   │
│ and Stronger Businesses                             │
│                                                     │
│ Empowering Africa's next generation with           │
│ intelligent career planning and business           │
│ strategy through localized AI insights.            │
│                                                     │
│ [💫 Future Proof Now] [📖 Learn More]             │
│                                                     │
│ 👥 2,000+ professionals already future-proofing    │
│                                                     │
│ [Image: Young professional using platform]         │
│                                                     │
├─────────────────────────────────────────────────────┤
│ SOCIAL PROOF SECTION                                │
│                                                     │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐   │
│ │ 2,000+  │ │ 20+     │ │ 2       │ │ 25+    │   │
│ │ Youth   │ │ SMEs    │ │ ECOWAS  │ │ Early  │   │
│ │Empowered│ │Supported│ │ Nations │ │ Users  │   │
│ └─────────┘ └─────────┘ └─────────┘ └────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Step 2: Sign Up Page

**URL:** www.futureproofer.com/signup

```
┌─────────────────────────────────────────────────────┐
│ [← Back] FUTURE PROOFER                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Join Future Proofer                                 │
│ Start Your Journey to Success                       │
│                                                     │
│ ┌────────────────────────────────────────────┐     │
│ │                                            │     │
│ │ Full Name                                  │     │
│ │ [________________________]                 │     │
│ │                                            │     │
│ │ Email Address                              │     │
│ │ [________________________]                 │     │
│ │                                            │     │
│ │ Password                                   │     │
│ │ [________________________]                 │     │
│ │ Must be at least 8 characters              │     │
│ │                                            │     │
│ │ 📍 Country                                 │     │
│ │ [Select country ▼]                         │     │
│ │                                            │     │
│ │ I'm interested in:                         │     │
│ │ ⬜ Career Development                      │     │
│ │ ⬜ Growing My Business                     │     │
│ │ ⬜ Learning New Skills                     │     │
│ │                                            │     │
│ │ ☑️ I agree to Terms of Service and        │     │
│ │    Privacy Policy                          │     │
│ │                                            │     │
│ │ [ Create Account ]                         │     │
│ │                                            │     │
│ │ ─── OR ───                                 │     │
│ │                                            │     │
│ │ [🔵 Continue with Google]                 │     │
│ │                                            │     │
│ │ Already have an account? Sign In           │     │
│ │                                            │     │
│ └────────────────────────────────────────────┘     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## TECHNICAL ARCHITECTURE

### 7.1 PROJECT STRUCTURE (TURBOREPO)

```
future-proofer/
├── apps/
│   ├── web/                    # Main Application (Dashboard, Learning Hub, AI)
│   └── marketing/              # Landing Page & SEO Marketing Site
├── packages/
│   ├── ui/                     # Design System (Buttons, Cards, Modals - Shadcn/UI)
│   ├── database/               # Prisma Schema & Supabase connection logic
│   ├── typescript-config/      # Shared TS configurations
│   └── eslint-config/          # Shared linting rules
```

### 7.2 TECH STACK

**Frontend:**
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**
- Supabase (Database & Auth)
- Prisma ORM
- Next.js API Routes

**AI Integration:**
- OpenAI API / Anthropic Claude API
- Vercel AI SDK

**Deployment:**
- Vercel (Frontend)
- Supabase (Backend)

---

## DATABASE SCHEMA DESIGN

### 8.1 Core Tables

#### 1. Users (Managed by Supabase Auth)
```sql
-- Auth is handled by Supabase
-- auth.users table automatically created
```

#### 2. Profiles
```sql
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  mode text check (mode in ('CAREER', 'BUSINESS')),
  location text,
  bio text,
  profile_photo_url text,
  date_of_birth date,
  languages text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);
```

#### 3. Career Goals (For Career Mode)
```sql
create table public.career_goals (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade,
  target_role text not null,
  current_skill_level integer check (current_skill_level between 1 and 5),
  target_salary_min numeric,
  target_salary_max numeric,
  preferred_work_type text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### 4. Skills Inventory
```sql
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade,
  skill_name text not null,
  proficiency integer check (proficiency between 1 and 5),
  verified boolean default false,
  created_at timestamptz default now()
);
```

#### 5. CV Documents
```sql
create table public.cv_documents (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade,
  file_url text not null,
  file_name text,
  parsed_text text,
  is_primary boolean default false,
  created_at timestamptz default now()
);
```

#### 6. Business Ventures (For Business Mode)
```sql
create table public.business_ventures (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade,
  business_name text not null,
  stage text check (stage in ('IDEA', 'MVP', 'EARLY', 'GROWTH', 'ESTABLISHED')),
  sector text,
  business_type text,
  team_size integer,
  founded_date date,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### 7. Financial Metrics
```sql
create table public.financial_metrics (
  id uuid default gen_random_uuid() primary key,
  venture_id uuid references public.business_ventures(id) on delete cascade,
  month date not null,
  revenue numeric,
  expenses numeric,
  customers integer,
  created_at timestamptz default now()
);
```

#### 8. Courses
```sql
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  track text not null,
  level text check (level in ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
  duration_weeks integer,
  modules_count integer,
  thumbnail_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

#### 9. Enrollments
```sql
create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  progress_percent integer default 0 check (progress_percent between 0 and 100),
  status text check (status in ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED')) default 'NOT_STARTED',
  enrolled_at timestamptz default now(),
  completed_at timestamptz,
  unique(user_id, course_id)
);
```

#### 10. Network Connections
```sql
create table public.connections (
  id uuid default gen_random_uuid() primary key,
  requester_id uuid references auth.users(id) on delete cascade,
  recipient_id uuid references auth.users(id) on delete cascade,
  connection_type text check (connection_type in ('MENTOR', 'PEER', 'FOLLOW')),
  status text check (status in ('PENDING', 'ACCEPTED', 'DECLINED')) default 'PENDING',
  message text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(requester_id, recipient_id)
);
```

### 8.2 Row Level Security (RLS)

```sql
-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.career_goals enable row level security;
alter table public.skills enable row level security;
alter table public.cv_documents enable row level security;
alter table public.business_ventures enable row level security;
alter table public.financial_metrics enable row level security;
alter table public.enrollments enable row level security;
alter table public.connections enable row level security;

-- Profiles policies
create policy "Users can view own profile" 
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile" 
  on profiles for update using (auth.uid() = id);

-- Career goals policies
create policy "Users can view own career goals" 
  on career_goals for select using (
    profile_id in (select id from profiles where id = auth.uid())
  );

create policy "Users can insert own career goals" 
  on career_goals for insert with check (
    profile_id in (select id from profiles where id = auth.uid())
  );

create policy "Users can update own career goals" 
  on career_goals for update using (
    profile_id in (select id from profiles where id = auth.uid())
  );

-- Similar policies for other tables...
```

---

## PHASE 1 IMPLEMENTATION PLAN

### 9.1 The Visual Blueprint (Minimalist Design)

#### Screen 1: The Entry (The "Gateway")

```
+-------------------------------------------------------+
|                                                       |
|   [ LOGO: FUTURE PROOFER ] (Centered, Large)          |
|                                                       |
|            Unlock Your Potential                      |
|                                                       |
|                                                       |
|       [ BIG GREEN BUTTON: "START HERE" -> ]           |
|                                                       |
|                                                       |
|   (Very subtle text at bottom)                        |
|   Already a member? Log In                            |
+-------------------------------------------------------+
```

#### Screen 2: Sign In (Frictionless)

```
+-------------------------------------------------------+
|  < Back                                               |
|                                                       |
|       Sign in to continue                             |
|                                                       |
|    +---------------------------------------------+    |
|    | [ G ]  Continue with Google                 |    |
|    +---------------------------------------------+    |
|                                                       |
|             --- OR ---                                |
|                                                       |
|    Enter Email: [___________________]                 |
|                                                       |
|    [ Send Me a Magic Link ]                           |
|    (User clicks link in email -> Automatically in)    |
+-------------------------------------------------------+
```

#### Screen 3: The Fork in the Road (Onboarding)

```
+-------------------------------------------------------+
|  Who are you? (Tap one)                               |
|                                                       |
|  +-----------------------------------------------+    |
|  |  [ LARGE ICON: GRADUATION CAP / STUDENT ]     |    |
|  |                                               |    |
|  |  Find a Job / Learn Skills                    |    |
|  |  (Blue Background)                            |    |
|  +-----------------------------------------------+    |
|                                                       |
|          ------------- OR --------------              |
|                                                       |
|  +-----------------------------------------------+    |
|  |  [ LARGE ICON: BRIEFCASE / SHOP ]             |    |
|  |                                               |    |
|  |  Grow My Business                             |    |
|  |  (Green Background)                           |    |
|  +-----------------------------------------------+    |
+-------------------------------------------------------+
```

### 9.2 Initial Setup Steps

#### Step 1: Prepare Supabase Database
```sql
-- Run in Supabase SQL Editor

-- 1. Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  mode text check (mode in ('CAREER', 'BUSINESS')),
  created_at timestamptz default now(),
  primary key (id)
);

-- 2. Enable RLS
alter table public.profiles enable row level security;

-- 3. Policies
create policy "Users can view own profile" 
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile" 
  on profiles for update using (auth.uid() = id);

-- 4. Auto-create profile trigger
create function public.handle_new_user() 
returns trigger as $
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

#### Step 2: Install Dependencies

```bash
cd apps/web
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js lucide-react
```

#### Step 3: Environment Variables

Create `.env.local` in `apps/web/`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## COMPONENT ARCHITECTURE

### 10.1 Atoms (Basic Building Blocks)

**Button.tsx**
```tsx
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

export function Button({ variant = "primary", children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
    ghost: "text-blue-600 hover:bg-blue-50"
  };

  return (
    <button
      className={`px-6 py-3 rounded-xl font-medium transition-colors ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Badge.tsx**
```tsx
interface BadgeProps {
  children: ReactNode;
  variant?: "skill" | "status";
}

export function Badge({ children, variant = "skill" }: BadgeProps) {
  const variants = {
    skill: "bg-blue-100 text-blue-800",
    status: "bg-green-100 text-green-800"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
```

**ProgressBar.tsx**
```tsx
interface ProgressBarProps {
  progress: number;
  color?: "blue" | "green";
}

export function ProgressBar({ progress, color = "blue" }: ProgressBarProps) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600"
  };

  return (
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${colors[color]} transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

### 10.2 Molecules (Functional Groups)

**InsightCard.tsx**
```tsx
import { TrendingUp, X } from "lucide-react";

interface InsightCardProps {
  title: string;
  insights: string[];
  onDismiss?: () => void;
}

export function InsightCard({ title, insights, onDismiss }: InsightCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={24} />
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {insights.map((insight, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
            <span className="text-gray-700 leading-relaxed">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**CourseCard.tsx**
```tsx
import { BookOpen, Clock } from "lucide-react";

interface CourseCardProps {
  title: string;
  duration: string;
  level: string;
  thumbnail?: string;
  onStart: () => void;
}

export function CourseCard({ title, duration, level, thumbnail, onStart }: CourseCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600">
        {thumbnail && <img src={thumbnail} alt={title} className="w-full h-full object-cover" />}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg mb-2">{title}</h4>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={16} /> {duration}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{level}</span>
        </div>
        <button 
          onClick={onStart}
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
```

---

## DEVELOPMENT ROADMAP

### 11.1 Phase 1: Foundation (Week 1-2)

**Goal:** User can sign up and see a blank dashboard

**Tasks:**
1. Configure Tailwind CSS in `apps/web`
2. Set up Supabase Authentication
3. Create database schema and push to Supabase
4. Build Onboarding Wizard to save user's Mode
5. Implement basic routing structure

**Deliverables:**
- Working authentication flow
- Database tables created
- Onboarding saves user mode
- Basic dashboard shell

### 11.2 Phase 2: UI Skeleton (Week 3-4)

**Goal:** Visual structure matches design specifications

**Tasks:**
1. Build Sidebar Layout component
2. Create Dashboard Views (Career & Business)
3. Implement Profile Page
4. Build basic Thinkforge course catalog
5. Create Network feed layout

**Deliverables:**
- Complete dashboard layout
- Mode switching functionality
- Profile management
- Course listing page
- Network feed UI

### 11.3 Phase 3: Intelligence (Week 5-6)

**Goal:** Connect AI capabilities

**Tasks:**
1. Set up API route `/api/chat`
2. Integrate OpenAI SDK or Anthropic Claude SDK
3. Create AI system prompts for Career & Business modes
4. Implement chat interface
5. Add AI-powered insights to dashboard

**Deliverables:**
- Working AI chat for both modes
- Personalized insights on dashboard
- CV generation capability
- Business advice system

### 11.4 Phase 4: Content & Community (Week 7-8)

**Goal:** Add learning content and networking

**Tasks:**
1. Upload initial course content to database
2. Build course enrollment system
3. Implement progress tracking
4. Create mentorship request system
5. Add messaging functionality

**Deliverables:**
- At least 2 complete courses
- Course enrollment working
- Progress tracking
- Basic messaging between users
- Mentor connection system

### 11.5 Phase 5: Polish & Launch (Week 9-10)

**Goal:** Production-ready application

**Tasks:**
1. Performance optimization
2. Mobile responsiveness testing
3. Low-bandwidth optimizations
4. Security audit
5. Beta testing with real users
6. Bug fixes and refinements

**Deliverables:**
- Optimized, production-ready app
- Mobile-friendly on all devices
- Fast loading on slow connections
- Security measures in place
- Beta feedback incorporated

---

## TECHNICAL ENHANCEMENTS FOR AFRICA-FIRST DESIGN

### 12.1 Low Bandwidth Optimization

**1. Image Optimization**
```tsx
import Image from 'next/image';

// Use Next.js Image component for automatic optimization
<Image
  src="/course-thumbnail.jpg"
  alt="Course"
  width={400}
  height={300}
  quality={75} // Reduce quality for smaller file sizes
  loading="lazy" // Lazy load images
/>
```

**2. Lazy Loading Components**
```tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const ChatInterface = dynamic(() => import('./ChatInterface'), {
  loading: () => <p>Loading chat...</p>,
  ssr: false
});
```

**3. Data Caching with React Query**
```tsx
import { useQuery } from '@tanstack/react-query';

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
}
```

### 12.2 Mobile-First CSS

```css
/* Base styles for mobile (default) */
.container {
  padding: 1rem;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 18px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Ensure touch targets are at least 44x44px */
button, a {
  min-height: 44px;
  min-width: 44px;
}
```

### 12.3 Offline Capability

```tsx
// Service Worker for offline support
// public/sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### 12.4 Progressive Web App (PWA)

```json
// public/manifest.json
{
  "name": "Future Proofer",
  "short_name": "FutureProofer",
  "description": "AI-powered career and business platform for Africa",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#003D82",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## IMMEDIATE NEXT STEPS

### Installation Commands

```bash
# Navigate to project directory
cd future-proofer

# Install Shadcn UI
npx shadcn-ui@latest init

# Add core components
npx shadcn-ui@latest add button card progress avatar badge sheet input dialog

# Install additional dependencies
cd apps/web
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
npm install lucide-react framer-motion
npm install @tanstack/react-query
npm install recharts # For data visualization
```

### Environment Setup

Create `apps/web/.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (or Anthropic)
OPENAI_API_KEY=your_openai_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
# From project root
npm run dev

# Or specifically for web app
cd apps/web
npm run dev
```

---

## CONCLUSION

This comprehensive technical documentation provides everything needed to build Future Proofer from the ground up. The platform combines:

- **Simplified UX** for accessibility across Africa
- **AI-powered intelligence** for personalized guidance
- **Dual-mode architecture** serving both careers and businesses
- **Mobile-first design** optimized for low-bandwidth environments
- **Scalable architecture** using modern web technologies

The implementation follows a phased approach that allows for iterative development and continuous improvement based on user feedback. Start with Phase 1 to establish the foundation, then progressively add features and intelligence in subsequent phases.

**Key Success Factors:**
1. Maintain radical simplicity in design
2. Optimize for mobile and low-bandwidth
3. Ensure AI provides genuine value
4. Build for the African context
5. Focus on measurable impact

---

**Document Version:** 3.0  
**Last Updated:** January 26, 2026  
**Next Review:** As features are implemented

---

## APPENDIX: USEFUL RESOURCES

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Prisma ORM](https://www.prisma.io/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

---

*Built with ❤️ for Africa's Future*