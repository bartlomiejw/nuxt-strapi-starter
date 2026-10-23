import { beforeEach, describe, expect, it } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'
import { articleList } from '../fixtures/articles'

describe('getContentErrorKind', () => {
  it('maps errors to UI states', () => {
    expect(getContentErrorKind(null)).toBeNull()
    expect(getContentErrorKind({ statusCode: 404 })).toBe('not-found')
    expect(getContentErrorKind({ statusCode: 503 })).toBe('unavailable')
    expect(getContentErrorKind({})).toBe('unavailable')
  })
})

describe('useArticles', () => {
  beforeEach(() => {
    clearNuxtData()
  })

  it('fetches articles for the active locale', async () => {
    let receivedLocale: string | undefined

    registerEndpoint('/api/articles', (event) => {
      receivedLocale = new URL(event.path, 'http://localhost').searchParams.get('locale') ?? undefined

      return articleList
    })

    const component = await mountSuspended(defineComponent({
      async setup() {
        const { data } = await useArticles()

        return () => h('ul', data.value?.items.map(item => h('li', item.title)))
      },
    }))

    expect(receivedLocale).toBe('en')
    expect(component.findAll('li').map(li => li.text())).toEqual(['Hello Strapi', 'Second post'])
  })
})
