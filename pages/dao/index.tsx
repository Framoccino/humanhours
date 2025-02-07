import { useWeb3 } from '@/context/Web3Context';
import { DAODashboard } from '@/components/dao/DAODashboard';

export default function DAOPage() {
  const { account } = useWeb3();

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">DAO Governance</h1>
          {account ? (
            <DAODashboard />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Connect your wallet to participate in governance</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 