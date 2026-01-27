-- ============================================
-- FUTURE PROOFER - CV STORAGE BUCKET SETUP
-- Migration: 002_cv_storage_bucket.sql
-- Description: Setup for CV upload storage bucket
-- ============================================

-- ============================================
-- IMPORTANT: MANUAL STEPS REQUIRED
-- ============================================
-- This SQL file contains policies for Supabase Storage.
-- You need to FIRST create the bucket manually in Supabase Dashboard:
-- 
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New bucket"
-- 3. Bucket name: cv_uploads
-- 4. Public: OFF (private bucket)
-- 5. File size limit: 5MB (5242880 bytes)
-- 6. Allowed MIME types:
--    - application/pdf
--    - application/vnd.openxmlformats-officedocument.wordprocessingml.document
--
-- After creating the bucket, run the policies below in SQL Editor.
-- ============================================

-- ============================================
-- STORAGE POLICIES FOR cv_uploads BUCKET
-- ============================================

-- Policy: Users can upload their own CVs
-- CVs are stored in folders named after user's ID
CREATE POLICY "Users can upload their own CVs"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'cv_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can view their own CVs
CREATE POLICY "Users can view their own CVs"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'cv_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can update their own CVs
CREATE POLICY "Users can update their own CVs"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'cv_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own CVs
CREATE POLICY "Users can delete their own CVs"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'cv_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- ALTERNATIVE: Service Role Access
-- ============================================
-- If you need server-side access to all CVs for AI processing,
-- use the service role key in your API routes.
-- The service role bypasses RLS policies.
