'use client';

import { useEffect, useRef, useState } from 'react';

export function useItemScrollAnimation(index: number, delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || hasAnimated.current) return;

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // Check if element is already visible on mount
    const checkInitialVisibility = () => {
      const rect = currentRef.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight + 200 && rect.bottom > -200;
      return isInView;
    };

    // Initial check with a small delay to ensure DOM is ready
    timeoutId = setTimeout(() => {
      if (checkInitialVisibility() && !hasAnimated.current) {
        hasAnimated.current = true;
        setTimeout(() => {
          setIsVisible(true);
        }, delay + index * 50);
        return; // Already visible, no need to set up observer
      }

      // Set up observer for elements not yet visible
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            // Add delay based on index for staggered effect
            setTimeout(() => {
              setIsVisible(true);
            }, delay + index * 50);
            if (observer && currentRef) {
              observer.unobserve(currentRef);
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px',
        }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }
    }, 100);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [index, delay]);

  return { ref, isVisible };
}

