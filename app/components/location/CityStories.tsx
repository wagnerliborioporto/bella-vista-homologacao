import type { Locale } from '@/app/types';
import { regionImages } from '@/app/lib/constants';
import { OptimizedImage } from '@/app/components/shared/OptimizedImage';

type Story = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: number;
};

const storiesByLocale: Record<Locale, Story[]> = {
  pt: [
    {
      eyebrow: 'COROA VERMELHA',
      title: 'Um encontro entre história, cultura e beleza natural.',
      image: 0,
      paragraphs: [
        'Coroa Vermelha reúne mar de águas tranquilas, paisagens tropicais e uma memória ligada aos primeiros capítulos da história do Brasil. Em abril de 1500, a região recebeu a frota portuguesa e ficou associada ao encontro entre diferentes povos e à celebração da primeira missa em território brasileiro.',
        'Hoje, a localidade preserva referências da cultura Pataxó, manifestações artesanais, gastronomia regional e uma faixa de praia muito procurada por moradores e visitantes. Essa combinação aproxima o Bella Vista de experiências culturais e naturais durante todo o ano.',
      ],
    },
    {
      eyebrow: 'RIO MUTARI',
      title: 'Um marco histórico ao lado do Bella Vista.',
      image: 5,
      paragraphs: [
        'Segundo o registro histórico apresentado nos materiais da região, o Rio Mutari aparece na carta de Pero Vaz de Caminha como ponto de abastecimento de água da frota de Pedro Álvares Cabral. O curso d’água integra a paisagem que acolheu os primeiros navegantes portugueses em 1500.',
        'Além da relevância histórica, o rio compõe um ambiente de vegetação, biodiversidade e tranquilidade próximo ao empreendimento. Passado e presente convivem em uma paisagem que reforça a identidade singular da Praia do Mutari.',
      ],
    },
    {
      eyebrow: 'COSTA DO DESCOBRIMENTO',
      title: 'Destinos reconhecidos a poucos quilômetros de casa.',
      image: 4,
      paragraphs: [
        'A localização permite acessar Porto Seguro, Arraial d’Ajuda, Trancoso e Santa Cruz Cabrália. Cada destino oferece uma experiência própria: centro histórico, praias, gastronomia, vida noturna, vilas charmosas e manifestações culturais.',
        'Porto Seguro concentra serviços e conexões aéreas; Arraial d’Ajuda combina praias e a Rua do Mucugê; Trancoso reúne o Quadrado e algumas das paisagens mais conhecidas da Bahia. O Bella Vista se posiciona entre esses atrativos e a tranquilidade da Praia do Mutari.',
      ],
    },
  ],
  en: [
    {
      eyebrow: 'COROA VERMELHA',
      title: 'Where history, culture and natural beauty meet.',
      image: 0,
      paragraphs: [
        'Coroa Vermelha combines calm waters, tropical landscapes and memories connected to the earliest chapters of Brazilian history. The area is also known for Pataxó culture, local crafts and regional cuisine.',
        'Its beaches and cultural attractions place Bella Vista close to meaningful experiences throughout the year.',
      ],
    },
    {
      eyebrow: 'MUTARI RIVER',
      title: 'A historical landmark beside Bella Vista.',
      image: 5,
      paragraphs: [
        'Regional historical material associates the Mutari River with the water supply stop described during the Portuguese fleet’s arrival in 1500.',
        'Today the river enriches the landscape with vegetation, biodiversity and a peaceful natural setting near the residence.',
      ],
    },
    {
      eyebrow: 'DISCOVERY COAST',
      title: 'Renowned destinations only a short drive away.',
      image: 4,
      paragraphs: [
        'Porto Seguro, Arraial d’Ajuda, Trancoso and Santa Cruz Cabrália offer historic sites, beaches, dining, nightlife and cultural experiences.',
        'Bella Vista sits between these attractions and the quieter atmosphere of Mutari Beach.',
      ],
    },
  ],
  it: [
    {
      eyebrow: 'COROA VERMELHA',
      title: 'Storia, cultura e bellezza naturale nello stesso luogo.',
      image: 0,
      paragraphs: [
        'Coroa Vermelha unisce acque tranquille, paesaggi tropicali e memorie legate ai primi capitoli della storia brasiliana. La zona conserva inoltre riferimenti alla cultura Pataxó, all’artigianato e alla cucina locale.',
        'Le spiagge e le attrazioni culturali avvicinano Bella Vista a esperienze autentiche durante tutto l’anno.',
      ],
    },
    {
      eyebrow: 'RIO MUTARI',
      title: 'Un riferimento storico accanto a Bella Vista.',
      image: 5,
      paragraphs: [
        'I materiali storici regionali associano il Rio Mutari al punto di rifornimento d’acqua descritto durante l’arrivo della flotta portoghese nel 1500.',
        'Oggi il fiume arricchisce il paesaggio con vegetazione, biodiversità e tranquillità vicino al residence.',
      ],
    },
    {
      eyebrow: 'COSTA DELLA SCOPERTA',
      title: 'Destinazioni famose a breve distanza.',
      image: 4,
      paragraphs: [
        'Porto Seguro, Arraial d’Ajuda, Trancoso e Santa Cruz Cabrália offrono centri storici, spiagge, gastronomia, vita notturna e cultura.',
        'Bella Vista si trova tra queste attrazioni e la tranquillità della Praia do Mutari.',
      ],
    },
  ],
};

type Props = {
  locale: Locale;
};

export const CityStories = ({ locale }: Props) => {
  const stories = storiesByLocale[locale];

  return (
    <section id='historias' className='section-shell section-alt section-glow section-divider scroll-mt-24'>
      <div className='section-inner'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-xs uppercase tracking-[0.32em] text-[var(--muted)]'>
            {locale === 'pt' ? 'HISTÓRIAS DA REGIÃO' : locale === 'en' ? 'REGIONAL STORIES' : 'STORIE DEL TERRITORIO'}
          </p>
          <h2 className='section-title mt-3 font-semibold text-[var(--text)]'>
            {locale === 'pt'
              ? 'Muito além da praia: conheça o lugar onde o Bella Vista está inserido.'
              : locale === 'en'
                ? 'Beyond the beach: discover the place surrounding Bella Vista.'
                : 'Oltre la spiaggia: scopri il territorio che circonda Bella Vista.'}
          </h2>
        </div>

        <div className='mt-12 space-y-10 md:space-y-16'>
          {stories.map((story, index) => {
            const image = regionImages[story.image];
            return (
              <article
                key={story.title}
                className='grid items-center gap-7 rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.24)] md:grid-cols-2 md:gap-10 md:p-6'
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${index % 2 ? 'md:order-2' : ''}`}>
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes='(min-width: 768px) 48vw, 100vw'
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent' />
                </div>

                <div className={`px-2 pb-3 md:px-2 md:pb-0 ${index % 2 ? 'md:order-1' : ''}`}>
                  <p className='text-[0.65rem] uppercase tracking-[0.34em] text-[var(--gold)]'>
                    {story.eyebrow}
                  </p>
                  <h3 className='mt-3 text-2xl font-semibold leading-tight text-[var(--text)] md:text-3xl'>
                    {story.title}
                  </h3>
                  <div className='mt-5 space-y-4 text-sm leading-7 text-[var(--muted)] md:text-base'>
                    {story.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
