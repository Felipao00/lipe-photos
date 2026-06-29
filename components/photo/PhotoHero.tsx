'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Photo } from '@/types/photo';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { getCategoryLabel } from '@/lib/helpers';

interface PhotoHeroProps {
  photo: Photo;
}

export function PhotoHero({ photo }: PhotoHeroProps) {
  return (
    <section className="relative pt-20 lg:pt-24">
      <Container size="large">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-border/5"
        >
          <div className="relative aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              priority
              sizes="100vw"
              className="object-contain"
              quality={100}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}