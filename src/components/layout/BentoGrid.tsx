"use client";

import React from 'react';
import { RiArrowRightLine, RiAiGenerate, RiBarChartBoxLine, RiPieChartLine, RiLineChartLine } from 'react-icons/ri';

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'prediction' | 'anomaly' | 'recommendation';
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  size?: 'small' | 'medium' | 'large';
}

export interface BentoGridProps {
  insights: AIInsight[];
}

export default function BentoGrid({ insights }: BentoGridProps) {
  // Determine the size class for each insight
  const getSizeClass = (size?: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-1 md:row-span-2';
      case 'large':
        return 'col-span-1 md:col-span-2 md:row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };
  
  // Get the appropriate icon for each insight type
  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'trend':
        return <RiLineChartLine className="w-5 h-5" />;
      case 'prediction':
        return <RiBarChartBoxLine className="w-5 h-5" />;
      case 'anomaly':
        return <RiPieChartLine className="w-5 h-5" />;
      case 'recommendation':
        return <RiAiGenerate className="w-5 h-5" />;
      default:
        return <RiAiGenerate className="w-5 h-5" />;
    }
  };
  
  // Get the appropriate color for each priority level
  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800';
      case 'medium':
        return 'bg-info-50 dark:bg-info-900/20 border-info-200 dark:border-info-800';
      case 'low':
        return 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700';
      default:
        return 'bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700';
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {insights.map((insight) => (
        <div 
          key={insight.id}
          className={`${getSizeClass(insight.size)} ${getPriorityColor(insight.priority)} rounded-xl p-4 border transition-all hover:shadow-md flex flex-col min-h-[180px] overflow-hidden`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              {getInsightIcon(insight.type)}
            </div>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
              {new Date(insight.timestamp).toLocaleDateString()}
            </span>
          </div>
          
          <h3 className="text-base md:text-lg font-medium mb-1.5 line-clamp-2">{insight.title}</h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 flex-1 mb-2 line-clamp-3 overflow-hidden">
            {insight.description}
          </p>
          
          <button className="flex items-center text-xs md:text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-auto">
            <span>View details</span>
            <RiArrowRightLine className="ml-1 w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
