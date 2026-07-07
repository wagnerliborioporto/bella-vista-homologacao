'use client';

import { officialLogoDataUrl } from '@/app/lib/officialBrand';

/**
 * Exibe diretamente a arte oficial enviada, sem redesenho ou logo substituta.
 * A largura compensa somente a margem transparente usada para preservar a
 * proporção da mesma imagem dentro do PDF.
 */
export const OfficialLogo = () => (
  <img
    data-brand-logo='original'
    src={officialLogoDataUrl}
    alt='Bella Vista Beach Residence'
    className='h-auto w-[214px] max-w-none shrink-0 md:w-[244px]'
  />
);
