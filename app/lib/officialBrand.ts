export const officialLogoPath = './bella-vista-logo-oficial.svg';

// Mantém o nome já utilizado pelo cabeçalho e pelo gerador de PDF.
// A origem agora é um arquivo estático real, em vez de uma string base64 extensa.
export const officialLogoDataUrl = officialLogoPath;

export const officialLogoCandidates = [officialLogoPath] as const;

export const findOfficialLogoUrl = async (): Promise<string> => officialLogoPath;

export const withBrandCacheBust = (url: string) => url;
