"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiArrowRightSLine, RiHome4Line } from 'react-icons/ri';

type BreadcrumbItem = {
  name: string;
  href: string;
  current?: boolean;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
};

// Map of route paths to human-readable names
const routeNameMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/business-plan': 'Business Plan',
  '/ai-cto': 'AI-CTO',
  '/ai-cfo': 'AI-CFO',
  '/ai-cmo': 'AI-CMO',
  '/growth': 'Growth',
  '/mentorship': 'Mentorship',
  '/settings': 'Settings',
  // Add more routes as needed
};

export default function Breadcrumb({ items, className = '', showHomeIcon = true }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // If no items are provided, generate them from the current path
  const breadcrumbItems = items || generateBreadcrumbItems(pathname);
  
  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <RiArrowRightSLine className="flex-shrink-0 h-4 w-4 text-neutral-400 dark:text-neutral-500 mx-1" aria-hidden="true" />
              )}
              
              <div className={`flex items-center ${isLast ? 'font-medium text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}>
                {index === 0 && showHomeIcon ? (
                  <RiHome4Line className="mr-1 h-4 w-4 flex-shrink-0" />
                ) : null}
                
                {isLast ? (
                  <span>{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumb items from a path
function generateBreadcrumbItems(path: string): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Get the human-readable name for this route, or capitalize the segment
    const name = routeNameMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    items.push({
      name,
      href: currentPath,
      current: isLast
    });
  });
  
  return items;
}
