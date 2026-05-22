"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto", 
      padding: "120px 32px",
      textAlign: "center"
    }}>
      <div style={{ 
        fontSize: "48px", 
        marginBottom: "24px"
      }}>
        ✓
      </div>
      <h1 style={{ 
        fontFamily: "var(--font-display)", 
        fontSize: "36px", 
        marginBottom: "16px",
        color: "var(--text-primary)"
      }}>
        Order Confirmed!
      </h1>
      <p style={{ 
        color: "var(--text-secondary)", 
        fontSize: "16px",
        marginBottom: "8px"
      }}>
        Thank you for your purchase.
      </p>
      {orderId && (
        <p style={{ 
          color: "var(--text-muted)", 
          fontSize: "14px",
          marginBottom: "40px"
        }}>
          Order ID: #{orderId}
        </p>
      )}
      
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
