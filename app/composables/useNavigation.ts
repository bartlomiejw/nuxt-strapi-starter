export interface NavigationItem {
  key: string
  label: string
  icon: string
  to: string
}

/** Main navigation, localised and resolved to locale-aware paths. */
export function useNavigation() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  const items = computed<NavigationItem[]>(() => [
    { key: 'home', label: t('menu.home'), icon: 'lucide:house', to: localePath('/') },
    { key: 'blog', label: t('menu.blog'), icon: 'lucide:newspaper', to: localePath('/blog') },
    { key: 'about', label: t('menu.about'), icon: 'lucide:info', to: localePath('/about') },
    { key: 'contact', label: t('menu.contact'), icon: 'lucide:mail', to: localePath('/contact') },
    { key: 'minimal', label: t('menu.minimal'), icon: 'lucide:maximize', to: localePath('/minimal') },
  ])

  return { items }
}
