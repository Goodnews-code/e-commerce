"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product_name: string;
  image_url?: string;
}

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch orders
  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const res = await fetch("/api/orders");
          if (!res.ok) {
            throw new Error("Failed to retrieve order history.");
          }
          const data = await res.json();
          setOrders(data.orders || []);
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching orders.";
          setError(errorMessage);
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-secondary)",
          fontSize: "14px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Initializing Profile...
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === "completed") {
      return {
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
      };
    }
    // Pending or other statuses use accent (Gold)
    return {
      borderColor: "var(--accent)",
      color: "var(--accent)",
    };
  };

  return (
    <main
      className="animate-fade-in-up"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px 120px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "60px", textAlign: "center" }}>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "var(--text-primary)",
            marginBottom: "16px",
          }}
        >
          Your Account
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            letterSpacing: "0.05em",
            fontWeight: 300,
          }}
        >
          Review your profile credentials and purchase records.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Account details */}
        <section
          className="glass-card"
          style={{
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "20px",
              fontWeight: 400,
              borderBottom: "1px solid var(--border)",
              paddingBottom: "12px",
              color: "var(--text-primary)",
            }}
          >
            Credentials
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                Username
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  fontWeight: 400,
                }}
              >
                {user.username}
              </span>
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                Email Address
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  fontWeight: 400,
                }}
              >
                {user.email}
              </span>
            </div>

            {user.created_at && (
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  Member Since
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    color: "var(--text-primary)",
                    fontWeight: 400,
                  }}
                >
                  {formatDate(user.created_at)}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => logout()}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "12px 20px",
              fontSize: "12px",
              marginTop: "16px",
            }}
          >
            Sign Out
          </button>
        </section>

        {/* Right Column: Order History */}
        <section
          style={{
            gridColumn: "span 2",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "20px",
              fontWeight: 400,
              borderBottom: "1px solid var(--border)",
              paddingBottom: "12px",
              color: "var(--text-primary)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span>Acquisition History</span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {orders.length} {orders.length === 1 ? "record" : "records"}
            </span>
          </h2>

          {ordersLoading ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--text-secondary)",
                fontSize: "13px",
                letterSpacing: "0.05em",
              }}
            >
              Retrieving orders...
            </div>
          ) : error ? (
            <div
              className="glass-card"
              style={{
                padding: "24px",
                borderColor: "#D32F2F",
                color: "#EF5350",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div
              className="glass-card"
              style={{
                padding: "60px 24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  fontWeight: 300,
                }}
              >
                No previous acquisitions. Begin your personal collection.
              </p>
              <Link href="/" className="btn-primary" style={{ fontSize: "12px" }}>
                Browse Catalog
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {orders.map((order) => {
                const statusStyle = getStatusStyle(order.status);
                return (
                  <div
                    key={order.id}
                    className="glass-card"
                    style={{
                      padding: "28px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {/* Order Meta Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            color: "var(--text-primary)",
                          }}
                        >
                          Reference: AURA-1000{order.id}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          Acquired on {formatDate(order.created_at)}
                        </span>
                      </div>
                      <span
                        className="badge"
                        style={{
                          border: "1px solid",
                          borderColor: statusStyle.borderColor,
                          color: statusStyle.color,
                          borderRadius: "2px",
                          fontSize: "10px",
                          letterSpacing: "0.08em",
                          padding: "4px 10px",
                          textTransform: "uppercase",
                          fontWeight: 500,
                        }}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div style={{ height: "1px", background: "var(--border)" }} />

                    {/* Order Items List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            {/* Product Thumbnail Fallback */}
                            <div
                              style={{
                                position: "relative",
                                width: "48px",
                                height: "48px",
                                background: "var(--bg-surface)",
                                border: "1px solid var(--border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            >
                              {item.image_url ? (
                                <Image
                                  src={item.image_url}
                                  alt={item.product_name}
                                  fill
                                  sizes="48px"
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <span style={{ fontSize: "16px" }}>📦</span>
                              )}
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span
                                style={{
                                  fontSize: "13px",
                                  fontWeight: 400,
                                  color: "var(--text-primary)",
                                }}
                              >
                                {item.product_name}
                              </span>
                              <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                                Qty: {item.quantity} · ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })} each
                              </span>
                            </div>
                          </div>

                          <span
                            style={{
                              fontSize: "14px",
                              color: "var(--text-primary)",
                              fontVariantNumeric: "tabular-nums",
                              fontWeight: 400,
                            }}
                          >
                            ${(item.price * item.quantity).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ height: "1px", background: "var(--border)" }} />

                    {/* Order Total */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        paddingTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--text-muted)",
                        }}
                      >
                        Total Paid
                      </span>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        ${order.total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
