import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useHashScroll = () => {
  const location = useLocation();
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    const pathChanged = previousPathname.current !== location.pathname;
    previousPathname.current = location.pathname;

    if (location.hash) {
      const timeoutId = window.setTimeout(() => {
        const targetId = location.hash.slice(1);
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }

    if (pathChanged) {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash, location.pathname]);
};