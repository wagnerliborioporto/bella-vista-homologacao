'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/app/types';
import type { Translation } from '@/app/lib/translations';
import { progressImages } from '@/app/lib/constants';
import { ProgressGallery } from '@/app/components/progress/ProgressGallery';

const extraCopy = {
  pt: {
    latest: 'Registros visuais recentes',
    period: 'Dezembro de 2025 e fevereiro de 2026',
    gallery: `${progressImages.length} imagens ampliáveis`,
    instruction: 'Use as miniaturas para navegar e clique na foto principal para abrir em tela cheia.',
  },
  en: {
    latest: 'Recent visual updates',
    period: 'December 2025 and February 2026',
    gallery: `${progressImages.length} expandable images`,
    instruction: 'Use the thumbnails to browse and click the main image to open it full screen.',
  },
  it: {
    latest: 'Aggiornamenti visivi recenti',
    period: 'Dicembre 2025 e febbraio 2026',
    gallery: `${progressImages.length} immagini ingrandibili`,
    instruction: 'Usa le miniature per navigare e clicca sull’immagine principale per aprirla a schermo intero.',
  },
} satisfies Record<Locale, { latest: string; period: string; gallery: string; instruction: string }>;

type Props = {
  copy: Translation['progress'];
  locale: Locale;
};

export const Progress = ({ copy, locale }: Props) => {
  const reduceMotion = useReducedMotion();
  const details = extraCopy[locale];

  return (
    <section id='obra' className='section-shell section-alt section-glow section-divider scroll-mt-24'>
      <div className='section-inner'>
        <div className='grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
          <motion.div
            className='space-y-5 text-center lg:sticky lg:top-28 lg:text-left'
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
          >
            <p className='text-xs uppercase tracking-[0.32em] text-[var(--muted)]'>{copy.tag}</p>
            <h2 className='section-title font-semibold text-[var(--text)]'>{copy.title}</h2>
            <p className='text-base leading-relaxed text-[var(--muted)] md:text-lg lg:max-w-[42ch]'>
              {copy.body}
            </p>

            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
              <div className='rounded-2xl border border-white/10 bg-[var(--panel)] p-4 text-left'>
                <p className='text-[10px] uppercase tracking-[0.22em] text-white/45'>{details.latest}</p>
                <p className='mt-2 text-sm font-semibold text-white'>{details.period}</p>
              </div>
              <div className='rounded-2xl border border-white/10 bg-[var(--panel)] p-4 text-left'>
                <p className='text-[10px] uppercase tracking-[0.22em] text-white/45'>Galeria</p>
                <p className='mt-2 text-sm font-semibold text-white'>{details.gallery}</p>
              </div>
            </div>

            <div className='flex flex-wrap justify-center gap-3 text-xs text-white/70 lg:justify-start'>
              {copy.highlights.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-white/10 bg-[var(--panel)] px-4 py-2'
                >
                  {item}
                </span>
              ))}
            </div>
            <p className='text-xs leading-relaxed text-white/45'>{details.instruction}</p>
          </motion.div>

          <motion.div
            className='glass-panel p-4 md:p-5'
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4 }}
          >
            <ProgressGallery
              images={progressImages}
              alt={copy.title}
              reduceMotion={!!reduceMotion}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
