'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import { Photo } from '@/types/photo';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { getCategoryLabel } from '@/lib/helpers';
import { formatDate } from '@/utils/formatDate';

interface PhotoDetailsProps {
  photo: Photo;
}

export function PhotoDetails({ photo }: PhotoDetailsProps) {
  return (
    <section className="py-12 lg:py-20">
      <Container size="small">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="subtle">
              {getCategoryLabel(photo.category)}
            </Badge>
          </div>

          <h1 className="text-display-2 lg:text-display-1 font-bold text-text-primary mb-6">
            {photo.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-body-sm text-text-secondary mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {photo.location}, {photo.city}, {photo.state}, {photo.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(photo.date)}</span>
            </div>
          </div>

          <p className="text-body-lg text-text-secondary leading-relaxed mb-8">
            {photo.description}
          </p>

          <Divider className="my-8" />

          <div className="prose prose-lg max-w-none">
            <h2 className="text-heading-2 font-semibold text-text-primary mb-4">
              A História por Trás da Foto
            </h2>
            <p className="text-body-base text-text-secondary leading-relaxed">
              {photo.story}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}