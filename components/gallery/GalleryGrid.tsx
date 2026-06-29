'use client';

import React from 'react';
import { Photo } from '@/types/photo';
import { Container } from '@/components/ui/Container';
import { motion } from 'framer-motion';

interface GalleryGridProps {
  photos: Photo[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="columns-1 xs:columns-2 sm:columns-2 lg:columns-3 gap-3 space-y-3"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: 'easeOut',
            }}
            className="break-inside-avoid"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-auto object-cover transition-all duration-500 hover:brightness-105"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}