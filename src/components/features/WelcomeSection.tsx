"use client";

import React, { useMemo } from 'react';
import { 
  RiCalendarLine, 
  RiTimeLine, 
  RiAddLine, 
  RiFileTextLine, 
  RiMoneyDollarCircleLine, 
  RiArrowUpLine, 
  RiArrowRightLine,
  RiRocketLine,
  RiCheckDoubleLine,
  RiAlarmLine
} from 'react-icons/ri';
import Card from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'deadline' | 'task';
}

interface Achievement {
  metric: string;
  value: number;
  target: number;
  percentageAhead: number;
  message: string;
}

interface WelcomeSectionProps {
  userName: string;
  lastLoginDate?: Date;
  todaysSchedule?: ScheduleItem[];
  topPriorityTask?: {
    title: string;
    dueTime: string;
  };
  achievement?: Achievement;
}

export default function WelcomeSection({ 
  userName, 
  lastLoginDate,
  todaysSchedule = [
    { id: 's1', title: 'Team Standup', time: '9:30 AM', type: 'meeting' },
    { id: 's2', title: 'Product Review', time: '11:00 AM', type: 'meeting' },
    { id: 's3', title: 'Investor Call', time: '3:00 PM', type: 'meeting' }
  ],
  topPriorityTask = {
    title: 'Finalize pitch deck for investor meeting',
    dueTime: '2:00 PM'
  },
  achievement = {
    metric: 'User Acquisition',
    value: 250,
    target: 200,
    percentageAhead: 25,
    message: "Keep up the momentum to reach next month's targets."
  }
}: WelcomeSectionProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  const quickActions = [
    { 
      label: 'Add Milestone', 
      icon: RiAddLine, 
      action: () => console.log('Add milestone clicked'),
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    { 
      label: 'Track Expense', 
      icon: RiMoneyDollarCircleLine, 
      action: () => console.log('Track expense clicked'),
      color: 'bg-secondary-600 hover:bg-secondary-700'
    }
   
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5"></div>;
      case 'deadline': return <div className="w-2 h-2 rounded-full bg-error-500 mt-1.5"></div>;
      default: return <div className="w-2 h-2 rounded-full bg-success-500 mt-1.5"></div>;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-none shadow-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          {/* Left Column - Greeting, Date, Achievement, Quick Actions */}
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h1 className="text-xl md:text-2xl font-display font-semibold text-neutral-900 dark:text-white">
                {greeting}, {userName}
              </h1>
            </div>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 flex items-center mb-3 md:mb-5">
              <RiCalendarLine className="mr-1" />
              {formattedDate}
            </p>
            
            {/* Highlighted Achievement */}
            <div className="bg-white dark:bg-neutral-800 bg-opacity-80 p-3 md:p-4 rounded-lg border border-success-100 dark:border-success-900/30 mb-3 md:mb-5">
              <div className="flex items-center text-success-700 dark:text-success-400 mb-2">
                <RiRocketLine className="w-4 h-4 md:w-5 md:h-5 mr-2 text-success-600 dark:text-success-500 flex-shrink-0" />
                <p className="text-xs md:text-sm font-medium">You're {achievement.percentageAhead}% ahead of your {achievement.metric.toLowerCase()} goal!</p>
              </div>
              <div className="mb-2 h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success-500 rounded-full"
                  style={{ width: `${Math.min((achievement.value / achievement.target) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{achievement.message}</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`btn flex items-center px-2 md:px-3 py-1.5 md:py-2 text-white ${action.color} rounded-lg text-xs md:text-sm transition-all`}
                >
                  <action.icon className="mr-1 h-3.5 w-3.5 md:h-4 md:w-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column - Today's Schedule and Top Priority Task */}
          <div className="flex-1 flex flex-col mt-4 md:mt-0">
            {/* Today's Schedule */}
            <div className="mb-3 md:mb-5">
              <h3 className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 md:mb-3">Today's Schedule</h3>
              <div className="bg-white dark:bg-neutral-800 bg-opacity-70 rounded-lg border border-neutral-100 dark:border-neutral-700 p-2 md:p-3">
                {todaysSchedule.length > 0 ? (
                  <div className="space-y-2 md:space-y-3">
                    {todaysSchedule.map(item => (
                      <div key={item.id} className="flex items-start">
                        <div className="w-14 md:w-16 text-xs text-neutral-500 dark:text-neutral-400 pt-0.5">
                          {item.time}
                        </div>
                        <div className="mr-2">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm text-neutral-800 dark:text-neutral-200">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 py-2">No events scheduled for today</p>
                )}
              </div>
            </div>
            
            {/* Top Priority Task */}
            <div className="mb-2">
              <h3 className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 md:mb-3">Top Priority</h3>
              <div className="bg-white dark:bg-neutral-800 bg-opacity-70 p-2 md:p-3 rounded-lg border-l-4 border-error-500 border-t border-r border-b border-neutral-100 dark:border-neutral-700">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-xs md:text-sm font-medium text-neutral-800 dark:text-neutral-200">{topPriorityTask.title}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-error-600 dark:text-error-400 flex items-center">
                        <RiAlarmLine className="mr-1 w-3 h-3" />
                        Due at {topPriorityTask.dueTime}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-ghost text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                    <RiCheckDoubleLine className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-right">
                <a href="#" className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center justify-end">
                  <span>View all tasks</span>
                  <RiArrowRightLine className="ml-1 w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
