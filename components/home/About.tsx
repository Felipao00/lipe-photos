'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export function About() {
  return (
    <section className="py-32 lg:py-40">
      <Container size="small">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-xs uppercase tracking-[0.3em] mb-8 font-body"
          >
            Sobre
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display text-text-primary leading-tight mb-10"
          >
            Fotografo o que<br />me atravessa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl mx-auto space-y-6 text-text-secondary leading-relaxed font-light text-lg"
          >
            <p>
              Cada clique é uma tentativa de silenciar o ruído do mundo e ouvir 
              o que a luz tem a dizer. Não persigo a foto perfeita — persigo a foto 
              que me escolhe.
            </p>
            <p>
              Este espaço existe para guardar esses encontros. Sem pressa, sem algoritmo, 
              sem excesso. Apenas o que ficou depois que o obturador fechou.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}