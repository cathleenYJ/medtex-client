import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook to manage meeting_id parameter throughout the application
 * Extracts id from URL params and persists it across navigation
 */
export const useMeetingId = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [meetingId, setMeetingId] = useState<string | null>(null);

  useEffect(() => {
    // Get id from URL params (could be 'id' or 'meeting_id')
    const id = searchParams.get('id') || searchParams.get('meeting_id');
    
    if (id) {
      setMeetingId(id);
      // Store in sessionStorage for persistence across page navigation
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('meeting_id', id);
      }
    } else {
      // Try to get from sessionStorage if not in URL
      if (typeof window !== 'undefined') {
        const storedId = sessionStorage.getItem('meeting_id');
        if (storedId) {
          setMeetingId(storedId);
        }
      }
    }
  }, [searchParams]);

  /**
   * Add meeting_id to URL params when navigating
   */
  const navigateWithMeetingId = (path: string) => {
    const currentMeetingId = meetingId || (typeof window !== 'undefined' ? sessionStorage.getItem('meeting_id') : null);
    if (currentMeetingId) {
      const url = new URL(path, window.location.origin);
      url.searchParams.set('id', currentMeetingId);
      router.push(url.pathname + url.search);
    } else {
      router.push(path);
    }
  };

  /**
   * Add meeting_id to any URL string
   */
  const addMeetingIdToUrl = (path: string): string => {
    const currentMeetingId = meetingId || (typeof window !== 'undefined' ? sessionStorage.getItem('meeting_id') : null);
    if (currentMeetingId) {
      const url = new URL(path, window.location.origin);
      url.searchParams.set('id', currentMeetingId);
      return url.pathname + url.search;
    }
    return path;
  };

  /**
   * Create a link with meeting_id parameter
   */
  const createLinkWithMeetingId = (path: string): string => {
    return addMeetingIdToUrl(path);
  };

  /**
   * Get current meeting_id as number for API calls
   */
  const getMeetingIdAsNumber = (): number | null => {
    if (!meetingId) return null;
    const num = parseInt(meetingId, 10);
    return isNaN(num) ? null : num;
  };

  /**
   * Clear meeting_id from storage and state
   */
  const clearMeetingId = () => {
    setMeetingId(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('meeting_id');
    }
  };

  return {
    meetingId,
    getMeetingIdAsNumber,
    navigateWithMeetingId,
    addMeetingIdToUrl,
    createLinkWithMeetingId,
    clearMeetingId,
  };
};
