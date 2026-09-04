import { contactInfo } from '../data/contact-info';

type ShareResult = 'shared' | 'copied' | 'unsupported';

/**
 * Partage la carte via l'API Web Share, avec repli sur le presse-papier.
 */
export const shareCard = async (): Promise<ShareResult> => {
  const shareData = {
    title: contactInfo.name,
    text: `${contactInfo.role} — ${contactInfo.location}`,
    url: contactInfo.siteUrl,
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
      await navigator.clipboard.writeText(contactInfo.siteUrl);
      return 'copied';
    } catch {
      return 'unsupported';
    }
  }

  return 'unsupported';
};
