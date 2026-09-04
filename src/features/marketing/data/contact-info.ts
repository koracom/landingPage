import { env } from '@/config/env';

import data from './contact-info.json';

const toTelHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

/**
 * Source unique de verite pour toutes les coordonnees KoraCom.
 * Le fichier JSON est partage entre l'application et le script de build
 * `scripts/generate-contact-assets.mjs`, qui genere la vCard servie et le QR.
 */
export const contactInfo = {
  ...data,
  founders: data.founders.map((founder) => ({
    ...founder,
    phoneHref: toTelHref(founder.phone),
  })),
  /** "Khadidiatou Sow · Aminata Ka" */
  foundersLabel: data.founders.map((founder) => founder.name).join(' · '),
  location: `${data.city}, ${data.country}`,
  siteUrl: env.SITE_URL,
  websiteHref: env.SITE_URL,
  /** URL encodee dans le QR : la scanner ajoute le contact au repertoire. */
  vcardUrl: `${env.SITE_URL}/${data.vcardFileName}`,
} as const;
