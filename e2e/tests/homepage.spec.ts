import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('affiche le titre principal', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('affiche le statut de connexion API', async ({ page }) => {
    const status = page.getByText(/API connectée|API inaccessible|Connexion/)
    await expect(status).toBeVisible({ timeout: 5000 })
  })

  test('le bouton principal est cliquable', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Commencer' })
    await expect(button).toBeVisible()
    await expect(button).toBeEnabled()
  })
})
