import logo from '@/assets/koracom-logo.svg';

import { contactInfo } from '../data/contact-info';

const rows = [
  {
    label: 'ÉCRIRE',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  // Les deux fondatrices sont joignables directement : le prenom sert de
  // libelle, plus court que le nom complet dans la colonne de droite.
  ...contactInfo.founders.map((founder) => ({
    label: founder.firstName,
    value: founder.phone,
    href: founder.phoneHref,
  })),
  {
    label: 'SITE',
    value: contactInfo.website,
    href: contactInfo.websiteHref,
  },
];

/** Recto : l'identite et les coordonnees, visibles sans aucune action. */
export const CardFront = () => (
  <div className="flex h-full flex-col">
    <div className="border-b border-kora-copper/25 bg-gradient-to-br from-kora-bark to-kora-ink px-[clamp(1.375rem,3vw,2rem)] py-[clamp(1.5rem,3.5vw,2.25rem)] text-center">
      <img
        src={logo}
        alt=""
        width={676}
        height={319}
        className="mx-auto h-[clamp(3rem,5.5vw,4rem)] w-auto"
      />
      <p className="mt-3 text-[11px] tracking-[0.42em] text-kora-sand/70 [text-indent:0.42em]">
        A F R I C A
      </p>
      <p className="mt-5 font-display text-[clamp(1.05rem,1.7vw,1.3rem)] italic leading-snug text-kora-sand">
        {contactInfo.tagline}
      </p>
      <p className="mt-4 text-[15px] font-semibold text-kora-copper">
        {contactInfo.foundersLabel}
      </p>
      <p className="mt-1.5 text-sm text-kora-sand/75">
        {contactInfo.foundersRole}
      </p>
    </div>

    <ul className="flex-1 px-[clamp(1.375rem,3vw,2rem)]">
      {rows.map((row) => (
        <li key={row.label}>
          <a
            href={row.href}
            className="flex min-h-[56px] items-center justify-between gap-3.5 border-b border-kora-sand/15 py-3.5 text-[15.5px] text-kora-sand transition-colors duration-200 ease-out-expo hover:text-kora-copper"
          >
            <span className="[overflow-wrap:anywhere]">{row.value}</span>
            <span className="shrink-0 text-[10.5px] uppercase tracking-[0.18em] text-kora-copper">
              {row.label}
            </span>
          </a>
        </li>
      ))}
      <li className="flex min-h-[56px] items-center justify-between gap-3.5 py-3.5 text-[15.5px] text-kora-sand/75">
        <span>{contactInfo.location}</span>
        <span className="shrink-0 text-[10.5px] tracking-[0.18em] text-kora-sand/55">
          SIÈGE
        </span>
      </li>
    </ul>
  </div>
);
