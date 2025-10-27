"use client";

import { useEffect, useState } from "react";

export const useHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsHydrated(true));

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return isHydrated;
};
