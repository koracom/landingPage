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

          <nav aria-label="Cartes individuelles" className="mt-10">
            <p className="text-center text-eyebrow font-semibold uppercase text-kora-sand/55">
              Cartes individuelles
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {contactInfo.founders.map((founder) => (
                <li key={founder.slug}>
                  <Link
                    to={paths.card.person.getHref(founder.slug)}
                    className="flex min-h-[52px] items-center justify-between gap-3 rounded-sm border border-kora-copper/35 px-4 text-sm text-kora-sand transition-colors duration-200 ease-out-expo hover:border-kora-copper hover:bg-kora-copper/10"
                  >
                    <span>{founder.name}</span>
                    <span className="shrink-0 text-[10.5px] uppercase tracking-[0.18em] text-kora-copper">
                      {founder.role}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-8 text-center text-sm">
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
