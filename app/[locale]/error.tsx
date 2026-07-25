"use client";

// Error boundary for the [locale] segment. Catches uncaught errors in any
// descendant route or component and shows a recovery UI. The function
// receives `error` (the thrown Error) and `reset` (re-renders the segment).
//
// In production, `error.digest` is what you log — the original message
// and stack are stripped from client-rendered error UIs to avoid leaking
// implementation details.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Surface the digest to the browser console so devs can correlate with
  // server logs. The full message and stack are deliberately not exposed.
  if (typeof window !== "undefined" && error.digest) {
    console.error(`[error] digest=${error.digest}`);
  }

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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        出錯了 / Something went wrong
      </h1>
      <p
        style={{
          color: "#666",
          maxWidth: "32rem",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        頁面加載時出現問題。請稍後重試。
        <br />
        The page failed to load. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          padding: "12px 32px",
          borderRadius: "50px",
          background: "#1a5632",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        重試 / Try again
      </button>
    </div>
  );
}