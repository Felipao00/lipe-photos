'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/helpers';
import { mainNavigation } from '@/data/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {mainNavigation.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-4 py-2 text-body-sm font-medium transition-colors duration-300',
              'hover:text-text-primary',
              isActive ? 'text-text-primary' : 'text-text-secondary'
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}