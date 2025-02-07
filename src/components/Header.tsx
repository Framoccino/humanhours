import Link from 'next/link';
import { Navigation } from './Navigation';
import { WalletConnect } from './WalletConnect';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-[#28a745]">
            HUMAN HOURS
          </Link>
          <Navigation />
        </div>
        
        <div className="flex items-center gap-4">
          <WalletConnect />
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <MobileNavigation />
        </div>
      )}
    </header>
  );
} 