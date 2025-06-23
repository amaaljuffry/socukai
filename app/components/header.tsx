"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from 'next/link';
import { SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const entity = pathname.split('/')[1] || 'individual';

  // Add a custom event to open the sidebar
  function openSidebar() {
    const event = new CustomEvent('openSidebarSheet');
    window.dispatchEvent(event);
  }

  const onTabChange = (value: string) => {
    const tab = searchParams.get('tab') || 'overview';
    router.push(`/${value}?tab=${tab}`);
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center px-4 py-4 border-b bg-background min-h-[56px] w-full">
      <div className="relative flex w-full items-center md:justify-start md:w-auto">
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden p-2 rounded-md border border-input bg-background text-foreground shadow-sm"
          aria-label="Open sidebar menu"
          onClick={openSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
        {/* Centered logo on mobile */}
        <a href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center z-10 md:static md:translate-x-0 md:translate-y-0 md:ml-0">
          <img src="/logo.svg" alt="SOCUKAI.MY Logo" className="h-8 w-auto" />
        </a>
        {/* Mobile menu button on right */}
        <div className="ml-auto md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="mr-2">Menu</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Switch Entity</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push('/individual?tab=overview')}>
                👤 Individual
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/sole-prop?tab=overview')}>
                🛍️ Sole Prop
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/company?tab=overview')}>
                🏢 Company
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Help</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/changelog">Changelog</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/terms">Terms & Conditions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/privacy">Privacy Policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/data-privacy">Data Privacy</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Tabs: visible only on md+ */}
      <div className="hidden md:block flex-1 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
          <Tabs value={entity} onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="individual">👤 Individual</TabsTrigger>
              <TabsTrigger value="sole-prop">🛍️ Sole Prop</TabsTrigger>
              <TabsTrigger value="company">🏢 Company</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {/* Desktop menu: right-aligned */}
      <div className="ml-auto hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="mr-2">Menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help">Help</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/changelog">Changelog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/contact">Contact</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/terms">Terms & Conditions</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/data-privacy">Data Privacy</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 