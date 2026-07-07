'use client';

import { useState } from 'react';
import type { Locale } from '@/app/types';
import { LanguageSwitcher } from '@/app/components/shared/LanguageSwitcher';

type Props = {
  labels: {
    location: string;
    works: string;
    investment: string;
    contact: string;
    languageLabel: string;
  };
  whatsappLink: string;
  menuLabel: string;
  menuAria: string;
  locale: Locale;
  onLocaleChange: (value: Locale) => void;
};

const BellaVistaLogo = () => (
  <div className='flex items-center gap-3 text-white'>
    <svg
      viewBox='0 0 64 64'
      aria-hidden='true'
      className='h-11 w-11 shrink-0 md:h-12 md:w-12 lg:h-14 lg:w-14'
      fill='none'
    >
      <circle cx='32' cy='32' r='27' stroke='currentColor' strokeWidth='2' />
      <path
        d='M20 21h11.5c6.2 0 10 2.6 10 7 0 3-1.9 5-5 6.1 4 .9 6.5 3.5 6.5 7 0 5-4.3 8-11.3 8H20V21Zm10.5 11c3.5 0 5.4-1.1 5.4-3.2s-1.9-3.1-5.4-3.1h-4.9V32h4.9Zm.8 12.2c4 0 6.1-1.3 6.1-3.7 0-2.3-2.1-3.6-6.1-3.6h-5.7v7.3h5.7Z'
        fill='currentColor'
      />
      <path d='M39 20h5.8L36 49h-5.8L39 20Z' fill='currentColor' opacity='0.92' />
    </svg>
    <div className='leading-none'>
      <div className='text-[0.82rem] font-semibold tracking-[0.24em] md:text-[0.92rem] lg:text-[1rem]'>
        BELLA VISTA
      </div>
      <div className='mt-1 text-[0.46rem] tracking-[0.34em] text-white/68 md:text-[0.52rem] lg:text-[0.57rem]'>
        BEACH RESIDENCE
      </div>
    </div>
  </div>
);

export const Navigation = ({
  labels,
  whatsappLink,
  menuLabel,
  menuAria,
  locale,
  onLocaleChange,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='fixed inset-x-0 top-0 z-50 overflow-visible border-b border-white/5 bg-[#07131D]/85 backdrop-blur-lg shadow-[0_8px_24px_rgba(5,12,18,0.35)] md:bg-[rgba(8,18,28,0.65)]'>
      <nav className='relative mx-auto flex max-w-6xl items-center justify-between px-5 py-3 text-white md:px-6 md:py-4 lg:py-5'>
        <a href='#inicio' aria-label='Bella Vista Beach Residence — início' className='shrink-0'>
          <BellaVistaLogo />
        </a>
        <div className='hidden items-center gap-6 text-xs uppercase tracking-[0.28em] text-white/80 md:flex lg:gap-8 lg:text-white/90'>
          <a
            href='#localizacao'
            className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
          >
            {labels.location}
          </a>
          <a
            href='#obra'
            className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
          >
            {labels.works}
          </a>
          <a
            href='#perfil'
            className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
          >
            {labels.investment}
          </a>
          <a
            href={whatsappLink}
            target='_blank'
            rel='noreferrer'
            className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
          >
            {labels.contact}
          </a>
          <LanguageSwitcher
            locale={locale}
            onLocaleChange={onLocaleChange}
            ariaLabel={labels.languageLabel}
          />
        </div>
        <div className='flex items-center gap-3 md:hidden'>
          <LanguageSwitcher
            locale={locale}
            onLocaleChange={onLocaleChange}
            ariaLabel={labels.languageLabel}
            buttonClassName='h-10 w-10'
          />
          <button
            type='button'
            aria-label={menuAria}
            aria-expanded={menuOpen}
            aria-controls='hero-menu'
            onClick={() => setMenuOpen((open) => !open)}
            className='inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/85 transition hover:text-white'
          >
            {menuLabel}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div
          id='hero-menu'
          className='md:hidden border-t border-white/10 bg-white/10 backdrop-blur-lg'
        >
          <div className='flex flex-col gap-4 px-6 py-4 text-xs uppercase tracking-[0.28em] text-white/75'>
            <a
              href='#localizacao'
              className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
              onClick={() => setMenuOpen(false)}
            >
              {labels.location}
            </a>
            <a
              href='#obra'
              className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
              onClick={() => setMenuOpen(false)}
            >
              {labels.works}
            </a>
            <a
              href='#perfil'
              className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
              onClick={() => setMenuOpen(false)}
            >
              {labels.investment}
            </a>
            <a
              href={whatsappLink}
              target='_blank'
              rel='noreferrer'
              className='transition hover:text-[#B7925A] hover:drop-shadow-[0_0_10px_rgba(183,146,90,0.55)]'
              onClick={() => setMenuOpen(false)}
            >
              {labels.contact}
            </a>
            <LanguageSwitcher
              locale={locale}
              onLocaleChange={onLocaleChange}
              ariaLabel={labels.languageLabel}
              className='mt-2 w-fit'
            />
          </div>
        </div>
      )}
    </header>
  );
};
