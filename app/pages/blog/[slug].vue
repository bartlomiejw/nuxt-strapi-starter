<script setup lang="ts">
const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug))
const { data: article, error, refresh } = await useArticle(slug)

useContentErrorStatus(error)

const errorKind = computed(() => getContentErrorKind(error.value))

const publishedOn = computed(() => {
  if (!article.value?.publishedAt) {
    return null
  }

  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(article.value.publishedAt))
})

usePageSeo({
  title: () => article.value?.title ?? (errorKind.value === 'not-found' ? t('pages.blog.notFound.title') : t('pages.blog.title')),
  description: () => article.value?.excerpt || t('pages.blog.description'),
})

useSeoMeta({
  ogType: 'article',
  ogImage: () => article.value?.cover?.url,
  robots: () => (errorKind.value ? 'noindex' : undefined),
})
</script>

<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-8">
    <NuxtLink
      :to="localePath('/blog')"
      class="inline-flex items-center gap-1 text-sm font-medium text-primary"
    >
      <Icon
        name="lucide:arrow-left"
        class="rtl:rotate-180"
        aria-hidden="true"
      />
      {{ t('pages.blog.backToList') }}
    </NuxtLink>

    <StateMessage
      v-if="errorKind === 'not-found'"
      :title="t('pages.blog.notFound.title')"
      :description="t('pages.blog.notFound.description')"
      icon="lucide:file-question"
      data-testid="article-not-found"
    />

    <StateMessage
      v-else-if="errorKind === 'unavailable'"
      :title="t('pages.blog.unavailable.title')"
      :description="t('pages.blog.unavailable.description')"
      icon="lucide:cloud-off"
      tone="warning"
      data-testid="blog-unavailable"
    >
      <Button
        :label="t('pages.blog.unavailable.retry')"
        severity="secondary"
        @click="refresh()"
      />
    </StateMessage>

    <article
      v-else-if="article"
      class="flex flex-col gap-6"
    >
      <header class="flex flex-col gap-3">
        <time
          v-if="publishedOn"
          :datetime="article.publishedAt ?? undefined"
          class="text-sm text-surface-500"
        >
          {{ t('pages.blog.publishedOn', { date: publishedOn }) }}
        </time>
        <h1 class="text-4xl font-bold">
          {{ article.title }}
        </h1>
        <p
          v-if="article.excerpt"
          class="text-xl text-surface-600 dark:text-surface-400"
        >
          {{ article.excerpt }}
        </p>
      </header>
      <img
        v-if="article.cover"
        :src="article.cover.url"
        :srcset="article.cover.srcset ?? undefined"
        sizes="(min-width: 768px) 48rem, 100vw"
        :alt="article.cover.alt"
        :width="article.cover.width ?? undefined"
        :height="article.cover.height ?? undefined"
        class="aspect-video w-full rounded-xl object-cover"
      >
      <BlogStrapiBlocks :blocks="article.content" />
    </article>
  </div>
</template>
