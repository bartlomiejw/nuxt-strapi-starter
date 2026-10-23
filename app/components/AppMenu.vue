<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import type { NavigationItem } from '~/composables/useNavigation'

const { t } = useI18n()
const { items } = useNavigation()
const route = useRoute()

const model = computed(() => items.value.map(item => ({ ...item })))

function navOf(item: MenuItem) {
  return item as unknown as NavigationItem
}

function isActive(to: string) {
  const isRoot = /^\/[a-z]{2}$/.test(to) || to === '/'

  return isRoot ? route.path === to : route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <Menubar
    :model="model"
    :aria-label="t('a11y.mainNavigation')"
    class="border-none! bg-transparent! p-0!"
  >
    <template #item="{ item, props }">
      <NuxtLink
        v-ripple
        v-bind="props.action"
        :to="navOf(item).to"
        :aria-current="isActive(navOf(item).to) ? 'page' : undefined"
        class="flex items-center gap-2 rounded-md px-3 py-2"
        :class="isActive(navOf(item).to) ? 'text-primary font-semibold' : ''"
      >
        <Icon
          :name="navOf(item).icon"
          size="1.1em"
          aria-hidden="true"
        />
        <span>{{ navOf(item).label }}</span>
      </NuxtLink>
    </template>
  </Menubar>
</template>
