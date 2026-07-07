export type WordPressMedia = {
  slug?: string;
  source_url?: string;
  mime_type?: string;
  title?: { rendered?: string };
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
};

const officialLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="470" height="161" viewBox="0 0 470 161" role="img" aria-label="Bella Vista Beach Residence">
  <g transform="translate(0 20)">
    <g fill="none" stroke="#C59B25" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="57" cy="60" r="47" stroke-width="4.5"/>
      <path d="M19 53h72L38 91" stroke-width="4.5"/>
      <path d="M25 42h61L47 68" stroke-width="4.5"/>
    </g>
    <g fill="#C59B25">
      <path d="M32 31c10-10 22-12 38-8-10 1-17 5-23 12-5-4-10-5-15-4Z"/>
      <path d="M48 29c9-9 19-12 33-10-9 3-15 7-20 14-5-3-9-4-13-4Z" opacity=".9"/>
    </g>
    <text x="125" y="58" fill="#C59B25" font-family="Montserrat, Poppins, Arial, sans-serif" font-size="31" font-weight="600" letter-spacing="4.8">BELLA VISTA</text>
    <text x="128" y="84" fill="#C59B25" font-family="Montserrat, Poppins, Arial, sans-serif" font-size="12.5" font-weight="500" letter-spacing="5.1">BEACH RESIDENCE</text>
  </g>
</svg>`;

export const officialLogoDataUrl =
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(officialLogoSvg)}`;

export const officialLogoCandidates = [
  officialLogoDataUrl,
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA-DOURADO.webp',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA.webp',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA.png',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/logo-bella-vista.webp',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/logo-bella-vista.png',
] as const;

/**
 * Retorna sempre a mesma identidade visual usada no cabeçalho e no PDF.
 * A marca fica incorporada no projeto para não depender do WordPress,
 * de CORS ou de uma variante diferente encontrada na biblioteca de mídia.
 */
export const findOfficialLogoUrl = async (): Promise<string> => officialLogoDataUrl;

export const withBrandCacheBust = (url: string) => {
  if (url.startsWith('data:')) return url;
  return `${url}${url.includes('?') ? '&' : '?'}brand=original-20260706`;
};
