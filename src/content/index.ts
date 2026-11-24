import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, fr };
export const locales: Locale[] = ["en", "fr"];

export * from "./types";
export { site } from "./site";
