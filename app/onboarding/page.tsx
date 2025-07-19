import { OnboardingForm } from '@/components/onboarding-form/onboarding-form';
import { ProtectedRoute } from '@/components/auth/protected-route';

// Force dynamic rendering to avoid prerendering issues with authentication
export const dynamic = 'force-dynamic';

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingForm />
    </ProtectedRoute>
  );
} 