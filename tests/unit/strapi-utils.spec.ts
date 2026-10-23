import { describe, expect, it } from 'vitest'
import {
  buildSrcset,
  normaliseArticle,
  normaliseBlocks,
  resolveMediaUrl,
  toArticleSummary,
  toContentLocale,
} from '../../shared/utils/strapi'
import { strapiArticle } from '../fixtures/articles'

const BASE = 'https://cms.example.com/'

describe('resolveMediaUrl', () => {
  it('prefixes relative upload paths with the Strapi URL', () => {
    expect(resolveMediaUrl('/uploads/a.jpg', BASE)).toBe('https://cms.example.com/uploads/a.jpg')
  })

  it('keeps absolute and protocol-relative URLs untouched', () => {
    expect(resolveMediaUrl('https://cdn.example.com/a.jpg', BASE)).toBe('https://cdn.example.com/a.jpg')
    expect(resolveMediaUrl('//cdn.example.com/a.jpg', BASE)).toBe('//cdn.example.com/a.jpg')
  })
})

describe('buildSrcset', () => {
  it('lists formats and the original sorted by width', () => {
    expect(buildSrcset(strapiArticle.cover!, BASE)).toBe([
      'https://cms.example.com/uploads/small_cover.jpg 500w',
      'https://cms.example.com/uploads/medium_cover.jpg 750w',
      'https://cms.example.com/uploads/cover.jpg 1600w',
    ].join(', '))
  })

  it('returns null when no width information is available', () => {
    expect(buildSrcset({ id: 1, url: '/a.jpg', alternativeText: null, width: null, height: null }, BASE)).toBeNull()
  })
})

describe('normaliseArticle', () => {
  it('maps a Strapi article to the front-end shape', () => {
    const article = normaliseArticle(strapiArticle, BASE)

    expect(article).toMatchObject({
      id: 'doc-1',
      slug: 'hello-strapi',
      excerpt: 'A short excerpt.',
      locale: 'en',
      cover: { url: 'https://cms.example.com/uploads/cover.jpg', alt: 'Hello Strapi', width: 1600 },
    })
    expect(article.content).toHaveLength(1)
  })

  it('handles missing optional fields', () => {
    const article = normaliseArticle({ ...strapiArticle, excerpt: null, content: null, cover: null }, BASE)

    expect(article.excerpt).toBe('')
    expect(article.content).toEqual([])
    expect(article.cover).toBeNull()
  })

  it('produces a summary without content', () => {
    expect(toArticleSummary(normaliseArticle(strapiArticle, BASE))).not.toHaveProperty('content')
  })
})

describe('normaliseBlocks', () => {
  it('resolves image URLs inside rich text', () => {
    const [block] = normaliseBlocks([{ type: 'image', image: { url: '/uploads/x.png', alternativeText: 'x', width: 10, height: 10 } }], BASE)

    expect(block).toMatchObject({ image: { url: 'https://cms.example.com/uploads/x.png' } })
  })
})

describe('toContentLocale', () => {
  it('accepts supported locales and falls back to English', () => {
    expect(toContentLocale('pl')).toBe('pl')
    expect(toContentLocale('de')).toBe('en')
    expect(toContentLocale(undefined)).toBe('en')
    expect(toContentLocale(['pl'])).toBe('en')
  })
})
