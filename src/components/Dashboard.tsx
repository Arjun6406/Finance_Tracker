import React, { useState, useCallback } from 'react';
import Navigation from './Navigation';
import AccountCard from './AccountCard';
import TransactionList from './TransactionList';
import BudgetOverview from './BudgetOverview';
import SpendingAnalytics from './SpendingAnalytics';
import AddTransactionModal from './AddTransactionModal';
import { Account, Transaction, Budget, EXPENSE_CATEGORIES } from '../types/finance';
import { Plus } from 'lucide-react';

const initialAccounts: Account[] = [
  { id: '1', name: 'Main Checking', balance: 5420.50, type: 'checking' },
  { id: '2', name: 'Savings', balance: 12750.75, type: 'savings' },
  { id: '3', name: 'Investment', balance: 34250.25, type: 'investment' },
];

const initialTransactions: Transaction[] = [
  { id: '1', description: 'Grocery Shopping', amount: -125.50, category: 'Food & Dining', date: '2024-03-10', type: 'expense' },
  { id: '2', description: 'Salary Deposit', amount: 3500.00, category: 'Salary', date: '2024-03-08', type: 'income' },
  { id: '3', description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2024-03-07', type: 'expense' },
];

const calculateInitialSpending = (category: string) => {
  return Math.abs(
    initialTransactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0)
  );
};

const initialBudgets: Budget[] = EXPENSE_CATEGORIES.map(category => ({
  category,
  limit: 1000,
  spent: calculateInitialSpending(category)
}));

export default function Dashboard() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  const showAlert = (message: string) => {
    setAlerts(prev => [...prev, message]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(msg => msg !== message));
    }, 5000);
  };

  const updateBudgets = useCallback((transaction: Transaction) => {
    if (transaction.type === 'expense') {
      setBudgets(currentBudgets =>
        currentBudgets.map(budget => {
          if (budget.category === transaction.category) {
            const newSpent = budget.spent + Math.abs(transaction.amount);
            if (newSpent >= budget.limit * 0.9) {
              showAlert(`Warning: ${budget.category} budget is at ${Math.round(newSpent/budget.limit * 100)}% of limit`);
            }
            return { ...budget, spent: newSpent };
          }
          return budget;
        })
      );
    }
  }, []);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: (transactions.length + 1).toString(),
    };

    setTransactions(prev => [transaction, ...prev]);
    
    if (transaction.type === 'expense') {
      updateBudgets(transaction);
    }

    setAccounts(currentAccounts =>
      currentAccounts.map(account =>
        account.type === 'checking'
          ? { ...account, balance: account.balance + transaction.amount }
          : account
      )
    );

    showAlert(`New ${transaction.type} added: ${transaction.description}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down"
          >
            {alert}
          </div>
        ))}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Financial Overview</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Transaction
          </button>
        </div>

        <SpendingAnalytics transactions={transactions} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TransactionList transactions={transactions} />
          <BudgetOverview budgets={budgets} />
        </div>
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}