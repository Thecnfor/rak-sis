import Link from "next/link";

type Props = {
  bg: string;
  title: string;
  body: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  phone?: string;
  whatsapp?: string;
};

export default function Cta({
  bg,
  title,
  body,
  ctaHref = "/contact",
  ctaLabel = "了解更多",
  phone = "193 8679 6662",
  whatsapp = "85284392791",
}: Props) {
  return (
    <section
      className="cta-section"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className="cta-overlay" />
      <div className="container cta-content">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="cta-contact-list">
          <div className="cta-phone">
            <i className="fas fa-phone-alt" /> {phone}
          </div>
          <div className="cta-phone">
            <i className="fab fa-whatsapp" /> {whatsapp}
          </div>
        </div>
        <Link className="btn btn-primary btn-lg" href={ctaHref}>
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
