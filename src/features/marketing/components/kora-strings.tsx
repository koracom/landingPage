import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/utils/cn';

type KoraStringsProps = {
  variant?: 'hero' | 'wide';
  className?: string;
};

const HERO_CORDS = [
  { d: 'M548 8 40 420', opacity: 0.2 },
  { d: 'M548 8 130 432', opacity: 0.18 },
  { d: 'M548 8 216 440', opacity: 0.16 },
  { d: 'M548 8 306 440', opacity: 0.14 },
  { d: 'M548 8 398 438', opacity: 0.13 },
  { d: 'M548 8 480 430', opacity: 0.12 },
];

const WIDE_CORDS = [
  { d: 'M600 -40 -60 460', opacity: 0.14 },
  { d: 'M600 -40 180 470', opacity: 0.12 },
  { d: 'M600 -40 420 476', opacity: 0.1 },
  { d: 'M600 -40 780 476', opacity: 0.1 },
  { d: 'M600 -40 1020 470', opacity: 0.12 },
  { d: 'M600 -40 1260 460', opacity: 0.14 },
];

/**
 * Motif signature : les cordes d'une kora convergeant vers le chevalet.
 * Purement decoratif, jamais annonce aux lecteurs d'ecran.
 */
export const KoraStrings = ({
  variant = 'hero',
  className,
}: KoraStringsProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHero = variant === 'hero';
  const cords = isHero ? HERO_CORDS : WIDE_CORDS;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={isHero ? '0 0 560 440' : '0 0 1200 420'}
      preserveAspectRatio={isHero ? 'xMaxYMax slice' : 'none'}
      fill="none"
      className={cn('pointer-events-none absolute', className)}
    >
      <g stroke="#C08457" strokeWidth={isHero ? 0.9 : 0.8}>
        {cords.map((cord, index) => (
          <path
            key={cord.d}
            d={cord.d}
            opacity={cord.opacity}
            strokeDasharray={isHero && !prefersReducedMotion ? 620 : undefined}
            className={
              isHero && !prefersReducedMotion ? 'animate-ko-cord' : undefined
            }
            style={
              isHero && !prefersReducedMotion
                ? { animationDelay: `${300 + index * 60}ms` }
                : undefined
            }
          />
        ))}
      </g>
    </svg>
  );
};
