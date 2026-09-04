import logo from '@/assets/koracom-logo.svg';

import { focusContactForm } from '../utils/focus-contact-form';

import { KoraStrings } from './kora-strings';

export const HeroSection = () => (
  <section
    id="haut"
    className="relative flex min-h-svh items-center overflow-hidden bg-gradient-to-br from-kora-bark to-kora-ink"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[-12%] right-[-8%] size-[min(560px,80vw)] rounded-full bg-[radial-gradient(circle,rgba(192,132,87,0.16),transparent_68%)]"
    />
    <KoraStrings
      variant="hero"
      className="bottom-0 right-0 h-auto w-[min(600px,70vw)] translate-x-[30px]"
    />

    <div className="relative mx-auto w-full max-w-shell px-section-x pb-[clamp(3.75rem,10vh,6.25rem)] pt-[clamp(8.75rem,20vh,12.5rem)]">
      <img
        src={logo}
        alt="KoraCom"
        width={676}
        height={319}
        decoding="async"
        className="mb-9 h-[clamp(5rem,11vw,7.75rem)] w-auto animate-ko-rise [animation-delay:100ms]"
      />

      <p className="mb-5 animate-ko-rise text-eyebrow font-medium uppercase text-kora-copper">
        Agence de communication
      </p>

      <h1 className="max-w-[16ch] animate-ko-rise font-display text-display-xl font-normal italic text-kora-sand [animation-delay:350ms]">
        L&apos;art de captiver, la puissance de communiquer.
      </h1>

      <p className="mt-8 max-w-measure animate-ko-rise text-body-lg text-kora-sand/85 [animation-delay:600ms]">
        Nous accompagnons les institutions, entreprises et organisations qui
        font avancer l&apos;Afrique — en alliant un ancrage culturel réel et des
        méthodes de communication de standard international.
      </p>

      <div className="mt-11 flex animate-ko-rise flex-wrap items-center gap-4 [animation-delay:800ms]">
        <a
          href="#contact"
          onClick={focusContactForm}
          className="flex min-h-[56px] items-center rounded-sm bg-kora-copper px-8 text-[15px] font-medium text-kora-ink transition-colors duration-200 ease-out-expo hover:bg-kora-ember"
        >
          Démarrer un projet
        </a>
        <a
          href="#services"
          className="flex min-h-[56px] items-center border-b border-kora-sand/35 px-1 text-[15px] text-kora-sand transition-colors duration-200 ease-out-expo hover:border-kora-copper hover:text-kora-copper"
        >
          Découvrir nos services
        </a>
      </div>

      <div
        aria-hidden="true"
        className="mt-[clamp(3rem,9vh,5.625rem)] hidden items-center gap-3.5 sm:flex"
      >
        <span className="block h-14 w-px animate-ko-tick bg-kora-copper opacity-60" />
        <span className="text-[11px] tracking-[0.2em] text-kora-sand/60">
          DÉFILER
        </span>
      </div>
    </div>
  </section>
);
