import { Photo } from '@/types/photo';

export function getRelatedPhotos(photo: Photo, allPhotos: Photo[], limit: number = 4): Photo[] {
  const relatedByCategory = allPhotos.filter(
    p => p.id !== photo.id && p.category === photo.category
  );
  
  const relatedByLocation = allPhotos.filter(
    p => p.id !== photo.id && 
    p.category !== photo.category && 
    (p.state === photo.state || p.country === photo.country)
  );
  
  const others = allPhotos.filter(
    p => p.id !== photo.id && 
    p.category !== photo.category && 
    p.state !== photo.state && 
    p.country !== photo.country
  );
  
  const combined = [...relatedByCategory, ...relatedByLocation, ...others];
  
  return combined.slice(0, limit);
}