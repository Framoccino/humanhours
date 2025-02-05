import { Home, Clock, Users, Vote, Wallet, MessageSquare, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Clock, label: 'Tasks', href: '/tasks' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: Vote, label: 'DAO', href: '/dao' },
    { icon: Wallet, label: 'Wallet', href: '/wallet' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-[#112240] border-r border-[#1E2D4D] z-50 
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          <button onClick={onClose} className="lg:hidden absolute right-4 top-4">
            <X className="w-6 h-6 text-[#E6F1FF]" />
          </button>
          
          <div className="space-y-4 mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                  ${router.pathname === item.href 
                    ? 'bg-[#64FFDA]/10 text-[#64FFDA]' 
                    : 'text-[#E6F1FF] hover:bg-[#1E2D4D]'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 