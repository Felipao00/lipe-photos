'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Photo } from '@/types/photo';
import { Container } from '@/components/ui/Container';
import { getPhotoUrl } from '@/lib/helpers';

interface RelatedPhotosProps {
  photos: Photo[];
}

export function RelatedPhotos({ photos }: RelatedPhotosProps) {
  if (photos.length === 0) return null;

  return (
    <section className="py-12 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-heading-2 font-semibold text-text-primary mb-8">
            Fotografias Relacionadas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <Link key={photo.id} href={getPhotoUrl(photo)}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-border/5 mb-3">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-body-sm font-medium text-text-primary group-hover:text-text-secondary transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-caption text-text-muted mt-1">
                    {photo.location}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}