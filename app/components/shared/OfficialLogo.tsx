'use client';

import { useEffect, useState } from 'react';
import {
  findOfficialLogoUrl,
  officialLogoCandidates,
  withBrandCacheBust,
} from '@/app/lib/officialBrand';

const OriginalLogoFallback = () => (
  <div className='flex items-center gap-3 text-[#C59B25]'>
    <svg
      viewBox='0 0 86 86'
      aria-hidden='true'
      className='h-14 w-14 shrink-0 md:h-16 md:w-16'
      fill='none'
    >
      <circle cx='43' cy='43' r='36' stroke='currentColor' strokeWidth='4' />
      <path d='M17 42h49L29 65' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
      <path d='M24 34h38L36 52' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
      <path d='M33 24c8-7 18-8 29-4-7 0-12 3-16 8-4-4-8-5-13-4Z' fill='currentColor' />
      <path d='M41 25c7-7 14-9 24-8-6 2-10 5-13 10-4-2-7-3-11-2Z' fill='currentColor' opacity='0.82' />
    </svg>
    <div className='leading-none'>
      <div className='text-[1.05rem] font-semibold tracking-[0.12em] md:text-[1.25rem]'>
        BELLA VISTA
      </div>
      <div className='mt-2 text-[0.56rem] tracking-[0.28em] md:text-[0.64rem]'>
        BEACH RESIDENCE
      </div>
    </div>
  </div>
);

export const OfficialLogo = () => {
  const [resolvedLogo, setResolvedLogo] = useState<string | null>(null);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [fallbackVisible, setFallbackVisible] = useState(false);

  useEffect(() => {
    let active = true;
    findOfficialLogoUrl().then((url) => {
      if (active && url) {
        setResolvedLogo(withBrandCacheBust(url));
        setFallbackVisible(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const fallbackCandidate = officialLogoCandidates[candidateIndex];
  const source = resolvedLogo ?? (fallbackCandidate ? withBrandCacheBust(fallbackCandidate) : null);

  if (fallbackVisible || !source) return <OriginalLogoFallback />;

  return (
    <img
      data-brand-logo='original'
      src={source}
      alt='Bella Vista Beach Residence'
      className='h-14 w-auto max-w-[255px] object-contain md:h-16 md:max-w-[300px]'
      onError={() => {
        if (resolvedLogo) {
          setResolvedLogo(null);
          setCandidateIndex(0);
          return;
        }
        if (candidateIndex < officialLogoCandidates.length - 1) {
          setCandidateIndex((current) => current + 1);
        } else {
          setFallbackVisible(true);
        }
      }}
    />
  );
};
