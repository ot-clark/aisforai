import { z } from 'zod';
import {
  companyInfoSchema,
  budgetPreferencesSchema,
  targetAudienceSchema,
  creativePreferencesSchema,
  fraudRiskSchema,
  notificationPreferencesSchema,
  type OnboardingStepConfig,
} from '@/types/onboarding';

export const onboardingSteps: OnboardingStepConfig[] = [
  {
    id: 'company-info',
    title: 'Company Information',
    description: 'Tell us about your company and business',
    isRequired: true,
    validationSchema: companyInfoSchema,
  },
  {
    id: 'budget-preferences',
    title: 'Budget & Contract',
    description: 'Set your budget and contract preferences',
    isRequired: true,
    validationSchema: budgetPreferencesSchema,
  },
  {
    id: 'target-audience',
    title: 'Target Audience',
    description: 'Define your target audience and product details',
    isRequired: true,
    validationSchema: targetAudienceSchema,
  },
  {
    id: 'creative-preferences',
    title: 'Creative & Copy',
    description: 'Upload existing creatives or let AI generate them',
    isRequired: false,
    validationSchema: creativePreferencesSchema,
  },
  {
    id: 'fraud-risk',
    title: 'Fraud & Security',
    description: 'Configure fraud detection and affiliate approval',
    isRequired: true,
    validationSchema: fraudRiskSchema,
  },
  {
    id: 'notification-preferences',
    title: 'Notifications & Reporting',
    description: 'Set up your reporting and notification preferences',
    isRequired: false,
    validationSchema: notificationPreferencesSchema,
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your information and submit your application',
    isRequired: true,
    validationSchema: z.object({}), // No validation needed for review step
  },
];

export function getStepIndex(stepId: string): number {
  return onboardingSteps.findIndex(step => step.id === stepId);
}

export function getStepById(stepId: string): OnboardingStepConfig | undefined {
  return onboardingSteps.find(step => step.id === stepId);
}

export function getNextStep(currentStepId: string): OnboardingStepConfig | null {
  const currentIndex = getStepIndex(currentStepId);
  if (currentIndex === -1 || currentIndex === onboardingSteps.length - 1) {
    return null;
  }
  return onboardingSteps[currentIndex + 1];
}

export function getPreviousStep(currentStepId: string): OnboardingStepConfig | null {
  const currentIndex = getStepIndex(currentStepId);
  if (currentIndex <= 0) {
    return null;
  }
  return onboardingSteps[currentIndex - 1];
}

export function isStepComplete(
  stepId: string,
  formData: Record<string, any>
): boolean {
  const step = getStepById(stepId);
  if (!step || !step.validationSchema) {
    return true;
  }

  try {
    const stepData = formData[stepId];
    if (!stepData) return false;
    
    step.validationSchema.parse(stepData);
    return true;
  } catch {
    return false;
  }
}

export function getCompletionPercentage(formData: Record<string, any>): number {
  const completedSteps = onboardingSteps.filter(step => 
    step.id !== 'review' && isStepComplete(step.id, formData)
  ).length;
  
  const totalSteps = onboardingSteps.length - 1; // Exclude review step
  return Math.round((completedSteps / totalSteps) * 100);
} 