"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
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
          Sign in to access the collection
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            style={{ 
              width: "100%",
              marginTop: "8px",
              justifyContent: "center"
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
