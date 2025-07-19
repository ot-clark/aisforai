# Authentication Setup Guide

This guide will help you configure the authentication system in your existing Supabase project.

## Step 1: Get Your Supabase Credentials

1. **Go to your Supabase dashboard** at [supabase.com/dashboard](https://supabase.com/dashboard)
2. **Select your existing project**
3. **Navigate to Settings → API**
4. **Copy these values:**
   - **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_URL`)
   - **anon public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role** key (for `SUPABASE_SERVICE_ROLE_KEY`)

## Step 2: Create Environment File

Create a `.env.local` file in your project root with this content:

```env
# Supabase Configuration
# Replace these with your actual Supabase project credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Database Configuration (if using Prisma)
DATABASE_URL="postgresql://username:password@localhost:5432/affiliate_platform"
NEXTAUTH_SECRET="your-secret-key"
```

**Replace the placeholder values with your actual Supabase credentials.**

## Step 3: Set Up Database Table

### Option A: Using Supabase SQL Editor

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `database-setup.sql`**
4. **Click "Run" to execute the script**

### Option B: Using Table Editor

1. **Go to your Supabase project dashboard**
2. **Navigate to Table Editor**
3. **Click "New Table"**
4. **Create the table with these settings:**

```sql
-- Table name: onboarding_applications
-- Columns:
- id (uuid, primary key, default: gen_random_uuid())
- user_id (uuid, not null, references auth.users(id))
- form_data (jsonb, not null)
- created_at (timestamp with time zone, default: now())
- updated_at (timestamp with time zone, default: now())
```

## Step 4: Configure Authentication Settings

1. **Go to Authentication → Settings**
2. **Enable Email Auth** (if not already enabled)
3. **Configure Site URL** to `http://localhost:3001` (or your development URL)
4. **Add redirect URLs** for your domain

## Step 5: Test the Setup

1. **Restart your development server** (if needed):
   ```bash
   npm run dev
   ```

2. **Visit your application** at `http://localhost:3001`
3. **You should be redirected to the signup page**
4. **Try creating an account** with a valid email and password
5. **After signup, you should be redirected to the onboarding form**

## Troubleshooting

### Common Issues:

1. **"Supabase not configured" error**
   - Make sure your `.env.local` file has the correct Supabase credentials
   - Restart your development server after updating environment variables

2. **"Invalid token" error**
   - Check that your Supabase project URL and keys are correct
   - Ensure the service role key has the necessary permissions

3. **Database connection errors**
   - Verify that the `onboarding_applications` table was created successfully
   - Check that Row Level Security (RLS) policies are in place

4. **Authentication not working**
   - Ensure Email Auth is enabled in your Supabase project
   - Check that your site URL is configured correctly

### Verification Steps:

1. **Check Supabase Dashboard → Authentication → Users** to see if users are being created
2. **Check Supabase Dashboard → Table Editor → onboarding_applications** to see if form data is being stored
3. **Check browser console** for any JavaScript errors
4. **Check server logs** for any API errors

## Next Steps

Once the setup is complete:

1. **Test the full user flow**: Signup → Onboarding → Form submission
2. **Verify data storage**: Check that user IDs are properly linked to form responses
3. **Test authentication persistence**: Refresh the page and ensure users stay logged in
4. **Deploy to production**: Update environment variables for your production domain

## Support

If you encounter any issues:

1. **Check the browser console** for client-side errors
2. **Check the server logs** for API errors
3. **Verify your Supabase configuration** in the dashboard
4. **Ensure all environment variables are set correctly** 