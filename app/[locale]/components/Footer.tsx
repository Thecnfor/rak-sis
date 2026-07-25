import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations();
  // The locale-aware Link from @/i18n/navigation auto-prefixes the
  // current locale, so we pass hrefs without the /<locale> segment.

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand-title">{t("海涛旅行定制")}</div>
            <p>{t("海涛旅行定制，品質無憂，純玩無購物是我們的承諾，讓旅遊回歸純粹是我們的目標。")}</p>
          </div>
          <div className="footer-col">
            <h3>{t("快速鏈接")}</h3>
            <ul>
              <li>
                <Link href="/">{t("首頁")}</Link>
              </li>
              <li>
                <Link href="/about">{t("關於我們")}</Link>
              </li>
              <li>
                <Link href="/chongqing">{t("重庆旅遊")}</Link>
              </li>
              <li>
                <Link href="/guangxi">{t("廣西旅遊")}</Link>
              </li>
              <li>
                <Link href="/sichuan">{t("四川旅遊")}</Link>
              </li>
              <li>
                <Link href="/zhangjiajie">{t("張家界旅遊")}</Link>
              </li>
              <li>
                <Link href="/yunnan">{t("云南旅游")}</Link>
              </li>
              <li>
                <Link href="/contact">{t("聯系我們")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>{t("聯系方式")}</h3>
            <ul className="contact-list">
              <li>
                <i className="fas fa-phone-alt" /> {t("193 8679 6662")}
              </li>
              <li>
                <i className="fab fa-whatsapp" /> {t("+852 84392791")}
              </li>
              <li>
                <i className="fas fa-envelope" /> {t("418144878@qq.com")}
              </li>
              <li>
                <i className="fas fa-map-marker-alt" /> {t("中國張家界市永定區逸城公園")}
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>{t("關注我們")}</h3>
            <div className="footer-social">
              <a href="https://wa.me/85284392791" target="_blank" title="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
              <a href="mailto:418144878@qq.com" title="Email">
                <i className="fas fa-envelope" />
              </a>
              <a href="#" title="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" title="Instagram">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("© 2026 海涛旅行定制. All Rights Reserved.")}</p>
        </div>
      </div>
    </footer>
  );
}