import { cardQr } from '../data/card-qr';
import { contactInfo } from '../data/contact-info';

const QUIET_ZONE = 4;
const outerSize = cardQr.size + QUIET_ZONE * 2;

/**
 * QR code pre-genere au build (`node scripts/generate-card-qr.mjs`).
 * Rendu en SVG : net a toutes les densites d'ecran, zero JS au runtime.
 */
export const CardQrCode = () => (
  <svg
    viewBox={`${-QUIET_ZONE} ${-QUIET_ZONE} ${outerSize} ${outerSize}`}
    width={164}
    height={164}
    role="img"
    aria-label={`QR code : ajouter ${contactInfo.name} à vos contacts`}
    className="block size-[164px] max-w-full [shape-rendering:crispEdges]"
  >
    <rect
      x={-QUIET_ZONE}
      y={-QUIET_ZONE}
      width={outerSize}
      height={outerSize}
      fill="#FAF6EF"
    />
    <path d={cardQr.path} fill="#2A1B12" />
  </svg>
);
