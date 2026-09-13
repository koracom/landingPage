import { RouterProvider, createMemoryRouter } from 'react-router';

import { rtlRender, screen, userEvent } from '@/testing/test-utils';

import CardRoute from '../card';

const renderCardRoute = () => {
  const router = createMemoryRouter(
    [
      { path: '/carte', element: <CardRoute /> },
      { path: '/', element: <h1>Accueil</h1> },
    ],
    { initialEntries: ['/carte'] },
  );

  return rtlRender(<RouterProvider router={router} />);
};

test('la page dediee presente la carte et permet de la retourner', async () => {
  renderCardRoute();

  // Par defaut : le recto, donc les coordonnees.
  expect(screen.getByText(/Carte de visite/i)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /contact@koracomsn\.com/i }),
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole('button', { name: /voir le QR code/i }),
  );

  // Le verso : le telechargement de la vCard devient accessible.
  expect(
    screen.getByRole('button', { name: /télécharger la vCard/i }),
  ).toBeInTheDocument();
});

// On verifie la destination plutot que de naviguer : la navigation client de
// react-router echoue sous jsdom (AbortSignal d'undici), ce qui testerait
// l'environnement et non la page.
test('la page dediee renvoie vers le site', () => {
  renderCardRoute();

  expect(
    screen.getByRole('link', { name: /découvrir l’agence/i }),
  ).toHaveAttribute('href', '/');
});
