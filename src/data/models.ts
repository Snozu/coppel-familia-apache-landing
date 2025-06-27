export interface Spec { icon?: string; label: string; value: string; extra?: string }
export interface Model {
  logo: string;
  coppelUrl: string;
  slug: string;
  name: string;
  tagline: string;
  hero: string; // path to hero/fallback image
  model3d: string; // path to .glb file
  specs: Spec[];
  imageSequence?: string[];
}

export const models: Model[] = [
  {
    slug: 'rtr-160-4v',
    name: 'RTR 160 4V',
    tagline: 'RACING DNA UNLEASHED',
    logo: '/img/logos/rtr-160-4v.png',
    hero: '/images/modelos_360/RTR_160/RTR-160-2v_1.webp',
    coppelUrl: 'https://www.coppel.com/motos-apache-rtr-160-4v',
    model3d: '/models/rtr-160-4v.glb',
    specs: [
      { icon: '/icons/power.png', label: 'Potencia máx.', value: '16.3 HP', extra: '@8000 rpm' },
      { icon: '/icons/cc.png', label: 'Cilindrada', value: '159.7 cc' },
      { icon: '/icons/tank.png', label: 'Tanque', value: '12 L' },
    ],
  },
  {
    slug: 'rtr-160-2v',
    name: 'RTR 160 2V',
    tagline: 'PURE PERFORMANCE',
    logo: '/img/logos/rtr-160-2v.png',
    hero: '/images/modelos_360/RTR_160/RTR-160-2v_1.webp',
    coppelUrl: 'https://www.coppel.com/motos-apache-rtr-160-2v',
    model3d: '/models/rtr-160-2v.glb',
    specs: [
      { icon: '/icons/power.png', label: 'Potencia máx.', value: '13.95 HP', extra: '@8000 rpm' },
      { icon: '/icons/cc.png', label: 'Cilindrada', value: '159.7 cc' },
      { icon: '/icons/tank.png', label: 'Tanque', value: '16 L' },
    ],
    imageSequence: Array.from({ length: 23 }, (_, i) => `/images/modelos_360/RTR_160/RTR-160-2v_${i + 1}.webp`),
  },
];