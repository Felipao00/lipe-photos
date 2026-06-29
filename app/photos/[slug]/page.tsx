import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { photos } from '@/data/photos';
import { PhotoHero } from '@/components/photo/PhotoHero';
import { PhotoDetails } from '@/components/photo/PhotoDetails';
import { CameraInfo } from '@/components/photo/CameraInfo';
import { RelatedPhotos } from '@/components/photo/RelatedPhotos';
import { generatePhotoMetadata } from '@/lib/metadata';
import { getRelatedPhotos } from '@/utils/getRelatedPhotos';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ArrowLeft } from 'lucide-react';

interface PhotoPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const photo = photos.find((p) => p.slug === params.slug);
  
  if (!photo) {
    return {
      title: 'Foto não encontrada',
    };
  }

  return generatePhotoMetadata(photo);
}

export async function generateStaticParams() {
  return photos.map((photo) => ({
    slug: photo.slug,
  }));
}

export default function PhotoPage({ params }: PhotoPageProps) {
  const photo = photos.find((p) => p.slug === params.slug);

  if (!photo) {
    notFound();
  }

  const relatedPhotos = getRelatedPhotos(photo, photos, 4);

  return (
    <>
      <PhotoHero photo={photo} />
      <PhotoDetails photo={photo} />
      <CameraInfo photo={photo} />
      
      <Container className="py-8">
        <Button
          href="/gallery"
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Voltar para Galeria
        </Button>
      </Container>

      <RelatedPhotos photos={relatedPhotos} />
    </>
  );
}