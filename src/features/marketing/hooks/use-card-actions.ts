import * as React from 'react';

import { shareCard } from '../utils/share-card';

const MESSAGE_DURATION = 3500;

type UseCardActionsInput = {
  /** Fichier .vcf servi, vers lequel pointe aussi le QR de cette carte. */
  vcardUrl: string;
  shareUrl: string;
  shareTitle: string;
  shareText: string;
};

/**
 * Telechargement et partage : identiques pour la carte de l'agence et pour
 * celles des fondatrices, seules les URL changent.
 */
export const useCardActions = ({
  vcardUrl,
  shareUrl,
  shareTitle,
  shareText,
}: UseCardActionsInput) => {
  const [shareMessage, setShareMessage] = React.useState('');
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const onShare = async () => {
    const result = await shareCard({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    });

    setShareMessage(
      {
        shared: 'Carte partagée.',
        copied: 'Lien copié dans le presse-papier.',
        unsupported: `Copiez le lien : ${shareUrl}`,
      }[result],
    );

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(
      () => setShareMessage(''),
      MESSAGE_DURATION,
    );
  };

  // La vCard servie porte deja Content-Disposition: attachment, donc le
  // navigateur telecharge sans quitter la page. On reste ainsi sur le fichier
  // exact vers lequel pointe le QR.
  const onDownload = () => window.location.assign(vcardUrl);

  return { shareMessage, onShare, onDownload };
};
