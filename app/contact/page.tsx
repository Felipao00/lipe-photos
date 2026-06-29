'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export default function ContactPage() {
  return (
    <section className="py-20 lg:py-32">
      <Container size="small">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-text-muted text-xs uppercase tracking-[0.3em] mb-12 font-body text-center">
            Contato
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-12 text-center leading-tight">
            Vamos<br />conversar
          </h1>

          <div className="max-w-lg mx-auto space-y-8 text-center">
            <p className="text-text-secondary leading-relaxed font-light text-lg">
              Se você quer trocar ideia sobre fotografia, propor algum projeto 
              ou só dizer oi, me manda uma mensagem.
            </p>

            <div className="space-y-3 pt-8">
              <a
                href="mailto:lipe@email.com"
                className="block text-2xl font-display text-text-primary hover:text-text-secondary transition-colors"
              >
                lipe@email.com
              </a>
              <a
                href="https://instagram.com/lipephotos"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-muted hover:text-text-secondary transition-colors font-body"
              >
                @lipephotos
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}