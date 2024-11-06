import React from 'react';
import { X, DollarSign, Bell, AlertTriangle } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'transaction',
    title: 'New Transaction Added',
    message: 'Successfully added $125.50 expense for Grocery Shopping',
    time: '2 minutes ago',
    icon: DollarSign,
    color: 'text-green-500',
  },
  {
    id: 2,
    type: 'alert',
    title: 'Budget Alert',
    message: 'Entertainment budget is at 90% of limit',
    time: '1 hour ago',
    icon: AlertTriangle,
    color: 'text-yellow-500',
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Payment Reminder',
    message: 'Utility bill payment due in 2 days',
    time: '3 hours ago',
    icon: Bell,
    color: 'text-blue-500',
  },
];

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed right-4 top-16 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 ${notification.color}`}>
                <notification.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-1">{notification.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          Mark all as read
        </button>
      </div>
    </div>
  );
}