// Loading UI shown automatically by Next.js while a route segment in
// [locale]/ is loading. Pure server component, no client logic.
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif",
        color: "#666",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: "2.5rem",
            height: "2.5rem",
            border: "3px solid #e5e5e5",
            borderTopColor: "#1a5632",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p>加載中… / Loading…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}