"use client";

import { SidebarNav, SidebarNavItem } from '@/components/ui/sidebar-nav';
import { LayoutWrapper } from '@/components/ui/layout-wrapper';
import { Header } from '@/app/components/header';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const staticSidebarLinks: SidebarNavItem[] = [
  { title: 'About', href: '/about' },
  { title: 'Help', href: '/help' },
  { title: 'Changelog', href: '/changelog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Back to Main App', href: '/back-to-app', disabled: true }, // Unique key
  { title: 'Individual', href: '/individual' },
  { title: 'Sole Proprietorship', href: '/sole-prop' },
  { title: 'Company', href: '/company' },
];

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // A helper to make the current static page active in the sidebar
  const linksWithActiveState = staticSidebarLinks.map(link => ({
    ...link,
    href: pathname === link.href ? `${link.href}?active=true` : link.href,
  }));


  return (
    <LayoutWrapper
      topTab={<Header />}
      sidebar={<SidebarNav items={linksWithActiveState} className="p-4" />}
    >
      {children}
    </LayoutWrapper>
  );
} 