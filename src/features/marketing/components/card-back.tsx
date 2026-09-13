import { contactInfo } from '../data/contact-info';

import { CardQrCode } from './card-qr-code';

type CardBackProps = {
  onDownload: () => void;
  onExchange: () => void;
  onShare: () => void;
  shareMessage: string;
};

/** Verso : le QR et les trois actions de la carte. */
export const CardBack = ({
  onDownload,
  onExchange,
  onShare,
  shareMessage,
}: CardBackProps) => (
  <div className="flex h-full flex-col items-center justify-center gap-6 px-[clamp(1.375rem,3vw,2rem)] py-[clamp(1.75rem,4vw,2.5rem)] text-center">
    <div className="border border-kora-copper bg-kora-ink p-2">
      <CardQrCode />
    </div>

    <div>
      <p className="text-eyebrow uppercase text-kora-copper">Sans contact</p>
      <p className="mx-auto mt-2.5 max-w-[34ch] text-[14.5px] leading-relaxed text-kora-sand/80">
        Scannez le code : nos coordonnées s&apos;ajoutent directement au
        répertoire de votre téléphone.
      </p>
    </div>

    <div className="flex w-full flex-col items-center gap-3">
      <button
        type="button"
        onClick={onDownload}
        className="min-h-[48px] w-full max-w-72 rounded-sm bg-kora-copper px-5 text-sm font-medium text-kora-ink transition-colors duration-200 ease-out-expo hover:bg-kora-ember"
      >
        Télécharger la vCard
      </button>
      <button
        type="button"
        onClick={onExchange}
        className="min-h-[48px] w-full max-w-72 rounded-sm border border-kora-copper/50 px-5 text-sm text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper hover:bg-kora-copper/10"
      >
        Partager mes coordonnées
      </button>
      <button
        type="button"
        onClick={onShare}
        className="min-h-[44px] text-sm text-kora-sand/70 underline-offset-4 transition-colors duration-200 ease-out-expo hover:text-kora-sand hover:underline"
      >
        Envoyer cette carte à quelqu&apos;un
      </button>
    </div>

    <p
      role="status"
      aria-live="polite"
      className="min-h-5 text-[13.5px] text-kora-sand/80"
    >
      {shareMessage}
    </p>

    <p className="font-mono text-[12px] tracking-wide text-kora-sand/45 [overflow-wrap:anywhere]">
      {contactInfo.website}
    </p>
  </div>
);
