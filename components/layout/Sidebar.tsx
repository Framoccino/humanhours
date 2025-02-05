import { Home, Clock, Users, Settings, BarChart2, Book } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Clock, label: 'Tasks', href: '/tasks' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
    { icon: Book, label: 'Learn', href: '/learn' },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen sticky top-0">
      <div className="p-4 space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 