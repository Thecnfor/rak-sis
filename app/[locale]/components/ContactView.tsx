"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";

export default function ContactView() {
  const t = useTranslations("Contact");

  return (
    <>
      <ScrollReveal animation="fade-in" threshold={0}>
        <section className="page-header contact-hero">
          <div className="page-header-overlay" />
          <div className="page-header-content">
            <h1>{t("title")}</h1>
          </div>
        </section>
      </ScrollReveal>

      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal animation="fade-up" delay={0}>
              <a
                className="contact-info-card contact-link-card"
                href="https://wa.me/85284392791"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp" />
                <h4>{t("cards.whatsapp.label")}</h4>
                <p>{t("cards.whatsapp.hint")}</p>
              </a>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="contact-info-card">
                <i className="fab fa-weixin" />
                <h4>{t("cards.wechat.label")}</h4>
                <p>{t("cards.wechat.hint")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={160}>
              <div className="contact-info-card">
                <i className="fas fa-phone-alt" />
                <h4>{t("cards.phone.label")}</h4>
                <p>{t("cards.phone.hint")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={240}>
              <div className="contact-info-card">
                <i className="fas fa-envelope" />
                <h4>{t("cards.email.label")}</h4>
                <p>{t("cards.email.hint")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={320}>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt" />
                <h4>{t("cards.offices.label")}</h4>
                <p>{t("cards.offices.hint")}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="contact-form-wrapper">
              <h2>{t("formHeading")}</h2>
              <form
                action="https://formsubmit.co/418144878@qq.com"
                method="POST"
                className="contact-form"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value={t("formSubject")} />
                <input type="hidden" name="_template" value="table" />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t("form.nameLabel")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t("form.namePlaceholder")}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t("form.emailLabel")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("form.emailPlaceholder")}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t("form.messageLabel")}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder={t("form.messagePlaceholder")}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  {t("form.submit")}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}