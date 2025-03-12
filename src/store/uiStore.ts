import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types for UI Store
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  badge?: {
    count: number;
    variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  };
}

export interface NavigationCategory {
  id: string;
  title: string;
  items: NavigationItem[];
  collapsed?: boolean;
}

export interface RecentlyViewedItem {
  id: string;
  title: string;
  path: string;
  timestamp: number;
  icon?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  target: string;
  timestamp: number;
  comments?: Comment[];
  reactions?: Reaction[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: number;
}

export interface Reaction {
  id: string;
  userId: string;
  type: 'like' | 'celebrate' | 'support' | 'insightful' | 'curious';
}

export interface Metric {
  id: string;
  title: string;
  value: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  trend?: {
    description: string;
    benchmark?: string;
  };
  isPinned: boolean;
  category: 'financial' | 'growth' | 'operations' | 'product' | 'custom';
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'prediction' | 'anomaly' | 'recommendation';
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  size?: 'small' | 'medium' | 'large';
}

export type SyncStatus = 'synced' | 'syncing' | 'error' | 'offline';

export interface FocusModeState {
  enabled: boolean;
  sections: string[];
}

export interface UIState {
  // Sidebar state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // Navigation
  navigationCategories: NavigationCategory[];
  toggleNavigationCategory: (categoryId: string) => void;
  
  // Recently viewed
  recentlyViewed: RecentlyViewedItem[];
  addRecentlyViewed: (item: Omit<RecentlyViewedItem, 'timestamp'>) => void;
  clearRecentlyViewed: () => void;
  
  // Pinned metrics
  pinnedMetrics: string[];
  addPinnedMetric: (metricId: string) => void;
  removePinnedMetric: (metricId: string) => void;
  togglePinnedMetric: (metricId: string) => void;
  
  // Focus Mode
  focusMode: FocusModeState;
  setFocusMode: (focusMode: FocusModeState) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
  
  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  addCommentToActivity: (activityId: string, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  addReactionToActivity: (activityId: string, reaction: Omit<Reaction, 'id'>) => void;
  
  // AI Insights
  aiInsights: AIInsight[];
  addAIInsight: (insight: Omit<AIInsight, 'id' | 'timestamp'>) => void;
  dismissAIInsight: (insightId: string) => void;
  
  // Insight States
  insightStates: Record<string, 'new' | 'in-progress' | 'completed' | 'dismissed'>;
  updateInsightState: (insightId: string, state: 'new' | 'in-progress' | 'completed' | 'dismissed') => void;
  
  // System status
  syncStatus: SyncStatus;
  setSyncStatus: (status: SyncStatus) => void;
  dataLastUpdated: number | null;
  setDataLastUpdated: (timestamp: number) => void;
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create the store with persistence
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Sidebar state
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      // Navigation
      navigationCategories: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          collapsed: false,
          items: [
            { id: 'overview', title: 'Overview', path: '/dashboard', icon: 'RiDashboardLine' },
            { id: 'analytics', title: 'Analytics', path: '/dashboard/analytics', icon: 'RiBarChartBoxLine' },
            { id: 'reports', title: 'Reports', path: '/dashboard/reports', icon: 'RiFileChartLine' }
          ]
        },
        {
          id: 'co-founder-hub',
          title: 'Co-Founder Hub',
          collapsed: false,
          items: [
            { id: 'cto', title: 'AI CTO', path: '/co-founder/cto', icon: 'RiCodeSLine', badge: { count: 3, variant: 'primary' } },
            { id: 'cfo', title: 'AI CFO', path: '/co-founder/cfo', icon: 'RiMoneyDollarCircleLine' },
            { id: 'cmo', title: 'AI CMO', path: '/co-founder/cmo', icon: 'RiMegaphoneLine' },
            { id: 'legal', title: 'AI Legal', path: '/co-founder/legal', icon: 'RiScales3Line' },
          ]
        },
        {
          id: 'funding',
          title: 'Funding & Pitch',
          collapsed: true,
          items: [
            { id: 'pitch-deck', title: 'Pitch Deck Builder', path: '/funding/pitch-deck', icon: 'RiSlideshowLine' },
            { id: 'vc-matchmaker', title: 'VC Matchmaker', path: '/funding/vc-matchmaker', icon: 'RiUserSearchLine' },
            { id: 'virtual-pitch', title: 'Virtual Pitch Arena', path: '/funding/virtual-pitch', icon: 'RiVidiconLine' },
            { id: 'funding-tracker', title: 'Funding Tracker', path: '/funding/tracker', icon: 'RiMoneyDollarBoxLine' },
          ]
        },
        {
          id: 'market',
          title: 'Market Intelligence',
          collapsed: true,
          items: [
            { id: 'competitor-xray', title: 'Competitor X-Ray', path: '/market/competitor-xray', icon: 'RiSpyLine' },
            { id: 'market-scanner', title: 'Market Scanner', path: '/market/scanner', icon: 'RiRadarLine' },
            { id: 'trends', title: 'Trend Analysis', path: '/market/trends', icon: 'RiLineChartLine' },
          ]
        },
        {
          id: 'execution',
          title: 'Execution & Ops',
          collapsed: true,
          items: [
            { id: 'milestones', title: 'Milestone Planning', path: '/execution/milestones', icon: 'RiFlagLine' },
            { id: 'runway', title: 'Runway Maximizer', path: '/execution/runway', icon: 'RiTimerLine' },
            { id: 'team', title: 'Team Builder', path: '/execution/team', icon: 'RiTeamLine' },
          ]
        },
        {
          id: 'growth',
          title: 'Growth & Exit',
          collapsed: true,
          items: [
            { id: 'growth-levers', title: 'Growth Levers', path: '/growth/levers', icon: 'RiRocketLine' },
            { id: 'exit-simulator', title: 'Exit Simulator', path: '/growth/exit-simulator', icon: 'RiDoorOpenLine' },
          ]
        },
        {
          id: 'settings',
          title: 'Settings',
          collapsed: true,
          items: [
            { id: 'account', title: 'Account', path: '/settings/account', icon: 'RiUserSettingsLine' },
            { id: 'preferences', title: 'Preferences', path: '/settings/preferences', icon: 'RiSettings4Line' },
            { id: 'integrations', title: 'Integrations', path: '/settings/integrations', icon: 'RiPlugLine' },
          ]
        }
      ],
      toggleNavigationCategory: (categoryId) => set((state) => ({
        navigationCategories: state.navigationCategories.map(category => 
          category.id === categoryId 
            ? { ...category, collapsed: !category.collapsed } 
            : category
        )
      })),
      
      // Recently viewed
      recentlyViewed: [],
      addRecentlyViewed: (item) => set((state) => {
        // Remove if already exists to avoid duplicates
        const filtered = state.recentlyViewed.filter(i => i.path !== item.path);
        
        // Add to the beginning of the array with current timestamp
        return {
          recentlyViewed: [
            { ...item, timestamp: Date.now() },
            ...filtered
          ].slice(0, 10) // Keep only the 10 most recent
        };
      }),
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
      
      // Pinned metrics
      pinnedMetrics: ['burn-rate', 'user-acquisition', 'monthly-revenue'],
      addPinnedMetric: (metricId) => set((state) => ({
        pinnedMetrics: [...state.pinnedMetrics, metricId]
      })),
      removePinnedMetric: (metricId) => set((state) => ({
        pinnedMetrics: state.pinnedMetrics.filter(id => id !== metricId)
      })),
      togglePinnedMetric: (metricId) => set((state) => ({
        pinnedMetrics: state.pinnedMetrics.includes(metricId) 
          ? state.pinnedMetrics.filter(id => id !== metricId) 
          : [...state.pinnedMetrics, metricId]
      })),
      
      // Focus Mode
      focusMode: {
        enabled: false,
        sections: ['metrics', 'insights', 'activity', 'milestones', 'cofounder', 'funding']
      },
      setFocusMode: (focusMode) => set({ focusMode }),
      
      // Notifications
      notifications: [
        {
          id: 'notif-1',
          title: 'Burn rate alert',
          description: 'Your burn rate has increased by 15% this month',
          timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
          read: false,
          priority: 'high'
        },
        {
          id: 'notif-2',
          title: 'New competitor detected',
          description: 'AI detected a new competitor in your space',
          timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
          read: false,
          priority: 'medium'
        },
        {
          id: 'notif-3',
          title: 'Milestone approaching',
          description: 'MVP Launch milestone due in 5 days',
          timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
          read: true,
          priority: 'medium'
        }
      ],
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            id: generateId(),
            timestamp: Date.now(),
            read: false,
            ...notification
          },
          ...state.notifications
        ]
      })),
      markNotificationAsRead: (notificationId) => set((state) => ({
        notifications: state.notifications.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true } 
            : notification
        )
      })),
      clearAllNotifications: () => set({ notifications: [] }),
      
      // Activities
      activities: [
        {
          id: 'activity-1',
          userId: 'user-1',
          userName: 'Alex Johnson',
          userAvatar: '',
          action: 'updated',
          target: 'the financial forecast',
          timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
          comments: [
            {
              id: 'comment-1',
              userId: 'user-2',
              userName: 'Sarah Chen',
              content: 'Looks good! The new projections are much more realistic.',
              timestamp: Date.now() - 1000 * 60 * 10, // 10 minutes ago
            }
          ],
          reactions: [
            { id: 'reaction-1', userId: 'user-2', type: 'like' },
            { id: 'reaction-2', userId: 'user-3', type: 'insightful' }
          ]
        },
        {
          id: 'activity-2',
          userId: 'user-3',
          userName: 'Miguel Rodriguez',
          userAvatar: '',
          action: 'completed',
          target: 'the competitor analysis report',
          timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
          comments: [],
          reactions: [
            { id: 'reaction-3', userId: 'user-1', type: 'celebrate' }
          ]
        },
        {
          id: 'activity-3',
          userId: 'user-2',
          userName: 'Sarah Chen',
          userAvatar: '',
          action: 'created',
          target: 'a new pitch deck version',
          timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
          comments: [
            {
              id: 'comment-2',
              userId: 'user-1',
              userName: 'Alex Johnson',
              content: 'Great work! Let\'s review it together tomorrow.',
              timestamp: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
            }
          ],
          reactions: []
        },
        {
          id: 'activity-4',
          userId: 'user-4',
          userName: 'Jordan Taylor',
          userAvatar: '',
          action: 'scheduled',
          target: 'a meeting with potential investors',
          timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
          comments: [],
          reactions: [
            { id: 'reaction-4', userId: 'user-1', type: 'like' },
            { id: 'reaction-5', userId: 'user-2', type: 'like' },
            { id: 'reaction-6', userId: 'user-3', type: 'support' }
          ]
        }
      ],
      addActivity: (activity) => set((state) => ({
        activities: [
          {
            id: generateId(),
            timestamp: Date.now(),
            comments: [],
            reactions: [],
            ...activity
          },
          ...state.activities
        ]
      })),
      addCommentToActivity: (activityId, comment) => set((state) => ({
        activities: state.activities.map(activity => 
          activity.id === activityId 
            ? { 
                ...activity, 
                comments: [
                  ...(activity.comments || []),
                  { id: generateId(), timestamp: Date.now(), ...comment }
                ]
              } 
            : activity
        )
      })),
      addReactionToActivity: (activityId, reaction) => set((state) => ({
        activities: state.activities.map(activity => 
          activity.id === activityId 
            ? { 
                ...activity, 
                reactions: [
                  ...(activity.reactions || []),
                  { id: generateId(), ...reaction }
                ]
              } 
            : activity
        )
      })),
      
      // AI Insights
      aiInsights: [
        {
          id: 'insight-1',
          title: 'Burn Rate Anomaly Detected',
          description: 'Your server costs increased by 45% this month, significantly above your historical average. Consider reviewing your cloud infrastructure.',
          type: 'anomaly',
          priority: 'high',
          timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
          size: 'medium'
        },
        {
          id: 'insight-2',
          title: 'Competitor Pricing Change',
          description: 'Your main competitor has reduced their premium tier pricing by 15%. This may impact your conversion rates.',
          type: 'trend',
          priority: 'medium',
          timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
          size: 'small'
        },
        {
          id: 'insight-3',
          title: 'Runway Forecast',
          description: 'Based on current burn rate and projected revenue, your runway will be exhausted in approximately 8.5 months. Consider fundraising within the next 3 months.',
          type: 'prediction',
          priority: 'high',
          timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
          size: 'large'
        },
        {
          id: 'insight-4',
          title: 'Customer Acquisition Opportunity',
          description: 'Analysis of your funnel shows that improving onboarding completion by just 10% could increase your monthly active users by 22%.',
          type: 'recommendation',
          priority: 'medium',
          timestamp: Date.now() - 1000 * 60 * 60 * 36, // 1.5 days ago
          size: 'medium'
        }
      ],
      addAIInsight: (insight) => set((state) => ({
        aiInsights: [
          {
            id: generateId(),
            timestamp: Date.now(),
            ...insight
          },
          ...state.aiInsights
        ]
      })),
      dismissAIInsight: (insightId) => set((state) => ({
        aiInsights: state.aiInsights.filter(insight => insight.id !== insightId)
      })),
      
      // Insight States
      insightStates: {},
      updateInsightState: (insightId, state) => set((prevState) => ({
        insightStates: { ...prevState.insightStates, [insightId]: state }
      })),
      
      // System status
      syncStatus: 'synced',
      setSyncStatus: (status) => set({ syncStatus: status }),
      dataLastUpdated: Date.now() - 30 * 60 * 1000, // 30 minutes ago
      setDataLastUpdated: (timestamp) => set({ dataLastUpdated: timestamp }),
    }),
    {
      name: 'startup-exel-ui-store',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        navigationCategories: state.navigationCategories,
        pinnedMetrics: state.pinnedMetrics,
        focusMode: state.focusMode,
        insightStates: state.insightStates,
      }),
    }
  )
);
