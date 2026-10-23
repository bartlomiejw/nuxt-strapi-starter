import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('blog preferences store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.cookie = 'blog_view=; Max-Age=0; path=/'
  })

  it('defaults to the grid view', () => {
    expect(useBlogPreferencesStore().view).toBe('grid')
  })

  it('toggles and persists the view in a cookie', async () => {
    const store = useBlogPreferencesStore()

    store.toggleView()

    expect(store.view).toBe('list')
    await nextTick()
    expect(document.cookie).toContain('blog_view=list')

    store.setView('grid')

    expect(store.view).toBe('grid')
  })
})
