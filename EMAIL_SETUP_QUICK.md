# Quick Email Setup Guide

## Why you didn't get an email:

1. **Email confirmations might be disabled** in your Supabase project
2. **Email templates might not be configured**
3. **Site URL might not be set correctly**

## Fix Steps:

### 1. Enable Email Confirmations
1. Go to your Supabase Dashboard → Authentication → Settings
2. **Enable "Enable email confirmations"**
3. **Set "Secure email change"** to enabled

### 2. Configure Site URL
1. In Authentication → Settings
2. **Set Site URL** to: `http://localhost:3001`
3. **Add Redirect URLs**:
   - `http://localhost:3001/onboarding`
   - `http://localhost:3001/confirm-email`
   - `http://localhost:3001/signin`

### 3. Check Email Templates
1. Go to Authentication → Email Templates
2. **Select "Confirm signup" template**
3. **Make sure it's enabled and configured**

### 4. Test Email Delivery
1. **Create a new test account** at `http://localhost:3001/signup`
2. **Check your email inbox** (and spam folder)
3. **Check Supabase logs** for email delivery status

## Troubleshooting:

### Still no email?
1. **Check spam/junk folder**
2. **Verify email address** is correct
3. **Check Supabase logs** → Logs → Auth logs
4. **Try a different email address**

### Email sent but link doesn't work?
1. **Check redirect URLs** are configured correctly
2. **Verify Site URL** is set to `http://localhost:3001`
3. **Check browser console** for errors

## Alternative: Disable Email Confirmation (for testing)

If you want to test without email confirmation:

1. Go to Authentication → Settings
2. **Disable "Enable email confirmations"**
3. Users will be automatically logged in after signup
4. They'll go directly to onboarding

## Production Setup:

For production, you'll want to:
1. **Configure a custom SMTP provider** (SendGrid, Mailgun, etc.)
2. **Update Site URL** to your production domain
3. **Update Redirect URLs** to your production URLs 