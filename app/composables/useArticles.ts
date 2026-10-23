import type { Article, ArticleList } from '#shared/types/strapi'

export type ContentErrorKind = 'not-found' | 'unavailable'

/** Maps a fetch error from the server API to a UI state. */
export function getContentErrorKind(error: { statusCode?: number } | null | undefined): ContentErrorKind | null {
  if (!error) {
    return null
  }

  return error.statusCode === 404 ? 'not-found' : 'unavailable'
}

/**
 * Lists published articles in the current locale.
 * Data is fetched during SSR and re-fetched when the locale changes.
 */
export function useArticles(options: { pageSize?: number } = {}) {
  const { locale } = useI18n()
  const pageSize = options.pageSize ?? 12

  return useFetch<ArticleList>('/api/articles', {
    key: computed(() => `articles:${locale.value}:${pageSize}`),
    query: { locale, pageSize },
  })
}

/** Fetches a single article by slug in the current locale. */
export function useArticle(slug: MaybeRefOrGetter<string>) {
  const { locale } = useI18n()

  return useFetch<Article>(() => `/api/articles/${encodeURIComponent(toValue(slug))}`, {
    key: computed(() => `article:${locale.value}:${toValue(slug)}`),
    query: { locale },
  })
}

/** Sets the SSR response status so crawlers see 404/503 instead of 200 for error states. */
export function useContentErrorStatus(error: Ref<{ statusCode?: number } | null | undefined>) {
  const event = useRequestEvent()

  if (import.meta.server && event && error.value) {
    setResponseStatus(event, error.value.statusCode === 404 ? 404 : 503)
  }
}
