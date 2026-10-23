import * as Sentry from '@sentry/nuxt'

const { dsn, environment, tracesSampleRate } = useRuntimeConfig().public.sentry

// Sentry stays a no-op unless NUXT_PUBLIC_SENTRY_DSN is provided.
if (dsn) {
  Sentry.init({
    dsn,
    environment,
    tracesSampleRate: Number(tracesSampleRate) || 0,
    // Session replays are opt-in: record only sessions that hit an error.
    integrations: [Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true })],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.1,
  })
}
