<script setup lang="ts">
const { t, tm, rt } = useI18n()

usePageSeo({
  title: () => t('pages.contact.title'),
  description: () => t('pages.contact.description'),
})

const paragraphs = computed(() => (tm('pages.contact.body') as unknown as Parameters<typeof rt>[0][]).map(item => rt(item)))
</script>

<template>
  <article class="mx-auto max-w-3xl">
    <h1 class="mb-6 text-4xl font-bold">
      {{ t('pages.contact.title') }}
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
