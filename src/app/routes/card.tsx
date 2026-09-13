import { Link } from 'react-router';

import { Head } from '@/components/seo';
import { paths } from '@/config/paths';
import { DigitalCard } from '@/features/marketing/components';
import { contactInfo } from '@/features/marketing/data/contact-info';

/**
 * Page autonome de la carte digitale.
 *
 * C'est le lien que l'on transmet a un prospect : il ouvre la carte et rien
 * d'autre, sans la navigation ni les sections du site. La carte reste
 * egalement presente sur la page d'accueil, les deux partagent le meme
 * composant.
 */
const CardRoute = () => {
  return (
    <div className="kora-scope flex min-h-svh flex-col bg-kora-bark font-body text-kora-sand antialiased">
      <Head
        title="Carte de visite digitale"
        description={`Coordonnées de ${contactInfo.name} — ${contactInfo.foundersLabel}. Scannez le QR code pour ajouter le contact à votre répertoire.`}
      />

      <main className="flex flex-1 items-center justify-center px-section-x py-16">
        <div className="w-full max-w-[420px]">
          {/* Pas d'en-tete : la carte porte deja le monogramme, le role, les
              fondatrices et la ville. Le repeter au-dessus ferait apparaitre
              deux fois la meme signature a quelques centimetres d'ecart. */}
          <DigitalCard eyebrow="Carte de visite" />

          <p className="mt-10 text-center text-sm">
            <Link
              to={paths.home.getHref()}
              className="border-b border-kora-copper/45 pb-0.5 text-kora-copper transition-colors duration-200 ease-out-expo hover:border-kora-copper"
            >
              Découvrir l’agence
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CardRoute;
