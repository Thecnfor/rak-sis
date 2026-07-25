"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "./ScrollReveal";

export default function ContactView() {
  const t = useTranslations();

  return (
    <>
      <ScrollReveal animation="fade-in" threshold={0}>
        <section className="page-header contact-hero">
          <div className="page-header-overlay" />
          <div className="page-header-content">
            <h1>{t("聯系我們")}</h1>
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
                <h4>{t("WhatsApp")}</h4>
                <p>{t("點擊立即咨詢")}</p>
              </a>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="contact-info-card">
                <i className="fab fa-weixin" />
                <h4>{t("WeChat 微信")}</h4>
                <p></p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={160}>
              <div className="contact-info-card">
                <i className="fas fa-phone-alt" />
                <h4>{t("Phone 電話")}</h4>
                <p>{t("193 8679 6662")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={240}>
              <div className="contact-info-card">
                <i className="fas fa-envelope" />
                <h4>{t("Email 郵箱")}</h4>
                <p>{t("418144878@qq.com")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={320}>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt" />
                <h4>{t("Offices 地址")}</h4>
                <p>{t("中國張家界市永定區逸城公園")}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="contact-form-wrapper">
              <h2>{t("發送信息或者聯系我們的社交媒體")}</h2>
              <form
                action="https://formsubmit.co/418144878@qq.com"
                method="POST"
                className="contact-form"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value={t("來自海涛旅行定制官網的新消息")} />
                <input type="hidden" name="_template" value="table" />
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t("名字")}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t("請輸入您的名字")}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t("郵箱")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t("請輸入您的郵箱")}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t("評論或消息")}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder={t("請輸入您的消息")}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  {t("提交")}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}