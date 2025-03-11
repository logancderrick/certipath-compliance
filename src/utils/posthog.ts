import posthog from 'posthog-js';

type PostHogEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

type PostHogIdentify = {
  distinctId: string;
  properties?: Record<string, string | number | boolean>;
};

export const trackEvent = (event: PostHogEvent) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event.name, event.properties);
  }
};

export const identifyUser = (data: PostHogIdentify) => {
  if (typeof window !== 'undefined') {
    posthog.identify(data.distinctId, data.properties);
  }
};

// Helper function to reset user identity (for logout)
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};

// Helper function to opt out of tracking (for GDPR compliance)
export const optOut = () => {
  if (typeof window !== 'undefined') {
    posthog.opt_out_capturing();
  }
};

// Helper function to opt back in to tracking
export const optIn = () => {
  if (typeof window !== 'undefined') {
    posthog.opt_in_capturing();
  }
}; 