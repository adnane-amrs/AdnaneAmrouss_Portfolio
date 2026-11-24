"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import { RollText } from "@/components/ui/RollText";
import { Logo } from "./Logo";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./layout.module.css";

/** `tone="dark"` inverts the colours for dark pages such as /contact. */
export function Navbar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { t, locale } = useLanguage();
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Freeze page scroll while the mobile menu is open.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className={`${styles.header} ${tone === "dark" ? styles.headerDark : ""} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={`container ${styles.navInner}`}>
        <button type="button" className={styles.navLogo} onClick={() => go("home")} aria-label="Home">
          <Logo />
        </button>

        <nav className={styles.navLinks} aria-label="Primary">
          {t.nav.links.map((link, i) => (
            <Fragment key={link.id}>
              {i > 0 && <span className={styles.navDot} aria-hidden />}
              <a
                href={`/#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.id);
                }}
              >
                {link.label}
              </a>
            </Fragment>
          ))}
        </nav>

        <div className={styles.navRight}>
          <LanguageSwitch tone={tone} />
          <a href={site.cv[locale]} download className={`btn btn-dark roll-group ${styles.navCta}`}>
            <RollText>{t.nav.cta}</RollText>
          </a>
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            <span className={open ? styles.burgerOpen : ""} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container">
              <ul>
                {t.nav.links.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <button type="button" onClick={() => go(link.id)}>
                      <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <a href={site.cv[locale]} download className="btn btn-lime" style={{ width: "100%" }}>
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
