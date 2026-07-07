'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { OptimizedImage } from '@/app/components/shared/OptimizedImage';

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: ReadonlyArray<LightboxImage>;
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

export const ImageLightbox = ({ images, index, onIndexChange }: Props) => {
  const isOpen = index !== null && images.length > 0;
  const currentIndex = index ?? 0;

  const previous = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    onIndexChange((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onIndexChange(null);
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [currentIndex, images.length, isOpen, onIndexChange]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md md:p-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role='dialog'
          aria-modal='true'
          aria-label='Galeria de imagens ampliada'
          onClick={() => onIndexChange(null)}
        >
          <button
            type='button'
            onClick={() => onIndexChange(null)}
            className='absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-white/15'
            aria-label='Fechar galeria'
          >
            <X className='h-5 w-5' />
          </button>

          {images.length > 1 && (
            <>
              <button
                type='button'
                onClick={(event) => {
                  event.stopPropagation();
                  previous();
                }}
                className='absolute left-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-white/15 md:left-7'
                aria-label='Imagem anterior'
              >
                <ChevronLeft className='h-6 w-6' />
              </button>
              <button
                type='button'
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                className='absolute right-3 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-white/15 md:right-7'
                aria-label='Próxima imagem'
              >
                <ChevronRight className='h-6 w-6' />
              </button>
            </>
          )}

          <motion.figure
            key={images[currentIndex].src}
            className='relative flex h-[88vh] w-full max-w-7xl flex-col items-center justify-center'
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className='relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl'>
              <OptimizedImage
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes='100vw'
                className='object-contain'
                priority
              />
            </div>
            <figcaption className='absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-black/90 via-black/55 to-transparent px-5 pb-5 pt-16 text-center text-sm text-white/85'>
              {images[currentIndex].caption ?? images[currentIndex].alt}
              <span className='ml-3 text-white/50'>
                {currentIndex + 1} / {images.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
