// Benefits configuration and types for scalable project structure
export interface Benefit {
  id: string;
  title: string;
  description?: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  animation?: {
    duration: number;
    delay: number;
    easing: string;
  };
  metadata?: {
    category: string;
    priority: number;
    featured: boolean;
  };
}

export interface BenefitsConfig {
  autoAdvance: {
    enabled: boolean;
    duration: number; // milliseconds
    pauseOnHover: boolean;
    pauseOnFocus: boolean;
  };
  animation: {
    transitionDuration: number;
    easingFunction: string;
    fadeInDelay: number;
    slideDistance: number;
  };
  responsive: {
    mobile: {
      circleSize: string;
      containerHeight: string;
      titleMinHeight: string;
    };
    tablet: {
      circleSize: string;
      containerHeight: string;
      titleMinHeight: string;
    };
    desktop: {
      circleSize: string;
      containerHeight: string;
      titleMinHeight: string;
    };
  };
  interaction: {
    swipeThreshold: number;
    touchSensitivity: number;
    keyboardNavigation: boolean;
    mouseNavigation: boolean;
  };
  accessibility: {
    announceChanges: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
  };
}

// Benefits data
export const benefits: Benefit[] = [
  {
    id: 'technology-performance',
    title: 'Tecnología y desempeño<br>accesible',
    description: [
      '• Motores eficientes y duraderos con bajo consumo de combustible',
      '• Encendido eléctrico y frenos de disco en la mayoría de los modelos',
      '• Componentes confiables como suspensión ajustable y tablero digital'
    ],
    image: {
      src: '/benefits/benefits_1.webp',
      alt: 'Tecnología y desempeño accesible - Motor TVS',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 0,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'technology',
      priority: 1,
      featured: true
    }
  },
  {
    id: 'design-functionality',
    title: 'Diseño y<br>funcionalidad',
    description: [
      '• Modelos con estilo deportivo o urbano, según tu necesidad',
      '• Asientos cómodos y manubrios ergonómicos para trayectos largos',
      '• Algunos modelos incluyen USB, defensa, parrilla de carga y faros LED'
    ],
    image: {
      src: '/benefits/benefits_2.webp',
      alt: 'Diseño y funcionalidad - Motocicleta TVS',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 100,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'design',
      priority: 2,
      featured: true
    }
  },
  {
    id: 'ready-for-everything',
    title: 'Listas para lo que<br>necesites',
    description: [
      '• Modelos para moverte, trabajar o rodar por gusto',
      '• Opciones ideales para delivery, traslado diario o primera moto',
      '• Capacidad de carga, buen torque y velocidad tope competitiva'
    ],
    image: {
      src: '/benefits/benefits_3.webp',
      alt: 'Listas para lo que necesites - Motocicleta TVS',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'versatility',
      priority: 3,
      featured: true
    }
  },
  {
    id: 'support-backing',
    title: 'Soporte y<br>respaldo',
    description: [
      '• Red de servicio TVS en toda la república',
      '• Primer servicio incluido tras la compra (500 o 1000 km según modelo)',
      '• Garantía de 24 meses o 30,000 km'
    ],
    image: {
      src: '/benefits/benefits_4.webp',
      alt: 'Soporte y respaldo - Servicio TVS',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'service',
      priority: 4,
      featured: true
    }
  },
  {
    id: 'international-legacy',
    title: 'Marca internacional<br>con legado',
    description: [
      '• Más de 100 años de experiencia',
      '• Presencia en más de 80 países',
      '• Asociaciones con marcas globales como BMW Motorrad'
    ],
    image: {
      src: '/benefits/benefits_1.webp',
      alt: 'Marca internacional con legado - TVS Global',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'legacy',
      priority: 5,
      featured: true
    }
  }
];

// Configuration settings
export const benefitsConfig: BenefitsConfig = {
  autoAdvance: {
    enabled: true,
    duration: 6000, // 6 seconds
    pauseOnHover: true,
    pauseOnFocus: true
  },
  animation: {
    transitionDuration: 600,
    easingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fadeInDelay: 200,
    slideDistance: 10
  },
  responsive: {
    mobile: {
      circleSize: 'w-78 h-78',
      containerHeight: 'h-104',
      titleMinHeight: 'min-h-[3rem]'
    },
    tablet: {
      circleSize: 'md:w-91 md:h-91',
      containerHeight: 'md:h-125',
      titleMinHeight: 'md:min-h-[4rem]'
    },
    desktop: {
      circleSize: 'lg:w-104 lg:h-104',
      containerHeight: '',
      titleMinHeight: 'lg:min-h-[5rem]'
    }
  },
  interaction: {
    swipeThreshold: 30,
    touchSensitivity: 1.2,
    keyboardNavigation: true,
    mouseNavigation: true
  },
  accessibility: {
    announceChanges: true,
    reducedMotion: true,
    highContrast: false
  }
};

// Utility functions
export const getBenefitById = (id: string): Benefit | undefined => {
  return benefits.find(benefit => benefit.id === id);
};

export const getFeaturedBenefits = (): Benefit[] => {
  return benefits.filter(benefit => benefit.metadata?.featured);
};

export const getBenefitsByCategory = (category: string): Benefit[] => {
  return benefits.filter(benefit => benefit.metadata?.category === category);
};

export const getNextBenefitId = (currentId: string): string => {
  const currentIndex = benefits.findIndex(benefit => benefit.id === currentId);
  const nextIndex = (currentIndex + 1) % benefits.length;
  const nextBenefit = benefits[nextIndex];
  if (!nextBenefit) {
    throw new Error(`Benefit not found at index ${nextIndex}`);
  }
  return nextBenefit.id;
};

export const getPreviousBenefitId = (currentId: string): string => {
  const currentIndex = benefits.findIndex(benefit => benefit.id === currentId);
  const prevIndex = currentIndex === 0 ? benefits.length - 1 : currentIndex - 1;
  const prevBenefit = benefits[prevIndex];
  if (!prevBenefit) {
    throw new Error(`Benefit not found at index ${prevIndex}`);
  }
  return prevBenefit.id;
};

// Export default for easier imports
export default {
  benefits,
  config: benefitsConfig,
  utils: {
    getBenefitById,
    getFeaturedBenefits,
    getBenefitsByCategory,
    getNextBenefitId,
    getPreviousBenefitId
  }
};