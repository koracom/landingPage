import { RouterProvider, createMemoryRouter } from 'react-router';

import { contactInfo } from '@/features/marketing/data/contact-info';
import { rtlRender, screen, userEvent } from '@/testing/test-utils';

import CardPersonRoute from '../card-person';

const [khadidiatou, aminata] = contactInfo.founders;

const renderAt = (url: string) => {
  const router = createMemoryRouter(
    [
      { path: '/carte/:slug', element: <CardPersonRoute /> },
      { path: '/carte', element: <h1>Carte agence</h1> },
    ],
    { initialEntries: [url] },
  );

  return rtlRender(<RouterProvider router={router} />);
};

test('la carte individuelle affiche les coordonnees de la bonne personne', async () => {
  renderAt(`/carte/${khadidiatou.slug}`);

  expect(
    screen.getByRole('heading', { name: khadidiatou.displayName }),
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: khadidiatou.email })).toHaveAttribute(
    'href',
    `mailto:${khadidiatou.email}`,
  );
  expect(screen.getByRole('link', { name: khadidiatou.phone })).toHaveAttribute(
    'href',
    khadidiatou.phoneHref,
  );

  // L'interet meme d'une carte individuelle : l'autre fondatrice n'y est pas.
  expect(screen.queryByText(aminata.email)).not.toBeInTheDocument();
  expect(screen.queryByText(aminata.phone)).not.toBeInTheDocument();
});

test('le verso propose le QR et le telechargement de cette personne', async () => {
  renderAt(`/carte/${aminata.slug}`);

  await userEvent.click(
    screen.getByRole('button', { name: /voir le QR code/i }),
  );

  expect(
    screen.getByRole('img', {
      name: new RegExp(`ajouter ${aminata.name}`, 'i'),
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: new RegExp(`enregistrer ${aminata.firstName}`, 'i'),
    }),
  ).toBeInTheDocument();
});

test('un slug inconnu le dit, au lieu de faire passer un autre pour lui', () => {
  renderAt('/carte/inconnu');

  expect(screen.getByText(/cette carte n’existe pas/i)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /voir la carte de l’agence/i }),
  ).toHaveAttribute('href', '/carte');
});
