import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { photos } from '@/data/photos';

interface PhotoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const photo = photos.find((p) => p.slug === slug);
  
  if (!photo) {
    return { title: 'Foto não encontrada' };
  }

  return {
    title: `${photo.title} | Lipe Photos`,
    description: photo.description,
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { slug } = await params;
  const photo = photos.find((p) => p.slug === slug);

  if (!photo) {
    notFound();
  }

  return null;
}