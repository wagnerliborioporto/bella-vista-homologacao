import type { PresetKey, SimulatorValues } from '@/app/types';

export const heroPoster =
  'https://res.cloudinary.com/dwedcl97k/video/upload/so_0,f_jpg,w_1600/v1769199580/Design_sem_nome_-_2026-01-23T171932.339_fjulxo.mp4';

export const heroVideoSources = {
  mobile:
    'https://res.cloudinary.com/dwedcl97k/video/upload/f_auto,q_auto:good,w_960/v1769199580/Design_sem_nome_-_2026-01-23T171932.339_fjulxo.mp4',
  desktop:
    'https://res.cloudinary.com/dwedcl97k/video/upload/f_auto,q_auto:best,w_1920/v1769199580/Design_sem_nome_-_2026-01-23T171932.339_fjulxo.mp4',
};

export const blurDataUrl =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjMGYxNjIwIi8+PC9zdmc+';

export const showcaseImages = {
  studio: [
    'https://i.postimg.cc/mksDjFhJ/Whats-App-Image-2026-01-22-at-12-04-21.jpg',
    'https://i.postimg.cc/GpTm1jyg/Whats-App-Image-2026-01-22-at-12-04-21-(2).jpg',
    'https://i.postimg.cc/mDNRbp2p/Whats-App-Image-2026-01-22-at-12-04-21-(1).jpg',
  ],
  apt2: [
    'https://i.postimg.cc/pV5VhCch/Whats-App-Image-2026-01-22-at-12-04-20.jpg',
    'https://i.postimg.cc/vZYdztXF/Whats-App-Image-2026-01-22-at-12-04-20-(1).jpg',
  ],
  apt3: [
    'https://i.postimg.cc/LsrVzVfh/CASA-TIPO-E-5.png',
    'https://i.postimg.cc/xTtysQMH/CASA-TIPO-E-6.png',
  ],
  amenities: [
    'https://i.postimg.cc/kX7Z3XSm/Design-sem-nome-2026-01-24T013513-644.png',
    'https://i.postimg.cc/6QBTCZ4p/Design-sem-nome-2026-01-24T013506-098.png',
    'https://i.postimg.cc/gJTJ9BM5/Design-sem-nome-2026-01-24T013459-346.png',
    'https://i.postimg.cc/qq67pXS1/Design-sem-nome-2026-01-24T013356-074.png',
  ],
};

export const progressImages = [
  'https://i.postimg.cc/bwQR1PBD/20251204-082816-(1).jpg',
  'https://i.postimg.cc/tT7mRvNb/20251204-082550-(1).jpg',
  'https://i.postimg.cc/9fwJvwmZ/20251204-082247-(1).jpg',
  'https://i.postimg.cc/90rCyBPd/20251113-080300.jpg',
];

export const simulatorPresets: { key: PresetKey; values: SimulatorValues }[] = [
  {
    key: 'conservative',
    values: {
      propertyValue: 260000,
      dailyRate: 220,
      occupancy: 45,
      monthlyCosts: 650,
      platformFee: 12,
    },
  },
  {
    key: 'realistic',
    values: {
      propertyValue: 250000,
      dailyRate: 250,
      occupancy: 55,
      monthlyCosts: 650,
      platformFee: 12,
    },
  },
  {
    key: 'high',
    values: {
      propertyValue: 250000,
      dailyRate: 320,
      occupancy: 70,
      monthlyCosts: 720,
      platformFee: 12,
    },
  },
];

export const mapEmbedUrl =
  'https://www.google.com/maps?q=Bella%20Vista%20Beach%20Residence%2C%20BA-001%2C%20Km%20367%2C%20Praia%20do%20Mutari%2C%20Santa%20Cruz%20Cabr%C3%A1lia%20-%20BA&output=embed';

export const mapLocationUrl =
  process.env.NEXT_PUBLIC_MAP_LOCATION_URL ??
  'https://www.google.com/maps?q=Bella%20Vista%20Beach%20Residence%2C%20BA-001%2C%20Km%20367%2C%20Praia%20do%20Mutari%2C%20Santa%20Cruz%20Cabr%C3%A1lia%20-%20BA';

export const baseWhatsAppUrl = `https://wa.me/${
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '557399833471'
}`;

export const formsEnabled = process.env.NEXT_PUBLIC_ENABLE_FORMS === 'true';
export const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

export const languageOptions: { value: 'pt' | 'en' | 'it'; label: string; name: string }[] =
  [
    { value: 'pt', label: 'PT', name: 'Português' },
    { value: 'en', label: 'EN', name: 'English' },
    { value: 'it', label: 'IT', name: 'Italiano' },
  ];
