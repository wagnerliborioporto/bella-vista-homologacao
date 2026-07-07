import type { Locale, SimulatorResults, SimulatorValues } from '@/app/types';
import { findOfficialLogoUrl, officialLogoCandidates } from '@/app/lib/officialBrand';
import { formatCurrency } from '@/app/lib/utils';

type PdfCopy = {
  title: string;
  subtitle: string;
  propertyValue: string;
  dailyRate: string;
  occupancy: string;
  monthlyCosts: string;
  platformFee: string;
  grossMonthly: string;
  netMonthly: string;
  annualReturn: string;
  payback: string;
  paybackUnit: string;
};

type Options = {
  locale: Locale;
  values: SimulatorValues;
  results: SimulatorResults;
  copy: PdfCopy;
};

type PdfDocument = {
  setFillColor: (...args: number[]) => void;
  setDrawColor: (...args: number[]) => void;
  setTextColor: (...args: number[]) => void;
  setFont: (font: string, style?: string) => void;
  setFontSize: (size: number) => void;
  setLineWidth: (width: number) => void;
  rect: (x: number, y: number, width: number, height: number, style?: string) => void;
  roundedRect: (
    x: number,
    y: number,
    width: number,
    height: number,
    radiusX: number,
    radiusY: number,
    style?: string
  ) => void;
  circle: (x: number, y: number, radius: number, style?: string) => void;
  line: (x1: number, y1: number, x2: number, y2: number) => void;
  text: (
    text: string | string[],
    x: number,
    y: number,
    options?: Record<string, unknown>
  ) => void;
  splitTextToSize: (text: string, maxWidth: number) => string[];
  addImage: (
    imageData: string,
    format: string,
    x: number,
    y: number,
    width: number,
    height: number,
    alias?: string,
    compression?: string
  ) => void;
  save: (filename: string) => void;
};

declare global {
  interface Window {
    jspdf?: {
      jsPDF: new (options?: Record<string, unknown>) => PdfDocument;
    };
  }
}

let jsPdfLoadingPromise: Promise<void> | null = null;

const loadJsPdf = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('PDF disponível somente no navegador.'));
  }
  if (window.jspdf?.jsPDF) return Promise.resolve();
  if (jsPdfLoadingPromise) return jsPdfLoadingPromise;

  jsPdfLoadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-jspdf]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Falha ao carregar o gerador de PDF.')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.dataset.jspdf = 'true';
    script.src = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar o gerador de PDF.'));
    document.head.appendChild(script);
  });

  return jsPdfLoadingPromise;
};

const blobToPngDataUrl = async (blob: Blob) => {
  const objectUrl = URL.createObjectURL(blob);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error('Não foi possível preparar o logo.'));
      element.src = objectUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(image.naturalWidth, 1);
    canvas.height = Math.max(image.naturalHeight, 1);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas indisponível.');
    context.drawImage(image, 0, 0);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};

const getOfficialLogoDataUrl = async () => {
  const resolved = await findOfficialLogoUrl();
  const candidates = [resolved, ...officialLogoCandidates].filter(
    (value, index, array): value is string => Boolean(value) && array.indexOf(value) === index
  );

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { cache: 'no-store' });
      if (!response.ok) continue;
      return await blobToPngDataUrl(await response.blob());
    } catch {
      // Usa o próximo candidato e, por fim, a marca vetorial de segurança.
    }
  }
  return null;
};

const drawBrandFallback = (doc: PdfDocument, x: number, y: number) => {
  doc.setDrawColor(201, 161, 58);
  doc.setTextColor(201, 161, 58);
  doc.setLineWidth(0.8);
  doc.circle(x + 10, y + 10, 9, 'S');
  doc.line(x + 3, y + 8, x + 17, y + 8);
  doc.line(x + 4, y + 12, x + 16, y + 12);
  doc.line(x + 4, y + 12, x + 10, y + 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('BELLA VISTA', x + 24, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('B E A C H   R E S I D E N C E', x + 24, y + 13.2);
};

const localeCode = (locale: Locale) =>
  locale === 'en' ? 'en-US' : locale === 'it' ? 'it-IT' : 'pt-BR';

const formatDate = (locale: Locale) =>
  new Intl.DateTimeFormat(localeCode(locale), {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

const stringsByLocale = {
  pt: {
    report: 'RELATÓRIO DE SIMULAÇÃO',
    parameters: 'Parâmetros considerados',
    projection: 'Projeção financeira',
    comparison: 'Receita mensal estimada',
    gross: 'Faturamento bruto',
    net: 'Resultado líquido',
    noteTitle: 'Importante',
    note:
      'Esta simulação é meramente ilustrativa. Diárias, ocupação, despesas, tributos e resultados podem variar conforme mercado, operação, sazonalidade e características da unidade.',
    generated: 'Gerado em',
    footer: 'Bella Vista Beach Residence · Costa do Descobrimento · Bahia',
    site: 'bellavistaresidence.com.br',
  },
  en: {
    report: 'RETURN SIMULATION REPORT',
    parameters: 'Assumptions',
    projection: 'Financial projection',
    comparison: 'Estimated monthly revenue',
    gross: 'Gross revenue',
    net: 'Net result',
    noteTitle: 'Important',
    note:
      'This simulation is illustrative only. Rates, occupancy, expenses, taxes and results may vary according to market conditions, operation, seasonality and unit characteristics.',
    generated: 'Generated on',
    footer: 'Bella Vista Beach Residence · Discovery Coast · Bahia',
    site: 'bellavistaresidence.com.br',
  },
  it: {
    report: 'RELAZIONE DI SIMULAZIONE',
    parameters: 'Parametri considerati',
    projection: 'Proiezione finanziaria',
    comparison: 'Ricavo mensile stimato',
    gross: 'Fatturato lordo',
    net: 'Risultato netto',
    noteTitle: 'Importante',
    note:
      'Questa simulazione è puramente illustrativa. Tariffe, occupazione, costi, imposte e risultati possono variare in base al mercato, alla gestione, alla stagionalità e alle caratteristiche dell’unità.',
    generated: 'Generato il',
    footer: 'Bella Vista Beach Residence · Costa della Scoperta · Bahia',
    site: 'bellavistaresidence.com.br',
  },
} satisfies Record<Locale, Record<string, string>>;

export const generateProfessionalSimulationPdf = async ({
  locale,
  values,
  results,
  copy,
}: Options) => {
  await loadJsPdf();
  const JsPdf = window.jspdf?.jsPDF;
  if (!JsPdf) throw new Error('Gerador de PDF indisponível.');

  const doc = new JsPdf({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const text = stringsByLocale[locale];
  const pageWidth = 210;
  const pageHeight = 297;
  const navy = [7, 25, 36];
  const navySoft = [13, 43, 58];
  const gold = [201, 161, 58];
  const warm = [247, 245, 239];
  const ink = [28, 37, 42];
  const muted = [99, 108, 112];
  const white = [255, 255, 255];

  doc.setFillColor(...warm);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageWidth, 68, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 66.5, pageWidth, 1.5, 'F');

  const logo = await getOfficialLogoDataUrl();
  if (logo) {
    try {
      doc.addImage(logo, 'PNG', 15, 10, 73, 25, undefined, 'FAST');
    } catch {
      drawBrandFallback(doc, 15, 10);
    }
  } else {
    drawBrandFallback(doc, 15, 10);
  }

  doc.setTextColor(...white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(text.report, 15, 45);
  doc.setFontSize(23);
  doc.text(copy.title || 'Simulação de retorno', 15, 56);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(220, 225, 226);
  doc.text(`${text.generated} ${formatDate(locale)} · ${copy.subtitle}`, 15, 62);

  const sectionTitle = (title: string, y: number) => {
    doc.setTextColor(...ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, 15, y);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.7);
    doc.line(15, y + 3, 195, y + 3);
  };

  const parameterCard = (
    x: number,
    y: number,
    width: number,
    label: string,
    value: string
  ) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 222, 211);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, width, 22, 3, 3, 'FD');
    doc.setTextColor(...muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(label.toUpperCase(), x + 4, y + 7);
    doc.setTextColor(...ink);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.text(value, x + 4, y + 16);
  };

  sectionTitle(text.parameters, 79);
  parameterCard(15, 87, 56, copy.propertyValue, formatCurrency(values.propertyValue, locale));
  parameterCard(77, 87, 56, copy.dailyRate, formatCurrency(values.dailyRate, locale));
  parameterCard(139, 87, 56, copy.occupancy, `${values.occupancy}%`);
  parameterCard(15, 113, 87, copy.monthlyCosts, formatCurrency(values.monthlyCosts, locale));
  parameterCard(108, 113, 87, copy.platformFee, `${values.platformFee}%`);

  sectionTitle(text.projection, 149);

  const resultCard = (
    x: number,
    y: number,
    width: number,
    label: string,
    value: string,
    featured = false
  ) => {
    doc.setFillColor(...(featured ? navySoft : white));
    doc.setDrawColor(...(featured ? gold : [226, 222, 211]));
    doc.setLineWidth(featured ? 0.65 : 0.3);
    doc.roundedRect(x, y, width, 29, 3, 3, 'FD');
    doc.setTextColor(...(featured ? [216, 222, 224] : muted));
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.text(label.toUpperCase(), x + 4, y + 8);
    doc.setTextColor(...(featured ? gold : ink));
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(featured ? 16 : 14);
    doc.text(value, x + 4, y + 21);
  };

  const paybackLabel = results.paybackYears
    ? `${results.paybackYears.toFixed(1)} ${copy.paybackUnit}`
    : '—';
  resultCard(15, 157, 87, copy.grossMonthly, formatCurrency(results.grossMonthly, locale));
  resultCard(108, 157, 87, copy.netMonthly, formatCurrency(results.netMonthly, locale));
  resultCard(15, 191, 87, copy.annualReturn, `${results.annualReturn.toFixed(1)}%`, true);
  resultCard(108, 191, 87, copy.payback, paybackLabel, true);

  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(text.comparison, 15, 232);

  const maxBar = Math.max(results.grossMonthly, results.netMonthly, 1);
  const grossWidth = Math.max(8, (results.grossMonthly / maxBar) * 115);
  const netWidth = Math.max(8, (Math.max(results.netMonthly, 0) / maxBar) * 115);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...muted);
  doc.text(text.gross, 15, 241);
  doc.setFillColor(224, 218, 202);
  doc.roundedRect(52, 237, 122, 6, 3, 3, 'F');
  doc.setFillColor(...gold);
  doc.roundedRect(52, 237, grossWidth, 6, 3, 3, 'F');
  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(results.grossMonthly, locale), 178, 241, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...muted);
  doc.text(text.net, 15, 252);
  doc.setFillColor(224, 218, 202);
  doc.roundedRect(52, 248, 122, 6, 3, 3, 'F');
  doc.setFillColor(...navySoft);
  doc.roundedRect(52, 248, netWidth, 6, 3, 3, 'F');
  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(results.netMonthly, locale), 178, 252, { align: 'right' });

  doc.setFillColor(236, 232, 221);
  doc.roundedRect(15, 262, 180, 19, 3, 3, 'F');
  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(text.noteTitle.toUpperCase(), 20, 269);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...muted);
  doc.setFontSize(6.8);
  const noteLines = doc.splitTextToSize(text.note, 165);
  doc.text(noteLines, 20, 274);

  doc.setFillColor(...navy);
  doc.rect(0, 286, pageWidth, 11, 'F');
  doc.setTextColor(225, 230, 231);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text(text.footer, 15, 292.7);
  doc.setTextColor(...gold);
  doc.setFont('helvetica', 'bold');
  doc.text(text.site, 195, 292.7, { align: 'right' });

  doc.save('bella-vista-simulacao-profissional.pdf');
};
