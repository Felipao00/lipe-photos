export type PhotoCategory = 
  | 'paisagens'
  | 'retratos'
  | 'rua'
  | 'pb'
  | 'analogico'
  | 'outros';

export interface Photo {
  id: string;
  slug: string;
  title: string;
  description: string;
  story: string;
  image: string;
  location: string;
  city: string;
  state: string;
  country: string;
  date: string;
  category: PhotoCategory;
  camera: string;
  lens: string;
  iso: number;
  shutter: string;
  aperture: string;
  focalLength: string;
  width: number;
  height: number;
}