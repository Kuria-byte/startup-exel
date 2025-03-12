"use client";

import React, { useState } from 'react';
import { 
  RiArrowRightLine, 
  RiBarChartBoxLine, 
  RiLineChartLine, 
  RiPieChartLine, 
  RiPushpinLine,
  RiAiGenerate,
  RiRocketLine,
  RiTeamLine,
  RiUserSearchLine,
  RiBriefcaseLine,
  RiMoneyDollarCircleLine,
  RiLightbulbLine,
  RiTimeLine,
  RiAlertLine,
  RiFilterLine,
  RiCalendarLine,
  RiArrowDownSLine
} from 'react-icons/ri';
import Card, { CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/DataVisualizations';
import { MilestoneTrack } from '@/components/ui/ProgressIndicator';
import WelcomeSection from '@/components/features/WelcomeSection';
import { useUIStore } from '@/store/uiStore';
import BentoGrid, { AIInsight } from '@/components/layout/BentoGrid';
import ActivityStream from '@/components/features/ActivityStream';
import MilestoneTracker from '@/components/features/MilestoneTracker';
import { mockMilestones } from '@/data/mockMilestones';
import CoFounderHub from '@/components/features/CoFounderHub';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FocusMode from '@/components/features/FocusMode';
import StartupHealth from '@/components/features/StartupHealth';
import { mockHealthData } from '@/data/mockHealthData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

// Sample data for charts
const revenueData = [
  { month: 'Jan', actual: 4000, forecast: 4000 },
  { month: 'Feb', actual: 5000, forecast: 5000 },
  { month: 'Mar', actual: 6000, forecast: 6000 },
  { month: 'Apr', actual: 7000, forecast: 7000 },
  { month: 'May', actual: 8000, forecast: 8000 },
  { month: 'Jun', actual: 9000, forecast: 9000 },
  { month: 'Jul', actual: null, forecast: 11000 },
  { month: 'Aug', actual: null, forecast: 12000 },
  { month: 'Sep', actual: null, forecast: 14000 },
];

const userAcquisitionData = [
  { channel: 'Organic Search', users: 400 },
  { channel: 'Direct', users: 300 },
  { channel: 'Social', users: 200 },
  { channel: 'Referral', users: 150 },
  { channel: 'Email', users: 100 },
];

const expensesData = [
  { category: 'Development', value: 5000 },
  { category: 'Marketing', value: 3000 },
  { category: 'Operations', value: 2000 },
  { category: 'Legal', value: 1000 },
  { category: 'Other', value: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Sample journey milestones
const startupJourneyMilestones = [
  {
    id: 'idea-validation',
    title: 'Idea Validation',
    description: 'Validate your startup idea with potential customers',
    status: 'completed' as const,
    completedAt: 'March 15, 2024',
    timeframe: '2-4 weeks'
  },
  {
    id: 'mvp-development',
    title: 'MVP Development',
    description: 'Build a minimum viable product to test with early adopters',
    status: 'completed' as const,
    completedAt: 'May 10, 2024',
    timeframe: '6-8 weeks',
    dependsOn: ['idea-validation']
  },
  {
    id: 'market-launch',
    title: 'Market Launch',
    description: 'Launch your product to the market and acquire first paying customers',
    status: 'active' as const,
    progress: 65,
    timeframe: '4-6 weeks',
    dependsOn: ['mvp-development']
  },
  {
    id: 'growth-phase',
    title: 'Growth Phase',
    description: 'Scale your customer base and optimize acquisition channels',
    status: 'upcoming' as const,
    timeframe: '3-6 months',
    dependsOn: ['market-launch']
  },
  {
    id: 'funding-round',
    title: 'Seed Funding Round',
    description: 'Raise capital to accelerate growth and expand team',
    status: 'upcoming' as const,
    timeframe: '2-3 months',
    dependsOn: ['market-launch']
  }
];

// AI Insights for the dashboard
const aiInsights: AIInsight[] = [
  {
    id: 'insight-1',
    title: 'Revenue Growth Trend',
    description: 'Your MRR has grown 15% faster than similar startups at this stage. Keep focusing on your current acquisition channels.',
    type: 'trend',
    priority: 'high',
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    size: 'medium'
  },
  {
    id: 'insight-2',
    title: 'Burn Rate Alert',
    description: 'Your current burn rate has increased by 12% this month. Consider reviewing recent expenses to identify areas for optimization.',
    type: 'anomaly',
    priority: 'high',
    timestamp: Date.now() - 12 * 60 * 60 * 1000, // 12 hours ago
    size: 'small'
  },
  {
    id: 'insight-3',
    title: 'Investor Pitch Optimization',
    description: 'Based on successful pitch decks in your industry, consider highlighting your customer acquisition cost metrics more prominently.',
    type: 'recommendation',
    priority: 'medium',
    timestamp: Date.now() - 36 * 60 * 60 * 1000, // 36 hours ago
    size: 'small'
  },
  {
    id: 'insight-4',
    title: 'Market Opportunity',
    description: 'Recent industry shifts indicate a growing demand for enterprise solutions in your sector. Consider exploring this segment for expansion.',
    type: 'prediction',
    priority: 'medium',
    timestamp: Date.now() - 48 * 60 * 60 * 1000, // 2 days ago
    size: 'large'
  },
  {
    id: 'insight-5',
    title: 'Team Productivity',
    description: 'Your development velocity has increased by 23% since implementing agile practices. Continue refining your sprint planning process.',
    type: 'trend',
    priority: 'low',
    timestamp: Date.now() - 72 * 60 * 60 * 1000, // 3 days ago
    size: 'small'
  }
];

// Create mini chart data for metric cards
const revenueChartData = revenueData.filter(d => d.actual !== null).map(d => ({ value: d.actual as number }));
const userAcquisitionChartData = [1100, 1300, 1400, 1320, 1250].map(v => ({ value: v }));
const burnRateChartData = [10000, 11200, 11500, 12100, 12500].map(v => ({ value: v }));

// Additional chart data
const burnRateData = [
  { month: 'Jan', value: 10000 },
  { month: 'Feb', value: 11200 },
  { month: 'Mar', value: 11500 },
  { month: 'Apr', value: 12100 },
  { month: 'May', value: 12500 },
  { month: 'Jun', value: 13000 },
  { month: 'Jul', value: 13200 },
];

const runwayData = [
  { month: 'Jan', value: 180000 },
  { month: 'Feb', value: 168800 },
  { month: 'Mar', value: 157300 },
  { month: 'Apr', value: 145200 },
  { month: 'May', value: 132700 },
  { month: 'Jun', value: 119700 },
  { month: 'Jul', value: 106500 },
];

const investorReadinessData = [
  { name: 'Product', value: 75 },
  { name: 'Traction', value: 60 },
  { name: 'Team', value: 85 },
  { name: 'Market', value: 70 },
  { name: 'Financials', value: 55 },
];

const INVESTOR_READINESS_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const marketFitData = [
  { name: 'Problem-Solution Fit', value: 70 },
  { name: 'Product-Market Fit', value: 65 },
  { name: 'Channel Fit', value: 55 },
  { name: 'Model Fit', value: 80 },
];

const MARKET_FIT_COLORS = ['#4F86F7', '#8A6FDF', '#F06292', '#F9A825'];

const competitiveData = [
  { name: 'Your Company', x: 6, y: 6, size: 100, color: '#4F86F7' },
  { name: 'Competitor A', x: 8, y: 8, size: 80, color: '#E0E0E0' },
  { name: 'Competitor B', x: 5, y: 3, size: 70, color: '#E0E0E0' },
  { name: 'Competitor C', x: 2, y: 5, size: 90, color: '#E0E0E0' },
  { name: 'Competitor D', x: 7, y: 2, size: 60, color: '#E0E0E0' },
];

const channelData = [
  { name: 'Organic', users: 400, conversion: 4.5 },
  { name: 'Paid', users: 300, conversion: 3.2 },
  { name: 'Social', users: 250, conversion: 2.8 },
  { name: 'Referral', users: 200, conversion: 5.1 },
  { name: 'Email', users: 150, conversion: 6.3 },
];

const growthMetricsData = [
  { 
    week: 'Week 1', 
    userAcquisition: 65, 
    activeUsers: 45, 
    revenue: 12 
  },
  { 
    week: 'Week 2', 
    userAcquisition: 78, 
    activeUsers: 52, 
    revenue: 18 
  },
  { 
    week: 'Week 3', 
    userAcquisition: 85, 
    activeUsers: 68, 
    revenue: 23 
  },
  { 
    week: 'Week 4', 
    userAcquisition: 105, 
    activeUsers: 82, 
    revenue: 35 
  },
];

// Metric IDs for pinning functionality
const METRIC_IDS = {
  REVENUE: 'monthly-revenue',
  USER_ACQUISITION: 'user-acquisition',
  BURN_RATE: 'burn-rate',
  CUSTOMER_RETENTION: 'customer-retention',
  CONVERSION_RATE: 'conversion-rate',
  RUNWAY: 'runway',
  TEAM_GROWTH: 'team-growth',
  MILESTONE_COMPLETION: 'milestone-completion'
};

// Metric categories for tabs
const METRIC_CATEGORIES = [
  { id: 'project', label: 'Project', metrics: [METRIC_IDS.MILESTONE_COMPLETION, METRIC_IDS.TEAM_GROWTH] },
  { id: 'finance', label: 'Finance', metrics: [METRIC_IDS.REVENUE, METRIC_IDS.BURN_RATE, METRIC_IDS.RUNWAY] },
  { id: 'customer', label: 'Customer', metrics: [METRIC_IDS.USER_ACQUISITION, METRIC_IDS.CUSTOMER_RETENTION, METRIC_IDS.CONVERSION_RATE] }
];

export default function DashboardPage() {
  const { 
    pinnedMetrics, 
    addPinnedMetric, 
    removePinnedMetric, 
    insightStates, 
    updateInsightState,
    focusMode,
    setFocusMode
  } = useUIStore();
  const [dateRange, setDateRange] = useState('monthly');
  const [activeMetricCategory, setActiveMetricCategory] = useState('finance');
  
  // Last login date for welcome section
  const lastLoginDate = new Date();
  lastLoginDate.setDate(lastLoginDate.getDate() - 2);
  
  const handlePinMetric = (id: string) => {
    if (pinnedMetrics.includes(id)) {
      removePinnedMetric(id);
    } else {
      addPinnedMetric(id);
    }
  };
  
  const getInsightState = (id: string) => {
    return insightStates[id] || 'new';
  };
  
  const handleInsightStateChange = (id: string, state: 'new' | 'in-progress' | 'completed' | 'dismissed') => {
    updateInsightState(id, state);
  };

  // Handle focus mode section visibility
  const handleFocusModeChange = (selectedSections: string[]) => {
    setFocusMode({
      ...focusMode,
      sections: selectedSections
    });
  };

  // Check if a section should be visible based on focus mode settings
  const isSectionVisible = (sectionId: string) => {
    if (!focusMode.enabled) return true;
    return focusMode.sections.includes(sectionId);
  };

  // Dashboard content that will be passed to the layout
  const dashboardContent = (
    <>
      {/* Welcome Section with Focus Mode */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">Dashboard</h1>
          <FocusMode onApply={handleFocusModeChange} />
        </div>
        <WelcomeSection 
          userName="Kuria" 
          lastLoginDate={lastLoginDate}
          topPriorityTask={{
            title: "Finalize pitch deck for investor meeting",
            dueTime: "2:00 PM"
          }}
          todaysSchedule={[
            { id: 's1', title: 'Team Standup', time: '9:30 AM', type: 'meeting' },
            { id: 's2', title: 'Product Review', time: '11:00 AM', type: 'meeting' },
            { id: 's3', title: 'Investor Call with Sequoia Capital', time: '3:00 PM', type: 'meeting' }
          ]}
          achievement={{
            metric: 'User Acquisition',
            value: 250,
            target: 200,
            percentageAhead: 25,
            message: "Keep up the momentum to reach next month's targets."
          }}
        />
      </section>

      {/* Startup Health Section */}
      {isSectionVisible('metrics') && (
        <section className="mb-6">
          <StartupHealth 
            overallScore={mockHealthData.overallScore}
            previousScore={mockHealthData.previousScore}
            dimensions={mockHealthData.dimensions}
            historyData={mockHealthData.historyData}
          />
        </section>
      )}
      
      {/* AI Insights Section */}
      {isSectionVisible('insights') && (
        <section className="mb-6">
          <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-4">AI Insights</h2>
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 border border-neutral-200 dark:border-neutral-700">
            <BentoGrid insights={aiInsights} />
          </div>
        </section>
      )}
      
      {/* Funding Section - Conditionally Rendered */}
      {isSectionVisible('funding') && (
        <section className="mb-6">
          <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-4">
            Funding & Pitch Optimization
          </h2>
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Fundraising Progress</h3>
              <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
                <span>View details</span>
                <RiArrowRightLine className="ml-1 w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Target</h4>
                    <RiMoneyDollarCircleLine className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">$2.5M</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">Seed Round</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Committed</h4>
                    <RiMoneyDollarCircleLine className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">$1.8M</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">72% of target</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Investor Meetings</h4>
                    <RiTeamLine className="w-5 h-5 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">12</div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">Next: Mar 15</div>
                </CardContent>
              </Card>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-primary-600">
                    Fundraising Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-primary-600">
                    72%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                <div style={{ width: "72%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600"></div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Pinned Metrics */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white">
            Pinned Metrics
          </h2>
          <div className="flex items-center">
            <div className="relative mr-2">
              <select 
                className="appearance-none bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <RiArrowDownSLine className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500" />
            </div>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
              <span>View all metrics</span>
              <RiArrowRightLine className="ml-1 w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Metric Category Tabs */}
        <div className="mb-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex space-x-4">
            {METRIC_CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`pb-2 px-1 text-sm font-medium transition-colors duration-150 ${
                  activeMetricCategory === category.id
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-300'
                }`}
                onClick={() => setActiveMetricCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {activeMetricCategory === 'finance' && (
            <>
              <MetricCard
                title="Monthly Revenue"
                value="$9,000"
                change={{ value: 12.5, isPositive: true }}
                trend={{ description: "vs last month", benchmark: "Industry avg: $7,200" }}
                miniChart={{ data: revenueChartData, color: "#4f46e5" }}
                icon={<RiMoneyDollarCircleLine className="w-5 h-5 text-primary-500" />}
              />
              
              <MetricCard
                title="Monthly Burn Rate"
                value="$12,500"
                change={{ value: 3.7, isPositive: false }}
                trend={{ description: "vs last month", benchmark: "Target: $10,000" }}
                miniChart={{ data: burnRateChartData, color: "#ef4444" }}
                icon={<RiMoneyDollarCircleLine className="w-5 h-5 text-error-500" />}
              />
              
              <MetricCard
                title="Runway"
                value="8.5 months"
                change={{ value: 0.5, isPositive: false }}
                trend={{ description: "vs last month", benchmark: "Target: 12+ months" }}
                miniChart={{ data: burnRateChartData.map(d => ({ value: 180000 - d.value * 10 })), color: "#f59e0b" }}
                icon={<RiTimeLine className="w-5 h-5 text-warning-500" />}
              />
            </>
          )}
          
          {activeMetricCategory === 'customer' && (
            <>
              <MetricCard
                title="User Acquisition"
                value="250"
                change={{ value: 5.2, isPositive: true }}
                trend={{ description: "vs last month", benchmark: "Industry avg: 180" }}
                miniChart={{ data: userAcquisitionChartData, color: "#10b981" }}
                icon={<RiUserSearchLine className="w-5 h-5 text-success-500" />}
              />
              
              <MetricCard
                title="Customer Retention"
                value="78%"
                change={{ value: 2.1, isPositive: true }}
                trend={{ description: "vs last month", benchmark: "Industry avg: 65%" }}
                miniChart={{ data: [65, 68, 72, 75, 78].map(v => ({ value: v })), color: "#8b5cf6" }}
                icon={<RiTeamLine className="w-5 h-5 text-purple-500" />}
              />
              
              <MetricCard
                title="Conversion Rate"
                value="3.2%"
                change={{ value: 0.3, isPositive: true }}
                trend={{ description: "vs last month", benchmark: "Industry avg: 2.5%" }}
                miniChart={{ data: [2.5, 2.7, 2.8, 3.0, 3.2].map(v => ({ value: v })), color: "#ec4899" }}
                icon={<RiFilterLine className="w-5 h-5 text-pink-500" />}
              />
            </>
          )}
          
          {activeMetricCategory === 'project' && (
            <>
              <MetricCard
                title="Milestone Completion"
                value="65%"
                change={{ value: 15, isPositive: true }}
                trend={{ description: "vs last month", benchmark: "On track for Q3 goals" }}
                miniChart={{ data: [30, 35, 45, 50, 65].map(v => ({ value: v })), color: "#0ea5e9" }}
                icon={<RiCalendarLine className="w-5 h-5 text-blue-500" />}
              />
              
              <MetricCard
                title="Team Growth"
                value="7 members"
                change={{ value: 2, isPositive: true }}
                trend={{ description: "vs last quarter", benchmark: "Target: 10 by EOY" }}
                miniChart={{ data: [3, 4, 5, 5, 7].map(v => ({ value: v })), color: "#14b8a6" }}
                icon={<RiTeamLine className="w-5 h-5 text-teal-500" />}
              />
              
              <MetricCard
                title="Development Velocity"
                value="24 pts/wk"
                change={{ value: 4, isPositive: true }}
                trend={{ description: "vs last sprint", benchmark: "Target: 30 pts/wk" }}
                miniChart={{ data: [15, 18, 20, 22, 24].map(v => ({ value: v })), color: "#f97316" }}
                icon={<RiRocketLine className="w-5 h-5 text-orange-500" />}
              />
            </>
          )}
        </div>
      </section>
      
  
            
      {/* Co-Founder Hub - Full Width */}
      {isSectionVisible('cofounder') && (
        <section className="mb-6">
          <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-4">Intelligent Co-Founder Hub</h2>
          <CoFounderHub />
        </section>
      )}
      

      
      {/* Funding & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Market Fit Score */}
        <section className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-medium mb-4">Market Fit Score</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Based on customer interviews and usage data
          </p>
          
          <div className="flex flex-col items-center mb-4">
            <div className="text-5xl font-semibold text-primary-600 mb-2">
              68%
            </div>
            <div className="text-sm text-neutral-600">
              Overall Market Fit
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketFitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {marketFitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={MARKET_FIT_COLORS[index % MARKET_FIT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={(value) => <span className="text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center mt-2">
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
              <span>Improve Market Fit</span>
              <RiArrowRightLine className="ml-1 w-4 h-4" />
            </button>
          </div>
        </section>
        
        {/* Competitive Landscape */}
        <section className="bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
          <h3 className="text-lg font-medium mb-4">Competitive Landscape</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Your position relative to competitors
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Feature Richness" 
                  domain={[0, 10]} 
                  label={{ value: 'Feature Richness', position: 'bottom', offset: 0 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Price Point" 
                  domain={[0, 10]} 
                  label={{ value: 'Price Point', angle: -90, position: 'left' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name) => [value, name]}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-neutral-200 rounded shadow-sm">
                          <p className="text-sm font-medium">{payload[0].payload.name}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Companies" 
                  data={competitiveData} 
                  fill="#8884d8"
                  shape={(props: any) => {
                    // Define the expected structure of the payload
                    interface CompetitiveDataPoint {
                      name: string;
                      x: number;
                      y: number;
                      size: number;
                      color: string;
                    }
                    
                    const { cx, cy, fill } = props;
                    const { payload } = props as { payload: CompetitiveDataPoint };
                    const size = (payload.size / 20);
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={size} 
                        fill={payload.color} 
                        stroke={payload.name === 'Your Company' ? '#4F86F7' : 'none'}
                        strokeWidth={payload.name === 'Your Company' ? 2 : 0}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-500 mr-1"></div>
              <span className="text-xs text-neutral-600">Your Company</span>
              <div className="w-3 h-3 rounded-full bg-neutral-300 ml-3 mr-1"></div>
              <span className="text-xs text-neutral-600">Competitors</span>
            </div>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
              <span>Full Competitor Analysis</span>
              <RiArrowRightLine className="ml-1 w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
      
      {/* Growth Metrics */}
      <section className="mb-6 bg-white dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-medium mb-1">Growth Metrics</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Key performance indicators for your startup
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <button className="px-4 py-2 text-sm font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                Week
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700/50">
                Month
              </button>
              <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700/50">
                Quarter
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={growthMetricsData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 20']}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return [`$${value}00`, 'Revenue'];
                  if (name === 'userAcquisition') return [value, 'User Acquisition'];
                  if (name === 'activeUsers') return [value, 'Active Users'];
                  return [value, name];
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => {
                  if (value === 'userAcquisition') return 'User Acquisition';
                  if (value === 'activeUsers') return 'Active Users';
                  if (value === 'revenue') return 'Revenue ($100s)';
                  return value;
                }}
              />
              <Bar 
                dataKey="userAcquisition" 
                fill="#6495ED" 
                radius={[4, 4, 0, 0]} 
                name="userAcquisition"
              />
              <Bar 
                dataKey="activeUsers" 
                fill="#B19CD9" 
                radius={[4, 4, 0, 0]} 
                name="activeUsers"
              />
              <Bar 
                dataKey="revenue" 
                fill="#4ECDC4" 
                radius={[4, 4, 0, 0]} 
                name="revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      
      {/* Activity Stream and Milestone Tracker - Two Columns */}
      {(isSectionVisible('activity') || isSectionVisible('milestones')) && (
        <section className="mb-6">
          <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white mb-4">
            Execution & Operations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity Column */}
            {isSectionVisible('activity') && (
              <div>
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Recent Activity</h3>
                    <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center">
                      <span>View all</span>
                      <RiArrowRightLine className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                  <ActivityStream 
                    limit={4} 
                    showComments={false} 
                    compact={true}
                  />
                </div>
              </div>
            )}
            
            {/* Milestone Tracker Column */}
            {isSectionVisible('milestones') && (
              <div>
                <MilestoneTracker 
                  milestones={mockMilestones}
                  onAddMilestone={() => console.log('Add milestone clicked')}
                  onViewAllMilestones={() => console.log('View all milestones clicked')}
                  onMilestoneClick={(milestone) => console.log('Milestone clicked:', milestone)}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );

  return (
    <DashboardLayout>
      {dashboardContent}
    </DashboardLayout>
  );
}
