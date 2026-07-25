import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

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
                <h1 className="hero-title">{t("旅行中國")}</h1>
                <p className="hero-subtitle">{t("China Travel")}</p>
                <div className="hero-buttons">
                  <Link className="btn btn-primary" href="/about">
                    {t("關於我們")}
                  </Link>
                  <Link className="btn btn-outline" href="/contact">
                    {t("聯系我們")}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages">
        <div className="container">
          <div className="advantages-grid">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="advantage-card">
                <div className="advantage-icon">
                  <i className="fas fa-puzzle-piece" />
                </div>
                <h3>{t("資源整合")}</h3>
                <p>
                  {t(
                    "提供中國著名景點的旅遊服務和攻略，包括重庆旅遊、張家界、雲南、四川、北京等多個目的地",
                  )}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="advantage-card">
                <div className="advantage-icon">
                  <i className="fas fa-concierge-bell" />
                </div>
                <h3>{t("服務優勢")}</h3>
                <p>
                  {t(
                    "提供全方位的服務，包括旅遊咨詢、包車、酒店預訂、景點門票、導遊服務、合同保障",
                  )}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="advantage-card">
                <div className="advantage-icon">
                  <i className="fas fa-award" />
                </div>
                <h3>{t("品牌優勢")}</h3>
                <p>
                  {t(
                    "我們旅行社經過多年積累，已經與上百家資源供應商達成深度合作，能提供特價機票、酒店和景點門票",
                  )}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations">
        <div className="container">
          <ScrollReveal animation="fade-left" delay={0}>
            <div className="destination-card">
              <div className="destination-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/chongqing-1.jpg"
                  alt={t("重庆")}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="destination-info">
                <h2>{t("魔幻之城重慶")}</h2>
                <p>{t("洪崖洞的燈火輝煌，解放碑的繁華熱鬧，磁器口的古色古香")}</p>
                <Link className="btn btn-primary" href="/chongqing">
                  {t("了解更多")}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-right" delay={100}>
            <div className="destination-card reverse">
              <div className="destination-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/guangxi.jpg"
                  alt={t("广西")}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="destination-info">
                <h2>{t("秀甲天下壯美廣西")}</h2>
                <p>{t("一個將壯麗山川與人間煙火完美融合的秘境之地")}</p>
                <Link className="btn btn-primary" href="/guangxi">
                  {t("了解更多")}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="destination-card">
              <div className="destination-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dest-sichuan.jpg"
                  alt={t("四川")}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="destination-info">
                <h2>{t("奇山異水四川")}</h2>
                <p>{t("集文化、藝術和旅遊於一體")}</p>
                <Link className="btn btn-primary" href="/sichuan">
                  {t("了解更多")}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-right" delay={300}>
            <div className="destination-card reverse">
              <div className="destination-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/dest-zhangjiajie.jpg"
                  alt={t("張家界")}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="destination-info">
                <h2>{t("人間仙境張家界")}</h2>
                <p>{t("阿凡達拍攝地，獨特喀斯特地貌，壯觀而奇妙的自然景觀")}</p>
                <Link className="btn btn-primary" href="/zhangjiajie">
                  {t("了解更多")}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">{t("客戶評價")}</h2>
          <div className="testimonials-grid">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="testimonial-card">
                <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/avatar1.png"
                    alt={t("張女士")}
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
                    <div className="testimonial-author">{t("琳美人")}</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
                <p>
                  {t(
                    "我很喜歡這次的旅行，見識了重慶的美，感受了祖國的大好河山風光，領隊們都很負責，管家小週會每天發佈溫馨提示，喜歡導遊陶子，還會推薦好吃好玩的地方，景點遊玩有些需要自費也不強求看個人意願這點我跟喜歡，一路也會給我們講解重慶的文化特色，大家一起玩很開心，會推薦想來玩的朋友們，有機會還會再來，有緣再見。",
                  )}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="testimonial-card">
                <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/avatar2.png"
                    alt={t("張先生")}
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
                    <div className="testimonial-author">{t("M53****383")}</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
                <p>
                  {t(
                    "行程安排合理，不用趕路，接送機師傅準時，態度特別好，還幫着提行李，導遊業務水平高，有責任心，對大家很親切，小董和小黎還給大家講了好多關於重慶的由來等，還幫着遊客拍照，大家一起玩特別開心，酒店乾淨舒適，早餐豐盛，下次出遊還選寰遊。",
                  )}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="testimonial-card">
                <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/avatar3.png"
                    alt={t("王先生")}
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
                    <div className="testimonial-author">{t("匿名用户")}</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
                <p>
                  {t(
                    "酒店住的很舒服，乾淨、空間也很大。導遊講解思路清晰，好好聽就知道應該怎麼玩，一個人也完全不用怕。滿意！風景也很好看，景區裏邊也很乾淨。明年秋天應該還會再來。把剩下沒逛完的景點補足。這次時間不夠稍稍留了一些小遺憾！",
                  )}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="testimonial-card">
                <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/avatar4.png"
                    alt={t("王女士")}
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
                    <div className="testimonial-author">{t("王女士")}</div>
                    <div className="testimonial-stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
                <p>
                  {t(
                    "整體來說還是很滿意的，時間比較充裕。不算很趕時間。導遊年輕有活力，安排的也不錯。從成都出發開始，小露就給我們每個家庭發通知短信，注意事項 。司機開車很穩當，團餐也還行。風景確實好漂亮，累並快樂着，不虛此行。",
                  )}
                </p>
              </div>
            </ScrollReveal>
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
            <h2>{t("別再猶豫，聯系我們吧")}</h2>
            <p>
              {t("我們深信，旅行是有溫度的")}
              <br />
              {t("我們希望能在這個冰冷冷的世界裏")}
              <br />
              {t("用我們的專業與熱情，帶給你一抹屬於旅行的溫度")}
              <br />
              {t("海涛旅行定制熱枕期盼您來中國旅行！")}
            </p>
            <div className="cta-phone">
              <i className="fas fa-phone-alt" /> {t("193 8679 6662")}
            </div>
            <Link className="btn btn-primary btn-lg" href="/contact">
              {t("了解更多")}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}