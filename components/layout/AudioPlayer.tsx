'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/audio/music01.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    // Tenta tocar automaticamente
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Se bloquear, mostra o botão
          setShowButton(true);
        });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowButton(false);
      }).catch(() => {
        setShowButton(true);
      });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={togglePlay}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-text-muted hover:text-text-primary hover:border-white/[0.15] transition-all duration-300"
          title={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}