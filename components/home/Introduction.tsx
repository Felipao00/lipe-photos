'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';

export function Introduction() {
  return (
    <section className="py-24 lg:py-32">
      <Container size="small">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="text-center"
        >
          <h2 className="text-display-2 md:text-display-1 font-light text-text-primary mb-8">
            A natureza em sua
            <br />
            <span className="font-bold">forma mais pura</span>
          </h2>
          
          <Divider variant="fade" className="my-12" />
          
          <p className="text-body-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Cada fotografia é uma janela para momentos efêmeros da natureza. 
            Através das minhas lentes, busco capturar não apenas imagens, 
            mas a essência e a emoção de cada instante vivido em meio à vida selvagem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              number: '25+',
              label: 'Fotografias',
              description: 'Capturadas em expedições por todo o Brasil',
            },
            {
              number: '10',
              label: 'Coleções',
              description: 'De aves a paisagens, cada tema uma jornada',
            },
            {
              number: '15',
              label: 'Destinos',
              description: 'Explorando a biodiversidade brasileira',
            },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-display-2 font-bold text-text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-body-lg font-medium text-text-primary mb-2">
                {stat.label}
              </div>
              <p className="text-body-sm text-text-secondary">
                {stat.description}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}