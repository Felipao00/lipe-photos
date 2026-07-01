'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Upload, Trash2, Save, Music, Edit3, Image, Lock, Camera, FileAudio, LogOut } from 'lucide-react';

interface AdminPanelProps {
  photos: any[];
  aboutText: string;
  musicFile: string;
  logoUrl: string;
  onPhotoUpload: (file: File, title: string) => void;
  onPhotoDelete: (id: string) => void;
  onAboutSave: (text: string) => void;
  onMusicUpload: (file: File) => void;
  onLogoUpload: (file: File) => void;
}

export function AdminPanel({
  photos,
  aboutText,
  musicFile,
  logoUrl,
  onPhotoUpload,
  onPhotoDelete,
  onAboutSave,
  onMusicUpload,
  onLogoUpload,
}: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'logo' | 'about' | 'music'>('photos');
  const [newTitle, setNewTitle] = useState('');
  const [editAbout, setEditAbout] = useState(aboutText);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleLogin = () => {
    if (password === 'lipe2024') {
      setIsAuthenticated(true);
      setEditAbout(aboutText);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    onPhotoUpload(file, newTitle);
    setNewTitle('');
    setUploading(false);
    setMessage('Foto adicionada com sucesso!');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleMusicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    onMusicUpload(file);
    setUploading(false);
    setMessage('Música atualizada!');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    onLogoUpload(file);
    setUploading(false);
    setMessage('Logo atualizada!');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleSaveAbout = () => {
    onAboutSave(editAbout);
    setMessage('Texto salvo!');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleDeletePhoto = (id: string) => {
    onPhotoDelete(id);
    setMessage('Foto removida.');
    setTimeout(() => setMessage(''), 2500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  return (
    <>
      {/* Botão flutuante - engrenagem sutil */}
      <motion.button
        whileHover={{ scale: 1.1, opacity: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-300 shadow-lg"
        title="Painel Administrativo"
      >
        <Settings className="w-4 h-4 text-text-muted" />
      </motion.button>

      {/* Overlay + Painel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="w-full max-w-2xl max-h-[85vh] bg-[#0D0D0D] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header do painel */}
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <Camera className="w-5 h-5 text-text-primary" />
                  </div>
                  <div>
                    <h2 className="text-text-primary font-display text-xl leading-none">
                      Lipe Photos
                    </h2>
                    <p className="text-text-muted text-xs mt-1">Painel de Administração</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isAuthenticated && (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-colors text-xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sair
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tela de login */}
              {!isAuthenticated ? (
                <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
                    <Lock className="w-7 h-7 text-text-muted" />
                  </div>
                  
                  <h3 className="text-2xl font-display text-text-primary mb-2">
                    Área Restrita
                  </h3>
                  <p className="text-text-secondary text-sm mb-8 text-center max-w-sm">
                    Digite sua senha para acessar o painel de controle do seu site.
                  </p>
                  
                  <div className="w-full max-w-xs space-y-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      placeholder="Digite sua senha"
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all text-center"
                    />
                    <button
                      onClick={handleLogin}
                      className="w-full px-5 py-3.5 bg-white text-black rounded-2xl font-medium text-sm hover:bg-white/90 transition-all active:scale-[0.98]"
                    >
                      Entrar no Painel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex px-6 pt-4 gap-1">
                    {[
                      { id: 'photos', icon: Image, label: 'Fotos' },
                      { id: 'logo', icon: Camera, label: 'Logo' },
                      { id: 'about', icon: Edit3, label: 'Sobre' },
                      { id: 'music', icon: FileAudio, label: 'Música' },
                    ].map(({ id, icon: Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          activeTab === id
                            ? 'bg-white/[0.06] text-text-primary'
                            : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.02]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Mensagem de feedback */}
                  <AnimatePresence>
                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mx-6 mt-3 px-4 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Conteúdo das tabs */}
                  <div className="p-6 overflow-y-auto max-h-[50vh]">
                    {/* Tab Fotos */}
                    {activeTab === 'photos' && (
                      <div className="space-y-6">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
                          <h3 className="text-text-primary font-medium text-sm flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Adicionar Nova Foto
                          </h3>
                          
                          <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Título da foto (opcional)"
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-white/20 transition-all"
                          />
                          
                          <label className="block w-full px-4 py-5 rounded-xl bg-white/[0.02] border border-white/[0.06] border-dashed text-text-muted text-sm text-center cursor-pointer hover:border-white/20 hover:bg-white/[0.04] transition-all">
                            {uploading ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                                Enviando...
                              </span>
                            ) : (
                              <>
                                <Upload className="w-6 h-6 mx-auto mb-2" />
                                Clique para escolher uma foto
                                <br />
                                <span className="text-xs text-text-muted mt-1">JPG, PNG ou WebP</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                        </div>

                        <div>
                          <h3 className="text-text-primary font-medium text-sm mb-4">
                            Minhas Fotos ({photos.length})
                          </h3>
                          
                          {photos.length === 0 ? (
                            <div className="text-center py-12 text-text-muted">
                              <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                              <p className="text-sm">Nenhuma foto adicionada ainda.</p>
                              <p className="text-xs mt-1">Use o campo acima para começar.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                              {photos.map((photo) => (
                                <div
                                  key={photo.id}
                                  className="relative group rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.04]"
                                >
                                  <img
                                    src={photo.image}
                                    alt={photo.title}
                                    className="w-full aspect-square object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleDeletePhoto(photo.id)}
                                      className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-500 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium truncate">
                                      {photo.title}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tab Logo */}
                    {activeTab === 'logo' && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
                          <h3 className="text-text-primary font-medium text-sm flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            Logo do Site
                          </h3>
                          
                          <div className="flex justify-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/[0.03] border-2 border-white/[0.08]">
                              {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
                                  Sem logo
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <label className="block w-full px-4 py-5 rounded-xl bg-white/[0.02] border border-white/[0.06] border-dashed text-text-muted text-sm text-center cursor-pointer hover:border-white/20 hover:bg-white/[0.04] transition-all">
                            {uploading ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                                Enviando...
                              </span>
                            ) : (
                              <>
                                <Upload className="w-6 h-6 mx-auto mb-2" />
                                Escolher imagem para logo
                                <br />
                                <span className="text-xs text-text-muted mt-1">Recomendado: quadrada (ex: 200x200)</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoChange}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Tab Sobre */}
                    {activeTab === 'about' && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
                          <h3 className="text-text-primary font-medium text-sm flex items-center gap-2">
                            <Edit3 className="w-4 h-4" />
                            Editar Texto da Seção Sobre
                          </h3>
                          
                          <textarea
                            value={editAbout}
                            onChange={(e) => setEditAbout(e.target.value)}
                            rows={10}
                            placeholder="Escreva seu texto aqui... Use parágrafos para organizar."
                            className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-white/20 transition-all resize-none leading-relaxed"
                          />
                          
                          <button
                            onClick={handleSaveAbout}
                            className="flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 transition-all active:scale-[0.98]"
                          >
                            <Save className="w-4 h-4" />
                            Salvar Alterações
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab Música */}
                    {activeTab === 'music' && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-4">
                          <h3 className="text-text-primary font-medium text-sm flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            Música de Fundo
                          </h3>
                          
                          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <p className="text-text-muted text-xs mb-1">Arquivo atual:</p>
                            <p className="text-text-primary text-sm font-mono truncate">
                              {musicFile || 'Nenhuma música definida'}
                            </p>
                          </div>
                          
                          <label className="block w-full px-4 py-5 rounded-xl bg-white/[0.02] border border-white/[0.06] border-dashed text-text-muted text-sm text-center cursor-pointer hover:border-white/20 hover:bg-white/[0.04] transition-all">
                            {uploading ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
                                Enviando...
                              </span>
                            ) : (
                              <>
                                <Music className="w-6 h-6 mx-auto mb-2" />
                                Trocar música
                                <br />
                                <span className="text-xs text-text-muted mt-1">Arquivo MP3</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="audio/mpeg,audio/mp3"
                              onChange={handleMusicChange}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer do painel */}
                  <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
                    <p className="text-text-muted text-xs">
                      {photos.length} foto{photos.length !== 1 ? 's' : ''} no site
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-white/[0.04] transition-colors text-xs"
                    >
                      Fechar Painel
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}