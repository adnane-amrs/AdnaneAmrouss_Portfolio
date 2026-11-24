"use client";

import { site } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import { useScrollTo } from "@/hooks/useScrollTo";
import styles from "./layout.module.css";

export function Footer() {
  const { t } = useLanguage();
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  const links = [
    { id: "projects", label: t.footer.work },
    { id: "about", label: t.footer.about },
    { id: "contact", label: t.footer.contact },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerRow}`}>
        <p>
          © {year} {site.name}
        </p>
        <p className={styles.footerTagline}>{t.footer.tagline}</p>
        <nav className={styles.footerLinks} aria-label="Footer">
          {links.map((link) => (
            <button key={link.id} type="button" onClick={() => scrollTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
