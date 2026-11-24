"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Phase = "idle" | "cover" | "reveal";

const TransitionContext = createContext<(href: string) => void>(() => {});

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Recreates the reference's page change: a dark panel wipes across the current page from the left,
 * the route changes underneath it, then the panel fades away to reveal the (dark) destination page.
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const target = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      const path = href.split(/[?#]/)[0];
      if (path === pathname) {
        router.push(href);
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      router.prefetch(path);
      target.current = href;
      setPhase("cover");
    },
    [pathname, router],
  );

  // Once the destination route is rendered under the panel, fade the panel out.
  useEffect(() => {
    if (phase === "cover" && target.current === null) setPhase("reveal");
  }, [pathname, phase]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="wipe"
            aria-hidden
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "#0a0a0a", pointerEvents: "all" }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={phase === "cover" ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : { clipPath: "inset(0 0% 0 0)", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={phase === "cover" ? { duration: 0.55, ease } : { duration: 0.35, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (phase === "cover" && target.current) {
                const href = target.current;
                target.current = null;
                router.push(href);
              } else if (phase === "reveal") {
                setPhase("idle");
              }
            }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

/** Navigate with the wipe transition, e.g. `const go = usePageTransition(); go("/contact")`. */
export function usePageTransition() {
  return useContext(TransitionContext);
}
