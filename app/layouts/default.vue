<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-contrast"
    >
      {{ t('a11y.skipToContent') }}
    </a>
    <header class="border-b border-surface-200 bg-surface-0/80 backdrop-blur dark:border-surface-800 dark:bg-surface-900/80">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-2 text-lg font-semibold"
        >
          <img
            src="/favicon.svg"
            alt=""
            width="32"
            height="32"
          >
          {{ t('site.name') }}
        </NuxtLink>
        <div class="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSelector />
        </div>
        <AppMenu class="w-full" />
      </div>
    </header>
    <main
      id="main"
      class="mx-auto w-full max-w-6xl flex-1 px-4 py-10"
    >
      <slot />
    </main>
    <footer class="border-t border-surface-200 py-8 text-center text-sm text-surface-500 dark:border-surface-800">
      © {{ new Date().getFullYear() }} {{ t('site.name') }} · {{ t('site.footer') }}
    </footer>
  </div>
</template>
