import { getTranslations } from "next-intl/server";
import Footer from "./Footer";
import Cta from "./Cta";
import ScrollReveal from "./ScrollReveal";
import type { Destination } from "../destinations";

type Props = {
  data: Destination;
};

export default async function DestinationView({ data }: Props) {
  // The translation dictionary is keyed by zh-TW source string. We pass
  // the source text as the key, so next-intl returns the localized
  // translation. notes[] is an array of zh-TW source strings, so each
  // element becomes its own translation key.
  const t = await getTranslations();

  return (
    <>
      <ScrollReveal animation="fade-in" threshold={0}>
        <section className="page-header page-header-plain">
          <div className="page-header-content">
            <h1>{t(data.title)}</h1>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <section className="dest-overview">
          <div className="container">
            <div className="dest-overview-content">
              <h3>{t("景點概況")}</h3>
              <p>{t(data.overview)}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="top-spots">
        <div className="container">
          <h2>{t("熱門景點")}</h2>
          {data.spots.map((s, i) => (
            <ScrollReveal key={s.rank} animation="fade-up" delay={i * 100}>
              <article className="spot-card">
                <div className="spot-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={t(s.title)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="spot-info">
                  <span className="spot-rank">TOP {s.rank}</span>
                  <h3>{t(s.title)}</h3>
                  <p className="spot-subtitle">{t(s.subtitle)}</p>
                  <p>{t(s.description)}</p>
                  {s.notes.length > 0 && (
                    <ul className="spot-notes">
                      {s.notes.map((n: string, j: number) => (
                        <li key={j}>{t(n)}</li>
                      ))}
                    </ul>
                  )}
                  {s.closing && <p>{t(s.closing)}</p>}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <Cta
          bg={data.ctaBg}
          title={t("別再猶豫，聯系我們吧")}
          body={
            <>
              {t("我們深信，旅行是有溫度的")}
              <br />
              {t("我們希望能在這個冰冷冷的世界裏")}
              <br />
              {t("用我們的專業與熱情，帶給你一抹屬於旅行的溫度")}
              <br />
              {t("海涛旅行定制熱枕期盼您來中國旅行！")}
            </>
          }
        />
      </ScrollReveal>

      <Footer />
    </>
  );
}