import type { Product } from "@/types/product";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  product: Product;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            style={{
              width: "12px",
              height: "12px",
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

const PRODUCT_ICONS: Record<string, string> = {
  "1": "⏱", "2": "🛋", "3": "🎧", "4": "⌨",
  "5": "🗄", "6": "💼", "7": "🔋", "8": "💧",
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const delayClass = `animate-delay-${Math.min((index % 4) * 100, 400)}`;
  const icon = "📦";

  return (
    <article
      className={`glass-card animate-fade-in-up ${delayClass}`}
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      aria-label={product.name}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          height: "220px",
          background: "var(--bg-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderBottom: "1px solid var(--border)"
        }}
      >
        {product.image_url && !imageError ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            onError={() => setImageError(true)}
            className="hover-scale-icon"
          />
        ) : (
          <span
            style={{ 
              fontSize: "64px", 
              lineHeight: 1, 
              position: "relative", 
              zIndex: 1,
              color: "var(--text-secondary)",
              transition: "transform 0.7s ease-out"
            }}
            className="hover-scale-icon"
            role="img"
            aria-label={product.name}
          >
            {icon}
          </span>
        )}

        {/* Out of Stock */}
        {!product.in_stock && (
          <div className="out-of-stock-overlay">
            <span
              style={{
                color: "var(--text-primary)",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "24px", gap: "12px" }}>
        {/* Category label */}
        <p
          style={{
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {product.category_name || 'Uncategorized'}
        </p>

        {/* Product name */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: 1.3,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}
        >
          {product.name}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "12px",
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontWeight: 300
          }}
        >
          {product.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {product.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "20px",
            marginTop: "8px"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "16px", fontWeight: 400, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <button
            className="btn-primary"
            disabled={!product.in_stock}
            onClick={() => {
              if (product.in_stock) {
                addToCart({ id: product.id, name: product.name, price: product.price });
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }
            }}
            style={!product.in_stock ? { opacity: 0.35, cursor: "not-allowed" } : {}}
            aria-label={`${product.in_stock ? "Add" : "Unavailable"}: ${product.name}`}
          >
            {!product.in_stock ? "Unavailable" : added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
