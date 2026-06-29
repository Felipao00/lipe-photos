'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Aperture, Timer, Sun, Maximize } from 'lucide-react';
import { Photo } from '@/types/photo';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';

interface CameraInfoProps {
  photo: Photo;
}

const specs = [
  { icon: Camera, label: 'Câmera', value: 'camera' },
  { icon: Maximize, label: 'Lente', value: 'lens' },
  { icon: Sun, label: 'ISO', value: 'iso' },
  { icon: Timer, label: 'Velocidade', value: 'shutter' },
  { icon: Aperture, label: 'Abertura', value: 'aperture' },
  { icon: Maximize, label: 'Distância Focal', value: 'focalLength' },
] as const;

export function CameraInfo({ photo }: CameraInfoProps) {
  return (
    <section className="py-12 lg:py-20 bg-border/5">
      <Container size="small">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-heading-2 font-semibold text-text-primary mb-8">
            Equipamento & Configurações
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="p-6 bg-surface rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-text-secondary" />
                  <span className="text-caption text-text-muted uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <p className="text-body-base font-medium text-text-primary">
                  {String(photo[value])}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}