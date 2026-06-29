'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Collection } from '@/types/collection';
import { Container } from '@/components/ui/Container';

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export function CollectionCard({ collection, index }: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/collections#${collection.slug}`}>
        <div className="group cursor-pointer">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-border/5 mb-6">
            <Image
              src={collection.coverImage}
              alt={collection.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-white/90 text-caption font-medium bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  {collection.photoCount} fotos
                </span>
              </div>
              <motion.div
                whileHover={{ x: 4 }}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </div>

          <h3 className="text-heading-3 font-semibold text-text-primary mb-2 group-hover:text-text-secondary transition-colors">
            {collection.title}
          </h3>
          <p className="text-body-base text-text-secondary leading-relaxed">
            {collection.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}