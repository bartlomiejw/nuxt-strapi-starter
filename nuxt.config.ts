import tailwindcss from '@tailwindcss/vite'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN

// Brand the default Aura preset with an emerald primary palette.
const BrandPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    },
  },
})

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@dargmuesli/nuxt-cookie-control',
    '@sentry/nuxt/module',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [
        { name: 'robots', content: 'index,follow' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
    storageKey: 'color-mode',
  },

  runtimeConfig: {
    // Server-only. Used for SSR requests (e.g. the Docker service name).
    strapiUrl: 'http://localhost:1337',
    // Optional read-only API token for private Strapi content.
    strapiToken: '',
    public: {
      // Browser-facing Strapi URL (client-side navigation and media URLs).
      strapiUrl: 'http://localhost:1337',
      siteUrl,
      siteName: 'Nuxt Strapi Starter',
      sentry: {
        dsn: '',
        environment: 'development',
        tracesSampleRate: 0.1,
      },
    },
  },

  // Generate hidden source maps only when they are uploaded to Sentry.
  sourcemap: { client: sentryAuthToken ? 'hidden' : false },

  compatibilityDate: '2026-10-01',

  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    typeCheck: false,
  },

  cookieControl: {
    cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365,
    isAcceptNecessaryButtonEnabled: true,
    isControlButtonEnabled: true,
    closeModalOnClickOutside: true,
    isCookieIdVisible: true,
    isCssEnabled: true,
    // Theme the consent UI with PrimeVue design tokens.
    colors: {
      barBackground: 'var(--p-surface-900)',
      barTextColor: 'var(--p-surface-0)',
      barButtonBackground: 'var(--p-primary-500)',
      barButtonColor: 'var(--p-surface-950)',
      barButtonHoverBackground: 'var(--p-primary-400)',
      barButtonHoverColor: 'var(--p-surface-950)',
      controlButtonBackground: 'var(--p-primary-500)',
      controlButtonIconColor: 'var(--p-surface-950)',
      controlButtonHoverBackground: 'var(--p-primary-400)',
      controlButtonIconHoverColor: 'var(--p-surface-950)',
      checkboxActiveBackground: 'var(--p-primary-500)',
      modalButtonBackground: 'var(--p-primary-500)',
      modalButtonColor: 'var(--p-surface-950)',
      modalButtonHoverBackground: 'var(--p-primary-400)',
      modalButtonHoverColor: 'var(--p-surface-950)',
      focusRingColor: 'var(--p-primary-300)',
    },
    cookies: {
      necessary: [
        {
          id: 'necessary',
          name: {
            en: 'Strictly necessary cookies',
            fr: 'Cookies strictement nécessaires',
            ar: 'ملفات تعريف الارتباط الضرورية',
            pl: 'Niezbędne pliki cookie',
          },
          description: {
            en: 'Required for language, theme and consent preferences.',
            fr: 'Nécessaires pour la langue, le thème et le consentement.',
            ar: 'مطلوبة لتفضيلات اللغة والمظهر والموافقة.',
            pl: 'Wymagane do zapamiętania języka, motywu i zgody.',
          },
          targetCookieIds: ['ncc_c', 'ncc_e', 'i18n_redirected', 'blog_view'],
        },
      ],
      optional: [],
    },
    locales: ['en', 'fr', 'ar', 'pl'],
    localeTexts: {
      en: { bannerDescription: 'This site only uses cookies that are necessary for it to work, such as remembering your language and consent choice.' },
      fr: { bannerDescription: 'Ce site utilise uniquement les cookies nécessaires à son fonctionnement, par exemple pour mémoriser votre langue et votre choix de consentement.' },
      ar: { bannerDescription: 'يستخدم هذا الموقع ملفات تعريف الارتباط الضرورية فقط لعمله، مثل تذكر لغتك واختيار الموافقة.' },
      pl: { bannerDescription: 'Ta strona używa wyłącznie niezbędnych plików cookie, np. do zapamiętania języka i decyzji o zgodzie.' },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [{ name: 'Jost', provider: 'google', weights: [400, 500, 600, 700] }],
  },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en-US.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', dir: 'ltr', file: 'fr-FR.json' },
      { code: 'ar', language: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
      { code: 'pl', language: 'pl-PL', name: 'Polski', dir: 'ltr', file: 'pl-PL.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  primevue: {
    // Register only the components the app uses to keep bundles small.
    components: { include: ['Button', 'Menubar', 'Select', 'SelectButton', 'Skeleton'] },
    directives: { include: ['Ripple'] },
    options: {
      ripple: true,
      theme: {
        preset: BrandPreset,
        options: {
          darkModeSelector: '.dark',
          // Keep PrimeVue in its own cascade layer so Tailwind utilities win.
          cssLayer: { name: 'primevue', order: 'theme, base, primevue' },
        },
      },
    },
  },

  sentry: {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: sentryAuthToken,
    telemetry: false,
    sourcemaps: { disable: !sentryAuthToken },
  },
})
