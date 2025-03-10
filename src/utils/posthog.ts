import posthog from 'posthog-js';

// Helper function to capture events
export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

// Helper function to identify users
export const identifyUser = (
  distinctId: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    posthog.identify(distinctId, properties);
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