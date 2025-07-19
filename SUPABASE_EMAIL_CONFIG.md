# Supabase Email Confirmation Configuration

To enable email confirmation and automatic redirection to onboarding, you need to configure your Supabase project settings.

## Step 1: Configure Email Templates

1. **Go to your Supabase Dashboard** → Authentication → Email Templates
2. **Select "Confirm signup" template**
3. **Update the template** to include a redirect URL:

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email address</a></p>

<p>Or copy and paste this URL into your browser:</p>
<p>{{ .ConfirmationURL }}</p>
```

## Step 2: Configure Site URL and Redirect URLs

1. **Go to Authentication → Settings**
2. **Set Site URL** to: `http://localhost:3001` (for development)
3. **Add Redirect URLs**:
   - `http://localhost:3001/onboarding`
   - `http://localhost:3001/confirm-email`
   - `http://localhost:3001/signin`

## Step 3: Enable Email Confirmation

1. **Go to Authentication → Settings**
2. **Enable "Enable email confirmations"**
3. **Set "Secure email change"** to enabled (optional but recommended)

## Step 4: Configure Email Provider (Optional)

If you want to use a custom email provider instead of Supabase's default:

1. **Go to Authentication → Settings**
2. **Under "SMTP Settings"**:
   - **Host**: Your SMTP server
   - **Port**: 587 (or your provider's port)
   - **Username**: Your email username
   - **Password**: Your email password
   - **Sender Name**: Your app name
   - **Sender Email**: Your sender email

## Step 5: Test the Flow

1. **Create a test account** at `http://localhost:3001/signup`
2. **Check your email** for the confirmation link
3. **Click the confirmation link**
4. **You should be automatically redirected** to `/onboarding`

## Troubleshooting

### Email not received:
- Check spam folder
- Verify email address is correct
- Check Supabase logs for email delivery status

### Confirmation link not working:
- Ensure redirect URLs are configured correctly
- Check that the confirmation URL includes the proper redirect parameter

### Auto-redirect not working:
- Verify the user's `email_confirmed_at` field is being set
- Check browser console for any JavaScript errors
- Ensure the polling mechanism is working correctly

## Production Configuration

For production, update the URLs to your actual domain:

- **Site URL**: `https://yourdomain.com`
- **Redirect URLs**: 
  - `https://yourdomain.com/onboarding`
  - `https://yourdomain.com/confirm-email`
  - `https://yourdomain.com/signin` 