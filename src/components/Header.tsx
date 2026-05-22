"use client";

import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header
      style={{
        background: "var(--bg-header)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 32px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "18px",
                color: "var(--text-primary)",
                letterSpacing: "0.2em",
                textTransform: "uppercase"
              }}
            >
              AURA
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { label: "Objects", href: "/", active: true },
            { label: "Spaces", href: "/spaces", active: false },
            { label: "Journal", href: "/journal", active: false },
            ...(user ? [] : [{ label: "Login", href: "/login", active: false }]),
            ...(user ? [{ label: "Logout", href: "#", active: false }] : []),
          ].map(({ label, href, active }) => (
            <Link
              key={label}
              href={href}
              onClick={label === "Logout" ? (e) => { e.preventDefault(); logout(); } : undefined}
              style={{
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                fontWeight: active ? 500 : 400,
                fontSize: "12px",
                textDecoration: "none",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "color 0.5s ease-out",
                borderBottom: active ? "1px solid var(--text-primary)" : "1px solid transparent",
                paddingBottom: "4px"
              }}
            >
              {label}
            </Link>
          ))}
          {user && (
            <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>
              {user.username}
            </span>
          )}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <ThemeToggle />
          
           {/* Cart */}
           <Link href="/cart" style={{ textDecoration: "none" }}>
             <button
               aria-label="Shopping cart"
               style={{
                 background: "transparent",
                 border: "none",
                 display: "flex",
                 alignItems: "center",
                 gap: "8px",
                 cursor: "pointer",
                 color: "var(--text-primary)",
                 fontSize: "12px",
                 fontWeight: 500,
                 fontFamily: "inherit",
                 letterSpacing: "0.05em",
                 textTransform: "uppercase",
                 transition: "color 0.5s ease-out",
                 position: "relative",
               }}
             >
               <span>Cart</span>
               {totalItems > 0 && (
                 <span
                   style={{
                     background: "var(--accent)",
                     color: "var(--bg-base)",
                     fontSize: "10px",
                     fontWeight: 600,
                     padding: "2px 6px",
                     borderRadius: "2px",
                     minWidth: "18px",
                     textAlign: "center",
                   }}
                 >
                   {totalItems}
                 </span>
               )}
               {totalItems === 0 && (
                 <span style={{ color: "var(--text-secondary)" }}>
                   [0]
                 </span>
               )}
             </button>
           </Link>
        </div>
      </div>
    </header>
  );
}
