import { Form } from '@/components/ui/form';

import {
  cardExchangeInputSchema,
  useSubmitCardExchange,
} from '../api/submit-card-exchange';

import { ContactField, contactControlClassName } from './contact-field';

type ContactExchangeFormProps = {
  onDone: () => void;
};

/**
 * Le pendant de la vCard : le visiteur laisse ses coordonnees a l'agence.
 * Volontairement court — quatre champs, dont deux optionnels.
 */
export const ContactExchangeForm = ({ onDone }: ContactExchangeFormProps) => {
  const exchange = useSubmitCardExchange();

  if (exchange.isSuccess) {
    return (
      <div
        role="status"
        className="border border-kora-copper/60 p-[clamp(1.25rem,3vw,1.75rem)]"
      >
        <p className="font-display text-[clamp(1.05rem,1.6vw,1.25rem)] italic leading-snug text-kora-sand">
          Merci, vos coordonnées sont bien arrivées. Nous vous recontactons
          rapidement.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="mt-4 min-h-[44px] border-b border-kora-copper text-xs tracking-[0.16em] text-kora-copper"
        >
          FERMER
        </button>
      </div>
    );
  }

  return (
    <Form
      schema={cardExchangeInputSchema}
      className="flex flex-col gap-5 space-y-0 border border-kora-copper/35 p-[clamp(1.25rem,3vw,1.75rem)]"
      onSubmit={(values) => exchange.mutate({ data: values })}
    >
      {({ register, formState }) => (
        <>
          <p className="text-eyebrow font-semibold uppercase text-kora-copper">
            Partagez vos coordonnées
          </p>

          <ContactField
            id="echange-nom"
            label="Nom complet *"
            error={formState.errors.nom?.message}
          >
            <input
              id="echange-nom"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(formState.errors.nom)}
              className={contactControlClassName}
              {...register('nom')}
            />
          </ContactField>

          <ContactField
            id="echange-email"
            label="E-mail *"
            error={formState.errors.email?.message}
          >
            <input
              id="echange-email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(formState.errors.email)}
              className={contactControlClassName}
              {...register('email')}
            />
          </ContactField>

          <ContactField id="echange-telephone" label="Téléphone">
            <input
              id="echange-telephone"
              type="tel"
              autoComplete="tel"
              className={contactControlClassName}
              {...register('telephone')}
            />
          </ContactField>

          <ContactField id="echange-organisation" label="Organisation">
            <input
              id="echange-organisation"
              type="text"
              autoComplete="organization"
              className={contactControlClassName}
              {...register('organisation')}
            />
          </ContactField>

          {exchange.isError ? (
            <p role="alert" className="text-[13.5px] text-kora-copper">
              {exchange.error instanceof Error
                ? exchange.error.message
                : "L'envoi a échoué. Réessayez dans un instant."}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={exchange.isPending}
              className="min-h-[48px] rounded-sm bg-kora-copper px-5 text-sm font-medium text-kora-ink transition-colors duration-200 ease-out-expo hover:bg-kora-ember disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exchange.isPending ? 'Envoi…' : 'Envoyer mes coordonnées'}
            </button>
            <button
              type="button"
              onClick={onDone}
              className="min-h-[44px] text-sm text-kora-sand/70 transition-colors duration-200 ease-out-expo hover:text-kora-sand"
            >
              Annuler
            </button>
          </div>
        </>
      )}
    </Form>
  );
};
