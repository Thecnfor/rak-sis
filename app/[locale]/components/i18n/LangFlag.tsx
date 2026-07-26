// 语言项前面的视觉标识统一在这里渲染：
// 有国旗素材时显示小图标；繁体中文使用字形徽标，避免隐含国家指向。
import type { Lang } from "@/i18n/locales";

export default function LangFlag({ lang }: { lang: Lang }) {
  if (lang.glyph) {
    return (
      <span className="lang-glyph" aria-hidden="true">
        {lang.glyph}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element -- 这里使用极小的静态旗帜图标
  return <img src={`/images/${lang.flag}`} alt="" />;
}
