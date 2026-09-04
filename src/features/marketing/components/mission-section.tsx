import { Reveal } from './reveal';

export const MissionSection = () => (
  <section
    aria-labelledby="mission-titre"
    className="bg-gradient-to-br from-kora-bark to-kora-ink text-kora-sand"
  >
    <div className="mx-auto grid max-w-shell grid-cols-1 gap-11 px-section-x py-[clamp(4.5rem,12vh,7.5rem)] lg:grid-cols-[5fr_7fr] lg:gap-20">
      <Reveal>
        <h2
          id="mission-titre"
          className="text-eyebrow font-semibold uppercase text-kora-copper"
        >
          Notre mission
        </h2>
        <p className="mt-6 font-display text-quote-lg italic text-kora-sand">
          Accompagner les entreprises, institutions et organisations ambitieuses
          dans la conception de récits clairs et impactants — de la stratégie à
          l&apos;exécution.
        </p>
      </Reveal>

      <Reveal
        delay={80}
        className="border-kora-sand/15 lg:border-l lg:pl-[clamp(1.5rem,3vw,2.75rem)]"
      >
        <h2 className="text-eyebrow font-semibold uppercase text-kora-copper">
          Notre vision
        </h2>
        <p className="mt-6 font-display text-quote-lg italic text-kora-sand">
          Être le griot des temps modernes : transmettre, amplifier et faire
          rayonner la voix de ceux qui font avancer l&apos;Afrique.
        </p>
        <p className="mt-7 max-w-[44ch] text-base leading-relaxed text-kora-sand/70">
          La kora, instrument du griot, porte notre signature : écouter,
          transmettre, faire vibrer.
        </p>
      </Reveal>
    </div>
  </section>
);
