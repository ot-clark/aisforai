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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="form-label font-['Montserrat'] text-gray-900">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={values.companyName}
            onChange={(e) => onChange('companyName', e.target.value)}
            className="form-input font-['Montserrat'] placeholder:text-gray-500 bg-gray-100 text-gray-900"
            placeholder="Enter your company name"
            required
          />
          {touched?.companyName && errors?.companyName && (
            <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className="form-label font-['Montserrat'] text-gray-900">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            value={values.industry}
            onChange={(e) => onChange('industry', e.target.value)}
            className="form-input font-['Montserrat'] bg-gray-100 text-gray-900"
            required
          >
            <option value="">Select your industry</option>
            {industryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {touched?.industry && errors?.industry && (
            <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.industry}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="form-label font-['Montserrat'] text-gray-900">
            Website <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={values.website}
            onChange={(e) => onChange('website', e.target.value)}
            className="form-input font-['Montserrat'] placeholder:text-gray-500 bg-gray-100 text-gray-900"
            placeholder="https://yourcompany.com"
            required
          />
          {touched?.website && errors?.website && (
            <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.website}</p>
          )}
          <p className="mt-1 text-sm text-gray-700 font-['Montserrat']">
            Enter your company&apos;s main website URL
          </p>
        </div>

        <div>
          <label className="form-label font-['Montserrat'] text-gray-900">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            value={values.companySize}
            onChange={(e) => onChange('companySize', e.target.value)}
            className="form-input font-['Montserrat'] bg-gray-100 text-gray-900"
            required
          >
            {companySizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {touched?.companySize && errors?.companySize && (
            <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.companySize}</p>
          )}
        </div>
      </div>

      <div>
        <label className="form-label font-['Montserrat'] text-gray-900">
          Company Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="form-input h-32 font-['Montserrat'] placeholder:text-gray-500 bg-gray-100 text-gray-900"
          placeholder="Describe your company, products, and target market..."
          required
        />
        {touched?.description && errors?.description && (
          <p className="mt-1 text-sm text-red-600 font-['Montserrat']">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-700 font-['Montserrat']">
          Tell us about your business to help us match you with the right affiliates
        </p>
      </div>
    </div>
  );
} 