<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()

const options = computed(() => [
  { value: 'system', label: t('themes.system'), icon: 'lucide:monitor' },
  { value: 'light', label: t('themes.light'), icon: 'lucide:sun' },
  { value: 'dark', label: t('themes.dark'), icon: 'lucide:moon' },
])
</script>

<template>
  <!-- The preference is only known in the browser, so render it client-side to avoid hydration mismatches. -->
  <ClientOnly>
    <SelectButton
      v-model="colorMode.preference"
      :options="options"
      option-label="label"
      option-value="value"
      :allow-empty="false"
      :aria-label="t('a11y.theme')"
    >
      <template #option="{ option }">
        <Icon
          :name="option.icon"
          aria-hidden="true"
        />
        <span class="sr-only">{{ option.label }}</span>
      </template>
    </SelectButton>
    <template #fallback>
      <div
        class="h-10 w-30"
        aria-hidden="true"
      />
    </template>
  </ClientOnly>
</template>
