<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  icon?: string
  tone?: 'neutral' | 'warning'
}>(), {
  description: undefined,
  icon: 'lucide:inbox',
  tone: 'neutral',
})
</script>

<template>
  <section
    class="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center"
    :class="tone === 'warning' ? 'border-amber-400/60 bg-amber-50 dark:bg-amber-950/20' : 'border-surface-300 dark:border-surface-700'"
    role="status"
  >
    <Icon
      :name="icon"
      size="2.5rem"
      :class="tone === 'warning' ? 'text-amber-500' : 'text-surface-400'"
      aria-hidden="true"
    />
    <h2 class="text-xl font-semibold">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-surface-600 dark:text-surface-400"
    >
      {{ description }}
    </p>
    <slot />
  </section>
</template>
