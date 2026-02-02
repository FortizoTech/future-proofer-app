# Authentication Fix Guide

## Problem
Getting "Auth session missing!" error after Google OAuth login.

## Root Cause Analysis
The issue is likely one of the following:

1. **Supabase Redirect URL Configuration**: The redirect URL is not whitelisted
2. **Cookie/Session Handling**: Issues with cookie persistence
3. **OAuth Flow**: Problems in the callback handling

## Solution Steps

### Step 1: Configure Supabase Dashboard
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to Authentication > URL Configuration
3. Add these URLs to "Redirect URLs":
   - `http://localhost:3000/auth/callback`
   - `http://127.0.0.1:3000/auth/callback`
   - `https://localhost:3000/auth/callback` (if using HTTPS)

### Step 2: Verify Google OAuth Configuration
1. In Supabase Dashboard, go to Authentication > Providers
2. Ensure Google is enabled and configured with:
   - Client ID
   - Client Secret
3. In Google Cloud Console, verify redirect URIs include:
   - `https://dmbgekmtygenbzcentct.supabase.co/auth/v1/callback`

### Step 3: Test the Fix
1. Clear browser cookies and localStorage
2. Try Google login again
3. Check browser developer tools for any errors
4. Monitor server logs for callback attempts

## Debug Commands

```bash
# Check if server is running
curl http://localhost:3000/debug-auth

# Test Supabase connection
node test-oauth-url.js

# Check server logs
# (Monitor the development server terminal)
```

## Common Issues and Solutions

### Issue: "Invalid redirect URL"
- **Solution**: Add the exact redirect URL to Supabase Dashboard

### Issue: "Cookies not persisting"
- **Solution**: Check browser settings, clear cache, ensure localhost is allowed

### Issue: "OAuth provider error"
- **Solution**: Verify Google Cloud Console configuration

### Issue: "Code exchange fails"
- **Solution**: Check network connectivity and Supabase project status