<script setup lang="ts">
import type { ArticleSummary } from '#shared/types/strapi'

const props = defineProps<{
  article: ArticleSummary
  layout?: 'grid' | 'list'
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const publishedOn = computed(() => {
  if (!props.article.publishedAt) {
    return null
  }

  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }).format(new Date(props.article.publishedAt))
})
</script>

<template>
  <article
    class="group relative flex overflow-hidden rounded-xl border border-surface-200 bg-surface-0 transition hover:shadow-lg dark:border-surface-800 dark:bg-surface-900"
    :class="layout === 'list' ? 'flex-row' : 'flex-col'"
    data-testid="article-card"
  >
    <img
      v-if="article.cover"
      :src="article.cover.url"
      :srcset="article.cover.srcset ?? undefined"
      sizes="(min-width: 1024px) 33vw, 100vw"
      :alt="article.cover.alt"
      :width="article.cover.width ?? undefined"
      :height="article.cover.height ?? undefined"
      loading="lazy"
      class="object-cover"
      :class="layout === 'list' ? 'w-40 shrink-0' : 'aspect-video w-full'"
    >
    <div class="flex flex-1 flex-col gap-3 p-5">
      <time
        v-if="publishedOn"
        :datetime="article.publishedAt ?? undefined"
        class="text-sm text-surface-500"
      >
        {{ t('pages.blog.publishedOn', { date: publishedOn }) }}
      </time>
      <h2 class="text-xl font-semibold">
        <NuxtLink
          :to="localePath(`/blog/${article.slug}`)"
          class="after:absolute after:inset-0 group-hover:text-primary"
        >
          {{ article.title }}
        </NuxtLink>
      </h2>
      <p
        v-if="article.excerpt"
        class="text-surface-600 dark:text-surface-400"
      >
        {{ article.excerpt }}
      </p>
      <span class="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
        {{ t('pages.blog.readMore') }}
        <Icon
          name="lucide:arrow-right"
          class="rtl:rotate-180"
          aria-hidden="true"
        />
      </span>
    </div>
  </article>
</template>
