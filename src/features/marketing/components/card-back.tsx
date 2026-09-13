import { contactInfo } from '../data/contact-info';

import { CardActions } from './card-actions';
import { CardQrCode } from './card-qr-code';

type CardBackProps = {
  onDownload: () => void;
  onExchange: () => void;
  onShare: () => void;
  shareMessage: string;
};

/** Verso de la carte agence : le QR et les trois actions. */
export const CardBack = ({
  onDownload,
  onExchange,
  onShare,
  shareMessage,
}: CardBackProps) => (
  <div className="flex h-full flex-col items-center justify-center gap-6 px-[clamp(1.375rem,3vw,2rem)] py-[clamp(1.75rem,4vw,2.5rem)] text-center">
    <div className="border border-kora-copper bg-kora-ink p-2">
      <CardQrCode qrKey="agency" contactName={contactInfo.name} />
    </div>

    <p className="mx-auto mt-2.5 max-w-[34ch] text-[14.5px] leading-relaxed text-kora-sand/80">
      Scannez le code : nos coordonnées s&apos;ajoutent directement au
      répertoire de votre téléphone.
    </p>

    <CardActions
      onDownload={onDownload}
      onExchange={onExchange}
      onShare={onShare}
      shareMessage={shareMessage}
      downloadLabel="Télécharger la vCard"
    />

    <p className="font-mono text-[12px] tracking-wide text-kora-sand/45 [overflow-wrap:anywhere]">
      {contactInfo.website}
    </p>
  </div>
);
