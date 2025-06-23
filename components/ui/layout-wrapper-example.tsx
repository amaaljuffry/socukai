"use client";

import { LayoutWrapper } from './layout-wrapper';
import { SidebarNav, SidebarNavItem } from './sidebar-nav';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { Home, Settings, User, FileText, BarChart3 } from 'lucide-react';

// Example usage of LayoutWrapper component
export function LayoutWrapperExample() {
  const sidebarItems: SidebarNavItem[] = [
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

  const topTab = (
    <div className="flex justify-center items-center px-4 py-4">
      <Tabs defaultValue="dashboard" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );

  return (
    <LayoutWrapper
      topTab={topTab}
      sidebar={<SidebarNav items={sidebarItems} className="p-4" />}
    >
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          This is an example of the LayoutWrapper component in action. 
          The top tab is fixed, the sidebar is collapsible on mobile, 
          and the main content area scrolls independently.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Card 1</h3>
            <p className="text-sm text-muted-foreground">
              This is a sample card content.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Card 2</h3>
            <p className="text-sm text-muted-foreground">
              Another sample card with content.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Card 3</h3>
            <p className="text-sm text-muted-foreground">
              More sample content for demonstration.
            </p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}

// Example with custom styling
export function LayoutWrapperCustomExample() {
  const sidebarItems: SidebarNavItem[] = [
    { title: 'Home', href: '/home' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
  ];

  const topTab = (
    <div className="flex justify-center items-center px-4 py-6 bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-xl font-bold text-white">Custom Header</h1>
    </div>
  );

  return (
    <LayoutWrapper
      topTab={topTab}
      sidebar={<SidebarNav items={sidebarItems} className="p-4" />}
      className="bg-gray-50"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Layout Example</h2>
        <p className="text-muted-foreground">
          This example shows how you can customize the LayoutWrapper 
          with different styling and content.
        </p>
      </div>
    </LayoutWrapper>
  );
} 