import { z } from 'zod';

// Base form schemas
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  industry: z.string().min(1, 'Industry is required'),
  website: z.string().url('Please enter a valid website URL'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
});

export const budgetPreferencesSchema = z.object({
  monthlyBudget: z.number().min(1000, 'Minimum budget is $1000'),
  contractDuration: z.enum(['1-month', '3-months', '6-months', '12-months']),
  paymentTerms: z.enum(['net-30', 'net-15', 'net-7', 'immediate']),
  commissionRate: z.number().min(1, 'Commission rate must be at least 1%').max(50, 'Commission rate cannot exceed 50%'),
  payoutFrequency: z.enum(['weekly', 'bi-weekly', 'monthly', 'quarterly']),
});

export const targetAudienceSchema = z.object({
  targetDemographics: z.array(z.string()).min(1, 'Select at least one demographic'),
  targetGeographic: z.array(z.string()).min(1, 'Select at least one geographic region'),
  targetInterests: z.array(z.string()).min(1, 'Select at least one interest'),
  productCategory: z.string().min(1, 'Product category is required'),
  productDescription: z.string().min(10, 'Product description must be at least 10 characters'),
  averageOrderValue: z.number().min(1, 'Average order value must be at least $1'),
});

export const creativePreferencesSchema = z.object({
  creativeType: z.enum(['ai-generated', 'upload-existing', 'both']),
  brandGuidelines: z.string().optional(),
  preferredTone: z.enum(['professional', 'casual', 'friendly', 'luxury', 'tech-savvy']),
  colorPreferences: z.array(z.string()).optional(),
  uploadFiles: z.array(z.string()).optional(), // File URLs
});

export const notificationPreferencesSchema = z.object({
  emailNotifications: z.object({
    dailyReports: z.boolean(),
    weeklySummaries: z.boolean(),
    monthlyAnalytics: z.boolean(),
    fraudAlerts: z.boolean(),
    performanceAlerts: z.boolean(),
  }),
  dashboardPreferences: z.object({
    defaultView: z.enum(['overview', 'performance', 'affiliates', 'campaigns']),
    refreshInterval: z.enum(['5min', '15min', '30min', '1hour']),
    showRealTimeData: z.boolean(),
  }),
  integrationPreferences: z.object({
    slackNotifications: z.boolean(),
    slackWebhookUrl: z.string().refine((val) => val === '' || /^https?:\/\/.+/.test(val), {
      message: 'Please enter a valid URL or leave empty'
    }),
    zapierIntegration: z.boolean(),
  }),
});

// Complete onboarding form schema (no fraudRisk)
export const onboardingFormSchema = z.object({
  companyInfo: companyInfoSchema,
  budgetPreferences: budgetPreferencesSchema,
  targetAudience: targetAudienceSchema,
  creativePreferences: creativePreferencesSchema,
  notificationPreferences: notificationPreferencesSchema,
});

// TypeScript types derived from schemas
export type CompanyInfo = z.infer<typeof companyInfoSchema>;
export type BudgetPreferences = z.infer<typeof budgetPreferencesSchema>;
export type TargetAudience = z.infer<typeof targetAudienceSchema>;
export type CreativePreferences = z.infer<typeof creativePreferencesSchema>;
export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>;
export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;

// API response types
export interface OnboardingResponse {
  success: boolean;
  data?: {
    onboardingId: string;
    status: 'pending' | 'approved' | 'rejected';
    nextSteps: string[];
  };
  error?: {
    message: string;
    code: string;
    details?: Record<string, any>;
  };
}

// Database model types
export interface OnboardingRecord {
  id: string;
  userId: string;
  companyInfo: CompanyInfo;
  budgetPreferences: BudgetPreferences;
  targetAudience: TargetAudience;
  creativePreferences: CreativePreferences;
  notificationPreferences: NotificationPreferences;
  status: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewNotes?: string;
}

// Form step types
export type OnboardingStep = 
  | 'company-info'
  | 'budget-preferences'
  | 'target-audience'
  | 'creative-preferences'
  | 'notification-preferences'
  | 'review';

export interface OnboardingStepConfig {
  id: OnboardingStep;
  title: string;
  description: string;
  isRequired: boolean;
  validationSchema: z.ZodSchema;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: ValidationError[];
} 