import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import type { CompanyInfo } from '@/types/onboarding';

interface CompanyInfoStepProps {
  values: CompanyInfo;
  errors: any;
  touched: any;
  onChange: (field: keyof CompanyInfo, value: any) => void;
}

const companySizeOptions: SelectOption[] = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

const industryOptions: SelectOption[] = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'travel', label: 'Travel' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'technology', label: 'Technology' },
  { value: 'other', label: 'Other' },
];

export function CompanyInfoStep({
  values,
  errors,
  touched,
  onChange,
}: CompanyInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          value={values.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          error={touched?.companyName && errors?.companyName}
          placeholder="Enter your company name"
          required
        />

        <Select
          label="Industry"
          options={industryOptions}
          value={values.industry}
          onChange={(value) => onChange('industry', value)}
          error={touched?.industry && errors?.industry}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Website"
          type="url"
          value={values.website}
          onChange={(e) => onChange('website', e.target.value)}
          error={touched?.website && errors?.website}
          placeholder="https://yourcompany.com"
          helperText="Enter your company's main website URL"
          required
        />

        <Select
          label="Company Size"
          options={companySizeOptions}
          value={values.companySize}
          onChange={(value) => onChange('companySize', value)}
          error={touched?.companySize && errors?.companySize}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Description
        </label>
        <textarea
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your company, products, and target market..."
          required
        />
        {touched?.description && errors?.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Tell us about your business to help us match you with the right affiliates
        </p>
      </div>
    </div>
  );
} 