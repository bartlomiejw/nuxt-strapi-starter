<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()

const options = computed(() => locales.value.map(item => ({ code: item.code, name: item.name ?? item.code })))

async function onChange(code: typeof locale.value) {
  await setLocale(code)
}
</script>

<template>
  <Select
    :model-value="locale"
    :options="options"
    option-label="name"
    option-value="code"
    :aria-label="t('a11y.language')"
    label-id="language-selector"
    data-testid="language-selector"
    class="min-w-36"
    @update:model-value="onChange"
  >
    <template #value="{ value }">
      <span class="flex items-center gap-2">
        <Icon
          name="lucide:languages"
          aria-hidden="true"
        />
        {{ options.find(option => option.code === value)?.name }}
      </span>
    </template>
  </Select>
</template>
