import * as React from 'react';

import logo from '@/assets/koracom-logo.svg';

import { contactInfo } from '../data/contact-info';
import { shareCard } from '../utils/share-card';

import { CardQrCode } from './card-qr-code';

const SHARE_MESSAGES = {
  shared: 'Carte partagée.',
  copied: 'Lien copié dans le presse-papier.',
  unsupported: `Copiez le lien : ${contactInfo.website}`,
} as const;

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

export const DigitalCard = () => {
  const [shareMessage, setShareMessage] = React.useState('');
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const onShare = async () => {
    const result = await shareCard();
    setShareMessage(SHARE_MESSAGES[result]);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setShareMessage(''), 3500);
  };

  return (
    <div>
      <p className="mb-6 text-eyebrow font-semibold uppercase text-kora-copper">
        Notre carte digitale
      </p>

      <div className="border border-kora-copper/35 bg-kora-ink">
        <div className="border-b border-kora-copper/25 bg-gradient-to-br from-kora-bark to-kora-ink px-[clamp(1.375rem,3vw,2rem)] py-[clamp(1.75rem,4vw,2.5rem)] text-center">
          <img
            src={logo}
            alt=""
            width={676}
            height={319}
            className="mx-auto h-[clamp(3.25rem,6vw,4.25rem)] w-auto"
          />
          <p className="mt-3.5 text-[11px] tracking-[0.42em] text-kora-sand/70 [text-indent:0.42em]">
            A F R I C A
          </p>
          <p className="mt-6 font-display text-[clamp(1.125rem,1.8vw,1.375rem)] italic leading-snug text-kora-sand">
            {contactInfo.tagline}
          </p>
          <p className="mt-5 text-[15px] font-semibold text-kora-copper">
            {contactInfo.foundersLabel}
          </p>
          <p className="mt-1.5 text-sm text-kora-sand/75">
            {contactInfo.foundersRole}
          </p>
        </div>

        <ul className="px-[clamp(1.375rem,3vw,2rem)]">
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

        <div className="grid grid-cols-1 items-center gap-6 border-t border-kora-copper/25 p-[clamp(1.375rem,3vw,1.875rem)] xl:grid-cols-[minmax(200px,1fr)_auto] xl:gap-8">
          <div>
            <p className="text-eyebrow uppercase text-kora-copper">
              Sans contact
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-kora-sand/80">
              Scannez le code : nos coordonnées s&apos;ajoutent directement au
              répertoire de votre téléphone.
            </p>

            <button
              type="button"
              onClick={onShare}
              className="mt-4 min-h-[44px] border-b border-kora-copper/45 text-sm text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper"
            >
              Partager la carte
            </button>

            <p
              role="status"
              aria-live="polite"
              className="mt-3 min-h-5 text-[13.5px] text-kora-sand/80"
            >
              {shareMessage}
            </p>
          </div>

          <div className="justify-self-start border border-kora-copper bg-kora-ink p-1.5 xl:justify-self-end">
            <CardQrCode />
          </div>
        </div>
      </div>
    </div>
  );
};
