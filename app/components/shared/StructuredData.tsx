import { baseWhatsAppUrl } from '@/app/lib/constants';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://bella-vista-homologacao.vercel.app';

const propertySchema = {
  '@context': 'https://schema.org',
  '@type': 'ApartmentComplex',
  name: 'Bella Vista Beach Residence — Homologação',
  description:
    'Ambiente de homologação do Bella Vista Beach Residence em Coroa Vermelha.',
  url: siteUrl,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Santa Cruz Cabrália',
    addressRegion: 'BA',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-16.2833',
    longitude: '-39.0333',
  },
  telephone: baseWhatsAppUrl.replace('https://wa.me/', '+'),
};

export const StructuredData = () => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
  />
);
