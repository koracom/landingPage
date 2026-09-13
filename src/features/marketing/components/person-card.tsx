import * as React from 'react';

import { type Founder } from '../data/contact-info';
import { useCardActions } from '../hooks/use-card-actions';

import { ContactExchangeForm } from './contact-exchange-form';
import { FlipCard } from './flip-card';
import { PersonCardBack } from './person-card-back';
import { PersonCardFront } from './person-card-front';

type PersonCardProps = {
  founder: Founder;
};

/** Carte de visite d'une fondatrice : recto coordonnees, verso marque et QR. */
export const PersonCard = ({ founder }: PersonCardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isExchangeOpen, setIsExchangeOpen] = React.useState(false);

  const { shareMessage, onShare, onDownload } = useCardActions({
    vcardUrl: founder.vcardUrl,
    shareUrl: founder.cardUrl,
    shareTitle: founder.name,
    shareText: `${founder.role} — ${founder.name}`,
  });

  return (
    <div>
      <FlipCard
        eyebrow="Carte de visite"
        isFlipped={isFlipped}
        onToggle={() => setIsFlipped((flipped) => !flipped)}
        toggleLabels={['Voir le QR code', 'Voir les coordonnées']}
        front={<PersonCardFront founder={founder} />}
        back={
          <PersonCardBack
            founder={founder}
            onDownload={onDownload}
            onExchange={() => setIsExchangeOpen(true)}
            onShare={onShare}
            shareMessage={shareMessage}
          />
        }
      />

      {isExchangeOpen ? (
        <div className="mt-6">
          <ContactExchangeForm
            recipient={founder.name}
            onDone={() => setIsExchangeOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
};
