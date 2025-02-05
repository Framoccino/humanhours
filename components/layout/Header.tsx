import Link from 'next/link';
import { useWallet } from '../../hooks/useWallet';
import { Bell } from 'lucide-react';

export default function Header() {
  const { connect, address, balance } = useWallet();

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-green-600 text-xl font-bold">
          HUMAN HOURS
        </Link>

        <div className="flex items-center gap-4">
          {address ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{balance} HH</span>
                <span className="text-xs text-gray-400">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <img 
                src={`https://avatars.dicebear.com/api/identicon/${address}.svg`}
                className="w-8 h-8 rounded-full"
                alt="Profile"
              />
            </>
          ) : (
            <button
              onClick={connect}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 