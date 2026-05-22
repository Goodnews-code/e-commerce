"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/spaces", "/journal", "/cart", "/login", "/signup", "/register"];
  const isProductRoute = pathname.startsWith("/products/");
  const isPublicRoute = publicRoutes.includes(pathname) || isProductRoute;

  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      router.push("/login");
    }
  }, [user, loading, pathname, isPublicRoute, router]);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        color: "var(--text-primary)"
      }}>
        Loading...
      </div>
    );
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
