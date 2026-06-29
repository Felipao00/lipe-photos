'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { photos } from '@/data/photos';
import { Container } from '@/components/ui/Container';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <Container size="small">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-xs uppercase tracking-[0.3em] mb-8 font-body"
            >
              Fotografia autoral
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-display font-bold leading-none tracking-tighter text-text-primary mb-8"
            >
              Lipe
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Photos
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-lg md:text-xl text-text-secondary font-light max-w-xl mx-auto leading-relaxed"
            >
              Um olhar particular sobre o mundo.
              <br />
              Fotografias que nascem do silêncio e da observação.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Grid de Fotos */}
      <GalleryGrid photos={photos} />
    </>
  );
}