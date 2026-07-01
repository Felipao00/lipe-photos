'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Trash2, Upload, Music, Edit3, Image, LogOut } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [aboutText, setAboutText] = useState('');
  const [musicFile, setMusicFile] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsLoggedIn(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    const res = await fetch('/api/admin/data');
    const data = await res.json();
    setPhotos(data.photos || []);
    setAboutText(data.about || '');
    setMusicFile(data.music || '/audio/musica.mp3');
  };

  const handleLogin = () => {
    if (password === 'lipe2024') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_auth', 'true');
      loadData();
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'photo');

    const uploadRes = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });
    const { url } = await uploadRes.json();

    const newPhoto = {
      id: Date.now().toString(),
      slug: file.name.replace(/\.[^/.]+$/, ''),
      title: newPhotoTitle || file.name,
      image: url,
      date: new Date().toISOString().split('T')[0],
    };

    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photo: newPhoto }),
    });

    setNewPhotoTitle('');
    setUploading(false);
    setMessage('Foto adicionada!');
    setTimeout(() => setMessage(''), 3000);
    loadData();
  };

  const handleDeletePhoto = async (id: string) => {
    await fetch('/api/admin/data', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadData();
  };

  const handleSaveAbout = async () => {
    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ about: aboutText }),
    });
    setMessage('Sobre salvo!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleMusicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'audio');

    const uploadRes = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });
    const { url } = await uploadRes.json();

    await fetch('/api/admin/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ music: url }),
    });

    setMusicFile(url);
    setUploading(false);
    setMessage('Música atualizada!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsLoggedIn(false);
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-6 h-6 text-text-muted" />
            </div>
            <h1 className="text-2xl font-display text-text-primary">Lipe Admin</h1>
            <p className="text-text-muted text-sm mt-1">Área restrita</p>
          </div>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Digite a senha"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-white/20 transition-colors"
          />
          
          <button
            onClick={handleLogin}
            className="w-full mt-3 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header do painel */}
      <div className="border-b border-border">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-text-primary" />
              </div>
              <span className="text-text-primary font-display">Lipe Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/[0.03] transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          {message && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna 1 - Fotos */}
            <div>
              <section className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-5 h-5 text-text-primary" />
                  <h2 className="text-lg font-display text-text-primary">Adicionar Foto</h2>
                </div>
                
                <input
                  type="text"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="Título da foto (opcional)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-primary placeholder:text-text-muted text-sm mb-3 focus:outline-none focus:border-white/20"
                />
                
                <label className="block w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] border-dashed text-text-muted text-sm text-center cursor-pointer hover:border-white/20 transition-colors">
                  <Upload className="w-5 h-5 mx-auto mb-1" />
                  {uploading ? 'Enviando...' : 'Clique para escolher a foto'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <h2 className="text-lg font-display text-text-primary mb-4">
                  Minhas Fotos ({photos.length})
                </h2>
                
                {photos.length === 0 ? (
                  <p className="text-text-muted text-sm">Nenhuma foto ainda.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo) => (
                      <div key={photo.id} className="relative group rounded-lg overflow-hidden">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full aspect-square object-cover"
                        />
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <p className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs truncate">
                          {photo.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Coluna 2 - Sobre e Música */}
            <div className="space-y-8">
              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <Edit3 className="w-5 h-5 text-text-primary" />
                  <h2 className="text-lg font-display text-text-primary">Seção Sobre</h2>
                </div>
                
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  placeholder="Escreva seu texto aqui..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-white/20 resize-none"
                />
                
                <button
                  onClick={handleSaveAbout}
                  className="mt-3 px-5 py-2.5 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Salvar Texto
                </button>
              </section>

              <section className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-5 h-5 text-text-primary" />
                  <h2 className="text-lg font-display text-text-primary">Música de Fundo</h2>
                </div>
                
                <p className="text-text-muted text-xs mb-3">
                  Arquivo atual: {musicFile}
                </p>
                
                <label className="block w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] border-dashed text-text-muted text-sm text-center cursor-pointer hover:border-white/20 transition-colors">
                  <Upload className="w-5 h-5 mx-auto mb-1" />
                  {uploading ? 'Enviando...' : 'Trocar música (MP3)'}
                  <input
                    type="file"
                    accept="audio/mpeg,audio/mp3"
                    onChange={handleMusicUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}