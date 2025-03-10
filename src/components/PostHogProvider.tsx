'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';

// Extend Window interface to include posthog
declare global {
  interface Window {
    posthog?: typeof posthog;
  }
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== 'undefined') {
      posthog.init(
        process.env.NEXT_PUBLIC_POSTHOG_API_KEY || '',
        {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
          capture_pageview: false, // We'll handle this manually
          loaded: (posthogInstance) => {
            if (process.env.NODE_ENV === 'development') {
              // Make available during development
              window.posthog = posthogInstance;
            }
          },
        }
      );
    }

    // No cleanup needed - PostHog will persist until the page is unloaded
  }, []);

  // Track page views
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return children;
} 