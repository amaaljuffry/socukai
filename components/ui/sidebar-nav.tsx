'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface SidebarNavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  className?: string;
  onLinkClick?: () => void;
}

export function SidebarNav({ items, className, onLinkClick }: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    // Check if the current pathname matches the href
    if (href === pathname) return true;

    // For hrefs with search params, check both pathname and search params
    if (href.includes('?')) {
      const url = new URL(href, 'http://localhost');
      const hrefPathname = url.pathname;
      const hrefSearchParams = url.searchParams;

      // Check if pathname matches
      if (hrefPathname !== pathname) return false;

      // Check if all search params match
      for (const [key, value] of hrefSearchParams.entries()) {
        if (searchParams.get(key) !== value) return false;
      }

      return true;
    }

    return false;
  };

  return (
    <>
      <div className="flex items-center pl-6 pt-6 pb-4">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="SOCUKAI.MY Logo"
            width={32}
            height={32}
            className="h-8 w-auto opacity-90"
          />
        </Link>
      </div>
      <nav className={cn('flex flex-col space-y-1 flex-1', className)}>
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                item.disabled && 'pointer-events-none opacity-50'
              )}
              onClick={onLinkClick}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.title}</span>
              {item.badge &&
                (item.badge === 'Pro' ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
                    <Check className="w-3.5 h-3.5 text-white" /> Pro
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {item.badge}
                  </span>
                ))}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col items-start py-6 pl-6">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="SOCUKAI.MY Logo"
            width={32}
            height={32}
            className="h-8 w-auto opacity-80"
          />
        </Link>
        <span className="mt-2 text-[8px] text-muted-foreground">
          - 2025 ALL RIGHT RESERVED<br />
          <Link href="https://www.petai.agency/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            POWERED BY <span className="italic">PETAI.AGENCY</span>
          </Link>
        </span>
      </div>
    </>
  );
}
