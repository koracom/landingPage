type ShareResult = 'shared' | 'copied' | 'unsupported';

type ShareCardInput = {
  title: string;
  text: string;
  /**
   * Lien partage : il doit ouvrir la carte. Une URL de vCard declencherait un
   * telechargement chez le destinataire, ce qui n'est pas un partage.
   */
  url: string;
};

/**
 * Partage une carte via l'API Web Share, avec repli sur le presse-papier.
 */
export const shareCard = async ({
  title,
  text,
  url,
}: ShareCardInput): Promise<ShareResult> => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch {
      // Partage annule par l'utilisateur : on tente la copie du lien.
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'unsupported';
    }
  }

  return 'unsupported';
};
