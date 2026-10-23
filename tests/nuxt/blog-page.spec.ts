import { beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import BlogPage from '~/pages/blog/index.vue'
import { articleList } from '../fixtures/articles'

describe('blog page', () => {
  beforeEach(() => {
    clearNuxtData()
  })

  it('renders an article card per article', async () => {
    registerEndpoint('/api/articles', () => articleList)

    const page = await mountSuspended(BlogPage)
    const cards = page.findAll('[data-testid="article-card"]')

    expect(cards).toHaveLength(2)
    expect(cards[0]!.text()).toContain('Hello Strapi')
    expect(cards[0]!.find('a').attributes('href')).toBe('/blog/hello-strapi')
  })

  it('shows the empty state when there are no articles', async () => {
    registerEndpoint('/api/articles', () => ({ ...articleList, items: [] }))

    const page = await mountSuspended(BlogPage)

    expect(page.find('[data-testid="blog-empty"]').exists()).toBe(true)
  })

  it('shows a friendly message when the CMS is unavailable', async () => {
    registerEndpoint('/api/articles', () => {
      throw createError({ statusCode: 503, statusMessage: 'Content service unavailable' })
    })

    const page = await mountSuspended(BlogPage)
    const message = page.find('[data-testid="blog-unavailable"]')

    expect(message.exists()).toBe(true)
    expect(message.text()).toContain('The content service is unavailable')
  })
})
