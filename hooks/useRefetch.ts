/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

export const useRefetch = ({
  refetch,
  params,
  refreshInterval = 1000*60,
}: {
  refetch: (params?: any) => any;
  params?: any;
  refreshInterval?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = setInterval(() => {
      console.log('refetching');
      refetch(params);
    }, refreshInterval);

    return () => clearInterval(id);
  }, [refetch, refreshInterval, params]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          refetch(params);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [refetch, params]);
  return ref;
};
