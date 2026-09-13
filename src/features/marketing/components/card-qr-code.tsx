import { cardQrs, type CardQrKey } from '../data/card-qr';

const QUIET_ZONE = 4;

type CardQrCodeProps = {
  /** Quelle carte : 'agency', ou le slug d'une fondatrice. */
  qrKey: CardQrKey;
  /** Qui ce QR ajoute au repertoire. */
  contactName: string;
};

/**
 * QR code pre-genere au build (`node scripts/generate-contact-assets.mjs`).
 * Rendu en SVG : net a toutes les densites d'ecran, zero JS au runtime.
 */
export const CardQrCode = ({ qrKey, contactName }: CardQrCodeProps) => {
  const qr = cardQrs[qrKey];
  const outerSize = qr.size + QUIET_ZONE * 2;

  return (
    <svg
      viewBox={`${-QUIET_ZONE} ${-QUIET_ZONE} ${outerSize} ${outerSize}`}
      width={164}
      height={164}
      role="img"
      aria-label={`QR code : ajouter ${contactName} à vos contacts`}
      className="block size-[164px] max-w-full [shape-rendering:crispEdges]"
    >
      <rect
        x={-QUIET_ZONE}
        y={-QUIET_ZONE}
        width={outerSize}
        height={outerSize}
        fill="#FAF6EF"
      />
      <path d={qr.path} fill="#2A1B12" />
    </svg>
  );
};
