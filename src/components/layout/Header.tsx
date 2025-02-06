import Link from 'next/link';
import { useWeb3 } from '@/context/Web3Context';
import { Navigation } from '../Navigation';
import { WalletTest } from '../WalletTest';

export function Header() {
  const { account, connectWallet } = useWeb3();

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-[#28a745]">
            HUMAN HOURS
          </Link>
          <Navigation />
        </div>
        <WalletTest />
      </div>
    </header>
  );
} 