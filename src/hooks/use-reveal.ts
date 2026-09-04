import * as React from 'react';

import { usePrefersReducedMotion } from './use-prefers-reduced-motion';

type UseRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

/**
 * Revele un element une seule fois lorsqu'il entre dans le viewport.
 * Retourne `true` immediatement si l'utilisateur a demande moins d'animations
 * ou si IntersectionObserver n'est pas disponible.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -6% 0px',
}: UseRevealOptions = {}) => {
  const ref = React.useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setIsVisible(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, rootMargin]);

  return { ref, isVisible };
};
