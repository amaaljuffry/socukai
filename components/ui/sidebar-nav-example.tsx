"use client";

import { SidebarNav, SidebarNavItem } from './sidebar-nav';
import { Home, Settings, User, FileText, BarChart3 } from 'lucide-react';

// Example usage of SidebarNav component
export function SidebarNavExample() {
  const items: SidebarNavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="h-4 w-4" />,
    },
    {
      title: 'Documents',
      href: '/documents',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-64 border-r bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
      <SidebarNav items={items} />
    </div>
  );
}

// Example with disabled items
export function SidebarNavWithDisabledExample() {
  const items: SidebarNavItem[] = [
    {
      title: 'Active Link',
      href: '/active',
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: 'Disabled Link',
      href: '/disabled',
      icon: <Settings className="h-4 w-4" />,
      disabled: true,
    },
  ];

  return (
    <div className="w-64 border-r bg-background p-4">
      <h2 className="mb-4 text-lg font-semibold">With Disabled Items</h2>
      <SidebarNav items={items} />
    </div>
  );
} 