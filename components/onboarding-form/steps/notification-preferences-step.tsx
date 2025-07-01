import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, type SelectOption } from '@/components/ui/select';
import type { NotificationPreferences } from '@/types/onboarding';

interface NotificationPreferencesStepProps {
  values: NotificationPreferences;
  errors: any;
  touched: any;
  onChange: (field: keyof NotificationPreferences, value: any) => void;
}

const defaultViewOptions: SelectOption[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'performance', label: 'Performance' },
  { value: 'affiliates', label: 'Affiliates' },
  { value: 'campaigns', label: 'Campaigns' },
];

const refreshIntervalOptions: SelectOption[] = [
  { value: '5min', label: '5 minutes' },
  { value: '15min', label: '15 minutes' },
  { value: '30min', label: '30 minutes' },
  { value: '1hour', label: '1 hour' },
];

export function NotificationPreferencesStep({
  values,
  errors,
  touched,
  onChange,
}: NotificationPreferencesStepProps) {
  const handleNestedChange = (parentField: string, childField: string, value: any) => {
    const parentValue = values[parentField as keyof NotificationPreferences] as any;
    onChange(parentField as keyof NotificationPreferences, {
      ...parentValue,
      [childField]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.emailNotifications.dailyReports}
              onChange={(e) => handleNestedChange('emailNotifications', 'dailyReports', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Daily Performance Reports
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.emailNotifications.weeklySummaries}
              onChange={(e) => handleNestedChange('emailNotifications', 'weeklySummaries', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Weekly Performance Summaries
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.emailNotifications.monthlyAnalytics}
              onChange={(e) => handleNestedChange('emailNotifications', 'monthlyAnalytics', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Monthly Analytics Reports
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.emailNotifications.fraudAlerts}
              onChange={(e) => handleNestedChange('emailNotifications', 'fraudAlerts', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Fraud Detection Alerts
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.emailNotifications.performanceAlerts}
              onChange={(e) => handleNestedChange('emailNotifications', 'performanceAlerts', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Performance Threshold Alerts
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Dashboard Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Dashboard View"
            options={defaultViewOptions}
            value={values.dashboardPreferences.defaultView}
            onChange={(value) => handleNestedChange('dashboardPreferences', 'defaultView', value)}
            error={touched?.dashboardPreferences?.defaultView && errors?.dashboardPreferences?.defaultView}
            helperText="The view you'll see when you first log in"
          />

          <Select
            label="Data Refresh Interval"
            options={refreshIntervalOptions}
            value={values.dashboardPreferences.refreshInterval}
            onChange={(value) => handleNestedChange('dashboardPreferences', 'refreshInterval', value)}
            error={touched?.dashboardPreferences?.refreshInterval && errors?.dashboardPreferences?.refreshInterval}
            helperText="How often dashboard data updates"
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.dashboardPreferences.showRealTimeData}
              onChange={(e) => handleNestedChange('dashboardPreferences', 'showRealTimeData', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Show Real-Time Data
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Integrations</h3>
        
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.integrationPreferences.slackNotifications}
              onChange={(e) => handleNestedChange('integrationPreferences', 'slackNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Slack Notifications
            </span>
          </label>

          {values.integrationPreferences.slackNotifications && (
            <div className="ml-6">
              <Input
                label="Slack Webhook URL"
                type="url"
                value={values.integrationPreferences.slackWebhookUrl}
                onChange={(e) => handleNestedChange('integrationPreferences', 'slackWebhookUrl', e.target.value)}
                error={touched?.integrationPreferences?.slackWebhookUrl && errors?.integrationPreferences?.slackWebhookUrl}
                placeholder="https://hooks.slack.com/services/..."
                helperText="Webhook URL for your Slack channel"
              />
            </div>
          )}

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={values.integrationPreferences.zapierIntegration}
              onChange={(e) => handleNestedChange('integrationPreferences', 'zapierIntegration', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Zapier Integration
            </span>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Notification Best Practices
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Enable weekly summaries for regular performance tracking</li>
          <li>• Set up fraud alerts to catch issues early</li>
          <li>• Use Slack for real-time team notifications</li>
          <li>• Configure performance alerts for automated monitoring</li>
        </ul>
      </div>
    </div>
  );
} 