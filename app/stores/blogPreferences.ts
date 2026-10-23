export type BlogView = 'grid' | 'list'

/** Blog UI preferences, persisted in a cookie so SSR renders the chosen layout. */
export const useBlogPreferencesStore = defineStore('blog-preferences', () => {
  const cookie = useCookie<BlogView>('blog_view', {
    default: () => 'grid',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const view = computed<BlogView>(() => (cookie.value === 'list' ? 'list' : 'grid'))

  function setView(value: BlogView) {
    cookie.value = value
  }

  function toggleView() {
    setView(view.value === 'grid' ? 'list' : 'grid')
  }

  return { view, setView, toggleView }
})
