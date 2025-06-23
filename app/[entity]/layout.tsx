"use client";

import { use } from 'react';
import { SidebarNav, SidebarNavItem } from '@/components/ui/sidebar-nav';
import { LayoutWrapper } from '@/components/ui/layout-wrapper';
import { Header } from '@/app/components/header';

const sidebarLinks: Record<string, SidebarNavItem[]> = {
  individual: [
    { title: 'Overview', href: '/individual?tab=overview' },
    { title: 'SSM & Tax Status', href: '/individual?tab=ssm-tax-status' },
    { title: 'Income & Expenses', href: '/individual?tab=income-expenses' },
    { title: 'Tax Estimator', href: '/individual?tab=tax-estimator' },
    { title: 'Checklist', href: '/individual?tab=checklist' },
    { title: 'E-Invoicing', href: '/individual?tab=e-invoicing', badge: 'New' },
    { title: 'Downloads', href: '/individual?tab=downloads', disabled: true, badge: 'Pro' },
    { title: 'FAQ', href: '/individual?tab=faq' },
  ],
  'sole-prop': [
    { title: 'Overview', href: '/sole-prop?tab=overview' },
    { title: 'SSM & Tax Status', href: '/sole-prop?tab=ssm-tax-status' },
    { title: 'Income & Expenses', href: '/sole-prop?tab=income-expenses' },
    { title: 'Tax Estimator', href: '/sole-prop?tab=tax-estimator' },
    { title: 'Checklist', href: '/sole-prop?tab=checklist' },
    { title: 'E-Invoicing', href: '/sole-prop?tab=e-invoicing', badge: 'New' },
    { title: 'Downloads', href: '/sole-prop?tab=downloads', disabled: true, badge: 'Pro' },
    { title: 'FAQ', href: '/sole-prop?tab=faq' },
  ],
  company: [
    { title: 'Overview', href: '/company?tab=overview' },
    { title: 'SSM & Tax Status', href: '/company?tab=ssm-tax-status' },
    { title: 'Income & Expenses', href: '/company?tab=income-expenses' },
    { title: 'Tax Estimator', href: '/company?tab=tax-estimator' },
    { title: 'Checklist', href: '/company?tab=checklist' },
    { title: 'E-Invoicing', href: '/company?tab=e-invoicing', badge: 'New' },
    { title: 'Downloads', href: '/company?tab=downloads', disabled: true, badge: 'Pro' },
    { title: 'FAQ', href: '/company?tab=faq' },
  ],
};

export default function EntityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ entity: keyof typeof sidebarLinks }>;
}) {
  const { entity } = use(params);
  const links = sidebarLinks[entity] || [];

  return (
    <LayoutWrapper
      topTab={<Header />}
      sidebar={<SidebarNav items={links} className="p-4" />}
    >
      {children}
    </LayoutWrapper>
  );
} 