import * as React from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/utils/cn';

import { contactInfo } from '../data/contact-info';
import { shareCard } from '../utils/share-card';

import { CardBack } from './card-back';
import { CardFront } from './card-front';
import { ContactExchangeForm } from './contact-exchange-form';

const SHARE_MESSAGES = {
  shared: 'Carte partagée.',
  copied: 'Lien copié dans le presse-papier.',
  unsupported: `Copiez le lien : ${contactInfo.website}`,
} as const;

/**
 * Retire la face cachee de l'ordre de tabulation et de l'arbre
 * d'accessibilite. Sans cela on tabule dans des liens invisibles : le piege
 * classique des cartes qui se retournent.
 */
const useInert = (ref: React.RefObject<HTMLElement>, inert: boolean) => {
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (inert) node.setAttribute('inert', '');
    else node.removeAttribute('inert');
  }, [ref, inert]);
};

export const DigitalCard = () => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isExchangeOpen, setIsExchangeOpen] = React.useState(false);
  const [shareMessage, setShareMessage] = React.useState('');

  const prefersReducedMotion = usePrefersReducedMotion();
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<number>();

  useInert(frontRef, isFlipped);
  useInert(backRef, !isFlipped);

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const onShare = async () => {
    const result = await shareCard();
    setShareMessage(SHARE_MESSAGES[result]);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setShareMessage(''), 3500);
  };

  // La vCard servie porte deja Content-Disposition: attachment, donc le
  // navigateur telecharge sans quitter la page. On reste ainsi sur le fichier
  // exact vers lequel pointe le QR.
  const onDownload = () => window.location.assign(contactInfo.vcardUrl);

  // Le clic n'importe ou retourne la carte, sauf sur un element interactif.
  const onCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button, input, label'))
      return;
    setIsFlipped((flipped) => !flipped);
  };

  const faceBase =
    'col-start-1 row-start-1 rounded-sm border border-kora-copper/35 bg-kora-ink transition-[visibility]';

  /**
   * Double securite sur la face cachee : `inert` seul ne suffit pas (teste
   * sous Chrome 152, le focus atteint encore les liens), donc on ajoute
   * visibility:hidden, qui exclut reellement du parcours de tabulation.
   * Le delai laisse la rotation se terminer avant de masquer.
   */
  const hiddenFace = (hidden: boolean) =>
    hidden
      ? prefersReducedMotion
        ? 'invisible'
        : 'invisible delay-700'
      : 'visible delay-0';

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-eyebrow font-semibold uppercase text-kora-copper">
          Notre carte digitale
        </p>
        <button
          type="button"
          onClick={() => setIsFlipped((flipped) => !flipped)}
          aria-pressed={isFlipped}
          className="min-h-[44px] border-b border-kora-copper/45 text-sm text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper"
        >
          {isFlipped ? 'Voir les coordonnées' : 'Voir le QR code'}
        </button>
      </div>

      <div
        className={prefersReducedMotion ? undefined : '[perspective:1600px]'}
      >
        {/* Les deux faces partagent la meme cellule de grille : la plus haute
            impose la hauteur, donc la carte ne saute pas en se retournant. */}
        {/* Le clic sur la carte est un confort souris. L'activation au
            clavier passe par le bouton aria-pressed ci-dessus, qui porte
            un libelle explicite : la regle a11y est satisfaite par ce
            controle, pas par ce div. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          onClick={onCardClick}
          className={cn(
            'grid cursor-pointer',
            !prefersReducedMotion &&
              'transition-transform duration-700 ease-out-expo [transform-style:preserve-3d]',
            !prefersReducedMotion && isFlipped && '[transform:rotateY(180deg)]',
          )}
        >
          <div
            ref={frontRef}
            className={cn(
              faceBase,
              hiddenFace(isFlipped),
              !prefersReducedMotion && '[backface-visibility:hidden]',
            )}
          >
            <CardFront />
          </div>

          <div
            ref={backRef}
            className={cn(
              faceBase,
              hiddenFace(!isFlipped),
              !prefersReducedMotion &&
                '[backface-visibility:hidden] [transform:rotateY(180deg)]',
            )}
          >
            <CardBack
              onDownload={onDownload}
              onExchange={() => setIsExchangeOpen(true)}
              onShare={onShare}
              shareMessage={shareMessage}
            />
          </div>
        </div>
      </div>

      {isExchangeOpen ? (
        <div className="mt-6">
          <ContactExchangeForm onDone={() => setIsExchangeOpen(false)} />
        </div>
      ) : null}
    </div>
  );
};
