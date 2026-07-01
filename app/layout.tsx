'use client';

import { useState, useEffect } from 'react';
import { Inter, Playfair_Display, Tangerine } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AudioPlayer } from '@/components/layout/AudioPlayer';
import { supabase } from '@/lib/supabase';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const tangerine = Tangerine({
  subsets: ['latin'],
  variable: '--font-signature',
  display: 'swap',
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [logoUrl, setLogoUrl] = useState('');

  const loadLogo = async () => {
    const { data } = await supabase
      .from('site_data')
      .select('logo')
      .eq('id', 1)
      .single();
    
    if (data?.logo) {
      setLogoUrl(data.logo);
    }
  };

  useEffect(() => {
    loadLogo();
  }, []);

  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${tangerine.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📷</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col pt-24 sm:pt-28">
        <Header logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer />
        <AudioPlayer />
      </body>
    </html>
  );
}