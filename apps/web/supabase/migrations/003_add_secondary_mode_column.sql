-- ============================================
-- ADD SECONDARY MODE COLUMN
-- Migration: 003_add_secondary_mode_column.sql
-- Description: Add missing column secondary_mode_enabled to profiles table
-- ============================================

-- Add the missing column for dual-mode tracking
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS secondary_mode_enabled BOOLEAN DEFAULT FALSE;
