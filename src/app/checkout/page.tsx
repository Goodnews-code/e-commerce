"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price })),
          total: totalPrice,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Checkout failed");
      }

      const data = await res.json();
      clearCart();
      router.push(`/order-confirmation?id=${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 32px" }}>
      <h1 style={{ 
        fontFamily: "var(--font-display)", 
        fontSize: "32px", 
        marginBottom: "8px",
        color: "var(--text-primary)"
      }}>
        Checkout
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>
        Review your order before confirming
      </p>

      {error && (
        <div style={{ 
          padding: "12px", 
          background: "rgba(255,0,0,0.1)", 
          border: "1px solid rgba(255,0,0,0.3)",
          borderRadius: "2px",
          marginBottom: "16px",
          fontSize: "13px",
          color: "#ff6b6b"
        }}>
          {error}
        </div>
      )}

      {/* Order Items */}
      <div className="glass-card" style={{ padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "20px", 
          marginBottom: "20px",
          color: "var(--text-primary)"
        }}>
          Order Items
        </h2>
        
        {items.map((item) => (
          <div key={item.id} style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            padding: "12px 0",
            borderBottom: "1px solid var(--border)"
          }}>
            <div>
              <p style={{ color: "var(--text-primary)", fontSize: "14px", marginBottom: "4px" }}>
                {item.name}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                Qty: {item.quantity} × ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <p style={{ color: "var(--text-primary)", fontSize: "14px", fontVariantNumeric: "tabular-nums" }}>
              ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="glass-card" style={{ padding: "24px", marginBottom: "32px" }}>
        <h2 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "20px", 
          marginBottom: "20px",
          color: "var(--text-primary)"
        }}>
          Order Summary
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Subtotal</span>
            <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>
              ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Shipping</span>
            <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>Free</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Tax</span>
            <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>Calculated at checkout</span>
          </div>
          <div className="divider" style={{ margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-primary)", fontSize: "18px", fontWeight: 500 }}>Total</span>
            <span style={{ color: "var(--text-primary)", fontSize: "18px", fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={handleCheckout}
        disabled={loading}
        style={{ 
          width: "100%", 
          justifyContent: "center", 
          padding: "16px",
          fontSize: "14px",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}
