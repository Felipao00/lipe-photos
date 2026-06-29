import { Photo, PhotoCategory } from '@/types/photo';
import { Collection } from '@/types/collection';

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getPhotoUrl(photo: Photo): string {
  return `/photos/${photo.slug}`;
}

export function getCollectionUrl(collection: Collection): string {
  return `/collections#${collection.slug}`;
}

export function getCategoryLabel(category: PhotoCategory): string {
  const labels: Record<PhotoCategory, string> = {
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
  return labels[category];
}

export function getPhotosByCategory(photos: Photo[], category: PhotoCategory): Photo[] {
  return photos.filter(photo => photo.category === category);
}

export function getPhotoBySlug(photos: Photo[], slug: string): Photo | undefined {
  return photos.find(photo => photo.slug === slug);
}