import React from 'react';
import { Transaction } from '../types/finance';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        <button className="text-indigo-600 hover:text-indigo-800">View All</button>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'USD' 
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}