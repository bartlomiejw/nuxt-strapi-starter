<script setup lang="ts">
const { t, tm, rt } = useI18n()

usePageSeo({
  title: () => t('pages.about.title'),
  description: () => t('pages.about.description'),
})

const paragraphs = computed(() => (tm('pages.about.body') as unknown as Parameters<typeof rt>[0][]).map(item => rt(item)))
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-4xl font-bold">
      {{ t('pages.about.title') }}
    </h1>
    <div class="prose-content">
      <p
        v-for="(paragraph, index) in paragraphs"
        :key="index"
      >
        {{ paragraph }}
      </p>
    </div>
  </article>
</template>
