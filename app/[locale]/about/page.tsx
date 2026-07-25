import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cta from "../components/Cta";
import ScrollReveal from "../components/ScrollReveal";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const WHY = [
    { icon: "fa-star", title: t("五星級服務"), desc: t("深耕旅遊市場多年，獨家資源更具超高性價比") },
    { icon: "fa-headset", title: t("24小時管家"), desc: t("以線上旅遊服務商為主，24小時管家，貼心為您服務") },
    { icon: "fa-shield-alt", title: t("售後保障"), desc: t("售前售中售後全面的運營團隊，讓您零操心，更省心") },
    { icon: "fa-heart", title: t("純玩無購物"), desc: t("旅遊更純粹，致力於提升旅行者的消費體驗") },
    { icon: "fa-shuttle-van", title: t("自有車隊"), desc: t("所有車輛均為公司自有車隊，持正規資質，5-55座車型齊全") },
    { icon: "fa-route", title: t("VIP通道"), desc: t("無需人擠人，快速通道免排隊") },
  ];

  const SERVICES = [
    {
      title: t("行程規劃"),
      desc: t("專業團隊為您量身定制旅行路線"),
      image: "/images/dest-zhangjiajie.jpg",
    },
    {
      title: t("酒店預訂"),
      desc: t("集團旗下高奢酒店113家，高奢民宿27家"),
      image: "/images/dest-yunnan.jpg",
    },
    {
      title: t("導遊服務"),
      desc: t("各语种資深專業導遊270人"),
      image: "/images/dest-sichuan.jpg",
    },
    {
      title: t("包車服務"),
      desc: t("自有車隊，專職駕齡5年以上司機"),
      image: "/images/02_Tianmen_Mountain_National_Forest_Park.jpg",
    },
  ];

  const FEATURES = [
    { icon: "fa-gem", title: t("品質保證"), desc: t("嚴選優質資源，確保每一次旅行都是精品體驗") },
    { icon: "fa-user-tie", title: t("專業團隊"), desc: t("500余名員工，270名資深導遊") },
    { icon: "fa-hand-holding-heart", title: t("個性定制"), desc: t("根據您的時間、愛好等靈活定制行程") },
    { icon: "fa-lock", title: t("安全保障"), desc: t("全程旅遊服務保障，讓您安心出行") },
  ];

  return (
    <>
      <Navbar />

      <ScrollReveal animation="fade-in" threshold={0}>
        <section className="page-header about-hero">
          <div className="page-header-overlay" />
          <div className="page-header-content">
            <h1>{t("海涛旅行定制 品質無憂")}</h1>
            <p>{t("您的旅遊專家，期待您的到來")}</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <h3>{t("關於我們")}</h3>
              <p>
                {t(
                  "海涛旅行定制有限公司，是一家提供中高端旅遊服務的在線旅行服務商。自成立以來，一直秉承著「質量第一、信譽至上、以人為本」的經營理念服務於遊客，註重商業信譽，同時也樹立了專註品質的行業口碑。",
                )}
              </p>
              <p>
                {t(
                  "目前在與線上旅遊平臺攜程、Facebook、Google均有深度合作。公司現有員工500余人等，其中各语种資深專業導遊270人，年接待遊客量達十萬余人次。經過數年的發展，打造了一支能力全面的運營團隊並建立了較為完善的售後服務體系，海涛旅行定制，品質無憂，純玩無購物是我們的承諾，讓旅遊回歸純粹是我們的目標。海涛旅行定制不仅仅有传统跟团游服务，集团公司旗下高奢酒店113家，高奢民宿27家，还可进行行程线路规划、酒店、当地用车导、门票等打包预定等全程旅游服务保障，也可根据您的需求进行个性化定制，区别于传统跟团游及自由行，根据您的时间、爱好等灵活定制，旅途全程更加省心安全有保障。",
                )}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="why-choose">
        <div className="container">
          <h2 className="section-title">{t("為何選擇海涛旅行定制")}</h2>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <ScrollReveal key={w.title} animation="fade-up" delay={i * 100}>
                <div className="why-card">
                  <i className={`fas ${w.icon}`} />
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2 className="section-title">{t("我們的服務")}</h2>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} animation="fade-up" delay={i * 100}>
                <div className="service-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="service-card-body">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t("我們的特色")}</h2>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} animation="fade-up" delay={i * 80}>
                <div className="feature-item">
                  <i className={`fas ${f.icon}`} />
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <Cta
          bg="/images/05_Zhangjiajie_Grand_Canyon.jpg"
          title={t("24小時管家，貼心服務")}
          body={
            <>
              {t("私人定制滿足您對旅行的任何需求")}
              <br />
              {t("海涛旅行定制全體員工期待您的到來！")}
            </>
          }
        />
      </ScrollReveal>

      <Footer />
    </>
  );
}