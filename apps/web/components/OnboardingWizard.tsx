"use client";

/**
 * ============================================
 * ONBOARDING WIZARD - COMPONENT EXPORT
 * ============================================
 * 
 * This file re-exports the OnboardingWizard from the app/onboarding/page.tsx
 * for backward compatibility if imported from components folder.
 * 
 * The main implementation is now in: apps/web/app/onboarding/page.tsx
 * 
 * @deprecated Use the page component directly at /onboarding route
 */

// Note: The actual OnboardingWizard is now a page component
// This file is kept for backward compatibility if the component
// is imported elsewhere.

import React from "react";

export default function OnboardingWizardLegacy() {
    // Redirect to the onboarding page
    if (typeof window !== 'undefined') {
        window.location.href = '/onboarding';
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Redirecting to onboarding...</p>
        </div>
    );
}
