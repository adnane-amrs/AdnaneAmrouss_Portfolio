"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import { Briefcase, Download, Grid, Home, Layers, Mail, User } from "@/components/ui/Icons";
import styles from "./layout.module.css";

const icons: Record<string, React.ReactNode> = {
  top: <Home size={16} />,
  projects: <Grid size={16} />,
  about: <User size={16} />,
  experience: <Briefcase size={16} />,
  skills: <Layers size={16} />,
  contact: <Mail size={16} />,
};

const spring = { type: "spring", bounce: 0.16, duration: 0.5 } as const;
// Width of an icon-only tab once the menu is open (narrower on phones so the open bar fits).
const SLOT = 36;
const SLOT_NARROW = 29;

/**
 * Top tab bar. Collapsed, it shows only the current section in a pill sized to its label plus a
 * "···" button; hovering (or tapping) the dots unfolds every tab around it. The current
 * section follows the scroll position on the home page; elsewhere `current` sets it.
 */
export function Dock({ current }: { current?: string }) {
  const { t, locale, toggleLocale } = useLanguage();
  const scrollTo = useScrollTo();
  const pathname = usePathname();
  const [active, setActive] = useState(current ?? "top");
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const items = [{ id: "top", label: t.nav.home }, ...t.nav.links];
  const activeId = items.some((i) => i.id === active) ? active : "top";
  const activeLabel = items.find((i) => i.id === activeId)?.label ?? "";

  // Measure the active label so the pill wraps it exactly (re-measured once web fonts load).
  const measureRef = useRef<HTMLSpanElement>(null);
  const [labelWidth, setLabelWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    const measure = () => measureRef.current && setLabelWidth(Math.ceil(measureRef.current.offsetWidth));
    measure();
    document.fonts?.ready.then(measure);
  }, [activeLabel]);

  // Follow the section in view.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(current ?? "top");
      return;
    }
    const ids = ["top", ...t.nav.links.map((link) => link.id)];
    const update = () => {
      const line = window.innerHeight * 0.4;
      let next = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) next = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, current, t]);

  // Close on a tap outside the bar and on Escape (touch and keyboard users).
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 440px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const slot = narrow ? SLOT_NARROW : SLOT;

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  const go = (id: string) => {
    setOpen(false);
    // The contact page *is* the contact item: scroll up instead of leaving for the home page.
    if (pathname === "/contact" && id === "contact") scrollTo("top");
    else scrollTo(id === "top" ? "home" : id);
  };

  return (
    <motion.nav
      ref={navRef}
      className={`${styles.dock} ${open ? styles.dockOpen : ""}`}
      aria-label="Primary"
      initial={{ y: -70, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => open && openMenu()}
      onMouseLeave={() => open && closeSoon()}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;

        if (isActive) {
          return (
            // A stable key keeps this same element as the active tab moves, so its width
            // can animate from the previous label to the new one instead of jumping.
            <button
              key="active"
              type="button"
              className={`${styles.dockItem} ${styles.dockActive}`}
              onClick={() => go(item.id)}
              aria-label={item.label}
              aria-current="true"
            >
              <motion.span layoutId="dock-active" className={styles.dockPill} transition={spring} />
              <span className={styles.dockIcon}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={item.id}
                    className={styles.dockIconInner}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {icons[item.id]}
                  </motion.span>
                </AnimatePresence>
              </span>
              {/* Pill hugs the label: its width springs to the measured text width */}
              <motion.span
                className={styles.dockLabel}
                initial={false}
                animate={{ width: labelWidth ?? "auto" }}
                transition={spring}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={item.label}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.label}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
              <span ref={measureRef} className={styles.dockMeasure} aria-hidden>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <motion.div
            key={item.id}
            className={styles.dockSlot}
            initial={false}
            animate={{ width: open ? slot : 0, opacity: open ? 1 : 0 }}
            transition={spring}
          >
            <button
              type="button"
              className={styles.dockItem}
              onClick={() => go(item.id)}
              aria-label={item.label}
              title={item.label}
              tabIndex={open ? 0 : -1}
            >
              <span className={styles.dockIcon}>{icons[item.id]}</span>
            </button>
          </motion.div>
        );
      })}

      {/* "···" trigger: hover on desktop, tap on touch, Enter on keyboard */}
      <motion.div
        className={styles.dockSlot}
        initial={false}
        animate={{ width: open ? 0 : narrow ? 36 : 40, opacity: open ? 0 : 1 }}
        transition={spring}
      >
        <button
          type="button"
          className={`${styles.dockItem} ${styles.dockMore}`}
          onMouseEnter={openMenu}
          onClick={() => (open ? setOpen(false) : openMenu())}
          aria-expanded={open}
          aria-label={open ? t.nav.close : t.nav.menu}
          tabIndex={open ? -1 : 0}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.div>

      {/* Extras that only appear with the full menu */}
      <motion.div
        className={styles.dockSlot}
        initial={false}
        animate={{ width: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={spring}
      >
        <span className={styles.dockDivider} aria-hidden />
        <button
          type="button"
          className={styles.dockItem}
          onClick={toggleLocale}
          aria-label={t.nav.language}
          title={locale === "en" ? "Français" : "English"}
          tabIndex={open ? 0 : -1}
        >
          <span className={styles.dockLang}>{locale.toUpperCase()}</span>
        </button>
        <a
          href={site.cv[locale]}
          download
          className={styles.dockItem}
          aria-label={t.nav.cta}
          title={t.nav.cta}
          tabIndex={open ? 0 : -1}
        >
          <span className={styles.dockIcon}>
            <Download size={16} />
          </span>
        </a>
      </motion.div>
    </motion.nav>
  );
}
