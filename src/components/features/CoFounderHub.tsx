"use client";

import React, { useState } from 'react';
import { 
  RiCodeSSlashLine, 
  RiMoneyDollarCircleLine, 
  RiUserVoiceLine, 
  RiScales3Line,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiLightbulbLine,
  RiSearchLine,
  RiCloseLine
} from 'react-icons/ri';
import AIAssistant from './AIAssistant';

// Match the AssistantType from AIAssistant
type AssistantType = 'General' | 'CTO' | 'CFO' | 'CMO' | 'Legal';
type CoFounderType = AssistantType | 'Overview';

interface CoFounder {
  id: AssistantType;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  lightColor: string;
  borderColor: string;
  capabilities: string[];
  insights: string[];
}

interface CoFounderHubProps {
  className?: string;
  initialActiveTab?: CoFounderType;
}

export default function CoFounderHub({ 
  className = '',
  initialActiveTab = 'Overview'
}: CoFounderHubProps) {
  const [activeTab, setActiveTab] = useState<CoFounderType>(initialActiveTab);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Define the co-founder types and their properties
  const coFounders: CoFounder[] = [
    {
      id: 'CTO',
      title: 'AI-CTO',
      description: 'Technical planning & development',
      icon: <RiCodeSSlashLine className="w-5 h-5" />,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      capabilities: [
        'Generate technical specifications',
        'Create MVP roadmaps',
        'Analyze tech stack options',
        'Draft developer job descriptions',
        'Estimate development timelines'
      ],
      insights: [
        'Your tech stack is well-suited for your current scale',
        'Consider adding automated testing to improve code quality',
        'Your MVP could be simplified to launch 3 weeks earlier'
      ]
    },
    {
      id: 'CFO',
      title: 'AI-CFO',
      description: 'Financial strategy & funding',
      icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
      color: 'bg-emerald-600',
      lightColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      capabilities: [
        'Create financial projections',
        'Analyze burn rate and runway',
        'Prepare investor materials',
        'Optimize cost structure',
        'Model pricing strategies'
      ],
      insights: [
        'Your current burn rate will deplete runway in 8 months',
        'Increasing prices by 15% could extend runway by 2 months',
        'Consider applying for the TechStars accelerator program'
      ]
    },
    {
      id: 'CMO',
      title: 'AI-CMO',
      description: 'Marketing & user acquisition',
      icon: <RiUserVoiceLine className="w-5 h-5" />,
      color: 'bg-pink-600',
      lightColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      capabilities: [
        'Design marketing campaigns',
        'Analyze user acquisition channels',
        'Optimize conversion funnels',
        'Create content strategies',
        'Analyze competitor positioning'
      ],
      insights: [
        'Your conversion rate is 15% below industry average',
        'Focus on customer testimonials to build trust',
        'LinkedIn outperforms other channels for your audience'
      ]
    },
    {
      id: 'Legal',
      title: 'AI-Legal',
      description: 'Contracts & compliance',
      icon: <RiScales3Line className="w-5 h-5" />,
      color: 'bg-purple-600',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      capabilities: [
        'Draft standard contracts',
        'Create compliance checklists',
        'Review terms of service',
        'Prepare privacy policies',
        'Outline IP protection strategies'
      ],
      insights: [
        'Your Terms of Service needs updating for GDPR compliance',
        'Consider filing a provisional patent for your core algorithm',
        'Your contractor agreements should include IP assignment clauses'
      ]
    }
  ];

  // Find the active co-founder
  const activeCoFounder = coFounders.find(cf => cf.id === activeTab);

  // Filter co-founders based on search query
  const filteredCoFounders = searchQuery 
    ? coFounders.filter(cf => 
        cf.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cf.capabilities.some(cap => cap.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : coFounders;

  const renderOverviewTab = () => (
    <div className="p-4">
      <h3 className="text-lg font-medium text-neutral-900 mb-4">Intelligent Co-Founder Hub</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {coFounders.map(coFounder => (
          <button
            key={coFounder.id}
            className={`flex items-start p-4 rounded-xl ${coFounder.lightColor} ${coFounder.borderColor} border transition-all hover:shadow-md`}
            onClick={() => setActiveTab(coFounder.id)}
          >
            <div className={`w-10 h-10 rounded-full ${coFounder.color} flex items-center justify-center text-white mr-3 flex-shrink-0`}>
              {coFounder.icon}
            </div>
            <div className="text-left">
              <h4 className="font-medium text-neutral-900">{coFounder.title}</h4>
              <p className="text-sm text-neutral-600 mb-2">{coFounder.description}</p>
              <div className="flex items-center text-xs text-primary-600">
                <span>View capabilities</span>
                <RiArrowRightSLine className="ml-1" />
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <RiLightbulbLine className="text-primary-600 w-5 h-5 mr-2" />
            <h4 className="font-medium text-neutral-900">Recent AI Insights</h4>
          </div>
          <button className="text-xs text-primary-600 flex items-center">
            <span>View all insights</span>
            <RiArrowRightLine className="ml-1 w-3 h-3" />
          </button>
        </div>
        
        <div className="space-y-3">
          {coFounders.flatMap(cf => cf.insights.slice(0, 1).map((insight, idx) => (
            <div key={`${cf.id}-${idx}`} className="flex items-start p-3 bg-white rounded-lg border border-neutral-100 hover:shadow-sm transition-shadow">
              <div className={`w-8 h-8 rounded-full ${cf.color} flex items-center justify-center text-white mr-2 flex-shrink-0`}>
                {cf.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-700">{insight}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-primary-600 mr-3 cursor-pointer hover:underline flex items-center">
                    <span>Take action</span>
                    <RiArrowRightLine className="ml-1 w-3 h-3" />
                  </span>
                  <span className="text-xs text-neutral-500">
                    From {cf.title}
                  </span>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );

  const renderCoFounderTab = (coFounder: CoFounder) => (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 rounded-full ${coFounder.color} flex items-center justify-center text-white mr-3`}>
          {coFounder.icon}
        </div>
        <div>
          <h3 className="font-medium text-neutral-900">{coFounder.title}</h3>
          <p className="text-sm text-neutral-600">{coFounder.description}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">Capabilities</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {coFounder.capabilities.map((capability: string, idx: number) => (
            <div 
              key={idx} 
              className="flex items-center p-2 rounded-lg hover:bg-neutral-50 cursor-pointer"
            >
              <RiArrowRightSLine className="text-primary-600 mr-2 flex-shrink-0" />
              <span className="text-sm">{capability}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-700 mb-2">Recent Insights</h4>
        <div className="space-y-3">
          {coFounder.insights.map((insight: string, idx: number) => (
            <div 
              key={idx} 
              className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start">
                <RiLightbulbLine className="text-primary-600 w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm">{insight}</p>
                  <button className="text-xs text-primary-600 mt-2 flex items-center">
                    <span>Take action</span>
                    <RiArrowRightLine className="ml-1 w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        {/* Pass the AssistantType directly */}
        <AIAssistant type={coFounder.id as AssistantType} showInCard={false} />
      </div>
    </div>
  );

  return (
    <div className={`bg-white rounded-xl border border-neutral-200 overflow-hidden ${className}`}>
      {/* Header with tabs */}
      <div className="border-b border-neutral-200">
        <div className="flex items-center px-4 py-3 justify-between">
          <h3 className="font-medium text-neutral-900">Intelligent Co-Founder Hub</h3>
          <div className="flex items-center">
            <div className="relative mr-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities..."
                className="pl-8 pr-2 py-1 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
              <RiSearchLine className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <RiCloseLine className="w-4 h-4" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-sm btn-ghost"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide">
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'Overview' 
                ? 'text-primary-600 border-b-2 border-primary-600' 
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
            }`}
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </button>
          
          {coFounders.map(coFounder => (
            <button
              key={coFounder.id}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                activeTab === coFounder.id 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
              onClick={() => setActiveTab(coFounder.id)}
            >
              {coFounder.title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className={isExpanded ? 'max-h-[800px] overflow-y-auto' : 'max-h-[500px] overflow-y-auto'}>
        {activeTab === 'Overview' 
          ? renderOverviewTab() 
          : activeCoFounder 
            ? renderCoFounderTab(activeCoFounder) 
            : null
        }
      </div>
    </div>
  );
}
