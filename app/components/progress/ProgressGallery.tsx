'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { blurDataUrl } from '@/app/lib/constants';
import { useGallery } from '@/app/hooks/useGallery';
import { OptimizedImage } from '@/app/components/shared/OptimizedImage';
import { ImageLightbox } from '@/app/components/shared/ImageLightbox';

type Props = {
  images: string[];
  alt: string;
  reduceMotion: boolean;
};

export const ProgressGallery = ({ images, alt, reduceMotion }: Props) => {
  const { index, setIndex } = useGallery({
    length: images.length,
    reduceMotion,
    auto: false,
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const previous = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);
  const lightboxImages = images.map((src, imageIndex) => ({
    src,
    alt: `${alt} — imagem ${imageIndex + 1}`,
    caption: `Acompanhamento da obra · imagem ${imageIndex + 1} de ${images.length}`,
  }));

  return (
    <>
      <div className='group relative aspect-[16/10] overflow-hidden rounded-2xl'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={images[index]}
            className='absolute inset-0'
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4 }}
          >
            <OptimizedImage
              src={images[index]}
              alt={`${alt} — imagem ${index + 1}`}
              fill
              sizes='(min-width: 1024px) 50vw, 90vw'
              className='object-cover'
              placeholder='blur'
              blurDataURL={blurDataUrl}
            />
          </motion.div>
        </AnimatePresence>

        <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10' />

        <button
          type='button'
          onClick={() => setLightboxIndex(index)}
          className='absolute inset-0 flex items-center justify-center'
          aria-label='Ampliar imagem da obra'
        >
          <span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100'>
            <Expand className='h-4 w-4' /> Ampliar
          </span>
        </button>

        <button
          type='button'
          onClick={previous}
          className='absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:bg-black/75'
          aria-label='Foto anterior da obra'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
        <button
          type='button'
          onClick={next}
          className='absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:bg-black/75'
          aria-label='Próxima foto da obra'
        >
          <ChevronRight className='h-5 w-5' />
        </button>

        <div className='absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md'>
          {index + 1} / {images.length}
        </div>
      </div>

      <div className='mt-4 flex gap-2 overflow-x-auto pb-2'>
        {images.map((image, thumbnailIndex) => (
          <button
            key={image}
            type='button'
            onClick={() => setIndex(thumbnailIndex)}
            className={`relative aspect-[4/3] min-w-[88px] overflow-hidden rounded-lg border transition md:min-w-[100px] ${
              thumbnailIndex === index
                ? 'border-[var(--gold)] ring-1 ring-[var(--gold)]/45'
                : 'border-white/10 opacity-55 hover:opacity-100'
            }`}
            aria-label={`Ver foto ${thumbnailIndex + 1} da obra`}
          >
            <OptimizedImage
              src={image}
              alt=''
              fill
              sizes='100px'
              className='object-cover'
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
};
