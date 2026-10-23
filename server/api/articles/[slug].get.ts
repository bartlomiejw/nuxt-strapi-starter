import type { Article, StrapiArticle, StrapiCollectionResponse } from '#shared/types/strapi'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export default defineEventHandler(async (event): Promise<Article> => {
  const slug = getRouterParam(event, 'slug') ?? ''

  if (!SLUG_PATTERN.test(slug)) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const locale = toContentLocale(getQuery(event).locale)

  const response = await strapiFetch<StrapiCollectionResponse<StrapiArticle>>(event, '/articles', {
    'locale': locale,
    'filters[slug][$eq]': slug,
    'populate': 'cover',
    'pagination[pageSize]': 1,
  })

  const article = response.data[0]

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  return normaliseArticle(article, getMediaBaseUrl(event))
})
