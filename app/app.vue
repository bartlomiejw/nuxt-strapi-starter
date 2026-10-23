<script setup lang="ts">
const { t, locale } = useI18n()
const config = useRuntimeConfig()
const route = useRoute()

// Sets <html lang/dir>, canonical and hreflang links for the active locale.
const i18nHead = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs.lang,
    dir: () => i18nHead.value.htmlAttrs.dir,
  },
  link: () => i18nHead.value.link,
  meta: () => i18nHead.value.meta,
  titleTemplate: title => (title ? `${title} · ${t('site.name')}` : t('site.name')),
})

useSeoMeta({
  description: () => t('site.description'),
  ogSiteName: () => config.public.siteName,
  ogUrl: () => new URL(route.path, config.public.siteUrl).href,
})

const cookieLocale = computed(() => locale.value as 'en' | 'fr' | 'ar' | 'pl')
</script>

<template>
  <NuxtLoadingIndicator color="var(--p-primary-500)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CookieControl :locale="cookieLocale" />
</template>
