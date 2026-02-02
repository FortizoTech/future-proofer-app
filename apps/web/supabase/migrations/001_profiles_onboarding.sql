-- ============================================
-- FUTURE PROOFER - ONBOARDING SCHEMA
-- Migration: 001_profiles_onboarding.sql
-- Description: Extended profiles table for onboarding flow
-- ============================================

-- Drop existing profiles table if exists (for development only)
-- In production, use ALTER TABLE statements instead
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create extended profiles table
CREATE TABLE public.profiles (
  -- Primary Key (linked to Supabase Auth)
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  
  -- Basic Info (Step 4: Finalize Identity)
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  country TEXT,
  
  -- Step 1: Mode Selection - 'CAREER' or 'BUSINESS'
  mode TEXT CHECK (mode IN ('CAREER', 'BUSINESS')),
  
  -- ============================================
  -- CAREER MODE FIELDS (Step 2 & 3 for Career)
  -- ============================================
  
  -- Step 2: Career Goal - What the user wants to achieve
  career_goal TEXT,
  
  -- Step 3: Skills Inventory (stored as JSON array)
  skills JSONB DEFAULT '[]'::jsonb,
  
  -- Step 3: CV Upload
  cv_url TEXT,                    -- URL to uploaded CV in Supabase Storage
  cv_text TEXT,                   -- Extracted text from CV (for AI processing)
  
  -- ============================================
  -- BUSINESS MODE FIELDS (Step 2 & 3 for Business)
  -- ============================================
  
  -- Step 2: Business Stage
  business_stage TEXT CHECK (business_stage IN ('IDEA', 'MVP', 'EARLY', 'GROWTH', 'ESTABLISHED')),
  
  -- Step 3: Business Details
  business_sector TEXT,           -- Industry/sector of the business
  team_size TEXT,                 -- Team size range (e.g., '1', '2-5', '6-10', '11-50', '50+')
  revenue_stage TEXT CHECK (revenue_stage IN ('PRE_REVENUE', 'REVENUE', 'PROFITABLE')),
  
  -- ============================================
  -- METADATA
  -- ============================================
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- ============================================
-- TRIGGER: Auto-update updated_at
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- TRIGGER: Auto-create profile on user signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger (drop first if exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STORAGE BUCKET FOR CV UPLOADS
-- ============================================
-- Run this in Supabase Dashboard > Storage > Create bucket
-- Bucket name: cv_uploads
-- Public: false
-- File size limit: 5MB
-- Allowed MIME types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document

-- Storage policy (run in SQL Editor):
-- CREATE POLICY "Users can upload their own CVs"
--   ON storage.objects
--   FOR INSERT
--   WITH CHECK (bucket_id = 'cv_uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view their own CVs"
--   ON storage.objects
--   FOR SELECT
--   USING (bucket_id = 'cv_uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
