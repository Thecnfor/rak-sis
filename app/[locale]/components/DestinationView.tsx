import { getTranslations } from "next-intl/server";
import Footer from "./Footer";
import Cta from "./Cta";
import ScrollReveal from "./ui/ScrollReveal";
import type { DestinationMeta } from "../destinations";

type Props = {
  data: DestinationMeta;
};

export default async function DestinationView({ data }: Props) {
  // 目的地文案统一从 `Destinations.<slug>` 命名空间读取。
  // slug 是根节点，景点字段位于 `spots.<rank>.<field>`，
  // 备注数组位于 `spots.<rank>.notes`。
  const td = await getTranslations(`Destinations.${data.slug}`);
  const t = await getTranslations("DestinationView");

  const ctaBody = (
    <>
      {t("ctaBody.0")}
      <br />
      {t("ctaBody.1")}
      <br />
      {t("ctaBody.2")}
      <br />
      {t("ctaBody.3")}
    </>
  );

  return (
    <>
      <ScrollReveal animation="fade-in" threshold={0}>
        <section className="page-header page-header-plain">
          <div className="page-header-content">
            <h1>{td("title")}</h1>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal animation="fade-up">
        <section className="dest-overview">
          <div className="container">
            <div className="dest-overview-content">
              <h3>{t("overviewHeading")}</h3>
              <p>{td("overview")}</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="top-spots">
        <div className="container">
          <h2>{t("topSpotsHeading")}</h2>
          {data.spots.map((s, i) => {
            // 这里用 t.raw 读取 notes，确保拿到的是原始数组，
            // 而不是被格式化后的字符串。
            const notes = td.raw(`spots.${s.rank}.notes`) as string[];
            const closing = td(`spots.${s.rank}.closing`);

            return (
              <ScrollReveal key={s.rank} animation="fade-up" delay={i * 100}>
                <article className="spot-card">
                  <div className="spot-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={td(`spots.${s.rank}.title`)}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="spot-info">
                    <span className="spot-rank">
                      {t("rankLabel", { rank: s.rank })}
                    </span>
                    <h3>{td(`spots.${s.rank}.title`)}</h3>
                    <p className="spot-subtitle">
                      {td(`spots.${s.rank}.subtitle`)}
                    </p>
                    <p>{td(`spots.${s.rank}.description`)}</p>
                    {notes.length > 0 && (
                      <ul className="spot-notes">
                        {notes.map((n, j) => (
                          <li key={j}>{n}</li>
                        ))}
                      </ul>
                    )}
                    {closing && <p>{closing}</p>}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <Cta bg={data.ctaBg} title={t("ctaTitle")} body={ctaBody} />
      </ScrollReveal>

      <Footer />
    </>
  );
}
