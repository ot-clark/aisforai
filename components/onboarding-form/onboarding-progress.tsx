import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { OnboardingStepConfig } from '@/types/onboarding';

interface OnboardingProgressProps {
  steps: OnboardingStepConfig[];
  currentStep: number;
  completionPercentage: number;
  onStepClick: (stepIndex: number) => void;
}

export function OnboardingProgress({
  steps,
  currentStep,
  completionPercentage,
  onStepClick,
}: OnboardingProgressProps) {
  return (
    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {completionPercentage}%
          </span>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep || isCompleted;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1"
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200',
                  isCompleted && 'bg-blue-600 border-blue-600 text-white',
                  isCurrent && 'bg-white border-blue-600 text-blue-600',
                  !isCompleted && !isCurrent && 'bg-white border-gray-300 text-gray-400',
                  isClickable && 'cursor-pointer hover:scale-110',
                  !isClickable && 'cursor-not-allowed'
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </button>
              
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    'text-xs font-medium truncate max-w-20',
                    isCompleted && 'text-blue-600',
                    isCurrent && 'text-blue-600',
                    !isCompleted && !isCurrent && 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-4 left-1/2 w-full h-0.5 -z-10',
                    isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                  )}
                  style={{
                    left: `${((index + 1) / steps.length) * 100}%`,
                    width: `${100 / steps.length}%`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 