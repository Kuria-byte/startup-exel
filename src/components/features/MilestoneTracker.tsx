"use client";

import React, { useState } from 'react';
import { 
  RiFlagLine, 
  RiCheckLine, 
  RiTimeLine, 
  RiArrowRightLine, 
  RiAddLine,
  RiMoreLine,
  RiCalendarLine,
  RiTeamLine,
  RiAlertLine
} from 'react-icons/ri';

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'at-risk';
  progress: number; // 0-100
  dependencies?: string[]; // IDs of milestones this depends on
  assignees?: string[];
  category?: 'product' | 'marketing' | 'funding' | 'operations' | 'legal';
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onAddMilestone?: () => void;
  onViewAllMilestones?: () => void;
  onMilestoneClick?: (milestone: Milestone) => void;
}

export default function MilestoneTracker({ 
  milestones, 
  onAddMilestone, 
  onViewAllMilestones,
  onMilestoneClick
}: MilestoneTrackerProps) {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'upcoming' | 'completed'>('all');
  
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'product':
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400';
      case 'marketing':
        return 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400';
      case 'funding':
        return 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400';
      case 'operations':
        return 'bg-info-100 dark:bg-info-900/30 text-info-700 dark:text-info-400';
      case 'legal':
        return 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400';
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400';
    }
  };
  
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <RiCheckLine className="w-4 h-4 text-success-500" />;
      case 'in-progress':
        return <RiTimeLine className="w-4 h-4 text-primary-500" />;
      case 'upcoming':
        return <RiFlagLine className="w-4 h-4 text-neutral-500" />;
      case 'at-risk':
        return <RiAlertLine className="w-4 h-4 text-error-500" />;
      default:
        return <RiFlagLine className="w-4 h-4 text-neutral-500" />;
    }
  };
  
  const getStatusClass = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'border-success-200 dark:border-success-800';
      case 'in-progress':
        return 'border-primary-200 dark:border-primary-800';
      case 'upcoming':
        return 'border-neutral-200 dark:border-neutral-700';
      case 'at-risk':
        return 'border-error-200 dark:border-error-800';
      default:
        return 'border-neutral-200 dark:border-neutral-700';
    }
  };
  
  const getProgressColor = (progress: number, status: Milestone['status']) => {
    if (status === 'at-risk') return 'bg-error-500';
    if (status === 'completed') return 'bg-success-500';
    if (progress < 25) return 'bg-neutral-500';
    if (progress < 50) return 'bg-info-500';
    if (progress < 75) return 'bg-primary-500';
    return 'bg-success-500';
  };
  
  const filteredMilestones = milestones.filter(milestone => {
    if (filter === 'all') return true;
    return milestone.status === filter;
  });
  
  // Sort milestones: at-risk first, then in-progress, then upcoming, then completed
  const sortedMilestones = [...filteredMilestones].sort((a, b) => {
    const statusOrder = {
      'at-risk': 0,
      'in-progress': 1,
      'upcoming': 2,
      'completed': 3
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  // Only show the first 5 milestones
  const displayedMilestones = sortedMilestones.slice(0, 3);
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 border border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Milestone Tracker</h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-700 p-0.5 text-xs">
            <button 
              className={`px-2 py-1 rounded-md transition-colors ${filter === 'all' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-2 py-1 rounded-md transition-colors ${filter === 'in-progress' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`px-2 py-1 rounded-md transition-colors ${filter === 'upcoming' ? 'bg-white dark:bg-neutral-600 shadow-sm' : 'text-neutral-600 dark:text-neutral-300'}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {displayedMilestones.length > 0 ? (
          displayedMilestones.map((milestone) => (
            <div 
              key={milestone.id} 
              className={`p-3 border rounded-lg ${getStatusClass(milestone.status)} hover:shadow-sm transition-all cursor-pointer`}
              onClick={() => onMilestoneClick?.(milestone)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3">
                    {getStatusIcon(milestone.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white">{milestone.title}</h4>
                    {milestone.description && (
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 line-clamp-1">{milestone.description}</p>
                    )}
                  </div>
                </div>
                
                {milestone.category && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(milestone.category)}`}>
                    {milestone.category}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getProgressColor(milestone.progress, milestone.status)} rounded-full`}
                      style={{ width: `${milestone.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {milestone.assignees && milestone.assignees.length > 0 && (
                    <div className="flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                      <RiTeamLine className="w-3.5 h-3.5 mr-1" />
                      <span>{milestone.assignees.length}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-neutral-600 dark:text-neutral-400">
                    <RiCalendarLine className="w-3.5 h-3.5 mr-1" />
                    <span>{milestone.dueDate}</span>
                  </div>
                </div>
              </div>
              
              {milestone.dependencies && milestone.dependencies.length > 0 && (
                <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center">
                    <span>Dependencies: {milestone.dependencies.length}</span>
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-neutral-500 dark:text-neutral-400 mb-2">No milestones found</p>
            <button 
              className="btn btn-sm btn-primary"
              onClick={onAddMilestone}
            >
              <RiAddLine className="mr-1" />
              Add Milestone
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
        <button 
          className="btn btn-sm btn-ghost text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
          onClick={onAddMilestone}
        >
          <RiAddLine className="mr-1" />
          Add Milestone
        </button>
        
        <button 
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center"
          onClick={onViewAllMilestones}
        >
          <span>View all</span>
          <RiArrowRightLine className="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
