import type {
  Article,
  ArticleImage,
  ArticleSummary,
  StrapiArticle,
  StrapiBlock,
  StrapiMedia,
  StrapiPagination,
} from '../types/strapi'

/** Locales the Strapi content is published in. Keep in sync with `nuxt.config.ts`. */
export const CONTENT_LOCALES = ['en', 'fr', 'ar', 'pl'] as const
export type ContentLocale = (typeof CONTENT_LOCALES)[number]

export const DEFAULT_CONTENT_LOCALE: ContentLocale = 'en'

export function isContentLocale(value: unknown): value is ContentLocale {
  return typeof value === 'string' && (CONTENT_LOCALES as readonly string[]).includes(value)
}

export function toContentLocale(value: unknown): ContentLocale {
  return isContentLocale(value) ? value : DEFAULT_CONTENT_LOCALE
}

/** Turns a Strapi upload URL (relative for the local provider) into an absolute one. */
export function resolveMediaUrl(url: string, baseUrl: string): string {
  if (/^(?:https?:)?\/\//i.test(url) || url.startsWith('data:')) {
    return url
  }

  return `${baseUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`
}

/** Builds a `srcset` from the responsive formats Strapi generates for images. */
export function buildSrcset(media: StrapiMedia, baseUrl: string): string | null {
  const candidates = Object.values(media.formats ?? {})
    .filter(format => format && format.width > 0)
    .map(format => ({ url: format!.url, width: format!.width }))

  if (media.width) {
    candidates.push({ url: media.url, width: media.width })
  }

  if (candidates.length === 0) {
    return null
  }

  return candidates
    .sort((a, b) => a.width - b.width)
    .filter((candidate, index, list) => list.findIndex(c => c.width === candidate.width) === index)
    .map(candidate => `${resolveMediaUrl(candidate.url, baseUrl)} ${candidate.width}w`)
    .join(', ')
}

export function normaliseImage(media: StrapiMedia | null | undefined, baseUrl: string, fallbackAlt = ''): ArticleImage | null {
  if (!media?.url) {
    return null
  }

  return {
    url: resolveMediaUrl(media.url, baseUrl),
    alt: media.alternativeText || fallbackAlt,
    width: media.width,
    height: media.height,
    srcset: buildSrcset(media, baseUrl),
  }
}

/** Makes image URLs inside rich-text blocks absolute. */
export function normaliseBlocks(blocks: StrapiBlock[] | null | undefined, mediaBaseUrl: string): StrapiBlock[] {
  if (!Array.isArray(blocks)) {
    return []
  }

  return blocks.map(block => block.type === 'image'
    ? { ...block, image: { ...block.image, url: resolveMediaUrl(block.image.url, mediaBaseUrl) } }
    : block)
}

export function normaliseArticle(article: StrapiArticle, mediaBaseUrl: string): Article {
  return {
    id: article.documentId,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt ?? '',
    content: normaliseBlocks(article.content, mediaBaseUrl),
    cover: normaliseImage(article.cover, mediaBaseUrl, article.title),
    locale: article.locale,
    publishedAt: article.publishedAt,
  }
}

export function toArticleSummary(article: Article): ArticleSummary {
  const { content: _content, ...summary } = article

  return summary
}

export function emptyPagination(pageSize: number): StrapiPagination {
  return { page: 1, pageSize, pageCount: 0, total: 0 }
}
