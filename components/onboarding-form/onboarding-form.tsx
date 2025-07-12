'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { onboardingSteps, getStepById, getCompletionPercentage } from '@/utils/onboarding-steps';
import { OnboardingFormData, onboardingFormSchema } from '@/types/onboarding';
import { OnboardingProgress } from './onboarding-progress';
import { CompanyInfoStep } from './steps/company-info-step';
import { BudgetPreferencesStep } from './steps/budget-preferences-step';
import { TargetAudienceStep } from './steps/target-audience-step';
import { CreativePreferencesStep } from './steps/creative-preferences-step';
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

// Map step IDs to Formik keys
const stepIdToFormikKey: Record<string, keyof OnboardingFormData> = {
  'company-info': 'companyInfo',
  'budget-preferences': 'budgetPreferences',
  'target-audience': 'targetAudience',
  'creative-preferences': 'creativePreferences',
  'notification-preferences': 'notificationPreferences',
};

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    validate: (values) => {
      try {
        onboardingFormSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, any> = {};
          error.errors.forEach((err) => {
            const fieldPath = err.path.join('.');
            errors[fieldPath] = err.message;
          });
          return errors;
        }
        return {};
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        console.log('Submitting form data:', JSON.stringify(values, null, 2));
        
        const response = await fetch('/api/onboarding/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Submission failed:', errorData);
          throw new Error('Failed to submit onboarding data');
        }

        const result = await response.json();
        console.log('Onboarding submitted successfully:', result);
        setIsSubmitted(true);
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

  // Validate current step data
  const isCurrentStepValid = (() => {
    if (!currentStepConfig?.validationSchema || currentStepConfig.id === 'review') return true;
    try {
      const formikKey = stepIdToFormikKey[currentStepConfig.id];
      const stepData = formik.values[formikKey];
      currentStepConfig.validationSchema.parse(stepData ?? {});
      return true;
    } catch {
      return false;
    }
  })();

  // Get validation errors for current step
  const getCurrentStepErrors = () => {
    if (!currentStepConfig?.validationSchema || currentStepConfig.id === 'review') return [];
    try {
      const formikKey = stepIdToFormikKey[currentStepConfig.id];
      const stepData = formik.values[formikKey];
      console.log('Step data for validation:', stepData);
      currentStepConfig.validationSchema.parse(stepData ?? {});
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
      }
      return [];
    }
  };

  const currentStepErrors = getCurrentStepErrors();
  console.log('Current step errors:', currentStepErrors);

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
    // Show success screen if submitted
    if (isSubmitted) {
      return (
        <div className="text-center py-12">
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Montserrat']">
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto font-['Montserrat']">
              Thank you for your application. Our team will review your information and get back to you within 24-48 hours.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 font-['Montserrat']">
              What happens next?
            </h3>
            <ul className="text-left space-y-3 text-blue-800 font-['Montserrat']">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">1</span>
                </span>
                <span>Our team will review your application and requirements</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">2</span>
                </span>
                <span>We&apos;ll match you with qualified affiliates in your niche</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">3</span>
                </span>
                <span>You&apos;ll receive an email with next steps and dashboard access</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">4</span>
                </span>
                <span>Start managing your affiliate campaigns and tracking performance</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-gray-500 font-['Montserrat']">
              Questions? Contact us at <a href="mailto:support@aisforaffiliate.com" className="text-blue-600 hover:text-blue-800">support@aisforaffiliate.com</a>
            </p>
          </div>
        </div>
      );
    }

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
            <span className={`font-bold text-2xl font-['Montserrat'] transition-all duration-500 origin-left ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'} text-gray-900`}>is for Affiliate</span>
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
          <p className="text-lg text-gray-800 max-w-3xl mx-auto font-['Montserrat']">
            We Use AI to connect fast-growing <strong>E-Commerce</strong> and <strong>SaaS</strong> businesses with the skilled marketing experts that will accelerate their growth.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Progress Section - Hide when submitted */}
          {!isSubmitted && (
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
              <OnboardingProgress
                steps={onboardingSteps}
                currentStep={currentStep}
                completionPercentage={completionPercentage}
                onStepClick={handleStepClick}
              />
            </div>
          )}

          {/* Form Content */}
          <div className="px-8 py-10">
            {!isSubmitted && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Montserrat']">
                  {currentStepConfig.title}
                </h3>
                              <p className="text-gray-800 font-['Montserrat']">
                {currentStepConfig.description}
              </p>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {renderCurrentStep()}

              {/* Step Validation Errors */}
              {currentStepErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Please complete the required fields:
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                          {currentStepErrors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons - Hide when submitted */}
              {!isSubmitted && (
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
                      disabled={isSubmitting || !isCurrentStepValid}
                      className={`btn-primary ${!isCurrentStepValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => formik.handleSubmit()}
                      disabled={isSubmitting || !formik.isValid || Object.keys(formik.errors).length > 0}
                      className={`btn-primary ${(!formik.isValid || Object.keys(formik.errors).length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer CTA */}
        {/* Removed Get Started and Learn More buttons as requested */}
      </div>
    </div>
  );
} 