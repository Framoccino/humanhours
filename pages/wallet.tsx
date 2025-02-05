import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { ArrowUpRight, ArrowDownLeft, Clock, Filter } from 'lucide-react';
import { WalletDashboard } from '../components/wallet/WalletDashboard';
import { SendModal } from '../components/wallet/SendModal';

export default function WalletPage() {
  const [showSend, setShowSend] = useState(false);
  const [transactions] = useState([
    {
      id: '1',
      type: 'send',
      amount: 2.5,
      counterparty: '0x1234...5678',
      timestamp: '2024-02-20T10:00:00Z',
      status: 'completed' as const
    },
    {
      id: '2',
      type: 'receive',
      amount: 5,
      counterparty: '0x8765...4321',
      timestamp: '2024-02-19T15:30:00Z',
      status: 'completed' as const
    }
  ]);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Wallet</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowSend(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Send $HH
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Receive $HH
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <WalletDashboard transactions={transactions} />
          </div>
          
          <div className="col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Available Balance</div>
                  <div className="text-2xl font-bold">100.00 HH</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pending</div>
                  <div className="text-2xl font-bold">5.00 HH</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Earned</div>
                  <div className="text-2xl font-bold">250.00 HH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SendModal isOpen={showSend} onClose={() => setShowSend(false)} />
    </MainLayout>
  );
} 