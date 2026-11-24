"use client";

import { usePageTransition } from "@/providers/PageTransition";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/** A real link (so new-tab / middle-click keep working) that plays the page wipe on a normal click. */
export function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const go = usePageTransition();
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
