import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.E2E_PORT ?? 3100)
const baseURL = `http://localhost:${PORT}`

/**
 * End-to-end smoke tests against the production build (`pnpm build` first).
 * Strapi is intentionally pointed at a closed port, so the suite also covers
 * the "CMS unavailable" state without needing a running CMS.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'node .output/server/index.mjs',
    url: `${baseURL}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    env: {
      PORT: String(PORT),
      NUXT_STRAPI_URL: 'http://127.0.0.1:9',
      NUXT_PUBLIC_STRAPI_URL: 'http://127.0.0.1:9',
      NUXT_PUBLIC_SITE_URL: baseURL,
    },
  },
})
