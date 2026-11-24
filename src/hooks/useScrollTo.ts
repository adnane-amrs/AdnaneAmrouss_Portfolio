"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Smooth-scrolls to a section id (or the top) through Lenis, with a native fallback.
 * On pages other than the home page, sections live on "/", so it navigates there instead.
 */
export function useScrollTo() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (id: string | "top" | "home") => {
      if (id === "home") {
        if (pathname !== "/") return router.push("/");
        id = "top";
      }
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) {
        if (pathname !== "/") router.push(`/#${id}`);
        return;
      }
      if (lenis) {
        // No extra offset: Lenis already honours each section's CSS scroll-margin-top (clears the top bar).
        lenis.scrollTo(target, { duration: 1.4 });
      } else if (target === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis, pathname, router],
  );
}
