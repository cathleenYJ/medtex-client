import Link from 'next/link';
import { useMeetingId } from '@/hooks/use-meeting-id';
import { useEffect, useState } from 'react';

interface LinkWithMeetingIdProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown; // 允許其他 Link 組件的 props
}

/**
 * Link component that automatically adds meeting_id parameter to URLs
 * Usage: <LinkWithMeetingId href="/signup">Sign Up</LinkWithMeetingId>
 * Result: /signup?id=53 (if meeting_id exists)
 */
export const LinkWithMeetingId: React.FC<LinkWithMeetingIdProps> = ({ 
  href, 
  children, 
  ...props 
}) => {
  const { createLinkWithMeetingId } = useMeetingId();
  const [enhancedHref, setEnhancedHref] = useState(href);
  
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      setEnhancedHref(createLinkWithMeetingId(href));
    }
  }, [href, createLinkWithMeetingId]);
  
  return (
    <Link href={enhancedHref} {...props}>
      {children}
    </Link>
  );
};
