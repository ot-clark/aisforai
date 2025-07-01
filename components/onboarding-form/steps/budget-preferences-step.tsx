import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import type { BudgetPreferences } from '@/types/onboarding';

interface BudgetPreferencesStepProps {
  values: BudgetPreferences;
  errors: any;
  touched: any;
  onChange: (field: keyof BudgetPreferences, value: any) => void;
}

const contractDurationOptions: SelectOption[] = [
  { value: '1-month', label: '1 Month' },
  { value: '3-months', label: '3 Months' },
  { value: '6-months', label: '6 Months' },
  { value: '12-months', label: '12 Months' },
];

const paymentTermsOptions: SelectOption[] = [
  { value: 'net-15', label: 'Net 15' },
  { value: 'net-30', label: 'Net 30' },
  { value: 'net-45', label: 'Net 45' },
];

const payoutFrequencyOptions: SelectOption[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export function BudgetPreferencesStep({
  values,
  errors,
  touched,
  onChange,
}: BudgetPreferencesStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Monthly Budget (USD)"
          type="number"
          value={values.monthlyBudget}
          onChange={(e) => onChange('monthlyBudget', Number(e.target.value))}
          error={touched?.monthlyBudget && errors?.monthlyBudget}
          placeholder="1000"
          helperText="Minimum budget is $100"
          min="100"
          step="100"
          required
        />

        <Select
          label="Contract Duration"
          options={contractDurationOptions}
          value={values.contractDuration}
          onChange={(value) => onChange('contractDuration', value)}
          error={touched?.contractDuration && errors?.contractDuration}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Payment Terms"
          options={paymentTermsOptions}
          value={values.paymentTerms}
          onChange={(value) => onChange('paymentTerms', value)}
          error={touched?.paymentTerms && errors?.paymentTerms}
          helperText="When affiliates will be paid"
          required
        />

        <Input
          label="Commission Rate (%)"
          type="number"
          value={values.commissionRate}
          onChange={(e) => onChange('commissionRate', Number(e.target.value))}
          error={touched?.commissionRate && errors?.commissionRate}
          placeholder="15"
          helperText="Percentage affiliates earn per sale"
          min="5"
          max="50"
          step="0.5"
          required
        />
      </div>

      <div>
        <Select
          label="Payout Frequency"
          options={payoutFrequencyOptions}
          value={values.payoutFrequency}
          onChange={(value) => onChange('payoutFrequency', value)}
          error={touched?.payoutFrequency && errors?.payoutFrequency}
          helperText="How often affiliates receive payments"
          required
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Budget Recommendations
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with $1,000-$5,000 for testing and optimization</li>
          <li>• Scale up based on performance and ROI</li>
          <li>• Consider seasonal fluctuations in your industry</li>
          <li>• Allocate 10-20% of your marketing budget to affiliate programs</li>
        </ul>
      </div>
    </div>
  );
} 