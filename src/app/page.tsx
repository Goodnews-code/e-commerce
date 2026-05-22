import Header from "@/components/Header";
import ProductCatalog from "@/components/ProductCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <ProductCatalog />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "40px 32px",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "14px",
                color: "var(--text-primary)",
                letterSpacing: "0.2em",
              }}
            >
              AURA
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                marginLeft: "10px",
                fontWeight: 400,
              }}
            >
              © 2025 — All rights reserved
            </span>
          </div>

          {/* Stack badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {["Next.js 16", "TypeScript", "Tailwind v4"].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "4px 8px",
                  textTransform: "uppercase",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
