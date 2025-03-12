"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import BentoGrid from './BentoGrid';
import ActivityStream from '@/components/features/ActivityStream';
import { useUIStore } from '@/store/uiStore';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UIStore {
  sidebarCollapsed: boolean;
  pinnedMetrics: any[];
  recentlyViewed: any[];
  activities: any[];
  aiInsights: any[];
  syncStatus: any;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { 
    sidebarCollapsed,
    pinnedMetrics,
    recentlyViewed,
    activities,
    aiInsights,
    syncStatus
  } = useUIStore() as UIStore;
  
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white transition-colors">
      <Sidebar />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Main content area */}
            <div className="grid grid-cols-12 gap-6">
              {/* Primary content - full width */}
              <div className="col-span-12">
                {/* Main dashboard content */}
                <div className="mb-6">
                  {children}
                </div>
         
                
                </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
