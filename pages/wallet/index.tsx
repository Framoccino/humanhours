import { useWeb3 } from '@/context/Web3Context';
import { WalletDashboard } from '@/components/wallet/WalletDashboard';

export default function WalletPage() {
  const { account } = useWeb3();

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Wallet Dashboard</h1>
          {account ? (
            <WalletDashboard />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Please connect your wallet to view your dashboard</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 