import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

export type Lang = {
  code: Locale;
  /** Native display name shown in the language picker (independent of UI locale). */
  label: string;
  /** Flag image filename under /images. Omit when using `glyph`. */
  flag?: string;
  /** Text badge shown in place of a flag (e.g. 「繁」 for Traditional Chinese). */
  glyph?: string;
};

export const LANGS: Lang[] = [
  { code: "zh-TW", label: "繁體中文", glyph: "繁" },
  { code: "zh-CN", label: "简体中文", flag: "zh-CN.svg" },
  { code: "en", label: "English", flag: "en.svg" },
  { code: "th", label: "ภาษาไทย", flag: "th.svg" },
  { code: "vi", label: "Tiếng Việt", flag: "vn.svg" },
  { code: "ms", label: "Bahasa Melayu", flag: "ms.svg" },
  { code: "id", label: "Bahasa Indonesia", flag: "id.svg" },
];

export const labelFor = (code: Locale): string =>
  LANGS.find((l) => l.code === code)?.label ?? "繁體中文";

export const DEFAULT_LANG: Locale = "zh-TW";