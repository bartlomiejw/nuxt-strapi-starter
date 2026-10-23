<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo({
  title: () => t('pages.index.title'),
  description: () => t('pages.index.description'),
})

const stack = [
  { name: 'Nuxt', icon: 'logos:nuxt-icon' },
  { name: 'Strapi', icon: 'logos:strapi-icon' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'Sentry', icon: 'logos:sentry-icon' },
]

const features = ['ssr', 'strapi', 'primevue', 'tailwind', 'i18n', 'darkMode', 'pinia', 'sentry', 'icons', 'cookies', 'testing', 'lint', 'ci'] as const
</script>

<template>
  <div class="flex flex-col gap-16">
    <section class="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <ul
        class="flex items-center gap-6"
        aria-label="Stack"
      >
        <li
          v-for="item in stack"
          :key="item.name"
        >
          <Icon
            :name="item.icon"
            size="3rem"
            :aria-label="item.name"
          />
        </li>
      </ul>
      <p class="text-sm font-semibold tracking-wide text-primary uppercase">
        {{ t('pages.index.hero.eyebrow') }}
      </p>
      <h1 class="text-4xl font-bold sm:text-5xl">
        {{ t('pages.index.hero.title') }}
      </h1>
      <p class="text-lg text-surface-600 dark:text-surface-400">
        {{ t('pages.index.hero.description') }}
      </p>
      <NuxtLink :to="localePath('/blog')">
        <Button
          :label="t('pages.index.hero.cta')"
          size="large"
          tabindex="-1"
        />
      </NuxtLink>
    </section>

    <section aria-labelledby="features-title">
      <h2
        id="features-title"
        class="mb-6 text-center text-2xl font-semibold"
      >
        {{ t('pages.index.featuresTitle') }}
      </h2>
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="feature in features"
          :key="feature"
          class="flex items-center gap-3 rounded-lg border border-surface-200 bg-surface-0 px-4 py-3 dark:border-surface-800 dark:bg-surface-900"
        >
          <Icon
            name="lucide:circle-check"
            class="text-primary"
            size="1.25rem"
            aria-hidden="true"
          />
          {{ t(`pages.index.features.${feature}`) }}
        </li>
      </ul>
    </section>
  </div>
</template>
