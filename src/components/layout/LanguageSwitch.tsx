"use client";

import { motion } from "framer-motion";
import { locales } from "@/content";
import { useLanguage } from "@/providers/LanguageProvider";
import styles from "./layout.module.css";

export function LanguageSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`${styles.lang} ${tone === "dark" ? styles.langDark : ""}`} role="group" aria-label="Language">
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={locale === code ? styles.langActive : ""}
        >
          {locale === code && (
            <motion.span layoutId={`lang-pill-${tone}`} className={styles.langPill} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
          )}
          <span className={styles.langLabel}>{code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
