"use client";

import React, { useState } from 'react';
import { RiCheckLine, RiTimeLine, RiArrowRightLine, RiInformationLine, RiLinkM } from 'react-icons/ri';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'primary' | 'success' | 'warning' | 'error';
  showValue?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'primary',
  showValue = true,
  className = '',
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showValue && (
          <>
            <span className="text-sm text-neutral-700 font-medium">{value}</span>
            <span className="text-xs text-neutral-500">{percentage}%</span>
          </>
        )}
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface MilestoneProps {
  id: string;
  title: string;
  description?: string;
  status: 'upcoming' | 'active' | 'completed';
  progress?: number;
  timeframe?: string;
  completedAt?: string;
  dependsOn?: string[];
}

interface MilestoneTrackProps {
  milestones: MilestoneProps[];
  className?: string;
}

export const MilestoneTrack: React.FC<MilestoneTrackProps> = ({
  milestones,
  className = '',
}) => {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    if (expandedMilestone === id) {
      setExpandedMilestone(null);
    } else {
      setExpandedMilestone(id);
    }
  };
  
  const getStatusIcon = (status: MilestoneProps['status'], progress?: number) => {
    if (status === 'completed') {
      return (
        <div className="w-6 h-6 rounded-full bg-success-500 flex items-center justify-center">
          <RiCheckLine className="text-white w-3 h-3" />
        </div>
      );
    }
    
    if (status === 'active') {
      return (
        <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      );
    }
    
    return (
      <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center">
        <div className="w-2 h-2 bg-neutral-400 rounded-full" />
      </div>
    );
  };
  
  const getStatusLine = (index: number) => {
    if (index === milestones.length - 1) return null;
    
    const currentStatus = milestones[index].status;
    const nextStatus = milestones[index + 1].status;
    
    if (currentStatus === 'completed' && nextStatus === 'completed') {
      return <div className="absolute top-3 left-3 w-[1px] h-[calc(100%-12px)] bg-success-500" />;
    }
    
    if (currentStatus === 'completed' && nextStatus === 'active') {
      return <div className="absolute top-3 left-3 w-[1px] h-[calc(100%-12px)] bg-primary-500" />;
    }
    
    if (currentStatus === 'active') {
      return (
        <div className="absolute top-3 left-3 w-[1px] h-[calc(100%-12px)] bg-dashed">
          <div className="w-full h-full border-l-2 border-dashed border-primary-500" />
        </div>
      );
    }
    
    return <div className="absolute top-3 left-3 w-[1px] h-[calc(100%-12px)] bg-neutral-200" />;
  };

  const getDependencyIndicator = (milestone: MilestoneProps, index: number) => {
    if (!milestone.dependsOn || milestone.dependsOn.length === 0) return null;
    
    return (
      <div className="flex items-center mt-1">
        <RiLinkM className="text-neutral-400 w-3 h-3 mr-1" />
        <span className="text-xs text-neutral-500">
          Depends on: {milestone.dependsOn.map(id => {
            const dependentMilestone = milestones.find(m => m.id === id);
            return dependentMilestone ? dependentMilestone.title : id;
          }).join(', ')}
        </span>
      </div>
    );
  };
  
  return (
    <div className={`space-y-1 ${className}`}>
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="relative">
          {getStatusLine(index)}
          <div 
            className={`pl-8 py-2 relative ${
              expandedMilestone === milestone.id ? 'bg-neutral-50 rounded-lg' : ''
            }`}
          >
            <div className="absolute left-0 top-2">
              {getStatusIcon(milestone.status, milestone.progress)}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 
                      className={`text-sm font-medium ${
                        milestone.status === 'completed' ? 'text-success-700' : 
                        milestone.status === 'active' ? 'text-primary-700' : 
                        'text-neutral-500'
                      }`}
                    >
                      {milestone.title}
                    </h3>
                    <button 
                      onClick={() => toggleExpand(milestone.id)}
                      className="ml-2 text-neutral-400 hover:text-neutral-600"
                    >
                      <RiInformationLine className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {milestone.description && (
                    <p className="text-xs text-neutral-500 mt-0.5">{milestone.description}</p>
                  )}
                  
                  {getDependencyIndicator(milestone, index)}
                </div>
                
                <div className="flex items-center">
                  {milestone.timeframe && (
                    <div className="flex items-center text-xs text-neutral-500 mr-2">
                      <RiTimeLine className="w-3 h-3 mr-1" />
                      <span>{milestone.timeframe}</span>
                    </div>
                  )}
                  
                  {milestone.status === 'active' && milestone.progress !== undefined && (
                    <div className="w-16">
                      <ProgressBar value={milestone.progress} max={100} showValue={false} color="primary" />
                    </div>
                  )}
                </div>
              </div>
              
              {expandedMilestone === milestone.id && (
                <div className="mt-3 pt-3 border-t border-neutral-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500">Status</p>
                      <p className="text-sm font-medium mt-1">
                        {milestone.status === 'completed' ? 'Completed' : 
                         milestone.status === 'active' ? `In Progress (${milestone.progress}%)` : 
                         'Upcoming'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-neutral-500">Timeframe</p>
                      <p className="text-sm font-medium mt-1">{milestone.timeframe || 'Not specified'}</p>
                    </div>
                    
                    {milestone.completedAt && (
                      <div>
                        <p className="text-xs text-neutral-500">Completed On</p>
                        <p className="text-sm font-medium mt-1">{milestone.completedAt}</p>
                      </div>
                    )}
                    
                    {milestone.status === 'upcoming' && (
                      <div>
                        <button className="btn btn-sm btn-outline mt-2">
                          <span>Start</span>
                          <RiArrowRightLine className="ml-1 w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-neutral-500 mb-1">Resources</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">
                        Templates
                      </button>
                      <button className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">
                        Guides
                      </button>
                      <button className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded hover:bg-neutral-200">
                        Ask AI
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
