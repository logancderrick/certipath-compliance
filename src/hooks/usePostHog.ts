'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export type PostHogEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export type PostHogIdentify = {
  distinctId: string;
  properties?: Record<string, string | number | boolean>;
};

export type PostHogHook = {
  track: (event: PostHogEvent) => void;
  identify: (data: PostHogIdentify) => void;
  reset: () => void;
  optOut: () => void;
  optIn: () => void;
};

const usePostHog = (): PostHogHook => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      });
    }
  }, []);

  const track = (event: PostHogEvent): void => {
    if (typeof window !== 'undefined') {
      posthog.capture(event.name, event.properties);
    }
  };

  const identify = (data: PostHogIdentify): void => {
    if (typeof window !== 'undefined') {
      posthog.identify(data.distinctId, data.properties);
    }
  };

  const reset = (): void => {
    if (typeof window !== 'undefined') {
      posthog.reset();
    }
  };

  const optOut = (): void => {
    if (typeof window !== 'undefined') {
      posthog.opt_out_capturing();
    }
  };

  const optIn = (): void => {
    if (typeof window !== 'undefined') {
      posthog.opt_in_capturing();
    }
  };

  return { track, identify, reset, optOut, optIn };
};

export default usePostHog; 