import React from 'react';
import { CreditCard, Wallet, TrendingUp } from 'lucide-react';
import { Account } from '../types/finance';

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const getIcon = () => {
    switch (account.type) {
      case 'checking':
        return <CreditCard className="h-6 w-6 text-indigo-600" />;
      case 'savings':
        return <Wallet className="h-6 w-6 text-green-600" />;
      case 'investment':
        return <TrendingUp className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transform transition hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
        {getIcon()}
      </div>
      <p className="text-2xl font-bold text-gray-900">
        ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}