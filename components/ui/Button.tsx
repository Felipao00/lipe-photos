import React from 'react';
import { cn } from '@/lib/helpers';
import Link from 'next/link';

interface ButtonBaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

interface ButtonAsButton extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses = {
  primary:
    'bg-accent text-white hover:bg-accent/90 active:bg-accent/80',
  secondary:
    'border border-border text-text-primary hover:bg-border/10 active:bg-border/20',
  ghost:
    'text-text-primary hover:bg-border/10 active:bg-border/20',
  link: 'text-text-primary underline-offset-4 hover:underline',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-base',
  lg: 'px-8 py-4 text-body-lg',
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    ...rest
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ('href' in props && props.href) {
    const { href, external, ...linkProps } = props as ButtonAsLink;
    
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(linkProps as any)}
        >
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...(linkProps as any)}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  
  return (
    <button className={classes} {...buttonProps}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}