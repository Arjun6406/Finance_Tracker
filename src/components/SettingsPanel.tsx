import React, { useState } from 'react';
import { X, Bell, Shield, Moon, Globe, CreditCard } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const settingSections = [
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'email-notif', label: 'Email Notifications', type: 'toggle', defaultValue: true },
      { id: 'push-notif', label: 'Push Notifications', type: 'toggle', defaultValue: true },
      { id: 'alert-threshold', label: 'Budget Alert Threshold', type: 'select', defaultValue: '90', 
        options: ['80', '85', '90', '95'] },
    ],
  },
  {
    title: 'Privacy',
    icon: Shield,
    settings: [
      { id: 'public-profile', label: 'Public Profile', type: 'toggle', defaultValue: false },
      { id: 'show-amounts', label: 'Show Transaction Amounts', type: 'toggle', defaultValue: true },
    ],
  },
  {
    title: 'Preferences',
    icon: Globe,
    settings: [
      { id: 'currency', label: 'Currency', type: 'select', defaultValue: 'USD',
        options: ['USD', 'EUR', 'GBP', 'JPY'] },
      { id: 'theme', label: 'Theme', type: 'select', defaultValue: 'dark',
        options: ['light', 'dark', 'system'] },
      { id: 'language', label: 'Language', type: 'select', defaultValue: 'en',
        options: ['en', 'es', 'fr', 'de'] },
    ],
  },
  {
    title: 'Payment Methods',
    icon: CreditCard,
    settings: [
      { id: 'default-account', label: 'Default Account', type: 'select', defaultValue: 'checking',
        options: ['checking', 'savings', 'credit'] },
    ],
  },
];

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState(() => {
    const initialSettings: Record<string, string | boolean> = {};
    settingSections.forEach(section => {
      section.settings.forEach(setting => {
        initialSettings[setting.id] = setting.defaultValue;
      });
    });
    return initialSettings;
  });

  if (!isOpen) return null;

  const handleSettingChange = (id: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="fixed right-4 top-16 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        {settingSections.map((section) => (
          <div key={section.title} className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="h-5 w-5 text-indigo-600" />
              <h3 className="font-medium text-gray-900">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{setting.label}</span>
                  {setting.type === 'toggle' ? (
                    <button
                      onClick={() => handleSettingChange(setting.id, !settings[setting.id])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[setting.id] ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[setting.id] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <select
                      className="text-sm border border-gray-300 rounded-md p-1"
                      value={settings[setting.id] as string}
                      onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>
                          {option.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}