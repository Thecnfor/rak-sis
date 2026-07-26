import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import {
  FOOTER_DESTINATION_SLUGS,
  getDestinationHref,
} from "../destinations";
import TrackedWhatsAppLink from "./analytics/TrackedWhatsAppLink";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand-title">{t("brand")}</div>
            <p>{t("tagline")}</p>
          </div>
          <div className="footer-col">
            <h3>{t("quickLinks")}</h3>
            <ul>
              <li>
                <Link href="/">{t("quickItems.home")}</Link>
              </li>
              <li>
                <Link href="/about">{t("quickItems.about")}</Link>
              </li>
              {FOOTER_DESTINATION_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={getDestinationHref(slug)}>
                    {t(`quickItems.${slug}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact">{t("quickItems.contact")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>{t("contactHeading")}</h3>
            <ul className="contact-list">
              <li>
                <i className="fas fa-phone-alt" /> {t("phone")}
              </li>
              <li>
                <i className="fab fa-whatsapp" /> {t("whatsapp")}
              </li>
              <li>
                <i className="fas fa-envelope" /> {t("email")}
              </li>
              <li>
                <i className="fas fa-map-marker-alt" /> {t("address")}
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>{t("followUs")}</h3>
            <div className="footer-social">
              <TrackedWhatsAppLink ctaLocation="footer" title="WhatsApp">
                <i className="fab fa-whatsapp" />
              </TrackedWhatsAppLink>
              <a href="mailto:tofofo@pixelinbox.com" title="Email">
                <i className="fas fa-envelope" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61550484293539"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
