"use client";

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ReferenceLine
} from 'recharts';
import { 
  RiArrowUpLine, 
  RiArrowDownLine, 
  RiInformationLine, 
  RiQuestionLine,
  RiExternalLinkLine
} from 'react-icons/ri';

interface MetricCardProps {
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
  industry?: {
    value: string;
    comparison: string;
  };
  actionable?: {
    text: string;
    link?: string;
  };
  miniChart?: {
    data: { value: number }[];
    color: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  industry,
  actionable,
  miniChart,
  icon,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showActionTip, setShowActionTip] = useState(false);

  return (
    <div
      className={`relative bg-white rounded-xl p-4 border border-neutral-200 transition-all duration-200 hover:shadow-md ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-600 mb-1">{title}</p>
          <p className="text-2xl font-display font-semibold">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 text-sm ${change.isPositive ? 'text-success-600' : 'text-error-600'}`}>
              {change.isPositive ? <RiArrowUpLine className="mr-1" /> : <RiArrowDownLine className="mr-1" />}
              <span>{change.value}%</span>
            </div>
          )}
        </div>
        {icon && <div className="text-neutral-600">{icon}</div>}
      </div>
      
      {miniChart && (
        <div className="mt-2 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={miniChart.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={miniChart.color} 
                strokeWidth={1.5} 
                dot={false} 
                isAnimationActive={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {trend && (
        <div className="mt-2 pt-2 border-t border-neutral-100">
          <p className="text-xs text-neutral-500">{trend.description}</p>
          {trend.benchmark && (
            <p className="text-xs text-neutral-400 mt-1">{trend.benchmark}</p>
          )}
        </div>
      )}
      
      {industry && (
        <div className="mt-2 flex items-center">
          <span className="text-xs text-neutral-500 mr-1">Industry avg: {industry.value}</span>
          <span className="text-xs font-medium" style={{ color: industry.comparison.includes('above') ? '#10b981' : industry.comparison.includes('below') ? '#ef4444' : '#6b7280' }}>
            {industry.comparison}
          </span>
        </div>
      )}
      
      {actionable && (
        <div className="mt-2 relative">
          <div 
            className="flex items-center text-xs text-primary-600 font-medium cursor-pointer"
            onMouseEnter={() => setShowActionTip(true)}
            onMouseLeave={() => setShowActionTip(false)}
          >
            <RiQuestionLine className="mr-1" />
            <span>What should I do?</span>
          </div>
          
          {showActionTip && (
            <div className="absolute left-0 right-0 bottom-full mb-2 z-10">
              <div className="bg-primary-900 text-white text-sm rounded-lg p-3 shadow-lg">
                <p>{actionable.text}</p>
                {actionable.link && (
                  <a href={actionable.link} className="flex items-center mt-2 text-primary-300 text-xs hover:text-primary-200">
                    <span>Learn more</span>
                    <RiExternalLinkLine className="ml-1" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {trend && showTooltip && !showActionTip && (
        <div className="absolute left-0 right-0 bottom-full mb-2 z-10">
          <div className="bg-neutral-900 text-white text-sm rounded-lg p-3 shadow-lg mx-4">
            <p>{trend.description}</p>
            {trend.benchmark && (
              <p className="mt-1 text-neutral-300 text-xs">{trend.benchmark}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface DataPoint {
  name: string;
  value: number;
  isForecast?: boolean;
  [key: string]: any; // Allow additional properties
}

interface ChartProps {
  data: DataPoint[];
  dataKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  includeForecast?: boolean;
}

interface PieChartDataPoint extends DataPoint {
  color: string;
}

interface PieChartProps extends Omit<ChartProps, 'data' | 'dataKey'> {
  data: PieChartDataPoint[];
}

export const AreaChartComponent: React.FC<ChartProps> = ({
  data,
  dataKey,
  color = '#3b82f6',
  height = 200,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  includeForecast = false,
}) => {
  const combinedData = includeForecast ? [
    ...data,
    ...data.slice(-3).map((item, index) => ({
      ...item,
      [dataKey]: Math.round(item[dataKey] * (1 + 0.1 * (index + 1))),
      isForecast: true
    }))
  ] : data;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        {showXAxis && <XAxis dataKey="name" stroke="#9ca3af" />}
        {showYAxis && <YAxis stroke="#9ca3af" />}
        {showTooltip && <Tooltip />}
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.01}/>
          </linearGradient>
        </defs>
        {combinedData.map((entry, index) => (
          <Area
            key={`area-${index}`}
            type="monotone"
            dataKey={dataKey}
            data={[entry]}
            stroke={color}
            fill="url(#colorGradient)"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
            strokeDasharray={entry.isForecast ? "5 5" : "0"}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const BarChartComponent: React.FC<ChartProps> = ({
  data,
  dataKey,
  color = '#3b82f6',
  height = 200,
  showGrid = true,
  showXAxis = true,
  showYAxis = true,
  showTooltip = true,
  includeForecast = false,
}) => {
  const combinedData = includeForecast ? [
    ...data,
    ...data.slice(-3).map((item, index) => ({
      ...item,
      [dataKey]: Math.round(item[dataKey] * (1 + 0.1 * (index + 1))),
      isForecast: true
    }))
  ] : data;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
        {showXAxis && <XAxis dataKey="name" stroke="#9ca3af" />}
        {showYAxis && <YAxis stroke="#9ca3af" />}
        {showTooltip && <Tooltip />}
        {combinedData.map((entry, index) => (
          <Bar
            key={`bar-${index}`}
            dataKey={dataKey}
            data={[entry]}
            fill={color}
            opacity={entry.isForecast ? 0.5 : 1}
            strokeDasharray={entry.isForecast ? "5 5" : "0"}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  height = 200,
  showLegend = false,
  showTooltip = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        {showTooltip && <Tooltip />}
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {showLegend && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-neutral-600">{entry.name}</span>
              </div>
            ))}
          </div>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};
