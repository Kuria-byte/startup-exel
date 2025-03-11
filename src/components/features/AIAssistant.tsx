"use client";

import React, { useState } from 'react';
import { 
  RiRobot2Line, 
  RiSendPlaneLine, 
  RiCloseLine, 
  RiArrowRightSLine,
  RiCodeSSlashLine,
  RiMoneyDollarCircleLine,
  RiUserVoiceLine,
  RiScales3Line
} from 'react-icons/ri';

type AssistantType = 'General' | 'CTO' | 'CFO' | 'CMO' | 'Legal';

interface AIAssistantProps {
  type?: AssistantType;
  initialMessage?: string;
  className?: string;
  showInCard?: boolean;
  contextualTrigger?: string;
  compact?: boolean;
}

export default function AIAssistant({
  type = 'General',
  initialMessage = "Hi, I'm your AI assistant. How can I help you today?",
  className = '',
  showInCard = true,
  contextualTrigger,
  compact = false
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<AssistantType>(type);

  const getAssistantIcon = (assistantType: AssistantType) => {
    switch (assistantType) {
      case 'CTO':
        return <RiCodeSSlashLine className="w-5 h-5" />;
      case 'CFO':
        return <RiMoneyDollarCircleLine className="w-5 h-5" />;
      case 'CMO':
        return <RiUserVoiceLine className="w-5 h-5" />;
      case 'Legal':
        return <RiScales3Line className="w-5 h-5" />;
      default:
        return <RiRobot2Line className="w-5 h-5" />;
    }
  };

  const getAssistantColor = (assistantType: AssistantType) => {
    switch (assistantType) {
      case 'CTO':
        return 'bg-blue-600';
      case 'CFO':
        return 'bg-emerald-600';
      case 'CMO':
        return 'bg-pink-600';
      case 'Legal':
        return 'bg-purple-600';
      default:
        return 'bg-primary-600';
    }
  };

  const getAssistantTitle = (assistantType: AssistantType) => {
    switch (assistantType) {
      case 'CTO':
        return 'AI-CTO';
      case 'CFO':
        return 'AI-CFO';
      case 'CMO':
        return 'AI-CMO';
      case 'Legal':
        return 'AI-Legal';
      default:
        return 'Exel Assistant';
    }
  };

  const getAssistantMessage = (assistantType: AssistantType) => {
    if (initialMessage) return initialMessage;
    
    switch (assistantType) {
      case 'CTO':
        return "I can help with technical planning, MVP roadmaps, and development team hiring. What do you need?";
      case 'CFO':
        return "Need help with financial projections, burn rate analysis, or investor materials?";
      case 'CMO':
        return "I can assist with marketing strategy, user acquisition, and conversion optimization. What's your focus?";
      case 'Legal':
        return "I can help draft contracts, review terms, or create compliance checklists. What do you need?";
      default:
        return "Hi, I'm your AI assistant. How can I help you today?";
    }
  };

  const getAssistantCapabilities = (assistantType: AssistantType) => {
    switch (assistantType) {
      case 'CTO':
        return [
          "Generate technical specifications",
          "Create MVP roadmaps",
          "Analyze tech stack options",
          "Draft developer job descriptions",
          "Estimate development timelines"
        ];
      case 'CFO':
        return [
          "Create financial projections",
          "Analyze burn rate and runway",
          "Prepare investor materials",
          "Optimize cost structure",
          "Model pricing strategies"
        ];
      case 'CMO':
        return [
          "Design marketing campaigns",
          "Analyze user acquisition channels",
          "Optimize conversion funnels",
          "Create content strategies",
          "Analyze competitor positioning"
        ];
      case 'Legal':
        return [
          "Draft standard contracts",
          "Create compliance checklists",
          "Review terms of service",
          "Prepare privacy policies",
          "Outline IP protection strategies"
        ];
      default:
        return [
          "Answer startup questions",
          "Provide strategic guidance",
          "Connect you with specialized AI co-founders",
          "Analyze your current metrics",
          "Suggest next steps for your journey"
        ];
    }
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header with tabs */}
        <div className="flex flex-col border-b border-neutral-200">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${getAssistantColor(activeTab)} flex items-center justify-center text-white mr-2`}>
                {getAssistantIcon(activeTab)}
              </div>
              <h3 className="font-medium">{getAssistantTitle(activeTab)}</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <RiCloseLine className="w-5 h-5" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {(['General', 'CTO', 'CFO', 'CMO', 'Legal'] as AssistantType[]).map((tabType) => (
              <button
                key={tabType}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                  activeTab === tabType 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
                onClick={() => setActiveTab(tabType)}
              >
                {getAssistantTitle(tabType)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chat content */}
        <div className="flex-1 p-4 overflow-y-auto bg-neutral-50">
          <div className="flex items-start mb-4">
            <div className={`w-8 h-8 rounded-full ${getAssistantColor(activeTab)} flex-shrink-0 flex items-center justify-center text-white mr-2`}>
              {getAssistantIcon(activeTab)}
            </div>
            <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm border border-neutral-200 max-w-[85%]">
              <p className="text-sm">{getAssistantMessage(activeTab)}</p>
              
              {contextualTrigger && (
                <div className="mt-2 pt-2 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500">{contextualTrigger}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Capabilities */}
          <div className="mb-4 bg-white rounded-lg p-3 shadow-sm border border-neutral-200">
            <p className="text-xs text-neutral-500 mb-2">I can help you with:</p>
            <div className="space-y-1">
              {getAssistantCapabilities(activeTab).map((capability, index) => (
                <div 
                  key={index}
                  className="flex items-center text-sm hover:bg-neutral-50 p-1 rounded cursor-pointer"
                >
                  <RiArrowRightSLine className="text-primary-500 mr-1 flex-shrink-0" />
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-neutral-200 p-3">
          <div className="flex items-center bg-white rounded-lg border border-neutral-300 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Ask ${getAssistantTitle(activeTab)}...`}
              className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
            />
            <button 
              className="p-2 text-primary-600 hover:text-primary-700"
              disabled={!message.trim()}
            >
              <RiSendPlaneLine className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (showInCard) {
    return (
      <div className={`bg-white rounded-xl border border-neutral-200 overflow-hidden ${className}`}>
        {isOpen ? (
          renderContent()
        ) : (
          <div className="p-4">
            <div className="flex items-start">
              <div className={`w-10 h-10 rounded-full ${getAssistantColor(type)} flex items-center justify-center text-white mr-3`}>
                {getAssistantIcon(type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900">{getAssistantTitle(type)}</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {type === 'General' ? 'General startup guidance' : `AI-powered ${type} assistance`}
                </p>
                <button 
                  onClick={() => setIsOpen(true)}
                  className="btn btn-sm btn-primary mt-3"
                >
                  Ask a question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-xl border border-neutral-200 w-80 h-96 flex flex-col overflow-hidden">
          {renderContent()}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`${getAssistantColor(type)} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
        >
          {getAssistantIcon(type)}
        </button>
      )}
    </div>
  );
}
