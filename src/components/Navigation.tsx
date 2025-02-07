import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation() {
  const router = useRouter();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/wallet', label: 'Wallet' },
    { href: '/messages', label: 'Messages' },
    { href: '/community', label: 'Community' },
    { href: '/dao', label: 'DAO' }
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm font-medium transition-colors hover:text-[#28a745] ${
            router.pathname === href ? 'text-[#28a745]' : 'text-gray-600'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
} 