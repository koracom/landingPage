import * as React from 'react';

import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/utils/cn';

type RevealProps = {
  children: React.ReactNode;
  /** Decalage d'apparition en millisecondes, pour un effet d'escalier. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
};

/**
 * Revele son contenu quand il entre dans le viewport.
 * Neutralise automatiquement si l'utilisateur a demande moins d'animations.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: RevealProps) => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  // createElement evite le typage polymorphe du ref selon la balise rendue.
  return React.createElement(
    Tag as React.ElementType,
    {
      ref,
      className: cn(isVisible ? 'animate-ko-rise' : 'opacity-0', className),
      style: isVisible && delay ? { animationDelay: `${delay}ms` } : undefined,
    },
    children,
  );
};
