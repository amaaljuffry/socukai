"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  links: { href: string; label: string }[];
  onLinkClick?: () => void;
}

export function Sidebar({ links, onLinkClick }: SidebarProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  return (
    <nav className="flex flex-col p-4 space-y-2">
      {links.map((link) => {
        const linkTab = new URL(link.href, 'http://localhost').searchParams.get('tab');
        const isActive = activeTab === linkTab;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'px-3 py-2 rounded-md text-sm font-medium',
              isActive
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-600 hover:bg-gray-100'
            )}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
} 