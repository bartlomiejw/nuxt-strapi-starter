import type { ArticleList, StrapiArticle } from '../../shared/types/strapi'

export const strapiArticle: StrapiArticle = {
  id: 1,
  documentId: 'doc-1',
  title: 'Hello Strapi',
  slug: 'hello-strapi',
  excerpt: 'A short excerpt.',
  content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Body text' }] }],
  cover: {
    id: 10,
    url: '/uploads/cover.jpg',
    alternativeText: null,
    width: 1600,
    height: 900,
    formats: {
      small: { url: '/uploads/small_cover.jpg', width: 500, height: 281 },
      medium: { url: '/uploads/medium_cover.jpg', width: 750, height: 422 },
    },
  },
  locale: 'en',
  publishedAt: '2026-01-15T10:00:00.000Z',
  createdAt: '2026-01-15T10:00:00.000Z',
  updatedAt: '2026-01-15T10:00:00.000Z',
}

export const articleList: ArticleList = {
  items: [
    {
      id: 'doc-1',
      title: 'Hello Strapi',
      slug: 'hello-strapi',
      excerpt: 'A short excerpt.',
      cover: null,
      locale: 'en',
      publishedAt: '2026-01-15T10:00:00.000Z',
    },
    {
      id: 'doc-2',
      title: 'Second post',
      slug: 'second-post',
      excerpt: '',
      cover: null,
      locale: 'en',
      publishedAt: null,
    },
  ],
  pagination: { page: 1, pageSize: 12, pageCount: 1, total: 2 },
}
