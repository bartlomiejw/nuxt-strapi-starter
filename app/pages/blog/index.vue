<script setup lang="ts">
const { t } = useI18n()
const preferences = useBlogPreferencesStore()

usePageSeo({
  title: () => t('pages.blog.title'),
  description: () => t('pages.blog.description'),
})

const { data, status, error, refresh } = await useArticles()

useContentErrorStatus(error)

const articles = computed(() => data.value?.items ?? [])
const errorKind = computed(() => getContentErrorKind(error.value))

const viewOptions = computed(() => [
  { value: 'grid', label: 'Grid', icon: 'lucide:layout-grid' },
  { value: 'list', label: 'List', icon: 'lucide:list' },
])
</script>

<template>
  <div class="flex flex-col gap-8">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-bold">
          {{ t('pages.blog.title') }}
        </h1>
        <p class="mt-2 text-surface-600 dark:text-surface-400">
          {{ t('pages.blog.intro') }}
        </p>
      </div>
      <SelectButton
        v-if="articles.length > 0"
        :model-value="preferences.view"
        :options="viewOptions"
        option-value="value"
        option-label="label"
        :allow-empty="false"
        @update:model-value="preferences.setView"
      >
        <template #option="{ option }">
          <Icon
            :name="option.icon"
            aria-hidden="true"
          />
          <span class="sr-only">{{ option.label }}</span>
        </template>
      </SelectButton>
    </header>

    <div
      v-if="status === 'pending'"
      class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      :aria-label="t('pages.blog.loading')"
      aria-busy="true"
    >
      <BlogArticleCardSkeleton
        v-for="index in 3"
        :key="index"
      />
    </div>

    <StateMessage
      v-else-if="errorKind"
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

    <StateMessage
      v-else-if="articles.length === 0"
      :title="t('pages.blog.empty.title')"
      :description="t('pages.blog.empty.description')"
      data-testid="blog-empty"
    />

    <div
      v-else
      class="grid gap-6"
      :class="preferences.view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'"
    >
      <BlogArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :layout="preferences.view"
      />
    </div>
  </div>
</template>
