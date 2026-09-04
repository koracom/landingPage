import { rtlRender, screen, userEvent } from '@/testing/test-utils';

import { SiteNav } from '../site-nav';

test('ouvre et ferme le menu mobile', async () => {
  rtlRender(<SiteNav />);

  const burger = screen.getByRole('button', { name: /ouvrir le menu/i });
  expect(burger).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await userEvent.click(burger);

  const dialog = screen.getByRole('dialog', { name: /menu de navigation/i });
  expect(dialog).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /fermer le menu/i }),
  ).toHaveAttribute('aria-expanded', 'true');

  await userEvent.click(screen.getByRole('button', { name: /^fermer$/i }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('ferme le menu mobile avec la touche Échap', async () => {
  rtlRender(<SiteNav />);

  await userEvent.click(
    screen.getByRole('button', { name: /ouvrir le menu/i }),
  );
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await userEvent.keyboard('{Escape}');

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
