import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (
  callback: () => Promise<any>
): { setRefElement: Dispatch<SetStateAction<Element | undefined>> } => {
  const observer = useRef<IntersectionObserver>();
  const [refElement, setRefElement] = useState<Element>();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          callback().then(() => {});
        }
      },
      { threshold: 1 }
    );
  }, [callback]);

  useEffect(() => {
    if (refElement && observer.current) {
      observer.current.observe(refElement);
    }

    return () => {
      if (refElement && observer.current) {
        observer.current.unobserve(refElement);
      }
    };
  }, [refElement]);

  return { setRefElement };
};
