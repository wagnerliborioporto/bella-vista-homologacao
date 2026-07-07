import type { Locale } from '@/app/types';
import { youtubeVideoId } from '@/app/lib/constants';

const copyByLocale = {
  pt: {
    tag: 'CONHEÇA O BELLA VISTA',
    title: 'Assista ao vídeo de apresentação.',
    body: 'Uma visão completa do conceito, dos ambientes e da experiência de viver ou investir no Bella Vista Beach Residence.',
    titleAttribute: 'Vídeo de apresentação do Bella Vista Beach Residence',
  },
  en: {
    tag: 'DISCOVER BELLA VISTA',
    title: 'Watch the official presentation.',
    body: 'A complete view of the concept, spaces and experience of living or investing at Bella Vista Beach Residence.',
    titleAttribute: 'Bella Vista Beach Residence presentation video',
  },
  it: {
    tag: 'SCOPRI BELLA VISTA',
    title: 'Guarda il video di presentazione.',
    body: 'Una panoramica completa del concept, degli ambienti e dell’esperienza di vivere o investire al Bella Vista Beach Residence.',
    titleAttribute: 'Video di presentazione Bella Vista Beach Residence',
  },
} satisfies Record<Locale, { tag: string; title: string; body: string; titleAttribute: string }>;

type Props = {
  locale: Locale;
};

export const MediaExperience = ({ locale }: Props) => {
  const copy = copyByLocale[locale];

  return (
    <section id='video' className='section-shell section-alt section-glow section-divider scroll-mt-24'>
      <div className='section-inner'>
        <div className='grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center'>
          <div className='text-center lg:text-left'>
            <p className='text-xs uppercase tracking-[0.32em] text-[var(--muted)]'>{copy.tag}</p>
            <h2 className='section-title mt-3 font-semibold text-[var(--text)]'>{copy.title}</h2>
            <p className='mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg'>{copy.body}</p>
          </div>

          <div className='overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_22px_55px_rgba(0,0,0,0.4)]'>
            <div className='relative aspect-video w-full'>
              <iframe
                className='absolute inset-0 h-full w-full'
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                title={copy.titleAttribute}
                loading='lazy'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
