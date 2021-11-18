import { useEffect } from 'react';

const listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

function handleIntersections(entries: any[]) {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      const cb = listenerCallbacks.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: 0.15,
    });
  }
  return observer;
}

export function useIntersection(elem: { current: any }, callback: any) {
  useEffect(() => {
    const target = elem.current;
    const observed = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observed.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observed.unobserve(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
