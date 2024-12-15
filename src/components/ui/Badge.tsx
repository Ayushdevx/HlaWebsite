import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'success' | 'warning';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-orange-100 text-orange-800': variant === 'default',
          'bg-gray-100 text-gray-800': variant === 'secondary',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  );
}