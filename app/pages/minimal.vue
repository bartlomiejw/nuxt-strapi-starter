<script setup lang="ts">
definePageMeta({ layout: 'fullscreen' })

const { t, tm, rt } = useI18n()

usePageSeo({
  title: () => t('pages.minimal.title'),
  description: () => t('pages.minimal.description'),
})

const paragraphs = computed(() => (tm('pages.minimal.body') as unknown as Parameters<typeof rt>[0][]).map(item => rt(item)))
</script>

<template>
  <article class="mt-6">
    <h1 class="mb-6 text-4xl font-bold">
      {{ t('pages.minimal.title') }}
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
