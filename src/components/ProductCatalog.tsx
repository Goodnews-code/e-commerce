"use client";

import { useState, useEffect, useCallback } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

const SORT_OPTIONS = [
  { value: "",            label: "Curated" },
  { value: "price-asc",  label: "Price: Ascending" },
  { value: "price-desc", label: "Price: Descending" },
  { value: "rating",     label: "Highest Rated" },
  { value: "reviews",    label: "Most Reviewed" },
];

export default function ProductCatalog() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(true);

  const [search, setSearch]       = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory]   = useState("All");
  const [sort, setSort]           = useState("");

  // Debounce search query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (debouncedSearch)    params.set("search",   debouncedSearch);
    if (sort)               params.set("sort",     sort);

    const res  = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();
    setProducts(data.products);
    setCategories(data.categories);
    setTotal(data.total);
    setLoading(false);
  }, [category, debouncedSearch, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main style={{ maxWidth: "1320px", margin: "0 auto", padding: "80px 32px 100px" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="animate-fade-in-up"
        style={{ marginBottom: "80px", textAlign: "center" }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ height: "1px", width: "40px", background: "var(--border)" }} />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            Collection 01
          </span>
          <div style={{ height: "1px", width: "40px", background: "var(--border)" }} />
        </div>

        {/* Main heading */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            marginBottom: "24px",
          }}
        >
          Quietly <em style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>Exceptional</em>
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            lineHeight: 1.8,
            maxWidth: "480px",
            margin: "0 auto",
            fontWeight: 300
          }}
        >
          A curation of essential objects. Stripped of the unnecessary, built for endurance, and designed for absolute focus.
        </p>
      </section>

      {/* ── Controls ─────────────────────────────────────── */}
      <section
        className="animate-fade-in-up animate-delay-100"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
          marginBottom: "48px",
          paddingBottom: "32px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "320px" }}>
          <svg
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            id="search-input"
            type="text"
            placeholder="Search collection…"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`btn-ghost ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort — pushed right */}
        <div style={{ marginLeft: "auto" }}>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              color: "var(--text-secondary)",
              padding: "10px 36px 10px 14px",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 500,
              letterSpacing: "0.02em",
              cursor: "pointer",
              outline: "none",
              appearance: "none",
              transition: "border-color 0.5s ease-out",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A3A3A3' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Results Count ─────────────────────────────────── */}
      <div
        className="animate-fade-in-up animate-delay-200"
        style={{ marginBottom: "32px" }}
      >
        <p style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
          Showing{" "}
          <strong style={{ color: "var(--text-primary)", fontWeight: 400 }}>{total}</strong>{" "}
          {total === 1 ? "object" : "objects"}
          {category !== "All" && (
            <> · <span style={{ color: "var(--text-secondary)" }}>{category}</span></>
          )}
          {search && (
            <> · &ldquo;<span style={{ color: "var(--text-secondary)" }}>{search}</span>&rdquo;</>
          )}
        </p>
      </div>

      {/* ── Product Grid ──────────────────────────────────── */}
      {loading ? (
        /* Skeleton */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card" style={{ height: "460px", overflow: "hidden", position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
                  backgroundSize: "400px 100%",
                  animation: "shimmer 2.5s infinite linear",
                }}
              />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty state */
        <div
          style={{
            textAlign: "center",
            padding: "120px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "2px",
              background: "transparent",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginBottom: "8px",
              color: "var(--text-muted)"
            }}
          >
            —
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", fontSize: "22px", fontWeight: 400 }}>
            No objects found
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", fontWeight: 300 }}>
            Refine your criteria to discover the collection.
          </p>
          <button className="btn-ghost" style={{ marginTop: "12px" }} onClick={() => { setSearch(""); setCategory("All"); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}
