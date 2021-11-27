import React from 'react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import { MicropostsResponse, ErrorResponse } from '../components/Types';

type PropsType = {
  root?: React.RefObject<HTMLElement> | null;
  target: React.RefObject<HTMLButtonElement>;
  onIntersect: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<MicropostsResponse, ErrorResponse>>;
  threshold?: number | number[];
  rootMargin?: string;
  enabled?: boolean;
};

const useInteractionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 0.4,
  rootMargin = '0px',
  enabled = true,
}: PropsType) => {
  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    /* eslint-disable */
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
};

export default useInteractionObserver;
