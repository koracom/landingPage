import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { env } from '@/config/env';
import { MutationConfig } from '@/lib/react-query';

export const contactInputSchema = z.object({
  nom: z.string().trim().min(2, 'Indiquez votre nom complet.'),
  email: z.string().trim().email('Adresse e-mail non valide.'),
  organisation: z.string().trim().optional(),
  sujet: z.enum([
    'evenementiel',
    'branding',
    'audiovisuel',
    'digital',
    'autre',
  ]),
  message: z
    .string()
    .trim()
    .min(10, 'Décrivez votre projet en une phrase au moins.'),
});

export type ContactInput = z.infer<typeof contactInputSchema>;

/**
 * Envoi vers Formspree : POST JSON avec l'en-tete Accept: application/json,
 * ce qui evite la redirection HTML et renvoie un statut exploitable.
 *
 * TODO(contact) : renseigner `VITE_APP_CONTACT_ENDPOINT` avec l'URL du
 * formulaire (https://formspree.io/f/xxxxxxxx). Tant que la variable est
 * vide, la soumission est simulee cote client et aucun message n'est envoye.
 */
export const submitContact = async ({ data }: { data: ContactInput }) => {
  const endpoint = env.CONTACT_ENDPOINT;

  if (!endpoint) {
    console.warn(
      '[contact] VITE_APP_CONTACT_ENDPOINT absent : soumission simulee, aucun message envoye.',
      data,
    );
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    return { simulated: true } as const;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `L'envoi a échoué (${response.status}). Réessayez ou écrivez-nous directement.`,
    );
  }

  return { simulated: false } as const;
};

type UseSubmitContactOptions = {
  mutationConfig?: MutationConfig<typeof submitContact>;
};

export const useSubmitContact = ({
  mutationConfig,
}: UseSubmitContactOptions = {}) =>
  useMutation({ ...mutationConfig, mutationFn: submitContact });
