import { Metadata } from 'next';
import { Photo } from '@/types/photo';
import { SITE_CONFIG } from './constants';

export function generateSiteMetadata(pageTitle?: string, description?: string): Metadata {
  return {
    title: pageTitle ? `${pageTitle} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
    description: description || SITE_CONFIG.description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: pageTitle ? `${pageTitle} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle ? `${pageTitle} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
      description: description || SITE_CONFIG.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generatePhotoMetadata(photo: Photo): Metadata {
  return {
    title: `${photo.title} | ${SITE_CONFIG.name}`,
    description: photo.description,
    openGraph: {
      title: photo.title,
      description: photo.description,
      images: [
        {
          url: photo.image,
          width: photo.width,
          height: photo.height,
          alt: photo.title,
        },
      ],
      type: 'article',
      locale: 'pt_BR',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: photo.title,
      description: photo.description,
      images: [photo.image],
    },
    other: {
      'article:published_time': photo.date,
      'article:author': SITE_CONFIG.author,
      'article:section': photo.category,
    },
  };
}