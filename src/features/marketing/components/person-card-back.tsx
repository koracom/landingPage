import logo from '@/assets/koracom-logo.svg';

import { contactInfo, type Founder } from '../data/contact-info';

import { CardActions } from './card-actions';
import { CardQrCode } from './card-qr-code';

type PersonCardBackProps = {
  founder: Founder;
  onDownload: () => void;
  onExchange: () => void;
  onShare: () => void;
  shareMessage: string;
};

/** Les deux arcs du carton imprime, en haut a gauche et en bas a droite. */
const CornerArcs = () => (
  <svg
    viewBox="0 0 400 230"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 size-full text-kora-copper/40"
  >
    <g fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M120 -30 A 150 150 0 0 0 -30 120" />
      <path d="M280 260 A 150 150 0 0 0 430 110" />
    </g>
  </svg>
);

/**
 * Verso individuel : la marque, comme au dos du carton imprime, et a droite
 * le QR — qui ajoute cette personne au repertoire, pas l'agence.
 */
export const PersonCardBack = ({
  founder,
  onDownload,
  onExchange,
  onShare,
  shareMessage,
}: PersonCardBackProps) => (
  <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(1.5rem,3.5vw,2.25rem)] text-center min-[560px]:flex-row min-[560px]:gap-[clamp(1.5rem,4vw,3rem)]">
    <CornerArcs />

    <div className="relative z-10 min-w-0 flex-1">
      <img
        src={logo}
        alt=""
        width={676}
        height={319}
        className="mx-auto h-[clamp(2.25rem,4.5vw,3.25rem)] w-auto"
      />
      <p className="mt-4 font-display text-[clamp(0.9rem,1.5vw,1.1rem)] italic leading-snug text-kora-sand">
        {contactInfo.tagline}
      </p>
      <p className="mt-4 text-[12px] tracking-[0.14em] text-kora-sand/60">
        www.{contactInfo.website}
      </p>
    </div>

    <div className="relative z-10 flex shrink-0 flex-col items-center gap-3.5">
      <div className="border border-kora-copper bg-kora-ink p-1.5">
        <CardQrCode
          qrKey={founder.qrKey}
          contactName={founder.name}
          size={132}
        />
      </div>
      <p className="max-w-[26ch] text-center text-[12.5px] leading-snug text-kora-sand/70">
        Scannez : {founder.firstName} s&apos;ajoute à votre répertoire.
      </p>

      <CardActions
        onDownload={onDownload}
        onExchange={onExchange}
        onShare={onShare}
        shareMessage={shareMessage}
        downloadLabel={`Enregistrer ${founder.firstName}`}
      />
    </div>
  </div>
);
