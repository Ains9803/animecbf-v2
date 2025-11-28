import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook that detects when user scrolls near the bottom of the page
 * @param {Function} callback - Function to call when scroll threshold is reached
 * @param {number} threshold - Distance from bottom in pixels to trigger (default: 100px)
 * @returns {boolean} Loading state
 */
export function useInfiniteScroll(callback, threshold = 100) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    // Calculate if user is near bottom
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    // If near bottom and not already fetching, trigger callback
    if (distanceFromBottom < threshold && !isFetching) {
      setIsFetching(true);
    }
  }, [threshold, isFetching]);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    // Execute callback when isFetching becomes true
    if (isFetching) {
      callback().finally(() => {
        setIsFetching(false);
      });
    }
  }, [isFetching, callback]);

  return isFetching;
}
