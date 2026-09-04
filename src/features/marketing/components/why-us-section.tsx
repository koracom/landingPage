import { differentiators } from '../data/differentiators';

import { Reveal } from './reveal';

export const WhyUsSection = () => (
  <section
    id="pourquoi-nous"
    aria-labelledby="pourquoi-titre"
    className="scroll-mt-24 bg-kora-dune"
  >
    <div className="mx-auto max-w-shell px-section-x py-[clamp(4.5rem,11vh,6.875rem)]">
      <Reveal>
        <p className="mb-4 text-eyebrow font-semibold uppercase text-kora-clay">
          Pourquoi KoraCom
        </p>
        <h2
          id="pourquoi-titre"
          className="max-w-[20ch] font-display text-display-lg font-medium text-kora-clay"
        >
          Trois atouts que personne d&apos;autre ne réunit
        </h2>
      </Reveal>

      <ul className="mt-[clamp(2.25rem,6vh,3.5rem)]">
        {differentiators.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={index * 70}
            className="grid grid-cols-1 gap-1.5 border-b border-kora-clay/15 py-[clamp(1.625rem,4vh,2.375rem)] last:border-b-0 md:grid-cols-[96px_1fr] md:gap-8"
          >
            <p
              aria-hidden="true"
              className="font-display text-[clamp(2.125rem,4vw,3.25rem)] font-medium leading-[0.9] text-kora-clay"
            >
              {item.index}
            </p>
            <div>
              <h3 className="font-display text-display-sm font-medium text-kora-clay">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[64ch] text-[16.5px] leading-relaxed text-kora-text">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  </section>
);
