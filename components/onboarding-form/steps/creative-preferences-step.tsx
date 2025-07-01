import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import type { CreativePreferences } from '@/types/onboarding';

interface CreativePreferencesStepProps {
  values: CreativePreferences;
  errors: any;
  touched: any;
  onChange: (field: keyof CreativePreferences, value: any) => void;
}

const creativeTypeOptions: SelectOption[] = [
  { value: 'ai-generated', label: 'AI-Generated Content' },
  { value: 'upload-existing', label: 'Upload Existing Creatives' },
  { value: 'both', label: 'Both AI-Generated and Upload' },
];

const toneOptions: SelectOption[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'tech-savvy', label: 'Tech-Savvy' },
];

const colorOptions: SelectOption[] = [
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'red', label: 'Red' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
];

export function CreativePreferencesStep({
  values,
  errors,
  touched,
  onChange,
}: CreativePreferencesStepProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleMultiSelect = (field: keyof CreativePreferences, value: string) => {
    const currentValues = values[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onChange(field, newValues);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
      onChange('uploadFiles', [...(values.uploadFiles || []), ...fileUrls]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files) {
      const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
      onChange('uploadFiles', [...(values.uploadFiles || []), ...fileUrls]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Select
          label="Creative Type"
          options={creativeTypeOptions}
          value={values.creativeType}
          onChange={(value) => onChange('creativeType', value)}
          error={touched?.creativeType && errors?.creativeType}
          helperText="Choose how you want to handle creative content"
          required
        />
      </div>

      <div>
        <Select
          label="Preferred Tone"
          options={toneOptions}
          value={values.preferredTone}
          onChange={(value) => onChange('preferredTone', value)}
          error={touched?.preferredTone && errors?.preferredTone}
          helperText="The tone of voice for AI-generated content"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Preferences
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {colorOptions.map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="checkbox"
                checked={values.colorPreferences?.includes(option.value)}
                onChange={() => handleMultiSelect('colorPreferences', option.value)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand Guidelines
        </label>
        <textarea
          value={values.brandGuidelines}
          onChange={(e) => onChange('brandGuidelines', e.target.value)}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your brand guidelines, voice, style preferences..."
        />
        <p className="mt-1 text-sm text-gray-500">
          Help AI understand your brand voice and style preferences
        </p>
      </div>

      {(values.creativeType === 'upload-existing' || values.creativeType === 'both') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Existing Creatives
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-gray-600">
                <p className="text-sm">Drag and drop files here, or click to select</p>
                <p className="text-xs mt-1">Supports: Images, PDFs, Word documents</p>
              </div>
            </label>
          </div>
          
          {values.uploadFiles && values.uploadFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
              <ul className="space-y-1">
                {values.uploadFiles.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-900 mb-2">
          AI Content Generation Benefits
        </h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Automatically generate high-converting ad copy</li>
          <li>• Create multiple variations for A/B testing</li>
          <li>• Optimize content based on performance data</li>
          <li>• Maintain consistent brand voice across all creatives</li>
        </ul>
      </div>
    </div>
  );
} 