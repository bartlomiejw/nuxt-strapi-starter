<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <div class="min-h-screen p-6">
    <main class="rounded-2xl bg-surface-0 p-6 shadow-xl dark:bg-surface-900">
      <Button
        :label="t('pages.minimal.back')"
        severity="secondary"
        outlined
        @click="router.back()"
      >
        <template #icon>
          <Icon
            name="lucide:arrow-left"
            class="rtl:rotate-180"
            aria-hidden="true"
          />
        </template>
      </Button>
      <slot />
    </main>
  </div>
</template>
