"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, type Dictionary, type Locale } from "@/content";

const STORAGE_KEY = "portfolio-locale";

interface LanguageContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const pathname = usePathname();

  // Restore the saved choice, otherwise follow the browser language.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    } else if (navigator.language?.toLowerCase().startsWith("fr")) {
      setLocaleState("fr");
    }
  }, []);

  // Other pages (e.g. project pages) manage their own title.
  useEffect(() => {
    document.documentElement.lang = locale;
    if (pathname === "/") document.title = dictionaries[locale].meta.title;
  }, [locale, pathname]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const toggleLocale = useCallback(() => setLocale(locale === "en" ? "fr" : "en"), [locale, setLocale]);

  const value = useMemo(
    () => ({ locale, t: dictionaries[locale], setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
