/**
 * Types describing the Strapi 5 REST API (flattened response format)
 * and the normalised shapes exposed by the Nuxt server API.
 */

export interface StrapiMediaFormat {
  url: string
  width: number
  height: number
  mime?: string
}

export interface StrapiMedia {
  id: number
  documentId?: string
  url: string
  alternativeText: string | null
  width: number | null
  height: number | null
  mime?: string
  formats?: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large', StrapiMediaFormat>> | null
}

/** A node of the Strapi "Blocks" rich-text editor. */
export interface StrapiTextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export interface StrapiLinkNode {
  type: 'link'
  url: string
  children: StrapiTextNode[]
}

export type StrapiInlineNode = StrapiTextNode | StrapiLinkNode

export interface StrapiListItemNode {
  type: 'list-item'
  children: StrapiInlineNode[]
}

export type StrapiBlock
  = | { type: 'paragraph', children: StrapiInlineNode[] }
    | { type: 'heading', level: 1 | 2 | 3 | 4 | 5 | 6, children: StrapiInlineNode[] }
    | { type: 'quote', children: StrapiInlineNode[] }
    | { type: 'code', language?: string, children: StrapiTextNode[] }
    | { type: 'list', format: 'ordered' | 'unordered', children: StrapiListItemNode[] }
    | { type: 'image', image: Pick<StrapiMedia, 'url' | 'alternativeText' | 'width' | 'height'> }

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: { pagination?: StrapiPagination }
}

/** Raw article as returned by `GET /api/articles?populate=cover`. */
export interface StrapiArticle {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string | null
  content: StrapiBlock[] | null
  cover: StrapiMedia | null
  locale: string
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ArticleImage {
  url: string
  alt: string
  width: number | null
  height: number | null
  srcset: string | null
}

/** Article shape consumed by the front end. */
export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: StrapiBlock[]
  cover: ArticleImage | null
  locale: string
  publishedAt: string | null
}

export type ArticleSummary = Omit<Article, 'content'>

export interface ArticleList {
  items: ArticleSummary[]
  pagination: StrapiPagination
}

export interface HealthStatus {
  status: 'ok'
  uptime: number
  strapi: 'up' | 'down'
}
