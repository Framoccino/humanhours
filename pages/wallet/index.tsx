import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    type: 'earned',
    amount: 3,
    description: 'Garden Maintenance',
    date: '2024-03-15'
  },
  // Add more mock transactions...
];

export default function WalletPage() {
  const [balance, setBalance] = useState(100);
  const [transactions, setTransactions] = useState(mockTransactions);
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Wallet</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-sm text-gray-500">Available Balance</div>
          <div className="text-3xl font-bold text-green-600">{balance} HH</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">{tx.description}</div>
                    <div className="text-sm text-gray-500">{tx.date}</div>
                  </div>
                  <div className={`font-medium ${tx.type === 'earned' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'earned' ? '+' : '-'}{tx.amount} HH
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg">
                Send HH
              </button>
              <button className="w-full px-4 py-2 border rounded-lg">
                Request HH
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 