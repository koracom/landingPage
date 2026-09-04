import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-320', width: 320, height: 640 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
];

test.describe('landing KoraCom — responsive', () => {
  for (const viewport of VIEWPORTS) {
    test(`aucun débordement horizontal en ${viewport.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');

      await expect(
        page.getByRole('heading', { level: 1, name: /l'art de captiver/i }),
      ).toBeVisible();

      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(
        overflow,
        'la page ne doit jamais scroller horizontalement',
      ).toBeLessThanOrEqual(1);

      await page.screenshot({
        path: `test-results/landing-${viewport.name}.png`,
        fullPage: true,
      });
    });
  }

  test('le menu mobile remplace la navigation au-dessous de lg', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const burger = page.getByRole('button', { name: /ouvrir le menu/i });
    await expect(burger).toBeVisible();

    await burger.click();
    const dialog = page.getByRole('dialog', { name: /menu de navigation/i });
    await expect(dialog).toBeVisible();

    await dialog.getByRole('link', { name: /nos services/i }).click();
    await expect(dialog).toBeHidden();
    await expect(page.locator('#services')).toBeInViewport({ ratio: 0.1 });
  });

  test('la navigation desktop expose le CTA de contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await expect(
      page.getByRole('button', { name: /ouvrir le menu/i }),
    ).toBeHidden();
    await expect(
      page.getByRole('link', { name: /nous contacter/i }),
    ).toBeVisible();
  });

  test('le formulaire de contact valide les champs obligatoires', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /envoyer ma demande/i }).click();

    await expect(page.getByText(/indiquez votre nom complet/i)).toBeVisible();
  });
});
