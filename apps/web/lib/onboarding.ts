/**
 * ============================================
 * ONBOARDING HELPER FUNCTIONS
 * ============================================
 * 
 * This file contains all Supabase-related operations for the onboarding flow:
 * - CV Upload to Supabase Storage
 * - Profile Creation/Update
 * - Auth Sign-up
 * 
 * @file apps/web/lib/onboarding.ts
 */

import { createClient } from '@/utils/supabase/client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type UserMode = 'CAREER' | 'BUSINESS';
export type CareerGoal = 'FIND_JOB' | 'UPSKILL' | 'CAREER_SWITCH';
export type BusinessStage = 'IDEA' | 'MVP' | 'EARLY' | 'GROWTH' | 'ESTABLISHED';
export type RevenueStage = 'PRE_REVENUE' | 'REVENUE' | 'PROFITABLE';

export interface OnboardingData {
    // Step 1: Mode Selection
    mode: UserMode | '';

    // Step 2: Career Mode - Goal Selection
    careerGoal?: CareerGoal;

    // Step 2: Business Mode - Business Stage
    businessStage?: BusinessStage;

    // Step 3: Career Mode - Skills & CV
    skills: string[];
    cvFile?: File | null;
    cvUrl?: string;
    cvText?: string;

    // Step 3: Business Mode - Business Details
    businessSector?: string;
    teamSize?: string;
    revenueStage?: RevenueStage;

    // Step 4: Identity
    fullName: string;
    email: string;
}

export interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

export interface SignUpResult {
    success: boolean;
    userId?: string;
    error?: string;
}

export interface ProfileSaveResult {
    success: boolean;
    error?: string;
}

// ============================================
// CV UPLOAD FUNCTION
// ============================================

/**
 * Uploads a CV file to Supabase Storage
 * 
 * @param file - The CV file (PDF or DOCX)
 * @param userId - The user's ID (used as folder name)
 * @returns UploadResult with the public URL or error
 */
export async function uploadCV(file: File, userId: string): Promise<UploadResult> {
    const supabase = createClient();

    // Validate file type
    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
        return {
            success: false,
            error: 'Invalid file type. Please upload a PDF or DOCX file.'
        };
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return {
            success: false,
            error: 'File too large. Maximum size is 5MB.'
        };
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'pdf';
    const fileName = `${userId}/cv_${Date.now()}.${fileExtension}`;

    try {
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('cv_uploads')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) {
            console.error('CV Upload Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to upload CV'
            };
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('cv_uploads')
            .getPublicUrl(fileName);

        return {
            success: true,
            url: urlData.publicUrl
        };
    } catch (err) {
        console.error('CV Upload Exception:', err);
        return {
            success: false,
            error: 'An unexpected error occurred during upload'
        };
    }
}

// ============================================
// CV TEXT EXTRACTION (STUB)
// ============================================

/**
 * Extracts text from a CV file
 * 
 * TODO: Implement actual PDF/DOCX parsing using:
 * - pdf-parse for PDF files
 * - mammoth for DOCX files
 * - Or use an AI service like OpenAI GPT-4 Vision for PDF parsing
 * 
 * @param file - The CV file
 * @returns Extracted text or null
 */
export async function extractCVText(file: File): Promise<string | null> {
    // TODO: Implement CV text extraction
    // This is a stub that returns null for now
    // In production, use pdf-parse or mammoth libraries

    console.log('CV Text Extraction: Stub called for file:', file.name);
    console.log('TODO: Implement actual CV parsing with pdf-parse or mammoth');

    // For now, return null - the cv_text field will be populated later
    // when AI processing is implemented
    return null;
}

// ============================================
// AUTH SIGN-UP FUNCTION
// ============================================

/**
 * Creates a new user account with Supabase Auth
 * 
 * @param email - User's email address
 * @param fullName - User's full name
 * @returns SignUpResult with userId or error
 */
export async function signUpUser(
    email: string,
    fullName: string
): Promise<SignUpResult> {
    const supabase = createClient();

    try {
        // Use magic link (passwordless) auth for simplicity
        // The user will receive an email to confirm
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                data: {
                    full_name: fullName
                },
                emailRedirectTo: `${window.location.origin}/dashboard`
            }
        });

        if (error) {
            console.error('Sign Up Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to create account'
            };
        }

        // For OTP, user ID won't be available until they confirm
        // Return success to indicate the magic link was sent
        return {
            success: true
        };
    } catch (err) {
        console.error('Sign Up Exception:', err);
        return {
            success: false,
            error: 'An unexpected error occurred during sign up'
        };
    }
}

// ============================================
// PROFILE SAVE FUNCTION
// ============================================

/**
 * Saves or updates the user's profile with onboarding data
 * 
 * This function handles both:
 * 1. Creating a new profile (upsert)
 * 2. Updating an existing profile
 * 
 * @param userId - The user's ID
 * @param data - The complete onboarding data
 * @returns ProfileSaveResult with success status or error
 */
export async function saveProfile(
    userId: string,
    data: OnboardingData
): Promise<ProfileSaveResult> {
    const supabase = createClient();

    try {
        // Build the profile object based on mode
        const profileData: Record<string, unknown> = {
            id: userId,
            email: data.email,
            full_name: data.fullName,
            mode: data.mode.toUpperCase(),
            onboarding_completed: true,
            updated_at: new Date().toISOString()
        };

        // Add mode-specific fields
        if (data.mode === 'CAREER') {
            // Career Mode fields
            profileData.career_goal = data.careerGoal;
            profileData.skills = data.skills;
            profileData.cv_url = data.cvUrl || null;
            profileData.cv_text = data.cvText || null;

            // Clear business fields
            profileData.business_stage = null;
            profileData.business_sector = null;
            profileData.team_size = null;
            profileData.revenue_stage = null;
        } else if (data.mode === 'BUSINESS') {
            // Business Mode fields
            profileData.business_stage = data.businessStage;
            profileData.business_sector = data.businessSector || null;
            profileData.team_size = data.teamSize || null;
            profileData.revenue_stage = data.revenueStage || null;

            // Clear career fields
            profileData.career_goal = null;
            profileData.skills = [];
            profileData.cv_url = null;
            profileData.cv_text = null;
        }

        // Upsert profile (insert or update)
        const { error } = await supabase
            .from('profiles')
            .upsert(profileData, {
                onConflict: 'id'
            });

        if (error) {
            console.error('Profile Save Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to save profile'
            };
        }

        return { success: true };
    } catch (err) {
        console.error('Profile Save Exception:', err);
        return {
            success: false,
            error: 'An unexpected error occurred while saving profile'
        };
    }
}

// ============================================
// COMPLETE ONBOARDING FLOW
// ============================================

/**
 * Orchestrates the complete onboarding submission:
 * 1. Sign up the user
 * 2. Upload CV if provided (Career mode only)
 * 3. Save all profile data
 * 
 * @param data - The complete onboarding data
 * @returns Object with success status, message, and redirect URL
 */
export async function completeOnboarding(data: OnboardingData): Promise<{
    success: boolean;
    message: string;
    redirectUrl?: string;
}> {
    try {
        // Step 1: Sign up the user with magic link
        const signUpResult = await signUpUser(data.email, data.fullName);

        if (!signUpResult.success) {
            return {
                success: false,
                message: signUpResult.error || 'Failed to create account'
            };
        }

        // For magic link auth, the user needs to click the email link
        // The profile will be created/updated when they confirm
        // Store onboarding data in localStorage for retrieval after confirmation

        if (typeof window !== 'undefined') {
            localStorage.setItem('pendingOnboardingData', JSON.stringify({
                ...data,
                cvFile: null // Don't store file object
            }));
        }

        return {
            success: true,
            message: 'Check your email for a magic link to complete sign up!',
            redirectUrl: '/login?message=check-email'
        };
    } catch (err) {
        console.error('Complete Onboarding Error:', err);
        return {
            success: false,
            message: 'An unexpected error occurred'
        };
    }
}

/**
 * Called after user confirms email to save pending onboarding data
 * Should be called from a page that runs after auth confirmation
 */
export async function finalizePendingOnboarding(): Promise<boolean> {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('No authenticated user found');
        return false;
    }

    // Get pending data from localStorage
    const pendingDataStr = typeof window !== 'undefined'
        ? localStorage.getItem('pendingOnboardingData')
        : null;

    if (!pendingDataStr) {
        console.log('No pending onboarding data found');
        return false;
    }

    try {
        const pendingData: OnboardingData = JSON.parse(pendingDataStr);

        // Save profile
        const result = await saveProfile(user.id, pendingData);

        if (result.success) {
            // Clear pending data
            localStorage.removeItem('pendingOnboardingData');
            return true;
        }

        return false;
    } catch (err) {
        console.error('Finalize Onboarding Error:', err);
        return false;
    }
}
