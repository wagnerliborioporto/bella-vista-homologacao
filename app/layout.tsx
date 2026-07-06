import type { Metadata } from 'next';
import './globals.css';
import { StructuredData } from '@/app/components/shared/StructuredData';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://bella-vista-homologacao.vercel.app';

export const metadata: Metadata = {
  title:
    '[HOMOLOGAÇÃO] Bella Vista Beach Residence | Investimento Imobiliário no Litoral Sul da Bahia',
  description:
    'Ambiente de homologação do Bella Vista Beach Residence. Não utilizar como site oficial.',
  keywords: [
    'bella vista',
    'coroa vermelha',
    'investimento imobiliário',
    'litoral bahia',
    'apartamento praia',
  ],
  authors: [{ name: 'Bella Vista Beach Residence' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Bella Vista Beach Residence — Homologação',
    title: '[HOMOLOGAÇÃO] Bella Vista Beach Residence | Bahia',
    description: 'Ambiente de testes do Bella Vista Beach Residence.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Bella Vista Beach Residence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[HOMOLOGAÇÃO] Bella Vista Beach Residence | Bahia',
    description: 'Ambiente de testes do Bella Vista Beach Residence.',
    images: [`${siteUrl}/twitter-image.jpg`],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <a href='#main-content' className='skip-link'>
          Ir para o conteúdo
        </a>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
