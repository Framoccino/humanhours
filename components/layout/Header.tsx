import { Menu, Bell, User, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useWeb3 } from '../../context/Web3Context';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { account, balance, connectWallet, isConnecting } = useWeb3();
  
  return (
    <header className="bg-[#112240] border-b border-[#1E2D4D] sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden">
            <Menu className="w-6 h-6 text-[#E6F1FF]" />
          </button>
          <Link href="/" className="text-2xl font-bold text-[#64FFDA]">
            HUMAN HOURS
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Link href="/tasks" className="text-[#E6F1FF] hover:text-[#64FFDA]">
            Tasks
          </Link>
          <Link href="/community" className="text-[#E6F1FF] hover:text-[#64FFDA]">
            Community
          </Link>
          <Link href="/dao" className="text-[#E6F1FF] hover:text-[#64FFDA]">
            DAO
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#1E2D4D] rounded-full">
            <Bell className="w-5 h-5 text-[#E6F1FF]" />
          </button>
          {account ? (
            <div className="flex items-center gap-3">
              <Link href="/wallet" className="flex items-center gap-2 px-4 py-2 bg-[#1E2D4D] rounded-lg">
                <Wallet className="w-4 h-4 text-[#64FFDA]" />
                <span className="text-[#64FFDA]">{balance} HH</span>
              </Link>
              <button className="p-2 hover:bg-[#1E2D4D] rounded-full">
                <User className="w-5 h-5 text-[#E6F1FF]" />
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="button-primary disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 