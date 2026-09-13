import { cn } from '@/utils/cn';

import { koraMark } from '../data/kora-mark';

type KoraMarkArtProps = {
  className?: string;
};

/**
 * Le pictogramme kora en grand, comme sur le carton imprime : purement
 * decoratif, donc masque aux lecteurs d'ecran.
 */
export const KoraMarkArt = ({ className }: KoraMarkArtProps) => (
  <svg
    viewBox={koraMark.viewBox}
    aria-hidden="true"
    focusable="false"
    className={cn('pointer-events-none select-none', className)}
  >
    <path d={koraMark.path} fill="currentColor" fillRule={koraMark.fillRule} />
  </svg>
);
