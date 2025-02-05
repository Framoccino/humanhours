import * as Sentry from '@sentry/nextjs';

export function initializeMonitoring() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }
}

export function trackError(error: Error, context?: any) {
  console.error('Error:', error);
  Sentry.captureException(error, { extra: context });
}

export function trackPageView(page: string) {
  if (typeof window !== 'undefined') {
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: `Visited ${page}`,
      level: 'info',
    });
  }
} 