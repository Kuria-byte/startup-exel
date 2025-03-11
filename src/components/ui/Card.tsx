"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function Card({ children, className = '', interactive = false }: CardProps) {
  return (
    <div 
      className={`card ${interactive ? 'card-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between p-5 border-b border-neutral-200">
      <div>
        <h3 className="text-base font-medium text-neutral-900">{title}</h3>
        {subtitle && (
          typeof subtitle === 'string' 
            ? <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>
            : subtitle
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 bg-neutral-50 border-t border-neutral-200 ${className}`}>
      {children}
    </div>
  );
}
