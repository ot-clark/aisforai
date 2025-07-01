import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import type { TargetAudience } from '@/types/onboarding';

interface TargetAudienceStepProps {
  values: TargetAudience;
  errors: any;
  touched: any;
  onChange: (field: keyof TargetAudience, value: any) => void;
}

const demographicOptions: SelectOption[] = [
  { value: '18-24', label: '18-24 years' },
  { value: '25-34', label: '25-34 years' },
  { value: '35-44', label: '35-44 years' },
  { value: '45-54', label: '45-54 years' },
  { value: '55-64', label: '55-64 years' },
  { value: '65+', label: '65+ years' },
];

const geographicOptions: SelectOption[] = [
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia-pacific', label: 'Asia Pacific' },
  { value: 'latin-america', label: 'Latin America' },
  { value: 'middle-east', label: 'Middle East' },
  { value: 'africa', label: 'Africa' },
  { value: 'global', label: 'Global' },
];

const interestOptions: SelectOption[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'fashion', label: 'Fashion & Style' },
  { value: 'health-fitness', label: 'Health & Fitness' },
  { value: 'travel', label: 'Travel' },
  { value: 'food-cooking', label: 'Food & Cooking' },
  { value: 'finance', label: 'Finance & Investment' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'lifestyle', label: 'Lifestyle' },
];

const productCategoryOptions: SelectOption[] = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing & Apparel' },
  { value: 'home-garden', label: 'Home & Garden' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'books', label: 'Books & Media' },
  { value: 'sports-outdoors', label: 'Sports & Outdoors' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'health-wellness', label: 'Health & Wellness' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'services', label: 'Services' },
  { value: 'other', label: 'Other' },
];

export function TargetAudienceStep({
  values,
  errors,
  touched,
  onChange,
}: TargetAudienceStepProps) {
  const handleMultiSelect = (field: keyof TargetAudience, value: string) => {
    const currentValues = values[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onChange(field, newValues);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Demographics
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {demographicOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={values.targetDemographics.includes(option.value)}
                onChange={() => handleMultiSelect('targetDemographics', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {touched?.targetDemographics && errors?.targetDemographics && (
          <p className="mt-1 text-sm text-red-600">{errors.targetDemographics}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Geographic Regions
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {geographicOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={values.targetGeographic.includes(option.value)}
                onChange={() => handleMultiSelect('targetGeographic', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {touched?.targetGeographic && errors?.targetGeographic && (
          <p className="mt-1 text-sm text-red-600">{errors.targetGeographic}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Interests
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={values.targetInterests.includes(option.value)}
                onChange={() => handleMultiSelect('targetInterests', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        {touched?.targetInterests && errors?.targetInterests && (
          <p className="mt-1 text-sm text-red-600">{errors.targetInterests}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Product Category"
          options={productCategoryOptions}
          value={values.productCategory}
          onChange={(value) => onChange('productCategory', value)}
          error={touched?.productCategory && errors?.productCategory}
          required
        />

        <Input
          label="Average Order Value (USD)"
          type="number"
          value={values.averageOrderValue}
          onChange={(e) => onChange('averageOrderValue', Number(e.target.value))}
          error={touched?.averageOrderValue && errors?.averageOrderValue}
          placeholder="50"
          min="1"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Description
        </label>
        <textarea
          value={values.productDescription}
          onChange={(e) => onChange('productDescription', e.target.value)}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your products or services in detail..."
          required
        />
        {touched?.productDescription && errors?.productDescription && (
          <p className="mt-1 text-sm text-red-600">{errors.productDescription}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Help affiliates understand what they'll be promoting
        </p>
      </div>
    </div>
  );
} 