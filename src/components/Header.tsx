import Link from 'next/link';
import { WalletConnect } from './WalletConnect';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#28a745]">
          HUMAN HOURS
        </Link>
        <WalletConnect />
      </div>
    </header>
  );
} 