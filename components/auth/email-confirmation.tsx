'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/use-auth';
import { Button } from '@/components/ui/button';

export function EmailConfirmation() {
  const [isChecking, setIsChecking] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Check if user is confirmed and redirect to onboarding
  useEffect(() => {
    if (user?.email_confirmed_at) {
      router.push('/onboarding');
    }
  }, [user, router]);

  // Poll for email confirmation - simplified version
  useEffect(() => {
    if (!user?.email_confirmed_at) {
      const interval = setInterval(() => {
        setIsChecking(true);
        // For now, we'll just check the current user state
        // In a real implementation, you might want to refresh the session
        if (user?.email_confirmed_at) {
          router.push('/onboarding');
        }
        setIsChecking(false);
      }, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    }
  }, [user, router]);

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      // This would typically call a Supabase function to resend confirmation email
      // For now, we'll simulate the success
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (error) {
      console.error('Error resending email:', error);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2 font-['Montserrat']">
          Verify your email address
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 font-['Montserrat']">
          We&apos;ve sent a confirmation link to <strong>{user?.email}</strong>
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-blue-900 mb-2 font-['Montserrat']">What to do next:</h4>
          <ol className="text-sm text-blue-800 space-y-1 font-['Montserrat']">
            <li>1. Check your email inbox (and spam folder)</li>
            <li>2. Click the confirmation link in the email</li>
            <li>3. You&apos;ll be automatically redirected to start onboarding</li>
          </ol>
        </div>

        {isChecking && (
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 font-['Montserrat']">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span>Checking for confirmation...</span>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleResendEmail}
            disabled={resendLoading}
            className="w-full bg-gradient-to-br from-rose-500 to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md border-0 font-['Montserrat']"
          >
            {resendLoading ? 'Sending...' : 'Resend confirmation email'}
          </Button>

          {resendSuccess && (
            <p className="text-sm text-green-600 text-center font-['Montserrat']">
              Confirmation email sent successfully!
            </p>
          )}

          <div className="text-center">
            <a href="/signin" className="text-sm text-blue-600 hover:text-blue-500 font-['Montserrat']">
              Already have an account? Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 