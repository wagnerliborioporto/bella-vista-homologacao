'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { ShowcaseDetail } from '@/app/types';
import { OptimizedImage } from '@/app/components/shared/OptimizedImage';
import { ImageLightbox } from '@/app/components/shared/ImageLightbox';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  title: string;
  desc: string;
  images: ReadonlyArray<string>;
  details: ReadonlyArray<ShowcaseDetail>;
  detailsCloseLabel: string;
  dialogLabel: string;
};

export const ShowcaseModal = ({
  isOpen,
  onClose,
  label,
  title,
  desc,
  images,
  details,
  detailsCloseLabel,
  dialogLabel,
}: Props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxImages = images.map((src, index) => ({
    src,
    alt: `${title} — imagem ${index + 1}`,
    caption: `${title} · ${index + 1} de ${images.length}`,
  }));

  const previous = () => setImageIndex((current) => (current - 1 + images.length) % images.length);
  const next = () => setImageIndex((current) => (current + 1) % images.length);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className='absolute inset-0 bg-black/75 backdrop-blur-sm' onClick={onClose} />
            <motion.div
              role='dialog'
              aria-modal='true'
              aria-label={`${dialogLabel} ${title}`}
              className='relative z-10 max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[26px] border border-white/10 bg-[rgba(6,16,24,0.98)] text-white shadow-[0_24px_70px_rgba(5,12,18,0.7),0_0_40px_rgba(183,146,90,0.12)]'
              initial={{ y: 18, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type='button'
                onClick={onClose}
                className='absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/80 backdrop-blur-md transition hover:text-white'
                aria-label={detailsCloseLabel}
              >
                <X className='h-5 w-5' />
              </button>

              <div className='grid lg:grid-cols-[1.28fr_0.72fr]'>
                <div className='p-3 md:p-5'>
                  <div className='group relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/35'>
                    <OptimizedImage
                      src={images[imageIndex]}
                      alt={`${title} — imagem ${imageIndex + 1}`}
                      fill
                      sizes='(min-width: 1024px) 62vw, 94vw'
                      className='object-cover'
                      priority
                    />
                    <button
                      type='button'
                      onClick={() => setLightboxIndex(imageIndex)}
                      className='absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20'
                      aria-label='Ampliar imagem'
                    >
                      <span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-xs font-semibold opacity-0 backdrop-blur-md transition group-hover:opacity-100'>
                        <Expand className='h-4 w-4' /> Ampliar
                      </span>
                    </button>
                    {images.length > 1 && (
                      <>
                        <button
                          type='button'
                          onClick={previous}
                          className='absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 transition hover:bg-black/75'
                          aria-label='Imagem anterior'
                        >
                          <ChevronLeft className='h-5 w-5' />
                        </button>
                        <button
                          type='button'
                          onClick={next}
                          className='absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 transition hover:bg-black/75'
                          aria-label='Próxima imagem'
                        >
                          <ChevronRight className='h-5 w-5' />
                        </button>
                      </>
                    )}
                  </div>

                  <div className='mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6'>
                    {images.map((image, index) => (
                      <button
                        key={image}
                        type='button'
                        onClick={() => setImageIndex(index)}
                        className={`relative aspect-[4/3] overflow-hidden rounded-lg border transition ${
                          index === imageIndex
                            ? 'border-[var(--gold)] ring-1 ring-[var(--gold)]/50'
                            : 'border-white/10 opacity-65 hover:opacity-100'
                        }`}
                        aria-label={`Ver imagem ${index + 1}`}
                      >
                        <OptimizedImage
                          src={image}
                          alt=''
                          fill
                          sizes='120px'
                          className='object-cover'
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className='border-t border-white/10 p-6 lg:border-l lg:border-t-0 lg:p-7'>
                  <span className='inline-flex rounded-full border border-[var(--gold)]/40 bg-white/5 px-3 py-1 text-[0.6rem] uppercase tracking-[0.4em] text-[var(--gold)]'>
                    {label}
                  </span>
                  <h3 className='mt-4 text-2xl font-semibold'>{title}</h3>
                  <p className='mt-2 text-sm leading-relaxed text-white/65'>{desc}</p>
                  <div className='mt-6 rounded-2xl border border-white/10 bg-white/5 p-4'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1'>
                      {details.map((detail) => {
                        const Icon = detail.icon;
                        return (
                          <div key={detail.label} className='flex items-center gap-3'>
                            <span className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-[var(--gold)]'>
                              <Icon className='h-5 w-5' />
                            </span>
                            <div>
                              <p className='text-[10px] uppercase tracking-[0.16em] text-white/45'>
                                {detail.label}
                              </p>
                              <p className='text-sm font-semibold text-white'>{detail.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <p className='mt-5 text-xs leading-relaxed text-white/45'>
                    Clique na imagem principal para visualizar em tela cheia e navegar por todas as opções.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox images={lightboxImages} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </>
  );
};
