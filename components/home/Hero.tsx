'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background com overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
      </div>

      {/* Conteúdo */}
      <Container className="relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <Camera className="w-6 h-6 text-white/80" />
            <span className="text-white/80 text-body-sm tracking-[0.3em] uppercase">
              Fotografia de Natureza
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-display-1 md:text-[5rem] lg:text-[7rem] font-bold text-white tracking-tight leading-none mb-6"
          >
            LIPE PHOTOS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-body-lg md:text-heading-3 text-white/80 font-light max-w-2xl mx-auto mb-12"
          >
            Momentos únicos registrados através da minha lente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              href="/gallery"
              variant="primary"
              size="lg"
              icon={<ArrowDown className="w-5 h-5" />}
              className="bg-white text-accent hover:bg-white/90"
            >
              Explorar Galeria
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Indicador de rolagem */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-caption tracking-widest uppercase">Rolar</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}