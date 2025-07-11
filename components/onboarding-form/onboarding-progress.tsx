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
    <div className="relative">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700 font-['Montserrat']">
            Progress: {completionPercentage}%
          </span>
          <span className="text-sm text-gray-500 font-['Montserrat']">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep || isCompleted;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1 relative"
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 font-["Montserrat"] font-semibold',
                  isCompleted && 'bg-blue-600 border-blue-600 text-white shadow-lg',
                  isCurrent && 'bg-white border-blue-600 text-blue-600 shadow-lg',
                  !isCompleted && !isCurrent && 'bg-white border-gray-300 text-gray-400',
                  isClickable && 'cursor-pointer hover:scale-110 hover:shadow-lg',
                  !isClickable && 'cursor-not-allowed'
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </button>
              
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    'text-xs font-semibold whitespace-normal max-w-xs mx-auto font-["Montserrat"]',
                    (isCompleted || isCurrent)
                      ? 'bg-gradient-to-br from-rose-500 to-purple-700 bg-clip-text text-transparent'
                      : 'text-gray-500'
                  )}
                >
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-6 left-1/2 w-full h-0.5 -z-10 transition-all duration-300',
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