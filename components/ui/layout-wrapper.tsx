'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface LayoutWrapperProps {
  topTab: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function LayoutWrapper({ topTab, sidebar, children, className }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    function handleOpenSidebarSheet() {
      setIsSidebarOpen(true);
    }
    window.addEventListener('openSidebarSheet', handleOpenSidebarSheet);
    return () => {
      window.removeEventListener('openSidebarSheet', handleOpenSidebarSheet);
    };
  }, []);

  return (
    <div className={cn('flex flex-col min-h-screen', className)}>
      {/* Fixed Top Tab */}
      <div className="flex-shrink-0 border-b bg-background z-10">{topTab}</div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex fixed top-0 left-0 w-64 h-screen flex-col border-r bg-background z-20">
          {sidebar}
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-80 p-0">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebar}</div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 bg-background ml-0 lg:ml-64">
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
