import React from 'react';
import { PieChart } from 'lucide-react';
import { Budget } from '../types/finance';

interface BudgetOverviewProps {
  budgets: Budget[];
}

export default function BudgetOverview({ budgets }: BudgetOverviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Budget Overview</h2>
        <PieChart className="h-6 w-6 text-indigo-600" />
      </div>
      <div className="space-y-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const barColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500';
          
          return (
            <div key={budget.category}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{budget.category}</span>
                <span className="text-sm text-gray-600">
                  ${budget.spent} / ${budget.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${barColor} transition-all duration-500`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}