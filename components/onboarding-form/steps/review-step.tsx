import React from 'react';
import { Button } from '@/components/ui/button';
import type { OnboardingFormData } from '@/types/onboarding';

interface ReviewStepProps {
  formData: OnboardingFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ReviewStep({
  formData,
  onSubmit,
  isSubmitting,
}: ReviewStepProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-900 mb-2">
          Ready to Submit!
        </h3>
        <p className="text-sm text-green-800">
          Please review your information below before submitting your application.
          You can go back to any step to make changes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Company Name:</span>
              <p className="text-gray-900">{formData.companyInfo.companyName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Industry:</span>
              <p className="text-gray-900">{formData.companyInfo.industry}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Website:</span>
              <p className="text-gray-900">{formData.companyInfo.website}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Company Size:</span>
              <p className="text-gray-900">{formData.companyInfo.companySize}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Description:</span>
              <p className="text-gray-900">{formData.companyInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Budget Preferences */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Budget & Contract</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Monthly Budget:</span>
              <p className="text-gray-900">{formatCurrency(formData.budgetPreferences.monthlyBudget)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Contract Duration:</span>
              <p className="text-gray-900">{formData.budgetPreferences.contractDuration}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Payment Terms:</span>
              <p className="text-gray-900">{formData.budgetPreferences.paymentTerms}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Commission Rate:</span>
              <p className="text-gray-900">{formatPercentage(formData.budgetPreferences.commissionRate)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Payout Frequency:</span>
              <p className="text-gray-900">{formData.budgetPreferences.payoutFrequency}</p>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Target Audience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Demographics:</span>
              <p className="text-gray-900">{formData.targetAudience.targetDemographics.join(', ')}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Geographic:</span>
              <p className="text-gray-900">{formData.targetAudience.targetGeographic.join(', ')}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Interests:</span>
              <p className="text-gray-900">{formData.targetAudience.targetInterests.join(', ')}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Product Category:</span>
              <p className="text-gray-900">{formData.targetAudience.productCategory}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Average Order Value:</span>
              <p className="text-gray-900">{formatCurrency(formData.targetAudience.averageOrderValue)}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Product Description:</span>
              <p className="text-gray-900">{formData.targetAudience.productDescription}</p>
            </div>
          </div>
        </div>

        {/* Creative Preferences */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Creative & Copy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Creative Type:</span>
              <p className="text-gray-900">{formData.creativePreferences.creativeType}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Preferred Tone:</span>
              <p className="text-gray-900">{formData.creativePreferences.preferredTone}</p>
            </div>
            {formData.creativePreferences.colorPreferences && formData.creativePreferences.colorPreferences.length > 0 && (
              <div>
                <span className="font-medium text-gray-700">Color Preferences:</span>
                <p className="text-gray-900">{formData.creativePreferences.colorPreferences.join(', ')}</p>
              </div>
            )}
            {formData.creativePreferences.brandGuidelines && (
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700">Brand Guidelines:</span>
                <p className="text-gray-900">{formData.creativePreferences.brandGuidelines}</p>
              </div>
            )}
          </div>
        </div>

        {/* Fraud Risk */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Fraud & Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Fraud Risk Level:</span>
              <p className="text-gray-900">{formData.fraudRisk.fraudRiskLevel}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Approval Process:</span>
              <p className="text-gray-900">{formData.fraudRisk.affiliateApprovalProcess}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Minimum Affiliate Score:</span>
              <p className="text-gray-900">{formData.fraudRisk.minimumAffiliateScore}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Identity Verification:</span>
              <p className="text-gray-900">{formData.fraudRisk.requireIdentityVerification ? 'Required' : 'Not Required'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Business License:</span>
              <p className="text-gray-900">{formData.fraudRisk.requireBusinessLicense ? 'Required' : 'Not Required'}</p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications & Reporting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Default Dashboard View:</span>
              <p className="text-gray-900">{formData.notificationPreferences.dashboardPreferences.defaultView}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Refresh Interval:</span>
              <p className="text-gray-900">{formData.notificationPreferences.dashboardPreferences.refreshInterval}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Real-Time Data:</span>
              <p className="text-gray-900">{formData.notificationPreferences.dashboardPreferences.showRealTimeData ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Slack Integration:</span>
              <p className="text-gray-900">{formData.notificationPreferences.integrationPreferences.slackNotifications ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 text-lg"
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
} 