"use client";

import React from 'react';
import Link from 'next/link';
import { 
  RiQuestionLine, 
  RiBookOpenLine, 
  RiGithubLine, 
  RiCloudLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiRefreshLine
} from 'react-icons/ri';
import { useUIStore } from '@/store/uiStore';

// App version - in a real app, this would come from package.json
const APP_VERSION = 'v1.0.0-beta';

export default function Footer() {
  const { dataLastUpdated, syncStatus } = useUIStore();
  
  // Format the last updated time
  const formattedLastUpdated = dataLastUpdated 
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dataLastUpdated)
    : 'Never';
  
  // Render the appropriate sync status icon
  const renderSyncStatus = () => {
    switch (syncStatus) {
      case 'synced':
        return (
          <div className="flex items-center text-success-500 dark:text-success-400">
            <RiCheckLine className="w-4 h-4 mr-1" />
            <span>Synced</span>
          </div>
        );
      case 'syncing':
        return (
          <div className="flex items-center text-primary-500 dark:text-primary-400 animate-pulse">
            <RiRefreshLine className="w-4 h-4 mr-1 animate-spin" />
            <span>Syncing...</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-error-500 dark:text-error-400">
            <RiErrorWarningLine className="w-4 h-4 mr-1" />
            <span>Sync Error</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-3 px-6 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div className="flex items-center">
            <RiCloudLine className="w-4 h-4 mr-1" />
            <span>Data updated: {formattedLastUpdated}</span>
          </div>
          <div className="hidden md:flex">•</div>
          <div>{renderSyncStatus()}</div>
          <div className="hidden md:flex">•</div>
          <div>{APP_VERSION}</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/help" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
            <RiQuestionLine className="w-4 h-4 mr-1" />
            <span>Help</span>
          </Link>
          <Link href="/docs" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
            <RiBookOpenLine className="w-4 h-4 mr-1" />
            <span>Documentation</span>
          </Link>
          <Link href="https://github.com/startup-exel/feedback" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center">
            <RiGithubLine className="w-4 h-4 mr-1" />
            <span>Feedback</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
