'use client';

import { useState } from 'react';
import { officialLogoDataUrl } from '@/app/lib/officialBrand';

const STATIC_LOGO_PATH = './bella-vista-logo-oficial.svg';

/**
 * Usa primeiro o arquivo estático da marca. Isso evita que uma string base64
 * extensa seja processada dentro do JavaScript da página. A imagem incorporada
 * permanece apenas como contingência caso o arquivo estático não carregue.
 */
export const OfficialLogo = () => {
  const [source, setSource] = useState(STATIC_LOGO_PATH);

  return (
    <img
      data-brand-logo='original'
      src={source}
      alt='Bella Vista Beach Residence'
      width={393}
      height={103}
      className='block h-auto w-[214px] shrink-0 object-contain md:w-[244px]'
      onError={() => {
        if (source !== officialLogoDataUrl) setSource(officialLogoDataUrl);
      }}
    />
  );
};
