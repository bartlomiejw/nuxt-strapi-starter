import type { ArticleList, StrapiArticle, StrapiCollectionResponse } from '#shared/types/strapi'

const MAX_PAGE_SIZE = 50

export default defineEventHandler(async (event): Promise<ArticleList> => {
  const query = getQuery(event)
  const locale = toContentLocale(query.locale)
  const page = clampInt(query.page, 1, 1, Number.MAX_SAFE_INTEGER)
  const pageSize = clampInt(query.pageSize, 12, 1, MAX_PAGE_SIZE)

  const response = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(event, '/articles', {
    'locale': locale,
    'sort': 'publishedAt:desc',
    'populate': 'cover',
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'fields[2]': 'excerpt',
    'fields[3]': 'locale',
    'fields[4]': 'publishedAt',
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  })

  const mediaBaseUrl = getMediaBaseUrl(event)

  return {
    items: response.data.map(article => toArticleSummary(normaliseArticle(article, mediaBaseUrl))),
    pagination: response.meta.pagination ?? emptyPagination(pageSize),
  }
})

function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(String(value ?? ''), 10)

  if (Number.isNaN(parsed)) {
    return fallback
  }

  return Math.min(Math.max(parsed, min), max)
}
