'use client';

import React, { ReactNode } from 'react';
import usePostHog from '@/hooks/usePostHog';

type PostHogClickTrackingProps = {
  eventName: string;
  properties?: Record<string, string | number | boolean>;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const PostHogClickTracking: React.FC<PostHogClickTrackingProps> = ({
  eventName,
  properties = {},
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const { track } = usePostHog();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the event in PostHog
    track({ name: eventName, properties });
    
    // Call the original onClick handler if provided
    onClick?.(e);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PostHogClickTracking; 