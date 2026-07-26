import { getTranslations } from "next-intl/server";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cta from "../components/Cta";
import ScrollReveal from "../components/ScrollReveal";
import { bootstrapLocale } from "../locale-bootstrap";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  await bootstrapLocale(params);
  const t = await getTranslations("About");

  // Icon mapping: WHY uses fa-star/headset/shield-alt/heart/shuttle-van/route
  // SERVICES have no icons in original (only images)
  // FEATURES uses fa-gem/user-tie/hand-holding-heart/lock
  const WHY_ICONS = [
    "fa-star",
    "fa-headset",
    "fa-shield-alt",
    "fa-heart",
    "fa-shuttle-van",
    "fa-route",
  ];
  const FEATURE_ICONS = [
    "fa-gem",
    "fa-user-tie",
    "fa-hand-holding-heart",
    "fa-lock",
  ];

  return (
    <>
      <Navbar />

      <ScrollReveal animation="fade-in" threshold={0}>
        <section className="page-header about-hero">
          <div className="page-header-overlay" />
          <div className="page-header-content">
            <h1>{t("pageTitle")}</h1>
            <p>{t("pageSubtitle")}</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <h3>{t("aboutHeading")}</h3>
              <p>{t("aboutBody.0")}</p>
              <p>{t("aboutBody.1")}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="why-choose">
        <div className="container">
          <h2 className="section-title">{t("whyHeading")}</h2>
          <div className="why-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="why-card">
                  <i className={`fas ${WHY_ICONS[i]}`} />
                  <h4>{t(`why.${i}.title`)}</h4>
                  <p>{t(`why.${i}.desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2 className="section-title">{t("servicesHeading")}</h2>
          <div className="services-grid">
            {[0, 1, 2, 3].map((i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="service-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={[
                      "/images/destinations/zhangjiajie/dest-zhangjiajie.jpg",
                      "/images/destinations/yunnan/dest-yunnan.jpg",
                      "/images/destinations/sichuan/dest-sichuan.jpg",
                      "/images/destinations/zhangjiajie/02_Tianmen_Mountain_National_Forest_Park.jpg",
                    ][i]}
                    alt={t(`services.${i}.title`)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="service-card-body">
                    <h4>{t(`services.${i}.title`)}</h4>
                    <p>{t(`services.${i}.desc`)}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t("featuresHeading")}</h2>
          <div className="features-grid">
            {[0, 1, 2, 3].map((i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                <div className="feature-item">
                  <i className={`fas ${FEATURE_ICONS[i]}`} />
                  <h4>{t(`features.${i}.title`)}</h4>
                  <p>{t(`features.${i}.desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <Cta
          bg="/images/destinations/zhangjiajie/05_Zhangjiajie_Grand_Canyon.jpg"
          title={t("ctaTitle")}
          body={
            <>
              {t("ctaBody.0")}
              <br />
              {t("ctaBody.1")}
            </>
          }
        />
      </ScrollReveal>

      <Footer />
    </>
  );
}
