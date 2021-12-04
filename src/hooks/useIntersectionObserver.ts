// import { RefObject, useEffect, useState } from 'react';

// interface Options extends IntersectionObserverInit {
//   freezeOnceVisible?: boolean;
// }

// /* eslint-disable */
// const useIntersectionObserver = (
//   elementRef: RefObject<Element>,
//   {
//     threshold = 0,
//     root = null,
//     rootMargin = '0%',
//     freezeOnceVisible = false,
//   }: Options,
// ): IntersectionObserverEntry | undefined => {
//   const [entry, setEntry] = useState<IntersectionObserverEntry>();

//   const frozen = entry?.isIntersecting && freezeOnceVisible;

//   const updateEntry = ([entry1]: IntersectionObserverEntry[]): void => {
//     setEntry(entry1);
//   };

//   useEffect(() => {
//     const node = elementRef?.current;
//     const hasIOSupport = !!window.IntersectionObserver;

//     if (!hasIOSupport || frozen || !node) return;

//     const observerParams = { threshold, root, rootMargin };
//     const observer = new IntersectionObserver(updateEntry, observerParams);

//     observer.observe(node);

//     return () => {
//       observer.disconnect();
//     };
//   }, [elementRef, threshold, root, rootMargin, frozen]);

//   return entry;
// };

// export default useIntersectionObserver;

import React from 'react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';
import { MicropostsResponse, ErrorResponse } from '../components/Types';

type PropsType = {
  root?: React.RefObject<HTMLElement | null> | null;
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
