// Renders the little leading icon for a language row: either a flag image
// or a text badge (glyph). 繁體中文 uses a glyph so no national flag is
// implied for Traditional Chinese.
import type { Lang } from "@/i18n/locales";

export default function LangFlag({ lang }: { lang: Lang }) {
  if (lang.glyph) {
    return (
      <span className="lang-glyph" aria-hidden="true">
        {lang.glyph}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element -- tiny static flag icons
  return <img src={`/images/${lang.flag}`} alt="" />;
}