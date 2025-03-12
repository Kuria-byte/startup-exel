import { 
  RiMoneyDollarCircleLine, 
  RiUserSearchLine, 
  RiTeamLine, 
  RiCodeLine, 
  RiHandCoinLine 
} from 'react-icons/ri';
import React, { ReactNode } from 'react';

// Interface for health dimensions
interface HealthDimension {
  id: string;
  name: string;
  score: number;
  previousScore: number;
  benchmark: number;
  icon: ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
  insights: string[];
}

// Interface for history data points
interface HistoryDataPoint {
  date: string;
  overall: number;
  financial: number;
  market: number;
  team: number;
  product: number;
  investor: number;
}

// Create icon elements
const createFinancialIcon = () => React.createElement(RiMoneyDollarCircleLine, { 
  className: "w-5 h-5 text-emerald-600 dark:text-emerald-400" 
});

const createMarketIcon = () => React.createElement(RiUserSearchLine, { 
  className: "w-5 h-5 text-blue-600 dark:text-blue-400" 
});

const createTeamIcon = () => React.createElement(RiTeamLine, { 
  className: "w-5 h-5 text-violet-600 dark:text-violet-400" 
});

const createProductIcon = () => React.createElement(RiCodeLine, { 
  className: "w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" 
});

const createInvestorIcon = () => React.createElement(RiHandCoinLine, { 
  className: "w-5 h-5 text-amber-600 dark:text-amber-400" 
});

// Mock data for the Startup Health component
export const mockHealthData = {
  overallScore: 76,
  previousScore: 72,
  dimensions: [
    {
      id: 'financial',
      name: 'Financial Health',
      score: 82,
      previousScore: 78,
      benchmark: 75,
      icon: createFinancialIcon(),
      color: '#10B981', // emerald-600
      trend: 'up' as const,
      insights: [
        'Your burn rate is 15% below industry average, extending runway by 3 months',
        'Revenue growth is outpacing expenses by 2.3x, indicating strong unit economics',
        'Consider allocating 5% more resources to highest-converting marketing channels'
      ]
    },
    {
      id: 'market',
      name: 'Market Traction',
      score: 68,
      previousScore: 65,
      benchmark: 72,
      icon: createMarketIcon(),
      color: '#2563EB', // blue-600
      trend: 'up' as const,
      insights: [
        'User acquisition cost decreased by 12% this quarter while retention improved',
        'Your NPS score of 42 is slightly below the industry benchmark of 45',
        'Early adopter engagement is strong but mainstream user conversion needs attention'
      ]
    },
    {
      id: 'team',
      name: 'Team Performance',
      score: 85,
      previousScore: 83,
      benchmark: 70,
      icon: createTeamIcon(),
      color: '#7C3AED', // violet-600
      trend: 'up' as const,
      insights: [
        'Team velocity is 23% above benchmark with consistent sprint completion rates',
        'Consider implementing structured feedback sessions to maintain high performance',
        'Key skill gaps identified in DevOps and data science roles'
      ]
    },
    {
      id: 'product',
      name: 'Product Development',
      score: 79,
      previousScore: 82,
      benchmark: 75,
      icon: createProductIcon(),
      color: '#C026D3', // fuchsia-600
      trend: 'down' as const,
      insights: [
        'Technical debt is increasing and may impact future development velocity',
        'Feature adoption rate is strong at 72% within first 30 days of release',
        'Consider implementing more automated testing to reduce regression issues'
      ]
    },
    {
      id: 'investor',
      name: 'Investor Relations',
      score: 64,
      previousScore: 60,
      benchmark: 68,
      icon: createInvestorIcon(),
      color: '#D97706', // amber-600
      trend: 'up' as const,
      insights: [
        'Investor updates are less frequent than recommended (quarterly vs. monthly)',
        'Your metrics dashboard lacks some key indicators investors typically expect',
        'Consider creating a structured investor relations program with regular touchpoints'
      ]
    }
  ] as HealthDimension[],
  historyData: [
    { date: 'Sep', overall: 65, financial: 70, market: 58, team: 72, product: 68, investor: 55 },
    { date: 'Oct', overall: 68, financial: 73, market: 60, team: 75, product: 72, investor: 56 },
    { date: 'Nov', overall: 70, financial: 75, market: 62, team: 78, product: 75, investor: 58 },
    { date: 'Dec', overall: 72, financial: 78, market: 65, team: 83, product: 82, investor: 60 },
    { date: 'Jan', overall: 74, financial: 80, market: 66, team: 84, product: 81, investor: 62 },
    { date: 'Feb', overall: 72, financial: 79, market: 67, team: 83, product: 79, investor: 63 },
    { date: 'Mar', overall: 76, financial: 82, market: 68, team: 85, product: 79, investor: 64 }
  ] as HistoryDataPoint[]
};
