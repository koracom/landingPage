import { contactInfo } from '../data/contact-info';

type ShareResult = 'shared' | 'copied' | 'unsupported';

/**
 * Partage la carte via l'API Web Share, avec repli sur le presse-papier.
 * On partage cardUrl et non siteUrl : le destinataire doit atterrir sur la
 * carte elle-meme, pas en haut de la page d'accueil.
 */
export const shareCard = async (): Promise<ShareResult> => {
  const shareData = {
    title: contactInfo.name,
    text: `${contactInfo.role} — ${contactInfo.location}`,
    url: contactInfo.cardUrl,
  };

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData);
      return 'shared';
    } catch {
      // Partage annule par l'utilisateur : on tente la copie du lien.
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(contactInfo.cardUrl);
      return 'copied';
    } catch {
      return 'unsupported';
    }
  }

  return 'unsupported';
};
