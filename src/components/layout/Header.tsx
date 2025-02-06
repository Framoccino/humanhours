import Link from 'next/link';
import { useWeb3 } from '@/context/Web3Context';

export function Header() {
  const { account, connectWallet } = useWeb3();

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#28a745]">
          HUMAN HOURS
        </Link>
        
        <div className="flex items-center gap-4">
          {account ? (
            <div className="flex items-center gap-4">
              <button className="p-2">
                <span className="sr-only">Notifications</span>
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border">
                <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
                <UserIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="px-4 py-2 bg-[#28a745] text-white rounded-lg hover:bg-[#218838] transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 