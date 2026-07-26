import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import { bootstrapLocale } from "./locale-bootstrap";
import {
  HOME_DESTINATION_SLUGS,
  getDestination,
  getDestinationHref,
} from "./destinations";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  await bootstrapLocale(params);
  const t = await getTranslations("Home");
  const homeDestinations = HOME_DESTINATION_SLUGS.map((slug) => getDestination(slug));

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          <div
            className="hero-slide active"
            style={{ backgroundImage: "url('/images/main-pic.jpg')" }}
          >
            <div className="hero-overlay" />
            <ScrollReveal animation="fade-in" threshold={0}>
              <div className="hero-content">
                <div className="heading-with-seal hero-seal">
                  <span className="seal-mark lg" aria-hidden="true">
                    印
                  </span>
                  <span className="eyebrow hero-eyebrow">
                    {t("hero.eyebrow")}
                  </span>
                </div>
                <h1 className="hero-title">{t("hero.title")}</h1>
                <p className="hero-subtitle">{t("hero.subtitle")}</p>
                <div className="hero-buttons">
                  <Link className="btn btn-primary" href="/about">
                    {t("hero.ctaAbout")}
                  </Link>
                  <Link className="btn btn-outline" href="/contact">
                    {t("hero.ctaContact")}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="scroll-divider" aria-hidden="true" />

      {/* Advantages Section */}
      <section className="advantages">
        <div className="container">
          <div className="advantages-eyebrow-row">
            <span className="eyebrow">{t("advantages.eyebrow")}</span>
          </div>
          <div className="advantages-grid">
            {[0, 1, 2].map((i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                <div className="advantage-card">
                  <div className="advantage-icon">
                    <i
                      className={
                        i === 0
                          ? "fas fa-puzzle-piece"
                          : i === 1
                            ? "fas fa-concierge-bell"
                            : "fas fa-award"
                      }
                    />
                  </div>
                  <h3>{t(`advantages.items.${i}.title`)}</h3>
                  <p>{t(`advantages.items.${i}.desc`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="scroll-divider" aria-hidden="true" />

      {/* Destinations Section */}
      <section className="destinations">
        <div className="container">
          <div className="destinations-eyebrow-row">
            <span className="eyebrow">{t("destinations.eyebrow")}</span>
          </div>
          {homeDestinations.map((destination, i) => (
            <ScrollReveal
              key={destination.slug}
              animation={i % 2 === 0 ? "fade-left" : "fade-right"}
              delay={i * 100}
            >
              <div
                className={`destination-card${i % 2 === 1 ? " reverse" : ""}`}
              >
                <div className="destination-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={destination.homeImage}
                    alt={t(`destinationCards.${i}.alt`)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="destination-info">
                  <h2>{t(`destinationCards.${i}.title`)}</h2>
                  <p>{t(`destinationCards.${i}.desc`)}</p>
                  <Link
                    className="btn btn-primary"
                    href={getDestinationHref(destination.slug)}
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="scroll-divider" aria-hidden="true" />

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-heading-row">
            <span className="seal-mark" aria-hidden="true">
              印
            </span>
            <span className="eyebrow">{t("testimonials.eyebrow")}</span>
          </div>
          <h2 className="section-title">{t("testimonialsHeading")}</h2>
          <div className="testimonials-grid">
            {[0, 1, 2, 3].map((i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="testimonial-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={[
                        "/images/avatar1.png",
                        "/images/avatar2.png",
                        "/images/avatar3.png",
                        "/images/avatar4.png",
                      ][i]}
                      alt={t(`testimonials.items.${i}.alt`)}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 15,
                      }}
                    />
                    <div>
                      <div className="testimonial-author">
                        {t(`testimonials.items.${i}.author`)}
                      </div>
                      <div className="testimonial-stars">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                    </div>
                  </div>
                  <p>{t(`testimonials.items.${i}.body`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="cta-section"
        style={{
          backgroundImage:
            "url('/images/02_Tianmen_Mountain_National_Forest_Park.jpg')",
        }}
      >
        <div className="cta-overlay" />
        <ScrollReveal animation="fade-up">
          <div className="container cta-content">
            <h2>{t("ctaHeading")}</h2>
            <p>
              {t("ctaBody.0")}
              <br />
              {t("ctaBody.1")}
              <br />
              {t("ctaBody.2")}
              <br />
              {t("ctaBody.3")}
            </p>
            <div className="cta-phone">
              <i className="fas fa-phone-alt" /> {t("ctaPhone")}
            </div>
            <Link className="btn btn-primary btn-lg" href="/contact">
              {t.raw("learnMore")}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
