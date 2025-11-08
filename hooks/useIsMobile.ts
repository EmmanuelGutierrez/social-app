import { useEffect, useState } from "react";

export function useIsMobile(mobileBreakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width:${mobileBreakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    mql.addEventListener("change", onChange);
    // setIsMobile(window.innerWidth < mobileBreakpoint);
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, [mobileBreakpoint]);
  return isMobile;
}
