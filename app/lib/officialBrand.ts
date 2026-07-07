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

export const officialLogoCandidates = [
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA.webp',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA.png',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/logo-bella-vista.webp',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/logo-bella-vista.png',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA-DOURADO.webp',
  'https://bellavistaresidence.com.br/wp-content/uploads/2025/03/LOGO-BELLA-VISTA-BRANCO.webp',
] as const;

const normalize = (value = '') =>
  value
    .replace(/<[^>]+>/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const scoreMedia = (media: WordPressMedia) => {
  const url = normalize(media.source_url);
  const slug = normalize(media.slug);
  const title = normalize(media.title?.rendered);
  const alt = normalize(media.alt_text);
  const searchable = `${url} ${slug} ${title} ${alt}`;
  let score = 0;

  if (searchable.includes('bella vista')) score += 180;
  if (searchable.includes('bella-vista')) score += 150;
  if (searchable.includes('logo')) score += 120;
  if (searchable.includes('beach residence')) score += 60;
  if (url.includes('branco')) score -= 45;
  if (url.includes('favicon') || url.includes('icon')) score -= 90;
  if (media.mime_type?.startsWith('image/')) score += 20;

  const width = media.media_details?.width ?? 0;
  const height = media.media_details?.height ?? 0;
  if (width > height * 2) score += 45;
  if (width >= 400) score += 15;

  return score;
};

export const findOfficialLogoUrl = async (): Promise<string | null> => {
  try {
    const endpoint =
      'https://bellavistaresidence.com.br/wp-json/wp/v2/media?search=logo&per_page=100&_fields=slug,source_url,mime_type,title,alt_text,media_details';
    const response = await fetch(endpoint, { cache: 'no-store' });
    if (!response.ok) return null;
    const media = (await response.json()) as WordPressMedia[];
    const selected = media
      .filter((item) => item.source_url && item.mime_type?.startsWith('image/'))
      .sort((a, b) => scoreMedia(b) - scoreMedia(a))[0];
    return selected?.source_url ?? null;
  } catch {
    return null;
  }
};

export const withBrandCacheBust = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}brand=original-20260706`;
