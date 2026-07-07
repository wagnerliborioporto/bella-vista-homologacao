'use client';

import { useState } from 'react';
import { Expand } from 'lucide-react';
import type { Locale } from '@/app/types';
import { regionImages } from '@/app/lib/constants';
import { OptimizedImage } from '@/app/components/shared/OptimizedImage';
import { ImageLightbox } from '@/app/components/shared/ImageLightbox';

const copyByLocale = {
  pt: {
    tag: 'COSTA DO DESCOBRIMENTO',
    title: 'Conheça a região além do empreendimento.',
    body: 'Praias, história, gastronomia e experiências que tornam a localização do Bella Vista um dos seus maiores diferenciais.',
    expand: 'Ampliar foto',
  },
  en: {
    tag: 'DISCOVERY COAST',
    title: 'Explore the region beyond the residence.',
    body: 'Beaches, history, dining and experiences that make Bella Vista’s location one of its greatest advantages.',
    expand: 'Enlarge photo',
  },
  it: {
    tag: 'COSTA DELLA SCOPERTA',
    title: 'Scopri il territorio oltre il residence.',
    body: 'Spiagge, storia, gastronomia ed esperienze che rendono la posizione di Bella Vista uno dei suoi maggiori punti di forza.',
    expand: 'Ingrandisci foto',
  },
} satisfies Record<Locale, { tag: string; title: string; body: string; expand: string }>;

type Props = {
  locale: Locale;
};

export const RegionGallery = ({ locale }: Props) => {
  const copy = copyByLocale[locale];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id='regiao' className='section-shell section-base section-glow section-divider scroll-mt-24'>
      <div className='section-inner'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.32em] text-[var(--muted)]'>{copy.tag}</p>
          <h2 className='section-title mt-3 font-semibold text-[var(--text)]'>{copy.title}</h2>
          <p className='mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg'>{copy.body}</p>
        </div>

        <div className='mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-12'>
          {regionImages.map((image, index) => {
            const featured = index === 0 || index === 4;
            return (
              <button
                key={image.src}
                type='button'
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)] text-left shadow-[0_14px_34px_rgba(0,0,0,0.28)] ${
                  featured ? 'aspect-[16/10] lg:col-span-7' : 'aspect-[4/3] lg:col-span-5'
                }`}
                aria-label={`${copy.expand}: ${image.alt}`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={featured ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'}
                  className='object-cover transition duration-500 group-hover:scale-[1.035]'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent' />
                <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5'>
                  <p className='max-w-[85%] text-sm font-semibold leading-snug text-white md:text-base'>
                    {image.caption}
                  </p>
                  <span className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition group-hover:bg-white/15'>
                    <Expand className='h-4 w-4' />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <ImageLightbox
        images={regionImages}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
};
