import React, { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types/finance';

interface SpendingAnalyticsProps {
  transactions: Transaction[];
}

export default function SpendingAnalytics({ transactions }: SpendingAnalyticsProps) {
  const metrics = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const previousMonthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === (currentMonth - 1) && date.getFullYear() === currentYear;
    });

    const calculateTotal = (txs: Transaction[]) => txs.reduce((acc, t) => acc + t.amount, 0);
    const calculateSavings = (txs: Transaction[]) => 
      txs.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0) -
      Math.abs(txs.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0));

    const currentSpending = Math.abs(calculateTotal(currentMonthTransactions.filter(t => t.type === 'expense')));
    const previousSpending = Math.abs(calculateTotal(previousMonthTransactions.filter(t => t.type === 'expense')));
    const currentSavings = calculateSavings(currentMonthTransactions);
    const previousSavings = calculateSavings(previousMonthTransactions);

    return [
      {
        label: 'Monthly Spending',
        current: currentSpending,
        previous: previousSpending,
        trend: ((currentSpending - previousSpending) / previousSpending) * 100,
      },
      {
        label: 'Monthly Savings',
        current: currentSavings,
        previous: previousSavings,
        trend: ((currentSavings - previousSavings) / previousSavings) * 100,
      },
      {
        label: 'Budget Utilization',
        current: currentSpending,
        previous: previousSpending,
        trend: ((currentSpending - previousSpending) / previousSpending) * 100,
      },
    ];
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-500">{metric.label}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-gray-900">
              ${metric.current.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <span className={`flex items-center text-sm font-medium ${
              metric.trend > 0 
                ? metric.label === 'Monthly Savings' ? 'text-green-600' : 'text-red-600'
                : metric.label === 'Monthly Savings' ? 'text-red-600' : 'text-green-600'
            }`}>
              {metric.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              {Math.abs(metric.trend).toFixed(1)}%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">vs. last month</p>
        </div>
      ))}
    </div>
  );
}