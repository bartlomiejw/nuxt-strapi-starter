<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()

const title = computed(() => (props.error.statusCode === 404 ? t('error.pageNotFound') : t('error.generic')))

useSeoMeta({ title, robots: 'noindex' })

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <NuxtLayout>
    <StateMessage
      :title="title"
      :description="String(error.statusCode)"
      icon="lucide:triangle-alert"
      tone="warning"
    >
      <Button
        :label="t('error.return')"
        @click="goHome"
      />
    </StateMessage>
  </NuxtLayout>
</template>
