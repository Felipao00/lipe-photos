'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { AdminPanel } from '@/components/admin/AdminPanel';

export default function HomePage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [aboutText, setAboutText] = useState('');
  const [musicFile, setMusicFile] = useState('/audio/musica.mp3');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/data');
      const data = await res.json();
      setPhotos(data.photos || []);
      setAboutText(data.about || '');
      setMusicFile(data.music || '/audio/musica.mp3');
    } catch {}
  };

  const handlePhotoUpload = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'photo');
    const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const { url } = await uploadRes.json();

    const newPhoto = {
      id: Date.now().toString(),
      slug: file.name,
      title: title || file.name,
      image: url,
      date: new Date().toISOString(),
    };

    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photo: newPhoto }),
    });
    loadData();
  };

  const handlePhotoDelete = async (id: string) => {
    await fetch('/api/admin/data', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadData();
  };

  const handleAboutSave = async (text: string) => {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ about: text }),
    });
    setAboutText(text);
  };

  const handleMusicUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'audio');
    const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    const { url } = await uploadRes.json();

    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ music: url }),
    });
    setMusicFile(url);
  };

const handleLogoUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'photo');
  const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  const { url } = await uploadRes.json();

  await fetch('/api/admin/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logo: url }),
  });
  
  window.location.reload();
};

  return (
    <>
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <Container size="small">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-display font-bold leading-none tracking-tighter text-text-primary mb-8"
            >
              Lipe<br />
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
                Photos
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-lg md:text-xl text-text-secondary font-light max-w-xl mx-auto leading-relaxed"
            >
              Um olhar particular sobre o mundo.<br />
              Fotografias que nascem do silêncio e da observação.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <GalleryGrid photos={photos} />

      {/* Painel Admin - só você vê o botão */}
      <AdminPanel
        photos={photos}
        aboutText={aboutText}
        musicFile={musicFile}
        logoUrl=""
        onPhotoUpload={handlePhotoUpload}
        onPhotoDelete={handlePhotoDelete}
        onAboutSave={handleAboutSave}
        onMusicUpload={handleMusicUpload}
        onLogoUpload={handleLogoUpload}
      />
    </>
  );
}