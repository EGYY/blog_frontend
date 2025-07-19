import { MutableRefObject, useEffect } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}
export const useInfiniteScroll = ({ callback, triggerRef, wrapperRef }: UseInfiniteScrollOptions) => {
  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const triggerEl = triggerRef.current;

    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options = {
        root: wrapperEl,
        rootMargin: '1px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback?.();
        }
      }, options);

      observer.observe(triggerEl);
    }

    return () => {
      if (observer && triggerEl) {
        observer.unobserve(triggerEl);
      }
    };
  }, [callback, triggerRef, wrapperRef]);
};
