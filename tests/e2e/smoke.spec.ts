import { expect, test } from '@playwright/test'

test.beforeEach(async ({ context }) => {
  // Pre-accept the cookie banner so it does not cover the page.
  await context.addCookies([
    { name: 'ncc_c', value: 'necessary', url: 'http://localhost' },
  ])
})

test('home page renders', async ({ page }) => {
  const response = await page.goto('/')

  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle(/Nuxt Strapi Starter/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nuxt + Strapi, ready for production')
  await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible()
})

test('switches locale, including right-to-left', async ({ page }) => {
  // Wait for hydration before interacting with client-side widgets.
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByTestId('language-selector').click()
  await page.getByRole('option', { name: 'Polski' }).click()

  await expect(page).toHaveURL(/\/pl$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'pl-PL')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nuxt + Strapi, gotowe do produkcji')

  await page.getByTestId('language-selector').click()
  await page.getByRole('option', { name: 'العربية' }).click()

  await expect(page).toHaveURL(/\/ar$/)
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

test('blog shows a friendly message when Strapi is down', async ({ page }) => {
  const response = await page.goto('/blog')

  expect(response?.status()).toBe(503)
  await expect(page.getByTestId('blog-unavailable')).toContainText('The content service is unavailable')
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible()
})

test('health endpoint reports Strapi as down', async ({ request }) => {
  const response = await request.get('/api/health')

  expect(response.ok()).toBe(true)
  expect(await response.json()).toMatchObject({ status: 'ok', strapi: 'down' })
})
