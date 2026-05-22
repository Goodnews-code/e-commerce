"use client";

import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return (
      <div style={{ 
        maxWidth: "1320px", 
        margin: "0 auto", 
        padding: "80px 32px",
        textAlign: "center"
      }}>
        <h1 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "32px", 
          marginBottom: "16px",
          color: "var(--text-primary)"
        }}>
          Your Cart is Empty
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
          Add some products to get started.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "80px 32px" }}>
      <h1 style={{ 
        fontFamily: "var(--font-display)", 
        fontSize: "32px", 
        marginBottom: "8px",
        color: "var(--text-primary)"
      }}>
        Shopping Cart
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "40px" }}>
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px" }}>
        {/* Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {items.map((item) => (
            <div key={item.id} className="glass-card" style={{ padding: "24px", display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontFamily: "var(--font-display)", 
                  fontSize: "18px", 
                  color: "var(--text-primary)",
                  marginBottom: "8px"
                }}>
                  {item.name}
                </h3>
                <p style={{ 
                  fontSize: "14px", 
                  color: "var(--text-secondary)",
                  marginBottom: "12px"
                }}>
                  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      color: "var(--text-primary)",
                      fontSize: "14px"
                    }}
                  >
                    -
                  </button>
                  <span style={{ color: "var(--text-primary)", fontSize: "14px", minWidth: "30px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      color: "var(--text-primary)",
                      fontSize: "14px"
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginLeft: "auto",
                      textDecoration: "underline"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ 
                  fontSize: "16px", 
                  color: "var(--text-primary)",
                  fontVariantNumeric: "tabular-nums"
                }}>
                  ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="glass-card" style={{ padding: "24px", height: "fit-content" }}>
          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "20px", 
            marginBottom: "20px",
            color: "var(--text-primary)"
          }}>
            Order Summary
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Subtotal</span>
              <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>
                ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Shipping</span>
              <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>Free</span>
            </div>
            <div className="divider" style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 500 }}>Total</span>
              <span style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 500 }}>
                ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <Link href="/checkout" className="btn-primary" style={{ 
            width: "100%", 
            justifyContent: "center", 
            marginBottom: "12px",
            textDecoration: "none",
            display: "flex"
          }}>
            Proceed to Checkout
          </Link>
          <button 
            className="btn-ghost" 
            style={{ width: "100%", justifyContent: "center" }}
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
