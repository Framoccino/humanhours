import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, Activity } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  counterparty: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function WalletDashboard() {
  const [balance, setBalance] = useState(100);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showSend, setShowSend] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Balance</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">{balance}</span>
          <span className="text-gray-600">HH</span>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowSend(true)}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                     flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            Send
          </button>
          <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50 
                           flex items-center justify-center gap-2"
          >
            <ArrowDownLeft className="w-4 h-4" />
            Receive
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                {tx.type === 'send' ? (
                  <ArrowUpRight className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-green-500" />
                )}
                <div>
                  <div className="font-medium">
                    {tx.type === 'send' ? 'Sent to' : 'Received from'} {tx.counterparty}
                  </div>
                  <div className="text-sm text-gray-500">{tx.timestamp}</div>
                </div>
              </div>
              <div className={tx.type === 'send' ? 'text-red-500' : 'text-green-500'}>
                {tx.type === 'send' ? '-' : '+'}{tx.amount} HH
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 