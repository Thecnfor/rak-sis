import Link from "next/link";

// 404 page for the [locale] segment. Triggered by Next.js when a route
// doesn't match, or by `notFound()` calls inside route handlers.
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem", fontWeight: 300 }}>
        404
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        頁面不存在 / Page not found
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 32px",
          borderRadius: "50px",
          background: "#1a5632",
          color: "#fff",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        返回首頁 / Back to home
      </Link>
    </div>
  );
}