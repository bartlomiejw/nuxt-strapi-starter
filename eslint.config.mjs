// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['strapi/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
)
