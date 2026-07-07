'use client';

import { useState } from 'react';
import type { Locale } from '@/app/types';
import { LanguageSwitcher } from '@/app/components/shared/LanguageSwitcher';
import { OfficialLogo } from '@/app/components/shared/OfficialLogo';

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
    <header className='fixed inset-x-0 top-0 z-50 overflow-hidden border-b border-white/5 bg-[#07131D]/92 backdrop-blur-lg shadow-[0_8px_24px_rgba(5,12,18,0.35)]'>
      <nav className='relative mx-auto flex min-h-[88px] max-w-6xl items-center justify-between px-5 py-3 text-white md:min-h-[98px] md:px-6'>
        <a
          href='#inicio'
          aria-label='Bella Vista Beach Residence — início'
          className='flex h-14 min-w-0 max-w-[255px] shrink-0 items-center overflow-hidden md:h-16 md:max-w-[300px]'
        >
          <OfficialLogo />
        </a>

        <div className='hidden items-center gap-6 text-xs uppercase tracking-[0.28em] text-white/80 md:flex lg:gap-8 lg:text-white/90'>
          <a
            href='#localizacao'
            className='transition hover:text-[#C9A13A] hover:drop-shadow-[0_0_10px_rgba(201,161,58,0.45)]'
          >
            {labels.location}
          </a>
          <a
            href='#obra'
            className='transition hover:text-[#C9A13A] hover:drop-shadow-[0_0_10px_rgba(201,161,58,0.45)]'
          >
            {labels.works}
          </a>
          <a
            href='#perfil'
            className='transition hover:text-[#C9A13A] hover:drop-shadow-[0_0_10px_rgba(201,161,58,0.45)]'
          >
            {labels.investment}
          </a>
          <a
            href={whatsappLink}
            target='_blank'
            rel='noreferrer'
            className='transition hover:text-[#C9A13A] hover:drop-shadow-[0_0_10px_rgba(201,161,58,0.45)]'
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
        <div id='hero-menu' className='border-t border-white/10 bg-[#07131D]/98 md:hidden'>
          <div className='flex flex-col gap-4 px-6 py-5 text-xs uppercase tracking-[0.28em] text-white/75'>
            <a href='#localizacao' onClick={() => setMenuOpen(false)} className='hover:text-[#C9A13A]'>
              {labels.location}
            </a>
            <a href='#obra' onClick={() => setMenuOpen(false)} className='hover:text-[#C9A13A]'>
              {labels.works}
            </a>
            <a href='#perfil' onClick={() => setMenuOpen(false)} className='hover:text-[#C9A13A]'>
              {labels.investment}
            </a>
            <a
              href={whatsappLink}
              target='_blank'
              rel='noreferrer'
              onClick={() => setMenuOpen(false)}
              className='hover:text-[#C9A13A]'
            >
              {labels.contact}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
