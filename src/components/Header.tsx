"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll Lock when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Automatically close mobile menu when pathname changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Objects", href: "/" },
    { label: "Spaces", href: "/spaces" },
    { label: "Journal", href: "/journal" },
    ...(user ? [{ label: "Profile", href: "/profile" }] : []),
    ...(user ? [] : [
      { label: "Login", href: "/login" },
      { label: "Sign Up", href: "/signup" }
    ]),
    ...(user ? [{ label: "Logout", href: "#" }] : []),
  ];

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
        className="header-container"
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 32px",
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: "24px" }}>
          {navLinks.map(({ label, href }) => {
            const active = pathname === href;
            return (
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
            );
          })}
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              position: "relative",
              zIndex: 100,
            }}
            aria-label="Toggle navigation menu"
          >
            <div style={{ position: "relative", width: "20px", height: "12px" }}>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "1.5px",
                  backgroundColor: "var(--text-primary)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  top: menuOpen ? "5px" : "1px",
                  transform: menuOpen ? "rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: "1.5px",
                  backgroundColor: "var(--text-primary)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  bottom: menuOpen ? "5px" : "1px",
                  transform: menuOpen ? "rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-nav-menu">
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "10px" }}>
            {navLinks.map(({ label, href }, index) => {
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className="mobile-nav-link"
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (label === "Logout") {
                      e.preventDefault();
                      logout();
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    textDecoration: "none",
                    animationDelay: `${index * 0.06}s`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      fontWeight: 500,
                      color: active ? "var(--accent)" : "var(--text-muted)",
                      marginRight: "16px",
                      letterSpacing: "0.15em",
                      width: "24px",
                    }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    style={{
                      color: active ? "var(--accent)" : "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "18px",
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Brand Manifesto & Session Info */}
          <div
            className="mobile-nav-link"
            style={{
              marginTop: "auto",
              borderTop: "1px solid var(--border)",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              animationDelay: `${navLinks.length * 0.06}s`,
            }}
          >
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  Active Session
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-primary)", fontWeight: 500, letterSpacing: "0.05em" }}>
                  {user.username} ({user.email})
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  AURA
                </span>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: "1.6", fontWeight: 300, letterSpacing: "0.02em" }}>
                  A curation of essential objects. Stripped of the unnecessary, built for endurance.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
