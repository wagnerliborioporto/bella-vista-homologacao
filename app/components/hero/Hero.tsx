'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroVideo } from '@/app/components/hero/HeroVideo';
import type { Translation } from '@/app/lib/translations';

type Props = {
  copy: Translation['hero'];
  whatsappLink: string;
};

const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut', delay }
      }
    >
      {children}
    </motion.div>
  );
};

export const Hero = ({ copy, whatsappLink }: Props) => {
  const isPortuguese = copy.eyebrow === 'Costa do Descobrimento · Bahia';
  const displayTitle = isPortuguese
    ? 'Viva perto do mar.\nInvista no futuro.'
    : copy.title;
  const displaySubtitle = isPortuguese
    ? 'Studios e apartamentos na Costa do Descobrimento, com localização estratégica e alto potencial de valorização.'
    : copy.subtitleDesktop;

  return (
    <section
      id='inicio'
      className='grain grain-soft relative flex min-h-[78svh] items-center overflow-hidden bg-[#07131D] pt-24 md:min-h-[82vh] md:pt-20'
    >
      <HeroVideo />

      <div className='absolute inset-0 bg-gradient-to-r from-[#06121d]/88 via-[#07131d]/58 to-[#07131d]/18' />
      <div className='absolute inset-0 bg-gradient-to-t from-[#07131D]/72 via-transparent to-black/20' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,rgba(183,146,90,0.13),transparent_38%)]' />
      <div className='absolute inset-0 vignette' />

      <div className='relative z-10 mx-auto w-full max-w-6xl px-6 py-16 text-white md:px-8 lg:py-20'>
        <div className='max-w-[760px] text-center md:text-left'>
          <Reveal>
            <p className='text-[0.62rem] uppercase tracking-[0.48em] text-white/65 md:text-[0.7rem] md:tracking-[0.55em]'>
              {copy.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className='hero-title-glow mt-5 text-balance text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.045em]'>
              {displayTitle.split('\n').map((line) => (
                <span key={line} className='block'>
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className='mx-auto mt-6 max-w-[640px] text-base leading-relaxed text-white/82 md:mx-0 md:mt-7 md:text-[1.1rem] md:leading-[1.65]'>
              {displaySubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3} className='mt-8 flex justify-center md:justify-start'>
            <a
              href={whatsappLink}
              target='_blank'
              rel='noreferrer'
              className='hero-cta-glow inline-flex items-center justify-center rounded-full border border-white/20 bg-[#0B2A3A]/88 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(4,13,20,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#B7925A]/55 hover:shadow-[0_0_22px_rgba(183,146,90,0.32)]'
            >
              {copy.primaryCtaDesktop}
            </a>
          </Reveal>
        </div>
      </div>

      <a
        href='#contexto'
        aria-label='Rolar para conhecer o empreendimento'
        className='absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-[0.58rem] uppercase tracking-[0.34em] text-white/55 transition hover:text-white/85'
      >
        <span>{isPortuguese ? 'Conheça' : 'Explore'}</span>
        <span aria-hidden='true' className='text-lg leading-none'>
          ↓
        </span>
      </a>
    </section>
  );
};
