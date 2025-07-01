'use client';

import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { onboardingSteps, getStepById, getCompletionPercentage } from '@/utils/onboarding-steps';
import { OnboardingFormData } from '@/types/onboarding';
import { OnboardingProgress } from './onboarding-progress';
import { CompanyInfoStep } from './steps/company-info-step';
import { BudgetPreferencesStep } from './steps/budget-preferences-step';
import { TargetAudienceStep } from './steps/target-audience-step';
import { CreativePreferencesStep } from './steps/creative-preferences-step';
import { FraudRiskStep } from './steps/fraud-risk-step';
import { NotificationPreferencesStep } from './steps/notification-preferences-step';
import { ReviewStep } from './steps/review-step';
import { Button } from '@/components/ui/button';

const initialFormData: OnboardingFormData = {
  companyInfo: {
    companyName: '',
    industry: '',
    website: '',
    companySize: '1-10',
    description: '',
  },
  budgetPreferences: {
    monthlyBudget: 1000,
    contractDuration: '3-months',
    paymentTerms: 'net-30',
    commissionRate: 15,
    payoutFrequency: 'monthly',
  },
  targetAudience: {
    targetDemographics: [],
    targetGeographic: [],
    targetInterests: [],
    productCategory: '',
    productDescription: '',
    averageOrderValue: 50,
  },
  creativePreferences: {
    creativeType: 'ai-generated',
    brandGuidelines: '',
    preferredTone: 'professional',
    colorPreferences: [],
    uploadFiles: [],
  },
  fraudRisk: {
    fraudRiskLevel: 'medium',
    affiliateApprovalProcess: 'ai-assisted',
    minimumAffiliateScore: 70,
    requireIdentityVerification: true,
    requireBusinessLicense: false,
    fraudDetectionSettings: {
      enableRealTimeMonitoring: true,
      enableGeographicRestrictions: false,
      enableDeviceFingerprinting: true,
    },
  },
  notificationPreferences: {
    emailNotifications: {
      dailyReports: false,
      weeklySummaries: true,
      monthlyAnalytics: true,
      fraudAlerts: true,
      performanceAlerts: true,
    },
    dashboardPreferences: {
      defaultView: 'overview',
      refreshInterval: '15min',
      showRealTimeData: true,
    },
    integrationPreferences: {
      slackNotifications: false,
      slackWebhookUrl: '',
      zapierIntegration: false,
    },
  },
};

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: initialFormData,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/onboarding/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Failed to submit onboarding data');
        }

        const result = await response.json();
        console.log('Onboarding submitted successfully:', result);
        // Handle success - redirect to dashboard or show success message
      } catch (error) {
        console.error('Error submitting onboarding:', error);
        // Handle error - show error message
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const currentStepConfig = onboardingSteps[currentStep];
  const completionPercentage = getCompletionPercentage(formik.values);

  const handleNext = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleStepClick = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  const renderCurrentStep = () => {
    switch (currentStepConfig.id) {
      case 'company-info':
        return (
          <CompanyInfoStep
            values={formik.values.companyInfo}
            errors={formik.errors.companyInfo}
            touched={formik.touched.companyInfo}
            onChange={(field, value) => {
              formik.setFieldValue(`companyInfo.${field}`, value);
            }}
          />
        );
      case 'budget-preferences':
        return (
          <BudgetPreferencesStep
            values={formik.values.budgetPreferences}
            errors={formik.errors.budgetPreferences}
            touched={formik.touched.budgetPreferences}
            onChange={(field, value) => {
              formik.setFieldValue(`budgetPreferences.${field}`, value);
            }}
          />
        );
      case 'target-audience':
        return (
          <TargetAudienceStep
            values={formik.values.targetAudience}
            errors={formik.errors.targetAudience}
            touched={formik.touched.targetAudience}
            onChange={(field, value) => {
              formik.setFieldValue(`targetAudience.${field}`, value);
            }}
          />
        );
      case 'creative-preferences':
        return (
          <CreativePreferencesStep
            values={formik.values.creativePreferences}
            errors={formik.errors.creativePreferences}
            touched={formik.touched.creativePreferences}
            onChange={(field, value) => {
              formik.setFieldValue(`creativePreferences.${field}`, value);
            }}
          />
        );
      case 'fraud-risk':
        return (
          <FraudRiskStep
            values={formik.values.fraudRisk}
            errors={formik.errors.fraudRisk}
            touched={formik.touched.fraudRisk}
            onChange={(field, value) => {
              formik.setFieldValue(`fraudRisk.${field}`, value);
            }}
          />
        );
      case 'notification-preferences':
        return (
          <NotificationPreferencesStep
            values={formik.values.notificationPreferences}
            errors={formik.errors.notificationPreferences}
            touched={formik.touched.notificationPreferences}
            onChange={(field, value) => {
              formik.setFieldValue(`notificationPreferences.${field}`, value);
            }}
          />
        );
      case 'review':
        return (
          <ReviewStep
            formData={formik.values}
            onSubmit={formik.handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              AI-Powered Affiliate Marketing Setup
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Complete your onboarding to start your affiliate marketing campaign
            </p>
          </div>

          {/* Progress Bar */}
          <OnboardingProgress
            steps={onboardingSteps}
            currentStep={currentStep}
            completionPercentage={completionPercentage}
            onStepClick={handleStepClick}
          />

          {/* Form Content */}
          <div className="px-6 py-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentStepConfig.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {currentStepConfig.description}
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                {currentStep < onboardingSteps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 