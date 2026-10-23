import type { H3Event } from 'h3'
import { FetchError, ofetch } from 'ofetch'

const REQUEST_TIMEOUT_MS = 5000

type QueryValue = string | number | boolean | undefined

/**
 * Calls the Strapi REST API from the Nitro server.
 *
 * The API token (if any) never leaves the server, and network/HTTP failures are
 * mapped to predictable H3 errors so the UI can render a friendly state:
 * - Strapi unreachable or timing out -> 503
 * - Strapi responded with 4xx/5xx    -> 502 (404 is passed through)
 */
export async function strapiFetch<T>(event: H3Event, path: string, query: Record<string, QueryValue> = {}): Promise<T> {
  const config = useRuntimeConfig(event)

  try {
    return await ofetch<T>(path, {
      baseURL: `${config.strapiUrl.replace(/\/+$/, '')}/api`,
      query,
      timeout: REQUEST_TIMEOUT_MS,
      retry: 0,
      headers: config.strapiToken ? { Authorization: `Bearer ${config.strapiToken}` } : undefined,
    })
  }
  catch (error) {
    throw toStrapiError(error)
  }
}

export function toStrapiError(error: unknown) {
  const status = error instanceof FetchError ? error.response?.status : undefined

  if (!status) {
    return createError({
      statusCode: 503,
      statusMessage: 'Content service unavailable',
      data: { reason: 'strapi-unreachable' },
    })
  }

  if (status === 404) {
    return createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  return createError({
    statusCode: 502,
    statusMessage: 'Content service error',
    data: { reason: 'strapi-error', upstreamStatus: status },
  })
}

/** Public base URL used to build absolute media URLs for the browser. */
export function getMediaBaseUrl(event: H3Event): string {
  const config = useRuntimeConfig(event)

  return config.public.strapiUrl || config.strapiUrl
}
