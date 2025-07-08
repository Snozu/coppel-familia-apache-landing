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
}

export const models: Model[] = [
  {
    slug: 'rtr-200-4v',
    name: 'RTR 200 4V',
    tagline: 'RACING DNA UNLEASHED',
    logo: '/img/logos/rtr-200-4v.svg',
    hero: '/hero/models/RTR2004V.png',
    coppelUrl: 'https://www.coppel.com/motocicleta-tvs-rtr-4v-200-cc-2025-pm-5791083',
    model3d: '/models/rtr-200-4v.glb',
    specs: [
      { icon: '/icons/power.svg', label: 'Potencia máx.', value: '20.5 HP', extra: '@8500 rpm' },
      { icon: '/icons/cc.svg', label: 'Cilindrada', value: '197.75 cc' },
      { icon: '/icons/tank.svg', label: 'Tanque', value: '12 L' },
    ],
  },
  {
    slug: 'rtr-160-2v',
    name: 'RTR 160 2V',
    tagline: 'PURE PERFORMANCE',
    logo: '/img/logos/rtr-160-2v.svg',
    hero: '/hero/models/RTR1602V_.png',
    coppelUrl: 'https://www.coppel.com/motocicleta-tvs-apache-rtr-160-cc-2025-pm-5945653',
    model3d: '/models/rtr-160-2v.glb',
    specs: [
      { icon: '/icons/power.svg', label: 'Potencia máx.', value: '13.95 HP', extra: '@8000 rpm' },
      { icon: '/icons/cc.svg', label: 'Cilindrada', value: '159.7 cc' },
      { icon: '/icons/tank.svg', label: 'Tanque', value: '16 L' },
    ],
  },
  {
    slug: 'stryker',
    name: 'STRYKER',
    tagline: 'DOMINATE THE STREETS',
    logo: '/img/logos/stryker.svg',
    hero: '/hero/models/STRYKER.webp',
    coppelUrl: 'https://www.coppel.com/motocicleta-tvs-stryker-125-cc-2025-pm-5832883',
    model3d: '/models/stryker.glb',
    specs: [
      { icon: '/icons/power.svg', label: 'Potencia máx.', value: '15.8 HP', extra: '@7500 rpm' },
      { icon: '/icons/cc.svg', label: 'Cilindrada', value: '149.5 cc' },
      { icon: '/icons/tank.svg', label: 'Tanque', value: '13 L' },
    ],
  },
];