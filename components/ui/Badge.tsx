import React from 'react';
import { cn } from '@/lib/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'subtle';
  className?: string;
}

const variantClasses = {
  default: 'bg-accent text-white',
  outline: 'border border-border text-text-secondary',
  subtle: 'bg-border/10 text-text-secondary',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-caption font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}