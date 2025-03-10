'use client';

import { useCallback } from 'react';

export function usePostHog() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(eventName, properties);
    }
  }, []);

  const identifyUser = useCallback((distinctId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.identify(distinctId, properties);
    }
  }, []);

  const resetUser = useCallback(() => {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.reset();
    }
  }, []);

  return {
    trackEvent,
    identifyUser,
    resetUser
  };
} 