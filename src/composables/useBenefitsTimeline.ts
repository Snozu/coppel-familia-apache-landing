// Custom composable for Benefits Timeline logic
import type { Benefit, BenefitsConfig } from '../data/benefits';

export interface TimelineState {
  currentBenefit: number;
  isAnimating: boolean;
  isPaused: boolean;
  isVisible: boolean;
  isHovered: boolean;
}

export interface TimelineActions {
  nextBenefit: () => void;
  prevBenefit: () => void;
  goToBenefit: (index: number) => void;
  pauseTimeline: () => void;
  resumeTimeline: () => void;
  togglePause: () => void;
}

export interface TimelineCallbacks {
  onBenefitChange?: (benefit: Benefit, index: number) => void;
  onAnimationStart?: (index: number) => void;
  onAnimationEnd?: (index: number) => void;
  onPause?: () => void;
  onResume?: () => void;
}

export class BenefitsTimelineManager {
  private state: TimelineState;
  private benefits: Benefit[];
  private config: BenefitsConfig;
  private callbacks: TimelineCallbacks;
  private autoAdvanceInterval: number | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private animationFrame: number | null = null;

  constructor(
    benefits: Benefit[],
    config: BenefitsConfig,
    callbacks: TimelineCallbacks = {}
  ) {
    this.benefits = benefits;
    this.config = config;
    this.callbacks = callbacks;
    
    this.state = {
      currentBenefit: 0,
      isAnimating: false,
      isPaused: false,
      isVisible: false,
      isHovered: false
    };
  }

  // Initialize the timeline with Intersection Observer
  init(element: HTMLElement): void {
    this.setupIntersectionObserver(element);
    this.setupEventListeners(element);
  }

  // Setup Intersection Observer for performance
  private setupIntersectionObserver(element: HTMLElement): void {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.state.isVisible = true;
      this.startAutoAdvance();
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.state.isVisible = entry.isIntersecting;
          
          if (entry.isIntersecting) {
            this.startAutoAdvance();
          } else {
            this.stopAutoAdvance();
          }
        });
      },
      {
        threshold: 0.3, // Start when 30% visible
        rootMargin: '0px 0px -10% 0px'
      }
    );

    this.intersectionObserver.observe(element);
  }

  // Setup event listeners for interactions
  private setupEventListeners(element: HTMLElement): void {
    // Hover events for auto-pause
    if (this.config.autoAdvance.pauseOnHover) {
      element.addEventListener('mouseenter', () => {
        this.state.isHovered = true;
        this.pauseTimeline();
      });

      element.addEventListener('mouseleave', () => {
        this.state.isHovered = false;
        if (this.state.isVisible) {
          this.resumeTimeline();
        }
      });
    }

    // Focus events for accessibility
    if (this.config.autoAdvance.pauseOnFocus) {
      element.addEventListener('focusin', () => {
        this.pauseTimeline();
      });

      element.addEventListener('focusout', () => {
        if (this.state.isVisible && !this.state.isHovered) {
          this.resumeTimeline();
        }
      });
    }

    // Keyboard navigation
    if (this.config.interaction.keyboardNavigation) {
      element.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.prevBenefit();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextBenefit();
            break;
          case ' ':
            e.preventDefault();
            this.togglePause();
            break;
        }
      });
    }

    // Touch/Mouse events for swipe
    this.setupSwipeEvents(element);
    
    // Pinch-to-zoom gestures for mobile
    this.setupPinchZoom(element);
  }

  // Setup swipe gesture events
  private setupSwipeEvents(element: HTMLElement): void {
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const handleStart = (clientX: number, clientY: number) => {
      startX = clientX;
      startY = clientY;
      isDragging = true;
      this.pauseTimeline();
    };

    const handleEnd = (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const diffX = clientX - startX;
      const diffY = clientY - startY;
      const absDiffX = Math.abs(diffX);
      const absDiffY = Math.abs(diffY);

      // Only process horizontal swipes
      if (absDiffX > absDiffY && absDiffX > this.config.interaction.swipeThreshold) {
        if (diffX > 0) {
          this.prevBenefit();
        } else {
          this.nextBenefit();
        }
      }

      isDragging = false;
      if (this.state.isVisible && !this.state.isHovered) {
        this.resumeTimeline();
      }
    };

    // Touch events
    element.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      handleEnd(touch.clientX, touch.clientY);
    }, { passive: true });

    // Mouse events
    element.addEventListener('mousedown', (e) => {
      handleStart(e.clientX, e.clientY);
      e.preventDefault();
    });

    document.addEventListener('mouseup', (e) => {
      handleEnd(e.clientX, e.clientY);
    });
  }

  // Setup pinch-to-zoom gesture events for mobile
  private setupPinchZoom(element: HTMLElement): void {
    let initialDistance = 0;
    let initialScale = 1;
    let currentScale = 1;
    const maxScale = 2;
    const minScale = 0.8;

    const getDistance = (touches: TouchList): number => {
      if (touches.length < 2) return 0;
      const touch1 = touches[0];
      const touch2 = touches[1];
      return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    };

    element.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        initialDistance = getDistance(e.touches);
        initialScale = currentScale;
        this.pauseTimeline();
      }
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scale = (currentDistance / initialDistance) * initialScale;
        
        currentScale = Math.min(Math.max(scale, minScale), maxScale);
        
        const circles = element.querySelectorAll('.benefit-circle') as NodeListOf<HTMLElement>;
        circles.forEach(circle => {
          circle.style.transform = `scale(${currentScale})`;
        });
      }
    }, { passive: false });

    element.addEventListener('touchend', (e) => {
      if (e.touches.length < 2 && initialDistance > 0) {
        initialDistance = 0;
        
        // Reset scale after pinch ends
        setTimeout(() => {
          const circles = element.querySelectorAll('.benefit-circle') as NodeListOf<HTMLElement>;
          circles.forEach(circle => {
            circle.style.transition = 'transform 0.3s ease';
            circle.style.transform = 'scale(1)';
          });
          
          setTimeout(() => {
            circles.forEach(circle => {
              circle.style.transition = '';
            });
          }, 300);
        }, 100);
        
        if (this.state.isVisible && !this.state.isHovered) {
          this.resumeTimeline();
        }
      }
    }, { passive: true });
  }

  // Navigation methods
  nextBenefit(): void {
    if (this.state.isAnimating) return;
    
    const nextIndex = (this.state.currentBenefit + 1) % this.benefits.length;
    this.goToBenefit(nextIndex);
  }

  prevBenefit(): void {
    if (this.state.isAnimating) return;
    
    const prevIndex = this.state.currentBenefit === 0 
      ? this.benefits.length - 1 
      : this.state.currentBenefit - 1;
    this.goToBenefit(prevIndex);
  }

  goToBenefit(index: number): void {
    if (this.state.isAnimating || index === this.state.currentBenefit) return;
    if (index < 0 || index >= this.benefits.length) return;

    this.state.isAnimating = true;
    this.state.currentBenefit = index;

    const benefit = this.benefits[index];
    
    this.callbacks.onAnimationStart?.(index);
    this.callbacks.onBenefitChange?.(benefit, index);

    // Use requestAnimationFrame for smooth animations
    this.animationFrame = requestAnimationFrame(() => {
      setTimeout(() => {
        this.state.isAnimating = false;
        this.callbacks.onAnimationEnd?.(index);
      }, this.config.animation.transitionDuration);
    });
  }

  // Timeline control methods
  pauseTimeline(): void {
    if (this.state.isPaused) return;
    
    this.state.isPaused = true;
    this.stopAutoAdvance();
    this.callbacks.onPause?.();
  }

  resumeTimeline(): void {
    if (!this.state.isPaused) return;
    
    this.state.isPaused = false;
    if (this.state.isVisible && this.config.autoAdvance.enabled) {
      this.startAutoAdvance();
    }
    this.callbacks.onResume?.();
  }

  togglePause(): void {
    if (this.state.isPaused) {
      this.resumeTimeline();
    } else {
      this.pauseTimeline();
    }
  }

  // Auto-advance functionality
  private startAutoAdvance(): void {
    if (!this.config.autoAdvance.enabled || this.state.isPaused) return;
    
    this.stopAutoAdvance();
    this.autoAdvanceInterval = window.setInterval(() => {
      if (!this.state.isAnimating && !this.state.isPaused) {
        this.nextBenefit();
      }
    }, this.config.autoAdvance.duration);
  }

  private stopAutoAdvance(): void {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  // Getters for state
  getCurrentBenefit(): Benefit {
    return this.benefits[this.state.currentBenefit];
  }

  getCurrentIndex(): number {
    return this.state.currentBenefit;
  }

  getState(): Readonly<TimelineState> {
    return { ...this.state };
  }

  // Cleanup method
  destroy(): void {
    this.stopAutoAdvance();
    
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
}

// Factory function for easy usage
export function createBenefitsTimeline(
  benefits: Benefit[],
  config: BenefitsConfig,
  callbacks?: TimelineCallbacks
): BenefitsTimelineManager {
  return new BenefitsTimelineManager(benefits, config, callbacks);
}