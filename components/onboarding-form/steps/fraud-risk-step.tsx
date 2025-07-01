import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import type { FraudRisk } from '@/types/onboarding';

interface FraudRiskStepProps {
  values: FraudRisk;
  errors: any;
  touched: any;
  onChange: (field: keyof FraudRisk, value: any) => void;
}

const fraudRiskLevelOptions: SelectOption[] = [
  { value: 'low', label: 'Low Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'high', label: 'High Risk' },
];

const affiliateApprovalOptions: SelectOption[] = [
  { value: 'automatic', label: 'Automatic Approval' },
  { value: 'manual-review', label: 'Manual Review' },
  { value: 'ai-assisted', label: 'AI-Assisted Review' },
];

export function FraudRiskStep({
  values,
  errors,
  touched,
  onChange,
}: FraudRiskStepProps) {
  const handleNestedChange = (parentField: string, childField: string, value: any) => {
    const parentValue = values[parentField as keyof FraudRisk] as any;
    onChange(parentField as keyof FraudRisk, {
      ...parentValue,
      [childField]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Fraud Risk Level"
          options={fraudRiskLevelOptions}
          value={values.fraudRiskLevel}
          onChange={(value) => onChange('fraudRiskLevel', value)}
          error={touched?.fraudRiskLevel && errors?.fraudRiskLevel}
          helperText="Set your fraud detection sensitivity"
          required
        />

        <Select
          label="Affiliate Approval Process"
          options={affiliateApprovalOptions}
          value={values.affiliateApprovalProcess}
          onChange={(value) => onChange('affiliateApprovalProcess', value)}
          error={touched?.affiliateApprovalProcess && errors?.affiliateApprovalProcess}
          helperText="How affiliates will be approved"
          required
        />
      </div>

      <div>
        <Input
          label="Minimum Affiliate Score"
          type="number"
          value={values.minimumAffiliateScore}
          onChange={(e) => onChange('minimumAffiliateScore', Number(e.target.value))}
          error={touched?.minimumAffiliateScore && errors?.minimumAffiliateScore}
          placeholder="70"
          min="0"
          max="100"
          helperText="Minimum score required for affiliate approval (0-100)"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Verification Requirements</h3>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.requireIdentityVerification}
              onChange={(e) => onChange('requireIdentityVerification', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Require Identity Verification
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.requireBusinessLicense}
              onChange={(e) => onChange('requireBusinessLicense', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Require Business License
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Fraud Detection Settings</h3>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.fraudDetectionSettings.enableRealTimeMonitoring}
              onChange={(e) => handleNestedChange('fraudDetectionSettings', 'enableRealTimeMonitoring', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Enable Real-Time Monitoring
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.fraudDetectionSettings.enableGeographicRestrictions}
              onChange={(e) => handleNestedChange('fraudDetectionSettings', 'enableGeographicRestrictions', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Enable Geographic Restrictions
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.fraudDetectionSettings.enableDeviceFingerprinting}
              onChange={(e) => handleNestedChange('fraudDetectionSettings', 'enableDeviceFingerprinting', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Enable Device Fingerprinting
            </span>
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">
          Fraud Protection Recommendations
        </h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Start with medium risk level and adjust based on performance</li>
          <li>• Enable real-time monitoring for immediate fraud detection</li>
          <li>• Require identity verification for high-value campaigns</li>
          <li>• Use AI-assisted review for balanced security and efficiency</li>
        </ul>
      </div>
    </div>
  );
} 