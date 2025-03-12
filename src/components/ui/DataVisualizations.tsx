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
      className={`relative bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 transition-all duration-200 hover:shadow-md ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{title}</p>
          <p className="text-2xl font-display font-semibold dark:text-white">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 text-sm ${change.isPositive ? 'text-success-600 dark:text-success-500' : 'text-error-600 dark:text-error-500'}`}>
              {change.isPositive ? <RiArrowUpLine className="mr-1" /> : <RiArrowDownLine className="mr-1" />}
              <span>{change.value}%</span>
            </div>
          )}
        </div>
        {icon && <div className="text-neutral-600 dark:text-neutral-400">{icon}</div>}
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
        <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-700">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{trend.description}</p>
          {trend.benchmark && (
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">{trend.benchmark}</p>
          )}
        </div>
      )}
      
      {industry && (
        <div className="mt-2 flex items-center">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 mr-1">Industry avg: {industry.value}</span>
          <span className="text-xs font-medium" style={{ color: industry.comparison.includes('above') ? '#10b981' : industry.comparison.includes('below') ? '#ef4444' : '#6b7280' }}>
            {industry.comparison}
          </span>
        </div>
      )}
      
      {actionable && (
        <div className="mt-2 relative">
          <div 
            className="flex items-center text-xs text-primary-600 dark:text-primary-500 font-medium cursor-pointer"
            onMouseEnter={() => setShowActionTip(true)}
            onMouseLeave={() => setShowActionTip(false)}
          >
            <RiQuestionLine className="mr-1" />
            <span>What should I do?</span>
          </div>
          
          {showActionTip && (
            <div className="absolute left-0 right-0 bottom-full mb-2 z-10">
              <div className="bg-primary-900 dark:bg-primary-800 text-white text-sm rounded-lg p-3 shadow-lg">
                <p>{actionable.text}</p>
                {actionable.link && (
                  <a href={actionable.link} className="flex items-center mt-2 text-primary-300 dark:text-primary-400 text-xs hover:text-primary-200 dark:hover:text-primary-300">
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
          <div className="bg-neutral-900 dark:bg-neutral-800 text-white text-sm rounded-lg p-3 shadow-lg mx-4">
            <p>{trend.description}</p>
            {trend.benchmark && (
              <p className="mt-1 text-neutral-300 dark:text-neutral-400 text-xs">{trend.benchmark}</p>
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
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />}
          {showXAxis && <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            tickLine={false}
            style={{ 
              fontSize: '12px',
              fill: 'var(--tw-text-opacity, 1) var(--tw-text-neutral-500, #6b7280)'
            }}
          />}
          {showYAxis && <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false}
            style={{ 
              fontSize: '12px',
              fill: 'var(--tw-text-opacity, 1) var(--tw-text-neutral-500, #6b7280)'
            }}
          />}
          {showTooltip && <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--tw-bg-opacity, 1) var(--tw-bg-white, #ffffff)',
              borderColor: 'var(--tw-border-opacity, 1) var(--tw-border-neutral-200, #e5e7eb)',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              color: 'var(--tw-text-opacity, 1) var(--tw-text-neutral-900, #111827)'
            }}
            itemStyle={{ color: color }}
          />}
          <defs>
            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            fillOpacity={1} 
            fill={`url(#color${dataKey})`}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          {includeForecast && (
            <Area 
              type="monotone" 
              dataKey="forecast" 
              stroke={color} 
              strokeDasharray="5 5"
              fillOpacity={0.2}
              fill={`url(#color${dataKey})`}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
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
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" vertical={false} />}
          {showXAxis && <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            tickLine={false}
            style={{ 
              fontSize: '12px',
              fill: 'var(--tw-text-opacity, 1) var(--tw-text-neutral-500, #6b7280)'
            }}
          />}
          {showYAxis && <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false}
            style={{ 
              fontSize: '12px',
              fill: 'var(--tw-text-opacity, 1) var(--tw-text-neutral-500, #6b7280)'
            }}
          />}
          {showTooltip && <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--tw-bg-opacity, 1) var(--tw-bg-white, #ffffff)',
              borderColor: 'var(--tw-border-opacity, 1) var(--tw-border-neutral-200, #e5e7eb)',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              color: 'var(--tw-text-opacity, 1) var(--tw-text-neutral-900, #111827)'
            }}
            itemStyle={{ color: color }}
          />}
          <Bar 
            dataKey={dataKey} 
            fill={color}
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
          {includeForecast && (
            <Bar 
              dataKey="forecast" 
              fill={color}
              fillOpacity={0.3}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
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
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{entry.name}</span>
              </div>
            ))}
          </div>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};
