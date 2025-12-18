"use client";

import { useEffect } from "react";

export default function RefreshOnResize() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        window.location.reload();
      }, 300); // debounce to avoid multiple reloads
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
