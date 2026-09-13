import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { env } from '@/config/env';
import { MutationConfig } from '@/lib/react-query';

export const cardExchangeInputSchema = z.object({
  nom: z.string().trim().min(2, 'Indiquez votre nom complet.'),
  email: z.string().trim().email('Adresse e-mail non valide.'),
  telephone: z.string().trim().optional(),
  organisation: z.string().trim().optional(),
});

export type CardExchangeInput = z.infer<typeof cardExchangeInputSchema>;

/**
 * Echange de coordonnees : le visiteur renvoie les siennes a l'agence.
 *
 * Meme endpoint Formspree que le formulaire de contact, distingue par le
 * champ `_subject` pour rester triable dans la boite de reception. Si le
 * volume le justifie, basculer sur un second formulaire Formspree suffira :
 * seule la variable d'environnement change.
 */
export const submitCardExchange = async ({
  data,
  recipient,
}: {
  data: CardExchangeInput;
  /** Carte a l'origine de l'echange : l'agence, ou une fondatrice. */
  recipient: string;
}) => {
  const endpoint = env.CONTACT_ENDPOINT;

  if (!endpoint) {
    console.warn(
      '[carte] VITE_APP_CONTACT_ENDPOINT absent : echange simule, rien envoye.',
      data,
    );
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    return { simulated: true } as const;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...data,
      _subject: `Carte digitale (${recipient}) — coordonnées de ${data.nom}`,
      destinataire: recipient,
      type: 'echange-carte',
    }),
  });

  if (!response.ok) {
    throw new Error(
      `L'envoi a échoué (${response.status}). Réessayez dans un instant.`,
    );
  }

  return { simulated: false } as const;
};

type UseSubmitCardExchangeOptions = {
  mutationConfig?: MutationConfig<typeof submitCardExchange>;
};

export const useSubmitCardExchange = ({
  mutationConfig,
}: UseSubmitCardExchangeOptions = {}) =>
  useMutation({ ...mutationConfig, mutationFn: submitCardExchange });
