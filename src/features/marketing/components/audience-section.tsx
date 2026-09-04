import { cn } from '@/utils/cn';

import { audiences } from '../data/audiences';

import { Reveal } from './reveal';

export const AudienceSection = () => (
  <section
    id="nos-clients"
    aria-labelledby="clients-titre"
    className="scroll-mt-24 bg-kora-cream"
  >
    <div className="mx-auto max-w-shell px-section-x py-section-y">
      <Reveal>
        <p className="mb-4 text-eyebrow font-semibold uppercase text-kora-rust">
          À qui nous nous adressons
        </p>
        <h2
          id="clients-titre"
          className="max-w-[20ch] font-display text-display-lg font-medium text-kora-clay"
        >
          Nous donnons de la voix à ceux qui construisent
        </h2>
      </Reveal>

      <ul className="mt-[clamp(2.75rem,7vh,4.5rem)] grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = audience.icon;

          return (
            <Reveal
              as="li"
              key={audience.id}
              delay={index * 90}
              className={cn(
                'rounded-sm bg-gradient-to-b from-kora-bark to-kora-ink px-[clamp(1.625rem,3vw,2.125rem)] py-[clamp(1.875rem,3.4vw,2.5rem)] text-kora-sand',
                // Decalage editorial : casse la grille sans casser l'alignement mobile.
                index === 1 && 'md:mt-11',
              )}
            >
              <span className="mb-6 flex size-[60px] items-center justify-center rounded-full bg-kora-copper">
                <Icon
                  aria-hidden="true"
                  className="size-7 text-kora-ink"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="font-display text-display-sm font-medium text-kora-sand">
                {audience.title}
              </h3>
              <p className="mt-3.5 text-base leading-relaxed text-kora-sand/80">
                {audience.description}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </div>
  </section>
);
