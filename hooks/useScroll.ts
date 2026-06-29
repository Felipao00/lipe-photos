'use client';

import { useState, useEffect } from 'react';

interface ScrollState {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isScrolled: boolean;
  isScrollingUp: boolean;
}

export function useScroll(threshold: number = 50): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollDirection: 'down',
    isScrolled: false,
    isScrollingUp: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollState({
        scrollY: currentScrollY,
        scrollDirection: direction,
        isScrolled: currentScrollY > threshold,
        isScrollingUp: direction === 'up',
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
}