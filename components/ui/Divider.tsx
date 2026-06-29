import React from 'react';
import { cn } from '@/lib/helpers';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'fade';
}

export function Divider({
  className,
  orientation = 'horizontal',
  variant = 'default',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'h-full w-px',
          variant === 'fade'
            ? 'bg-gradient-to-b from-transparent via-border to-transparent'
            : 'bg-border',
          className
        )}
      />
    );
  }

  return (
    <hr
      className={cn(
        'border-0',
        variant === 'fade'
          ? 'h-px bg-gradient-to-r from-transparent via-border to-transparent'
          : 'h-px bg-border',
        className
      )}
    />
  );
}