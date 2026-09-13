import { Link, useParams } from 'react-router';

import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { PersonCard } from '@/features/marketing/components';
import {
  contactInfo,
  findFounder,
} from '@/features/marketing/data/contact-info';

/**
 * Page autonome de la carte d'une fondatrice : /carte/khadidiatou,
 * /carte/aminata. C'est le lien personnel que chacune transmet.
 */
const CardPersonRoute = () => {
  const { slug } = useParams();
  const founder = findFounder(slug);

  // Slug inconnu : on le dit. Rediriger en silence vers la carte de l'agence
  // ferait passer un lien mal saisi pour une carte valide.
  if (!founder) {
    return (
      <div className="kora-scope flex min-h-svh flex-col items-center justify-center gap-6 bg-kora-bark px-section-x text-center font-body text-kora-sand antialiased">
        <Head title="Carte introuvable" />
        <p className="font-display text-[clamp(1.25rem,3vw,1.75rem)] italic text-kora-sand">
          Cette carte n’existe pas.
        </p>
        <Link
          to={paths.card.getHref()}
          className="min-h-[44px] border-b border-kora-copper/45 pb-0.5 text-sm text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper"
        >
          Voir la carte de l’agence
        </Link>
      </div>
    );
  }

  return (
    <div className="kora-scope flex min-h-svh flex-col bg-kora-bark font-body text-kora-sand antialiased">
      <Head
        title={`${founder.name} — ${founder.role}`}
        description={`Coordonnées de ${founder.name}, ${founder.role.toLowerCase()} de ${contactInfo.name}. Scannez le QR code pour l’ajouter à votre répertoire.`}
      />

      <main className="flex flex-1 items-center justify-center px-section-x py-16">
        <div className="w-full max-w-[420px]">
          <PersonCard founder={founder} />

          <p className="mt-10 text-center text-sm">
            <Link
              to={paths.card.getHref()}
              className="border-b border-kora-copper/45 pb-0.5 text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper"
            >
              Voir la carte de l’agence
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CardPersonRoute;
