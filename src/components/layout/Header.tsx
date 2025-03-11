"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  RiSearchLine, 
  RiNotification3Line, 
  RiMoonLine, 
  RiSunLine,
  RiArrowDownSLine,
  RiSettings4Line,
  RiUser3Line,
  RiLogoutBoxRLine,
  RiQuestionLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiRefreshLine,
  RiCloseLine,
  RiMenuLine
} from 'react-icons/ri';
import { useTheme } from '@/context/ThemeContext';
import { useUIStore } from '@/store/uiStore';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

// Sample user data for demo purposes
const userData = {
  name: 'Ian Kuria',
  email: 'ian@startupexel.com',
  avatar: '',
  role: 'Founder'
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { 
    sidebarCollapsed, 
    toggleSidebar,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    syncStatus,
    dataLastUpdated
  } = useUIStore();
  
  // State for dropdowns
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Refs for click outside detection
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useOnClickOutside(profileRef, () => setProfileOpen(false));
  useOnClickOutside(notificationsRef, () => setNotificationsOpen(false));
  useOnClickOutside(searchRef, () => setSearchOpen(false));
  
  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [searchOpen]);
  
  // Format the last updated time
  const formattedLastUpdated = dataLastUpdated 
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dataLastUpdated)
    : 'Never';
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Render the appropriate sync status icon
  const renderSyncStatus = () => {
    switch (syncStatus) {
      case 'synced':
        return (
          <div className="flex items-center text-success-500 dark:text-success-400">
            <RiCheckLine className="w-4 h-4 mr-1" />
            <span className="text-xs">Synced</span>
          </div>
        );
      case 'syncing':
        return (
          <div className="flex items-center text-primary-500 dark:text-primary-400 animate-pulse">
            <RiRefreshLine className="w-4 h-4 mr-1 animate-spin" />
            <span className="text-xs">Syncing...</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-error-500 dark:text-error-400">
            <RiErrorWarningLine className="w-4 h-4 mr-1" />
            <span className="text-xs">Sync Error</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 h-16 flex items-center px-4 justify-between">
      {/* Left section - Mobile menu toggle and status info */}
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 w-10 h-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          onClick={toggleSidebar}
        >
          <RiMenuLine className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>Data updated: {formattedLastUpdated}</span>
          </div>
          <div className="hidden lg:flex">•</div>
          <div className="hidden lg:block">{renderSyncStatus()}</div>
        </div>
      </div>
      
      {/* Right section - Search, notifications, theme toggle, profile */}
      <div className="flex items-center space-x-2">
        {/* Global Search */}
        <div ref={searchRef} className="relative">
          {searchOpen ? (
            <div className="absolute right-0 top-0 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden z-20">
              <div className="flex items-center p-2 border-b border-neutral-200 dark:border-neutral-700">
                <RiSearchLine className="w-5 h-5 text-neutral-400 dark:text-neutral-500 ml-2" />
                <input
                  id="global-search-input"
                  type="text"
                  className="flex-1 py-2 px-3 bg-transparent border-none focus:outline-none text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                  placeholder="Search everything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="p-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                  onClick={() => setSearchOpen(false)}
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>
              
              {searchQuery && (
                <div className="p-4">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {searchQuery.length < 3 ? 'Type at least 3 characters to search' : 'No results found'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              onClick={() => setSearchOpen(true)}
            >
              <RiSearchLine className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Notifications */}
        <div ref={notificationsRef} className="relative">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 relative"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <RiNotification3Line className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full"></span>
            )}
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden z-20">
              <div className="flex items-center justify-between p-3 border-b border-neutral-200 dark:border-neutral-700">
                <h3 className="font-medium text-neutral-900 dark:text-white">Notifications</h3>
                <button 
                  className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  onClick={clearAllNotifications}
                >
                  Clear all
                </button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div>
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-750 cursor-pointer ${
                          !notification.read ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 ${
                            notification.priority === 'high' 
                              ? 'bg-error-500' 
                              : notification.priority === 'medium'
                                ? 'bg-warning-500'
                                : 'bg-info-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Theme Toggle */}
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <RiSunLine className="w-5 h-5" />
          ) : (
            <RiMoonLine className="w-5 h-5" />
          )}
        </button>
        
        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button 
            className="flex items-center space-x-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 py-1 px-2"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-400">
              {userData.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="w-8 h-8 rounded-full" 
                />
              ) : (
                <RiUser3Line className="w-5 h-5" />
              )}
            </div>
            <div className="hidden md:block">
              <span className="text-sm font-medium text-neutral-900 dark:text-white">
                {userData.name}
              </span>
              <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                <span>{userData.role}</span>
                <RiArrowDownSLine className="w-4 h-4 ml-1" />
              </div>
            </div>
          </button>
          
          {profileOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden z-20">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-400 mr-3">
                    {userData.avatar ? (
                      <img 
                        src={userData.avatar} 
                        alt={userData.name} 
                        className="w-12 h-12 rounded-full" 
                      />
                    ) : (
                      <RiUser3Line className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      {userData.name}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {userData.email}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <Link 
                  href="/profile" 
                  className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-750"
                  onClick={() => setProfileOpen(false)}
                >
                  <RiUser3Line className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400" />
                  <span>Your Profile</span>
                </Link>
                
                <Link 
                  href="/settings" 
                  className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-750"
                  onClick={() => setProfileOpen(false)}
                >
                  <RiSettings4Line className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400" />
                  <span>Settings</span>
                </Link>
                
                <Link 
                  href="/help" 
                  className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-750"
                  onClick={() => setProfileOpen(false)}
                >
                  <RiQuestionLine className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400" />
                  <span>Help & Support</span>
                </Link>
              </div>
              
              <div className="py-2 border-t border-neutral-200 dark:border-neutral-700">
                <button 
                  className="flex items-center px-4 py-2 text-sm text-error-600 hover:bg-neutral-100 dark:text-error-400 dark:hover:bg-neutral-750 w-full text-left"
                  onClick={() => setProfileOpen(false)}
                >
                  <RiLogoutBoxRLine className="w-4 h-4 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
