export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNavigation: NavigationItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Galeria', href: '/gallery' },
  { label: 'Coleções', href: '/collections' },
  { label: 'Sobre', href: '/about' },
];

export const footerNavigation: {
  title: string;
  links: NavigationItem[];
}[] = [
  {
    title: 'Navegação',
    links: [
      { label: 'Início', href: '/' },
      { label: 'Galeria', href: '/gallery' },
      { label: 'Coleções', href: '/collections' },
      { label: 'Sobre', href: '/about' },
    ],
  },
  {
    title: 'Coleções',
    links: [
      { label: 'Aves', href: '/collections#aves' },
      { label: 'Paisagens', href: '/collections#paisagens' },
      { label: 'Macro', href: '/collections#macro' },
      { label: 'Natureza', href: '/collections#natureza' },
    ],
  },
  {
    title: 'Redes Sociais',
    links: [
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'Twitter', href: 'https://twitter.com', external: true },
      { label: '500px', href: 'https://500px.com', external: true },
      { label: 'Unsplash', href: 'https://unsplash.com', external: true },
    ],
  },
];