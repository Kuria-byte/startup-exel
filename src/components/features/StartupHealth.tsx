import React from 'react';
import { 
  RiHeartPulseLine, 
  RiMoneyDollarCircleLine, 
  RiUserSearchLine, 
  RiTeamLine, 
  RiCodeLine, 
  RiHandCoinLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiInformationLine,
  RiExternalLinkLine
} from 'react-icons/ri';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

// Types for the Startup Health component
interface HealthDimension {
  id: string;
  name: string;
  score: number;
  previousScore: number;
  benchmark: number;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
  insights: string[];
}

interface StartupHealthProps {
  overallScore: number;
  previousScore: number;
  dimensions: HealthDimension[];
  historyData: {
    date: string;
    overall: number;
    financial: number;
    market: number;
    team: number;
    product: number;
    investor: number;
  }[];
}

const StartupHealth: React.FC<StartupHealthProps> = ({ 
  overallScore, 
  previousScore, 
  dimensions, 
  historyData 
}) => {
  // Calculate score change and determine if it's positive
  const scoreChange = overallScore - previousScore;
  const isPositive = scoreChange >= 0;
  
  // Format the score change as a percentage
  const scoreChangePercent = Math.abs(Math.round(scoreChange / previousScore * 100));
  
  // Prepare data for radar chart
  const radarData = dimensions.map(dim => ({
    dimension: dim.name,
    score: dim.score,
    benchmark: dim.benchmark
  }));
  
  // Get the top 3 insights across all dimensions
  const topInsights = dimensions
    .flatMap(dim => dim.insights.map(insight => ({ dimension: dim.name, text: insight, color: dim.color })))
    .slice(0, 3);
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="p-5 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-primary-100 dark:bg-primary-900/30 p-2.5 rounded-lg mr-4">
              <RiHeartPulseLine className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-neutral-900 dark:text-white">Startup Health</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Overall assessment of your startup's performance</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="text-center mr-6">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">{overallScore}</div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">Health Score</div>
            </div>
            
            <div className={`flex items-center ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isPositive ? (
                <RiArrowUpLine className="w-5 h-5 mr-1" />
              ) : (
                <RiArrowDownLine className="w-5 h-5 mr-1" />
              )}
              <span className="text-lg font-semibold">{scoreChangePercent}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Dimensions */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dimensions.map(dimension => (
                <Card key={dimension.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3`} style={{ backgroundColor: `${dimension.color}20` }}>
                          {dimension.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900 dark:text-white">{dimension.name}</h3>
                          <div className="flex items-center mt-0.5">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400 mr-2">
                              Score: <span className="font-semibold text-neutral-700 dark:text-neutral-300">{dimension.score}</span>
                            </div>
                            <div className={`flex items-center text-xs ${
                              dimension.trend === 'up' 
                                ? 'text-emerald-600 dark:text-emerald-400' 
                                : dimension.trend === 'down' 
                                  ? 'text-rose-600 dark:text-rose-400' 
                                  : 'text-amber-600 dark:text-amber-400'
                            }`}>
                              {dimension.trend === 'up' ? (
                                <RiArrowUpLine className="w-3 h-3 mr-0.5" />
                              ) : dimension.trend === 'down' ? (
                                <RiArrowDownLine className="w-3 h-3 mr-0.5" />
                              ) : null}
                              <span>{Math.abs(dimension.score - dimension.previousScore)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative h-12 w-12">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-sm font-semibold">{dimension.score}</div>
                        </div>
                        <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                          {/* Background circle */}
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="3"
                            className="dark:stroke-neutral-700"
                          />
                          {/* Foreground circle */}
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={dimension.color}
                            strokeWidth="3"
                            strokeDasharray={`${dimension.score}, 100`}
                          />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm">
                      <div className="text-neutral-500 dark:text-neutral-400 mb-1">
                        <span className="font-medium">Benchmark:</span> {dimension.benchmark}
                      </div>
                      {dimension.insights.length > 0 && (
                        <div className="text-neutral-700 dark:text-neutral-300 mt-2">
                          <div className="font-medium mb-1">Key Insight:</div>
                          <p className="text-xs">{dimension.insights[0]}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Right Column - Charts and Insights */}
          <div>
            <div className="mb-5">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Health Score Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historyData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10 }} 
                      stroke="#9CA3AF" 
                      className="dark:stroke-neutral-500" 
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 10 }} 
                      stroke="#9CA3AF" 
                      className="dark:stroke-neutral-500" 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="overall" 
                      stroke="#6366F1" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mb-5">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Dimension Comparison</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={70} data={radarData}>
                    <PolarGrid stroke="#E5E7EB" className="dark:stroke-neutral-700" />
                    <PolarAngleAxis 
                      dataKey="dimension" 
                      tick={{ fontSize: 9 }} 
                      stroke="#9CA3AF" 
                      className="dark:stroke-neutral-500" 
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fontSize: 9 }} 
                      stroke="#9CA3AF" 
                      className="dark:stroke-neutral-500" 
                    />
                    <Radar 
                      name="Your Score" 
                      dataKey="score" 
                      stroke="#6366F1" 
                      fill="#6366F1" 
                      fillOpacity={0.5} 
                    />
                    <Radar 
                      name="Benchmark" 
                      dataKey="benchmark" 
                      stroke="#94A3B8" 
                      fill="#94A3B8" 
                      fillOpacity={0.3} 
                    />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Top Insights</h3>
              <div className="space-y-3">
                {topInsights.map((insight, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs"
                  >
                    <div className="flex items-center mb-1">
                      <RiInformationLine className="w-4 h-4 mr-1.5" style={{ color: insight.color }} />
                      <span className="font-medium" style={{ color: insight.color }}>{insight.dimension}</span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-800/80 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-center">
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Last updated: March 11, 2025
          </div>
          <button className="flex items-center text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            <span>View detailed report</span>
            <RiExternalLinkLine className="ml-1 w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupHealth;
