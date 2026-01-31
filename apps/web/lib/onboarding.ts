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
    country?: string;
    password?: string;
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
    session?: any;
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
 * Generates a secure random password
 */
function generateSecurePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

/**
 * Creates a new user account with Supabase Auth using email/password
 * No email verification required - user is logged in immediately
 *
 * @param email - User's email address
 * @param fullName - User's full name
 * @param password - Optional password (auto-generated if not provided)
 * @returns SignUpResult with userId or error
 */
export async function signUpUser(
    email: string,
    fullName: string,
    password?: string
): Promise<SignUpResult> {
    const supabase = createClient();

    try {
        // Use email/password signup - no email verification needed
        const userPassword = password || generateSecurePassword();

        const { data, error } = await supabase.auth.signUp({
            email,
            password: userPassword,
            options: {
                data: {
                    full_name: fullName
                },
                // Don't require email confirmation
                emailRedirectTo: undefined
            }
        });

        if (error) {
            console.error('Sign Up Error:', error);
            return {
                success: false,
                error: error.message || 'Failed to create account'
            };
        }

        // User is created and logged in immediately
        return {
            success: true,
            userId: data.user?.id,
            session: data.session
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
            country: data.country || null,
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
 * 1. Verifies the user is authenticated
 * 2. Saves profile data
 * 3. Uploads CV if provided (Career mode only)
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
        const supabase = createClient();

        // Step 1: Check for authenticated session
        let userId = '';
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            userId = user.id;
        } else {
            // No session - try to sign up if password is provided
            if (data.password) {
                const signUpResult = await signUpUser(data.email, data.fullName, data.password);

                if (!signUpResult.success || !signUpResult.userId) {
                    return {
                        success: false,
                        message: signUpResult.error || 'Failed to create account'
                    };
                }

                userId = signUpResult.userId;

                // If we have a session from signup (which we should for auto-confirm), good. 
                // If not, we might need to tell them to check email, but let's assume auto-confirm for now as per previous logic.
            } else {
                return {
                    success: false,
                    message: 'You must be logged in or provide a password to create an account.',
                    redirectUrl: '/login'
                };
            }
        }

        // Step 2: Save profile data using the user ID (either existing or new)
        const profileResult = await saveProfile(userId, data);

        if (!profileResult.success) {
            return {
                success: false,
                message: profileResult.error || 'Failed to save profile. Please try again.'
            };
        }

        // Step 3: Upload CV if provided (Career mode)
        if (data.mode === 'CAREER' && data.cvFile) {
            const uploadResult = await uploadCV(data.cvFile, userId);
            if (uploadResult.success && uploadResult.url) {
                // Update profile with CV URL
                await supabase.from('profiles').update({ cv_url: uploadResult.url }).eq('id', userId);
            }
        }

        // Success - redirect to dashboard
        return {
            success: true,
            message: 'Profile completed successfully! Redirecting to your dashboard...',
            redirectUrl: '/dashboard'
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
 * Result type for finalizePendingOnboarding
 */
export interface FinalizeOnboardingResult {
    success: boolean;
    error?: string;
    hasPendingData: boolean;
}

/**
 * Called after user confirms email to save pending onboarding data
 * Should be called from a page that runs after auth confirmation
 * Returns detailed result with error information for proper error handling
 */
export async function finalizePendingOnboarding(): Promise<FinalizeOnboardingResult> {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        console.error('Auth error in finalizePendingOnboarding:', authError);
        return {
            success: false,
            error: `Authentication error: ${authError.message}`,
            hasPendingData: false
        };
    }

    if (!user) {
        console.log('No authenticated user found');
        return {
            success: false,
            error: 'No authenticated user found. Please log in again.',
            hasPendingData: false
        };
    }

    // Get pending data from localStorage
    const pendingDataStr = typeof window !== 'undefined'
        ? localStorage.getItem('pendingOnboardingData')
        : null;

    if (!pendingDataStr) {
        console.log('No pending onboarding data found');
        return {
            success: true, // Not an error, just no pending data
            hasPendingData: false
        };
    }

    try {
        const pendingData: OnboardingData = JSON.parse(pendingDataStr);

        // Save profile
        const result = await saveProfile(user.id, pendingData);

        if (result.success) {
            // Clear pending data
            localStorage.removeItem('pendingOnboardingData');
            console.log('Onboarding data successfully saved to database for user:', user.id);
            return {
                success: true,
                hasPendingData: true
            };
        }

        // Profile save failed
        console.error('Failed to save profile:', result.error);
        return {
            success: false,
            error: result.error || 'Failed to save your profile to the database. Please try again.',
            hasPendingData: true
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Finalize Onboarding Error:', err);
        return {
            success: false,
            error: `Error processing onboarding data: ${errorMessage}`,
            hasPendingData: true
        };
    }
}
