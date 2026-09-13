import { env } from '@/config/env';
import { paths } from '@/config/paths';

import { type CardQrKey } from './card-qr';
import data from './contact-info.json';

const toTelHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

/**
 * Source unique de verite pour toutes les coordonnees KoraCom.
 * Le fichier JSON est partage entre l'application et le script de build
 * `scripts/generate-contact-assets.mjs`, qui genere les vCards servies et
 * les QR.
 */
export const contactInfo = {
  ...data,
  founders: data.founders.map((founder) => ({
    ...founder,
    /** "Aminata KA", comme sur le carton imprime. */
    displayName: `${founder.firstName} ${founder.lastName.toUpperCase()}`,
    role: data.founderRole,
    /**
     * Le slug vient du JSON, donc type `string`. Le test contact-assets
     * verifie qu'un QR existe bien pour chacun : c'est la garantie reelle,
     * le typage ne peut pas la donner ici.
     */
    qrKey: founder.slug as CardQrKey,
    phoneHref: toTelHref(founder.phone),
    emailHref: `mailto:${founder.email}`,
    /** Page dediee a cette personne. */
    cardUrl: `${env.SITE_URL}${paths.card.person.getHref(founder.slug)}`,
    /** URL encodee dans son QR : la scanner l'ajoute au repertoire. */
    vcardUrl: `${env.SITE_URL}/${founder.vcardFileName}`,
  })),
  /** "Khadidiatou Sow · Aminata Ka" */
  foundersLabel: data.founders.map((founder) => founder.name).join(' · '),
  location: `${data.city}, ${data.country}`,
  siteUrl: env.SITE_URL,
  websiteHref: env.SITE_URL,
  /** URL encodee dans le QR de l'agence. */
  vcardUrl: `${env.SITE_URL}/${data.vcardFileName}`,
  /**
   * Page autonome de la carte agence. C'est ce lien que l'on partage : il
   * ouvre la carte, alors que vcardUrl declenche un telechargement.
   */
  cardUrl: `${env.SITE_URL}${paths.card.getHref()}`,
} as const;

export type Founder = (typeof contactInfo.founders)[number];

/** Retourne la fondatrice correspondant au segment d'URL, s'il existe. */
export const findFounder = (slug: string | undefined): Founder | undefined =>
  contactInfo.founders.find((founder) => founder.slug === slug);
