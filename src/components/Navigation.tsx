import React, { useState } from 'react';
import { Wallet, Bell, Settings, User } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import SettingsPanel from './SettingsPanel';
import ProfilePanel from './ProfilePanel';

export default function Navigation() {
  const [activePanel, setActivePanel] = useState<'notifications' | 'settings' | 'profile' | null>(null);

  return (
    <>
      <nav className="bg-indigo-600 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-8 w-8" />
            <span className="text-xl font-bold">FinanceTracker</span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActivePanel(activePanel === 'notifications' ? null : 'notifications')}
              className="relative hover:text-indigo-200 transition-colors"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button 
              onClick={() => setActivePanel(activePanel === 'settings' ? null : 'settings')}
              className="hover:text-indigo-200 transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setActivePanel(activePanel === 'profile' ? null : 'profile')}
              className="hover:text-indigo-200 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-white"
              />
            </button>
          </div>
        </div>
      </nav>

      <NotificationPanel 
        isOpen={activePanel === 'notifications'} 
        onClose={() => setActivePanel(null)} 
      />
      <SettingsPanel 
        isOpen={activePanel === 'settings'} 
        onClose={() => setActivePanel(null)} 
      />
      <ProfilePanel 
        isOpen={activePanel === 'profile'} 
        onClose={() => setActivePanel(null)} 
      />
    </>
  );
}