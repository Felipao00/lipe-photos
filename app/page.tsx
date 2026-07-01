'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [aboutText, setAboutText] = useState('');
  const [musicFile, setMusicFile] = useState('/audio/musica.mp3');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from('site_data')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (data) {
      setPhotos(data.photos || []);
      setAboutText(data.about || '');
      setMusicFile(data.music || '/audio/musica.mp3');
      setLogoUrl(data.logo || '');
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    await supabase.storage
      .from('uploads')
      .upload(fileName, file);
    
    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  };

  const handlePhotoUpload = async (file: File, title: string) => {
    const url = await uploadFile(file);
    const newPhoto = {
      id: Date.now().toString(),
      title: title || file.name,
      image: url,
      date: new Date().toISOString(),
    };
    const newPhotos = [...photos, newPhoto];
    setPhotos(newPhotos);
    
    await supabase
      .from('site_data')
      .update({ photos: newPhotos })
      .eq('id', 1);
  };

  const handlePhotoDelete = async (id: string) => {
    const newPhotos = photos.filter(p => p.id !== id);
    setPhotos(newPhotos);
    await supabase.from('site_data').update({ photos: newPhotos }).eq('id', 1);
  };

  const handleAboutSave = async (text: string) => {
    setAboutText(text);
    await supabase.from('site_data').update({ about: text }).eq('id', 1);
  };

  const handleMusicUpload = async (file: File) => {
    const url = await uploadFile(file);
    setMusicFile(url);
    await supabase.from('site_data').update({ music: url }).eq('id', 1);
  };

  const handleLogoUpload = async (file: File) => {
    const url = await uploadFile(file);
    setLogoUrl(url);
    await supabase.from('site_data').update({ logo: url }).eq('id', 1);
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
              {aboutText || 'Um olhar particular sobre o mundo.'}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <GalleryGrid photos={photos} />

      <AdminPanel
        photos={photos}
        aboutText={aboutText}
        musicFile={musicFile}
        logoUrl={logoUrl}
        onPhotoUpload={handlePhotoUpload}
        onPhotoDelete={handlePhotoDelete}
        onAboutSave={handleAboutSave}
        onMusicUpload={handleMusicUpload}
        onLogoUpload={handleLogoUpload}
      />
    </>
  );
}