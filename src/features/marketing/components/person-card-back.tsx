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

/**
 * Verso individuel : la marque, comme au dos du carton imprime, plus le QR
 * — qui lui ajoute cette personne au repertoire, pas l'agence.
 */
export const PersonCardBack = ({
  founder,
  onDownload,
  onExchange,
  onShare,
  shareMessage,
}: PersonCardBackProps) => (
  <div className="flex h-full flex-col items-center justify-center gap-5 px-[clamp(1.375rem,3vw,2rem)] py-[clamp(1.75rem,4vw,2.5rem)] text-center">
    <div>
      <img
        src={logo}
        alt=""
        width={676}
        height={319}
        className="mx-auto h-[clamp(2.5rem,5vw,3.25rem)] w-auto"
      />
      <p className="mt-4 font-display text-[clamp(0.95rem,1.7vw,1.15rem)] italic leading-snug text-kora-sand">
        {contactInfo.tagline}
      </p>
    </div>

    <div className="border border-kora-copper bg-kora-ink p-2">
      <CardQrCode qrKey={founder.qrKey} contactName={founder.name} />
    </div>

    <p className="mx-auto max-w-[30ch] text-[14px] leading-relaxed text-kora-sand/80">
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
);
