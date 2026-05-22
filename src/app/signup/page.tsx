"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting to sign in...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setError("A network error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "var(--bg-base)"
    }}>
      <div style={{ 
        maxWidth: "400px", 
        width: "100%", 
        padding: "40px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "4px"
      }}>
        <h1 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "28px", 
          marginBottom: "8px",
          color: "var(--text-primary)"
        }}>
          AURA
        </h1>
        <p style={{ 
          color: "var(--text-muted)", 
          fontSize: "14px", 
          marginBottom: "32px",
          fontWeight: 300
        }}>
          Create an account to join the collection
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

        {success && (
          <div style={{ 
            padding: "12px", 
            background: "rgba(212,175,55,0.1)", 
            border: "1px solid var(--accent)",
            borderRadius: "2px",
            marginBottom: "16px",
            fontSize: "13px",
            color: "var(--accent)"
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ 
              display: "block", 
              fontSize: "12px", 
              color: "var(--text-secondary)",
              marginBottom: "6px",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              style={{ 
                width: "100%",
                padding: "12px 16px", 
                border: "1px solid var(--border)", 
                borderRadius: "2px", 
                background: "var(--bg-surface)", 
                color: "var(--text-primary)",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              fontSize: "12px", 
              color: "var(--text-secondary)",
              marginBottom: "6px",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{ 
                width: "100%",
                padding: "12px 16px", 
                border: "1px solid var(--border)", 
                borderRadius: "2px", 
                background: "var(--bg-surface)", 
                color: "var(--text-primary)",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              fontSize: "12px", 
              color: "var(--text-secondary)",
              marginBottom: "6px",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{ 
                width: "100%",
                padding: "12px 16px", 
                border: "1px solid var(--border)", 
                borderRadius: "2px", 
                background: "var(--bg-surface)", 
                color: "var(--text-primary)",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ 
              width: "100%",
              marginTop: "8px",
              justifyContent: "center",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ 
          marginTop: "24px", 
          textAlign: "center", 
          fontSize: "13px", 
          color: "var(--text-muted)" 
        }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 500 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
