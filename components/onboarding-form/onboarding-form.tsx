'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const stepsCount = onboardingSteps.length - 1; // Exclude review step
  const completionPercentage = Math.round((currentStep / stepsCount) * 100);

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
    <div className="min-h-screen bg-white">
      {/* Logo/Header */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20">
          <div className="flex items-center">
            {/* Symbol part: always visible */}
            <img src="/logo-affiliate.png" alt="A is for Affiliate" className="h-10 w-auto mr-2 select-none" style={{objectFit: 'contain', maxWidth: 48}} />
            {/* Text part: hide on scroll */}
            <span className={`font-bold text-2xl font-['Montserrat'] transition-all duration-500 origin-left ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>is for Affiliate</span>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-['Montserrat']">
            SMARTER AFFILIATE MANAGEMENT
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 font-['Montserrat'] bg-gradient-to-br from-rose-500 to-purple-700 bg-clip-text text-transparent">
            Affiliate Wisdom for every step
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-['Montserrat']">
            We Use AI to connect fast-growing <strong>E-Commerce</strong> and <strong>SaaS</strong> businesses with the skilled marketing experts that will accelerate their growth.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Section */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <OnboardingProgress
              steps={onboardingSteps}
              currentStep={currentStep}
              completionPercentage={completionPercentage}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Form Content */}
          <div className="px-8 py-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Montserrat']">
                {currentStepConfig.title}
              </h3>
              <p className="text-gray-600 font-['Montserrat']">
                {currentStepConfig.description}
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-8">
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < onboardingSteps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer CTA */}
        {/* Removed Get Started and Learn More buttons as requested */}
      </div>
    </div>
  );
} 