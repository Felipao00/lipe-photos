import { Metadata } from 'next';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { photos } from '@/data/photos';
import { generateSiteMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = generateSiteMetadata(
  'Galeria',
  'Explore minha coleção completa de fotografias de natureza. Aves, paisagens, macro e muito mais.'
);

export default function GalleryPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <Container className="mb-16">
        <div className="text-center">
          <h1 className="text-display-2 lg:text-display-1 font-bold text-text-primary mb-4">
            Galeria
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Explore minha coleção completa de fotografias. 
            Cada imagem conta uma história única da natureza brasileira.
          </p>
        </div>
      </Container>

      <GalleryGrid photos={photos} />
    </div>
  );
}