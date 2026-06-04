import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('affiche le nom de famille', async ({ page }) => {
    await expect(page.getByText('Hammouya', { exact: true })).toBeVisible()
  })

  test('affiche le titre de poste', async ({ page }) => {
    await expect(page.getByText('Développeuse Full Stack')).toBeVisible()
  })

  test('le lien Mon CV est présent et téléchargeable', async ({ page }) => {
    const link = page.getByRole('link', { name: /Mon CV/i })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('download')
  })
})