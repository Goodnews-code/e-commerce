"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            style={{
              width: "16px",
              height: "16px",
              color: filled || half ? "var(--accent)" : "var(--border)",
            }}
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        );
      })}
    </div>
  );
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.in_stock) {
      addToCart({ id: product.id, name: product.name, price: product.price });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <main style={{ maxWidth: "1320px", margin: "0 auto", padding: "60px 32px 100px" }}>
      
      {/* Breadcrumbs */}
      <div style={{ marginBottom: "40px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s" }}>
          Collection
        </Link>
        <span style={{ color: "var(--text-muted)", margin: "0 10px" }}>/</span>
        <span style={{ color: "var(--text-secondary)" }}>
          {product.category_name || "Objects"}
        </span>
      </div>

      {/* Main Dual-Column Product Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "60px", marginBottom: "100px" }}>
        
        {/* Left Column - Product Image */}
        <div
          className="glass-card animate-fade-in-up"
          style={{
            position: "relative",
            minHeight: "450px",
            height: "100%",
            background: "var(--bg-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {product.image_url && !imageError ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              onError={() => setImageError(true)}
            />
          ) : (
            <span style={{ fontSize: "128px", color: "var(--text-secondary)" }}>📦</span>
          )}

          {!product.in_stock && (
            <div className="out-of-stock-overlay">
              <span
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Right Column - Product Info */}
        <div 
          className="animate-fade-in-up animate-delay-100" 
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "24px" }}
        >
          <div>
            {/* Category */}
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent)",
                display: "block",
                marginBottom: "12px",
              }}
            >
              {product.category_name || "Uncategorized"}
            </span>

            {/* Product Name */}
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "16px",
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <StarRating rating={product.rating} />
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {product.rating} · {product.reviews.toLocaleString()} reviews
              </span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* Description */}
          <div>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginBottom: "8px",
              }}
            >
              The Detail
            </h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                fontWeight: 300,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {product.tags.map((tag) => (
              <span key={tag} className="tag" style={{ border: "1px solid var(--border)", borderRadius: "2px", padding: "4px 8px" }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ height: "1px", background: "var(--border)", marginTop: "8px" }} />

          {/* CTA & Stock Status */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
            <button
              className="btn-primary"
              disabled={!product.in_stock}
              onClick={handleAddToCart}
              style={{
                padding: "16px 24px",
                fontSize: "14px",
                justifyContent: "center",
                width: "100%",
                opacity: !product.in_stock ? 0.35 : 1,
                cursor: !product.in_stock ? "not-allowed" : "pointer",
              }}
            >
              {!product.in_stock ? "Currently Unavailable" : added ? "Added to Cart" : "Acquire Object"}
            </button>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", textAlign: "center" }}>
              {product.in_stock ? "In stock and ready to ship. Complimentary overnight delivery." : "Arriving in 2-3 weeks. Inquire for private reservation."}
            </span>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="animate-fade-in-up animate-delay-200" style={{ paddingTop: "60px", borderTop: "1px solid var(--border)" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "var(--text-primary)",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Related <em style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>Objects</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {relatedProducts.map((related, idx) => (
              <ProductCard key={related.id} product={related} index={idx} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
