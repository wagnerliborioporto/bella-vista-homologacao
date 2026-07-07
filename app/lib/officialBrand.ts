export const officialLogoPath = './bella-vista-logo-transparente.svg';

// A mesma marca transparente é usada no cabeçalho e na geração do PDF.
export const officialLogoDataUrl = officialLogoPath;
export const officialLogoCandidates = [officialLogoPath] as const;

export const findOfficialLogoUrl = async (): Promise<string> => officialLogoPath;

export const withBrandCacheBust = (url: string) => url;
