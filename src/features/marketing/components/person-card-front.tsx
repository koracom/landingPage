import logo from '@/assets/koracom-logo.svg';

import { contactInfo, type Founder } from '../data/contact-info';

import { KoraMarkArt } from './kora-mark-art';

type PersonCardFrontProps = {
  founder: Founder;
};

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[13px]">
    <path
      d="M3 6.5h18v11H3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="m3.6 7 8.4 6 8.4-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[13px]">
    <path
      d="M7.2 3.6 9 7.8l-2 1.7a12 12 0 0 0 5.5 5.5l1.7-2 4.2 1.8-.6 3.3c-.1.7-.7 1.2-1.4 1.1C9.4 18.6 5.4 14.6 3.8 7.6c-.1-.7.4-1.3 1.1-1.4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Seule cesure autorisee dans une adresse : juste apres l'arobase. Sans cela
 * « khadidiatou.sow@koracomsn.com » se coupe au milieu du .com.
 */
const EmailValue = ({ email }: { email: string }) => {
  const [local, domain] = email.split('@');
  return (
    <>
      {local}@<wbr />
      {domain}
    </>
  );
};

/**
 * Recto individuel, transpose du carton imprime : le nom en grand, la
 * fonction, un filet, puis email et telephone en pastilles. La kora occupe
 * le tiers droit et deborde le bord, comme a l'impression.
 */
export const PersonCardFront = ({ founder }: PersonCardFrontProps) => {
  const rows = [
    {
      key: 'email',
      icon: <MailIcon />,
      content: <EmailValue email={founder.email} />,
      // Le <wbr> de EmailValue coupe aussi le nom accessible du lien : sans
      // ce libelle, un lecteur d'ecran annonce l'adresse en deux morceaux.
      label: founder.email,
      href: founder.emailHref,
    },
    {
      key: 'phone',
      icon: <PhoneIcon />,
      content: founder.phone,
      label: founder.phone,
      href: founder.phoneHref,
    },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-kora-bark to-kora-ink px-[clamp(1.5rem,4vw,2.75rem)] py-[clamp(1.5rem,3.5vw,2.5rem)] min-[560px]:flex-row min-[560px]:items-center">
      {/* En portrait seulement : la marque occupe le haut, que la hauteur
          imposee par le verso laissait vide. Absente du format paysage, ou le
          carton imprime ne porte la marque qu'au dos. */}
      <div className="relative z-10 shrink-0 text-center min-[560px]:hidden">
        <img
          src={logo}
          alt=""
          width={676}
          height={319}
          className="mx-auto h-[clamp(3.5rem,17vw,4.75rem)] w-auto"
        />
        <p className="mx-auto mt-3 max-w-[26ch] font-display text-[clamp(0.85rem,3.6vw,1.05rem)] italic leading-snug text-kora-sand/90">
          {contactInfo.tagline}
        </p>
      </div>

      {/* 58% : la proportion du carton imprime, ou le filet tombe un peu
          apres le milieu. */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center min-[560px]:flex-none min-[560px]:basis-[58%]">
        <h2 className="font-display text-[clamp(1.45rem,3.4vw,2.3rem)] font-semibold leading-[1.08] text-kora-sand">
          {founder.displayName}
        </h2>
        <p className="mt-2 text-[clamp(0.82rem,1.5vw,1.05rem)] tracking-[0.14em] text-kora-sand/80">
          {founder.role}
        </p>

        <div className="my-[clamp(0.9rem,2.2vw,1.5rem)] h-px w-20 bg-kora-copper/70" />

        <ul className="space-y-[clamp(0.6rem,1.6vw,1rem)]">
          {rows.map((row) => (
            <li key={row.key}>
              <a
                href={row.href}
                aria-label={row.label}
                className="inline-flex items-center gap-3 text-kora-sand transition-colors duration-200 ease-out-expo hover:text-kora-copper"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-kora-copper/70 text-kora-copper">
                  {row.icon}
                </span>
                <span className="min-w-0 text-[clamp(0.8rem,1.55vw,1rem)]">
                  {row.content}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Filet et kora n'apparaissent qu'en format paysage. En dessous, la
          carte reprend une hauteur libre et la kora, dimensionnee en
          hauteur, ecraserait le texte. */}
      <div
        aria-hidden="true"
        className="hidden h-[64%] w-px shrink-0 bg-kora-copper/35 min-[560px]:block"
      />
      <div
        aria-hidden="true"
        className="relative hidden h-full flex-1 min-[560px]:block"
      >
        {/* Elle deborde le bord droit, comme a l'impression. */}
        <KoraMarkArt className="absolute right-[-12%] top-1/2 h-[92%] w-auto -translate-y-1/2 text-kora-copper/50" />
      </div>

      {/* En format portrait, le verso plus charge impose la hauteur et le
          recto se terminerait sur du vide. La kora l'occupe, dimensionnee
          en largeur pour ne jamais grandir avec la carte. */}
      <KoraMarkArt className="pointer-events-none absolute bottom-[-8%] right-[-8%] h-auto w-[46%] text-kora-copper/20 min-[560px]:hidden" />
    </div>
  );
};
