'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/helpers';
import { PhotoCategory } from '@/types/photo';
import { CATEGORY_LABELS } from '@/lib/constants';

interface GalleryFilterProps {
  selectedCategory: PhotoCategory | 'all';
  onSelectCategory: (category: PhotoCategory | 'all') => void;
  categories: (PhotoCategory | 'all')[];
}

export function GalleryFilter({
  selectedCategory,
  onSelectCategory,
  categories,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-300',
            selectedCategory === category
              ? 'bg-accent text-white shadow-lg'
              : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-text-primary'
          )}
        >
          {category === 'all' ? 'Todas' : CATEGORY_LABELS[category]}
        </motion.button>
      ))}
    </div>
  );
}