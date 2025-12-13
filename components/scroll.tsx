"use client"
import React, { useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";

const Scroll = () => {
    const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

    return (
        <div>

        </div>
    );
}

export default Scroll;
