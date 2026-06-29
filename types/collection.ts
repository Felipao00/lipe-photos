import { PhotoCategory } from './photo';

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  category: PhotoCategory;
  photoCount: number;
}