import { Metadata } from 'next';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { collections } from '@/data/collections';
import { generateSiteMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = generateSiteMetadata(
  'Coleções',
  'Explore minhas coleções temáticas de fotografias. Cada coleção é uma jornada visual única pela natureza.'
);

export default function CollectionsPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <Container className="mb-16">
        <div className="text-center">
          <h1 className="text-display-2 lg:text-display-1 font-bold text-text-primary mb-4">
            Coleções
          </h1>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Cada coleção é uma jornada visual única. 
            Escolha um tema e mergulhe nas minhas fotografias de natureza.
          </p>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}