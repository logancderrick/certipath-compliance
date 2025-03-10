'use client';

import React from 'react';

interface PostHogClickTrackingProps {
  eventName: string;
  properties?: Record<string, any>;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PostHogClickTracking({
  eventName,
  properties = {},
  children,
  className = '',
  onClick,
  ...rest
}: PostHogClickTrackingProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event in PostHog
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(eventName, properties);
    }
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
} 