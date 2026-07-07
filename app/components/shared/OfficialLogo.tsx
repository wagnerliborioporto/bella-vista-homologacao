'use client';

import { officialLogoPath } from '@/app/lib/officialBrand';

/**
 * Exibe a marca oficial já tratada com transparência real. O fundo do banner
 * permanece visível por trás de todo o símbolo e do lettering.
 */
export const OfficialLogo = () => (
  <img
    data-brand-logo='official-transparent'
    src={officialLogoPath}
    alt='Bella Vista Beach Residence'
    width={393}
    height={103}
    className='block h-auto w-[214px] shrink-0 bg-transparent object-contain md:w-[244px]'
  />
);
