import type { HealthStatus } from '#shared/types/strapi'

/**
 * Liveness endpoint for load balancers and uptime checks.
 * Always returns 200 while the Nuxt server is up and reports Strapi reachability.
 */
export default defineEventHandler(async (event): Promise<HealthStatus> => {
  const { strapiUrl } = useRuntimeConfig(event)
  const strapi: HealthStatus['strapi'] = await $fetch
    .raw('/_health', { baseURL: strapiUrl, timeout: 2000, retry: 0 })
    .then(() => 'up' as const)
    .catch(() => 'down' as const)

  setResponseHeader(event, 'Cache-Control', 'no-store')

  return { status: 'ok', uptime: Math.round(process.uptime()), strapi }
})
