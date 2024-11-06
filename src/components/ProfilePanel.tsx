import React, { useState } from 'react';
import { X, Camera, Mail, Phone, Lock, LogOut } from 'lucide-react';

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-16 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              readOnly={!isEditing}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
            </label>
            <input
              type="email"
              value={profile.email}
              readOnly={!isEditing}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </div>
            </label>
            <input
              type="tel"
              value={profile.phone}
              readOnly={!isEditing}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 space-y-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {isEditing ? (
                <>
                  <Lock className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </button>

            <button className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50 transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}