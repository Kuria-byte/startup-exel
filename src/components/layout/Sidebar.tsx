import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  RiDashboardLine, 
  RiLineChartLine, 
  RiPieChartLine, 
  RiCalendarLine, 
  RiTeamLine, 
  RiSettings4Line, 
  RiArrowLeftSLine, 
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiTimeLine,
  RiPulseLine,
  RiRocketLine,
  RiMoneyDollarCircleLine,
  RiUserStarLine,
  RiBuilding4Line,
  RiBarChart2Line,
  RiFileTextLine,
  RiQuestionLine,
  RiNotification3Line
} from 'react-icons/ri';
import { useTheme } from '@/context/ThemeContext';
import { useUIStore } from '@/store/uiStore';
import AIAssistant from '@/components/features/AIAssistant';

interface NavItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: {
    count: number;
    color: string;
  };
}

// Define the navigation structure by categories
const navigationItems: Record<string, NavItem[]> = {
  main: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: <RiDashboardLine className="w-5 h-5" />,
    },
    {
      id: 'metrics',
      name: 'Metrics & KPIs',
      path: '/metrics',
      icon: <RiLineChartLine className="w-5 h-5" />,
    },
    {
      id: 'financials',
      name: 'Financials',
      path: '/financials',
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
    },
  ],
  planning: [
    {
      id: 'roadmap',
      name: 'Roadmap',
      path: '/roadmap',
      icon: <RiRocketLine className="w-5 h-5" />,
    },
    {
      id: 'milestones',
      name: 'Milestones',
      path: '/milestones',
      icon: <RiCalendarLine className="w-5 h-5" />,
      badge: {
        count: 3,
        color: 'bg-warning-500',
      },
    },
    {
      id: 'tasks',
      name: 'Tasks',
      path: '/tasks',
      icon: <RiFileTextLine className="w-5 h-5" />,
    },
  ],
  growth: [
    {
      id: 'customers',
      name: 'Customers',
      path: '/customers',
      icon: <RiUserStarLine className="w-5 h-5" />,
    },
    {
      id: 'marketing',
      name: 'Marketing',
      path: '/marketing',
      icon: <RiBarChart2Line className="w-5 h-5" />,
    },
    {
      id: 'investors',
      name: 'Investors',
      path: '/investors',
      icon: <RiBuilding4Line className="w-5 h-5" />,
      badge: {
        count: 1,
        color: 'bg-primary-500',
      },
    },
  ],
  other: [
    {
      id: 'team',
      name: 'Team',
      path: '/team',
      icon: <RiTeamLine className="w-5 h-5" />,
    },
    {
      id: 'settings',
      name: 'Settings',
      path: '/settings',
      icon: <RiSettings4Line className="w-5 h-5" />,
    },
    {
      id: 'help',
      name: 'Help & Support',
      path: '/help',
      icon: <RiQuestionLine className="w-5 h-5" />,
    },
  ],
};

// Define navigation categories with their display names
interface NavigationCategoryState {
  name: string;
  expanded: boolean;
}

export default function Sidebar() {
  const { theme } = useTheme();
  const { 
    sidebarCollapsed, 
    toggleSidebar,
    recentlyViewed
  } = useUIStore();
  
  const pathname = usePathname();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Navigation categories state
  const [navigationCategories, setNavigationCategories] = useState<Record<string, NavigationCategoryState>>({
    main: { name: 'Main', expanded: true },
    planning: { name: 'Planning', expanded: false },
    growth: { name: 'Growth', expanded: false },
    other: { name: 'Other', expanded: false },
  });
  
  // Expand a navigation category
  const expandNavigationCategory = (categoryId: string) => {
    setNavigationCategories(prev => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], expanded: true }
    }));
  };
  
  // Collapse a navigation category
  const collapseNavigationCategory = (categoryId: string) => {
    setNavigationCategories(prev => ({
      ...prev,
      [categoryId]: { ...prev[categoryId], expanded: false }
    }));
  };
  
  // Toggle a category's expanded state
  const toggleCategory = (categoryId: string) => {
    if (navigationCategories[categoryId]?.expanded) {
      collapseNavigationCategory(categoryId);
    } else {
      expandNavigationCategory(categoryId);
    }
  };
  
  // Render a navigation item
  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.path;
    
    return (
      <Link 
        href={item.path || '#'} 
        key={item.id}
        className={`
          flex items-center px-4 py-2.5 rounded-lg text-sm font-medium
          transition-all duration-200 ease-in-out
          ${isActive 
            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
            : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
          }
          ${sidebarCollapsed ? 'justify-center' : ''}
        `}
      >
        <span className="flex-shrink-0">
          {item.icon}
        </span>
        
        {!sidebarCollapsed && (
          <>
            <span className="ml-3 truncate">{item.name}</span>
            
            {item.badge && (
              <span className={`ml-auto flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs text-white ${item.badge.color}`}>
                {item.badge.count}
              </span>
            )}
          </>
        )}
        
        {sidebarCollapsed && item.badge && (
          <span className={`absolute top-0 right-0 w-2 h-2 rounded-full ${item.badge.color}`}></span>
        )}
      </Link>
    );
  };
  
  // Render a category with its items
  const renderCategory = (categoryId: string, categoryName: string, items: NavItem[]) => {
    const isExpanded = navigationCategories[categoryId]?.expanded;
    
    return (
      <div 
        key={categoryId}
        className="relative"
        onMouseEnter={() => sidebarCollapsed && setHoveredCategory(categoryId)}
        onMouseLeave={() => sidebarCollapsed && setHoveredCategory(null)}
      >
        {/* Category header */}
        {!sidebarCollapsed && (
          <div 
            className="flex items-center justify-between px-4 py-2 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
            onClick={() => toggleCategory(categoryId)}
          >
            <span className="text-xs font-semibold uppercase tracking-wider">{categoryName}</span>
            <span className="transform transition-transform duration-200">
              {isExpanded ? <RiArrowDownSLine className="w-4 h-4" /> : <RiArrowRightSLine className="w-4 h-4" />}
            </span>
          </div>
        )}
        
        {/* Category items */}
        {!sidebarCollapsed ? (
          <div 
            className={`
              space-y-1 overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            {items.map(renderNavItem)}
          </div>
        ) : (
          <div className="flex justify-center py-2">
            {items.length > 0 && renderNavItem(items[0])}
          </div>
        )}
        
        {/* Hover preview for collapsed sidebar */}
        {sidebarCollapsed && hoveredCategory === categoryId && (
          <div 
            className="absolute left-full top-0 ml-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50"
            style={{ marginTop: '-0.5rem' }}
          >
            <div className="px-4 py-1 mb-1 border-b border-neutral-200 dark:border-neutral-700">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {categoryName}
              </span>
            </div>
            <div className="space-y-1 px-2">
              {items.map(item => (
                <Link 
                  href={item.path || '#'} 
                  key={item.id}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm
                    ${pathname === item.path 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }
                  `}
                >
                  <span className="flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="ml-3 truncate">{item.name}</span>
                  
                  {item.badge && (
                    <span className={`ml-auto flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs text-white ${item.badge.color}`}>
                      {item.badge.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <aside 
      className={`
        sidebar fixed inset-y-0 left-0 z-20 flex flex-col
        bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Sidebar header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-white font-bold ${!sidebarCollapsed ? 'mr-3' : ''}`}>
              SE
            </div>
          </div>
          
          {!sidebarCollapsed && (
            <span className="text-lg font-semibold text-neutral-900 dark:text-white">
              StartupExel
            </span>
          )}
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
        >
          {sidebarCollapsed ? (
            <RiArrowRightSLine className="w-5 h-5" />
          ) : (
            <RiArrowLeftSLine className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-4">
        {Object.entries(navigationItems).map(([categoryId, items]) => 
          renderCategory(categoryId, navigationCategories[categoryId]?.name || categoryId, items)
        )}
      </nav>
      
      {/* Recently viewed */}
      {!sidebarCollapsed && recentlyViewed.length > 0 && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            Recently Viewed
          </h3>
          
          <div className="space-y-1">
            {recentlyViewed.slice(0, 3).map(item => (
              <Link 
                href={item.path || '#'} 
                key={item.path || `recent-${item.title}`}
                className="flex items-center px-3 py-1.5 rounded-md text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                <RiTimeLine className="w-4 h-4 mr-2 text-neutral-500 dark:text-neutral-400" />
                <span className="truncate">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* AI Assistant */}
      <div className={`p-4 border-t border-neutral-200 dark:border-neutral-800 ${sidebarCollapsed ? 'hidden' : ''}`}>
        <AIAssistant compact={true} />
      </div>
    </aside>
  );
}
