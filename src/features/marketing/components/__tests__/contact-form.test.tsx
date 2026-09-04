import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';
import { server } from '@/testing/mocks/server';
import { rtlRender, screen, userEvent } from '@/testing/test-utils';

import { ContactForm } from '../contact-form';

/**
 * Le formulaire poste vers `VITE_APP_CONTACT_ENDPOINT` (Formspree) des que la
 * variable est renseignee. On intercepte l'appel pour que la suite reste
 * deterministe, que l'endpoint soit configure ou non.
 */
const mockEndpoint = (status: 'ok' | 'error' = 'ok') => {
  if (!env.CONTACT_ENDPOINT) return;

  server.use(
    http.post(env.CONTACT_ENDPOINT, () =>
      status === 'ok'
        ? HttpResponse.json({ ok: true })
        : HttpResponse.json({ error: 'boom' }, { status: 500 }),
    ),
  );
};

const renderContactForm = () => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });

  return rtlRender(
    <QueryClientProvider client={queryClient}>
      <ContactForm />
    </QueryClientProvider>,
  );
};

const fillValidForm = async () => {
  await userEvent.type(screen.getByLabelText(/nom complet/i), 'Aminata Ka');
  await userEvent.type(
    screen.getByLabelText(/e-mail/i),
    'aminata@koracomsn.com',
  );
  await userEvent.type(
    screen.getByLabelText(/votre projet/i),
    'Nous préparons le lancement national de notre programme.',
  );
  await userEvent.click(
    screen.getByRole('button', { name: /envoyer ma demande/i }),
  );
};

test('affiche les messages de validation quand le formulaire est vide', async () => {
  renderContactForm();

  await userEvent.click(
    screen.getByRole('button', { name: /envoyer ma demande/i }),
  );

  expect(
    await screen.findByText(/indiquez votre nom complet/i),
  ).toBeInTheDocument();
  expect(screen.getByText(/adresse e-mail non valide/i)).toBeInTheDocument();
  expect(
    screen.getByText(/décrivez votre projet en une phrase au moins/i),
  ).toBeInTheDocument();
});

test('confirme la réception après un envoi valide', async () => {
  mockEndpoint('ok');
  renderContactForm();

  await fillValidForm();

  await expect(
    screen.findByText(/message reçu\. nous revenons vers vous/i, undefined, {
      timeout: 3000,
    }),
  ).resolves.toBeInTheDocument();
});

test('affiche une erreur exploitable si l envoi echoue', async () => {
  if (!env.CONTACT_ENDPOINT) {
    // Sans endpoint configure, la soumission est simulee et ne peut pas echouer.
    return;
  }

  mockEndpoint('error');
  renderContactForm();

  await fillValidForm();

  await expect(
    screen.findByText(/l'envoi a échoué/i, undefined, { timeout: 3000 }),
  ).resolves.toBeInTheDocument();
});
