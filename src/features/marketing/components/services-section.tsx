import { services } from '../data/services';

import { Reveal } from './reveal';

export const ServicesSection = () => (
  <section
    id="services"
    aria-labelledby="services-titre"
    className="scroll-mt-24 bg-kora-cream"
  >
    <div className="mx-auto max-w-shell px-section-x py-section-y">
      <Reveal>
        <p className="mb-4 text-eyebrow font-semibold uppercase text-kora-rust">
          Nos services
        </p>
        <h2
          id="services-titre"
          className="max-w-[20ch] font-display text-display-lg font-medium text-kora-clay"
        >
          Quatre expertises, de la stratégie à l&apos;exécution
        </h2>
      </Reveal>

      <ul className="mt-[clamp(2.75rem,7vh,4.5rem)] border-t border-kora-dune">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <Reveal
              as="li"
              key={service.id}
              delay={index * 70}
              className="grid grid-cols-[auto_1fr] items-start gap-[clamp(1.125rem,3vw,2.25rem)] border-b border-kora-dune py-[clamp(1.625rem,4vh,2.5rem)] transition-colors duration-200 ease-out-expo hover:bg-kora-dune/40"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-kora-clay">
                <Icon
                  aria-hidden="true"
                  className="size-6 text-kora-cream"
                  strokeWidth={1.5}
                />
              </span>

              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-[15px] text-kora-copper">
                    {service.index}
                  </span>
                  <h3 className="font-display text-display-md font-medium text-kora-text">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-3.5 max-w-measure text-[16.5px] leading-relaxed text-kora-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  </section>
);
