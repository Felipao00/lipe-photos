'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Photo } from '@/types/photo';
import { getPhotoUrl } from '@/lib/helpers';
import { getCategoryLabel } from '@/lib/helpers';

interface PhotoCardProps {
  photo: Photo;
  priority?: boolean;
}

export function PhotoCard({ photo, priority = false }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={getPhotoUrl(photo)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="group relative overflow-hidden rounded-lg bg-border/5 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagem */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={photo.image}
            alt={photo.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`
              object-cover transition-all duration-700 ease-out
              ${isHovered ? 'scale-105' : 'scale-100'}
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            priority={priority}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-border/20 animate-pulse" />
          )}
        </div>

        {/* Overlay no hover */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              initial={false}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-body-lg font-semibold text-white mb-1">
                {photo.title}
              </h3>
              <p className="text-body-sm text-white/80">
                {photo.location}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Badge de categoria */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-caption rounded-full">
            {getCategoryLabel(photo.category)}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}