export const SITE_CONFIG = {
  name: 'LIPE PHOTOS',
  description: 'Momentos únicos registrados através da minha lente',
  url: 'https://lipephotos.com.br',
  author: 'Felipe Fotógrafo',
  location: 'Brasil',
  social: {
    instagram: 'https://instagram.com/lipephotos',
    twitter: 'https://twitter.com/lipephotos',
  },
};

export const CATEGORY_LABELS: Record<string, string> = {
  aves: 'Aves',
  natureza: 'Natureza',
  paisagens: 'Paisagens',
  macro: 'Macro',
  insetos: 'Insetos',
  praias: 'Praias',
  montanhas: 'Montanhas',
  cachoeiras: 'Cachoeiras',
  rios: 'Rios',
  noite: 'Noite',
};

export const NAVIGATION_ITEMS = [
  { label: 'Início', href: '/' },
  { label: 'Galeria', href: '/gallery' },
  { label: 'Coleções', href: '/collections' },
  { label: 'Sobre', href: '/about' },
] as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
  },
  staggerChildren: {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  },
  revealOnScroll: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
} as const;