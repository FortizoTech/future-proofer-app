-- ============================================
-- RELAX BUSINESS STAGE CHECK
-- Migration: 002_relax_business_stage_check.sql
-- Description: Drop the strict check constraint on business_stage to allow descriptive strings
-- ============================================

-- Drop the constraint that restricts business_stage to specific short codes
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_business_stage_check;
