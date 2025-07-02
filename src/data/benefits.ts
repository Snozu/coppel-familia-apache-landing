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
    id: 'technology-india',
    title: 'Tecnología premiada en<br>India',
    description: 'Innovación y calidad reconocida internacionalmente',
    image: {
      src: '/benefits/benefits_1.webp',
      alt: 'Tecnología premiada en India - Motor TVS',
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
    id: 'smart-connectivity',
    title: 'Conectividad SmartXonnect',
    description: 'Conexión inteligente para una experiencia digital completa',
    image: {
      src: '/benefits/benefits_2.webp',
      alt: 'Conectividad SmartXonnect - Panel digital TVS',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 100,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'connectivity',
      priority: 2,
      featured: true
    }
  },
  {
    id: 'easy-maintenance',
    title: 'Fácil mantenimiento y<br>servicios en todo México',
    description: 'Red de servicio nacional con repuestos disponibles',
    image: {
      src: '/benefits/benefits_3.webp',
      alt: 'Fácil mantenimiento - Servicio técnico TVS',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'service',
      priority: 3,
      featured: true
    }
  },
  {
    id: 'racing-dna',
    title: 'ADN deportivo,<br>legado Apache',
    description: 'Herencia de competición y rendimiento extremo',
    image: {
      src: '/benefits/benefits_4.webp',
      alt: 'ADN deportivo legado Apache - Motocicleta TVS Racing',
      width: 400,
      height: 400
    },
    animation: {
      duration: 600,
      delay: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    metadata: {
      category: 'performance',
      priority: 4,
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