import logo from '@/assets/koracom-logo.svg';

import { ContactForm } from './contact-form';
import { DigitalCard } from './digital-card';
import { KoraStrings } from './kora-strings';
import { Reveal } from './reveal';

export const ContactSection = () => (
  <section
    id="contact"
    aria-labelledby="contact-titre"
    className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-kora-bark to-[#241610] text-kora-sand"
  >
    <KoraStrings variant="wide" className="inset-0 size-full" />

    <div className="relative mx-auto max-w-shell px-section-x py-[clamp(5rem,14vh,8.75rem)]">
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <img
            src={logo}
            alt=""
            width={676}
            height={319}
            className="mb-8 h-[clamp(4rem,8vw,5.75rem)] w-auto"
          />
        </Reveal>
        <Reveal delay={70}>
          <h2
            id="contact-titre"
            className="max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.625rem)] font-normal italic leading-[1.08] text-kora-sand"
          >
            Faisons rayonner votre voix.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-measure text-body-lg text-kora-sand/85">
            Parlons de votre projet — stratégie, campagne, événement ou présence
            digitale. La première conversation est offerte.
          </p>
        </Reveal>
      </div>

      <div className="mt-[clamp(3rem,8vh,5rem)] grid grid-cols-1 items-start gap-10 text-left lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-6 text-eyebrow font-semibold uppercase text-kora-copper">
            Formulaire de prise de contact
          </p>
          <ContactForm />
        </div>

        <DigitalCard />
      </div>
    </div>
  </section>
);
