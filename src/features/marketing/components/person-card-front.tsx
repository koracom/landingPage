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
 * fonction, un filet, puis email et telephone en pastilles, avec le
 * pictogramme kora en filigrane sur la droite.
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
    <div className="flex h-full items-center gap-4 overflow-hidden bg-gradient-to-br from-kora-bark to-kora-ink px-[clamp(1.375rem,3vw,2rem)] py-[clamp(1.75rem,4vw,2.5rem)]">
      {/* Colonne de texte : min-w-0 pour que les adresses longues se coupent
          au lieu de pousser la colonne decorative hors de la carte. */}
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-[clamp(1.4rem,4.4vw,1.9rem)] font-semibold leading-[1.1] text-kora-sand">
          {founder.displayName}
        </h2>
        <p className="mt-1.5 text-[clamp(0.8rem,2.2vw,0.95rem)] tracking-[0.12em] text-kora-sand/80">
          {founder.role}
        </p>

        <div className="my-5 h-px w-16 bg-kora-copper/70" />

        <ul className="space-y-3.5">
          {rows.map((row) => (
            <li key={row.key}>
              <a
                href={row.href}
                aria-label={row.label}
                className="flex items-center gap-3 text-kora-sand transition-colors duration-200 ease-out-expo hover:text-kora-copper"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-kora-copper/70 text-kora-copper">
                  {row.icon}
                </span>
                <span className="min-w-0 text-[clamp(0.78rem,2.4vw,0.92rem)]">
                  {row.content}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Le verso, plus charge, impose la hauteur de la carte. Plutot que
            de laisser le recto se terminer sur du vide, il se ferme sur
            l'agence et la ville. */}
        <div className="mt-7 border-t border-kora-sand/15 pt-4">
          <p className="text-[12.5px] tracking-[0.16em] text-kora-sand/70">
            {contactInfo.name}
          </p>
          <p className="mt-1 text-[12.5px] text-kora-sand/50">
            {contactInfo.location}
          </p>
        </div>
      </div>

      {/* Le filet vertical et la kora du carton imprime. Retires sous 400px :
          ils y prendraient la place du texte, qui prime. */}
      <div
        aria-hidden="true"
        className="hidden self-stretch border-l border-kora-copper/30 min-[400px]:block"
      />
      {/* Largeur fixe : dimensionner la kora en hauteur la laissait grossir
          avec la carte et ecraser la colonne de texte. */}
      <KoraMarkArt className="hidden h-auto w-[76px] shrink-0 self-center text-kora-copper/30 min-[400px]:block" />
    </div>
  );
};
