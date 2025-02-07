import { useWeb3 } from '@/context/Web3Context';

export function WalletDashboard() {
  const { account } = useWeb3();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Balance</h2>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-[#28a745]">120 HH</p>
          <p className="text-gray-600">Human Hours Balance</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Garden Maintenance</p>
              <p className="text-sm text-gray-600">2 hours earned</p>
            </div>
            <span className="text-[#28a745]">+2 HH</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Photography Lesson</p>
              <p className="text-sm text-gray-600">1.5 hours spent</p>
            </div>
            <span className="text-red-500">-1.5 HH</span>
          </div>
        </div>
      </div>
    </div>
  );
} 