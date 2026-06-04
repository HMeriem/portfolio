import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Nom').scrollIntoViewIfNeeded();
  });

  test('affiche les champs nom, email et message', async ({ page }) => {
    await expect(page.getByPlaceholder('Nom')).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Message...')).toBeVisible();
  });

  test('affiche le bouton Envoyer', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /Envoyer/i }),
    ).toBeVisible();
  });

  test('affiche les erreurs de champs pour un formulaire vide', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(
      page.getByText('Veuillez indiquer votre nom.'),
    ).toBeVisible();
    await expect(
      page.getByText('Veuillez indiquer votre adresse email.'),
    ).toBeVisible();
    await expect(
      page.getByText('Veuillez écrire votre message.'),
    ).toBeVisible();
  });

  test('affiche une erreur pour un email au mauvais format', async ({
    page,
  }) => {
    await page.getByPlaceholder('Nom').fill('Alice');
    await page.getByPlaceholder('Email').fill('pas-un-email');
    await page.getByPlaceholder('Message...').fill('Bonjour !');
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(page.getByText('Adresse email invalide.')).toBeVisible();
  });

  test("l'erreur disparaît quand l'utilisateur corrige le champ", async ({
    page,
  }) => {
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(
      page.getByText('Veuillez indiquer votre nom.'),
    ).toBeVisible();
    await page.getByPlaceholder('Nom').fill('A');
    await expect(
      page.getByText('Veuillez indiquer votre nom.'),
    ).not.toBeVisible();
  });

  test('envoie le formulaire et affiche le message de succès', async ({
    page,
  }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status: 204 }),
    );
    await page.getByPlaceholder('Nom').fill('Alice');
    await page.getByPlaceholder('Email').fill('alice@example.com');
    await page.getByPlaceholder('Message...').fill('Bonjour, ceci est un test.');
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(page.getByText('Message envoyé avec succès.')).toBeVisible();
  });

  test('réinitialise les champs après un envoi réussi', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status: 204 }),
    );
    await page.getByPlaceholder('Nom').fill('Alice');
    await page.getByPlaceholder('Email').fill('alice@example.com');
    await page.getByPlaceholder('Message...').fill('Message de test.');
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(page.getByText('Message envoyé avec succès.')).toBeVisible();
    await expect(page.getByPlaceholder('Nom')).toHaveValue('');
    await expect(page.getByPlaceholder('Email')).toHaveValue('');
    await expect(page.getByPlaceholder('Message...')).toHaveValue('');
  });

  test("affiche l'erreur réseau si l'API est inaccessible", async ({
    page,
  }) => {
    await page.route('**/api/contact', (route) => route.abort('failed'));
    await page.getByPlaceholder('Nom').fill('Alice');
    await page.getByPlaceholder('Email').fill('alice@example.com');
    await page.getByPlaceholder('Message...').fill('Bonjour !');
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(
      page.getByText(
        'Impossible de joindre le serveur. Vérifiez votre connexion internet.',
      ),
    ).toBeVisible();
  });

  test('affiche le message de limite de débit atteinte (429)', async ({
    page,
  }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status: 429 }),
    );
    await page.getByPlaceholder('Nom').fill('Alice');
    await page.getByPlaceholder('Email').fill('alice@example.com');
    await page.getByPlaceholder('Message...').fill('Bonjour !');
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(
      page.getByText(/Vous avez atteint la limite/),
    ).toBeVisible();
  });

  test('affiche une erreur serveur (500)', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({ status: 500 }),
    );
    await page.getByPlaceholder('Nom').fill('Alice');
    await page.getByPlaceholder('Email').fill('alice@example.com');
    await page.getByPlaceholder('Message...').fill('Bonjour !');
    await page.getByRole('button', { name: /Envoyer/i }).click();
    await expect(
      page.getByText(
        'Une erreur est survenue côté serveur. Réessayez plus tard.',
      ),
    ).toBeVisible();
  });
});
