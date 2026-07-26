import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LeadPageTracker from "../../components/analytics/LeadPageTracker";
import { bootstrapLocale } from "../../locale-bootstrap";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactSuccessPage({ params }: Props) {
  const locale = await bootstrapLocale(params);
  const t = await getTranslations("Contact.success");

  return (
    <>
      <Navbar />
      <LeadPageTracker locale={locale} />

      <section className="page-header page-header-plain">
        <div className="page-header-content">
          <h1>{t("title")}</h1>
        </div>
      </section>

      <section className="dest-overview">
        <div className="container">
          <div className="dest-overview-content">
            <h3>{t("heading")}</h3>
            <p>{t("body.0")}</p>
            <p>{t("body.1")}</p>
            <div className="hero-buttons">
              <Link className="btn btn-primary" href="/">
                {t("backHome")}
              </Link>
              <Link className="btn btn-outline" href="/contact">
                {t("backContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
